import React from 'react';

export const HowItWorks: React.FC = () => {
  const steps = [
    { num: '1', title: 'Create', desc: 'Customers submit tickets easily through any channel.' },
    { num: '2', title: 'Track', desc: 'Your team manages everything in one unified inbox.' },
    { num: '3', title: 'Resolve', desc: 'Close tickets faster with AI suggestions and automation.' },
  ];

  return (
    <section className="py-24 bg-card px-4 border-y border-line">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-ink mb-4">How Supportly works</h2>
        </div>
        <div className="flex flex-col md:flex-row items-start justify-center gap-8 relative">
          {steps.map((step, i) => (
            <div key={i} className="flex-1 text-center relative z-10">
              <div className="w-16 h-16 bg-primary text-white text-2xl font-bold rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-card">
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-ink mb-2">{step.title}</h3>
              <p className="text-ink/70">{step.desc}</p>
            </div>
          ))}
          {/* Connecting line */}
          <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-[2px] bg-line z-0"></div>
        </div>
      </div>
    </section>
  );
};