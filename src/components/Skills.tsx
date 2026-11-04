import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import SectionHeading from './SectionHeading';
import { Station } from './JourneyPhone';
import { skillGroups } from '../data';
import { useMediaQuery } from '../hooks';

// The stack as a galaxy: a canvas spiral (which turns as you scroll) with every skill group
// drawn over it as a constellation in SVG. On wide screens the whole map is visible and
// hovering lights a constellation up; on narrow ones a camera flies between constellations.

type Key = keyof typeof skillGroups;
type Star = { name: string; x: number; y: number; primary: boolean };

const ORDER = Object.keys(skillGroups) as Key[];
const CORE = { x: 500, y: 310 };
const TAU = Math.PI * 2;

/* Where each constellation lives in the 1000×620 world, and the spacing of its two star columns */
const PLACES: Record<Key, { color: string; box: [number, number, number, number]; colB: number }> = {
  ai: { color: '#67e8f9', box: [40, 66, 290, 216], colB: 150 },
  integrations: { color: '#a5b4fc', box: [395, 58, 240, 126], colB: 128 },
  mobile: { color: '#60a5fa', box: [680, 66, 290, 216], colB: 150 },
  backend: { color: '#5eead4', box: [40, 352, 290, 238], colB: 150 },
  payments: { color: '#fcd34d', box: [395, 460, 240, 126], colB: 128 },
  tools: { color: '#e2e8f0', box: [680, 352, 290, 238], colB: 150 },
};

/* Stable pseudo-random jitter so constellations look hand-placed but never reshuffle */
const jitter = (s: string, salt: number) => {
  let h = 2166136261 ^ salt;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return ((h >>> 0) % 10000) / 10000 - 0.5;
};

const SHAPES = ORDER.map((key) => {
  const { box, colB, color } = PLACES[key];
  const [x0, y0, , h] = box;
  const items = skillGroups[key].items;
  const pitch = (h - 16) / (Math.ceil(items.length / 2) - 0.5);
  const stars: Star[] = items.map((name, k) => {
    const col = k % 2;
    return {
      name,
      x: x0 + 6 + col * colB + jitter(name, 1) * 30,
      y: y0 + 8 + Math.floor(k / 2) * pitch + (col * pitch) / 2 + jitter(name, 2) * 12,
      primary: k < 3,
    };
  });

  // Join the stars with a minimum spanning tree — it reads like a real constellation
  const joined = [0];
  const edges: [number, number][] = [];
  while (joined.length < stars.length) {
    let best: [number, number, number] = [0, 0, Infinity];
    for (const a of joined)
      for (let b = 0; b < stars.length; b++) {
        if (joined.includes(b)) continue;
        const d = Math.hypot(stars[a].x - stars[b].x, stars[a].y - stars[b].y);
        if (d < best[2]) best = [a, b, d];
      }
    edges.push([best[0], best[1]]);
    joined.push(best[1]);
  }
  return { key, color, box, stars, edges, ...skillGroups[key] };
});

const TOTAL = SHAPES.reduce((n, s) => n + s.stars.length, 0);

/* What part of the world the camera should frame */
function cameraFor(key: Key | null, cw: number, ch: number, wide: boolean) {
  const aspect = cw / ch;
  if (wide) return { x: CORE.x, y: CORE.y, w: Math.max(1000, 620 * aspect) };
  if (!key) return { x: CORE.x, y: CORE.y, w: Math.max(1080, 700 * aspect) };
  const [x0, y0, bw, bh] = PLACES[key].box;
  const k = Math.min(1.3, Math.max(0.95, cw / 345));
  return { x: x0 + bw / 2 + 10, y: y0 + bh / 2 - 8, w: Math.max(cw / k, bw + 70, (bh + 84) * aspect) };
}

/* ---------- Canvas spiral ---------- */

const COLORS = ['#fff6e0', '#e0ecff', '#9fd8ff', '#7aa7ff', '#5eead4', '#c7d2fe'];
type Particle = { r: number; a: number; size: number; alpha: number; spin: number };

