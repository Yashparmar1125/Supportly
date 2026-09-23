import React from 'react';
import { useNavigate } from 'react-router';
import type { Ticket, TicketCategory } from '../types';
import { StatusBadge } from './ui/StatusBadge';
import { PriorityBadge } from './ui/PriorityBadge';
import {
  ChevronRight,
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

  const getCategoryBadge = (category?: TicketCategory | string) => {
    switch (category) {
      case 'Billing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium text-emerald-700 bg-emerald-50/90 border border-emerald-200/70">
            <CreditCard className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>Billing</span>
          </span>
        );
      case 'Technical Bug':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium text-rose-700 bg-rose-50/90 border border-rose-200/70">
            <Bug className="w-3 h-3 text-rose-600 shrink-0" />
            <span>Bug Report</span>
          </span>
        );
      case 'Feature Request':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium text-amber-800 bg-amber-50/90 border border-amber-200/70">
            <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
            <span>Feature</span>
          </span>
        );
      case 'Account Access':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium text-indigo-700 bg-indigo-50/90 border border-indigo-200/70">
            <KeyRound className="w-3 h-3 text-indigo-600 shrink-0" />
            <span>Access</span>
          </span>
        );
      case 'General':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium text-slate-600 bg-slate-100/90 border border-slate-200/70">
            <FileText className="w-3 h-3 text-slate-500 shrink-0" />
            <span>General</span>
          </span>
        );
    }
  };

  return (
    <div
      onClick={() => navigate(`/tickets/${ticket.ticket_id}`)}
      className="grid grid-cols-[80px_1fr_auto] sm:grid-cols-[90px_1fr_125px_100px_105px_75px_20px] gap-3 sm:gap-4 items-center px-4 sm:px-6 py-3.5 hover:bg-[#fafbff] cursor-pointer transition-all border-l-2 border-l-transparent hover:border-l-primary group"
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

          {/* Organization Tag (Clean text with subtle building icon) */}
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
            {getCategoryBadge(ticket.category)}
            <PriorityBadge priority={ticket.priority || 'Medium'} />
          </div>
        </div>
      </div>

      {/* 3. Dedicated Category Column (Desktop) */}
      <div className="hidden sm:flex items-center shrink-0">
        {getCategoryBadge(ticket.category)}
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