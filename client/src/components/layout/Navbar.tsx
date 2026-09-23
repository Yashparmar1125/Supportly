import React from 'react';
import { Logo } from '../ui/Logo';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b border-line bg-card sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="hidden sm:flex items-center gap-4 text-sm font-medium text-ink/70">
            <Link to="/dashboard" className="hover:text-primary transition-colors font-semibold text-ink">
              Tickets
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-canvas border border-line">
            <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
              <UserIcon className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-xs text-ink">{user?.username || 'Admin'}</span>
          </div>
          <button
            onClick={logout}
            className="text-ink/60 hover:text-primary flex items-center gap-1.5 transition-colors font-semibold text-xs px-2.5 py-1.5 rounded hover:bg-canvas cursor-pointer"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};