function seedGalaxy(count: number) {
  const buckets: Particle[][] = COLORS.map(() => []);
  const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
  for (let i = 0; i < count; i++) {
    let r: number;
    let a: number;
    let bucket: number;
    if (i < count * 0.8) {
      // three trailing arms
      r = 0.03 + Math.random() ** 1.1 * 0.97;
      a = (i % 3) * (TAU / 3) + r * 3.7 + gauss() * (0.46 - r * 0.18);
      bucket = r < 0.16 ? 0 : r < 0.34 ? 1 : 2 + ((Math.random() * 4) | 0);
    } else {
      // diffuse disc between the arms
      r = Math.random() ** 0.7;
      a = Math.random() * TAU;
      bucket = [1, 3, 4][(Math.random() * 3) | 0];
    }
    buckets[bucket].push({
      r,
      a,
      size: r < 0.15 ? 1.7 : 0.7 + Math.random() * 1.1,
      alpha: (i < count * 0.8 ? 0.35 : 0.15) + Math.random() * 0.45 * (1 - r * 0.5),
      spin: 1.3 - r * 0.75, // inner stars orbit faster
    });
  }
  return buckets;
}

function drawGalaxy(ctx: CanvasRenderingContext2D, buckets: Particle[][], cw: number, ch: number, cam: { x: number; y: number; w: number }, rot: number) {
  const k = cw / cam.w;
  const parallax = 0.82; // the galaxy sits further back than the constellations
  const cx = cw / 2 + (CORE.x - cam.x) * k * parallax;
  const cy = ch / 2 + (CORE.y - cam.y) * k * parallax;
  const R = 470 * k;
  const tilt = 0.5;

  ctx.clearRect(0, 0, cw, ch);
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-0.24);
  ctx.globalCompositeOperation = 'lighter';

  ctx.save();
  ctx.scale(1, tilt);
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.5);
  g.addColorStop(0, 'rgba(236,244,255,0.55)');
  g.addColorStop(0.18, 'rgba(120,170,255,0.24)');
  g.addColorStop(0.55, 'rgba(59,130,246,0.08)');
  g.addColorStop(1, 'rgba(59,130,246,0)');
  ctx.fillStyle = g;
  ctx.fillRect(-R, -R, R * 2, R * 2);
  ctx.restore();

  buckets.forEach((list, b) => {
    ctx.fillStyle = COLORS[b];
    for (const p of list) {
      const ang = p.a + rot * p.spin;
      ctx.globalAlpha = p.alpha;
      ctx.fillRect(Math.cos(ang) * p.r * R, Math.sin(ang) * p.r * R * tilt, p.size, p.size);
    }
  });
  ctx.restore();
  ctx.globalAlpha = 1;
}

/* ---------- Section ---------- */

