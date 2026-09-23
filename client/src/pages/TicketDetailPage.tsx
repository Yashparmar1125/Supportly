import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useTicket, useUpdateTicket, useSuggestReply } from '../hooks/useTickets';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Select } from '../components/ui/Select';
import { TextArea } from '../components/ui/TextArea';
import { NoteTimeline } from '../components/NoteTimeline';
import { AISuggestion } from '../components/AISuggestion';
import type { TicketStatus } from '../types';
import { ArrowLeft, Mail, User, Clock } from 'lucide-react';

export const TicketDetailPage: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();

  const { data: ticket, isLoading } = useTicket(ticketId!);
  const updateMutation = useUpdateTicket();
  const suggestMutation = useSuggestReply();

  const [newNote, setNewNote] = useState('');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="text-center py-20">
        <p className="text-ink/50 text-lg">Ticket not found.</p>
        <Button variant="ghost" className="mt-4" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateMutation.mutate({
      ticketId: ticket.ticket_id,
      status: e.target.value as TicketStatus,
    });
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    updateMutation.mutate(
      { ticketId: ticket.ticket_id, note: newNote },
      { onSuccess: () => setNewNote('') }
    );
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to tickets
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ticket info card */}
          <div className="bg-card rounded-xl shadow-card border border-line p-6">
            <div className="flex flex-wrap gap-3 mb-3 items-center">
              <span className="font-mono text-sm text-ink/50">{ticket.ticket_id}</span>
              <StatusBadge status={ticket.status} />
            </div>
            <h1 className="text-2xl font-bold text-ink mb-3">{ticket.subject}</h1>
            <p className="text-sm text-ink/75 whitespace-pre-wrap leading-relaxed">{ticket.description}</p>
          </div>

          {/* Notes / conversation */}
          <div className="bg-card rounded-xl shadow-card border border-line p-6">
            <h3 className="text-lg font-bold text-ink mb-4">Notes &amp; Activity</h3>

            {ticket.notes && ticket.notes.length > 0 ? (
              <NoteTimeline notes={ticket.notes} />
            ) : (
              <p className="text-sm text-ink/40 py-4">No notes yet. Add one below.</p>
            )}

            <div className="mt-8 pt-6 border-t border-line space-y-4">
              <AISuggestion
                onSuggest={() => suggestMutation.mutate(ticket.ticket_id)}
                suggestion={suggestMutation.data?.suggestion || null}
                isLoading={suggestMutation.isPending}
                onApply={(text) => setNewNote(text)}
              />
              <TextArea
                label="Add a note"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Type your reply or internal note..."
                rows={4}
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleAddNote}
                  isLoading={updateMutation.isPending}
                  disabled={!newNote.trim()}
                >
                  Add Note
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-card rounded-xl shadow-card border border-line p-6 space-y-5">
            <h3 className="font-bold text-ink border-b border-line pb-2">Ticket Details</h3>

            <Select
              label="Status"
              value={ticket.status}
              onChange={handleStatusChange}
              options={[
                { label: 'Open', value: 'Open' },
                { label: 'In Progress', value: 'In Progress' },
                { label: 'Closed', value: 'Closed' },
              ]}
            />

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <User className="w-4 h-4 text-ink/40 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs font-semibold text-ink/50 uppercase tracking-wider">Customer</span>
                  <div className="text-sm font-medium">{ticket.customer_name}</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-ink/40 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs font-semibold text-ink/50 uppercase tracking-wider">Email</span>
                  <div className="text-sm text-ink/70">{ticket.customer_email}</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-ink/40 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs font-semibold text-ink/50 uppercase tracking-wider">Created</span>
                  <div className="text-sm font-mono text-ink/60">{formatDate(ticket.created_at)}</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-ink/40 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs font-semibold text-ink/50 uppercase tracking-wider">Updated</span>
                  <div className="text-sm font-mono text-ink/60">{formatDate(ticket.updated_at)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};