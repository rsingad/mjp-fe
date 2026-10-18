export default function Ticker() {
  const items = [
    { tag: 'LEGAL', text: '🔨 CJI Surya Kant: "Authorities cannot use a hammer to kill a fly!"' },
    { tag: 'VIRAL', text: '🪰 MJP ne pehle 72 ghante mein 3,30,000+ members register kar liye' },
    { tag: 'ALLIANCE', text: '🪳 Cockroach Janta Party (CJP) ke saath historic "Khatmal Pact" par sign' },
    { tag: 'DEMAND', text: '🚫 Insecticide sprays aur electric bats par Supreme Court mein PIL daakhil' },
    { tag: 'SLOGAN', text: '📣 "Choti makkhi, badi awaaz — ab internet par hamara raaj!"' },
    { tag: 'TECH', text: '🌐 High-speed UDP connections har makkhi ka janam-siddh adhikaar hai' },
  ];

  // Infinite scroll track ke liye double array
  const tickerItems = [...items, ...items];

  return (
    <div className="w-full bg-bg-surface/90 border-b border-border-accent backdrop-blur-sm overflow-hidden flex items-center h-10 select-none">
      
      {/* Live Badge (Sticky on Left) */}
      <div className="z-10 bg-bg-base px-3 py-1 flex items-center gap-2 border-r border-border-subtle shadow-md shrink-0">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-live opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-status-live" />
        </span>
        <span className="text-[11px] font-black tracking-widest text-status-live uppercase">
          BREAKING
        </span>
      </div>

      {/* Marquee Scroller */}
      <div className="overflow-hidden flex flex-1">
        <div className="animate-ticker flex items-center py-1">
          {tickerItems.map((item, idx) => (
            <div key={idx} className="flex items-center mx-5 whitespace-nowrap cursor-pointer">
              <span className="bg-primary/10 border border-primary/30 text-primary font-bold text-[9px] px-1.5 py-0.5 rounded mr-2 tracking-wider">
                {item.tag}
              </span>
              <span className="text-text-muted text-xs font-medium hover:text-text-main transition-colors">
                {item.text}
              </span>
              <span className="text-text-dim text-xs ml-8">◆</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}