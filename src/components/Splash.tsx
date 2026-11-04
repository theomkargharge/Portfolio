import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { profile, projects, skillGroups } from '../data';
import { clamp, easeInOut } from '../hooks';

// First-load intro — entering the galaxy. We drift through deep space while stars swirl in on
// comet trails to spell my name; a light sweeps across it, then the jump to light speed: the
// name bursts into warp streaks, the galaxy's core flares, and a portal tears open from it onto
// the site. Any key, click, tap or scroll skips straight to the jump.

const TAU = Math.PI * 2;
const PALETTE = ['#8ec5ff', '#a7b4ff', '#b4a2ff', '#d0a9ff', '#f5b8ff', '#ffffff'];
const STARS_OF_TECH = Object.values(skillGroups).reduce((n, g) => n + g.items.length, 0);
const LINES = [`Charting ${projects.length} apps`, `Mapping ${STARS_OF_TECH} stars of tech`, 'Entering the galaxy'];

const FORM = 1.95; // name starts forming → jump
const JUMP = 1.1; // light-speed run
const PORTAL = 0.85; // portal opening onto the site

type Phase = 'boot' | 'gather' | 'title' | 'jump';
/* A star of the name: where it lives in the word (tx, ty — relative to centre), the spiral it flies
   in on (polar a0/r0 → a1/r1), and where it bursts from when we jump (bx, by) */
type Dot = { tx: number; ty: number; a0: number; r0: number; a1: number; r1: number; delay: number; dur: number; size: number; c: number; tw: number; burst: number; bx: number; by: number };
/* A deep-space star in the warp tunnel: x/y are its screen offset at depth z = 1 */
type Star = { x: number; y: number; z: number; c: number };

