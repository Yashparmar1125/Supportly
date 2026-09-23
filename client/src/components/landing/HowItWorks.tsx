import React from 'react';
import { Filter, Brain, ThumbsUp } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Receive & Organize',
      desc: 'Tickets are received from email, web portal, chat, and API. AI extracts intent, urgency, and customer sentiment instantly.',
      badgeIcon: <Filter className="w-4 h-4 text-primary shrink-0" />,
      badgeText: 'Multi-channel support',
    },
    {
      num: '02',
      title: 'Track & Co-Pilot',
      desc: 'Smart rules assign tickets to specialized squad agents. The co-pilot produces verified draft answers and actions awaiting one-click approval.',
      badgeIcon: <Brain className="w-4 h-4 text-primary shrink-0" />,
      badgeText: '1-click agent review & reply',
    },
    {
      num: '03',
      title: 'Resolve & Learn',
      desc: "Inquiries close with custom CSAT surveys. Every resolution automatically enriches your team's private knowledge repository for future accuracy.",
      badgeIcon: <ThumbsUp className="w-4 h-4 text-emerald-600 shrink-0" />,
      badgeText: 'Continuous self-improving loop',
    },
  ];

  return (
    <section className="w-full bg-[#f0f4ff] py-24 border-y border-line" id="how-it-works">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-white text-primary font-mono text-xs uppercase tracking-wider font-bold mb-3 border border-primary/20 shadow-sm">
            PROCESS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-3">
            How Supportly works
          </h2>
          <p className="text-base sm:text-lg text-ink/70">
            From first customer message to joyful resolution in three easy steps.
          </p>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-card p-8 rounded-2xl shadow-sm border border-line/80 relative flex flex-col gap-5 justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="w-11 h-11 rounded-full bg-primary text-white font-extrabold flex items-center justify-center text-lg mb-6 shadow-md">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-ink mb-2">{step.title}</h3>
                <p className="text-sm text-ink/70 leading-relaxed">{step.desc}</p>
              </div>

              <div className="mt-4 p-3 bg-canvas border border-line rounded-xl flex items-center gap-2.5">
                {step.badgeIcon}
                <span className="text-xs font-semibold text-ink">{step.badgeText}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};