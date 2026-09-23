import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { InputField } from '../components/ui/InputField';
import { TextArea } from '../components/ui/TextArea';
import { Button } from '../components/ui/Button';
import { useCreateTicket } from '../hooks/useTickets';
import { useToast } from '../context/ToastContext';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';

export const CreateTicketPage: React.FC = () => {
  const navigate = useNavigate();
  const createMutation = useCreateTicket();
  const toast = useToast();
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    subject: '',
    customer_name: '',
    customer_email: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    createMutation.mutate(form, {
      onSuccess: (data) => {
        toast.success(`Ticket ${data.ticket_id} created successfully!`);
        navigate(`/tickets/${data.ticket_id}`);
      },
      onError: (err: any) => {
        const msg = err?.error || err?.message || 'Failed to create ticket';
        setError(msg);
        toast.error(msg);
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header with Breadcrumb */}
      <div className="flex items-center gap-3 border-b border-line pb-4">
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
          <span className="font-bold text-ink">New Ticket</span>
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-card border border-line p-6 sm:p-10">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eef2ff] text-primary text-xs font-mono font-bold mb-3 border border-primary/20">
            <Sparkles className="w-3.5 h-3.5" />
            New Support Ticket
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            Create Support Ticket
          </h1>
          <p className="text-xs sm:text-sm text-ink/60 mt-1">
            Log an issue on behalf of a customer from phone, Slack, or email correspondence.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Ticket Subject"
            required
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            placeholder="e.g. Payment decline on annual invoice renewal"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField
              label="Customer Name"
              required
              value={form.customer_name}
              onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
              placeholder="e.g. Rohit Mehta"
            />
            <InputField
              label="Customer Email"
              type="email"
              required
              value={form.customer_email}
              onChange={(e) => setForm({ ...form, customer_email: e.target.value })}
              placeholder="rohit@company.com"
            />
          </div>

          <TextArea
            label="Issue Description"
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Detailed description of the customer's problem or bug report..."
            rows={5}
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-line">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              isLoading={createMutation.isPending}
            >
              <Send className="w-3.5 h-3.5 mr-1.5" /> Save &amp; Open Ticket
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};