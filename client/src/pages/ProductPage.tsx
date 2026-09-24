import React, { useState } from 'react';
import { Logo } from '../components/ui/Logo';
import { Footer } from '../components/landing/Footer';
import { Link } from 'react-router';
import {
  Inbox,
  Sparkles,
  BookOpen,
  Zap,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  LayoutDashboard,
  User as UserIcon,
  Database,
  Lock,
  GitBranch,
  Workflow,
  Activity,
  Bot,
  Layers,
  TrendingUp,
  MessageSquare,
  Clock,
  Star,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import {
  GmailLogo,
  WhatsAppLogo,
  SlackLogo,
  ChromeLogo,
  PostgreSqlLogo,
  OpenAiLogo,
  NotionLogo,
  ConfluenceLogo,
  ZapierLogo,
  AirtableLogo,
  LiveChatWidgetLogo,
} from '../components/icons/BrandLogos';

// ─── SVG-based Integration Flow Diagram ──────────────────────────────────
// Pure SVG: exact geometry, zero emojis, embedded official vector logos,
// smooth non-overlapping cubic bezier curves.

interface FlowSource {
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  bgHex: string;
}

interface FlowOutput {
  label: string;
  sublabel: string;
  highlight?: boolean;
}

interface SvgFlowProps {
  inputs: FlowSource[];
  moduleName: string;
  outputs: FlowOutput[];
}

const SvgFlowDiagram: React.FC<SvgFlowProps> = ({
  inputs,
  moduleName,
  outputs,
}) => {
  // Dimensions calibrated for zoomed-in, crystal-clear presentation
  const VW = 560;
  const VH = 244;
  const PAD_V = 22;

  // Spread Y coordinates evenly across height
  const spreadY = (n: number): number[] => {
    if (n === 1) return [VH / 2];
    return Array.from({ length: n }, (_, i) =>
      PAD_V + (i * (VH - PAD_V * 2)) / (n - 1)
    );
  };

  const iYs = spreadY(inputs.length);
  const oYs = spreadY(outputs.length);
  const modY = VH / 2;

  // Geometric coordinates (zoomed & spacious)
  const ICON_CX = 20;
  const ICON_R = 15;
  const LABEL_X = 42;
  const CURVE_START_X = 144;

  const MOD_CX = 276;
  const MOD_HW = 58; // 116px width
  const MOD_HH = 28; // 56px height

  const OUT_X = 398;
  const OUT_W = 156;
  const OUT_H = 38;

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      className="w-full h-auto max-h-[340px] select-none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${moduleName} flow diagram`}
    >
      <defs>
        {/* Glow behind center module */}
        <filter id="mod-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow
            dx="0"
            dy="5"
            stdDeviation="9"
            floodColor="#5B4FE5"
            floodOpacity="0.25"
          />
        </filter>

        {/* Input curve arrowhead (purple) */}
        <marker
          id="marker-purple"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0,1 L5,3 L0,5 Z" fill="#5B4FE5" opacity="0.85" />
        </marker>

        {/* Output curve arrowhead (emerald) */}
        <marker
          id="marker-emerald"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0,1 L5,3 L0,5 Z" fill="#10B981" opacity="0.9" />
        </marker>
      </defs>

      {/* ── 1. INPUT → MODULE BEZIER CURVES ───────────────────────────── */}
      {iYs.map((y, i) => {
        const targetY = modY + (i - (inputs.length - 1) / 2) * 8.5;
        return (
          <path
            key={`in-curve-${i}`}
            d={`M ${CURVE_START_X},${y}
                C ${CURVE_START_X + 42},${y}
                  ${MOD_CX - MOD_HW - 28},${targetY}
                  ${MOD_CX - MOD_HW},${targetY}`}
            stroke="#5B4FE5"
            strokeWidth="1.6"
            strokeDasharray="4 3"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
            markerEnd="url(#marker-purple)"
          />
        );
      })}

      {/* ── 2. MODULE → OUTPUT BEZIER CURVES ──────────────────────────── */}
      {oYs.map((y, j) => {
        const startY = modY + (j - (outputs.length - 1) / 2) * 11;
        return (
          <path
            key={`out-curve-${j}`}
            d={`M ${MOD_CX + MOD_HW},${startY}
                C ${MOD_CX + MOD_HW + 28},${startY}
                  ${OUT_X - 28},${y}
                  ${OUT_X - 2},${y}`}
            stroke="#10B981"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
            markerEnd="url(#marker-emerald)"
          />
        );
      })}

      {/* ── 3. SOURCE NODES (Left Column) ──────────────────────────────── */}
      {inputs.map((inp, i) => (
        <g key={`src-${i}`}>
          <circle
            cx={ICON_CX}
            cy={iYs[i]}
            r={ICON_R}
            fill={inp.bgHex}
            stroke="#E2E2EA"
            strokeWidth="1"
          />

          <foreignObject
            x={ICON_CX - 10}
            y={iYs[i] - 10}
            width="20"
            height="20"
            className="overflow-visible"
          >
            <div className="w-full h-full flex items-center justify-center pointer-events-none">
              {inp.icon}
            </div>
          </foreignObject>

          <text
            x={LABEL_X}
            y={iYs[i] - 2}
            fontSize="10.5"
            fontWeight="700"
            fill="#1A1A2E"
            fontFamily="Manrope, system-ui, sans-serif"
          >
            {inp.label}
          </text>

          <text
            x={LABEL_X}
            y={iYs[i] + 9.5}
            fontSize="8.5"
            fill="#1A1A2E"
            opacity="0.48"
            fontFamily="Manrope, system-ui, sans-serif"
          >
            {inp.sublabel}
          </text>
        </g>
      ))}

      {/* ── 4. CENTER MODULE: OFFICIAL SUPPORTLY BRAND HUB ──────────── */}
      <g>
        <rect
          x={MOD_CX - MOD_HW}
          y={modY - MOD_HH}
          width={MOD_HW * 2}
          height={MOD_HH * 2}
          rx="14"
          fill="#FFFFFF"
          stroke="#5B4FE5"
          strokeWidth="1.5"
          filter="url(#mod-shadow)"
        />

        <foreignObject
          x={MOD_CX - MOD_HW}
          y={modY - MOD_HH}
          width={MOD_HW * 2}
          height={MOD_HH * 2}
          className="overflow-visible"
        >
          <div className="w-full h-full flex flex-col items-center justify-center select-none pointer-events-none px-2 py-1">
            <div className="flex items-center gap-1.5">
              <div className="w-4.5 h-4.5 rounded-md bg-primary flex items-center justify-center text-white font-extrabold text-[9.5px] shadow-2xs">
                S
              </div>
              <span className="font-extrabold tracking-tight text-ink text-[12.5px] leading-none flex items-center">
                supportly<span className="text-primary font-black">.</span>
              </span>
            </div>
            <span className="text-[8px] font-extrabold text-primary uppercase tracking-widest mt-1">
              {moduleName}
            </span>
          </div>
        </foreignObject>

        <circle cx={MOD_CX - 24} cy={modY + MOD_HH + 13} r="2.5" fill="#22C55E" />
        <text
          x={MOD_CX - 18}
          y={modY + MOD_HH + 16}
          fontSize="8"
          fontWeight="700"
          fill="#5B4FE5"
          fontFamily="Manrope, system-ui, sans-serif"
          letterSpacing="0.02em"
        >
          ACTIVE PIPELINE
        </text>
      </g>

      {/* ── 5. OUTPUT CARDS (Right Column) ────────────────────────────── */}
      {outputs.map((out, j) => (
        <g key={`out-${j}`}>
          <rect
            x={OUT_X}
            y={oYs[j] - OUT_H / 2}
            width={OUT_W}
            height={OUT_H}
            rx="9"
            fill={out.highlight ? '#ECFDF5' : '#FFFFFF'}
            stroke={out.highlight ? '#A7F3D0' : '#E7E7F2'}
            strokeWidth="1.2"
          />

          <circle
            cx={OUT_X + 15}
            cy={oYs[j]}
            r="7"
            fill={out.highlight ? '#D1FAE5' : '#F5F5FA'}
          />
          <path
            d={
              out.highlight
                ? `M ${OUT_X + 12.5},${oYs[j]} L ${OUT_X + 14.5},${oYs[j] + 2} L ${OUT_X + 18},${oYs[j] - 2}`
                : `M ${OUT_X + 13},${oYs[j]} L ${OUT_X + 17},${oYs[j]} M ${OUT_X + 15.5},${oYs[j] - 2} L ${OUT_X + 17.5},${oYs[j]} L ${OUT_X + 15.5},${oYs[j] + 2}`
            }
            stroke={out.highlight ? '#059669' : '#5B4FE5'}
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          <text
            x={OUT_X + 28}
            y={oYs[j] - 2}
            fontSize="10"
            fontWeight="700"
            fill={out.highlight ? '#065F46' : '#1A1A2E'}
            fontFamily="Manrope, system-ui, sans-serif"
          >
            {out.label}
          </text>

          <text
            x={OUT_X + 28}
            y={oYs[j] + 9.5}
            fontSize="8.5"
            fill={out.highlight ? '#059669' : '#1A1A2E'}
            opacity={out.highlight ? 0.82 : 0.48}
            fontFamily="Manrope, system-ui, sans-serif"
          >
            {out.sublabel}
          </text>
        </g>
      ))}
    </svg>
  );
};

