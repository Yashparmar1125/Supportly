import React from 'react';
import {
  Mail,
  Globe,
  Code2,
  CreditCard,
  Bug,
  Sparkles,
  KeyRound,
  FileText,
  Smile,
  Meh,
  Frown,
} from 'lucide-react';
import type { TicketCategory, TicketChannel, TicketSentiment } from '../types';

export const CHANNEL_CONFIG: Record<
  string,
  { label: string; icon: React.ReactNode; tooltip: string }
> = {
  Email: {
    label: 'Email',
    tooltip: 'Inbound Email',
    icon: <Mail className="w-3 h-3 text-ink/40 shrink-0" />,
  },
  API: {
    label: 'API',
    tooltip: 'API Webhook',
    icon: <Code2 className="w-3 h-3 text-purple-600 shrink-0" />,
  },
  'Web Portal': {
    label: 'Web Portal',
    tooltip: 'Customer Portal',
    icon: <Globe className="w-3 h-3 text-indigo-500 shrink-0" />,
  },
};

export const CATEGORY_CONFIG: Record<
  string,
  { label: string; shortLabel: string; badgeClass: string; icon: React.ReactNode }
> = {
  Billing: {
    label: 'Billing',
    shortLabel: 'Billing',
    badgeClass: 'text-emerald-700 bg-emerald-50/90 border-emerald-200/70',
    icon: <CreditCard className="w-3 h-3 text-emerald-600 shrink-0" />,
  },
  'Technical Bug': {
    label: 'Technical Bug',
    shortLabel: 'Bug',
    badgeClass: 'text-rose-700 bg-rose-50/90 border-rose-200/70',
    icon: <Bug className="w-3 h-3 text-rose-600 shrink-0" />,
  },
  'Feature Request': {
    label: 'Feature Request',
    shortLabel: 'Feature',
    badgeClass: 'text-amber-800 bg-amber-50/90 border-amber-200/70',
    icon: <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />,
  },
  'Account Access': {
    label: 'Account Access',
    shortLabel: 'Access',
    badgeClass: 'text-indigo-700 bg-indigo-50/90 border-indigo-200/70',
    icon: <KeyRound className="w-3 h-3 text-indigo-600 shrink-0" />,
  },
  General: {
    label: 'General',
    shortLabel: 'General',
    badgeClass: 'text-slate-600 bg-slate-100/90 border-slate-200/70',
    icon: <FileText className="w-3 h-3 text-slate-500 shrink-0" />,
  },
};

export const SENTIMENT_CONFIG: Record<
  string,
  { label: string; icon: React.ReactNode; textClass: string }
> = {
  Frustrated: {
    label: 'Frustrated',
    icon: <Frown className="w-3.5 h-3.5 text-rose-500 shrink-0" />,
    textClass: 'text-rose-600',
  },
  Delighted: {
    label: 'Delighted',
    icon: <Smile className="w-3.5 h-3.5 text-emerald-500 shrink-0" />,
    textClass: 'text-emerald-600',
  },
  Neutral: {
    label: 'Neutral',
    icon: <Meh className="w-3.5 h-3.5 text-slate-500 shrink-0" />,
    textClass: 'text-slate-600',
  },
};

export function getChannelIcon(channel?: TicketChannel | string): React.ReactNode {
  return (channel && CHANNEL_CONFIG[channel]?.icon) || CHANNEL_CONFIG['Web Portal'].icon;
}

export function getCategoryBadge(category?: TicketCategory | string): {
  label: string;
  shortLabel: string;
  badgeClass: string;
  icon: React.ReactNode;
} {
  return (category && CATEGORY_CONFIG[category]) || CATEGORY_CONFIG.General;
}

export function getSentimentIcon(sentiment?: TicketSentiment | string): React.ReactNode {
  return (sentiment && SENTIMENT_CONFIG[sentiment]?.icon) || SENTIMENT_CONFIG.Neutral.icon;
}
