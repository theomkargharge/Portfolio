import { useEffect, useRef, useState, type CSSProperties, type DragEvent, type KeyboardEvent, type MouseEvent, type PointerEvent as PointerEv } from 'react';
import { CareerScreen, ChatScreen, ComposeScreen, ProfileScreen } from './mockups';
import PhoneOS, { type PhoneOSHandle } from './PhoneOS';
import { workLink, type PhoneHandlers, type StationId } from '../journey';
import { clamp, easeInOut, lerp } from '../hooks';

// One phone, the whole way down. Each section marks a stop with <Station>; the phone docks on
// whichever stop is near the middle of the screen and, between stops, flies on to the next —
// resizing to it, banking as it goes and flipping over (back glass and all) to change screens.
// It spirals into the tech galaxy and back out, and finally lands on the planet in Contact.
// On small screens it tucks into a corner between stops instead of riding across the text.

const BASE = 300; // drawn at this width, then scaled to each stop
const FLIP = 0.8; // seconds for one flip
const PARK = 58; // width of the tucked-away phone on small screens

type Pose = { rx: number; ry: number; rz: number; alpha: number };
const POSES: Record<StationId, Pose> = {
  hero: { rx: 0, ry: 0, rz: 0, alpha: 1 },
  work: { rx: 0, ry: 0, rz: 0, alpha: 1 },
  career: { rx: 2, ry: -12, rz: 0, alpha: 1 },
  galaxy: { rx: 0, ry: 0, rz: 0, alpha: 0 },
  about: { rx: 3, ry: -16, rz: 7, alpha: 1 },
  contact: { rx: 0, ry: 0, rz: 0, alpha: 1 },
};
const LIVE: StationId[] = ['work', 'contact']; // stops where the phone can be used

/** Where the journey phone should stop — an empty box the size of the phone */
export function Station({ id, sticky = false, className = '' }: { id: StationId; sticky?: boolean; className?: string }) {
  return <div data-station={id} data-sticky={sticky || undefined} className={`station ${className}`} aria-hidden="true" />;
}

type Stop = { id: StationId; x: number; y: number; w: number; sticky: boolean };

