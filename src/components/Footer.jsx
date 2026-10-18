export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border-subtle bg-bg-surface/80 pt-16 pb-12 px-4 mt-24 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl select-none">🪰</span>
              <div>
                <span className="font-black text-xl text-primary tracking-wider block leading-none">
                  MJP
                </span>
                <span className="text-[10px] tracking-widest uppercase text-text-dim font-bold">
                  Makkhi Janta Party
                </span>
              </div>
            </div>

            <p className="text-xs text-text-muted leading-relaxed">
              "Authorities cannot use a hammer to kill a fly!" Supreme Court ke ek aitihasik quote se janmi India ki pehli digital satire party.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
                🎭 100% Satire
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold bg-secondary/10 text-secondary border border-secondary/20">
                🪳 CJP Ally
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-mono font-bold text-text-main uppercase tracking-widest mb-4">
              Navigational Links
            </h4>
            <ul className="space-y-2.5 text-xs text-text-muted">
              <li>
                <a href="#party" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>🪰</span> Party Manifesto
                </a>
              </li>
              <li>
                <a href="#join" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>🪪</span> Free Member ID Card
                </a>
              </li>
              <li>
                <a href="#kahani" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>📜</span> SC Origin Timeline
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>❓</span> Sawaal Jawaab (FAQs)
                </a>
              </li>
            </ul>
          </div>

          {/* Satirical Wings */}
          <div>
            <h4 className="text-xs font-mono font-bold text-text-main uppercase tracking-widest mb-4">
              Movement Wings
            </h4>
            <ul className="space-y-2.5 text-xs text-text-muted">
              <li>
                <span className="hover:text-primary cursor-pointer transition-colors flex items-center gap-1.5">
                  <span>📢</span> IT & Meme Cell
                </span>
              </li>
              <li>
                <span className="hover:text-primary cursor-pointer transition-colors flex items-center gap-1.5">
                  <span>☕</span> Ministry of Chai & Charcha
                </span>
              </li>
              <li>
                <span className="hover:text-primary cursor-pointer transition-colors flex items-center gap-1.5">
                  <span>⚖️</span> Hammer Anti-Abuse Cell
                </span>
              </li>
              <li>
                <span className="hover:text-primary cursor-pointer transition-colors flex items-center gap-1.5">
                  <span>🪳</span> Cockroach Joint Committee
                </span>
              </li>
            </ul>
          </div>

          {/* Legal / Satire Disclaimer Box */}
          <div className="bg-bg-card p-5 rounded-2xl border border-border-subtle space-y-2.5">
            <div className="flex items-center gap-1.5 text-secondary text-xs font-bold">
              <span>⚠️</span>
              <span className="uppercase tracking-wider">Statutory Satire</span>
            </div>
            <p className="text-[11px] text-text-dim leading-relaxed">
              Yeh platform kisi bhi asli political party, chunav ya aayog (ECI) se juda nahi hai. Yeh ek pure social commentary, meme movement aur internet humor initiative hai.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-dim">
          <p>© 2026 Makkhi Janta Party (MJP). Inspired by Hon’ble Supreme Court of India.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 bg-bg-card hover:bg-bg-surface border border-border-subtle hover:border-primary/40 text-text-muted hover:text-primary px-3.5 py-1.5 rounded-full transition active:scale-95 cursor-pointer text-[11px]"
          >
            <span>Top Par Chalo</span>
            <span>↑</span>
          </button>
        </div>

      </div>
    </footer>
  );
}