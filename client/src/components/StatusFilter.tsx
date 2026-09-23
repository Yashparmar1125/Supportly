import React from 'react';
import type { TicketStatus } from '../types';

interface StatusFilterProps {
  activeStatus: TicketStatus | 'All';
  onChange: (status: TicketStatus | 'All') => void;
}

export const StatusFilter: React.FC<StatusFilterProps> = ({ activeStatus, onChange }) => {
  const statuses: (TicketStatus | 'All')[] = ['All', 'Open', 'In Progress', 'Closed'];

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map(status => (
        <button
          key={status}
          onClick={() => onChange(status)}
          className={`px-4 py-1.5 text-sm font-semibold rounded-full border transition-colors ${
            activeStatus === status 
              ? 'bg-ink text-white border-ink' 
              : 'bg-transparent text-ink border-line hover:bg-canvas'
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
};