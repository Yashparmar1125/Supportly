import React from 'react';
import { useNavigate } from 'react-router';
import type { Ticket } from '../types';
import { StatusBadge } from './ui/StatusBadge';
import { PriorityBadge } from './ui/PriorityBadge';
import { ChevronRight, Clock, Mail, Globe, Code2 } from 'lucide-react';

export const TicketRow: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    if (!name) return 'CU';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const formatRelativeTime = (dateStr: string) => {
    try {
      const now = new Date();
      const date = new Date(dateStr);
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

      if (diffInSeconds < 60) return 'Just now';
      const minutes = Math.floor(diffInSeconds / 60);
      if (minutes < 60) return `${minutes}m ago`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours}h ago`;
      const days = Math.floor(hours / 24);
      if (days < 7) return `${days}d ago`;

      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const getChannelIcon = (channel?: string) => {
    switch (channel) {
      case 'Email':
        return (
          <span title="Inbound Email">
            <Mail className="w-3 h-3 text-ink/40" />
          </span>
        );
      case 'API':
        return (
          <span title="API Webhook">
            <Code2 className="w-3 h-3 text-purple-600" />
          </span>
        );
      case 'Web Portal':
      default:
        return (
          <span title="Customer Portal">
            <Globe className="w-3 h-3 text-indigo-500" />
          </span>
        );
    }
  };

  return (
    <div
      onClick={() => navigate(`/tickets/${ticket.ticket_id}`)}
      className="grid grid-cols-[90px_1fr_auto_70px] sm:grid-cols-[100px_1fr_120px_110px_32px] gap-3 sm:gap-4 items-center px-4 sm:px-6 py-4 hover:bg-[#f8f9ff] cursor-pointer transition-all border-l-2 border-l-transparent hover:border-l-primary group"
    >
      {/* 1. Ticket ID */}
      <div>
        <span className="font-mono text-xs font-bold text-primary bg-[#eef2ff] border border-primary/20 px-2.5 py-1 rounded-md tracking-tight inline-block">
          {ticket.ticket_id}
        </span>
      </div>

      {/* 2. Subject & Triage Metadata */}
      <div className="min-w-0 pr-2">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-bold text-ink text-sm sm:text-[14.5px] truncate group-hover:text-primary transition-colors max-w-md">
            {ticket.subject}
          </p>

          {/* Priority SLA Badge */}
          {ticket.priority && (
            <PriorityBadge priority={ticket.priority} size="sm" />
          )}

          {/* Category Tag */}
          {ticket.category && (
            <span className="hidden md:inline-flex items-center text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200/80">
              {ticket.category}
            </span>
          )}
        </div>

        {/* Customer & Organization Sub-row */}
        <div className="flex items-center gap-2 text-xs text-ink/60 mt-1 truncate">
          <div className="flex items-center gap-1.5 font-medium text-ink/80 shrink-0">
            <div className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[9px] font-bold shrink-0">
              {getInitials(ticket.customer_name)}
            </div>
            <span className="truncate">{ticket.customer_name}</span>
          </div>

          {/* Organization Pill */}
          {ticket.organization && ticket.organization !== 'Individual' && (
            <span className="hidden lg:inline-flex items-center px-1.5 py-0.2 rounded bg-indigo-50/80 text-primary font-bold text-[10px] border border-primary/20">
              {ticket.organization}
            </span>
          )}

          <span className="text-ink/30 hidden md:inline">·</span>

          {/* Channel Indicator */}
          <div className="hidden md:flex items-center gap-1 text-ink/50 truncate">
            {getChannelIcon(ticket.channel)}
            <span className="truncate">{ticket.customer_email}</span>
          </div>
        </div>
      </div>

      {/* 3. Status Badge */}
      <div className="shrink-0">
        <StatusBadge status={ticket.status} />
      </div>

      {/* 4. Timestamp */}
      <div className="hidden sm:flex items-center gap-1.5 text-xs text-ink/55 font-medium shrink-0 justify-end">
        <Clock className="w-3.5 h-3.5 text-ink/40" />
        <span>{formatRelativeTime(ticket.created_at)}</span>
      </div>

      {/* 5. Chevron Arrow */}
      <div className="hidden sm:flex justify-end text-ink/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all">
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
};