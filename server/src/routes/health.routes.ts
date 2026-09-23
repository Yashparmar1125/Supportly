import { Router, Request, Response } from 'express';
import { pool } from '../db/pool.js';

const router = Router();

router.get(['/', '/health', '/api/health'], async (_req: Request, res: Response) => {
  const start = Date.now();

  try {
    const dbRes = await pool.query('SELECT 1 AS alive');
    const latencyMs = Date.now() - start;

    return res.status(200).json({
      status: 'healthy',
      service: 'supportly-api',
      version: '1.1.4',
      timestamp: new Date().toISOString(),
      uptime_seconds: Math.floor(process.uptime()),
      database: {
        status: dbRes.rows.length > 0 ? 'connected' : 'unexpected_response',
        latency_ms: latencyMs,
      },
    });
  } catch (error: any) {
    const latencyMs = Date.now() - start;
    return res.status(503).json({
      status: 'degraded',
      service: 'supportly-api',
      version: '1.1.4',
      timestamp: new Date().toISOString(),
      uptime_seconds: Math.floor(process.uptime()),
      database: {
        status: 'disconnected',
        latency_ms: latencyMs,
        error: process.env.NODE_ENV === 'production' ? 'Database ping failed' : error.message,
      },
    });
  }
});

export default router;
