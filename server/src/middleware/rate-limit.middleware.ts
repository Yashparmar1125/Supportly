import { rateLimit } from "express-rate-limit";

// General API Rate Limiter: 300 requests per 15 minutes per IP
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests from this IP, please try again after 15 minutes.",
  },
});

// Auth Rate Limiter: 10 attempts per 15 minutes per IP
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many login attempts. Please try again after 15 minutes.",
  },
});

// Public Ticket Creation Limiter: 30 tickets per 15 minutes per IP
export const ticketCreateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Ticket creation limit reached. Please wait before submitting more tickets.",
  },
});

// AI Suggestion Limiter: 20 suggestions per 15 minutes per IP
export const aiSuggestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "AI suggestion limit reached. Please wait before requesting more suggestions.",
  },
});
