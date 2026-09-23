import { pool } from "../db/pool.js";
import { aiService } from "./ai.service.js";
import { organizationService } from "./organization.service.js";
import type { CreateTicketRequest, UpdateTicketRequest, QueryTicketsRequest } from "../schemas/ticket.schema.js";

export const ticketService = {
  async create(data: CreateTicketRequest) {
    // 1. Run AI triage & org attribution OUTSIDE the DB transaction to avoid connection starvation
    let priority = data.priority;
    let category = data.category;
    let sentiment = 'Neutral';

    if (!priority || !category) {
      const triage = await aiService.classifyTicket(data.subject, data.description);
      priority = priority || triage.priority;
      category = category || triage.category;
      sentiment = triage.sentiment;
    }

    const organization = organizationService.resolve(data.customer_email, data.organization);
    const channel = data.channel || 'Web Portal';

    // 2. Open quick atomic transaction strictly for SQL insert operations (<5ms)
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Atomic sequence prevents race condition and duplicate key collisions
      const seqRes = await client.query(`SELECT nextval('ticket_id_seq') as next_id`);
      const nextId = Number(seqRes.rows[0].next_id);
      const ticket_id = `TKT-${nextId.toString().padStart(3, '0')}`;

      const res = await client.query(
        `INSERT INTO tickets (ticket_id, customer_name, customer_email, subject, description, priority, category, sentiment, channel, organization)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
         RETURNING ticket_id, created_at, priority, category, sentiment, channel, organization`,
        [ticket_id, data.customer_name, data.customer_email, data.subject, data.description, priority, category, sentiment, channel, organization]
      );
      
      await client.query('COMMIT');
      return res.rows[0];
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  },

  async findAll(query: QueryTicketsRequest) {
    // 1. Compute global status metrics across all tickets for KPI cards
    const countsRes = await pool.query(`
      SELECT 
        count(*)::int as total,
        count(*) FILTER (WHERE status = 'Open')::int as open,
        count(*) FILTER (WHERE status = 'In Progress')::int as in_progress,
        count(*) FILTER (WHERE status = 'Closed')::int as closed
      FROM tickets
    `);
    const countsRow = countsRes.rows[0];
    const counts = {
      all: countsRow ? Number(countsRow.total) : 0,
      open: countsRow ? Number(countsRow.open) : 0,
      inProgress: countsRow ? Number(countsRow.in_progress) : 0,
      closed: countsRow ? Number(countsRow.closed) : 0,
    };

    // 2. Build filtered WHERE clause
    let whereClause = " WHERE 1=1";
    const params: any[] = [];
    
    if (query.status) {
      params.push(query.status);
      whereClause += ` AND status = $${params.length}`;
    }

    if (query.priority) {
      params.push(query.priority);
      whereClause += ` AND priority = $${params.length}`;
    }

    if (query.category) {
      params.push(query.category);
      whereClause += ` AND category = $${params.length}`;
    }
    
    if (query.search) {
      params.push(query.search);
      whereClause += ` AND search_vector @@ plainto_tsquery('english', $${params.length})`;
    }

    // 3. Count matching tickets for pagination
    const countRes = await pool.query(`SELECT count(*)::int as total FROM tickets${whereClause}`, params);
    const total = countRes.rows[0] ? Number(countRes.rows[0].total) : 0;

    // 4. Fetch paginated slice
    const page = query.page || 1;
    const limit = query.limit || 10;
    const offset = (page - 1) * limit;

    const dataParams = [...params, limit, offset];
    const dataSql = `SELECT * FROM tickets${whereClause} ORDER BY created_at DESC LIMIT $${dataParams.length - 1} OFFSET $${dataParams.length}`;
    const { rows } = await pool.query(dataSql, dataParams);

    return {
      tickets: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
      counts,
    };
  },

  async findById(ticket_id: string) {
    const ticketRes = await pool.query("SELECT * FROM tickets WHERE ticket_id = $1", [ticket_id]);
    if (ticketRes.rows.length === 0) return null;

    const notesRes = await pool.query("SELECT * FROM notes WHERE ticket_id = $1 ORDER BY created_at ASC", [ticket_id]);
    
    return {
      ...ticketRes.rows[0],
      notes: notesRes.rows
    };
  },

  async update(ticket_id: string, data: UpdateTicketRequest) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      const updates: string[] = ["updated_at = CURRENT_TIMESTAMP"];
      const updateParams: any[] = [ticket_id];

      if (data.status) {
        updateParams.push(data.status);
        updates.push(`status = $${updateParams.length}`);
      }

      if (data.priority) {
        updateParams.push(data.priority);
        updates.push(`priority = $${updateParams.length}`);
      }

      if (data.category) {
        updateParams.push(data.category);
        updates.push(`category = $${updateParams.length}`);
      }

      // Always execute update query to verify ticket exists and refresh updated_at
      const updateSql = `UPDATE tickets SET ${updates.join(', ')} WHERE ticket_id = $1 RETURNING updated_at`;
      const res = await client.query(updateSql, updateParams);
      if (res.rows.length === 0) {
        throw new Error("Ticket not found");
      }
      const updated_at = res.rows[0].updated_at;

      if (data.note && data.note.trim()) {
        const author = data.author_name && data.author_name.trim() ? data.author_name.trim() : 'Support Agent';
        const isInternal = data.is_internal !== undefined ? Boolean(data.is_internal) : true;
        await client.query(
          "INSERT INTO notes (ticket_id, note_text, author_name, is_internal) VALUES ($1, $2, $3, $4)",
          [ticket_id, data.note.trim(), author, isInternal]
        );
      }
      
      await client.query('COMMIT');
      return { success: true, updated_at };
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }
};