// ─── Module Data (Strictly Zero Emojis) ─────────────────────────────────────
const MODULES = [
  {
    id: 'inbox',
    number: '01',
    shortName: 'Inbox',
    name: 'Supportly Inbox',
    icon: Inbox,
    tagline: 'Every channel. One unified workspace.',
    description:
      'Unify customer conversations from Email, WhatsApp, Slack, Live Chat, and Web Portal into a single high-velocity queue. Eliminate duplicate replies with distributed agent collision locks.',
    techPill: 'PostgreSQL + GIN Index + Redis Pub/Sub + SSE',
    inputs: [
      { label: 'Gmail / Email', sublabel: 'Inbound parsing', icon: <GmailLogo size={16} />, bgHex: '#FEF2F2' },
      { label: 'WhatsApp', sublabel: 'Meta Cloud API', icon: <WhatsAppLogo size={16} />, bgHex: '#F0FDF4' },
      { label: 'Slack', sublabel: 'Bolt Events API', icon: <SlackLogo size={16} />, bgHex: '#F5F3FF' },
      { label: 'Live Chat Widget', sublabel: 'Shadow DOM embed', icon: <LiveChatWidgetLogo size={16} />, bgHex: '#EFF6FF' },
      { label: 'Web Portal', sublabel: 'Customer self-service', icon: <ChromeLogo size={16} />, bgHex: '#F0FDFB' },
    ],
    outputs: [
      { label: 'Unified Agent Queue', sublabel: 'Single view across all channels' },
      { label: 'Agent Collision Lock', sublabel: 'Redis TTL agent presence' },
      { label: 'Ticket Resolved', sublabel: 'Auto-closed with CSAT triggered', highlight: true },
    ],
    capabilities: [
      'Atomic sequence numbers — zero concurrency race conditions',
      'Agent presence via Redis TTL heartbeats prevents duplicate work',
      'Dual-mode notes: Private internal notes vs outbound customer replies',
      'Sub-5ms GIN full-text search across subject, body, email, and name',
    ],
  },
  {
    id: 'ai',
    number: '02',
    shortName: 'AI Engine',
    name: 'Supportly AI',
    icon: Sparkles,
    tagline: 'Instant triage. Autonomous resolution with source citation.',
    description:
      'From the millisecond a ticket lands, AI classifies category, detects sentiment, attributes client accounts, drafts context-aware responses, and autonomously resolves standard queries.',
    techPill: 'OpenRouter + pgvector RAG + BullMQ Pipeline + Confidence Guardrails',
    inputs: [
      { label: 'Incoming Ticket', sublabel: 'Customer issue text', icon: <MessageSquare size={16} className="text-primary" />, bgHex: '#EEF2FF' },
      { label: 'OpenRouter LLMs', sublabel: 'Gemini Flash & Claude', icon: <OpenAiLogo size={16} />, bgHex: '#F0FDF9' },
      { label: 'pgvector KB', sublabel: 'HNSW semantic search', icon: <PostgreSqlLogo size={16} />, bgHex: '#EFF6FF' },
      { label: 'Conversation Context', sublabel: 'Chronological notes', icon: <Clock size={16} className="text-violet-600" />, bgHex: '#F5F3FF' },
    ],
    outputs: [
      { label: 'Auto-Resolved Ticket', sublabel: 'Confidence > 85% with cited KB', highlight: true },
      { label: 'AI Copilot Draft', sublabel: '60–85% confidence for agent' },
      { label: 'Human Escalation', sublabel: 'Confidence < 60% with routing' },
    ],
    capabilities: [
      'Zero-touch triage: Category, Sentiment, Priority & Client Account on arrival',
      'Decoupled async inference — DB queries never blocked by LLM latency',
      'Strict confidence guardrails: >85% auto-resolve, 60–85% draft, <60% escalate',
      'Multi-model routing: Gemini Flash (fast triage) & Claude Sonnet (replies)',
    ],
  },
  {
    id: 'docs',
    number: '03',
    shortName: 'Docs',
    name: 'Supportly Docs',
    icon: BookOpen,
    tagline: 'Deflect incoming queries before they become tickets.',
    description:
      'A semantic help center powered by pgvector + BM25 hybrid search. Internal runbooks and public articles feed both customer self-service and the AI inference engine.',
    techPill: 'pgvector HNSW + PostgreSQL BM25 + TipTap Rich Editor',
    inputs: [
      { label: 'Published Articles', sublabel: 'Markdown & Rich text', icon: <NotionLogo size={16} />, bgHex: '#F9F9F9' },
      { label: 'Customer Queries', sublabel: 'Portal & widget search', icon: <ChromeLogo size={16} />, bgHex: '#EFF6FF' },
      { label: 'Internal SOPs', sublabel: 'Agent-only runbooks', icon: <ConfluenceLogo size={16} />, bgHex: '#EFF6FF' },
      { label: 'Chat Widget Search', sublabel: 'Pre-conversation lookup', icon: <LiveChatWidgetLogo size={16} />, bgHex: '#F0FDFB' },
    ],
    outputs: [
      { label: '41.8% Self-Deflected', sublabel: 'Resolved before ticket creation', highlight: true },
      { label: 'AI RAG Citations', sublabel: 'Injected into autonomous replies' },
      { label: 'Content Gap Alert', sublabel: 'Identifies unaddressed queries' },
    ],
    capabilities: [
      'Hybrid search: Vector cosine similarity + BM25 full-text ranking',
      'Internal-only visibility: Secure SOPs for authenticated support staff',
      'In-widget lookup: Search help articles inside the chat window',
      'Automated content gap detection: Alerts writers to missed topics',
    ],
  },
  {
    id: 'automate',
    number: '04',
    shortName: 'Automate',
    name: 'Supportly Automate',
    icon: Zap,
    tagline: 'SLA enforcement and routing without code.',
    description:
      'Build visual "if-this-then-that" rules powered by BullMQ background workers. Route by category, enforce SLA countdowns, auto-escalate stale issues, and trigger CSAT surveys.',
    techPill: 'BullMQ + Upstash Redis + Postmark + Slack Bolt SDK',
    inputs: [
      { label: 'Ticket Created', sublabel: 'Event trigger', icon: <ZapierLogo size={16} />, bgHex: '#FFF7ED' },
      { label: 'SLA Countdown', sublabel: 'Delayed BullMQ job', icon: <Clock size={16} className="text-amber-600" />, bgHex: '#FFFBEB' },
      { label: 'Status Update', sublabel: 'Field change event', icon: <Workflow size={16} className="text-primary" />, bgHex: '#EEF2FF' },
      { label: 'Ticket Resolved', sublabel: 'Resolution trigger', icon: <CheckCircle2 size={16} className="text-emerald-600" />, bgHex: '#F0FDF4' },
    ],
    outputs: [
      { label: 'Auto-Assigned Team', sublabel: 'Round-robin or skills-based' },
      { label: 'Slack Alert Dispatched', sublabel: 'Pre-breach warning at −30m' },
      { label: 'CSAT Survey Fired', sublabel: 'Sent 6h post-resolution', highlight: true },
    ],
    capabilities: [
      'No-code rule engine with pre-built routing, escalation, and SLA templates',
      'BullMQ workers: Reliable delayed timers and webhook retry queues',
      'Pre-breach warnings 30 minutes before SLA expiry window',
      'VIP routing: Tier-1 enterprise accounts bypass standard queues',
    ],
  },
  {
    id: 'insights',
    number: '05',
    shortName: 'Insights',
    name: 'Supportly Insights',
    icon: BarChart3,
    tagline: 'Transform support telemetry into operational clarity.',
    description:
      'Real-time operational metrics — First Response Times, SLA compliance, agent performance, AI deflection rates, and CSAT scores — powered by PostgreSQL materialized views.',
    techPill: 'PostgreSQL Materialized Views + Window Functions + Recharts',
    inputs: [
      { label: 'Ticket Lifecycle', sublabel: 'Create, update, close logs', icon: <AirtableLogo size={16} />, bgHex: '#F0FBFF' },
      { label: 'CSAT Ratings', sublabel: 'Customer satisfaction scores', icon: <Star size={16} className="text-amber-500 fill-amber-500" />, bgHex: '#FFFBEB' },
      { label: 'AI Resolution Logs', sublabel: 'Latency & confidence data', icon: <OpenAiLogo size={16} />, bgHex: '#F0FDF9' },
      { label: 'SLA Audit Trail', sublabel: 'Breach logs & agent history', icon: <Activity size={16} className="text-red-500" />, bgHex: '#FEF2F2' },
    ],
    outputs: [
      { label: 'FRT: 48s · SLA: 98.6%', sublabel: 'Live operational health pulse' },
      { label: '64% AI Deflection', sublabel: 'Autonomous vs human resolution', highlight: true },
      { label: 'Weekly Exec Report', sublabel: 'Automated Monday email summary' },
    ],
    capabilities: [
      'PostgreSQL materialized views provide sub-second analytics on 500K+ rows',
      'Per-agent scorecards: Volume, resolution velocity, and CSAT trends',
      'AI vs Human telemetry: Deflection ratios and escalation root causes',
      'Scheduled executive email reports delivered every Monday morning',
    ],
  },
];

