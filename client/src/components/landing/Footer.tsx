import React from 'react';
import { Logo } from '../ui/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#f8f9ff] border-t border-line text-ink">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-12 border-b border-line">
          {/* Brand & Newsletter Column */}
          <div className="col-span-2">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-xs sm:text-sm text-ink/70 max-w-sm mb-6 leading-relaxed">
              Intelligent omnichannel customer support engineered for fast-scaling enterprises and high-velocity product teams.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="max-w-sm">
              <label htmlFor="newsletter-email" className="text-xs font-bold text-ink block mb-2">
                Stay up to date
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your work email"
                  className="flex-1 bg-white border border-line text-ink text-xs px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-deep text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  Join
                </button>
              </div>
            </form>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-2.5 text-xs text-ink/70">
              <li><a href="#features" className="hover:text-primary transition-colors">AI Agent Assist</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Omnichannel Inbox</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Automated Routing</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Knowledge Base</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div>
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider mb-4">Solutions</h3>
            <ul className="space-y-2.5 text-xs text-ink/70">
              <li><a href="#features" className="hover:text-primary transition-colors">Enterprise CRM</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">B2B SaaS</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">E-Commerce</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Fintech Support</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Startups</a></li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2.5 text-xs text-ink/70">
              <li><a href="#features" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Integrations</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">API Reference</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Community</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Guides &amp; Benchmarks</a></li>
            </ul>
          </div>

          {/* Column 5: Company */}
          <div>
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2.5 text-xs text-ink/70">
              <li><a href="#features" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Customers</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Press</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink/60">
          <p>© {new Date().getFullYear()} Supportly Technologies, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              System Status: 99.99%
            </span>
            <a href="#features" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#features" className="hover:text-primary transition-colors">Terms</a>
            <a href="#features" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};