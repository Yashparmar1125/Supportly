import React from 'react';

export const MetricsStrip: React.FC = () => {
  const metrics = [
    {
      value: '3x',
      badge: 'Faster',
      title: 'MTTR Acceleration',
      desc: 'Mean time to resolution reduced across Tier 1 & 2 tickets.',
    },
    {
      value: '68%',
      badge: 'Autonomous',
      title: 'Autonomous Resolution',
      desc: 'Inquiries fully answered via verified knowledge base embeddings.',
    },
    {
      value: '99.4%',
      badge: 'Top Quartile',
      title: 'CSAT Satisfaction',
      desc: 'Customer ratings verified on post-ticket resolution surveys.',
    },
    {
      value: '< 45s',
      badge: 'Realtime',
      title: 'First Response Time',
      desc: 'Instant triage and intelligent routing under one minute guaranteed.',
    },
  ];

  return (
    <section className="w-full bg-[#f0f4ff] py-16 border-y border-line">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="flex flex-col gap-1 p-6 rounded-2xl bg-card shadow-sm border border-line/60 hover:shadow-md transition-shadow"
            >
              <div className="flex items-baseline gap-2.5">
                <span className="text-4xl lg:text-[44px] font-extrabold text-primary tracking-tight">
                  {m.value}
                </span>
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                  {m.badge}
                </span>
              </div>
              <p className="text-base font-bold text-ink mt-1">{m.title}</p>
              <p className="text-xs text-ink/65 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
