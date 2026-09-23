import React from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router';
import { Button } from '../components/ui/Button';
import { SearchBar } from '../components/SearchBar';
import { StatusFilter } from '../components/StatusFilter';
import { TicketTable } from '../components/TicketTable';
import { useTickets } from '../hooks/useTickets';
import type { TicketStatus, TicketPriority, TicketCategory } from '../types';
import {
  Plus,
  Inbox,
  Clock,
  CheckCircle2,
  ExternalLink,
  Flame,
  AlertCircle,
  ArrowDown,
  SlidersHorizontal,
  Tag,
  X,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract query params as state (URL single-source of truth)
  const statusParam = searchParams.get('status') as TicketStatus | null;
  const status: TicketStatus | 'All' =
    statusParam && ['Open', 'In Progress', 'Closed'].includes(statusParam)
      ? statusParam
      : 'All';

  const priorityParam = searchParams.get('priority') as TicketPriority | null;
  const priority: TicketPriority | 'All' =
    priorityParam && ['Urgent', 'High', 'Medium', 'Low'].includes(priorityParam)
      ? priorityParam
      : 'All';

  const categoryParam = searchParams.get('category') as TicketCategory | null;
  const category: TicketCategory | 'All' =
    categoryParam && ['Billing', 'Technical Bug', 'Feature Request', 'Account Access', 'General'].includes(categoryParam)
      ? categoryParam
      : 'All';

  const search = searchParams.get('search') || '';
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const limit = Math.max(5, Math.min(100, Number(searchParams.get('limit')) || 10));

  // Query tickets from backend with pagination & filters
  const { data, isLoading, isFetching } = useTickets({
    status: status !== 'All' ? status : undefined,
    priority: priority !== 'All' ? priority : undefined,
    category: category !== 'All' ? category : undefined,
    search: search.trim() || undefined,
    page,
    limit,
  });

  const tickets = data?.tickets || [];
  const pagination = data?.pagination;
  const counts = data?.counts || { all: 0, open: 0, inProgress: 0, closed: 0 };

  // Declarative URL search parameter synchronization helper
  const updateParams = (
    updates: Record<string, string | number | null | undefined>,
    resetPage = true
  ) => {
    const nextParams = new URLSearchParams(searchParams);
    if (resetPage) nextParams.delete('page');

    Object.entries(updates).forEach(([key, val]) => {
      if (val === null || val === undefined || val === '' || val === 'All') {
        nextParams.delete(key);
      } else {
        nextParams.set(key, String(val).trim());
      }
    });

    setSearchParams(nextParams, { replace: true });
  };

  const handleStatusChange = (newStatus: TicketStatus | 'All') => {
    updateParams({ status: newStatus });
  };

  const handlePriorityChange = (newPriority: TicketPriority | 'All') => {
    updateParams({ priority: newPriority });
  };

  const handleCategoryChange = (newCategory: TicketCategory | 'All') => {
    updateParams({ category: newCategory });
  };

  const handleSearchChange = (newSearch: string) => {
    updateParams({ search: newSearch });
  };

  const handlePageChange = (newPage: number) => {
    updateParams({ page: newPage > 1 ? newPage : null }, false);
  };

  const handleLimitChange = (newLimit: number) => {
    updateParams({ limit: newLimit !== 10 ? newLimit : null });
  };

  const handleClearFilters = () => {
    setSearchParams({}, { replace: true });
  };

  const getPriorityFilterIcon = (p: TicketPriority | 'All') => {
    switch (p) {
      case 'Urgent':
        return <Flame className="w-3.5 h-3.5 text-rose-600 shrink-0" />;
      case 'High':
        return <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />;
      case 'Medium':
        return <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />;
      case 'Low':
        return <ArrowDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />;
      case 'All':
      default:
        return <SlidersHorizontal className="w-3.5 h-3.5 text-ink/50 shrink-0" />;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* 1. Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-line pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Support Tickets
            </h1>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {counts.all} Total
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-[11px] font-mono font-medium text-emerald-800 border border-emerald-200/60 shadow-2xs"
                title="Auto-refreshing every 15 seconds"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse motion-reduce:animate-none" />
                Live Sync (15s)
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-ink/60 mt-1">
            Manage customer conversations, organize incoming requests, and track issue resolution.
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
        {/* All Tickets */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Filter by all tickets"
          aria-pressed={status === 'All'}
          onClick={() => handleStatusChange('All')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleStatusChange('All');
            }
          }}
          className={`p-4 rounded-xl border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ink ${
            status === 'All'
              ? 'bg-card border-ink shadow-sm ring-1 ring-ink'
              : 'bg-card border-line hover:border-ink/40'
          }`}
        >
          <div className="flex items-center justify-between text-ink/50 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">All Tickets</span>
            <Inbox className="w-4 h-4 text-ink/60" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-ink">{counts.all}</span>
            <span className="text-[11px] font-semibold text-ink/50">Total</span>
          </div>
        </div>

        {/* Needs Attention (Open) */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Filter by open tickets"
          aria-pressed={status === 'Open'}
          onClick={() => handleStatusChange('Open')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleStatusChange('Open');
            }
          }}
          className={`p-4 rounded-xl border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            status === 'Open'
              ? 'bg-card border-primary shadow-sm ring-1 ring-primary'
              : 'bg-card border-line hover:border-primary/50'
          }`}
        >
          <div className="flex items-center justify-between text-primary mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Needs Attention</span>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 motion-reduce:animate-none" />
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

        {/* In Progress */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Filter by in-progress tickets"
          aria-pressed={status === 'In Progress'}
          onClick={() => handleStatusChange('In Progress')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleStatusChange('In Progress');
            }
          }}
          className={`p-4 rounded-xl border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
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
          role="button"
          tabIndex={0}
          aria-label="Filter by resolved tickets"
          aria-pressed={status === 'Closed'}
          onClick={() => handleStatusChange('Closed')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleStatusChange('Closed');
            }
          }}
          className={`p-4 rounded-xl border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
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
      <div className="bg-card p-3 sm:p-3.5 rounded-2xl border border-line shadow-card space-y-3">
        {/* Row 1: Primary Status Tabs & Quick Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          <StatusFilter
            activeStatus={status}
            onChange={handleStatusChange}
            counts={counts}
          />

          <div className="w-full lg:w-80 shrink-0">
            <SearchBar defaultValue={search} onSearch={handleSearchChange} />
          </div>
        </div>

        {/* Row 2: Secondary Filters (Priority & Category) + Active Filter Reset */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2.5 border-t border-line/60">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-ink/50 uppercase tracking-wider flex items-center gap-1.5 mr-1">
              <SlidersHorizontal className="w-3 h-3 text-ink/40" />
              Filter:
            </span>

            {/* Priority SLA Filter */}
            <div className="flex items-center gap-1.5 bg-canvas px-2.5 py-1 rounded-lg border border-line text-xs">
              {getPriorityFilterIcon(priority)}
              <select
                value={priority}
                onChange={(e) => handlePriorityChange(e.target.value as any)}
                className="bg-transparent text-xs font-semibold text-ink focus:outline-none cursor-pointer"
                aria-label="Filter by priority SLA"
              >
                <option value="All">All Priorities</option>
                <option value="Urgent">Urgent (2h SLA)</option>
                <option value="High">High (8h SLA)</option>
                <option value="Medium">Medium (24h SLA)</option>
                <option value="Low">Low (48h SLA)</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 bg-canvas px-2.5 py-1 rounded-lg border border-line text-xs">
              <Tag className="w-3.5 h-3.5 text-ink/50 shrink-0" />
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value as any)}
                className="bg-transparent text-xs font-semibold text-ink focus:outline-none cursor-pointer"
                aria-label="Filter by category"
              >
                <option value="All">All Categories</option>
                <option value="Billing">Billing & Invoices</option>
                <option value="Technical Bug">Technical Bugs</option>
                <option value="Feature Request">Feature Requests</option>
                <option value="Account Access">Account Access</option>
                <option value="General">General Inquiries</option>
              </select>
            </div>

            {/* Active Filters Clear Button */}
            {(priority !== 'All' || category !== 'All' || search || status !== 'All') && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-ink/60 hover:text-rose-600 px-2.5 py-1 rounded-md hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" />
                Clear filters
              </button>
            )}
          </div>

          {/* Result Count Status */}
          <div className="text-xs text-ink/50 font-medium">
            {isFetching ? (
              <span className="inline-flex items-center gap-1.5 text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping motion-reduce:animate-none" />
                Updating tickets...
              </span>
            ) : (
              <span>
                Showing <strong className="text-ink font-semibold">{tickets.length}</strong> of{' '}
                <strong className="text-ink font-semibold">{pagination?.total ?? counts.all}</strong> tickets
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 4. Ticket Table */}
      <TicketTable
        tickets={tickets}
        isLoading={isLoading}
        isFetching={isFetching}
        pagination={pagination}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        onClearFilters={handleClearFilters}
      />
    </div>
  );
};