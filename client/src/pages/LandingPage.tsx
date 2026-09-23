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
import { User as UserIcon } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-canvas flex flex-col font-sans">
      {/* Sticky High-End Top Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-xl border-b border-line shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-10">
            <Logo />
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-ink/75">
              <a href="#features" className="hover:text-primary transition-colors font-semibold">Features</a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center text-sm font-semibold text-ink/80 hover:text-primary px-3 py-1.5 transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/login"
              className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              title="Agent Login"
            >
              <UserIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Stitch Page Sections */}
      <main className="flex-1 w-full pt-20">
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