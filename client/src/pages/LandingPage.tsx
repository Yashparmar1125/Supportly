import React from 'react';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { HowItWorks } from '../components/landing/HowItWorks';
import { Testimonials } from '../components/landing/Testimonials';
import { CtaBanner } from '../components/landing/CtaBanner';
import { Footer } from '../components/landing/Footer';
import { Logo } from '../components/ui/Logo';
import { Link } from 'react-router';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-canvas flex flex-col font-sans">
      {/* Top Floating Navbar */}
      <nav className="absolute top-0 w-full z-50 border-b border-white/10 bg-ink/40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <Logo light />
          <div className="flex items-center gap-6">
            <a href="#features" className="text-white/80 hover:text-white text-sm font-medium transition-colors hidden sm:block">
              Features
            </a>
            <Link
              to="/login"
              className="text-white font-semibold text-sm hover:bg-white/15 px-4 py-2 rounded-md transition-all border border-white/20"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Sections */}
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CtaBanner />
      </main>

      <Footer />
    </div>
  );
};