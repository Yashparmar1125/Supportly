import React from 'react';
import { Link } from 'react-router';
import { Logo } from '../components/ui/Logo';
import { LayoutDashboard, ArrowLeft, LifeBuoy, FileQuestion } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-between selection:bg-primary/10 selection:text-primary">
      {/* Top Simple Header */}
      <header className="border-b border-line bg-card/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Logo />
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink/70 hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </header>

      {/* Main 404 Mockup Frame Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-lg w-full">
          {/* Supportly Window Frame */}
          <div className="border border-line rounded-2xl overflow-hidden bg-card shadow-[0_24px_60px_-24px_rgba(26,26,46,0.22)]">
            {/* macOS Chrome Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-line bg-canvas/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
              </div>
              <span className="font-mono text-[11px] text-ink/40 tracking-wider font-medium">
                404_NOT_FOUND.tsx
              </span>
              <div className="w-10" />
            </div>

            {/* Card Body */}
            <div className="p-8 text-center sm:p-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-50 border border-primary/20 text-primary mb-6 shadow-xs">
                <FileQuestion className="w-7 h-7" />
              </div>

              <div className="inline-block px-2.5 py-0.5 mb-3 rounded-full bg-indigo-50 border border-primary/20 text-[11px] font-mono font-bold text-primary">
                HTTP 404 ERROR
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-3">
                Ticket or Page Not Found
              </h1>

              <p className="text-sm text-ink/65 leading-relaxed mb-8 max-w-sm mx-auto">
                The resource or ticket identifier you navigated to does not exist, has been relocated, or is no longer accessible.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-deep text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Return to Tickets</span>
                </Link>

                <Link
                  to="/submit-ticket"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-card hover:bg-canvas border border-line text-ink text-xs font-bold transition-all cursor-pointer"
                >
                  <LifeBuoy className="w-4 h-4 text-ink/50" />
                  <span>Public Support Portal</span>
                </Link>
              </div>
            </div>

            {/* Card Footer Telemetry */}
            <div className="px-6 py-3 border-t border-line/60 bg-canvas/40 flex items-center justify-between text-[11px] font-mono text-ink/40">
              <span>Supportly CRM v1.1.4</span>
              <span>Autonomous Route Guard</span>
            </div>
          </div>
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="text-center py-6 text-xs text-ink/40">
        © {new Date().getFullYear()} Supportly Technologies Inc. All rights reserved.
      </footer>
    </div>
  );
};
