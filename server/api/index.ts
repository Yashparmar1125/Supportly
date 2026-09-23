import express from "express";
import cors from "cors";
import { env } from "../src/config/env.js";
import authRoutes from "../src/routes/auth.routes.js";
import ticketRoutes from "../src/routes/ticket.routes.js";
import { errorHandler } from "../src/middleware/error.middleware.js";

const app = express();

app.use(cors({
  origin: env.FRONTEND_URL,
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
