import { useState, useEffect } from 'react';
import { CAMPAIGNS } from '../data/partyData';

export default function CampaignSlider() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const total = CAMPAIGNS.length;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlaying, total]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % total);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);

  const active = CAMPAIGNS[current];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-surface/40 border-y border-border-subtle perspective-1000 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3 bg-primary/10 border border-primary/20 px-3.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase font-bold text-primary">
              3D Holographic Archives
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-main tracking-tight uppercase">
            Relive The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Rebellion</span>
          </h2>
        </div>

        {/* 3D Elevated Card Shell */}
        <div className="bg-bg-card border-2 border-border-subtle rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.8)] preserve-3d transform transition-transform duration-500 hover:rotate-x-1">
          
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px] md:min-h-[500px]">
            
            {/* Left 3D Poster */}
            <div className="md:col-span-5 bg-gradient-to-b from-neutral-900 via-bg-base to-neutral-950 p-6 sm:p-8 flex flex-col justify-between items-center text-center border-b md:border-b-0 md:border-r border-border-subtle relative preserve-3d">
              
              <div className="absolute inset-0 bg-radial from-primary/10 via-transparent to-transparent pointer-events-none" />

              <span className="text-[10px] font-mono tracking-widest uppercase text-text-dim border border-border-subtle px-3 py-1 rounded-full bg-bg-base/90 z-10">
                {active.tag}
              </span>

              {/* Floating 3D Graphic */}
              <div className="my-6 md:my-auto z-10 translate-z-20">
                <div className="text-7xl sm:text-8xl mb-3 filter drop-shadow-[0_15px_30px_rgba(245,197,24,0.35)] transform transition-transform duration-500 hover:scale-125 select-none">
                  {active.image}
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-text-main tracking-tight uppercase leading-none font-sans">
                  {active.title}
                </h3>
                <p className="text-[11px] sm:text-xs font-mono tracking-wider text-primary font-bold mt-2 uppercase">
                  {active.subtitle}
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-bg-surface border border-border-subtle px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-text-muted z-10 shadow-lg">
                <span>🪰</span>
                <span>{active.badge}</span>
              </div>
            </div>

            {/* Right Content */}
            <div className="md:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-bg-card">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-text-dim mb-3 border-b border-border-subtle/50 pb-2">
                  <span>DISPATCH NO. 0{active.id} OF 0{total}</span>
                  <span className="text-primary font-bold">3D CHRONICLE</span>
                </div>

                <h4 className="text-xl sm:text-2xl md:text-3xl font-black text-text-main uppercase tracking-tight mb-3">
                  RELIVE: {active.title}
                </h4>

                <p className="text-sm sm:text-base text-text-muted leading-relaxed mb-6 font-normal">
                  {active.desc}
                </p>

                <div className="grid grid-cols-2 gap-2.5 mb-8 text-xs font-mono">
                  <div className="bg-bg-surface border border-border-subtle p-3 rounded-xl shadow-inner">
                    <span className="text-text-dim block text-[10px]">CATEGORY</span>
                    <span className="font-bold text-text-main">{active.tag}</span>
                  </div>
                  <div className="bg-bg-surface border border-border-subtle p-3 rounded-xl shadow-inner">
                    <span className="text-text-dim block text-[10px]">VERDICT</span>
                    <span className="font-bold text-primary">HISTORIC SATIRE</span>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href={active.ctaLink}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-bg-base font-black text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-[0_10px_25px_rgba(245,197,24,0.25)] transition active:scale-95 cursor-pointer text-center"
                >
                  <span>{active.ctaText}</span>
                </a>
              </div>
            </div>

          </div>

          {/* 3D Bottom Control Bar */}
          <div className="bg-bg-surface border-t border-border-subtle px-4 sm:px-6 py-3.5 flex items-center justify-between">
            <button
              onClick={prevSlide}
              className="w-9 h-9 rounded-xl bg-bg-card hover:bg-bg-base border border-border-subtle text-text-muted hover:text-primary flex items-center justify-center text-xs transition active:scale-90 cursor-pointer shadow-sm"
              aria-label="Previous Slide"
            >
              ◀
            </button>

            <div className="flex items-center gap-2">
              {CAMPAIGNS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    current === idx
                      ? 'w-7 sm:w-8 bg-primary shadow-[0_0_10px_rgba(245,197,24,0.6)]'
                      : 'w-2 bg-text-dim hover:bg-text-muted'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={nextSlide}
                className="w-9 h-9 rounded-xl bg-bg-card hover:bg-bg-base border border-border-subtle text-text-muted hover:text-primary flex items-center justify-center text-xs transition active:scale-90 cursor-pointer shadow-sm"
                aria-label="Next Slide"
              >
                ▶
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9 rounded-xl bg-bg-card hover:bg-bg-base border border-border-subtle text-text-muted hover:text-primary flex items-center justify-center text-xs font-mono transition active:scale-90 cursor-pointer shadow-sm"
                title={isPlaying ? 'Pause Auto-Scroll' : 'Play Auto-Scroll'}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}