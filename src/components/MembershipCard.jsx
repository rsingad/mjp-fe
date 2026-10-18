import { forwardRef, useState } from 'react';

const MembershipCard = forwardRef(({ name = '', city = '', power = '', memberNo = '' }, ref) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Angle calculation (-15 deg to +15 deg)
    const rotateX = ((y / rect.height) - 0.5) * -22;
    const rotateY = ((x / rect.width) - 0.5) * 22;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div className="flex justify-center p-4 perspective-1000 select-none">
      {/* 3D Tilt Wrapper */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: rotate.x === 0 ? 'transform 0.5s ease-out' : 'none',
        }}
        className="w-[340px] rounded-3xl p-[3px] bg-gradient-to-br from-primary via-primary-hover to-secondary shadow-[0_20px_50px_rgba(245,197,24,0.15)] relative overflow-hidden text-left preserve-3d cursor-pointer group"
      >
        {/* Dynamic 3D Glare Light */}
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl z-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
            opacity: glare.opacity,
          }}
        />

        {/* Inner Card Container */}
        <div
          ref={ref}
          className="bg-bg-card rounded-[22px] p-6 flex flex-col justify-between min-h-[520px] relative overflow-hidden border border-border-subtle/50 preserve-3d"
        >
          {/* Top Pill Pop-out */}
          <div className="relative z-10 translate-z-12">
            <div className="flex justify-between items-center mb-5">
              <span className="bg-primary/10 border border-primary/30 text-primary font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                🔥 3D Verified Satirical ID
              </span>
              <span className="text-2xl filter drop-shadow-[0_5px_10px_rgba(245,197,24,0.4)]">🪰</span>
            </div>

            <div className="border-b border-border-subtle pb-4">
              <h3 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                MAKKHI JANTA PARTY
              </h3>
              <p className="text-[10px] tracking-[2px] uppercase text-text-dim font-semibold mt-0.5">
                Democracy • Humour • Azadi
              </p>
            </div>
          </div>

          {/* Member Details in 3D Layer */}
          <div className="py-4 space-y-4 relative z-10 translate-z-20">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-text-dim block font-bold">
                MEMBER ID
              </span>
              <span className="text-xl font-mono font-extrabold text-primary tracking-wide">
                {memberNo || 'MJP-000000'}
              </span>
            </div>

            <div>
              <span className="text-[9px] uppercase tracking-widest text-text-dim block font-bold">
                MEMBER NAAM
              </span>
              <span className="text-xl font-black text-text-main uppercase block truncate mt-0.5">
                {name || 'Makkhi Supporter'}
              </span>
            </div>

            {city && (
              <div>
                <span className="text-[9px] uppercase tracking-widest text-text-dim block font-bold">
                  SHEHER / CITY
                </span>
                <span className="text-sm font-semibold text-text-muted uppercase block truncate">
                  {city}
                </span>
              </div>
            )}

            {power && (
              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 bg-secondary/15 border border-secondary/30 text-secondary text-xs font-bold px-3 py-1 rounded-full shadow-inner">
                  <span className="truncate">⚡ {power.toUpperCase()}</span>
                </span>
              </div>
            )}
          </div>

          {/* Footer Part */}
          <div className="border-t border-border-subtle pt-4 relative z-10 translate-z-12 space-y-3">
            <blockquote className="text-[11px] italic text-text-dim leading-snug">
              "Authorities cannot use a <strong className="text-primary not-italic">hammer</strong> to kill a <strong className="text-primary not-italic">fly</strong>!"
              <cite className="block text-[9px] not-italic text-text-dim/80 font-sans mt-0.5">
                — CJI Surya Kant, SC of India
              </cite>
            </blockquote>

            <div className="bg-bg-base/80 border border-border-subtle/40 rounded-xl px-3 py-1.5 flex justify-between items-center text-[8px] text-text-dim font-mono">
              <span>makkhijantaparty.org</span>
              <span className="text-primary font-bold">HOLOGRAM 3D 🪰</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
});

export default MembershipCard;