import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/api';
import { queryKeys } from '../lib/queryKeys';
import type {
  Ticket,
  TicketDetail,
  TicketStatus,
  CreateTicketResponse,
  UpdateTicketResponse,
  AISuggestionResponse,
} from '../types';

export const useTickets = (filters: { status?: string; search?: string } = {}) => {
  return useQuery({
    queryKey: queryKeys.ticketList(filters),
    queryFn: () =>
      apiClient.get<Ticket[]>('/api/tickets', {
        ...(filters.status && filters.status !== 'All' ? { status: filters.status } : {}),
        ...(filters.search ? { search: filters.search } : {}),
      }),
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