// ─── Architecture Tech Cards ───────────────────────────────────────────────
const TECH_CARDS = [
  {
    icon: Database,
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    border: 'border-sky-100',
    title: 'PostgreSQL 16 + pgvector',
    desc: 'Relational consistency with vector memory. GIN full-text indexes, atomic sequences, Row-Level Security, and semantic search in a single database.',
    pill: 'Zero extra vector DBs',
  },
  {
    icon: Bot,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    title: 'Decoupled LLM Pipeline',
    desc: 'AI inference executes asynchronously outside PostgreSQL transaction blocks. Connection pools remain healthy during multi-second model responses.',
    pill: 'Zero pool starvation',
  },
  {
    icon: Activity,
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/15',
    title: 'SSE + WebSocket Hybrid',
    desc: 'Server-Sent Events broadcast ticket status changes to agent dashboards. WebSockets power customer chat. Redis Pub/Sub synchronizes instances.',
    pill: 'No polling overhead',
  },
  {
    icon: Workflow,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    title: 'BullMQ + Upstash Redis',
    desc: 'SLA countdown timers, webhook retries, email dispatch, and CSAT surveys execute through reliable distributed background queues.',
    pill: 'Serverless Redis runtime',
  },
  {
    icon: Lock,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    title: 'Multi-Tenant Data Isolation',
    desc: 'PostgreSQL RLS policies enforce strict tenant boundaries. Tenant middleware validates all incoming requests. Immutable audit trails guarantee compliance.',
    pill: 'DPDP & GDPR compliant',
  },
  {
    icon: GitBranch,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    title: 'Multi-Model LLM Gateway',
    desc: 'OpenRouter intelligently directs classification to ultra-fast models (Gemini Flash) and customer communication to frontier models (Claude Sonnet).',
    pill: 'Smart cost routing',
  },
];

