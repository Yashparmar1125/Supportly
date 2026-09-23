import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (newPage: number) => void;
  onLimitChange?: (newLimit: number) => void;
  isFetching?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
  onLimitChange,
  isFetching = false,
}) => {
  if (total === 0) return null;

  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  // Generate page numbers with smart ellipsis windowing
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="px-4 sm:px-6 py-3.5 bg-canvas/60 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-xs select-none">
      {/* Left: Range and Status Info */}
      <div className="flex items-center gap-3 text-ink/65 w-full sm:w-auto justify-between sm:justify-start">
        <span>
          Showing <span className="font-bold text-ink">{from}–{to}</span> of{' '}
          <span className="font-bold text-ink">{total.toLocaleString()}</span> tickets
        </span>

        {isFetching && (
          <span className="inline-flex items-center gap-1.5 text-[11px] text-primary font-medium animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Updating...
          </span>
        )}
      </div>

      {/* Right: Controls & Page Numbers */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
        {/* Page Size Selector */}
        {onLimitChange && (
          <div className="flex items-center gap-1.5 text-ink/60">
            <span className="text-[11px] hidden md:inline">Per page:</span>
            <select
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              className="bg-card border border-line rounded-lg px-2 py-1 text-xs font-semibold text-ink focus:outline-none focus:border-primary cursor-pointer hover:border-ink/40 transition-colors"
              aria-label="Items per page"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center gap-1">
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className={`p-1.5 rounded-lg border flex items-center justify-center transition-all ${
              page <= 1
                ? 'border-line text-ink/20 cursor-not-allowed bg-transparent'
                : 'border-line bg-card hover:bg-canvas text-ink/80 hover:text-ink cursor-pointer hover:border-ink/30 shadow-2xs'
            }`}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Numbered Page Buttons */}
          <div className="flex items-center gap-1">
            {pages.map((p, idx) => {
              if (p === '...') {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-2 py-1 text-ink/40 font-mono tracking-widest text-[11px]"
                  >
                    •••
                  </span>
                );
              }

              const isCurrent = p === page;
              return (
                <button
                  key={`page-${p}`}
                  onClick={() => onPageChange(Number(p))}
                  className={`min-w-[28px] h-7 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-ink/70 hover:text-ink hover:bg-card border border-transparent hover:border-line'
                  }`}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {p}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className={`p-1.5 rounded-lg border flex items-center justify-center transition-all ${
              page >= totalPages
                ? 'border-line text-ink/20 cursor-not-allowed bg-transparent'
                : 'border-line bg-card hover:bg-canvas text-ink/80 hover:text-ink cursor-pointer hover:border-ink/30 shadow-2xs'
            }`}
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
