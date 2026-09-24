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
  ShieldCheck,
  Cpu,
  Clock,
  Search,
  Lock,
  ChevronRight,
  LayoutDashboard,
  User as UserIcon,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface ProductModule {
  id: string;
  badge: string;
  name: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  color: string;
  accentBg: string;
  benefits: string[];
  mockup: {
    title: string;
    subtitle: string;
    metaItems: { label: string; value: string; color?: string }[];
    previewContent: React.ReactNode;
  };
}

const PRODUCT_MODULES: ProductModule[] = [
  {
    id: 'inbox',
    badge: 'Real-Time Omnichannel',
    name: 'Supportly Inbox',
    tagline: 'One Unified Workspace for Every Customer Conversation',
    description:
      'Unify incoming customer inquiries from Web Portal, Email, Live Chat Widget, and WhatsApp into a single high-velocity collaboration inbox. Eliminate fragmented tabs and communication silos.',
    icon: Inbox,
    color: 'text-primary',
    accentBg: 'bg-primary/10 border-primary/20',
    benefits: [
      'Real-time agent collision detection prevents duplicate replies',
      'Dual-mode notes: Private internal team notes vs. outbound customer replies',
      'Sub-5ms PostgreSQL GIN full-text search across all conversations',
      'Atomic sequence concurrency ensuring zero race conditions in ticket numbering',
    ],
    mockup: {
      title: 'Shared Team Inbox',
      subtitle: 'Viewing active queue · 4 agents online',
      metaItems: [
        { label: 'Avg Wait', value: '42s', color: 'text-emerald-600' },
        { label: 'Unassigned', value: '3', color: 'text-amber-600' },
        { label: 'Live Sync', value: 'Active', color: 'text-primary' },
      ],
      previewContent: (
        <div className="space-y-2.5 text-xs font-sans">
          <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <div>
                <p className="font-bold text-ink">TKT-104: Payment reconciliation failure</p>
                <p className="text-ink/60">Priya Desai · KredX · Web Portal</p>
              </div>
            </div>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white text-primary font-bold border border-primary/30">
              In Review
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between opacity-80">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <div>
                <p className="font-bold text-ink">TKT-103: API webhook batch timeout</p>
                <p className="text-ink/60">Arun Sharma · QuickSend · Email</p>
              </div>
            </div>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white text-amber-600 font-bold border border-amber-200">
              Urgent (2h SLA)
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200 text-amber-900 text-[11px] flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 shrink-0 text-amber-700" />
            <span>
              <strong>Agent Presence:</strong> Yash P. is currently viewing TKT-104. Collision lock active.
            </span>
          </div>
        </div>
      ),
    },
  },
  {
    id: 'ai',
    badge: 'Autonomous Resolution',
    name: 'Supportly AI',
    tagline: 'Autonomous Triage and Verified Instant Resolutions',
    description:
      'Go beyond generic chat suggestions. Supportly AI analyzes ticket context, checks conversation history, verifies customer sentiment, and executes end-to-end resolutions without human latency.',
    icon: Sparkles,
    color: 'text-violet-600',
    accentBg: 'bg-violet-500/10 border-violet-500/20',
    benefits: [
      'Zero-touch classification: Category, Sentiment, Priority, and Client Attribution',
      'Context-aware suggestion engine reading multi-turn timeline history',
      'Decoupled async inference architecture preserving database connection pools',
      'Guardrailed tool-calling for instant refunds, status updates, and order lookups',
    ],
    mockup: {
      title: 'AI Ticket Insights & Resolution Engine',
      subtitle: 'Model: OpenRouter / Decoupled Async Inference',
      metaItems: [
        { label: 'Category', value: 'Billing', color: 'text-primary' },
        { label: 'Sentiment', value: 'Frustrated', color: 'text-amber-600' },
        { label: 'Confidence', value: '96.4%', color: 'text-emerald-600' },
      ],
      previewContent: (
        <div className="space-y-3 text-xs font-sans">
          <div className="p-3 rounded-xl bg-violet-50/70 border border-violet-200/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-violet-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                Verified AI Customer Response
              </span>
              <span className="text-[10px] text-violet-600 font-mono">Sub-45s Resolution</span>
            </div>
            <p className="text-ink/80 text-[11px] leading-relaxed">
              "Hi Priya, I reviewed your account telemetry for KredX. The duplicate charge of $249 has been reversed to your card ending in 4112. Transaction ref: #RF-9921."
            </p>
          </div>
          <div className="flex items-center justify-between text-[11px] text-ink/70 px-1">
            <span>Citations: 2 KB articles</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> No Hallucinations Detected
            </span>
          </div>
        </div>
      ),
    },
  },
  {
    id: 'docs',
    badge: 'Self-Service Knowledge Base',
    name: 'Supportly Docs',
    tagline: 'Deflect Inquiries Before They Become Tickets',
    description:
      'Empower customers with a fast, searchable public knowledge base, and give your support agents a central library of internal runbooks and standard operating procedures (SOPs).',
    icon: BookOpen,
    color: 'text-blue-600',
    accentBg: 'bg-blue-500/10 border-blue-500/20',
    benefits: [
      'Hybrid semantic vector search powered by PostgreSQL and pgvector',
      'Embeddable in-widget article lookup before customers start conversations',
      'Role-permissioned internal articles for team training and incident runbooks',
      'Automated content gap detection identifying topics customers frequently ask about',
    ],
    mockup: {
      title: 'Knowledge Base & Customer Portal',
      subtitle: 'help.supportly.app · 142 Articles Published',
      metaItems: [
        { label: 'Deflection Rate', value: '41.8%', color: 'text-emerald-600' },
        { label: 'Search Speed', value: '3.8ms', color: 'text-primary' },
        { label: 'Helpfulness', value: '94%', color: 'text-blue-600' },
      ],
      previewContent: (
        <div className="space-y-2 text-xs font-sans">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 border border-slate-200">
            <Search className="w-3.5 h-3.5 text-ink/40" />
            <span className="text-ink/60">Searching: "how to configure webhook signatures..."</span>
          </div>
          <div className="p-2.5 rounded-lg bg-white border border-line shadow-2xs space-y-1">
            <p className="font-bold text-ink text-[11px]">Verifying HMAC-SHA256 Signatures in Node.js</p>
            <p className="text-ink/60 text-[10px]">Updated 2 days ago · 98% found this helpful</p>
          </div>
        </div>
      ),
    },
  },
  {
    id: 'automate',
    badge: 'Visual SLA & Workflow Automation',
    name: 'Supportly Automate',
    tagline: 'No-Code Routing, Escalations, and SLA Enforcement',
    description:
      'Eliminate manual ticket sorting. Build automated event-based and time-based rules that assign tickets by skill, enforce SLA countdowns, and trigger instant Slack notifications before breaches occur.',
    icon: Zap,
    color: 'text-amber-600',
    accentBg: 'bg-amber-500/10 border-amber-500/20',
    benefits: [
      'Visual if-this-then-that rule builder for complex multi-step routing',
      'Dynamic SLA countdown timers with pre-breach alerts at 30 minutes',
      'Automated dark-store and tiered escalation for quick-commerce and enterprise SLA',
      'Post-resolution CSAT feedback surveys triggered automatically via email or chat',
    ],
    mockup: {
      title: 'Active Automation Rule #04',
      subtitle: 'Condition: Priority = Urgent & Status = Open > 30m',
      metaItems: [
        { label: 'SLA Window', value: '2 Hours', color: 'text-amber-600' },
        { label: 'Auto-Actions', value: '3 Steps', color: 'text-ink' },
        { label: 'Execution', value: '100% Reliable', color: 'text-emerald-600' },
      ],
      previewContent: (
        <div className="space-y-2 text-xs font-sans">
          <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/80 flex items-center justify-between text-[11px]">
            <span className="font-semibold text-amber-900">Step 1: Re-assign to Senior Support Engineer</span>
            <span className="text-emerald-600 font-bold font-mono">Executed</span>
          </div>
          <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/80 flex items-center justify-between text-[11px]">
            <span className="font-semibold text-amber-900">Step 2: Dispatch Slack alert to #support-critical</span>
            <span className="text-emerald-600 font-bold font-mono">Executed</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-[11px] text-ink/60">
            <span>Step 3: Trigger customer proactive delay notice</span>
            <span className="font-mono text-[10px]">Queued</span>
          </div>
        </div>
      ),
    },
  },
  {
    id: 'insights',
    badge: 'Operational Intelligence',
    name: 'Supportly Insights',
    tagline: 'Real-Time CX Telemetry and Executive Reporting',
    description:
      'Transform customer support from a cost center into a strategic engine. Track First Response Time (FRT), resolution velocity, customer sentiment trends, and AI deflection ratios at a glance.',
    icon: BarChart3,
    color: 'text-emerald-600',
    accentBg: 'bg-emerald-500/10 border-emerald-500/20',
    benefits: [
      'Real-time KPI metrics: FRT, MTTR, First Contact Resolution, and SLA compliance',
      'AI vs. Human performance scorecards tracking deflection rate and cost savings',
      'Agent workload distribution and capacity planning reports',
      'One-click CSV/PDF export and scheduled executive summaries',
    ],
    mockup: {
      title: 'Executive CX Performance Dashboard',
      subtitle: 'Live Telemetry · Rolling 30 Days',
      metaItems: [
        { label: 'FRT', value: '48 sec', color: 'text-primary' },
        { label: 'SLA Pass', value: '98.6%', color: 'text-emerald-600' },
        { label: 'CSAT', value: '4.8 / 5.0', color: 'text-amber-500' },
      ],
      previewContent: (
        <div className="space-y-2 text-xs font-sans">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-lg bg-white border border-line">
              <span className="text-[10px] text-ink/60 uppercase font-semibold">AI Deflection</span>
              <p className="text-base font-bold text-ink mt-0.5">64.2%</p>
              <span className="text-[10px] text-emerald-600 font-semibold">+18% this month</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-line">
              <span className="text-[10px] text-ink/60 uppercase font-semibold">Cost / Resolution</span>
              <p className="text-base font-bold text-ink mt-0.5">$0.42</p>
              <span className="text-[10px] text-emerald-600 font-semibold">-78% vs BPO</span>
            </div>
          </div>
        </div>
      ),
    },
  },
];

