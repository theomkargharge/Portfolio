import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

// Saturn-style rings around the hero phone with my core tech riding them as planets.
// Planets on the far side pass behind the phone; on the near side they cross in front.
// Ring sizes are in units of the phone's width so the system scales with it. When the
// journey phone sets off down the page, the rings let it go and fade out.

const RINGS = [
  { rx: 0.74, ry: 0.17, tilt: -12, period: 38 },
  { rx: 0.93, ry: 0.27, tilt: 8, period: -54 },
];

const PLANETS = [
  { name: 'Flutter', color: '#5ac8fa', ring: 0, at: 0.06 },
  { name: 'OpenAI', color: '#f4f4f5', ring: 0, at: 0.39 },
  { name: 'FastAPI', color: '#2dd4bf', ring: 0, at: 0.72 },
  { name: 'Dart', color: '#7dd3fc', ring: 1, at: 0.16 },
  { name: 'LangChain', color: '#a3e635', ring: 1, at: 0.41 },
  { name: 'Firebase', color: '#fbbf24', ring: 1, at: 0.66 },
  { name: 'Gemini', color: '#c4b5fd', ring: 1, at: 0.91 },
];

const CENTER_Y = 0.94; // ring centre, as a fraction of the phone's height — at its base, so the near side clears the chat

export default function TechOrbit({ children }: { children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const back = useRef<SVGSVGElement>(null);
  const front = useRef<SVGSVGElement>(null);
  const planets = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    let raf = 0;
    let visible = true;
    let pw = el.offsetWidth;
    let ph = el.offsetHeight;
    let scale = 1;
    let rotX = 0;
    let rotY = 0;
    let goalX = 0;
    let goalY = 0;
    const start = performance.now();

    const measure = () => {
      pw = el.offsetWidth;
      ph = el.offsetHeight;
      // On narrow screens let the outer ring run off the edges, but not absurdly far
      scale = Math.max(0.8, Math.min(1, (window.innerWidth / 2 + 30) / (RINGS[1].rx * pw + 40)));
      const cy = ph * CENTER_Y;
      [back.current, front.current].forEach((svg, layer) => {
        if (!svg) return;
        svg.style.top = `${cy}px`;
        svg.querySelectorAll<SVGPathElement>('path').forEach((p, i) => {
          const r = RINGS[i];
          const rx = r.rx * pw * scale;
          const ry = r.ry * pw * scale;
          // back layer: full ellipse · front layer: only the near (lower) half
          p.setAttribute(
            'd',
            layer === 0
              ? `M ${-rx} 0 A ${rx} ${ry} 0 1 0 ${rx} 0 A ${rx} ${ry} 0 1 0 ${-rx} 0`
              : `M ${-rx} 0 A ${rx} ${ry} 0 0 0 ${rx} 0`
          );
          p.setAttribute('transform', `rotate(${r.tilt})`);
        });
      });
    };

    const place = (now: number) => {
      const t = reduced ? 0 : (now - start) / 1000;
      const cy = ph * CENTER_Y;
      // the phone leaves the hero once its middle passes 30% of the screen — fade with it
      const box = el.getBoundingClientRect();
      const fade = Math.min(1, Math.max(0, (box.top + box.height / 2 - window.innerHeight * 0.06) / (window.innerHeight * 0.24)));
      if (back.current) back.current.style.opacity = fade.toFixed(3);
      if (front.current) front.current.style.opacity = fade.toFixed(3);
      PLANETS.forEach((pl, i) => {
        const node = planets.current[i];
        if (!node) return;
        const r = RINGS[pl.ring];
        const a = (pl.at + t / r.period) * Math.PI * 2;
        const lx = Math.cos(a) * r.rx * pw * scale;
        const ly = Math.sin(a) * r.ry * pw * scale;
        const rad = (r.tilt * Math.PI) / 180;
        const x = pw / 2 + lx * Math.cos(rad) - ly * Math.sin(rad);
        const y = cy + lx * Math.sin(rad) + ly * Math.cos(rad);
        const depth = (Math.sin(a) + 1) / 2; // 0 = far side, 1 = near side
        node.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) translate(-50%, -50%) scale(${(0.78 + depth * 0.24).toFixed(3)})`;
        node.style.opacity = ((0.4 + depth * 0.6) * fade).toFixed(3);
        node.style.zIndex = depth > 0.5 ? '30' : '5';
      });

      rotX += (goalX - rotX) * 0.06;
      rotY += (goalY - rotY) * 0.06;
      if (tilt.current) tilt.current.style.transform = `perspective(1400px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    };

    const loop = (now: number) => {
      place(now);
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    const onPointer = (e: PointerEvent) => {
      goalY = (e.clientX / window.innerWidth - 0.5) * 12;
      goalX = (e.clientY / window.innerHeight - 0.5) * -8;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf && !reduced) raf = requestAnimationFrame(loop);
    });
    const ro = new ResizeObserver(() => {
      measure();
      place(performance.now());
    });

    measure();
    place(start);
    ro.observe(el);
    if (!reduced) {
      io.observe(el);
      if (finePointer) window.addEventListener('pointermove', onPointer, { passive: true });
    }
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
    };
  }, []);

  return (
    <div ref={tilt} className="relative will-change-transform">
      <div ref={wrap} className="relative">
        <svg ref={back} className="orbit-ring orbit-ring--back" aria-hidden="true">
          {RINGS.map((r) => (
            <path key={r.tilt} />
          ))}
        </svg>
        {children}
        <svg ref={front} className="orbit-ring orbit-ring--front" aria-hidden="true">
          <defs>
            <linearGradient id="ring-front" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#b4a2ff" stopOpacity="0" />
              <stop offset="0.5" stopColor="#c9bcff" stopOpacity="0.55" />
              <stop offset="1" stopColor="#8ec5ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {RINGS.map((r) => (
            <path key={r.tilt} stroke="url(#ring-front)" />
          ))}
        </svg>
        {PLANETS.map((p, i) => (
          <div
            key={p.name}
            ref={(n) => {
              planets.current[i] = n;
            }}
            className="planet-pill"
            style={{ '--c': p.color } as CSSProperties}
            aria-hidden="true"
          >
            <i />
            {p.name}
          </div>
        ))}
      </div>
    </div>
  );
}
