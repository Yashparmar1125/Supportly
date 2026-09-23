import React from 'react';
import type { Ticket, PaginationMeta } from '../types';
import { TicketRow } from './TicketRow';
import { Pagination } from './ui/Pagination';
import { Inbox, Plus } from 'lucide-react';
import { Link } from 'react-router';

interface TicketTableProps {
  tickets: Ticket[];
  isLoading: boolean;
  isFetching?: boolean;
  pagination?: PaginationMeta;
  onPageChange?: (newPage: number) => void;
  onLimitChange?: (newLimit: number) => void;
  onClearFilters?: () => void;
}

export const TicketTable: React.FC<TicketTableProps> = ({
  tickets,
  isLoading,
  isFetching = false,
  pagination,
  onPageChange,
  onLimitChange,
  onClearFilters,
}) => {
  if (isLoading) {
    return (
      <div className="border border-line rounded-2xl overflow-hidden shadow-card bg-card">
        <div className="p-4 border-b border-line bg-canvas/40 flex items-center justify-between">
          <div className="h-4 bg-line/80 rounded animate-pulse w-32" />
          <div className="h-4 bg-line/80 rounded animate-pulse w-16" />
        </div>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-[100px_1fr_120px_110px_32px] gap-4 items-center px-6 py-4.5 border-b border-line last:border-b-0"
          >
            <div className="h-6 bg-line/60 rounded-md animate-pulse w-20" />
            <div className="space-y-2">
              <div className="h-4 bg-line/80 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-line/50 rounded animate-pulse w-1/3" />
            </div>
            <div className="h-6 bg-line/60 rounded-full animate-pulse w-24" />
            <div className="h-4 bg-line/50 rounded animate-pulse w-16 ml-auto" />
            <div className="h-4 bg-line/30 rounded w-4" />
          </div>
        ))}
      </div>
    );
  }

  if (!tickets.length) {
    return (
      <div className="border border-line rounded-2xl overflow-hidden shadow-card bg-card p-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-canvas flex items-center justify-center mx-auto mb-4 border border-line text-ink/20">
          <Inbox className="w-8 h-8 text-primary/40" />
        </div>
        <h3 className="font-extrabold text-lg text-ink mb-1.5">No tickets found</h3>
        <p className="text-sm text-ink/60 max-w-sm mx-auto mb-6">
          We couldn't find any tickets matching your search or active status filter.
        </p>
        <div className="flex items-center justify-center gap-3">
          {onClearFilters && (
            <button
              onClick={onClearFilters}
              className="px-4 py-2 rounded-lg border border-line bg-canvas text-ink text-xs font-bold hover:bg-line/50 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          )}
          <Link
            to="/tickets/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary-deep text-white text-xs font-bold transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" /> Create New Ticket
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-line rounded-2xl overflow-hidden shadow-card bg-card">
      {/* Table Header Bar */}
      <div className="grid grid-cols-[90px_1fr_auto_70px] sm:grid-cols-[100px_1fr_120px_110px_32px] gap-3 sm:gap-4 items-center px-4 sm:px-6 py-3 text-[11px] font-bold text-ink/50 border-b border-line bg-canvas/80 uppercase tracking-wider select-none">
        <div>Ticket ID</div>
        <div>Subject &amp; Customer</div>
        <div>Status</div>
        <div className="hidden sm:block text-right">Created</div>
        <div className="hidden sm:block" />
      </div>

      {/* Table Body */}
      <div className="divide-y divide-line">
        {tickets.map((ticket) => (
          <TicketRow key={ticket.ticket_id} ticket={ticket} />
        ))}
      </div>

      {/* Table Footer Bar / Pagination */}
      {pagination && onPageChange ? (
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          total={pagination.total}
          limit={pagination.limit}
          onPageChange={onPageChange}
          onLimitChange={onLimitChange}
          isFetching={isFetching}
        />
      ) : (
        <div className="px-6 py-3 bg-canvas/40 border-t border-line text-xs font-medium text-ink/50 flex items-center justify-between">
          <span>Showing {tickets.length} {tickets.length === 1 ? 'ticket' : 'tickets'}</span>
          <span className="font-mono text-[11px]">Realtime Neon PostgreSQL</span>
        </div>
      )}
    </div>
  );
};