export default function JourneyPhone() {
  const root = useRef<HTMLDivElement>(null);
  const spin = useRef<HTMLDivElement>(null);
  const os = useRef<PhoneOSHandle>(null);
  const [screen, setScreen] = useState<StationId>('hero');
  const [live, setLive] = useState<StationId | null>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = root.current;
    const sp = spin.current;
    if (!el || !sp) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;

    let raf = 0;
    let marks: HTMLElement[] = [];
    let stale = true;
    let started = false;
    let shown: StationId = 'hero';
    let flip: { t0: number; to: StationId; dir: number; swapped: boolean } | null = null;
    let liveNow: StationId | null = null;
    let position = '';
    let lastY = window.scrollY;
    let dir = 1;
    let goalX = 0;
    let goalY = 0;
    let tiltX = 0;
    let tiltY = 0;
    let lean = 0;

    const watch = new MutationObserver(() => (stale = true));
    watch.observe(document.body, { childList: true, subtree: true });

    const onPointer = (e: PointerEvent) => {
      goalY = (e.clientX / window.innerWidth - 0.5) * 12;
      goalX = (e.clientY / window.innerHeight - 0.5) * -8;
    };
    if (fine && !reduced) window.addEventListener('pointermove', onPointer, { passive: true });

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      // wait for the galaxy intro to hand over
      if (document.documentElement.classList.contains('is-splashing')) return;

      if (stale) {
        marks = [...document.querySelectorAll<HTMLElement>('[data-station]')];
        stale = false;
      }
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const stops: Stop[] = [];
      for (const m of marks) {
        const r = m.getBoundingClientRect();
        if (r.width === 0) continue; // not used at this screen size
        stops.push({ id: m.dataset.station as StationId, x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, sticky: m.dataset.sticky !== undefined });
      }
      if (!stops.length) return;

      const sy = window.scrollY;
      if (sy !== lastY) {
        dir = sy > lastY ? 1 : -1;
        lastY = sy;
      }

      // The two stops either side of the middle of the screen, and how far we are from one to the
      // other. Each stop holds the phone for a stretch of scroll before it sets off again.
      const focus = vh * 0.5;
      const hold = vh * 0.2;
      let i = -1;
      for (let k = 0; k < stops.length; k++) if (stops[k].y <= focus) i = k;
      const A = stops[Math.max(0, i)];
      const B = i < 0 || i === stops.length - 1 ? A : stops[i + 1];
      const gap = B.y - A.y;
      const lag = A === B ? 0 : Math.min(0.45, hold / gap);
      const u = A === B ? 0 : clamp(((focus - A.y) / gap - lag) / (1 - 2 * lag), 0, 1);
      const e = easeInOut(u);
      const swing = reduced ? 0 : Math.sin(Math.PI * e); // 0 at a stop, 1 mid-flight
      const pa = POSES[A.id];
      const pb = POSES[B.id];

      let x: number;
      let y: number;
      let w: number;
      let alpha: number;
      if (vw < 1024 && A !== B && gap > vh * 0.9) {
        // small screens: slip into the corner while the text goes by, come back for the next stop
        const left = Math.max(0, focus - A.y - lag * gap);
        const ahead = Math.max(0, B.y - focus - lag * gap);
        const span = vh * 0.4;
        const away = easeInOut(clamp(left / span, 0, 1));
        const back = easeInOut(clamp(1 - ahead / span, 0, 1));
        const px = vw - 14 - PARK / 2;
        const py = vh - 20 - (PARK * 19.2) / 9 / 2;
        x = lerp(lerp(A.x, px, away), B.x, back);
        y = lerp(lerp(A.y, py, away), B.y, back);
        w = lerp(lerp(A.w, PARK, away), B.w, back);
        alpha = lerp(lerp(pa.alpha, 1, away), pb.alpha, back);
      } else {
        // Between two stops on the right, swoop out through the right margin rather than across
        // the headings in between (a curve through a control point that puts it in that lane mid-flight)
        const contentRight = (vw + Math.min(vw, 1152)) / 2 - 24;
        const lane = Math.min(vw - (vw - contentRight) / 2, vw - 52);
        const outer = A !== B && A.x > vw * 0.5 && B.x > vw * 0.5 && !reduced;
        const c = outer ? 2 * lane - (A.x + B.x) / 2 : (A.x + B.x) / 2;
        x = (1 - e) * (1 - e) * A.x + 2 * (1 - e) * e * c + e * e * B.x;
        y = lerp(A.y, B.y, u); // an even glide down the screen
        // it pulls back to half size mid-flight, as if flying off and coming back in to land
        w = lerp(A.w, B.w, e) * (1 - 0.5 * swing);
        alpha = lerp(pa.alpha, pb.alpha, e);
      }

      // Attitude: the pose of each stop, plus a bank and a pitch while flying
      let rx = lerp(pa.rx, pb.rx, e) + swing * 9;
      let ry = lerp(pa.ry, pb.ry, e);
      let rz = lerp(pa.rz, pb.rz, e) + swing * 7 * Math.sign(B.x - A.x || 1);
      if (!reduced) {
        // the galaxy swallows it in a spiral and throws it back out the same way
        if (B.id === 'galaxy') rz += 600 * e * e;
        if (A.id === 'galaxy') rz -= 600 * (1 - e) * (1 - e);
      }
      const heroWeight = (A.id === 'hero' ? 1 - e : 0) + (B.id === 'hero' ? e : 0);
      tiltX += (goalX * heroWeight - tiltX) * 0.06;
      tiltY += (goalY * heroWeight - tiltY) * 0.06;
      rx += tiltX;
      ry += tiltY;
      const workWeight = (A.id === 'work' ? 1 - e : 0) + (B.id === 'work' ? e : 0);
      lean += ((reduced ? 0 : clamp(-workLink.vel * 9, -11, 11)) * workWeight - lean) * 0.14;
      ry += lean;

      // Which screen it should show; changing it means a flip, swapped while the back faces us
      const faceOf = (s: Stop, other: Stop) => (s.id === 'galaxy' ? other.id : s.id);
      const near = faceOf(A, B);
      const far = faceOf(B, A);
      const want = u > (shown === far ? 0.45 : 0.55) ? far : near;
      if (!started) {
        started = true;
        shown = want;
        setScreen(want);
        setEntered(true);
      } else if (!flip && want !== shown) {
        if (reduced) {
          shown = want;
          setScreen(want);
        } else flip = { t0: now, to: want, dir, swapped: false };
      }
      if (flip) {
        const p = clamp((now - flip.t0) / 1000 / FLIP, 0, 1);
        ry += 360 * easeInOut(p) * flip.dir;
        if (!flip.swapped && p >= 0.5) {
          flip.swapped = true;
          shown = flip.to;
          setScreen(flip.to);
        }
        if (p >= 1) flip = null;
      }
      if (shown === 'work') os.current?.render(workLink.h, workLink.p);

      // Docked and still: the phone can be used (and rides the page natively unless its stop is sticky)
      const docked = u === 0 ? A : u === 1 ? B : null;
      const usable = docked && !flip && LIVE.includes(docked.id) ? docked.id : null;
      if (usable !== liveNow) {
        liveNow = usable;
        setLive(usable);
        el.toggleAttribute('inert', !usable);
      }
      const pinned = !!docked && !docked.sticky;
      const mode = pinned ? 'absolute' : 'fixed';
      if (mode !== position) {
        position = mode;
        el.style.position = mode;
      }
      const ox = pinned ? window.scrollX : 0;
      const oy = pinned ? sy : 0;
      el.style.transform = `translate3d(${(x + ox).toFixed(2)}px, ${(y + oy).toFixed(2)}px, 0) translate(-50%, -50%) scale(${(w / BASE).toFixed(4)})`;
      el.style.opacity = alpha.toFixed(3);
      sp.style.transform = `perspective(1400px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg)`;
    };

    el.toggleAttribute('inert', true);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      watch.disconnect();
      window.removeEventListener('pointermove', onPointer);
    };
  }, []);

  // While docked in Work, drags, taps and keys on the phone drive that section's showcase
  const route: PhoneHandlers =
    live === 'work'
      ? {
          onPointerDown: (e: PointerEv<HTMLDivElement>) => workLink.handlers?.onPointerDown?.(e),
          onPointerMove: (e: PointerEv<HTMLDivElement>) => workLink.handlers?.onPointerMove?.(e),
          onPointerUp: (e: PointerEv<HTMLDivElement>) => workLink.handlers?.onPointerUp?.(e),
          onPointerCancel: (e: PointerEv<HTMLDivElement>) => workLink.handlers?.onPointerCancel?.(e),
          onClickCapture: (e: MouseEvent<HTMLDivElement>) => workLink.handlers?.onClickCapture?.(e),
          onDragStart: (e: DragEvent<HTMLDivElement>) => workLink.handlers?.onDragStart?.(e),
          onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => workLink.handlers?.onKeyDown?.(e),
        }
      : {};

  return (
    <div ref={root} className={`journey ${entered ? 'is-in' : ''} ${live ? `is-live is-live-${live}` : ''}`}>
      <div className="journey-enter">
        <div ref={spin} className="journey-spin">
          <div className="journey-front" {...route}>
            <div className="phone" style={{ '--pw': `${BASE}px` } as CSSProperties}>
              <div className="phone-screen">
                <div className="phone-island" />
                {screen === 'hero' && <ChatScreen />}
                {screen === 'work' && <PhoneOS ref={os} onLaunch={(i) => workLink.launch(i)} onHome={() => workLink.home()} />}
                {screen === 'career' && <CareerScreen />}
                {screen === 'about' && <ProfileScreen />}
                {screen === 'contact' && <ComposeScreen />}
              </div>
            </div>
          </div>
          <div className="journey-back" aria-hidden="true">
            <div className="back-cam">
              <i />
              <i />
              <i />
              <b />
            </div>
            <div className="back-logo">OG</div>
            <div className="back-caption">Designed in Pune · Built with Flutter</div>
          </div>
        </div>
      </div>
    </div>
  );
}