export default function Splash() {
  const [done, setDone] = useState(false);
  const [phase, setPhase] = useState<Phase>('boot');
  const [line, setLine] = useState(0);
  const [still, setStill] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const sub = useRef<HTMLParagraphElement>(null);
  const bar = useRef<HTMLElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const skip = useRef<() => void>(() => {});

  // Hold the page still (and its hero entrance un-played) until the portal opens
  useLayoutEffect(() => {
    document.documentElement.classList.add('is-splashing');
    return () => document.documentElement.classList.remove('is-splashing');
  }, []);

  useEffect(() => {
    const el = root.current;
    const cv = canvas.current;
    const ctx = cv?.getContext('2d');
    if (!el || !cv || !ctx) return;

    let disposed = false;
    let raf = 0;
    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let diag = 0;
    let t = 0;
    let last = performance.now();
    let dots: Dot[] = [];
    let minX = 0;
    let maxX = 1;
    let formAt = -1; // when the name started forming
    let jumpAt = Infinity;
    let jumpFor = JUMP;
    let portalAt = Infinity;
    let opened = false;
    let shownPhase: Phase = 'boot';
    let shownLine = 0;
    const timers: number[] = [];

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      cx = w / 2;
      cy = h * 0.47;
      diag = Math.hypot(w, h);
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = 'round';
    };
    size();

    const respawn = (s: Star, z = 2.8 + Math.random() * 1.2) => {
      s.x = (Math.random() * 2 - 1) * w * 0.6;
      s.y = (Math.random() * 2 - 1) * h * 0.6;
      s.z = z;
      s.c = Math.random() < 0.5 ? 5 : (Math.random() * 5) | 0;
    };
    const stars: Star[] = Array.from({ length: w < 640 ? 320 : 560 }, () => {
      const s = { x: 0, y: 0, z: 0, c: 5 };
      respawn(s, 0.25 + Math.random() * 3.75);
      return s;
    });

    const finish = () => {
      if (disposed) return;
      document.documentElement.classList.remove('is-splashing');
      setDone(true);
    };

    // People who prefer less motion get a calm title card instead of a warp
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStill(true);
      ctx.fillStyle = '#fff';
      stars.forEach((s) => {
        ctx.globalAlpha = clamp(1 - s.z / 4, 0.15, 0.9);
        ctx.fillRect(cx + s.x / s.z, cy + s.y / s.z, 1.4, 1.4);
      });
      timers.push(window.setTimeout(finish, 1400));
      skip.current = finish;
      return () => {
        disposed = true;
        timers.forEach(clearTimeout);
      };
    }

    /* Spell the name in stars: rasterise it off-screen, then pick lit pixels at random */
    const formName = () => {
      if (disposed || formAt >= 0 || t >= jumpAt) return;
      const lines = w < 640 ? ['OMKAR', 'GHARGE'] : ['OMKAR GHARGE'];
      const off = document.createElement('canvas');
      const c = off.getContext('2d');
      if (!c) return;
      const font = (px: number) => `700 ${px}px Geist, ui-sans-serif, system-ui, sans-serif`;
      c.font = font(100);
      const widest = Math.max(...lines.map((l) => c.measureText(l).width));
      const fs = Math.min(lines.length > 1 ? 120 : 150, ((w * (lines.length > 1 ? 0.84 : 0.8)) / widest) * 100);
      const lh = fs * 1.02;
      off.width = Math.ceil(w);
      off.height = Math.ceil(lh * lines.length + fs * 0.4);
      c.font = font(fs);
      c.fillStyle = '#fff';
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      lines.forEach((l, i) => c.fillText(l, off.width / 2, fs * 0.2 + lh * (i + 0.5)));

      const ink = c.getImageData(0, 0, off.width, off.height).data;
      const lit: [number, number][] = [];
      for (let y = 0; y < off.height; y += 2)
        for (let x = 0; x < off.width; x += 2) if (ink[(y * off.width + x) * 4 + 3] > 150) lit.push([x - off.width / 2, y - off.height / 2]);
      const want = Math.min(lit.length, w < 640 ? 950 : 2600);
      const grow = clamp(fs / 105, 0.9, 1.4); // bigger type, bigger stars
      for (let i = 0; i < want; i++) {
        const j = i + ((Math.random() * (lit.length - i)) | 0);
        [lit[i], lit[j]] = [lit[j], lit[i]];
      }
      const picked = lit.slice(0, want);
      minX = Math.min(...picked.map((p) => p[0]));
      maxX = Math.max(...picked.map((p) => p[0]));

      dots = picked
        .map(([x, y]) => {
          const tx = x + (Math.random() - 0.5) * 1.6;
          const ty = y + (Math.random() - 0.5) * 1.6;
          const across = (tx - minX) / (maxX - minX || 1);
          const a1 = Math.atan2(ty, tx);
          return {
            tx,
            ty,
            a1,
            r1: Math.hypot(tx, ty),
            a0: a1 + 1.3 + Math.random() * 1.6, // spiral in from further round the galaxy
            r0: diag * (0.55 + Math.random() * 0.4),
            delay: across * 0.42 + Math.random() * 0.14, // a wave from left to right
            dur: 0.8 + Math.random() * 0.3,
            size: (Math.random() < 0.07 ? 2.6 : 1.1 + Math.random() * 0.9) * grow,
            c: Math.random() < 0.22 ? 5 : Math.min(4, Math.floor(across * 5)),
            tw: Math.random() * TAU,
            burst: 0.7 + Math.random() * 0.8,
            bx: tx,
            by: ty,
          };
        })
        .sort((a, b) => a.c - b.c);

      formAt = t;
      jumpAt = t + FORM;
      portalAt = jumpAt + jumpFor * 0.78;
      const bottom = fs * 0.2 + lh * (lines.length - 0.5) - off.height / 2 + fs * 0.42;
      if (sub.current) sub.current.style.top = `${cy + bottom + 18}px`;
    };

    /* Where a name-star is while flying in (relative to centre) */
    const flight = (d: Dot, time: number) => {
      const u = clamp((time - formAt - d.delay) / d.dur, 0, 1);
      const e = 1 - (1 - u) ** 3;
      const a = d.a0 + (d.a1 - d.a0) * e;
      const r = d.r0 + (d.r1 - d.r0) * e;
      return [Math.cos(a) * r, Math.sin(a) * r, u] as const;
    };

    skip.current = () => {
      if (disposed || t >= jumpAt) return;
      // burst from wherever each star has got to
      dots.forEach((d) => {
        const [x, y] = flight(d, t);
        d.bx = x;
        d.by = y;
      });
      jumpAt = t;
      jumpFor = 0.85;
      portalAt = jumpAt + jumpFor * 0.78;
    };

    const draw = (dt: number) => {
      const ju = clamp((t - jumpAt) / jumpFor, 0, 1);
      const pu = clamp((t - portalAt) / PORTAL, 0, 1);
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      // The galaxy's core, breathing behind the name — then rushing up to meet us
      const coreR = diag * (0.16 + 0.75 * ju ** 2.2);
      const coreA = Math.min(1, 0.2 + 0.05 * Math.sin(t * 2.4) + 0.72 * ju ** 2);
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      core.addColorStop(0, `rgba(236,228,255,${coreA * (0.35 + 0.65 * ju)})`);
      core.addColorStop(0.22, `rgba(180,162,255,${coreA * 0.45})`);
      core.addColorStop(0.6, `rgba(109,125,255,${coreA * 0.16})`);
      core.addColorStop(1, 'rgba(109,125,255,0)');
      ctx.globalAlpha = 1;
      ctx.fillStyle = core;
      ctx.fillRect(0, 0, w, h);

      // Deep space rushing past — a slow drift, then warp
      const speed = 0.3 + 34 * ju ** 3;
      for (const s of stars) {
        s.z -= speed * dt;
        const px = cx + s.x / s.z;
        const py = cy + s.y / s.z;
        if (s.z < 0.05 || px < -80 || px > w + 80 || py < -80 || py > h + 80) {
          respawn(s);
          continue;
        }
        const tz = Math.min(s.z + 0.012 + speed * 0.035, 6);
        const near = clamp(1 - s.z / 4, 0, 1);
        ctx.globalAlpha = near * (0.55 + 0.45 * ju);
        ctx.strokeStyle = PALETTE[s.c];
        ctx.lineWidth = 0.5 + near * 1.7;
        ctx.beginPath();
        ctx.moveTo(cx + s.x / tz, cy + s.y / tz);
        ctx.lineTo(px, py);
        ctx.stroke();
      }

      // The name
      const shineU = (t - formAt - 1.3) / 0.6;
      const shineX = minX - 120 + (maxX - minX + 240) * shineU;
      let colour = -1;
      for (const d of dots) {
        if (d.c !== colour) {
          colour = d.c;
          ctx.fillStyle = ctx.strokeStyle = PALETTE[colour];
        }
        if (ju > 0) {
          const k = 26 * ju ** 3 * d.burst;
          const k0 = 26 * Math.max(0, ju - 0.045) ** 3 * d.burst;
          const x = cx + d.bx * (1 + k);
          const y = cy + d.by * (1 + k);
          if (x < -40 || x > w + 40 || y < -40 || y > h + 40) continue;
          ctx.globalAlpha = 0.9;
          ctx.lineWidth = d.size;
          ctx.beginPath();
          ctx.moveTo(cx + d.bx * (1 + k0), cy + d.by * (1 + k0));
          ctx.lineTo(x, y);
          ctx.stroke();
          continue;
        }
        const [x, y, u] = flight(d, t);
        if (u <= 0) continue;
        if (u < 1) {
          // still flying in — draw it as a comet with a tail
          const [x0, y0] = flight(d, t - 0.06);
          ctx.globalAlpha = Math.min(1, u * 2.5);
          ctx.lineWidth = d.size;
          ctx.beginPath();
          ctx.moveTo(cx + x0, cy + y0);
          ctx.lineTo(cx + x, cy + y);
          ctx.stroke();
        } else {
          const shine = shineU > 0 && shineU < 1 ? Math.max(0, 1 - Math.abs(d.tx - shineX) / 70) : 0;
          const s = d.size + shine * 1.4;
          ctx.globalAlpha = Math.min(1, 0.64 + 0.3 * Math.sin(t * 5 + d.tw) + shine);
          ctx.fillRect(cx + x - s / 2, cy + y - s / 2, s, s);
        }
      }

      // The portal: a hole opens from the core onto the site, rimmed with light
      if (pu > 0) {
        const hole = easeInOut(pu) * (diag * 0.56 + 100);
        const mask = `radial-gradient(circle at ${cx.toFixed(1)}px ${cy.toFixed(1)}px, transparent ${hole.toFixed(1)}px, #000 ${(hole + 90).toFixed(1)}px)`;
        el.style.setProperty('-webkit-mask-image', mask);
        el.style.setProperty('mask-image', mask);
        ctx.strokeStyle = '#d6c8ff';
        [
          [16, 0.08],
          [6, 0.2],
          [1.8, 0.75],
        ].forEach(([width, alpha]) => {
          ctx.globalAlpha = alpha * (1 - pu);
          ctx.lineWidth = width;
          ctx.beginPath();
          ctx.arc(cx, cy, hole + 45, 0, TAU);
          ctx.stroke();
        });
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      return pu;
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      // capped steps: if the tab is hidden mid-intro it resumes where it left off
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      const pu = draw(dt);

      const progress = clamp(t / (Number.isFinite(jumpAt) ? jumpAt : 2.2), 0, 1);
      if (bar.current) bar.current.style.transform = `scaleX(${progress.toFixed(3)})`;
      if (pct.current) pct.current.textContent = `${String(Math.round(progress * 100)).padStart(3, '0')}%`;
      const li = t < 0.75 ? 0 : t < 1.45 ? 1 : 2;
      if (li !== shownLine) {
        shownLine = li;
        setLine(li);
      }
      const ph: Phase = t >= jumpAt ? 'jump' : formAt >= 0 && t > formAt + 1.05 ? 'title' : 'gather';
      if (ph !== shownPhase) {
        shownPhase = ph;
        setPhase(ph);
      }
      if (pu > 0 && !opened) {
        // the site underneath comes alive as the portal opens
        opened = true;
        el.style.pointerEvents = 'none';
        document.documentElement.classList.remove('is-splashing');
      }
      if (pu >= 1) {
        cancelAnimationFrame(raf);
        finish();
      }
    };

    // Wait (briefly) for the display font so the name is spelled in Geist, not a fallback
    const font = document.fonts?.load('700 100px Geist') ?? Promise.resolve();
    Promise.race([font, new Promise((r) => setTimeout(r, 900))]).then(formName, formName);

    const onKey = (e: KeyboardEvent) => {
      if (!['Shift', 'Control', 'Alt', 'Meta', 'Tab'].includes(e.key)) skip.current();
    };
    const onWheel = () => skip.current();
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('resize', size);
    raf = requestAnimationFrame(loop);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', size);
    };
  }, []);

  if (done) return null;

  return (
    <div ref={root} className={`splash is-${still ? 'still' : phase}`} onPointerDown={() => skip.current()}>
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden="true" />

      <div className="splash-coords" aria-hidden="true">
        <span>18.5204° N · 73.8567° E</span>
        <span>Pune · Milky Way</span>
      </div>
      <button type="button" className="splash-skip" onClick={() => skip.current()}>
        Skip intro
      </button>

      <p className="splash-name">{profile.name}</p>
      <p ref={sub} className="splash-sub">
        {profile.role}
      </p>

      <div className="splash-status" aria-hidden="true">
        <span key={line} className="splash-line">
          {LINES[line]}
        </span>
        <span ref={pct} className="splash-pct">
          000%
        </span>
        <span className="splash-bar">
          <i ref={bar} />
        </span>
      </div>
    </div>
  );
}