export const ProductPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('inbox');

  const currentModule = PRODUCT_MODULES.find((m) => m.id === activeTab) || PRODUCT_MODULES[0];

  return (
    <div className="min-h-screen bg-canvas flex flex-col font-sans selection:bg-primary/20">
      {/* Sticky High-End Top Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-line shadow-[0_1px_6px_rgba(0,0,0,0.03)] transition-all">
        <div className="h-16 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <Logo />
            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-ink/70">
              <Link to="/platform" className="text-primary font-bold transition-colors">
                Platform
              </Link>
              <Link to="/#features" className="hover:text-primary transition-colors">
                Features
              </Link>
              <Link to="/#how-it-works" className="hover:text-primary transition-colors">
                How It Works
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to="/submit-ticket"
              className="inline-flex items-center justify-center text-xs font-bold text-white bg-primary hover:bg-primary-deep px-4 py-2 rounded-full shadow-[0_3px_12px_rgba(91,80,238,0.25)] transition-all hover:-translate-y-0.5"
            >
              Submit Ticket
            </Link>

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-ink/80 hover:text-ink hover:bg-canvas px-3.5 py-2 rounded-full border border-line transition-all shadow-2xs hover:border-ink/30"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-primary" />
                <span className="hidden sm:inline">Dashboard</span>
                <span className="sm:hidden">App</span>
                <ArrowRight className="w-3 h-3 text-ink/40" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-ink/75 hover:text-ink hover:bg-canvas px-3.5 py-2 rounded-full border border-line transition-all shadow-2xs hover:border-ink/30"
              >
                <UserIcon className="w-3.5 h-3.5 text-primary" />
                <span>Agent Sign in</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Marketing Platform Content */}
      <main className="flex-1 w-full pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-line bg-gradient-to-b from-white via-canvas to-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#5B4FE50A,transparent_70%)] pointer-events-none" />

          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Generation Customer Support Suite</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink tracking-tight max-w-4xl mx-auto leading-[1.12]">
              The Autonomous Customer Support Platform Built for{' '}
              <span className="bg-gradient-to-r from-primary via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Velocity.
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-ink/70 max-w-2xl mx-auto leading-relaxed">
              Replace fragmented tools with an integrated AI customer service platform. Supportly pairs
              omnichannel real-time collaboration with context-aware autonomous resolution to deliver sub-minute support at a fraction of legacy cost.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 text-sm font-bold text-white bg-primary hover:bg-primary-deep px-6 py-3 rounded-full shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5"
              >
                <span>Explore Live Agent Console</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/submit-ticket"
                className="inline-flex items-center gap-2 text-sm font-bold text-ink/80 hover:text-ink bg-white hover:bg-slate-50 border border-line px-6 py-3 rounded-full shadow-2xs transition-all hover:border-ink/30"
              >
                <span>Submit Sample Ticket</span>
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-14 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-card border border-line shadow-card text-left">
              <div>
                <p className="text-2xl font-black text-primary font-mono">&lt; 45s</p>
                <p className="text-xs text-ink/60 mt-0.5">Autonomous Resolution</p>
              </div>
              <div>
                <p className="text-2xl font-black text-ink font-mono">85%</p>
                <p className="text-xs text-ink/60 mt-0.5">Direct OPEX Reduction</p>
              </div>
              <div>
                <p className="text-2xl font-black text-emerald-600 font-mono">Sub-5ms</p>
                <p className="text-xs text-ink/60 mt-0.5">GIN Full-Text Search</p>
              </div>
              <div>
                <p className="text-2xl font-black text-purple-600 font-mono">5 Channels</p>
                <p className="text-xs text-ink/60 mt-0.5">Unified Real-Time Inbox</p>
              </div>
            </div>
          </div>
        </section>

        {/* Five Core Products Showcase Section */}
        <section className="py-20 sm:py-28 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Five Integrated Modules</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mt-2 tracking-tight">
              One Cohesive Platform. Zero Fragmentation.
            </h2>
            <p className="text-sm sm:text-base text-ink/70 mt-3">
              Explore how each component of Supportly works in unison to solve customer inquiries end-to-end.
            </p>
          </div>

          {/* Interactive Product Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-white border border-line shadow-2xs max-w-3xl mx-auto mb-12">
            {PRODUCT_MODULES.map((mod) => {
              const Icon = mod.icon;
              const isActive = mod.id === activeTab;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveTab(mod.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]'
                      : 'text-ink/70 hover:text-ink hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{mod.name.replace('Supportly ', '')}</span>
                </button>
              );
            })}
          </div>

          {/* Active Module Detailed View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-card rounded-3xl p-6 sm:p-10 border border-line shadow-card">
            {/* Left Col: Value Prop & Capabilities */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                <currentModule.icon className="w-3.5 h-3.5" />
                <span>{currentModule.badge}</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                  {currentModule.name}
                </h3>
                <p className="text-base font-semibold text-primary mt-1">{currentModule.tagline}</p>
                <p className="text-sm text-ink/70 mt-3 leading-relaxed">{currentModule.description}</p>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-ink/50">Core Capabilities</p>
                {currentModule.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-ink/80 leading-normal">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-deep transition-colors"
                >
                  <span>Launch in Dashboard</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Col: High-Fidelity Interactive Mockup */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-line bg-canvas p-5 shadow-inner space-y-4">
                {/* macOS Window Header */}
                <div className="flex items-center justify-between pb-3 border-b border-line">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[11px] font-mono text-ink/60 font-semibold">
                    {currentModule.mockup.title}
                  </span>
                  <span className="w-3" />
                </div>

                {/* Subtitle & Live Badges */}
                <div className="flex items-center justify-between text-xs pb-1">
                  <span className="text-ink/60 text-[11px]">{currentModule.mockup.subtitle}</span>
                </div>

                {/* KPI chips */}
                <div className="grid grid-cols-3 gap-2">
                  {currentModule.mockup.metaItems.map((item, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-white border border-line/80 text-center">
                      <span className="text-[9px] uppercase tracking-wider text-ink/50 font-bold block">
                        {item.label}
                      </span>
                      <span className={`text-xs font-bold font-mono ${item.color || 'text-ink'}`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Dynamic Preview Body */}
                <div className="bg-white rounded-xl p-4 border border-line shadow-2xs">
                  {currentModule.mockup.previewContent}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Supportly Comparison Section */}
        <section className="py-20 bg-white border-y border-line">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">The Supportly Advantage</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mt-2 tracking-tight">
                Built for High-Growth Teams, Not Legacy Bureaucracy.
              </h2>
              <p className="text-sm sm:text-base text-ink/70 mt-3">
                See how Supportly compares against traditional legacy enterprise helpdesk suites.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-line bg-canvas space-y-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-ink">Under 5-Minute Setup</h4>
                <p className="text-xs text-ink/70 leading-relaxed">
                  Zero complex admin consultants or 6-week onboarding cycles. Connect email, drop our chat widget snippet, and start resolving immediately.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-line bg-canvas space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-ink">Autonomous AI Included</h4>
                <p className="text-xs text-ink/70 leading-relaxed">
                  Unlike incumbents charging an extra $50/agent for AI copilot tools, Supportly includes automatic triage, sentiment scoring, and context suggestions natively.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-line bg-canvas space-y-4">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-ink">Modern TypeScript & SQL Stack</h4>
                <p className="text-xs text-ink/70 leading-relaxed">
                  Built on modern React 19, Express, and PostgreSQL with GIN indexes and atomic sequencing. Zero proprietary lock-in; 100% developer friendly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Global CTA Section */}
        <section className="py-20 sm:py-24 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-3xl bg-gradient-to-br from-ink via-slate-900 to-primary-deep text-white p-10 sm:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#5B4FE530,transparent_60%)] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Get Started in Seconds</span>
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Ready to Experience the Future of Customer Support?
              </h2>

              <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto leading-relaxed">
                Test the end-to-end workflow on our live deployed instance. Submit a customer ticket, watch the AI triage, and resolve it from the agent console.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/submit-ticket"
                  className="inline-flex items-center gap-2 text-sm font-bold text-ink bg-white hover:bg-slate-100 px-6 py-3 rounded-full shadow-lg transition-all hover:scale-105"
                >
                  <span>Submit a Live Ticket</span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white bg-primary hover:bg-primary-deep border border-primary-deep px-6 py-3 rounded-full transition-all hover:bg-primary-deep/80"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Open Agent Dashboard</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
