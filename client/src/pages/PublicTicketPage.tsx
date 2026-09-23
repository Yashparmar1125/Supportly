import React, { useState } from 'react';
import { Link } from 'react-router';
import { InputField } from '../components/ui/InputField';
import { TextArea } from '../components/ui/TextArea';
import { Button } from '../components/ui/Button';
import { Logo } from '../components/ui/Logo';
import { useCreateTicket } from '../hooks/useTickets';
import { useToast } from '../context/ToastContext';
import { CheckCircle2, ArrowLeft, Send, Sparkles } from 'lucide-react';

export const PublicTicketPage: React.FC = () => {
  const createMutation = useCreateTicket();
  const toast = useToast();
  const [submittedTicket, setSubmittedTicket] = useState<{
    ticket_id: string;
    created_at: string;
  } | null>(null);
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
        setSubmittedTicket(data);
        toast.success(`Support ticket ${data.ticket_id} received!`);
      },
      onError: (err: any) => {
        const msg = err?.error || err?.message || 'Failed to submit ticket. Please check your fields and try again.';
        setError(msg);
        toast.error(msg);
      },
    });
  };

  const handleReset = () => {
    setForm({
      subject: '',
      customer_name: '',
      customer_email: '',
      description: '',
    });
    setSubmittedTicket(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-line bg-card/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link to="/" className="text-ink/70 hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
            <Link
              to="/login"
              className="text-primary hover:text-primary-deep bg-primary/10 px-3 py-1.5 rounded-full transition-colors"
            >
              Agent Login
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-2xl">
          {submittedTicket ? (
            /* Success State */
            <div className="bg-card rounded-2xl shadow-card border border-line p-8 sm:p-12 text-center animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink mb-2">
                Ticket Submitted Successfully!
              </h2>
              <p className="text-sm text-ink/70 max-w-md mx-auto mb-8">
                Your support request has been logged in our system. Our team is already reviewing your issue.
              </p>

              {/* Ticket Details Box */}
              <div className="bg-canvas border border-line rounded-xl p-6 max-w-md mx-auto mb-8 text-left space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-ink/60 font-semibold uppercase tracking-wider">Ticket ID</span>
                  <span className="font-mono font-bold text-base text-primary bg-primary/10 px-2.5 py-0.5 rounded">
                    {submittedTicket.ticket_id}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs border-t border-line/60 pt-2.5">
                  <span className="text-ink/60 font-semibold">Subject</span>
                  <span className="font-medium text-ink truncate max-w-[200px]">{form.subject}</span>
                </div>
                <div className="flex justify-between items-center text-xs border-t border-line/60 pt-2.5">
                  <span className="text-ink/60 font-semibold">Contact Email</span>
                  <span className="font-medium text-ink">{form.customer_email}</span>
                </div>
                <div className="flex justify-between items-center text-xs border-t border-line/60 pt-2.5">
                  <span className="text-ink/60 font-semibold">Submitted At</span>
                  <span className="font-mono text-ink/60">
                    {new Date(submittedTicket.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button onClick={handleReset} variant="ghost" size="sm">
                  Submit another ticket
                </Button>
                <Link to="/login">
                  <Button size="sm">
                    View in Agent Dashboard →
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            /* Form State */
            <div className="bg-card rounded-2xl shadow-card border border-line p-6 sm:p-10">
              <div className="mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eef2ff] text-primary text-xs font-mono font-bold mb-3 border border-primary/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  CUSTOMER SUPPORT PORTAL
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                  How can we help you today?
                </h1>
                <p className="text-xs sm:text-sm text-ink/60 mt-1.5 leading-relaxed">
                  Submit your question or issue below. An automated reference ticket ID will be generated immediately.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField
                    label="Your Name"
                    required
                    value={form.customer_name}
                    onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                  />
                  <InputField
                    label="Work Email"
                    type="email"
                    required
                    value={form.customer_email}
                    onChange={(e) => setForm({ ...form, customer_email: e.target.value })}
                    placeholder="rahul@company.com"
                  />
                </div>

                <InputField
                  label="Subject / Issue Title"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="e.g. Payment decline on annual invoice renewal"
                />

                <TextArea
                  label="Describe the issue in detail"
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Please provide specific details, error messages, or steps to reproduce..."
                  rows={5}
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3"
                    isLoading={createMutation.isPending}
                  >
                    <Send className="w-4 h-4 mr-2" /> Submit Support Request
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
