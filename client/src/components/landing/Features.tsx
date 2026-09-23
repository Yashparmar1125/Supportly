import React from 'react';
import { Ticket, Search, Sparkles } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Ticket className="w-6 h-6 text-primary" />,
      title: 'Smart Ticketing',
      desc: 'Organize and route tickets automatically so your team can focus on resolving issues, not sorting them.'
    },
    {
      icon: <Search className="w-6 h-6 text-primary" />,
      title: 'Instant Search',
      desc: 'Find any customer, ticket, or conversation instantly with our blazing fast search capabilities.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      title: 'AI-Powered Replies',
      desc: 'Draft perfect responses in seconds. Our AI suggests context-aware replies based on your ticket history.'
    }
  ];

  return (
    <section id="features" className="py-24 bg-canvas px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-ink mb-4">Everything you need to support your customers</h2>
          <p className="text-ink/60 max-w-2xl mx-auto">Powerful features designed to help your team work faster and smarter.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-card p-8 rounded-xl shadow-lg border border-line">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-ink mb-3">{f.title}</h3>
              <p className="text-ink/70 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};