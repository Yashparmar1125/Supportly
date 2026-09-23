import { Router } from "express";
import { ticketService } from "../services/ticket.service.js";
import { aiService } from "../services/ai.service.js";
import { validate } from "../middleware/validate.middleware.js";
import { createTicketSchema, updateTicketSchema, queryTicketsSchema } from "../schemas/ticket.schema.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authenticate, validate(createTicketSchema, "body"), async (req, res, next) => {
  try {
    const result = await ticketService.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/", authenticate, validate(queryTicketsSchema, "query"), async (req, res, next) => {
  try {
    const result = await ticketService.findAll(req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:ticket_id", authenticate, async (req, res, next) => {
  try {
    const result = await ticketService.findById(req.params.ticket_id);
    if (!result) return res.status(404).json({ error: "Ticket not found" });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:ticket_id", authenticate, validate(updateTicketSchema, "body"), async (req, res, next) => {
  try {
    const result = await ticketService.update(req.params.ticket_id, req.body);
    res.json(result);
  } catch (error: any) {
    if (error.message === "Ticket not found") {
      res.status(404).json({ error: error.message });
    } else {
      next(error);
    }
  }
});

router.post("/:ticket_id/suggest", authenticate, async (req, res, next) => {
  try {
    const ticket = await ticketService.findById(req.params.ticket_id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });
    
    const suggestion = await aiService.getSuggestion(ticket);
    res.json({ suggestion });
  } catch (error) {
    next(error);
  }
});

export default router;
