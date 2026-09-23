export const queryKeys = {
  tickets: ['tickets'] as const,
  ticketList: (filters: { status?: string; search?: string; page?: number; limit?: number }) =>
    ['tickets', 'list', filters] as const,
  ticket: (id: string) => ['tickets', 'detail', id] as const,
  notes: (ticketId: string) => ['tickets', 'notes', ticketId] as const,
};