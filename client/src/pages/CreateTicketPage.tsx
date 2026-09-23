import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { InputField } from '../components/ui/InputField';
import { TextArea } from '../components/ui/TextArea';
import { Button } from '../components/ui/Button';
import { useCreateTicket } from '../hooks/useTickets';
import { ArrowLeft } from 'lucide-react';

export const CreateTicketPage: React.FC = () => {
  const navigate = useNavigate();
  const createMutation = useCreateTicket();
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
      onSuccess: (data) => navigate(`/tickets/${data.ticket_id}`),
      onError: (err: any) => setError(err?.error || 'Failed to create ticket'),
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <h1 className="text-[22px] font-bold text-ink">Create New Ticket</h1>
      </div>

      <div className="bg-card rounded-xl shadow-card border border-line p-6">
        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Subject"
            required
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            placeholder="Brief description of the issue"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField
              label="Customer Name"
              required
              value={form.customer_name}
              onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
              placeholder="Jane Doe"
            />
            <InputField
              label="Customer Email"
              type="email"
              required
              value={form.customer_email}
              onChange={(e) => setForm({ ...form, customer_email: e.target.value })}
              placeholder="jane@example.com"
            />
          </div>
          <TextArea
            label="Description"
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Detailed explanation of the customer's issue..."
            rows={5}
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-line">
            <Button type="button" variant="ghost" onClick={() => navigate('/dashboard')}>
              Cancel
            </Button>
            <Button type="submit" isLoading={createMutation.isPending}>
              Create Ticket
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};