import React from 'react';
import type { TicketStatus } from '../../types';

export const StatusBadge: React.FC<{ status: TicketStatus }> = ({ status }) => {
  const colors = {
    'Open': 'bg-status-open',
    'In Progress': 'bg-status-progress',
    'Closed': 'bg-status-closed',
  };

  return (
    <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold">
      <span className={`w-[7px] h-[7px] rounded-full ${colors[status]}`} />
      {status}
    </span>
  );
};