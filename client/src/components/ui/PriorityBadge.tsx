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
}) => {
  const configs: Record<
    TicketPriority,
    {
      label: string;
      sla: string;
      textColor: string;
      icon: React.ReactNode;
      slaBadge: string;
    }
  > = {
    Urgent: {
      label: 'Urgent',
      sla: '2h SLA',
      textColor: 'text-rose-600',
      icon: <Flame className="w-3.5 h-3.5 text-rose-500 shrink-0" />,
      slaBadge: 'text-rose-700 bg-rose-50 border-rose-200/80',
    },
    High: {
      label: 'High',
      sla: '8h SLA',
      textColor: 'text-amber-600',
      icon: <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />,
      slaBadge: 'text-amber-800 bg-amber-50 border-amber-200/80',
    },
    Medium: {
      label: 'Medium',
      sla: '24h SLA',
      textColor: 'text-indigo-600',
      icon: <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />,
      slaBadge: 'text-indigo-700 bg-indigo-50/80 border-indigo-200/60',
    },
    Low: {
      label: 'Low',
      sla: '48h SLA',
      textColor: 'text-slate-500',
      icon: <ArrowDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />,
      slaBadge: 'text-slate-600 bg-slate-50 border-slate-200/70',
    },
  };

  const config = configs[priority] || configs.Medium;

  return (
    <div className="inline-flex items-center gap-1.5 shrink-0 select-none">
      <span className="shrink-0">{config.icon}</span>
      <span className={`text-xs font-semibold ${config.textColor}`}>
        {config.label}
      </span>
      {showSla && (
        <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${config.slaBadge}`}>
          {config.sla}
        </span>
      )}
    </div>
  );
};
