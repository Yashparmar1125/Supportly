import type { Request, Response, NextFunction } from "express";

/**
 * PostgreSQL SQLSTATE error code mapping to HTTP statuses and client-safe messages
 */
const POSTGRES_ERROR_MAP: Record<string, { status: number; message: string }> = {
  "23505": { status: 409, message: "A record with this identifier or unique value already exists." },
  "23503": { status: 400, message: "Referenced entity does not exist or has active dependencies." },
  "23502": { status: 400, message: "A required database field was missing." },
  "22P02": { status: 400, message: "Invalid input syntax for database type." },
  "22001": { status: 400, message: "Input value exceeds maximum allowed database column length." },
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Prevent crash if headers have already been transmitted
  if (res.headersSent) {
    return next(err);
  }

  // Log error on server with request metadata for internal diagnostics
  console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, {
    message: err.message,
    code: err.code,
    stack: process.env.NODE_ENV !== "production" ? err.stack : undefined,
  });

  // 1. JWT Authentication Errors
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Invalid or expired session token" });
  }

  // 2. Structured PostgreSQL Errors
  if (err.code && typeof err.code === "string" && POSTGRES_ERROR_MAP[err.code]) {
    const { status, message } = POSTGRES_ERROR_MAP[err.code];
    return res.status(status).json({ error: message, code: err.code });
  }

  // 3. Known Application Errors (e.g. Ticket not found)
  if (err.message === "Ticket not found") {
    return res.status(404).json({ error: "Ticket not found" });
  }

  if (err.message === "Invalid credentials") {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // 4. Default 500: Mask internal details in production to prevent information disclosure
  const isProduction = process.env.NODE_ENV === "production";
  const errorMessage = isProduction ? "An unexpected internal server error occurred." : (err.message || "Internal server error");

  res.status(err.status || 500).json({ error: errorMessage });
};
