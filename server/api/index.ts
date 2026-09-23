import express from "express";
import cors from "cors";
import { env } from "../src/config/env.js";
import authRoutes from "../src/routes/auth.routes.js";
import ticketRoutes from "../src/routes/ticket.routes.js";
import { errorHandler } from "../src/middleware/error.middleware.js";

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const cleanFrontend = env.FRONTEND_URL ? env.FRONTEND_URL.replace(/\/$/, '') : '';
    const cleanOrigin = origin.replace(/\/$/, '');
    if (
      !cleanFrontend ||
      cleanOrigin === cleanFrontend ||
      cleanOrigin.endsWith('.vercel.app') ||
      cleanOrigin.includes('localhost') ||
      cleanOrigin.includes('127.0.0.1')
    ) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

app.use(errorHandler);

// Local development server
if (process.env.NODE_ENV !== "production") {
  app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
  });
}

export default app;
