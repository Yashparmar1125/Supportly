import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().trim().min(3, "Username must be at least 3 characters").max(50, "Username must not exceed 50 characters"),
  password: z.string().min(8, "Password must be at least 8 characters").max(72, "Password must not exceed 72 characters"),
});

export type LoginRequest = z.infer<typeof loginSchema>;