// ─── Pricing Plans ─────────────────────────────────────────────────────────
const PLANS = [
  {
    name: 'Community',
    price: '$0',
    period: 'forever free',
    desc: 'Get started with zero risk.',
    border: 'border-line',
    badge: '',
    features: [
      'Up to 3 agents',
      'Web Portal + Email channel',
      '50 AI resolutions / mo',
      '50 KB articles',
      '5 automation rules',
      'Community support',
      '90-day retention',
    ],
    cta: 'Get Started Free',
    ctaClass: 'border border-line text-ink/80 hover:bg-canvas',
  },
  {
    name: 'Starter',
    price: '$15',
    period: '/agent/mo',
    desc: 'For growing support teams.',
    border: 'border-line',
    badge: '',
    features: [
      'Unlimited agents',
      '+ Live Chat Widget',
      '200 AI resolutions / mo',
      '500 KB articles',
      '25 automation rules',
      'Email support (48h SLA)',
      '1-year retention',
    ],
    cta: 'Start Starter',
    ctaClass: 'border border-line text-ink/80 hover:bg-canvas',
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/agent/mo',
    desc: 'AI-first, omnichannel scale.',
    border: 'border-primary/60 shadow-lg shadow-primary/10',
    badge: 'Most Popular',
    features: [
      'Unlimited agents',
      '+ WhatsApp & Slack channels',
      '1,000 AI resolutions / mo',
      'Unlimited KB articles',
      'Unlimited automation rules',
      'Priority support (4h SLA)',
      '3-year retention',
    ],
    cta: 'Start Pro',
    ctaClass: 'bg-primary text-white hover:bg-primary-deep shadow-md shadow-primary/20',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'tailored',
    desc: 'Mission-critical enterprise volume.',
    border: 'border-line',
    badge: '',
    features: [
      'Unlimited agents',
      'All channels + Voice AI',
      'Custom AI resolution pool',
      'Dedicated CSM',
      'SAML SSO & Custom Tools',
      'Custom data residency',
      'Unlimited retention',
    ],
    cta: 'Talk to Sales',
    ctaClass: 'border border-line text-ink/80 hover:bg-canvas',
  },
];

