import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import MembershipCard from './MembershipCard';

function generateMemberNumber() {
  return 'MJP-' + String(Math.floor(Math.random() * 900000) + 100000);
}

export default function JoinSection() {
  const [form, setForm] = useState({ name: '', city: '', power: '' });
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setCard({ ...form, memberNo: generateMemberNumber() });
      setLoading(false);
    }, 400);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        fontEmbedCSS: '', // <-- External font parsing skip karega (CORS crash fix)
        filter: (node) => {
          // Kisi bhi external stylesheet ya link tag ko image generation se ignore karein
          return node.tagName !== 'LINK';
        },
      });
      const link = document.createElement('a');
      link.download = `MJP-Member-${card.memberNo}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download error:', err);
      alert('Card download karne me problem aayi. Kripya screenshot lein!');
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    const text = `Main MJP ka official member ban gaya hoon! 🪰\nMember ID: ${card.memberNo}\n\n"Cannot use a hammer to kill a fly!"\n— CJI Surya Kant\n\nApna card banao: makkhijantaparty.org`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'MJP Member Card', text });
      } catch (err) {
        console.log(err);
      }
    } else {
      await navigator.clipboard.writeText(text);
      alert('Caption copy ho gaya! Ab card share karo 🪰');
    }
  };

  return (
    <section id="join" className="py-20 px-4 bg-bg-surface/50 border-y border-border-subtle">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            PARTY JOIN KARO
          </h2>
          <p className="text-text-muted text-sm mt-2">
            Free lifetime membership — apna digital card pao aur viral karo!
          </p>
        </div>

        {!card ? (
          <form
            onSubmit={handleSubmit}
            className="bg-bg-card p-6 md:p-8 rounded-3xl border border-border-subtle shadow-2xl space-y-5"
          >
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase text-text-main mb-1.5">
                Tera Naam *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={30}
                placeholder="Apna naam likho..."
                value={form.name}
                onChange={handleChange}
                className="w-full bg-bg-surface border border-border-subtle rounded-xl px-4 py-2.5 text-text-main placeholder-text-dim focus:outline-none focus:border-primary transition"
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-xs font-semibold uppercase text-text-main mb-1.5">
                Sheher / City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                maxLength={30}
                placeholder="Delhi, Mumbai, Jaipur..."
                value={form.city}
                onChange={handleChange}
                className="w-full bg-bg-surface border border-border-subtle rounded-xl px-4 py-2.5 text-text-main placeholder-text-dim focus:outline-none focus:border-primary transition"
              />
            </div>

            <div>
              <label htmlFor="power" className="block text-xs font-semibold uppercase text-text-main mb-1.5">
                Teri Makkhi Superpower ⚡{' '}
                <span className="text-[10px] text-text-dim font-normal normal-case">
                  (e.g. Chai Minister, Chief Meme Officer)
                </span>
              </label>
              <input
                id="power"
                name="power"
                type="text"
                maxLength={35}
                placeholder="Apni superpower likho..."
                value={form.power}
                onChange={handleChange}
                className="w-full bg-bg-surface border border-border-subtle rounded-xl px-4 py-2.5 text-text-main placeholder-text-dim focus:outline-none focus:border-primary transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover font-bold text-bg-base rounded-xl shadow-lg transition active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {loading ? '🪰 Card ban raha hai...' : '🗳️ Member Ban Jao — Free Hai!'}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <div className="bg-status-success/10 border border-status-success/30 text-status-success py-2 px-4 rounded-xl text-xs md:text-sm font-medium inline-block">
              🎉 Badhaai ho! Aapka official card ready hai.
            </div>

            {/* Live Card Preview */}
            <MembershipCard
              ref={cardRef}
              name={card.name}
              city={card.city}
              power={card.power}
              memberNo={card.memberNo}
            />

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center pt-1">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="bg-primary hover:bg-primary-hover text-bg-base font-bold px-6 py-2.5 rounded-xl text-sm shadow-md transition active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {downloading ? '⏳ Downloading...' : '⬇️ Card Download (HD)'}
              </button>
              <button
                onClick={handleShare}
                className="bg-bg-card hover:bg-bg-surface border border-border-subtle text-text-main font-medium px-5 py-2.5 rounded-xl text-sm transition cursor-pointer"
              >
                📲 Share Karo
              </button>
              <button
                onClick={() => setCard(null)}
                className="text-text-dim hover:text-text-main text-xs px-3 py-2 transition cursor-pointer"
              >
                🔄 Edit / Naya Banao
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}