import React from 'react';
import { Link } from 'react-router';
import {
  ArrowRight,
  PlayCircle,
  Star,
  Lock,
  SlidersHorizontal,
  Plus,
  Search,
  Sparkles,
  Cpu,
} from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full bg-[#0d0f1d] text-white overflow-hidden pt-28 pb-20">
      {/* Atmospheric Ambient Glows */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[880px] h-[520px] bg-primary/25 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -right-24 w-[480px] h-[480px] bg-purple-600/20 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Announcement Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1b1e36] border border-white/10 shadow-sm mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs uppercase tracking-wider text-indigo-200 font-semibold font-mono">
            Next-Gen Customer Support Ticketing
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl mb-4 leading-[1.12]">
          Customer support that{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-[#8a7dff] to-purple-300">
            actually supports.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Streamline tickets, resolve inquiries 3x faster, and delight every customer with an AI-assisted CRM designed for modern high-growth teams.
        </p>

        {/* CTA Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-6">
          <Link
            to="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-deep text-white font-bold text-sm px-6 py-3.5 rounded-lg shadow-[0_4px_22px_rgba(91,80,238,0.45)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold text-sm px-6 py-3.5 rounded-lg backdrop-blur-md transition-colors cursor-pointer border border-white/10"
          >
            <PlayCircle className="w-4 h-4 text-indigo-300" />
            <span>See how it works</span>
          </a>
        </div>

        {/* Social Proof Stars */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 mb-12">
          <div className="flex items-center gap-0.5 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            <strong className="font-semibold text-white">4.9/5</strong> rating from 2,000+ support leaders across high-growth startups
          </p>
        </div>

        {/* Desktop App Preview Interactive Mockup */}
        <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.65)] bg-card text-ink text-left border border-white/10">
          {/* macOS Style Header Bar */}
          <div className="bg-[#1e2338] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>

            {/* Chrome Address Bar */}
            <div className="flex items-center gap-2 bg-[#121526] px-4 py-1.5 rounded-md text-xs font-mono text-slate-300 border border-white/5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="tracking-tight text-slate-300">app.supportly.com/inbox</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-primary/20 text-indigo-300 text-xs font-mono font-semibold flex items-center gap-1.5 border border-primary/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live CRM
              </span>
            </div>
          </div>

          {/* CRM Internal Workspace */}
          <div className="p-5 sm:p-6 bg-white">
            {/* CRM Title & Primary Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-lg sm:text-xl font-bold text-ink">Support tickets</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#eef2ff] text-primary text-xs font-bold">
                    18 active
                  </span>
                </div>
                <p className="text-xs text-ink/60 mt-0.5">
                  Manage customer conversations and active triage across all inbound channels
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 bg-canvas hover:bg-line/60 text-ink text-xs font-bold px-3 py-2 rounded-lg border border-line transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Filters</span>
                </button>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-deep text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-sm transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New ticket</span>
                </Link>
              </div>
            </div>

            {/* Filter Tabs & Quick Search Bar */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 my-4">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 text-xs font-semibold">
                <button className="px-3 py-1.5 rounded-lg bg-primary text-white whitespace-nowrap">
                  All (18)
                </button>
                <button className="px-3 py-1.5 rounded-lg text-ink/70 hover:bg-canvas whitespace-nowrap">
                  Open (4)
                </button>
                <button className="px-3 py-1.5 rounded-lg text-ink/70 hover:bg-canvas whitespace-nowrap">
                  In Progress (2)
                </button>
                <button className="px-3 py-1.5 rounded-lg text-purple-700 bg-purple-50 hover:bg-purple-100 whitespace-nowrap flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>AI Drafted (5)</span>
                </button>
                <button className="px-3 py-1.5 rounded-lg text-ink/70 hover:bg-canvas whitespace-nowrap">
                  Resolved (12)
                </button>
              </div>

              {/* Search Field */}
              <div className="relative w-full lg:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
                <input
                  type="text"
                  readOnly
                  value="billing inquiry"
                  className="w-full bg-canvas text-ink text-xs pl-9 pr-3 py-2 rounded-lg border border-line focus:outline-none"
                  placeholder="Search tickets, tags, users..."
                />
              </div>
            </div>

            {/* CRM Tickets Table */}
            <div className="overflow-x-auto border border-line rounded-xl shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-canvas text-ink/50 font-bold border-b border-line text-[11px] uppercase tracking-wider">
                    <th className="py-2.5 px-4 font-semibold">TICKET ID</th>
                    <th className="py-2.5 px-4 font-semibold">SUBJECT &amp; CUSTOMER</th>
                    <th className="py-2.5 px-4 font-semibold">PRIORITY</th>
                    <th className="py-2.5 px-4 font-semibold">ASSIGNEE</th>
                    <th className="py-2.5 px-4 font-semibold">STATUS</th>
                    <th className="py-2.5 px-4 font-semibold text-right">ACTIVITY</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-[13px]">
                  {/* Row 1: AI Resolving */}
                  <tr className="hover:bg-canvas/70 transition-colors">
                    <td className="py-3 px-4 font-mono text-primary font-bold text-xs">TKT-1082</td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-ink text-xs sm:text-sm">Webhook delivery failed with 504 gateway timeout</p>
                      <p className="text-ink/50 text-[11px] truncate max-w-xs">David Miller · Stripe integration endpoint</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[11px] font-bold">
                        Urgent
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-[10px] flex items-center justify-center">
                          AI
                        </div>
                        <span className="text-xs text-ink font-medium">Copilot Bot</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 text-[11px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
                        AI Resolving
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-ink/50 text-xs font-mono">2m ago</td>
                  </tr>

                  {/* Row 2: In Progress */}
                  <tr className="hover:bg-canvas/70 transition-colors">
                    <td className="py-3 px-4 font-mono text-primary font-bold text-xs">TKT-1079</td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-ink text-xs sm:text-sm">Request for custom SOC2 Type II compliance audit packet</p>
                      <p className="text-ink/50 text-[11px] truncate max-w-xs">Sarah Chen · Enterprise Security Lead</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                        High
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 text-primary font-bold text-[10px] flex items-center justify-center">
                          MJ
                        </div>
                        <span className="text-xs text-ink font-medium">Marcus J.</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                        In Progress
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-ink/50 text-xs font-mono">14m ago</td>
                  </tr>

                  {/* Row 3: Resolved */}
                  <tr className="hover:bg-canvas/70 transition-colors">
                    <td className="py-3 px-4 font-mono text-primary font-bold text-xs">TKT-1074</td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-ink text-xs sm:text-sm">Upgraded seat allocation to 50 agent enterprise tier</p>
                      <p className="text-ink/50 text-[11px] truncate max-w-xs">Alex Rivera · Billing Administrator</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
                        Normal
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                          ER
                        </div>
                        <span className="text-xs text-ink font-medium">Elena R.</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        Resolved
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-ink/50 text-xs font-mono">1h ago</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bottom Live Automation Banner inside CRM */}
            <div className="mt-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100/80 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-ink">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary shrink-0" />
                <p className="text-xs font-medium">
                  <strong>Auto-Pilot Assist:</strong> 34 inquiries resolved automatically today without human intervention (89% accuracy).
                </p>
              </div>
              <span className="text-xs text-primary font-bold hover:underline shrink-0">
                View telemetry →
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};