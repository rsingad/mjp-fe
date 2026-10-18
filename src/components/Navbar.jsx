import { useState } from 'react';

export default function Navbar({ onJoin }) {
  const [open, setOpen] = useState(false);

  const links = [
    { label: 'Party', href: '#party' },
    { label: 'Manifesto', href: '#manifesto' },
    { label: 'Kahani', href: '#kahani' },
    { label: 'Meme Cell 🔥', href: '#memes' },
    { label: 'CJP Alliance 🪳', href: '#alliance' },
    { label: 'FAQs', href: '#faqs' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-bg-base/90 backdrop-blur-md border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand & Micro Badge */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2 group">
            <span className="text-2xl transition-transform group-hover:rotate-12 select-none">🪰</span>
            <div className="leading-tight">
              <span className="font-extrabold text-primary tracking-wider text-base">MJP</span>
              <span className="hidden sm:block text-[9px] uppercase tracking-widest text-text-dim">
                Makkhi Janta Party
              </span>
            </div>
          </a>

          {/* Live Count Pill */}
          <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-status-success/10 text-status-success border border-status-success/30">
            <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" />
            3.3L+ Active Makkhiyaan
          </span>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs lg:text-sm font-medium text-text-muted hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Dynamic Theme CTA */}
          <button
            onClick={onJoin}
            className="bg-primary hover:bg-primary-hover text-bg-base font-bold px-4 py-1.5 rounded-full text-xs shadow-md transition active:scale-95"
          >
            🗳️ Join Karo
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-primary focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden bg-bg-surface border-b border-border-subtle px-5 py-5 flex flex-col gap-3.5 shadow-xl">
          <div className="pb-2 border-b border-border-subtle flex justify-between items-center">
            <span className="text-xs text-text-dim font-mono">STATUS: 3.3L+ JOINED</span>
            <span className="text-[10px] bg-status-live/15 text-status-live border border-status-live/30 px-2 py-0.5 rounded font-bold">
              SATIRE
            </span>
          </div>

          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-text-muted hover:text-primary text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={() => {
              onJoin();
              setOpen(false);
            }}
            className="w-full bg-primary hover:bg-primary-hover text-bg-base font-bold py-2.5 rounded-xl text-xs shadow mt-2 transition"
          >
            🗳️ Join Karo — Free ID Card
          </button>
        </div>
      )}
    </header>
  );
}