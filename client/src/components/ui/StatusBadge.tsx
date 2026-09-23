import React from 'react';
import type { TicketStatus } from '../../types';

interface StatusBadgeProps {
  status: TicketStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const configs = {
    Open: {
      bg: 'bg-indigo-50 border-indigo-200/80 text-primary',
      dot: 'bg-primary',
      pulse: true,
    },
    'In Progress': {
      bg: 'bg-amber-50 border-amber-200/80 text-amber-800',
      dot: 'bg-amber-500',
      pulse: false,
    },
    Closed: {
      bg: 'bg-emerald-50 border-emerald-200/80 text-emerald-800',
      dot: 'bg-emerald-500',
      pulse: false,
    },
  };

  const config = configs[status] || configs.Open;
  const isSm = size === 'sm';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border transition-all ${
        config.bg
      } ${isSm ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'}`}
    >
      <span className="relative flex h-2 w-2">
        {config.pulse && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 motion-reduce:animate-none ${config.dot}`} />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dot}`} />
      </span>
      <span>{status}</span>
    </span>
  );
};