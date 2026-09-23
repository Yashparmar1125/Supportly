import { z } from "zod";

export const ticketPriorityEnum = z.enum(["Urgent", "High", "Medium", "Low"]);
export const ticketCategoryEnum = z.enum(["Billing", "Technical Bug", "Feature Request", "Account Access", "General"]);
export const ticketSentimentEnum = z.enum(["Frustrated", "Neutral", "Delighted"]);
export const ticketChannelEnum = z.enum(["Web Portal", "Email", "API"]);

export const createTicketSchema = z.object({
  customer_name: z.string().min(1),
  customer_email: z.string().email(),
  subject: z.string().min(1),
  description: z.string().min(1),
  priority: ticketPriorityEnum.optional(),
  category: ticketCategoryEnum.optional(),
  channel: ticketChannelEnum.optional(),
  organization: z.string().optional(),
});

export const updateTicketSchema = z.object({
  status: z.enum(["Open", "In Progress", "Closed"]).optional(),
  priority: ticketPriorityEnum.optional(),
  category: ticketCategoryEnum.optional(),
  note: z.string().optional(),
}).refine(data => data.status !== undefined || data.priority !== undefined || data.category !== undefined || data.note !== undefined, {
  message: "At least one field (status, priority, category, note) must be provided"
});

export const queryTicketsSchema = z.object({
  status: z.enum(["Open", "In Progress", "Closed"]).optional(),
  priority: ticketPriorityEnum.optional(),
  category: ticketCategoryEnum.optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export type CreateTicketRequest = z.infer<typeof createTicketSchema>;
export type UpdateTicketRequest = z.infer<typeof updateTicketSchema>;
export type QueryTicketsRequest = z.infer<typeof queryTicketsSchema>;