// ─── Head-to-Head Comparison ───────────────────────────────────────────────
const COMPARE = [
  { label: 'Starting Price', zen: '$55/agent', inter: '$29/seat', fresh: '$19/agent', sup: 'Free → $15/agent' },
  { label: 'AI Resolution Cost', zen: '$1.50/resolution', inter: '$0.99/resolution', fresh: '$0.49/session', sup: '$0.50/resolution' },
  { label: 'AI Copilot Included', zen: '+ Add-on ($50+)', inter: 'Bundled', fresh: 'Bundled', sup: 'Included on all tiers' },
  { label: 'WhatsApp Channel', zen: 'Enterprise tier only', inter: 'Supported', fresh: 'Supported', sup: 'Supported (Pro & above)' },
  { label: 'Collision Detection', zen: '$115+ tier only', inter: 'Supported', fresh: 'Partial', sup: 'Native on all tiers' },
  { label: 'Multi-Tenant RLS', zen: 'Proprietary', inter: 'Proprietary', fresh: 'Proprietary', sup: 'PostgreSQL RLS' },
  { label: 'Free Tier', zen: 'None', inter: 'None', fresh: '2 agents', sup: '3 agents + AI included' },
  { label: 'Deployment Setup', zen: '4–8 weeks', inter: '2–5 days', fresh: '1–2 days', sup: '< 5 minutes' },
];