export default function Skills() {
  const wide = useMediaQuery('(min-width: 1024px)');
  const [focus, setFocus] = useState<Key | null>(null);
  const [lit, setLit] = useState(false);
  const card = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const focusRef = useRef(focus);
  const touched = useRef(false);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const tabs = useRef<HTMLDivElement>(null);

  useEffect(() => {
    focusRef.current = focus;
    // keep the chosen tab in view in the sideways-scrolling tab strip (without moving the page)
    const strip = tabs.current;
    const on = strip?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (strip && on && strip.scrollWidth > strip.clientWidth)
      strip.scrollTo({ left: on.offsetLeft - (strip.clientWidth - on.offsetWidth) / 2, behavior: 'smooth' });
  }, [focus]);

  useEffect(() => {
    const el = card.current;
    const cv = canvas.current;
    const sv = svg.current;
    const ctx = cv?.getContext('2d');
    if (!el || !cv || !sv || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const buckets = seedGalaxy(wide ? 3800 : 1900);
    let cw = 1;
    let ch = 1;
    let raf = 0;
    let last = performance.now();
    let lastScroll = window.scrollY;
    let rot = 0;
    let cam = cameraFor(focusRef.current, 1, 1, wide);
    let drawn = '';
    let timer = 0;

    const measure = () => {
      cw = el.clientWidth;
      ch = el.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(cw * dpr);
      cv.height = Math.round(ch * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cam = cameraFor(focusRef.current, cw, ch, wide);
      drawn = '';
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!reduced) rot += dt * 0.035 + (window.scrollY - lastScroll) * 0.0009;
      lastScroll = window.scrollY;

      const goal = cameraFor(focusRef.current, cw, ch, wide);
      const f = reduced ? 1 : 1 - Math.exp(-dt * 3.4);
      cam = { x: cam.x + (goal.x - cam.x) * f, y: cam.y + (goal.y - cam.y) * f, w: cam.w + (goal.w - cam.w) * f };

      const sig = `${rot.toFixed(4)}|${cam.x.toFixed(2)}|${cam.y.toFixed(2)}|${cam.w.toFixed(2)}|${cw}|${ch}`;
      if (sig === drawn) return;
      drawn = sig;
      const vh = (cam.w * ch) / cw;
      sv.setAttribute('viewBox', `${(cam.x - cam.w / 2).toFixed(2)} ${(cam.y - vh / 2).toFixed(2)} ${cam.w.toFixed(2)} ${vh.toFixed(2)}`);
      drawGalaxy(ctx, buckets, cw, ch, cam, rot);
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      frame(now);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(raf);
        raf = 0;
        if (!entry.isIntersecting) return;
        last = performance.now();
        raf = requestAnimationFrame(loop);
      },
      { rootMargin: '120px 0px' }
    );
    // Light the constellations once the map is properly on screen; on small screens, then fly to the first one
    const reveal = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        reveal.disconnect();
        setLit(true);
        if (!wide)
          timer = window.setTimeout(() => {
            if (!touched.current) setFocus(ORDER[0]);
          }, 1100);
      },
      { threshold: 0.35 }
    );
    const ro = new ResizeObserver(() => {
      measure();
      frame(performance.now());
    });

    measure();
    frame(performance.now());
    ro.observe(el);
    io.observe(el);
    reveal.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      io.disconnect();
      reveal.disconnect();
      ro.disconnect();
    };
  }, [wide]);

  const choose = (key: Key | null) => {
    touched.current = true;
    setFocus(key);
  };

  const step = (dir: 1 | -1) => {
    const i = focus ? ORDER.indexOf(focus) : -1;
    choose(ORDER[(i + dir + ORDER.length) % ORDER.length]);
  };

  // On narrow screens a sideways swipe across the map flies to the next constellation
  const onDown = (e: PointerEvent) => {
    if (!wide) swipe.current = { x: e.clientX, y: e.clientY };
  };
  const onUp = (e: PointerEvent) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - s.y)) {
      step(dx < 0 ? 1 : -1);
      // …and the click that follows the swipe shouldn't re-select where the finger landed
      swiped.current = true;
      setTimeout(() => (swiped.current = false), 0);
    }
  };

  const current = SHAPES.find((s) => s.key === focus);

  return (
    <section id="stack" className="relative overflow-hidden py-24 sm:py-32">
      <div className="glow left-1/2 top-1/3 h-[420px] w-[720px] -translate-x-1/2 bg-accent/[0.07]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          index="03"
          label="Stack"
          title={
            <>
              Mobile craft, <span className="serif-accent text-grad pr-1">AI fluency.</span>
            </>
          }
          aside={`My toolkit, mapped as a galaxy — ${ORDER.length} constellations and ${TOTAL} stars, from Flutter state management to retrieval pipelines.`}
        />

        <div className="reveal mb-4 flex items-center gap-3">
          <div ref={tabs} className="no-scrollbar relative -mx-5 flex flex-1 gap-1.5 overflow-x-auto px-5 sm:mx-0 sm:px-0" role="tablist" aria-label="Constellations">
            <button type="button" role="tab" aria-selected={!focus} onClick={() => choose(null)} className={`cst-tab ${!focus ? 'is-on' : ''}`}>
              All
            </button>
            {SHAPES.map((s) => (
              <button
                key={s.key}
                type="button"
                role="tab"
                aria-selected={focus === s.key}
                onClick={() => choose(s.key)}
                className={`cst-tab ${focus === s.key ? 'is-on' : ''}`}
                style={{ '--c': s.color } as CSSProperties}
              >
                <i />
                {s.title}
              </button>
            ))}
          </div>
          <span className="eyebrow hidden shrink-0 lg:block">
            {TOTAL} stars · {ORDER.length} constellations
          </span>
        </div>

        {/* reveal lives on its own wrapper — React owns the card's className and would wipe .in-view */}
        <div className="reveal">
          <div
            ref={card}
            className={`galaxy ${lit ? 'is-lit' : ''} ${wide ? 'aspect-[1000/620]' : 'h-[440px] touch-pan-y sm:h-[480px]'}`}
            onPointerDown={onDown}
            onPointerUp={onUp}
            onPointerCancel={() => (swipe.current = null)}
            onClickCapture={(e) => {
              if (swiped.current) e.stopPropagation();
            }}
          >
            <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden="true" />
            {/* the journey phone spirals into the core here */}
            <Station id="galaxy" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [--pw:8px]" />
            <svg ref={svg} viewBox="0 0 1000 620" className="absolute inset-0 h-full w-full" aria-hidden="true">
              {SHAPES.map((s, ci) => {
                const [x0, y0, bw, bh] = s.box;
                return (
                  <g
                    key={s.key}
                    className={`cst ${focus === s.key ? 'is-focus' : focus ? 'is-dim' : ''}`}
                    style={{ '--c': s.color } as CSSProperties}
                    onPointerEnter={(e) => {
                      if (wide && e.pointerType === 'mouse') choose(s.key);
                    }}
                    onClick={() => choose(s.key)}
                  >
                    <rect className="cst-hit" x={x0 - 22} y={y0 - 40} width={bw + 44} height={bh + 58} rx={18} />
                    <text className="cst-name" x={x0 - 2} y={y0 - 18}>
                      {s.title}
                    </text>
                    {s.edges.map(([a, b], ei) => (
                      <path
                        key={`${a}-${b}`}
                        className="cst-line"
                        d={`M${s.stars[a].x} ${s.stars[a].y}L${s.stars[b].x} ${s.stars[b].y}`}
                        pathLength={1}
                        style={{ transitionDelay: `${0.35 + ci * 0.16 + ei * 0.07}s` }}
                      />
                    ))}
                    {s.stars.map((st, si) => (
                      <g key={st.name} transform={`translate(${st.x.toFixed(1)} ${st.y.toFixed(1)})`}>
                        <g className={`star ${st.primary ? 'is-primary' : ''}`} style={{ transitionDelay: `${ci * 0.16 + si * 0.045}s` }}>
                          <circle className="star-halo" r={st.primary ? 7.5 : 5.5} style={{ animationDelay: `${-((si * 0.7 + ci) % 3.2)}s` }} />
                          <circle className="star-core" r={st.primary ? 2.4 : 1.7} />
                          <text className="star-label" x={st.primary ? 11 : 9} y={4}>
                            {st.name}
                          </text>
                        </g>
                      </g>
                    ))}
                  </g>
                );
              })}
            </svg>
            {!wide && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-surface via-surface/80 to-transparent pb-3 pt-10 text-center text-[11.5px] text-fg-3">
                Swipe or tap to fly between constellations
              </div>
            )}
          </div>
        </div>

        <div className="reveal mt-5 grid gap-4 rounded-2xl border border-line/[0.07] bg-surface/70 p-5 sm:grid-cols-[220px_1fr] sm:items-center sm:p-6" style={{ '--d': '80ms' } as CSSProperties}>
          {current ? (
            <>
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: current.color, boxShadow: `0 0 14px ${current.color}` }} />
                <span className="text-[18px] font-semibold tracking-[-0.02em] text-fg">{current.title}</span>
                <span className="font-mono text-[11.5px] text-fg-3">{current.stars.length} stars</span>
              </div>
              <p className="text-[15px] leading-relaxed text-fg-2">{current.blurb}</p>
            </>
          ) : (
            <>
              <div className="text-[18px] font-semibold tracking-[-0.02em] text-fg">The whole sky</div>
              <p className="text-[15px] leading-relaxed text-fg-2">
                {wide ? 'Hover a constellation' : 'Tap a constellation'} — or pick one above — to light it up. Brighter stars are the tools I use
                most.
              </p>
            </>
          )}
        </div>

        <ul className="sr-only">
          {SHAPES.map((s) => (
            <li key={s.key}>
              {s.title}: {s.items.join(', ')}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
