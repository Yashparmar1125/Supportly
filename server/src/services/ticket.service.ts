import { pool } from "../db/pool.js";
import type { CreateTicketRequest, UpdateTicketRequest, QueryTicketsRequest } from "../schemas/ticket.schema.js";

export const ticketService = {
  async create(data: CreateTicketRequest) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      const countRes = await client.query(`
        SELECT COALESCE(MAX(CAST(SUBSTRING(ticket_id FROM 5) AS INTEGER)), 0) as max_id 
        FROM tickets
      `);
      const nextId = (countRes.rows[0].max_id || 0) + 1;
      const ticket_id = `TKT-${nextId.toString().padStart(3, '0')}`;

      const res = await client.query(
        `INSERT INTO tickets (ticket_id, customer_name, customer_email, subject, description)
         VALUES ($1, $2, $3, $4, $5) RETURNING ticket_id, created_at`,
        [ticket_id, data.customer_name, data.customer_email, data.subject, data.description]
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
    let sql = "SELECT * FROM tickets WHERE 1=1";
    const params: any[] = [];
    
    if (query.status) {
      params.push(query.status);
      sql += ` AND status = $${params.length}`;
    }
    
    if (query.search) {
      params.push(query.search);
      sql += ` AND search_vector @@ plainto_tsquery('english', $${params.length})`;
    }

    sql += " ORDER BY created_at DESC";
    
    const { rows } = await pool.query(sql, params);
    return rows;
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
      
      let updated_at = new Date();

      if (data.status) {
        const res = await client.query(
          "UPDATE tickets SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE ticket_id = $2 RETURNING updated_at",
          [data.status, ticket_id]
        );
        if (res.rows.length === 0) {
          throw new Error("Ticket not found");
        }
        updated_at = res.rows[0].updated_at;
      }

      if (data.note) {
        await client.query(
          "INSERT INTO notes (ticket_id, note_text) VALUES ($1, $2)",
          [ticket_id, data.note]
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
