import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/api';
import { queryKeys } from '../lib/queryKeys';
import type {
  TicketDetail,
  TicketStatus,
  TicketPriority,
  TicketCategory,
  CreateTicketResponse,
  UpdateTicketResponse,
  AISuggestionResponse,
  PaginatedTicketsResponse,
} from '../types';

export const useTickets = (
  filters: {
    status?: string;
    priority?: string;
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  } = {}
) => {
  return useQuery({
    queryKey: queryKeys.ticketList(filters),
    queryFn: () =>
      apiClient.get<PaginatedTicketsResponse>('/api/tickets', {
        ...(filters.status && filters.status !== 'All' ? { status: filters.status } : {}),
        ...(filters.priority && filters.priority !== 'All' ? { priority: filters.priority } : {}),
        ...(filters.category && filters.category !== 'All' ? { category: filters.category } : {}),
        ...(filters.search ? { search: filters.search } : {}),
        ...(filters.page ? { page: String(filters.page) } : {}),
        ...(filters.limit ? { limit: String(filters.limit) } : {}),
      }),
    placeholderData: (previousData) => previousData,
  });
};

export const useTicket = (ticketId: string) => {
  return useQuery({
    queryKey: queryKeys.ticket(ticketId),
    queryFn: () => apiClient.get<TicketDetail>(`/api/tickets/${ticketId}`),
    enabled: !!ticketId,
  });
};

export const useCreateTicket = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      customer_name: string;
      customer_email: string;
      subject: string;
      description: string;
      priority?: TicketPriority;
      category?: TicketCategory;
      channel?: string;
      organization?: string;
    }) => apiClient.post<CreateTicketResponse>('/api/tickets', data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.tickets });
    },
  });
};

export const useUpdateTicket = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      ticketId,
      ...data
    }: {
      ticketId: string;
      status?: TicketStatus;
      priority?: TicketPriority;
      category?: TicketCategory;
      note?: string;
    }) => apiClient.put<UpdateTicketResponse>(`/api/tickets/${ticketId}`, data),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: queryKeys.tickets });
      qc.invalidateQueries({ queryKey: queryKeys.ticket(variables.ticketId) });
    },
  });
};

export const useSuggestReply = () => {
  return useMutation({
    mutationFn: (ticketId: string) =>
      apiClient.post<AISuggestionResponse>(`/api/tickets/${ticketId}/suggest`),
  });
};