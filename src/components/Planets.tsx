import { useEffect, useRef } from 'react';

// Planets hanging in the background. Each one belongs beside a section and drifts past slower
// than the page — the further away, the slower — so the page seems to sail by them.

type Kind = 'ice' | 'giant' | 'rose' | 'moon' | 'dusk' | 'ember';
type Body = {
  kind: Kind;
  at: string; // id of the section it hangs beside
  x: number; // centre, as a fraction of the screen width
  y: number; // centre, as a fraction of the screen height when that section reaches the top
  size: number;
  depth: number; // share of the scroll speed it moves at — smaller is further away
  narrow: { x: number; size: number };
};

const BODIES: Body[] = [
  { kind: 'ice', at: 'top', x: 0.06, y: 0.26, size: 92, depth: 0.25, narrow: { x: 0.9, size: 54 } },
  { kind: 'giant', at: 'work', x: -0.02, y: 0.3, size: 340, depth: 0.42, narrow: { x: -0.1, size: 180 } },
  { kind: 'rose', at: 'experience', x: 0.95, y: 0.34, size: 170, depth: 0.32, narrow: { x: 1.02, size: 104 } },
  { kind: 'moon', at: 'stack', x: 0.94, y: 0.12, size: 46, depth: 0.2, narrow: { x: 0.9, size: 32 } },
  { kind: 'dusk', at: 'about', x: 0.02, y: 0.82, size: 440, depth: 0.5, narrow: { x: -0.18, size: 250 } },
  { kind: 'ember', at: 'contact', x: 0.965, y: 0.18, size: 64, depth: 0.22, narrow: { x: 0.93, size: 40 } },
];

export default function Planets() {
  const nodes = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    let narrow: boolean | null = null;

    const place = () => {
      raf = 0;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const small = vw < 768;
      const sy = window.scrollY;
      BODIES.forEach((b, i) => {
        const el = nodes.current[i];
        const section = document.getElementById(b.at);
        if (!el || !section) return;
        const size = small ? b.narrow.size : b.size;
        if (small !== narrow) el.style.setProperty('--s', `${size}px`);
        const x = (small ? b.narrow.x : b.x) * vw;
        const y = b.y * vh - (sy - section.offsetTop) * b.depth;
        const away = y < -size * 1.3 || y > vh + size * 1.3;
        el.style.visibility = away ? 'hidden' : '';
        if (!away) el.style.transform = `translate3d(${(x - size / 2).toFixed(1)}px, ${(y - size / 2).toFixed(1)}px, 0)`;
      });
      narrow = small;
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(place);
    };

    place();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    // sections settle as fonts and images arrive
    const settle = window.setTimeout(queue, 1200);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settle);
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
    };
  }, []);

  return (
    <div className="planets" aria-hidden="true">
      {BODIES.map((b, i) => (
        <div
          key={b.kind}
          ref={(n) => {
            nodes.current[i] = n;
          }}
          className={`orb orb--${b.kind}`}
        >
          {b.kind === 'giant' && <span className="orb-ring orb-ring--back" />}
          <span className="orb-body">
            <span className="orb-surface" />
          </span>
          {b.kind === 'giant' && <span className="orb-ring orb-ring--front" />}
          {b.kind === 'rose' && (
            <span className="orb-moon-path">
              <span className="orb-moon-bob">
                <span className="orb-moon" />
              </span>
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
