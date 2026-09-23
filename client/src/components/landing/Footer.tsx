import React from 'react';
import { Logo } from '../ui/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-card py-12 px-4 border-t border-line text-center">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center">
        <Logo />
        <p className="text-sm text-ink/60 mt-4 mb-8">Customer support that actually supports.</p>
        <div className="text-xs text-ink/40">
          &copy; {new Date().getFullYear()} Supportly Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};