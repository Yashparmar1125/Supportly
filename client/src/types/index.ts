export type TicketStatus = 'Open' | 'In Progress' | 'Closed';

export interface Ticket {
  ticket_id: string;
  customer_name: string;
  customer_email: string;
  subject: string;
  description: string;
  status: TicketStatus;
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