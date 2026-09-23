import React from 'react';
import type { Ticket } from '../types';
import { TicketRow } from './TicketRow';
import { Inbox } from 'lucide-react';

interface TicketTableProps {
  tickets: Ticket[];
  isLoading: boolean;
}

export const TicketTable: React.FC<TicketTableProps> = ({ tickets, isLoading }) => {
  if (isLoading) {
    return (
      <div className="border border-line rounded-xl overflow-hidden shadow-card bg-card">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="grid grid-cols-[74px_1fr_100px_64px] gap-2.5 items-center px-3.5 py-4 border-b border-line last:border-b-0">
            <div className="h-3 bg-line rounded animate-pulse w-14" />
            <div className="h-3 bg-line rounded animate-pulse w-3/4" />
            <div className="h-3 bg-line rounded animate-pulse w-16" />
            <div className="h-3 bg-line rounded animate-pulse w-10 hidden sm:block" />
          </div>
        ))}
      </div>
    );
  }

  if (!tickets.length) {
    return (
      <div className="border border-line rounded-xl overflow-hidden shadow-card bg-card p-12 text-center">
        <Inbox className="w-12 h-12 text-ink/15 mx-auto mb-3" />
        <h3 className="font-semibold text-ink mb-1">No tickets found</h3>
        <p className="text-sm text-ink/50">Try adjusting your filters or create a new ticket.</p>
      </div>
    );
  }

  return (
    <div className="border border-line rounded-xl overflow-hidden shadow-card bg-card">
      <div className="grid grid-cols-[74px_1fr_100px_64px] gap-2.5 items-center px-3.5 py-2 text-[11px] font-bold text-ink/45 border-b border-line uppercase tracking-wider">
        <div>ID</div>
        <div>Subject</div>
        <div>Status</div>
        <div className="hidden sm:block">Date</div>
      </div>
      <div className="divide-y divide-line">
        {tickets.map((ticket) => (
          <TicketRow key={ticket.ticket_id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};