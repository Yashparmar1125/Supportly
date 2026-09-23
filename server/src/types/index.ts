export interface User {
  id: number;
  username: string;
  role: string;
}

export interface Ticket {
  id: number;
  ticket_id: string;
  customer_name: string;
  customer_email: string;
  subject: string;
  description: string;
  status: "Open" | "In Progress" | "Closed";
  created_at: Date;
  updated_at: Date;
}

export interface Note {
  id: number;
  ticket_id: string;
  note_text: string;
  created_at: Date;
}
