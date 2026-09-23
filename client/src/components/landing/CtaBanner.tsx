import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, Rocket, Check } from 'lucide-react';

export const CtaBanner: React.FC = () => {
  return (
    <section className="w-full bg-[#0d0f1d] py-24 text-white relative overflow-hidden">
      {/* Ambient Radial Halos */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/30 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e2338] border border-white/10 mb-6">
          <Rocket className="w-4 h-4 text-emerald-400" />
          <span className="font-mono text-xs text-indigo-300 uppercase tracking-wider font-semibold">
            Scale your team without scaling headache
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl mb-4 leading-tight">
          Ready to streamline your support?
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mb-8 leading-relaxed">
          Join 2,000+ high-performing teams resolving tickets faster with Supportly's AI-assisted CRM.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 w-full sm:w-auto">
          <Link
            to="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-ink font-bold text-sm px-8 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Start Free Today</span>
            <ArrowRight className="w-4 h-4 text-ink" />
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold text-sm px-6 py-4 rounded-xl backdrop-blur-md transition-colors border border-white/10 cursor-pointer"
          >
            <span>Compare Features</span>
          </a>
        </div>

        {/* Reassurance Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-300 font-medium">
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
            <span>Free 14-day full access trial</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
            <span>Instant setup in under 2 minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
};
