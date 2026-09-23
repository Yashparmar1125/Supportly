import express from "express";
import cors from "cors";
import { env } from "../src/config/env.js";
import authRoutes from "../src/routes/auth.routes.js";
import ticketRoutes from "../src/routes/ticket.routes.js";
import { errorHandler } from "../src/middleware/error.middleware.js";
import { apiLimiter } from "../src/middleware/rate-limit.middleware.js";

const app = express();

// Allowed origins whitelist
const allowedOrigins = [
  env.FRONTEND_URL ? env.FRONTEND_URL.replace(/\/$/, '') : null,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
].filter(Boolean) as string[];

// Secure CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server, CLI, or tools without an origin header
    if (!origin) return callback(null, true);

    const cleanOrigin = origin.replace(/\/$/, '');
    const isAllowed =
      allowedOrigins.includes(cleanOrigin) ||
      (process.env.NODE_ENV !== 'production' &&
        (cleanOrigin.includes('localhost') || cleanOrigin.includes('127.0.0.1')));

    if (isAllowed) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked: Origin ${origin} is not permitted.`));
  },
  credentials: true,
}));

app.use(express.json({ limit: "1mb" }));

// Uptime and Health Check probes
app.get(["/health", "/api/health"], (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "supportly-api",
    timestamp: new Date().toISOString(),
  });
});

// Apply global rate limiting to all /api routes
app.use("/api", apiLimiter);

// Mount core routes
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

// Centralized error handling
app.use(errorHandler);

// Local development server runner
if (process.env.NODE_ENV !== "production") {
  app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
  });
}

export default app;
