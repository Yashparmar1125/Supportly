export type TicketStatus = 'Open' | 'In Progress' | 'Closed';
export type TicketPriority = 'Urgent' | 'High' | 'Medium' | 'Low';
export type TicketCategory = 'Billing' | 'Technical Bug' | 'Feature Request' | 'Account Access' | 'General';
export type TicketSentiment = 'Frustrated' | 'Neutral' | 'Delighted';
export type TicketChannel = 'Web Portal' | 'Email' | 'API';

export interface Ticket {
  ticket_id: string;
  customer_name: string;
  customer_email: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  sentiment: TicketSentiment;
  channel: TicketChannel;
  organization: string;
  created_at: string;
  updated_at: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TicketCounts {
  all: number;
  open: number;
  inProgress: number;
  closed: number;
}

export interface PaginatedTicketsResponse {
  tickets: Ticket[];
  pagination: PaginationMeta;
  counts: TicketCounts;
}

export interface Note {
  id: number;
  ticket_id: string;
  note_text: string;
  created_at: string;
}

export interface TicketDetail extends Ticket {
  notes: Note[];
}

export interface User {
  username: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface CreateTicketResponse {
  ticket_id: string;
  created_at: string;
  priority?: TicketPriority;
  category?: TicketCategory;
  sentiment?: TicketSentiment;
  channel?: TicketChannel;
  organization?: string;
}

export interface UpdateTicketResponse {
  success: boolean;
  updated_at: string;
}

export interface AISuggestionResponse {
  suggestion: string;
}

export interface ApiError {
  error: string;
  details?: unknown;
}