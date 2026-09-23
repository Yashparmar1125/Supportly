import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useTicket, useUpdateTicket, useSuggestReply } from '../hooks/useTickets';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import { PriorityBadge } from '../components/ui/PriorityBadge';
import { Select } from '../components/ui/Select';
import { TextArea } from '../components/ui/TextArea';
import { NoteTimeline } from '../components/NoteTimeline';
import { AISuggestion } from '../components/AISuggestion';
import type { TicketStatus, TicketPriority, TicketCategory } from '../types';
import {
  ArrowLeft,
  Mail,
  User,
  CheckCircle2,
  PlayCircle,
  RotateCcw,
  Sparkles,
  MessageSquare,
  ShieldAlert,
  Globe,
  Code2,
  Smile,
  Frown,
  Meh,
  Cpu,
  Building2,
  CreditCard,
  Bug,
  KeyRound,
  FileText,
} from 'lucide-react';

export const TicketDetailPage: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();

  const { data: ticket, isLoading } = useTicket(ticketId!);
  const updateMutation = useUpdateTicket();
  const suggestMutation = useSuggestReply();

  const [newNote, setNewNote] = useState('');

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-28 space-y-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono text-ink/50">Loading ticket details...</p>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="max-w-md mx-auto text-center py-20 bg-card rounded-2xl border border-line p-8 shadow-card">
        <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h3 className="font-extrabold text-lg text-ink mb-1">Ticket Not Found</h3>
        <p className="text-sm text-ink/60 mb-6">
          The requested ticket does not exist or may have been deleted.
        </p>
        <Button onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Dashboard
        </Button>
      </div>
    );
  }

  const handleStatusChange = (newStatus: TicketStatus) => {
    updateMutation.mutate({
      ticketId: ticket.ticket_id,
      status: newStatus,
    });
  };

  const handlePriorityChange = (newPriority: TicketPriority) => {
    updateMutation.mutate({
      ticketId: ticket.ticket_id,
      priority: newPriority,
    });
  };

  const handleCategoryChange = (newCategory: TicketCategory) => {
    updateMutation.mutate({
      ticketId: ticket.ticket_id,
      category: newCategory,
    });
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    updateMutation.mutate(
      { ticketId: ticket.ticket_id, note: newNote.trim() },
      { onSuccess: () => setNewNote('') }
    );
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getInitials = (name: string) => {
    if (!name) return 'CU';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const getSentimentIcon = (sentiment?: string) => {
    switch (sentiment) {
      case 'Frustrated':
        return <Frown className="w-3.5 h-3.5 text-rose-500" />;
      case 'Delighted':
        return <Smile className="w-3.5 h-3.5 text-emerald-500" />;
      case 'Neutral':
      default:
        return <Meh className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  const getChannelIcon = (channel?: string) => {
    switch (channel) {
      case 'Email':
        return <Mail className="w-3.5 h-3.5 text-ink/50" />;
      case 'API':
        return <Code2 className="w-3.5 h-3.5 text-purple-600" />;
      case 'Web Portal':
      default:
        return <Globe className="w-3.5 h-3.5 text-indigo-500" />;
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'Billing':
        return <CreditCard className="w-3.5 h-3.5 text-emerald-600 shrink-0" />;
      case 'Technical Bug':
        return <Bug className="w-3.5 h-3.5 text-rose-600 shrink-0" />;
      case 'Feature Request':
        return <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />;
      case 'Account Access':
        return <KeyRound className="w-3.5 h-3.5 text-indigo-600 shrink-0" />;
      case 'General':
      default:
        return <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      {/* Top Header & Breadcrumbs Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-lg border border-line bg-card hover:bg-canvas text-ink/70 hover:text-ink transition-colors cursor-pointer"
            title="Back to Tickets"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 text-xs text-ink/60 font-medium">
            <Link to="/dashboard" className="hover:text-primary transition-colors">Tickets</Link>
            <span>/</span>
            <span className="font-mono font-bold text-primary bg-[#eef2ff] px-2 py-0.5 rounded border border-primary/20">
              {ticket.ticket_id}
            </span>
          </div>
        </div>

        {/* Quick Status Action Controls */}
        <div className="flex items-center gap-2">
          {ticket.status !== 'In Progress' && (
            <button
              onClick={() => handleStatusChange('In Progress')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors cursor-pointer"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Mark In Progress</span>
            </button>
          )}

          {ticket.status !== 'Closed' ? (
            <button
              onClick={() => handleStatusChange('Closed')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shadow-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Resolve Ticket</span>
            </button>
          ) : (
            <button
              onClick={() => handleStatusChange('Open')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reopen Ticket</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Ticket Inquiry, AI Response & Activity Notes (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Customer Inquiry Card */}
          <div className="bg-card rounded-2xl shadow-card border border-line p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                  {getInitials(ticket.customer_name)}
                </div>
                <div>
                  <h3 className="font-bold text-ink text-base leading-tight">
                    {ticket.customer_name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-ink/60 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-ink/40" />
                      {ticket.customer_email}
                    </span>
                    <span className="text-ink/30">·</span>
                    <span className="font-mono text-[11px] text-ink/50">
                      {formatDate(ticket.created_at)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <PriorityBadge priority={ticket.priority} showSla={true} size="md" />
                <StatusBadge status={ticket.status} />
              </div>
            </div>

            {/* Subject & Description Body */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-ink tracking-tight">
                {ticket.subject}
              </h2>
              <div className="text-sm text-ink/80 leading-relaxed whitespace-pre-wrap bg-canvas/60 p-4 rounded-xl border border-line/60">
                {ticket.description}
              </div>
            </div>
          </div>

          {/* AI Response Copilot Card */}
          <div className="bg-gradient-to-br from-indigo-50/50 via-card to-purple-50/30 rounded-2xl shadow-card border border-primary/20 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-ink flex items-center gap-1.5">
                    AI Response Copilot
                    <span className="text-[10px] font-mono font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                      Zero-Shot LLM
                    </span>
                  </h3>
                  <p className="text-xs text-ink/60">
                    Draft an empathetic, context-aware reply using ticket data.
                  </p>
                </div>
              </div>
            </div>

            <AISuggestion
              suggestion={suggestMutation.data?.suggestion || null}
              isLoading={suggestMutation.isPending}
              onSuggest={() => suggestMutation.mutate(ticket.ticket_id)}
              onApply={(text: string) => setNewNote(text)}
            />
          </div>

          {/* Activity Timeline & Notes Composer */}
          <div className="bg-card rounded-2xl shadow-card border border-line p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-extrabold text-ink uppercase tracking-wider">
                  Activity Timeline ({ticket.notes?.length || 0})
                </h3>
              </div>
              <span className="text-xs text-ink/40 font-mono">Internal Audit Log</span>
            </div>

            {/* Note Timeline Component */}
            <NoteTimeline notes={ticket.notes || []} />

            {/* Post Note Composer */}
            <div className="pt-4 border-t border-line space-y-3">
              <TextArea
                label="Add internal note or customer reply"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Type resolution updates, investigation findings, or drafted email replies..."
                rows={4}
              />
              <div className="flex items-center justify-between pt-1">
                <p className="text-[11px] text-ink/40">Notes are visible to agents in this ticket's audit log.</p>
                <Button
                  onClick={handleAddNote}
                  isLoading={updateMutation.isPending}
                  disabled={!newNote.trim()}
                  size="sm"
                >
                  Post Note
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Metadata & Details Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* AI Zero-Touch Triage Card */}
          <div className="bg-card rounded-2xl shadow-card border border-line p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-2.5">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink/70">
                  AI Zero-Touch Triage
                </h4>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Triage Verified" />
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1">
                <span className="text-ink/60">Category</span>
                <span className="inline-flex items-center gap-1.5 font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                  {getCategoryIcon(ticket.category)}
                  <span>{ticket.category || 'General'}</span>
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-t border-line/60">
                <span className="text-ink/60">Customer Sentiment</span>
                <span className="inline-flex items-center gap-1.5 font-bold text-ink">
                  {getSentimentIcon(ticket.sentiment)}
                  <span>{ticket.sentiment || 'Neutral'}</span>
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-t border-line/60">
                <span className="text-ink/60">Intake Channel</span>
                <span className="inline-flex items-center gap-1.5 font-bold text-ink">
                  {getChannelIcon(ticket.channel)}
                  <span>{ticket.channel || 'Web Portal'}</span>
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-t border-line/60">
                <span className="text-ink/60">Client Account</span>
                <span className="inline-flex items-center gap-1.5 font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md border border-primary/20">
                  <Building2 className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>{ticket.organization || 'Individual'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Ticket State & SLA Updaters */}
          <div className="bg-card rounded-2xl shadow-card border border-line p-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink/50 border-b border-line pb-2.5">
              Triage & SLA Overrides
            </h4>

            <Select
              label="Ticket Status"
              value={ticket.status}
              onChange={(e) => handleStatusChange(e.target.value as TicketStatus)}
              options={[
                { label: 'Open (Needs Attention)', value: 'Open' },
                { label: 'In Progress (Active Triage)', value: 'In Progress' },
                { label: 'Closed (Resolved)', value: 'Closed' },
              ]}
            />

            <Select
              label="Priority (SLA Target)"
              value={ticket.priority || 'Medium'}
              onChange={(e) => handlePriorityChange(e.target.value as TicketPriority)}
              options={[
                { label: 'Urgent (2 Hours SLA)', value: 'Urgent' },
                { label: 'High (8 Hours SLA)', value: 'High' },
                { label: 'Medium (24 Hours SLA)', value: 'Medium' },
                { label: 'Low (48 Hours SLA)', value: 'Low' },
              ]}
            />

            <Select
              label="Category Routing"
              value={ticket.category || 'General'}
              onChange={(e) => handleCategoryChange(e.target.value as TicketCategory)}
              options={[
                { label: 'Billing & Invoicing', value: 'Billing' },
                { label: 'Technical Bug', value: 'Technical Bug' },
                { label: 'Feature Request', value: 'Feature Request' },
                { label: 'Account Access & Security', value: 'Account Access' },
                { label: 'General Inquiry', value: 'General' },
              ]}
            />
          </div>

          {/* Customer Profile Card */}
          <div className="bg-card rounded-2xl shadow-card border border-line p-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink/50 border-b border-line pb-2.5">
              Customer Info
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[11px] text-ink/50 block font-medium">Customer Name</span>
                  <p className="font-bold text-ink text-sm">{ticket.customer_name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-canvas border border-line text-ink/60 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] text-ink/50 block font-medium">Email Address</span>
                  <a
                    href={`mailto:${ticket.customer_email}`}
                    className="font-medium text-primary hover:underline truncate block"
                  >
                    {ticket.customer_email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Metadata Card */}
          <div className="bg-card rounded-2xl shadow-card border border-line p-5 space-y-3.5 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink/50 border-b border-line pb-2.5">
              Metadata & SLA
            </h4>

            <div className="flex justify-between items-center py-1">
              <span className="text-ink/60">Reference ID</span>
              <span className="font-mono font-bold text-primary bg-[#eef2ff] px-2 py-0.5 rounded border border-primary/20">
                {ticket.ticket_id}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-t border-line/60">
              <span className="text-ink/60">Created</span>
              <span className="font-mono text-ink/80">{formatDate(ticket.created_at)}</span>
            </div>

            <div className="flex justify-between items-center py-1 border-t border-line/60">
              <span className="text-ink/60">Last Updated</span>
              <span className="font-mono text-ink/80">{formatDate(ticket.updated_at)}</span>
            </div>

            <div className="flex justify-between items-center py-1 border-t border-line/60">
              <span className="text-ink/60">Database Host</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]">
                Neon Serverless
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};