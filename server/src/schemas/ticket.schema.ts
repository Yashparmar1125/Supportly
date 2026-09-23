import { z } from "zod";

export const ticketPriorityEnum = z.enum(["Urgent", "High", "Medium", "Low"]);
export const ticketCategoryEnum = z.enum(["Billing", "Technical Bug", "Feature Request", "Account Access", "General"]);
export const ticketSentimentEnum = z.enum(["Frustrated", "Neutral", "Delighted"]);
export const ticketChannelEnum = z.enum(["Web Portal", "Email", "API"]);

export const createTicketSchema = z.object({
  customer_name: z.string().trim().min(1, "Customer name is required").max(100, "Customer name must not exceed 100 characters"),
  customer_email: z.string().trim().email("Invalid customer email").max(255, "Customer email must not exceed 255 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must not exceed 200 characters"),
  description: z.string().trim().min(1, "Description is required").max(10000, "Description must not exceed 10,000 characters"),
  priority: ticketPriorityEnum.optional(),
  category: ticketCategoryEnum.optional(),
  channel: ticketChannelEnum.optional(),
  organization: z.string().trim().max(100, "Organization must not exceed 100 characters").optional(),
});

export const updateTicketSchema = z.object({
  status: z.enum(["Open", "In Progress", "Closed"]).optional(),
  priority: ticketPriorityEnum.optional(),
  category: ticketCategoryEnum.optional(),
  note: z.string().trim().min(1, "Note cannot be empty").max(5000, "Note must not exceed 5,000 characters").optional(),
}).refine(data => data.status !== undefined || data.priority !== undefined || data.category !== undefined || data.note !== undefined, {
  message: "At least one field (status, priority, category, note) must be provided"
});

export const queryTicketsSchema = z.object({
  status: z.enum(["Open", "In Progress", "Closed"]).optional(),
  priority: ticketPriorityEnum.optional(),
  category: ticketCategoryEnum.optional(),
  search: z.string().trim().max(100, "Search query must not exceed 100 characters").optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export type CreateTicketRequest = z.infer<typeof createTicketSchema>;
export type UpdateTicketRequest = z.infer<typeof updateTicketSchema>;
export type QueryTicketsRequest = z.infer<typeof queryTicketsSchema>;
