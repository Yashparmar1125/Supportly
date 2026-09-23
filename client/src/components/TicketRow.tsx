import React from 'react';
import { useNavigate } from 'react-router';
import type { Ticket } from '../types';
import { StatusBadge } from './ui/StatusBadge';
import { PriorityBadge } from './ui/PriorityBadge';
import {
  ChevronRight,
  Clock,
  Mail,
  Globe,
  Code2,
  Building2,
  CreditCard,
  Bug,
  Sparkles,
  KeyRound,
  FileText,
} from 'lucide-react';

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
          <span title="Inbound Email" className="shrink-0">
            <Mail className="w-3 h-3 text-ink/40" />
          </span>
        );
      case 'API':
        return (
          <span title="API Webhook" className="shrink-0">
            <Code2 className="w-3 h-3 text-purple-600" />
          </span>
        );
      case 'Web Portal':
      default:
        return (
          <span title="Customer Portal" className="shrink-0">
            <Globe className="w-3 h-3 text-indigo-500" />
          </span>
        );
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'Billing':
        return <CreditCard className="w-3 h-3 text-emerald-600 shrink-0" />;
      case 'Technical Bug':
        return <Bug className="w-3 h-3 text-rose-600 shrink-0" />;
      case 'Feature Request':
        return <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />;
      case 'Account Access':
        return <KeyRound className="w-3 h-3 text-indigo-600 shrink-0" />;
      case 'General':
      default:
        return <FileText className="w-3 h-3 text-slate-500 shrink-0" />;
    }
  };

  return (
    <div
      onClick={() => navigate(`/tickets/${ticket.ticket_id}`)}
      className="grid grid-cols-[85px_1fr_auto] sm:grid-cols-[95px_1fr_105px_115px_85px_24px] gap-3 sm:gap-4 items-center px-4 sm:px-6 py-4 hover:bg-[#f8f9ff] cursor-pointer transition-all border-l-2 border-l-transparent hover:border-l-primary group"
    >
      {/* 1. Ticket ID */}
      <div>
        <span className="font-mono text-xs font-bold text-primary bg-[#eef2ff] border border-primary/20 px-2.5 py-1 rounded-md tracking-tight inline-block">
          {ticket.ticket_id}
        </span>
      </div>

      {/* 2. Subject & Metadata */}
      <div className="min-w-0 pr-2">
        <p className="font-bold text-ink text-sm sm:text-[14.5px] truncate group-hover:text-primary transition-colors">
          {ticket.subject}
        </p>

        {/* Customer & Secondary Metadata Sub-row */}
        <div className="flex items-center gap-2 text-xs text-ink/60 mt-1.5 flex-wrap sm:flex-nowrap truncate">
          <div className="flex items-center gap-1.5 font-medium text-ink/80 shrink-0">
            <div className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[9px] font-bold shrink-0">
              {getInitials(ticket.customer_name)}
            </div>
            <span className="truncate max-w-[140px]">{ticket.customer_name}</span>
          </div>

          {/* Organization Tag */}
          {ticket.organization && ticket.organization !== 'Individual' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50/90 text-primary font-semibold text-[11px] border border-primary/20 shrink-0">
              <Building2 className="w-3 h-3 text-primary/70 shrink-0" />
              <span>{ticket.organization}</span>
            </span>
          )}

          {/* Category Tag */}
          {ticket.category && (
            <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px] border border-slate-200/80 shrink-0">
              {getCategoryIcon(ticket.category)}
              <span>{ticket.category}</span>
            </span>
          )}

          <span className="text-ink/30 hidden lg:inline">·</span>

          {/* Channel Indicator & Email */}
          <div className="hidden lg:flex items-center gap-1.5 text-ink/50 truncate text-[11px]">
            {getChannelIcon(ticket.channel)}
            <span className="truncate">{ticket.customer_email}</span>
          </div>

          {/* Mobile-only Priority indicator */}
          <div className="sm:hidden flex items-center gap-1 shrink-0">
            <span className="text-ink/30">·</span>
            <PriorityBadge priority={ticket.priority || 'Medium'} size="sm" />
          </div>
        </div>
      </div>

      {/* 3. Priority Column (Desktop) */}
      <div className="hidden sm:flex items-center shrink-0">
        <PriorityBadge priority={ticket.priority || 'Medium'} size="md" />
      </div>

      {/* 4. Status Column */}
      <div className="shrink-0">
        <StatusBadge status={ticket.status} size="md" />
      </div>

      {/* 5. Timestamp (Desktop) */}
      <div className="hidden sm:flex items-center gap-1.5 text-xs text-ink/55 font-medium shrink-0 justify-end">
        <Clock className="w-3.5 h-3.5 text-ink/40 shrink-0" />
        <span>{formatRelativeTime(ticket.created_at)}</span>
      </div>

      {/* 6. Chevron Arrow */}
      <div className="hidden sm:flex justify-end text-ink/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all">
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
};