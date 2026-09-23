import React from 'react';
import { Logo } from '../ui/Logo';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, User as UserIcon, Ticket, ExternalLink, ShieldCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isTicketsActive = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/tickets');

  return (
    <nav className="border-b border-line bg-card/90 backdrop-blur-md sticky top-0 z-40 shadow-[0_1px_6px_rgba(0,0,0,0.03)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand + Section Links */}
        <div className="flex items-center gap-6">
          <Logo />
          <div className="flex items-center gap-2">
            <Link
              to="/dashboard"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isTicketsActive
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-ink/65 hover:text-ink hover:bg-canvas'
              }`}
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>Tickets</span>
            </Link>
          </div>
        </div>

        {/* Right: Environment Info + User Controls */}
        <div className="flex items-center gap-3">
          <Link
            to="/submit-ticket"
            target="_blank"
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-ink/65 hover:text-primary px-2.5 py-1.5 rounded-lg hover:bg-canvas transition-colors"
            title="Open customer-facing portal"
          >
            <span>Public Portal</span>
            <ExternalLink className="w-3 h-3 text-ink/40" />
          </Link>

          {/* User Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-canvas border border-line text-xs">
            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
              <UserIcon className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-ink max-w-[140px] truncate sm:max-w-none">
                {user?.username || 'admin'}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-indigo-50 text-[10px] font-mono font-bold text-primary border border-primary/20">
                <ShieldCheck className="w-2.5 h-2.5" />
                ADMIN
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-ink/60 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
            title="Log out of agent session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};