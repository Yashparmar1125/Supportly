import React from 'react';
import { Hero } from '../components/landing/Hero';
import { MetricsStrip } from '../components/landing/MetricsStrip';
import { Features } from '../components/landing/Features';
import { HowItWorks } from '../components/landing/HowItWorks';
import { Testimonials } from '../components/landing/Testimonials';
import { CtaBanner } from '../components/landing/CtaBanner';
import { Footer } from '../components/landing/Footer';
import { Logo } from '../components/ui/Logo';
import { Link } from 'react-router';
import { User as UserIcon, LayoutDashboard, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-canvas flex flex-col font-sans">
      {/* Sticky High-End Top Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-line shadow-[0_1px_6px_rgba(0,0,0,0.03)] transition-all">
        <div className="h-16 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <Logo />
            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-ink/70">
              <Link to="/platform" className="hover:text-primary transition-colors">Platform</Link>
              <a href="#features" className="hover:text-primary transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
            </nav>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to="/submit-ticket"
              className="inline-flex items-center justify-center text-xs font-bold text-white bg-primary hover:bg-primary-deep px-4 py-2 rounded-full shadow-[0_3px_12px_rgba(91,80,238,0.25)] transition-all hover:-translate-y-0.5"
            >
              Submit Ticket
            </Link>

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-ink/80 hover:text-ink hover:bg-canvas px-3.5 py-2 rounded-full border border-line transition-all shadow-2xs hover:border-ink/30"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-primary" />
                <span className="hidden sm:inline">Dashboard</span>
                <span className="sm:hidden">App</span>
                <ArrowRight className="w-3 h-3 text-ink/40" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-ink/75 hover:text-ink hover:bg-canvas px-3.5 py-2 rounded-full border border-line transition-all shadow-2xs hover:border-ink/30"
              >
                <UserIcon className="w-3.5 h-3.5 text-primary" />
                <span>Agent Sign in</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Stitch Page Sections */}
      <main className="flex-1 w-full pt-16">
        <Hero />
        <MetricsStrip />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CtaBanner />
      </main>

      <Footer />
    </div>
  );
};