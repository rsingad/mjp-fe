import { useState } from 'react';
import { FAQS } from '../data/partyData';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-24 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-block mb-3">
          <span className="text-[11px] font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
            Doubt Clear Karo
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight">
          SAWAAL{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            JAWAAB
          </span>
        </h2>
        <p className="text-text-muted text-sm md:text-base mt-2">
          Makkhi ke dimaag ke aam sawaal aur unke satirical jawaab
        </p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-bg-card border border-border-subtle rounded-2xl overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full text-left p-5 flex justify-between items-center text-text-main font-semibold text-sm md:text-base hover:text-primary transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className="text-xl ml-4 text-primary font-bold">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-text-muted text-sm leading-relaxed border-t border-border-subtle/50 pt-3.5">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}