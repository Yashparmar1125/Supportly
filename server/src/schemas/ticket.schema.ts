import { z } from "zod";

export const createTicketSchema = z.object({
  customer_name: z.string().min(1),
  customer_email: z.string().email(),
  subject: z.string().min(1),
  description: z.string().min(1),
});

export const updateTicketSchema = z.object({
  status: z.enum(["Open", "In Progress", "Closed"]).optional(),
  note: z.string().optional(),
}).refine(data => data.status !== undefined || data.note !== undefined, {
  message: "Either status or note must be provided"
});

export const queryTicketsSchema = z.object({
  status: z.enum(["Open", "In Progress", "Closed"]).optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export type CreateTicketRequest = z.infer<typeof createTicketSchema>;
export type UpdateTicketRequest = z.infer<typeof updateTicketSchema>;
export type QueryTicketsRequest = z.infer<typeof queryTicketsSchema>;
