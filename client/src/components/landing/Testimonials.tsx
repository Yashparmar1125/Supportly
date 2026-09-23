import React from 'react';

export const Testimonials: React.FC = () => {
  const reviews = [
    { text: "Supportly changed how we handle customer requests. We're 3x faster.", author: "Sarah J.", role: "Head of Support" },
    { text: "The AI suggestions are surprisingly accurate. It's like magic.", author: "Mike T.", role: "Founding Engineer" },
    { text: "Clean, fast, and easy to use. Our team loves it.", author: "Elena R.", role: "Customer Success" },
  ];

  return (
    <section className="py-24 bg-canvas px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-ink mb-16">Loved by modern teams</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-card p-8 rounded-xl shadow-card border border-line">
              <div className="flex text-yellow-400 mb-4 text-xl">★★★★★</div>
              <p className="text-ink/80 font-medium mb-6 text-lg">"{r.text}"</p>
              <div>
                <div className="font-bold text-ink">{r.author}</div>
                <div className="text-sm text-ink/60">{r.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};