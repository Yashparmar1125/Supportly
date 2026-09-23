import type { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service.js";
import type { AuthUser, JwtTokenPayload } from "../types/auth.js";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = authService.verifyToken(token) as JwtTokenPayload;
    if (!decoded || !decoded.id || !decoded.username) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    req.user = {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role || "admin",
    };
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
