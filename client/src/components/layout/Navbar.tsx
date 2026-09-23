import React, { useState, useRef, useEffect } from 'react';
import { Logo } from '../ui/Logo';
import { useAuth } from '../../hooks/useAuth';
import {
  LogOut,
  User as UserIcon,
  Ticket,
  ExternalLink,
  ShieldCheck,
  ChevronDown,
  Plus,
  LayoutDashboard,
  Database,
} from 'lucide-react';
import { Link, useLocation } from 'react-router';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isTicketsActive =
    location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/tickets');

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="border-b border-line bg-card/90 backdrop-blur-md sticky top-0 z-40 shadow-[0_1px_6px_rgba(0,0,0,0.03)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand + Active Section Link */}
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

        {/* Right: User Profile Accordion / Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-canvas hover:bg-card border border-line text-xs transition-all cursor-pointer shadow-2xs hover:shadow-xs group"
            aria-expanded={isOpen}
          >
            {/* Avatar Circle */}
            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
              <UserIcon className="w-3.5 h-3.5" />
            </div>

            {/* Username & Role Pill */}
            <div className="flex items-center gap-1.5 text-left">
              <span className="font-bold text-ink max-w-[130px] sm:max-w-[200px] truncate">
                {user?.username || 'admin'}
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-indigo-50 text-[10px] font-mono font-bold text-primary border border-primary/20">
                <ShieldCheck className="w-2.5 h-2.5" />
                {user?.role?.toUpperCase() || 'ADMIN'}
              </span>
            </div>

            {/* Caret / Accordion Indicator */}
            <ChevronDown
              className={`w-3.5 h-3.5 text-ink/40 group-hover:text-ink transition-transform duration-200 ${
                isOpen ? 'rotate-180 text-primary' : ''
              }`}
            />
          </button>

          {/* Accordion / Dropdown Menu Panel */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-card rounded-2xl shadow-xl border border-line overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              {/* Profile Header */}
              <div className="p-4 bg-canvas/70 border-b border-line">
                <p className="text-xs font-bold text-ink truncate">{user?.username}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] text-ink/60 font-medium capitalize">
                    {user?.role || 'Administrator'}
                  </span>
                  <span className="text-ink/30">·</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Neon Live
                  </span>
                </div>
              </div>

              {/* Navigation & Action Links */}
              <div className="p-2 space-y-1 text-xs">
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-ink/80 hover:text-ink hover:bg-canvas transition-colors font-semibold"
                >
                  <LayoutDashboard className="w-4 h-4 text-ink/40" />
                  <span>Support Tickets</span>
                </Link>

                <Link
                  to="/tickets/new"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-ink/80 hover:text-ink hover:bg-canvas transition-colors font-semibold"
                >
                  <Plus className="w-4 h-4 text-ink/40" />
                  <span>Create New Ticket</span>
                </Link>

                <Link
                  to="/submit-ticket"
                  target="_blank"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-ink/80 hover:text-ink hover:bg-canvas transition-colors font-semibold"
                >
                  <div className="flex items-center gap-2.5">
                    <ExternalLink className="w-4 h-4 text-ink/40" />
                    <span>Public Customer Portal</span>
                  </div>
                  <span className="text-[10px] text-ink/40 font-mono">↗</span>
                </Link>
              </div>

              {/* Database Status Footer */}
              <div className="px-4 py-2 bg-canvas/30 border-t border-line flex items-center justify-between text-[11px] text-ink/50">
                <div className="flex items-center gap-1.5">
                  <Database className="w-3 h-3 text-ink/40" />
                  <span>PostgreSQL Pool</span>
                </div>
                <span className="font-mono text-[10px]">v16.2</span>
              </div>

              {/* Sign Out Action */}
              <div className="p-2 border-t border-line bg-card">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span>Sign out of session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};