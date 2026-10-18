import { TIMELINE } from '../data/partyData';

export default function StoryTimeline() {
  const milestoneTags = [
    'SUPREME COURT GENESIS',
    'INTERNET TAKEOVER',
    'MASS MOVEMENT',
    'THE GRAND ALLIANCE',
    'PRESENT DAY & FUTURE',
  ];

  return (
    <section id="kahani" className="py-24 px-4 max-w-4xl mx-auto relative">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 mb-3 bg-primary/10 border border-primary/25 px-3.5 py-1 rounded-full">
          <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
            📜 The Origin Story
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight">
          HAMARI{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            KAHANI
          </span>
        </h2>
        <p className="text-text-muted text-sm md:text-base mt-3 max-w-lg mx-auto">
          Ek adalat ke iconic remark se shuru hokar internet ki sabse badi satirical wave banne tak ka safar.
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative border-l-2 border-border-subtle ml-4 md:ml-32 space-y-12">
        {TIMELINE.map((item, idx) => {
          const isSupreme = item.highlight || idx === 0;

          return (
            <div key={idx} className="relative pl-8 md:pl-10 group">
              {/* Dot / Icon Node */}
              <div
                className={`absolute -left-[17px] top-1.5 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-300 shadow-md ${
                  isSupreme
                    ? 'bg-primary text-bg-base ring-4 ring-primary/20 scale-110 shadow-primary/30'
                    : 'bg-bg-surface border-2 border-border-subtle text-text-muted group-hover:border-primary group-hover:text-primary group-hover:scale-110'
                }`}
              >
                {isSupreme ? '⚖️' : '🪰'}
              </div>

              {/* Story Card */}
              <div
                className={`relative rounded-3xl p-6 md:p-7 transition-all duration-300 border ${
                  isSupreme
                    ? 'bg-bg-card border-primary/40 shadow-xl shadow-primary/5'
                    : 'bg-bg-card/70 border-border-subtle hover:border-primary/30 hover:bg-bg-card'
                }`}
              >
                {/* Header Tag + Date */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase bg-bg-surface border border-border-subtle px-2.5 py-1 rounded-md text-text-dim">
                    {milestoneTags[idx] || `STEP 0${idx + 1}`}
                  </span>
                  <span className="text-xs font-bold text-primary font-mono">
                    {item.date}
                  </span>
                </div>

                {/* Body Text */}
                <p className="text-text-muted text-sm md:text-base leading-relaxed">
                  {item.text}
                </p>

                {/* Special CJI Emphasis if Highlighted */}
                {isSupreme && (
                  <div className="mt-4 pt-4 border-t border-border-subtle/80 flex items-center gap-2 text-xs text-primary font-semibold italic">
                    <span>🔨</span>
                    <span>"Cannot use a hammer to kill a fly!" — Justice Surya Kant</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}