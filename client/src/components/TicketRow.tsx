import React from 'react';
import { useNavigate } from 'react-router';
import type { Ticket } from '../types';
import { StatusBadge } from './ui/StatusBadge';

export const TicketRow: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
  const navigate = useNavigate();

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div
      onClick={() => navigate(`/tickets/${ticket.ticket_id}`)}
      className="grid grid-cols-[74px_1fr_100px_64px] gap-2.5 items-center px-3.5 py-3 text-[13px] border-b border-line last:border-b-0 hover:bg-canvas/80 cursor-pointer transition-colors"
    >
      <div className="font-mono text-[11px] text-ink/55">{ticket.ticket_id}</div>
      <div className="font-medium text-ink truncate pr-4">{ticket.subject}</div>
      <div><StatusBadge status={ticket.status} /></div>
      <div className="text-[12px] text-ink/50 hidden sm:block">{formatDate(ticket.created_at)}</div>
    </div>
  );
};