import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db/pool.js";
import { env } from "../config/env.js";
import type { LoginRequest } from "../schemas/auth.schema.js";

export const authService = {
  async login(credentials: LoginRequest) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [credentials.username]);
    const user = rows[0];

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await bcrypt.compare(credentials.password, user.password);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    };
  },

  verifyToken(token: string) {
    try {
      return jwt.verify(token, env.JWT_SECRET);
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }
};
