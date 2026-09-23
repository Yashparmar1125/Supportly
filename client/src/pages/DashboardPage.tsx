import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router';
import { Button } from '../components/ui/Button';
import { SearchBar } from '../components/SearchBar';
import { StatusFilter } from '../components/StatusFilter';
import { TicketTable } from '../components/TicketTable';
import { useTickets } from '../hooks/useTickets';
import type { TicketStatus } from '../types';
import {
  Plus,
  Inbox,
  Clock,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<TicketStatus | 'All'>('All');

  // Base tickets for accurate metrics
  const { data: allTickets = [], isLoading: isLoadingAll } = useTickets({});

  // Query with filters applied
  const { data: tickets = [], isLoading: isLoadingFiltered } = useTickets({
    status: status !== 'All' ? status : undefined,
    search: search.trim() || undefined,
  });

  const isLoading = isLoadingFiltered || isLoadingAll;

  // Compute live KPI metrics
  const counts = useMemo(() => {
    return {
      all: allTickets.length,
      open: allTickets.filter((t) => t.status === 'Open').length,
      inProgress: allTickets.filter((t) => t.status === 'In Progress').length,
      closed: allTickets.filter((t) => t.status === 'Closed').length,
    };
  }, [allTickets]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* 1. Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-line pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Support Tickets
            </h1>
            <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              {counts.all} Total
            </span>
          </div>
          <p className="text-xs sm:text-sm text-ink/60 mt-1">
            Manage customer conversations, triage inbound requests, and track issue resolution.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Link
            to="/submit-ticket"
            target="_blank"
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg border border-line bg-card text-ink text-xs font-semibold hover:bg-canvas transition-colors"
          >
            <span>Public Portal</span>
            <ExternalLink className="w-3.5 h-3.5 text-ink/50" />
          </Link>
          <Button onClick={() => navigate('/tickets/new')} size="sm">
            <Plus className="w-4 h-4 mr-1.5" /> New Ticket
          </Button>
        </div>
      </div>

      {/* 2. KPI Quick Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Total Inbound */}
        <div
          onClick={() => setStatus('All')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            status === 'All'
              ? 'bg-card border-ink shadow-sm ring-1 ring-ink'
              : 'bg-card border-line hover:border-ink/40'
          }`}
        >
          <div className="flex items-center justify-between text-ink/50 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">All Inbound</span>
            <Inbox className="w-4 h-4 text-ink/60" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-ink">{counts.all}</span>
            <span className="text-[11px] font-semibold text-ink/50">Total</span>
          </div>
        </div>

        {/* Needs Attention (Open) */}
        <div
          onClick={() => setStatus('Open')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            status === 'Open'
              ? 'bg-card border-primary shadow-sm ring-1 ring-primary'
              : 'bg-card border-line hover:border-primary/50'
          }`}
        >
          <div className="flex items-center justify-between text-primary mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Needs Attention</span>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-primary">{counts.open}</span>
            <span className="text-[11px] font-bold text-primary/80 bg-primary/10 px-2 py-0.5 rounded-full">
              Open
            </span>
          </div>
        </div>

        {/* Active Triage (In Progress) */}
        <div
          onClick={() => setStatus('In Progress')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            status === 'In Progress'
              ? 'bg-card border-amber-600 shadow-sm ring-1 ring-amber-600'
              : 'bg-card border-line hover:border-amber-600/50'
          }`}
        >
          <div className="flex items-center justify-between text-amber-700 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">In Progress</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-amber-700">{counts.inProgress}</span>
            <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/50">
              Active
            </span>
          </div>
        </div>

        {/* Resolved (Closed) */}
        <div
          onClick={() => setStatus('Closed')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            status === 'Closed'
              ? 'bg-card border-emerald-600 shadow-sm ring-1 ring-emerald-600'
              : 'bg-card border-line hover:border-emerald-600/50'
          }`}
        >
          <div className="flex items-center justify-between text-emerald-700 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Resolved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-700">{counts.closed}</span>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/50">
              Closed
            </span>
          </div>
        </div>
      </div>

      {/* 3. Unified Control Toolbar */}
      <div className="bg-card p-3 rounded-2xl border border-line shadow-card flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <StatusFilter
          activeStatus={status}
          onChange={setStatus}
          counts={counts}
        />
        <div className="w-full md:w-80">
          <SearchBar onSearch={setSearch} />
        </div>
      </div>

      {/* 4. Ticket Table */}
      <TicketTable
        tickets={tickets}
        isLoading={isLoading}
        onClearFilters={() => {
          setStatus('All');
          setSearch('');
        }}
      />
    </div>
  );
};