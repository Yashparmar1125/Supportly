import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const CtaBanner: React.FC = () => {
  return (
    <section className="py-20 bg-primary text-white text-center px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Ready to streamline your support?
        </h2>
        <p className="text-white/80 max-w-xl mx-auto text-base sm:text-lg mb-8 leading-relaxed">
          Join high-performing teams resolving tickets faster with Supportly's AI-assisted CRM.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link to="/login" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-white text-primary font-bold text-[15px] rounded-md px-8 py-3.5 hover:bg-canvas transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer">
              Start Free Today <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>Free 30-day trial</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>Setup in 2 minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
};
