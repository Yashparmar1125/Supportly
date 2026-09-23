import React from 'react';
import {
  Ticket,
  Zap,
  Bot,
  ArrowRight,
  CheckCircle2,
  Brain,
  ShieldCheck,
  Lock,
  Sliders,
} from 'lucide-react';

export const Features: React.FC = () => {
  return (
    <section className="w-full bg-background py-24" id="features">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-[#eef2ff] text-primary font-mono text-xs uppercase tracking-wider font-bold mb-3 border border-primary/20">
            CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-3">
            Everything you need to support your customers
          </h2>
          <p className="text-base sm:text-lg text-ink/70">
            Powerful tools designed to help modern support teams collaborate smoothly and delight users at scale.
          </p>
        </div>

        {/* 3-Column Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1: Smart Ticketing */}
          <div className="bg-card p-8 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-line group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#eef2ff] flex items-center justify-center text-primary mb-6 group-hover:scale-105 transition-transform border border-primary/10">
                <Ticket className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-ink mb-2">Smart Ticketing</h3>
              <p className="text-sm text-ink/70 mb-6 leading-relaxed">
                Automated routing, SLA countdown indicators, priority queues, and omnichannel unified communication in one lightning-fast pane.
              </p>
              <div className="p-4 bg-canvas rounded-xl mb-6 border border-line">
                <div className="flex items-center justify-between text-xs font-semibold text-ink">
                  <span>Enterprise SLA Target</span>
                  <span className="text-primary font-bold">15m remaining</span>
                </div>
                <div className="w-full bg-line h-1.5 rounded-full mt-2.5 overflow-hidden">
                  <div className="bg-primary h-full rounded-full w-4/5" />
                </div>
              </div>
            </div>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-1.5 text-sm text-primary font-bold group-hover:gap-2.5 transition-all"
            >
              <span>Explore routing logic</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Feature 2: Instant Search */}
          <div className="bg-card p-8 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-line group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-700 mb-6 group-hover:scale-105 transition-transform border border-purple-200/50">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-ink mb-2">Instant Search</h3>
              <p className="text-sm text-ink/70 mb-6 leading-relaxed">
                Lightning-fast semantic retrieval across tickets, user history, product documentation, and Git commits in under 50 milliseconds.
              </p>
              <div className="p-4 bg-canvas rounded-xl mb-6 space-y-2 border border-line text-xs font-medium text-ink/75">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Vectorized Knowledge Index</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Fuzzy typo tolerance builtin</span>
                </div>
              </div>
            </div>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-1.5 text-sm text-primary font-bold group-hover:gap-2.5 transition-all"
            >
              <span>See search benchmarks</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Feature 3: AI-Powered Replies */}
          <div className="bg-card p-8 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-line group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-primary mb-6 group-hover:scale-105 transition-transform border border-indigo-200/50">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-ink mb-2">AI-Powered Replies</h3>
              <p className="text-sm text-ink/70 mb-6 leading-relaxed">
                Context-aware drafts referencing previous high-satisfaction resolutions and internal knowledge bases with 98% factual precision.
              </p>
              <div className="p-4 bg-purple-50/80 rounded-xl mb-6 border-l-3 border-purple-600 border border-line">
                <span className="text-[11px] font-mono text-purple-700 font-bold block mb-1">
                  SUGGESTED RESPONSE (94% CONFIDENCE)
                </span>
                <p className="text-xs text-purple-950 italic line-clamp-2">
                  "Hi Sarah, I reviewed your webhook endpoint settings and refreshed the secret token..."
                </p>
              </div>
            </div>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-1.5 text-sm text-primary font-bold group-hover:gap-2.5 transition-all"
            >
              <span>Preview AI co-pilot</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Human + AI Symphony Spotlight Banner */}
        <div className="w-full bg-[#121424] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-white/10">
          <div className="absolute right-0 top-0 w-96 h-96 bg-primary/20 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/30 text-indigo-300 font-mono text-xs w-max font-bold border border-primary/40">
                <Brain className="w-3.5 h-3.5" />
                HUMAN + AI SYMPHONY
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                Empower agents, don't replace them
              </h3>
              <p className="text-base text-slate-300 max-w-xl leading-relaxed">
                Supportly seamlessly surfaces relevant customer context, account history, and one-click actions before an agent even begins typing. It gives superpowers to your support team.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Zero Hallucination Guardrails</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>SOC2 &amp; HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-emerald-400" />
                  <span>Adjustable Autonomy Levels</span>
                </div>
              </div>
            </div>

            {/* Co-Pilot Assist Drawer Mockup */}
            <div className="lg:col-span-5 bg-[#1a1e33] p-5 rounded-2xl shadow-xl border border-white/10">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3.5">
                <span className="text-xs font-bold text-indigo-300">Co-Pilot Assist Drawer</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Live Context
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="bg-[#121424] p-3 rounded-xl border border-white/5">
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1.5 font-medium">
                    <span>Sentiment score</span>
                    <span className="text-amber-400 font-bold">Neutral → Positive</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full w-3/4" />
                  </div>
                </div>
                <div className="bg-[#121424] p-3 rounded-xl flex items-center justify-between border border-white/5">
                  <span className="text-slate-300">Auto-classify ticket type</span>
                  <span className="text-indigo-300 font-bold">API / Billing</span>
                </div>
                <div className="bg-[#121424] p-3 rounded-xl border border-white/5">
                  <span className="text-[11px] text-slate-400 block mb-1">Detected knowledge doc</span>
                  <p className="text-indigo-300 font-medium hover:underline cursor-pointer">
                    docs.supportly.com/webhooks/retry-policies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};