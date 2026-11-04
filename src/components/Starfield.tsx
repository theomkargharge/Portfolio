import { useEffect, useRef } from 'react';

// Fixed star field behind the whole page. Stars sit at three-ish depths: they drift with
// scroll (parallax), twinkle, stretch into warp streaks when you scroll fast, lean away
// from the pointer, and every so often a shooting star crosses the sky.

type Star = { x: number; y: number; z: number; r: number; phase: number; speed: number; tint: number };
type Shooter = { x: number; y: number; vx: number; vy: number; age: number; ttl: number };

const TINTS = ['#ffffff', '#ffffff', '#ffffff', '#d6ecff', '#bfe9ff', '#ffe9c2']; // white, ice blue, cyan, a warm sun
const TAU = Math.PI * 2;

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let raf = 0;
    let frame = 0;
    let lastT = performance.now();
    let lastScroll = window.scrollY;
    let warp = 0;
    let px = 0;
    let py = 0;
    let tx = 0;
    let ty = 0;
    let shooter: Shooter | null = null;
    let nextShot = lastT + 4000;

    const seed = () => {
      const count = Math.round(Math.min(640, (w * h) / 2500));
      stars = Array.from({ length: count }, () => {
        const z = Math.random() ** 1.7; // most stars are far away
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: 0.35 + z * 1.3,
          phase: Math.random() * TAU,
          speed: 0.5 + Math.random() * 1.8,
          tint: (Math.random() * TINTS.length) | 0,
        };
      });
    };

    const draw = (now: number, dt: number) => {
      const scroll = window.scrollY;
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        let y = (s.y - scroll * (0.03 + s.z * 0.22)) % h;
        if (y < 0) y += h;
        y += py * s.z;
        const x = s.x + px * s.z;
        const twinkle = reduced ? 0.85 : 0.6 + 0.4 * Math.sin(now * 0.001 * s.speed + s.phase);
        // near stars stretch the most; long streaks fade so a fast scroll reads as speed, not rain
        const streak = Math.max(-80, Math.min(80, warp * s.z * s.z * 1.2));
        ctx.globalAlpha = (0.22 + s.z * 0.78) * twinkle * (1 - Math.min(Math.abs(streak) / 160, 0.55));

        if (Math.abs(streak) > 1.5) {
          ctx.strokeStyle = TINTS[s.tint];
          ctx.lineWidth = Math.max(0.6, s.r * 1.3);
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + streak);
          ctx.stroke();
        } else {
          ctx.fillStyle = TINTS[s.tint];
          ctx.beginPath();
          ctx.arc(x, y, s.r, 0, TAU);
          ctx.fill();
        }
      }

      if (shooter) {
        shooter.age += dt;
        const p = shooter.age / shooter.ttl;
        if (p >= 1) {
          shooter = null;
        } else {
          const hx = shooter.x + shooter.vx * shooter.age;
          const hy = shooter.y + shooter.vy * shooter.age;
          const len = 150;
          const sp = Math.hypot(shooter.vx, shooter.vy);
          const ex = hx - (shooter.vx / sp) * len;
          const ey = hy - (shooter.vy / sp) * len;
          const g = ctx.createLinearGradient(hx, hy, ex, ey);
          g.addColorStop(0, 'rgba(255,255,255,0.95)');
          g.addColorStop(0.25, 'rgba(139,233,255,0.5)');
          g.addColorStop(1, 'rgba(106,166,255,0)');
          ctx.globalAlpha = Math.sin(p * Math.PI);
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(hx, hy);
          ctx.lineTo(ex, ey);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(64, now - lastT);
      lastT = now;

      const scroll = window.scrollY;
      const speed = Math.max(-90, Math.min(90, (scroll - lastScroll) / Math.max(dt / 16.7, 0.5)));
      lastScroll = scroll;
      warp += (speed - warp) * 0.22;
      if (Math.abs(warp) < 0.05) warp = 0;
      px += (tx - px) * 0.04;
      py += (ty - py) * 0.04;

      if (!shooter && now > nextShot) {
        const ltr = Math.random() < 0.5;
        shooter = {
          x: ltr ? Math.random() * w * 0.5 : w * (0.5 + Math.random() * 0.5),
          y: Math.random() * h * 0.4,
          vx: (ltr ? 1 : -1) * (0.75 + Math.random() * 0.45),
          vy: 0.3 + Math.random() * 0.25,
          age: 0,
          ttl: 900 + Math.random() * 600,
        };
        nextShot = now + 6000 + Math.random() * 8000;
      }

      // Idle sky only needs ~30fps; anything moving gets every frame
      const busy = Math.abs(warp) > 0.3 || shooter || Math.abs(tx - px) > 0.3 || Math.abs(ty - py) > 0.3;
      if (!busy && frame++ % 2) return;
      draw(now, dt);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const nw = window.innerWidth;
      const nh = window.innerHeight;
      if (stars.length && Math.abs(nw - w) < 40) {
        // Mobile URL bar showing/hiding — stretch, don't reshuffle
        const k = nh / h;
        stars.forEach((s) => (s.y *= k));
        w = nw;
        h = nh;
      } else {
        w = nw;
        h = nh;
        seed();
      }
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) draw(performance.now(), 0);
    };

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      tx = (e.clientX / w - 0.5) * -28;
      ty = (e.clientY / h - 0.5) * -18;
    };

    resize();
    window.addEventListener('resize', resize);
    if (!reduced) {
      window.addEventListener('pointermove', onPointer, { passive: true });
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
    };
  }, []);

  return <canvas ref={ref} className="starfield pointer-events-none fixed inset-0 -z-10" aria-hidden="true" />;
}
