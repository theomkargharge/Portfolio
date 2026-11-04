import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent, type PointerEvent, type ReactNode, type RefObject } from 'react';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, CreditCard, Download, FileJson, Hand, Home, Lock, Timer, Wand2 } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { Station } from './JourneyPhone';
import { InspectBubble, RideRequestCard } from './mockups';
import { APP_LOOK, PhoneMotion, accentAt } from './apps';
import { projects, type Project } from '../data';
import { clamp, useMediaQuery } from '../hooks';
import { workLink } from '../journey';

const N = projects.length;
const RGBS = projects.map((p) => APP_LOOK[p.id].rgb);
const HOME_ACCENT = { '--accent': '139 123 255' } as CSSProperties;

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */

function FloatChip({ icon, children, delay = '0s' }: { icon: ReactNode; children: ReactNode; delay?: string }) {
  return (
    <div
      className="float-y flex w-fit items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-[#0f0f13]/85 py-1.5 pl-1.5 pr-3.5 text-[12.5px] text-fg shadow-[0_16px_40px_-16px_rgba(0,0,0,0.9)] backdrop-blur-xl"
      style={{ animationDelay: delay }}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.07]">{icon}</span>
      {children}
    </div>
  );
}

/* Little extras that pop out beside the phone while their app is open (xl screens) */
function Widgets({ active }: { active: number }) {
  return (
    <>
      {projects.map((p, i) => {
        const a = APP_LOOK[p.id].accent;
        const chip = (Icon: typeof Lock, text: string, delay?: string) => (
          <FloatChip icon={<Icon size={13} style={{ color: a }} />} delay={delay}>
            {text}
          </FloatChip>
        );
        const [left, right] = {
          akbar: [chip(Download, '1M+ downloads'), chip(CreditCard, 'Razorpay · Tamara · Tabby', '-2s')],
          tryware: [chip(Wand2, 'gpt-image · SD + HD'), chip(Lock, 'Row-locked credits', '-2s')],
          buggy: [
            chip(Timer, '−40% response time'),
            <div key="ride" className="float-y" style={{ animationDelay: '-2s' }}>
              <RideRequestCard />
            </div>,
          ],
          appinspect: [
            <div key="bubble" className="float-y">
              <InspectBubble />
            </div>,
            chip(FileJson, 'cURL · HAR · Postman', '-2s'),
          ],
        }[p.id];
        const on = active === i ? 'is-on' : '';
        return (
          <div key={p.id} className="hidden xl:block" aria-hidden="true">
            <div className={`app-widget app-widget--left ${on}`}>{left}</div>
            <div className={`app-widget app-widget--right ${on}`}>{right}</div>
          </div>
        );
      })}
    </>
  );
}