// ─── Main Product Page Component ───────────────────────────────────────────
export const ProductPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeId, setActiveId] = useState('inbox');
  const current = MODULES.find((m) => m.id === activeId) ?? MODULES[0];
  const CurrentModuleIcon = current.icon;

  return (
    <div className="min-h-screen bg-canvas flex flex-col font-sans selection:bg-primary/20">

      {/* ── Fixed Sticky Navigation ─────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-line shadow-[0_1px_6px_rgba(0,0,0,0.03)]">
        <div className="h-14 max-w-[1240px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Logo />
            <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-ink/70">
              <Link to="/platform" className="text-primary font-bold">Platform</Link>
              <a href="#modules" className="hover:text-ink transition-colors">Modules</a>
              <a href="#technology" className="hover:text-ink transition-colors">Technology</a>
              <a href="#pricing" className="hover:text-ink transition-colors">Pricing</a>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/submit-ticket"
              className="text-xs font-bold text-white bg-primary hover:bg-primary-deep px-3.5 py-1.5 rounded-full shadow-[0_2px_8px_rgba(91,80,238,0.2)] transition-all hover:-translate-y-0.5"
            >
              Submit Ticket
            </Link>
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-ink/80 hover:text-ink hover:bg-canvas px-3 py-1.5 rounded-full border border-line transition-all"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-primary" />
                Dashboard <ArrowRight className="w-3 h-3 text-ink/40" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-ink/75 hover:bg-canvas px-3 py-1.5 rounded-full border border-line transition-all"
              >
                <UserIcon className="w-3.5 h-3.5 text-primary" />
                Agent Login
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 pt-14">

        {/* ── Hero Section (Centered & Viewport-Calibrated) ─────────── */}
        <section className="relative overflow-hidden pt-10 pb-12 sm:pt-14 sm:pb-14 border-b border-line bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#5B4FE508,transparent_60%)] pointer-events-none" />

          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-wider mb-5">
                <Layers className="w-3.5 h-3.5" />
                Five Integrated Modules · One Autonomous Platform
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight leading-[1.15] max-w-2xl mx-auto">
                The Customer Support Platform<br className="hidden sm:inline" />
                Built for{' '}
                <span className="bg-gradient-to-r from-primary via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  Speed, Intelligence & Scale.
                </span>
              </h1>

              <p className="mt-4 text-sm sm:text-base text-ink/65 max-w-xl mx-auto leading-relaxed">
                Supportly replaces fragmented helpdesks with an integrated support operating system — autonomous triage, omnichannel queue, semantic knowledge base, no-code workflows, and live operations analytics.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 text-xs font-bold text-white bg-primary hover:bg-primary-deep px-5 py-2.5 rounded-full shadow-md shadow-primary/25 transition-all hover:-translate-y-0.5"
                >
                  Open Agent Console <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/submit-ticket"
                  className="inline-flex items-center gap-2 text-xs font-bold text-ink/80 bg-white hover:bg-slate-50 border border-line px-5 py-2.5 rounded-full transition-all"
                >
                  Submit Live Ticket
                </Link>
              </div>

              {/* KPI Strip (Centered) */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-card border border-line shadow-card max-w-2xl w-full mx-auto">
                {[
                  { val: '< 45s', label: 'Autonomous Resolution', color: 'text-primary' },
                  { val: '85%', label: 'OPEX Reduction vs BPO', color: 'text-emerald-600' },
                  { val: 'Sub-5ms', label: 'GIN Full-Text Search', color: 'text-sky-600' },
                  { val: '5 Channels', label: 'Unified Inbox', color: 'text-violet-600' },
                ].map((m, i) => (
                  <div key={i} className="text-center">
                    <p className={`text-xl font-black font-mono ${m.color}`}>{m.val}</p>
                    <p className="text-[11px] text-ink/55 mt-0.5 leading-tight">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Five Modules Section (Viewport-calibrated showcase) ─────── */}
        <section id="modules" className="py-8 sm:py-10 bg-canvas">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6">

            {/* Concise Header */}
            <div className="text-center max-w-xl mx-auto mb-5">
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Five Integrated Modules</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink mt-1 tracking-tight">
                How data connects, flows, and resolves
              </h2>
            </div>

            {/* Module Switcher Tabs (Zero emojis, clean Lucide icons) */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-xl bg-white border border-line shadow-2xs max-w-2xl mx-auto mb-6">
              {MODULES.map((mod) => {
                const Icon = mod.icon;
                const isActive = mod.id === activeId;
                return (
                  <button
                    key={mod.id}
                    onClick={() => setActiveId(mod.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-primary text-white shadow-sm shadow-primary/20 scale-[1.02]'
                        : 'text-ink/65 hover:text-ink hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{mod.shortName}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Module Showcase Card (Compact & Balanced) */}
            <div className="bg-card rounded-2xl border border-line shadow-card overflow-hidden">

              {/* Title Bar */}
              <div className="bg-gradient-to-r from-primary/5 to-indigo-500/5 border-b border-line px-5 py-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm">
                    <CurrentModuleIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-primary/70">{current.number}</span>
                    <h3 className="text-sm font-extrabold text-ink leading-none">{current.name}</h3>
                  </div>
                </div>
                <code className="text-[11px] font-mono text-ink/50 bg-canvas px-2.5 py-1 rounded border border-line">
                  {current.techPill}
                </code>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

                {/* Left Column: Value Prop & Capabilities */}
                <div className="lg:col-span-5 p-5 sm:p-6 space-y-4 border-b lg:border-b-0 lg:border-r border-line flex flex-col justify-between">
                  <div className="space-y-3">
                    <p className="text-sm font-bold text-primary leading-snug">{current.tagline}</p>
                    <p className="text-xs text-ink/65 leading-relaxed">{current.description}</p>

                    <div className="pt-1 space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Core Capabilities</p>
                      {current.capabilities.map((cap, i) => (
                        <div key={i} className="flex items-start gap-2 text-[11px] text-ink/75 leading-tight">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-line/60">
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-deep transition-colors"
                    >
                      Open in Agent Console <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: High-Precision SVG Flow Diagram */}
                <div className="lg:col-span-7 p-4 sm:p-5 bg-canvas/60 flex flex-col justify-center">
                  <div className="bg-white rounded-xl border border-line shadow-card overflow-hidden">
                    {/* macOS Window Chrome */}
                    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-line bg-canvas/80">
                      <div className="w-2 h-2 rounded-full bg-rose-400" />
                      <div className="w-2 h-2 rounded-full bg-amber-400" />
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="ml-2 text-[10px] font-mono text-ink/45">
                        {current.name} · Pipeline Map
                      </span>
                    </div>

                    {/* SVG Flow Container */}
                    <div className="p-3 sm:p-4 flex items-center justify-center">
                      <SvgFlowDiagram
                        inputs={current.inputs}
                        moduleName={current.shortName}
                        outputs={current.outputs}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ── Architecture & Technology Section ──────────────────────── */}
        <section id="technology" className="py-12 sm:py-16 bg-white border-y border-line">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6">

            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Engineered for Reliability</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink mt-1 tracking-tight">
                Modern stack. Zero alien technology.
              </h2>
              <p className="text-xs sm:text-sm text-ink/65 mt-2">
                Naturally built on React + Node.js + PostgreSQL. Zero vendor lock-in, zero unnecessary infrastructure.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TECH_CARDS.map((card, i) => {
                const Icon = card.icon;
                return (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border ${card.border} bg-white hover:shadow-card hover:-translate-y-0.5 transition-all space-y-3`}
                  >
                    <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center ${card.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-ink">{card.title}</h4>
                      <p className="text-[11px] text-ink/65 mt-1.5 leading-relaxed">{card.desc}</p>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-canvas border border-line text-[9px] font-mono font-semibold text-ink/60">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                      {card.pill}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Architecture Evolution Comparison */}
            <div className="mt-10 p-5 sm:p-7 rounded-xl bg-ink text-white border border-ink/80">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-5">
                Architecture Evolution: Assessment Prototype to Production SaaS
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-bold text-white/50 mb-3">Current Foundation (v1.x)</p>
                  <div className="space-y-1.5 font-mono text-[11px] text-white/80">
                    {['React 19 SPA + Vite + TanStack Query', 'REST API (Express + TypeScript + Zod)', 'Neon PostgreSQL (Serverless, GIN Index)', 'OpenRouter LLM Inference Gateway'].map((item, i) => (
                      <div key={i} className="p-2 rounded bg-white/5 border border-white/10">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-400/80 mb-3">Full SaaS Target (v3.x)</p>
                  <div className="space-y-1.5 font-mono text-[11px]">
                    {[
                      'React 19 · Embeddable Shadow DOM Widget',
                      'Express · Multi-Tenant RLS Middleware · OAuth2',
                      'Neon PostgreSQL + pgvector + Table Partitioning',
                      'BullMQ + Upstash Redis Distributed Task Queues',
                    ].map((item, i) => (
                      <div key={i} className="p-2 rounded bg-primary/20 border border-primary/30 text-primary-light">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── Transparent Pricing Section ───────────────────────────── */}
        <section id="pricing" className="py-12 sm:py-16 bg-canvas">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6">

            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Transparent Pricing</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink mt-1 tracking-tight">
                Predictable, agent-friendly pricing
              </h2>
              <p className="text-xs sm:text-sm text-ink/65 mt-2">
                Zendesk charges $55/agent + $1.50/AI resolution. Supportly starts free and charges{' '}
                <strong className="text-ink">$0.50 per verified autonomous resolution.</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PLANS.map((plan, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col rounded-xl border ${plan.border} bg-card p-5 space-y-4 hover:shadow-card transition-shadow`}
                >
                  {plan.badge && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-primary text-white text-[9px] font-bold uppercase tracking-wider shadow-sm shadow-primary/25">
                      {plan.badge}
                    </span>
                  )}
                  <div>
                    <p className="text-[10px] font-bold text-ink/50 uppercase tracking-wider">{plan.name}</p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-black text-ink">{plan.price}</span>
                      <span className="text-[11px] text-ink/50">{plan.period}</span>
                    </div>
                    <p className="text-[11px] text-ink/60 mt-1">{plan.desc}</p>
                  </div>
                  <ul className="space-y-1.5 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-1.5 text-[11px] text-ink/75">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/submit-ticket"
                    className={`block text-center text-xs font-bold px-3 py-2 rounded-lg transition-all ${plan.ctaClass}`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>

            <p className="text-center text-[11px] text-ink/50 mt-5">
              Metered AI resolution overage: <strong className="text-ink">$0.50/resolution</strong>{' '}
              (vs Intercom $0.99 · Zendesk $1.50)
            </p>
          </div>
        </section>

        {/* ── Head-to-Head Comparison Table ─────────────────────────── */}
        <section className="py-12 sm:py-16 bg-white border-t border-line">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6">

            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Competitive Landscape</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink mt-1 tracking-tight">
                How Supportly compares
              </h2>
            </div>

            <div className="overflow-x-auto rounded-xl border border-line shadow-card">
              <table className="w-full text-[11px] min-w-[580px]">
                <thead>
                  <tr className="bg-canvas border-b border-line">
                    <th className="text-left p-3.5 font-bold text-ink/50 uppercase tracking-wider">Dimension</th>
                    <th className="p-3.5 font-bold text-ink/60 text-center">Zendesk</th>
                    <th className="p-3.5 font-bold text-ink/60 text-center">Intercom</th>
                    <th className="p-3.5 font-bold text-ink/60 text-center">Freshdesk</th>
                    <th className="p-3.5 font-extrabold text-primary text-center bg-primary/5 border-x border-primary/20">
                      Supportly
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((row, i) => (
                    <tr key={i} className={`border-b border-line last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-canvas/50'}`}>
                      <td className="p-3 font-semibold text-ink/75">{row.label}</td>
                      <td className="p-3 text-center text-ink/60">{row.zen}</td>
                      <td className="p-3 text-center text-ink/60">{row.inter}</td>
                      <td className="p-3 text-center text-ink/60">{row.fresh}</td>
                      <td className="p-3 text-center font-bold text-primary bg-primary/5 border-x border-primary/20">
                        {row.sup}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Closing CTA ────────────────────────────────────────────── */}
        <section className="py-12 sm:py-16 bg-canvas">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
            <div className="rounded-2xl bg-gradient-to-br from-ink via-slate-900 to-primary-deep text-white px-6 py-10 sm:p-12 shadow-xl relative overflow-hidden text-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#5B4FE525,transparent_60%)] pointer-events-none" />
              <div className="relative z-10 max-w-xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/10 border border-white/20">
                  <TrendingUp className="w-3 h-3 text-primary" />
                  Live Deployed · Ready to Test
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Experience the modern support platform
                </h2>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-lg mx-auto">
                  Test the complete workflow live. Submit a ticket from the customer portal, review the AI triage, and manage resolution from the agent console.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Link
                    to="/submit-ticket"
                    className="inline-flex items-center gap-2 text-xs font-bold text-ink bg-white hover:bg-slate-100 px-5 py-2.5 rounded-full shadow-md transition-all hover:scale-105"
                  >
                    Submit a Live Ticket <ArrowRight className="w-3.5 h-3.5 text-primary" />
                  </Link>
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-xs font-bold text-white bg-primary hover:bg-primary-deep border border-primary-deep px-5 py-2.5 rounded-full transition-all"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Open Agent Console
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};
