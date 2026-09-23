import React from 'react';
import type { TicketPriority } from '../../types';
import { AlertCircle, Flame, Clock, ArrowDown } from 'lucide-react';

interface PriorityBadgeProps {
  priority: TicketPriority;
  showSla?: boolean;
  size?: 'sm' | 'md';
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  priority,
  showSla = false,
  size = 'md',
}) => {
  const configs: Record<
    TicketPriority,
    {
      label: string;
      sla: string;
      styles: string;
      dot: string;
      icon: React.ReactNode;
      pulse?: boolean;
    }
  > = {
    Urgent: {
      label: 'Urgent',
      sla: 'SLA: 2h',
      styles: 'bg-rose-50 text-rose-700 border-rose-200/80',
      dot: 'bg-rose-600',
      pulse: true,
      icon: <Flame className="w-3 h-3 text-rose-600 shrink-0" />,
    },
    High: {
      label: 'High',
      sla: 'SLA: 8h',
      styles: 'bg-amber-50 text-amber-800 border-amber-200/80',
      dot: 'bg-amber-500',
      pulse: false,
      icon: <AlertCircle className="w-3 h-3 text-amber-600 shrink-0" />,
    },
    Medium: {
      label: 'Medium',
      sla: 'SLA: 24h',
      styles: 'bg-indigo-50/80 text-indigo-700 border-indigo-200/60',
      dot: 'bg-indigo-500',
      pulse: false,
      icon: <Clock className="w-3 h-3 text-indigo-600 shrink-0" />,
    },
    Low: {
      label: 'Low',
      sla: 'SLA: 48h',
      styles: 'bg-slate-50 text-slate-600 border-slate-200/80',
      dot: 'bg-slate-400',
      pulse: false,
      icon: <ArrowDown className="w-3 h-3 text-slate-500 shrink-0" />,
    },
  };

  const config = configs[priority] || configs.Medium;
  const isSm = size === 'sm';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border transition-all shrink-0 ${
        config.styles
      } ${isSm ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'}`}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        {config.pulse && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.dot}`} />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dot}`} />
      </span>
      <span>{config.label}</span>
      {showSla && (
        <span className="opacity-60 font-mono text-[10px] border-l border-current/20 pl-1.5 ml-0.5">
          {config.sla}
        </span>
      )}
    </span>
  );
};
