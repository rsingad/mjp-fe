import { useState, useEffect, useRef } from 'react';

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let cur = 0;
          const step = Math.ceil(target / 70);
          const t = setInterval(() => {
            cur = Math.min(cur + step, target);
            setCount(cur);
            if (cur >= target) clearInterval(t);
          }, 20);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

export default function Hero({ onJoin }) {
  const [buzzCount, setBuzzCount] = useState(0);
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -16;
    const rotateY = ((x / rect.width) - 0.5) * 16;
    setCardTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setCardTilt({ x: 0, y: 0 });
  };

  return (
    <section id="party" className="relative pt-12 pb-24 px-4 overflow-hidden text-center perspective-1000">
      
      {/* Lightweight Native Ambient Glow (Zero Lag) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-primary/20 via-secondary/15 to-transparent blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-12 left-10 w-72 h-72 bg-primary/10 blur-[90px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Top Movement Pill */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 mb-8 bg-bg-surface/80 border border-border-subtle p-1.5 rounded-full shadow-lg backdrop-blur-md">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary text-bg-base">
            <span className="animate-spin text-xs">⚡</span> 3D SATIRICAL MOVEMENT
          </span>
          <span className="text-xs text-text-muted px-2 font-medium hidden sm:inline">
            Supreme Court Remark Se Janmi Party
          </span>
          <span className="text-[11px] bg-bg-card border border-border-subtle text-secondary px-2.5 py-0.5 rounded-full font-mono font-bold">
            #HammerBan
          </span>
        </div>

        {/* Mascot Interactive Action */}
        <div 
          className="relative mb-6 cursor-pointer group select-none" 
          onClick={() => setBuzzCount((prev) => prev + 1)}
        >
          <div className="text-8xl md:text-9xl transition-transform duration-300 group-hover:scale-125 group-active:rotate-12 filter drop-shadow-[0_15px_35px_rgba(245,197,24,0.35)]">
            🪰
          </div>
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-widest text-text-dim group-hover:text-primary transition-colors whitespace-nowrap bg-bg-base/90 px-2 py-0.5 rounded-md border border-border-subtle shadow-md">
            {buzzCount > 0 ? `BZZZ x${buzzCount}! 💥` : 'TAP TO BUZZ'}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-text-main tracking-tight leading-[1.05] mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-hover to-secondary">
            MAKKHI
          </span>{' '}
          JANTA PARTY
        </h1>

        {/* 3D Tilt Supreme Court Spotlight Card */}
        <div 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
            transition: cardTilt.x === 0 ? 'transform 0.5s ease-out' : 'none',
          }}
          className="w-full max-w-2xl bg-gradient-to-b from-bg-card/90 to-bg-surface/80 border border-border-accent p-6 md:p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md my-4 relative overflow-hidden preserve-3d cursor-pointer"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-primary mb-3 uppercase tracking-wider translate-z-12">
            <span>⚖️ SUPREME COURT OF INDIA RECORD</span>
          </div>

          <p className="text-lg md:text-2xl font-serif italic text-text-main leading-snug translate-z-20">
            "Authorities cannot use a{' '}
            <span className="text-primary font-bold not-italic underline decoration-primary/40 underline-offset-4">
              hammer
            </span>{' '}
            to kill a{' '}
            <span className="text-primary font-bold not-italic underline decoration-primary/40 underline-offset-4">
              fly (makkhi)
            </span>!"
          </p>

          <div className="mt-5 pt-3 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between text-xs text-text-dim gap-2 translate-z-12">
            <span className="font-semibold text-text-muted">— Hon'ble Chief Justice Surya Kant</span>
            <span className="font-mono bg-bg-base px-2.5 py-1 rounded-md border border-border-subtle text-[10px]">
              DELHI HIGH COURT DIRECTIVE HEARING
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-text-muted text-base md:text-xl max-w-2xl mt-5 mb-10 leading-relaxed">
          Jab desh ki sabse badi adalat ne bol diya, toh ab har makkhi apni awaaz uthayegi —{' '}
          <strong className="text-text-main font-bold">Hum kisi se kum nahi! 🪰</strong>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mb-16">
          <button
            onClick={onJoin}
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-bg-base font-black text-base px-9 py-4 rounded-2xl shadow-[0_10px_30px_rgba(245,197,24,0.3)] transition-all transform hover:-translate-y-1 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>🗳️ Free Member Card Banao</span>
            <span>→</span>
          </button>
          
          <a
            href="#manifesto"
            className="w-full sm:w-auto bg-bg-card hover:bg-bg-surface border border-border-subtle hover:border-primary/40 text-text-main font-bold text-base px-8 py-4 rounded-2xl transition shadow-md flex items-center justify-center gap-2"
          >
            <span>📜 5 Demands Dekho</span>
          </a>
        </div>

        {/* Stats Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-3xl bg-bg-card/80 border border-border-subtle p-4 md:p-6 rounded-3xl shadow-2xl backdrop-blur-sm">
          <div className="p-3 text-center border-r border-border-subtle/80">
            <div className="flex items-center justify-center gap-1.5 text-2xl md:text-3xl font-black text-primary font-mono">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <Counter target={330000} suffix="+" />
            </div>
            <div className="text-[11px] text-text-dim uppercase tracking-wider font-bold mt-1">
              Active Members
            </div>
          </div>

          <div className="p-3 text-center md:border-r border-border-subtle/80">
            <div className="text-2xl md:text-3xl font-black text-secondary font-mono">
              <Counter target={72} suffix=" hrs" />
            </div>
            <div className="text-[11px] text-text-dim uppercase tracking-wider font-bold mt-1">
              Viral Record
            </div>
          </div>

          <div className="p-3 text-center border-r border-border-subtle/80">
            <div className="flex items-center justify-center gap-1.5 text-2xl md:text-3xl font-black text-primary font-mono">
              <Counter target={10} suffix="M+" />
            </div>
            <div className="text-[11px] text-text-dim uppercase tracking-wider font-bold mt-1">
              Social Views
            </div>
          </div>

          <div className="p-3 text-center">
            <div className="text-2xl md:text-3xl font-black text-text-main font-mono">
              100%
            </div>
            <div className="text-[11px] text-text-dim uppercase tracking-wider font-bold mt-1">
              Pure Satire
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}