function Intro({ onPick, touch = false }: { onPick: (i: number) => void; touch?: boolean }) {
  return (
    <div className="w-full max-w-[30rem]">
      <div className="eyebrow">{N} apps · one pocket</div>
      <h3 className="mt-5 text-[clamp(30px,3.2vw,42px)] font-semibold leading-[1.06] tracking-[-0.04em] text-fg">
        {touch ? 'Tap an app to open it' : 'Scroll to open each app'}
        <span className="serif-accent mt-1 block text-[1.05em] tracking-[-0.01em] text-fg-2">{touch ? 'or swipe the phone.' : 'or drag the phone.'}</span>
      </h3>
      <p className="mt-5 text-[15.5px] leading-[1.7] text-fg-2">
        Each screen is an animated mock-up of the real product — flight search, GenAI try-on, live ride tracking and an in-app network
        inspector.
      </p>
      <ol className="mt-8 border-t border-white/[0.07]">
        {projects.map((p, i) => {
          const look = APP_LOOK[p.id];
          return (
            <li key={p.id}>
              <button type="button" onClick={() => onPick(i)} className="group flex w-full items-center gap-4 border-b border-white/[0.07] py-3.5 text-left">
                <span className="w-6 font-mono text-[12px] text-fg-3">{p.index}</span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]" style={{ background: look.icon }}>
                  <look.Glyph size={16} strokeWidth={2} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-medium tracking-[-0.01em] text-fg">{p.name}</span>
                  <span className="block truncate text-[13px] text-fg-3">{p.tagline}</span>
                </span>
                <ArrowRight size={15} className="shrink-0 text-fg-3 transition-all duration-300 group-hover:translate-x-1 group-hover:text-fg" />
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ProjectInfo({ project }: { project: Project }) {
  const accent = APP_LOOK[project.id].accent;
  return (
    <article className="w-full">
      <div className="flex items-center justify-between gap-4">
        <span className="eyebrow">
          <span className="text-fg-2">{project.index}</span> · {project.category}
        </span>
        <span className="eyebrow hidden sm:inline">{project.period}</span>
      </div>

      <h3 className="mt-6 text-[clamp(32px,3.6vw,46px)] font-semibold leading-[1.02] tracking-[-0.04em] text-fg">
        {project.name}
        <span className="serif-accent mt-1 block text-[0.92em] tracking-[-0.01em]" style={{ color: accent }}>
          {project.tagline}
        </span>
      </h3>
      <div className="mt-3 text-[13.5px] text-fg-3">
        {project.org}
        <span className="sm:hidden"> · {project.period}</span>
      </div>

      <p className="mt-6 text-[16px] leading-[1.7] text-fg-2">{project.summary}</p>

      <div className={`mt-8 grid border-y border-white/[0.07] ${project.metrics.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {project.metrics.map((m, i) => (
          <div key={m.label} className={`py-4 ${i > 0 ? 'border-l border-white/[0.07] pl-4 sm:pl-5' : ''}`}>
            <div className="text-[clamp(18px,2vw,24px)] font-semibold tracking-[-0.03em] text-fg">{m.value}</div>
            <div className="mt-0.5 text-[12.5px] text-fg-3">{m.label}</div>
          </div>
        ))}
      </div>

      <ul className="mt-7 space-y-3.5">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-3.5 text-[14.5px] leading-[1.65] text-fg-2">
            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent, boxShadow: `0 0 10px ${accent}` }} />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span key={s} className="chip">
            {s}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 pt-9">
        {project.links.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="btn btn-ghost !h-10 !px-4 !text-[13.5px]">
            {l.label} <ArrowUpRight size={14} className="arrow arrow-up text-fg-3" />
          </a>
        ))}
      </div>
    </article>
  );
}

/* Horizontal drag on the phone → scrub between apps; a flick carries on to the next one */
function useDrag(motion: PhoneMotion, width: () => number, onRelease?: (target: number) => void) {
  const g = useRef<{ id: number; x: number; y: number; q0: number; lastX: number; lastT: number; v: number; on: boolean } | null>(null);
  const swallowClick = useRef(false);

  const end = (e: PointerEvent<HTMLDivElement>) => {
    const s = g.current;
    if (!s || s.id !== e.pointerId) return;
    g.current = null;
    if (!s.on) return;
    // the pointerup that ends a drag shouldn't also tap whatever icon is underneath
    swallowClick.current = true;
    setTimeout(() => (swallowClick.current = false), 0);
    onRelease?.(motion.dragEnd());
  };

  return {
    onPointerDown: (e: PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0) return;
      g.current = { id: e.pointerId, x: e.clientX, y: e.clientY, q0: 0, lastX: e.clientX, lastT: e.timeStamp, v: 0, on: false };
    },
    onPointerMove: (e: PointerEvent<HTMLDivElement>) => {
      const s = g.current;
      if (!s || s.id !== e.pointerId) return;
      if (!s.on) {
        const dx = e.clientX - s.x;
        if (Math.abs(dx) < 7) return;
        if (Math.abs(e.clientY - s.y) > Math.abs(dx)) {
          g.current = null; // a vertical gesture — leave it to the page
          return;
        }
        s.on = true;
        s.x = e.clientX;
        motion.dragStart();
        s.q0 = motion.q;
        e.currentTarget.setPointerCapture(e.pointerId);
      }
      const w = width();
      const dt = Math.max(8, e.timeStamp - s.lastT) / 1000;
      s.v = s.v * 0.5 + (-(e.clientX - s.lastX) / w / dt) * 0.5;
      s.lastX = e.clientX;
      s.lastT = e.timeStamp;
      motion.dragTo(s.q0 - (e.clientX - s.x) / w, s.v);
    },
    onPointerUp: end,
    onPointerCancel: end,
    onClickCapture: (e: MouseEvent) => {
      if (!swallowClick.current) return;
      e.preventDefault();
      e.stopPropagation();
    },
    onDragStart: (e: MouseEvent) => e.preventDefault(),
  };
}

/* ------------------------------------------------------------------ */
/* Desktop: the phone sticks while the story scrolls past it           */
/* ------------------------------------------------------------------ */

function Rail({ active, onPick, thumb }: { active: number; onPick: (q: number) => void; thumb: RefObject<HTMLDivElement> }) {
  return (
    <div className="relative flex items-center gap-1 rounded-full border border-white/[0.08] bg-[#0b0b0e]/70 p-1 backdrop-blur-md">
      <div ref={thumb} className="rail-thumb" aria-hidden="true" />
      {[-1, ...projects.map((_, i) => i)].map((q) => (
        <button
          key={q}
          type="button"
          onClick={() => onPick(q)}
          aria-label={q < 0 ? 'Home screen' : `Open ${projects[q].name}`}
          aria-current={active === q ? 'step' : undefined}
          className={`relative z-10 flex h-8 w-11 items-center justify-center rounded-full font-mono text-[11.5px] transition-colors duration-300 ${
            active === q ? 'text-fg' : 'text-fg-3 hover:text-fg-2'
          }`}
        >
          {q < 0 ? <Home size={13} /> : projects[q].index}
        </button>
      ))}
    </div>
  );
}

function ScrollShowcase() {
  const [motion] = useState(() => new PhoneMotion(N));
  const root = useRef<HTMLDivElement>(null);
  const phoneBox = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLDivElement>(null);
  const steps = useRef<(HTMLDivElement | null)[]>([]);
  // While we scroll the page to a picked app, hold the phone on that app
  const lock = useRef<{ q: number; at: number } | null>(null);
  const [active, setActive] = useState(-1);

  const scrollToStep = useCallback((q: number) => {
    const el = steps.current[q + 1];
    if (!el) return;
    const r = el.getBoundingClientRect();
    lock.current = { q, at: performance.now() };
    window.scrollTo({ top: window.scrollY + r.top + r.height / 2 - window.innerHeight / 2, behavior: 'smooth' });
  }, []);

  const pick = useCallback(
    (q: number) => {
      if (q < 0) motion.goHome();
      else motion.launch(q);
      scrollToStep(q);
    },
    [motion, scrollToStep]
  );

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let raf = 0;
    let last = performance.now();
    let act = -1;

    // Where the page scroll puts the phone: each story block's centre is one app, and the
    // switch happens over the middle of the gap between two blocks so each app rests a while
    const fromScroll = () => {
      const mid = window.innerHeight / 2;
      const c = steps.current.map((s) => {
        const r = s?.getBoundingClientRect();
        return r ? r.top + r.height / 2 : 0;
      });
      if (mid <= c[0]) return -1;
      for (let i = 0; i < c.length - 1; i++) {
        if (mid < c[i + 1]) return i - 1 + clamp(((mid - c[i]) / (c[i + 1] - c[i]) - 0.22) / 0.56, 0, 1);
      }
      return c.length - 2;
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const sq = fromScroll();
      const l = lock.current;
      if (l && (Math.abs(sq - l.q) < 0.01 || now - l.at > 1800)) lock.current = null;
      if (!motion.dragging && !motion.direct) motion.target = lock.current ? lock.current.q : sq;
      motion.step(dt, 220);

      const { h, p } = motion.state;
      workLink.h = h;
      workLink.p = p;
      workLink.vel = motion.velocity;
      el.style.setProperty('--accent', accentAt(RGBS, h, p));
      if (thumb.current) thumb.current.style.transform = `translateX(${(p + (-1 - p) * h + 1) * 48}px)`;
      const a = h > 0.5 ? -1 : Math.round(p);
      if (a !== act) {
        act = a;
        setActive(a);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(raf);
        raf = 0;
        if (entry.isIntersecting) {
          last = performance.now();
          raf = requestAnimationFrame(loop);
        }
      },
      { rootMargin: '100px 0px' }
    );
    io.observe(el);

    // The reader taking the wheel cancels any hold
    const release = (e: Event) => {
      if (!(e.target instanceof Node && el.contains(e.target))) lock.current = null;
    };
    window.addEventListener('wheel', release, { passive: true });
    window.addEventListener('touchmove', release, { passive: true });
    window.addEventListener('keydown', release);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('wheel', release);
      window.removeEventListener('touchmove', release);
      window.removeEventListener('keydown', release);
    };
  }, [motion]);

  const drag = useDrag(motion, () => phoneBox.current?.offsetWidth ?? 300, scrollToStep);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    pick(clamp(active + (e.key === 'ArrowRight' ? 1 : -1), -1, N - 1));
  };

  // The journey phone is the one people touch; hand it this showcase's controls
  useEffect(() => {
    workLink.launch = pick;
    workLink.home = () => pick(-1);
    workLink.handlers = { ...drag, onKeyDown: onKey };
  });

  return (
    <div ref={root} className="grid grid-cols-2 gap-12 xl:gap-20" style={HOME_ACCENT}>
      <div>
        <div
          ref={(n) => {
            steps.current[0] = n;
          }}
          className={`story-step flex min-h-[78vh] items-center ${active === -1 ? 'is-active' : ''}`}
        >
          <Intro onPick={pick} />
        </div>
        {projects.map((p, i) => (
          <div
            key={p.id}
            ref={(n) => {
              steps.current[i + 1] = n;
            }}
            className={`story-step flex min-h-screen items-center py-16 ${active === i ? 'is-active' : ''}`}
          >
            <ProjectInfo project={p} />
          </div>
        ))}
      </div>

      <div className="relative">
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-7 pt-10">
          <div className="showcase-glow" aria-hidden="true" />
          <div ref={phoneBox} className="relative">
            <Station id="work" sticky className="showcase-phone" />
            <Widgets active={active} />
          </div>
          <Rail active={active} onPick={pick} thumb={thumb} />
          <div className="flex items-center gap-2 text-[12.5px] text-fg-3">
            <Hand size={14} /> Scroll, or drag the phone sideways
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Touch screens: swipe the phone, tap the icons                       */
/* ------------------------------------------------------------------ */

function SwipeShowcase() {
  const [motion] = useState(() => new PhoneMotion(N));
  const root = useRef<HTMLDivElement>(null);
  const phoneBox = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const [active, setActive] = useState(-1);

  const go = useCallback(
    (q: number) => {
      touched.current = true;
      if (q < 0) motion.goHome();
      else motion.launch(q);
    },
    [motion]
  );

  useEffect(() => {
    const el = root.current;
    const box = phoneBox.current;
    if (!el || !box) return;
    let raf = 0;
    let last = performance.now();
    let act = -1;
    let timer = 0;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      motion.step(dt, 150);
      const { h, p } = motion.state;
      workLink.h = h;
      workLink.p = p;
      workLink.vel = motion.velocity;
      el.style.setProperty('--accent', accentAt(RGBS, h, p));
      const a = h > 0.5 ? -1 : Math.round(p);
      if (a !== act) {
        act = a;
        setActive(a);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(raf);
        raf = 0;
        if (entry.isIntersecting) {
          last = performance.now();
          raf = requestAnimationFrame(loop);
        }
      },
      { rootMargin: '100px 0px' }
    );
    io.observe(el);

    // The first time the phone is properly in view, open the first app by itself
    const intro = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        intro.disconnect();
        timer = window.setTimeout(() => {
          if (!touched.current) motion.launch(0);
        }, 700);
      },
      { threshold: 0.6 }
    );
    intro.observe(box);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      io.disconnect();
      intro.disconnect();
    };
  }, [motion]);

  const drag = useDrag(
    motion,
    () => phoneBox.current?.offsetWidth ?? 260,
    () => {
      touched.current = true;
    }
  );

  useEffect(() => {
    workLink.launch = go;
    workLink.home = () => go(-1);
    workLink.handlers = drag;
  });

  return (
    <div ref={root} style={HOME_ACCENT}>
      <div className="relative flex justify-center pt-2">
        <div className="showcase-glow" aria-hidden="true" />
        <div ref={phoneBox} className="relative">
          <Station id="work" className="showcase-phone--touch" />
        </div>
      </div>

      <div className="mt-7 flex items-center justify-center gap-3">
        <button type="button" onClick={() => go(active - 1)} disabled={active < 0} aria-label="Previous app" className="ctl-btn">
          <ChevronLeft size={18} />
        </button>
        <div className="flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-2">
          {[-1, ...projects.map((_, i) => i)].map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => go(q)}
              aria-label={q < 0 ? 'Home screen' : `Open ${projects[q].name}`}
              aria-current={active === q ? 'step' : undefined}
              className={`dot ${q < 0 ? 'dot--home' : ''} ${active === q ? 'is-on' : ''}`}
            />
          ))}
        </div>
        <button type="button" onClick={() => go(active + 1)} disabled={active >= N - 1} aria-label="Next app" className="ctl-btn">
          <ChevronRight size={18} />
        </button>
      </div>
      <p className="mt-3 flex items-center justify-center gap-2 text-[12.5px] text-fg-3">
        <Hand size={14} /> Swipe the phone, or tap an app
      </p>

      <div key={active} className="swap-in mt-12">
        {active < 0 ? <Intro touch onPick={go} /> : <ProjectInfo project={projects[active]} />}
      </div>
    </div>
  );
}

export default function Projects() {
  const desktop = useMediaQuery('(min-width: 1024px)');
  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          index="01"
          label="Selected work"
          title={
            <>
              Apps in real hands, <span className="serif-accent text-fg-2">not just repos.</span>
            </>
          }
          aside="Four apps live on the App Store and Google Play — from a travel platform with a million downloads to a GenAI product I built solo — plus an open-source Flutter package on pub.dev."
        />
        {desktop ? <ScrollShowcase /> : <SwipeShowcase />}
      </div>
    </section>
  );
}
