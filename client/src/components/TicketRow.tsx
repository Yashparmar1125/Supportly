import React from 'react';
import { useNavigate } from 'react-router';
import type { Ticket } from '../types';
import { StatusBadge } from './ui/StatusBadge';
import { PriorityBadge } from './ui/PriorityBadge';
import { ChevronRight, Building2 } from 'lucide-react';
import { getInitials, formatRelativeTime } from '../lib/formatters';
import { getChannelIcon, getCategoryBadge } from '../lib/ticketConfig';

export const TicketRow: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
  const navigate = useNavigate();
  const categoryConfig = getCategoryBadge(ticket.category);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View ticket ${ticket.ticket_id}: ${ticket.subject}`}
      onClick={() => navigate(`/tickets/${ticket.ticket_id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(`/tickets/${ticket.ticket_id}`);
        }
      }}
      className="grid grid-cols-[80px_1fr_auto] sm:grid-cols-[90px_1fr_125px_100px_105px_75px_20px] gap-3 sm:gap-4 items-center px-4 sm:px-6 py-3.5 hover:bg-[#fafbff] focus:bg-[#f4f6ff] focus:outline-none focus:border-l-primary cursor-pointer transition-all border-l-2 border-l-transparent hover:border-l-primary group"
    >
      {/* 1. Ticket ID */}
      <div>
        <span className="font-mono text-xs font-bold text-primary bg-[#eef2ff] border border-primary/20 px-2 py-1 rounded-md tracking-tight inline-block">
          {ticket.ticket_id}
        </span>
      </div>

      {/* 2. Subject & Clean Customer Hierarchy */}
      <div className="min-w-0 pr-2">
        <p className="font-bold text-ink text-sm sm:text-[14.5px] truncate group-hover:text-primary transition-colors">
          {ticket.subject}
        </p>

        {/* Customer & Secondary Metadata Sub-row */}
        <div className="flex items-center gap-2 text-xs text-ink/60 mt-1 truncate">
          <div className="flex items-center gap-1.5 font-semibold text-ink/85 shrink-0">
            <div className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[9px] font-bold shrink-0">
              {getInitials(ticket.customer_name)}
            </div>
            <span className="truncate max-w-[130px]">{ticket.customer_name}</span>
          </div>

          {/* Organization Tag */}
          {ticket.organization && ticket.organization !== 'Individual' && (
            <>
              <span className="text-ink/20 font-bold shrink-0">·</span>
              <span className="inline-flex items-center gap-1 text-primary font-medium text-[11px] shrink-0">
                <Building2 className="w-3 h-3 text-primary/70 shrink-0" />
                <span>{ticket.organization}</span>
              </span>
            </>
          )}

          <span className="text-ink/20 font-bold shrink-0 hidden md:inline">·</span>

          {/* Channel Indicator & Email */}
          <div className="hidden md:flex items-center gap-1 text-ink/45 truncate text-[11px]">
            {getChannelIcon(ticket.channel)}
            <span className="truncate">{ticket.customer_email}</span>
          </div>

          {/* Mobile-only Category & Priority chips */}
          <div className="sm:hidden flex items-center gap-1 shrink-0">
            <span className="text-ink/20 font-bold">·</span>
            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border ${categoryConfig.badgeClass}`}>
              {categoryConfig.icon}
              <span>{categoryConfig.shortLabel}</span>
            </span>
            <PriorityBadge priority={ticket.priority || 'Medium'} />
          </div>
        </div>
      </div>

      {/* 3. Dedicated Category Column (Desktop) */}
      <div className="hidden sm:flex items-center shrink-0">
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium border ${categoryConfig.badgeClass}`}>
          {categoryConfig.icon}
          <span>{categoryConfig.shortLabel}</span>
        </span>
      </div>

      {/* 4. Priority Column (Desktop) */}
      <div className="hidden sm:flex items-center shrink-0">
        <PriorityBadge priority={ticket.priority || 'Medium'} />
      </div>

      {/* 5. Status Column */}
      <div className="shrink-0">
        <StatusBadge status={ticket.status} size="md" />
      </div>

      {/* 6. Timestamp (Desktop) */}
      <div className="hidden sm:flex items-center text-xs text-ink/50 font-medium shrink-0 justify-end whitespace-nowrap">
        <span>{formatRelativeTime(ticket.created_at)}</span>
      </div>

      {/* 7. Chevron Arrow */}
      <div className="hidden sm:flex justify-end text-ink/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all">
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
};