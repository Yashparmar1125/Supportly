import type { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error caught in global handler:", err);

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Invalid token" });
  }

  if (err.code && typeof err.code === "string" && err.code.length === 5) {
    // Basic Postgres error check (usually 5 char string)
    return res.status(500).json({ error: "Database error occurred" });
  }

  res.status(500).json({ error: err.message || "Internal server error" });
};
