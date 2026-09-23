import React from 'react';
import { Link } from 'react-router';
import { StatusBadge } from '../ui/StatusBadge';
import { Search, Plus } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-[#1A1A2E] to-[#252542] pt-32 pb-24 px-4 text-center text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-semibold tracking-wide uppercase mb-8 border border-white/10 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-status-closed animate-pulse" />
          Next-Gen Customer Support Ticketing
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.08] text-white">
          Customer support that <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-300 to-purple-400">
            actually supports.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-white/75 mb-10 max-w-2xl mx-auto font-normal leading-relaxed">
          Streamline tickets, resolve inquiries 3x faster, and delight every customer with an AI-assisted CRM designed for modern teams.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/login" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-primary text-white font-bold text-[15px] rounded-md px-8 py-3.5 hover:bg-primary-deep transition-all shadow-lg hover:shadow-primary/30 cursor-pointer">
              Get Started Free →
            </button>
          </Link>
          <a href="#features" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-white/10 border border-white/20 text-white font-bold text-[15px] rounded-md px-8 py-3.5 hover:bg-white/20 transition-all backdrop-blur-sm cursor-pointer">
              See how it works
            </button>
          </a>
        </div>
      </div>

      {/* Interactive App Mockup Preview */}
      <div className="mt-16 max-w-4xl mx-auto relative z-10">
        <div className="bg-card rounded-2xl shadow-[0_30px_90px_-20px_rgba(0,0,0,0.45)] border border-line text-left overflow-hidden">
          {/* Mock Window Chrome */}
          <div className="bg-canvas border-b border-line px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-400/80 inline-block" />
              <span className="ml-3 text-xs font-mono text-ink/40">app.supportly.com/dashboard</span>
            </div>
            <div className="text-xs font-semibold text-ink/50 bg-line/60 px-2 py-0.5 rounded">
              Demo Preview
            </div>
          </div>

          {/* Mock Dashboard Content */}
          <div className="p-6 bg-canvas space-y-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-xl font-bold text-ink">Support tickets</h3>
                <p className="text-xs text-ink/50">Manage customer conversations and issue resolution</p>
              </div>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-md pointer-events-none">
                <Plus className="w-3.5 h-3.5" /> New ticket
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card p-3 rounded-lg border border-line">
              <div className="flex items-center gap-2 w-full sm:w-auto text-ink/40 text-xs">
                <Search className="w-4 h-4" />
                <span className="text-ink/40">Search tickets by ID, name, email...</span>
              </div>
              <div className="flex gap-1.5">
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-ink text-white">All</span>
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full text-ink/70 hover:bg-canvas">Open</span>
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full text-ink/70 hover:bg-canvas">In Progress</span>
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full text-ink/70 hover:bg-canvas">Closed</span>
              </div>
            </div>

            {/* Mock Ticket Table matching design system */}
            <div className="border border-line rounded-xl overflow-hidden shadow-card bg-card">
              <div className="grid grid-cols-[74px_1fr_110px_70px] gap-2.5 items-center px-4 py-2.5 text-[11px] font-bold text-ink/45 border-b border-line uppercase tracking-wider bg-canvas">
                <div>ID</div>
                <div>Subject</div>
                <div>Status</div>
                <div className="text-right">Date</div>
              </div>
              <div className="divide-y divide-line text-[13px]">
                <div className="grid grid-cols-[74px_1fr_110px_70px] gap-2.5 items-center px-4 py-3.5 hover:bg-canvas/60 transition-colors">
                  <span className="font-mono text-[11.5px] text-ink/60">TKT-014</span>
                  <span className="font-medium text-ink truncate">Payment failed on renewal charge</span>
                  <div><StatusBadge status="Open" /></div>
                  <span className="text-xs text-ink/50 text-right">Sep 23</span>
                </div>
                <div className="grid grid-cols-[74px_1fr_110px_70px] gap-2.5 items-center px-4 py-3.5 hover:bg-canvas/60 transition-colors">
                  <span className="font-mono text-[11.5px] text-ink/60">TKT-013</span>
                  <span className="font-medium text-ink truncate">Can't reset password on mobile</span>
                  <div><StatusBadge status="In Progress" /></div>
                  <span className="text-xs text-ink/50 text-right">Sep 22</span>
                </div>
                <div className="grid grid-cols-[74px_1fr_110px_70px] gap-2.5 items-center px-4 py-3.5 hover:bg-canvas/60 transition-colors">
                  <span className="font-mono text-[11.5px] text-ink/60">TKT-012</span>
                  <span className="font-medium text-ink truncate">Refund request for double subscription</span>
                  <div><StatusBadge status="Closed" /></div>
                  <span className="text-xs text-ink/50 text-right">Sep 20</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};