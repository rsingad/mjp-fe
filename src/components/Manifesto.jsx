import { useState } from 'react';
import { DEMANDS } from '../data/partyData';

export default function Manifesto() {
  // Har demand ke liye interactive upvote/support state
  const [votes, setVotes] = useState({ 0: 1420, 1: 980, 2: 2150, 3: 3410, 4: 1890 });
  const [voted, setVoted] = useState({});

  const handleVote = (index) => {
    if (voted[index]) return;
    setVotes((prev) => ({ ...prev, [index]: (prev[index] || 0) + 1 }));
    setVoted((prev) => ({ ...prev, [index]: true }));
  };

  const categories = [
    'JUDICIAL REFORM',
    'CIVIL RIGHTS',
    'STUDENT ACTIVISM',
    'DIGITAL AZADI',
    'FREE SPEECH',
  ];

  return (
    <section id="manifesto" className="py-24 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 mb-3 bg-primary/10 border border-primary/25 px-3.5 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
            5 Core Resolutions
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight">
          HAMARA{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            MANIFESTO
          </span>
        </h2>
        <p className="text-text-muted text-sm md:text-base mt-3 max-w-xl mx-auto">
          Makkhi ki 5 zaroori demands — satire ke roop mein, lekin baat 100% loktantrik haq ki hai!
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEMANDS.map((item, index) => {
          const isVoted = voted[index];
          const isWide = index === 4; // 5th card spans 2 columns on tablet/desktop for balance

          return (
            <div
              key={index}
              className={`group relative bg-bg-card border border-border-subtle hover:border-primary/40 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 flex flex-col justify-between overflow-hidden ${
                isWide ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Background ambient light */}
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all pointer-events-none" />

              <div>
                {/* Meta Top: Category Pill + Number */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-mono tracking-wider font-bold text-text-dim uppercase bg-bg-surface border border-border-subtle px-2.5 py-1 rounded-md">
                    {categories[index] || 'MJP RESOLUTION'}
                  </span>
                  <span className="font-mono text-2xl font-black text-text-dim/60 group-hover:text-primary transition-colors">
                    0{index + 1}
                  </span>
                </div>

                {/* Icon & Title */}
                <div className="flex items-start gap-3.5 mb-3">
                  <span className="text-3xl bg-bg-surface p-2.5 rounded-xl border border-border-subtle shrink-0 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <h3 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors leading-snug pt-1">
                    {item.title}
                  </h3>
                </div>

                {/* Desc */}
                <p className="text-text-muted text-sm leading-relaxed mt-2">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Interactive Bar */}
              <div className="mt-8 pt-4 border-t border-border-subtle/60 flex items-center justify-between">
                <span className="text-xs text-text-dim font-mono">
                  {(votes[index] || 1200).toLocaleString('en-IN')} Makkhi Supported
                </span>

                <button
                  type="button"
                  onClick={() => handleVote(index)}
                  disabled={isVoted}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition active:scale-95 cursor-pointer ${
                    isVoted
                      ? 'bg-status-success/20 text-status-success border border-status-success/40'
                      : 'bg-bg-surface hover:bg-primary hover:text-bg-base border border-border-subtle text-text-muted'
                  }`}
                >
                  <span>{isVoted ? '✅' : '✊'}</span>
                  <span>{isVoted ? 'Samarthan Diya' : 'Samarthan Do'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}