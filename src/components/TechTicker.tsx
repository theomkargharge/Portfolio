import { ticker } from '../data';

export default function TechTicker() {
  const items = [...ticker, ...ticker];
  return (
    <div className="relative border-y border-white/[0.06] bg-white/[0.01] py-5" aria-label="Technologies I work with">
      <div className="marquee overflow-hidden">
        <ul className="marquee-track">
          {items.map((t, i) => (
            <li key={`${t}-${i}`} className="flex items-center gap-10 whitespace-nowrap pr-10 text-[15px] tracking-[-0.01em] text-fg-3" aria-hidden={i >= ticker.length}>
              <span className="text-[11px] text-white/20">✦</span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
