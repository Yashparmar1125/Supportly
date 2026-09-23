import { Router } from "express";
import { authService } from "../services/auth.service.js";
import { validate } from "../middleware/validate.middleware.js";
import { loginSchema } from "../schemas/auth.schema.js";
import { authLimiter } from "../middleware/rate-limit.middleware.js";

const router = Router();

router.post("/login", authLimiter, validate(loginSchema, "body"), async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (error: any) {
    if (error.message === "Invalid credentials") {
      res.status(401).json({ error: error.message });
    } else {
      next(error);
    }
  }
});

export default router;
