import React from 'react';
import type { TicketStatus } from '../types';

interface StatusFilterProps {
  activeStatus: TicketStatus | 'All';
  onChange: (status: TicketStatus | 'All') => void;
  counts?: {
    all: number;
    open: number;
    inProgress: number;
    closed: number;
  };
}

export const StatusFilter: React.FC<StatusFilterProps> = ({
  activeStatus,
  onChange,
  counts,
}) => {
  const tabs: {
    status: TicketStatus | 'All';
    label: string;
    count?: number;
    activeClass: string;
  }[] = [
    {
      status: 'All',
      label: 'All Tickets',
      count: counts?.all,
      activeClass: 'bg-ink text-white shadow-xs',
    },
    {
      status: 'Open',
      label: 'Open',
      count: counts?.open,
      activeClass: 'bg-primary text-white shadow-xs',
    },
    {
      status: 'In Progress',
      label: 'In Progress',
      count: counts?.inProgress,
      activeClass: 'bg-amber-600 text-white shadow-xs',
    },
    {
      status: 'Closed',
      label: 'Closed',
      count: counts?.closed,
      activeClass: 'bg-emerald-600 text-white shadow-xs',
    },
  ];

  return (
    <div className="flex items-center gap-1.5 bg-canvas p-1 rounded-xl border border-line overflow-x-auto max-w-full">
      {tabs.map((tab) => {
        const isActive = activeStatus === tab.status;
        return (
          <button
            key={tab.status}
            onClick={() => onChange(tab.status)}
            className={`inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              isActive
                ? tab.activeClass
                : 'text-ink/65 hover:text-ink hover:bg-card'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-line/60 text-ink/60'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};