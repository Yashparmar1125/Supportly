import React from 'react';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      stars: 5,
      quote:
        'Supportly cut our initial response time from 38 minutes to 45 seconds. The automated triage accurately routes technical queries to our engineering on-call without annoying false alarms.',
      author: 'Sarah Jenkins',
      role: 'Head of Support at Hyperflow',
      initials: 'SJ',
      avatarBg: 'bg-indigo-100 text-primary',
    },
    {
      stars: 5,
      quote:
        'We evaluated Zendesk and Intercom before settling on Supportly. The speed, keyboard-first shortcuts, and precision AI drafting made it the easiest purchase decision we made this quarter.',
      author: 'Mike Thomsen',
      role: 'Founding Engineer at SyncPoint',
      initials: 'MT',
      avatarBg: 'bg-purple-100 text-purple-700',
    },
    {
      stars: 5,
      quote:
        'Our CSAT jumped from 91% to 99.4% in just two months. Customers repeatedly mention how fast and tailored our support feels now. It literally paid for itself within 20 days.',
      author: 'Elena Rostova',
      role: 'Customer Success Lead at CloudCraft',
      initials: 'ER',
      avatarBg: 'bg-emerald-100 text-emerald-800',
    },
  ];

  return (
    <section className="w-full bg-background py-24">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-[#eef2ff] text-primary font-mono text-xs uppercase tracking-wider font-bold mb-3 border border-primary/20">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-3">
            Loved by modern support teams
          </h2>
          <p className="text-base sm:text-lg text-ink/70">
            See how world-class companies accelerate support resolution without burning out their engineers or agents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-card p-8 rounded-2xl shadow-sm border border-line flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-6">
                  {[...Array(t.stars)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-ink/80 italic mb-8 leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 border-t border-line pt-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${t.avatarBg}`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-ink">{t.author}</p>
                  <p className="text-xs text-ink/60">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};