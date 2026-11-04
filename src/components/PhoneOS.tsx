import { forwardRef, useCallback, useImperativeHandle, useLayoutEffect, useRef, useState, type ComponentType } from 'react';
import { Download, FileText, Github, Linkedin, Mail, Search, Smartphone, Sparkles } from 'lucide-react';
import portrait from '../assets/portrait.jpg';
import { FlightScreen, InspectScreen, RideScreen, StatusBar, TryOnScreen } from './mockups';
import { APP_LOOK, COLS, ICON, ICON_Y } from './apps';
import { profile, projects, type Project } from '../data';
import { easeInOut, lerp, smoothstep } from '../hooks';

// A tiny phone OS for the Work section — just the screen; the journey phone supplies the body.
// Whoever owns the motion (scroll, drag, taps) calls render(h, p) every frame; this turns that
// state into the home screen, the app-launch zoom and the app-switcher slide, writing styles
// directly — no re-renders per frame, only when the set of open app windows changes.

const SCREENS: Record<Project['id'], ComponentType> = {
  akbar: FlightScreen,
  tryware: TryOnScreen,
  buggy: RideScreen,
  appinspect: InspectScreen,
};

const DOCK = [
  { label: 'Résumé', href: profile.resume, Icon: FileText, bg: 'linear-gradient(150deg,#fafafa,#a1a1aa)', fg: '#18181b' },
  { label: 'GitHub', href: profile.github, Icon: Github, bg: 'linear-gradient(150deg,#52525b,#18181b)', fg: '#fff' },
  { label: 'LinkedIn', href: profile.linkedin, Icon: Linkedin, bg: 'linear-gradient(150deg,#3b82f6,#1e40af)', fg: '#fff' },
  { label: 'Email', href: `mailto:${profile.email}`, Icon: Mail, bg: 'linear-gradient(150deg,#7dd3fc,#6366f1)', fg: '#fff' },
];

export type PhoneOSHandle = { render: (h: number, p: number) => void };

type Props = { onLaunch: (i: number) => void; onHome: () => void };

const px = (v: number) => `${v.toFixed(2)}px`;

/** Which app windows need to exist for a given state */
const windowsFor = (h: number, p: number) => {
  if (h > 0.0005) return h < 0.9995 ? [Math.round(p)] : [];
  const k = Math.floor(p + 1e-6);
  return p - k > 0.0005 ? [k, k + 1] : [k];
};

const PhoneOS = forwardRef<PhoneOSHandle, Props>(function PhoneOS({ onLaunch, onHome }, ref) {
  const screen = useRef<HTMLDivElement>(null);
  const home = useRef<HTMLDivElement>(null);
  const homeUi = useRef<HTMLDivElement>(null);
  const homeBtn = useRef<HTMLButtonElement>(null);
  const icons = useRef<(HTMLButtonElement | null)[]>([]);
  const wins = useRef<(HTMLDivElement | null)[]>([]);
  const size = useRef({ W: 280, H: 580 });
  const st = useRef({ h: 1, p: 0, painted: false });
  const reduced = useRef(false);
  const shownKey = useRef('');
  const [shown, setShown] = useState<number[]>([]);

  const paintWindow = useCallback((i: number, el: HTMLDivElement) => {
    const { h, p } = st.current;
    const { W, H } = size.current;
    const R = 0.139 * W; // the screen's own corner radius
    let transform = 'none';
    let clip = 'none';
    let opacity = 1;
    let face = 0;

    if (h > 0.0005) {
      // Launch / close: the window grows out of its icon, wearing the icon's face at first
      const e = easeInOut(1 - h);
      if (reduced.current) opacity = e;
      else {
        const cx = COLS[i] * W;
        const cy = ICON_Y * H;
        transform = `translate3d(${px((cx - W / 2) * (1 - e))}, ${px((cy - H / 2) * (1 - e))}, 0) scale(${lerp(ICON, 1, e).toFixed(4)})`;
        clip = `inset(${px(((H - W) / 2) * (1 - e))} 0 round ${px(lerp(0.225 * W, R, e))})`;
        face = 1 - smoothstep(0.1, 0.5, e);
      }
    } else {
      // App switcher: both cards dip in scale and slide past each other
      const k = Math.floor(p + 1e-6);
      const e = easeInOut(Math.min(1, Math.max(0, p - k)));
      if (reduced.current) opacity = i === k ? 1 - e : e;
      else {
        const s = 1 - 0.13 * Math.sin(Math.PI * e);
        const d = s * W + 0.06 * W;
        transform = `translate3d(${px(i === k ? -e * d : (1 - e) * d)}, 0, 0) scale(${s.toFixed(4)})`;
        clip = `inset(0 round ${px(R / s)})`;
      }
    }

    el.style.transform = transform;
    el.style.clipPath = clip;
    el.style.opacity = opacity.toFixed(3);
    const faceEl = el.lastElementChild as HTMLElement | null;
    if (faceEl) faceEl.style.opacity = face.toFixed(3);
  }, []);

  const paint = useCallback(() => {
    const { h, p } = st.current;
    const open = 1 - h;
    if (home.current) {
      home.current.style.transform = reduced.current || open < 0.001 ? '' : `scale(${1 + 0.07 * open})`;
      home.current.style.filter = open < 0.001 ? '' : `blur(${(open * 6).toFixed(2)}px) brightness(${(1 - open * 0.5).toFixed(3)})`;
    }
    if (homeUi.current) {
      homeUi.current.style.opacity = String(smoothstep(0.3, 1, h));
      homeUi.current.toggleAttribute('inert', h < 0.9);
    }
    const launching = h < 0.9995 ? Math.round(p) : -1;
    icons.current.forEach((ic, i) => {
      if (ic) ic.style.visibility = i === launching ? 'hidden' : '';
    });
    wins.current.forEach((el, i) => {
      if (el) paintWindow(i, el);
    });
    homeBtn.current?.toggleAttribute('inert', h > 0.5);
  }, [paintWindow]);

  useImperativeHandle(
    ref,
    () => ({
      render(h, p) {
        const s = st.current;
        if (s.painted && h === s.h && p === s.p) return;
        s.h = h;
        s.p = p;
        s.painted = true;
        const need = windowsFor(h, p);
        const key = need.join(',');
        if (key !== shownKey.current) {
          shownKey.current = key;
          setShown(need);
        }
        paint();
      },
    }),
    [paint]
  );

  useLayoutEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = screen.current;
    if (!el) return;
    const measure = () => {
      size.current = { W: el.offsetWidth, H: el.offsetHeight };
      paint();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [paint]);

  const setWin = (i: number) => (el: HTMLDivElement | null) => {
    wins.current[i] = el;
    if (el) paintWindow(i, el);
  };

  return (
    <div ref={screen} className="absolute inset-0" role="group" aria-label="Phone showing my apps">
      <div ref={home} className="os-home">
        <div className="os-wall" />
        <div ref={homeUi} className="absolute inset-0">
          <StatusBar />

          <div className="os-card absolute flex items-center gap-[0.75em] px-[0.85em]" style={{ top: '8.2%', left: '5.5%', right: '5.5%', height: '13.4%' }}>
            <img src={portrait} alt="" draggable={false} className="h-[3.2em] w-[3.2em] shrink-0 rounded-full object-cover object-[50%_20%] ring-1 ring-white/20" />
            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate text-[1.02em] font-semibold text-white">{profile.name}</div>
              <div className="truncate text-[0.74em] text-white/55">{profile.role}</div>
              <div className="mt-[0.5em] flex items-center gap-[0.45em] text-[0.7em] text-[#86efac]">
                <span className="live-dot !h-[0.55em] !w-[0.55em]" /> Open to new roles
              </div>
            </div>
          </div>

          {projects.map((pr, i) => {
            const look = APP_LOOK[pr.id];
            return (
              <button
                key={pr.id}
                ref={(n) => {
                  icons.current[i] = n;
                }}
                type="button"
                className="os-icon"
                style={{ left: `${COLS[i] * 100}%`, top: `${ICON_Y * 100}%`, width: `${ICON * 100}%` }}
                onClick={() => onLaunch(i)}
                aria-label={`Open ${pr.name}`}
              >
                <span className="os-tile" style={{ background: look.icon }}>
                  <look.Glyph strokeWidth={1.9} />
                </span>
                <span className="os-label">{look.label}</span>
              </button>
            );
          })}

          <div className="absolute grid grid-cols-2 gap-[4%]" style={{ top: '42.6%', left: '5.5%', right: '5.5%' }}>
            <div className="os-card flex aspect-square flex-col justify-between p-[0.95em]" style={{ background: 'radial-gradient(120% 90% at 100% 0%, rgba(79,140,255,0.4), rgba(255,255,255,0.05) 60%)' }}>
              <Download size="1.25em" className="text-[#9cc3ff]" />
              <div>
                <div className="text-[2.1em] font-semibold leading-none tracking-[-0.04em] text-white">1M+</div>
                <div className="mt-[0.35em] text-[0.68em] leading-snug text-white/60">downloads · Akbar Travels</div>
              </div>
            </div>
            <div className="os-card flex aspect-square flex-col justify-between p-[0.95em]" style={{ background: 'radial-gradient(120% 90% at 100% 0%, rgba(45,212,191,0.36), rgba(255,255,255,0.05) 60%)' }}>
              <Smartphone size="1.25em" className="text-[#99f6e4]" />
              <div>
                <div className="text-[2.1em] font-semibold leading-none tracking-[-0.04em] text-white">3.5+</div>
                <div className="mt-[0.35em] text-[0.68em] leading-snug text-white/60">years shipping Flutter</div>
              </div>
            </div>
          </div>

          <div className="os-card absolute flex items-center gap-[0.7em] px-[0.85em]" style={{ top: '64.4%', left: '5.5%', right: '5.5%', height: '9.6%' }}>
            <span className="flex h-[2.2em] w-[2.2em] shrink-0 items-center justify-center rounded-[0.7em]" style={{ background: 'var(--grad)' }}>
              <Sparkles size="1.1em" className="text-[#0b0b0e]" />
            </span>
            <div className="min-w-0 leading-tight">
              <div className="text-[0.62em] uppercase tracking-[0.14em] text-white/45">Now exploring</div>
              <div className="truncate text-[0.86em] text-white">LLM agents & RAG in apps</div>
            </div>
          </div>

          <div className="absolute left-1/2 top-[78.2%] flex -translate-x-1/2 items-center gap-[0.35em] rounded-full bg-white/[0.12] px-[0.85em] py-[0.3em] text-[0.7em] text-white/75">
            <Search size="1em" /> Search
          </div>

          <div className="absolute inset-x-[3.5%] bottom-[2.4%] flex h-[12.2%] items-center justify-around rounded-[2em] border border-white/[0.08] bg-white/[0.09] px-[3%]">
            {DOCK.map(({ label, href, Icon, bg, fg }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={label}
                draggable={false}
                className="os-tile !w-[18.3%] !h-auto aspect-square"
                style={{ background: bg, color: fg }}
              >
                <Icon strokeWidth={1.9} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {shown.map((i) => {
        const pr = projects[i];
        const Screen = SCREENS[pr.id];
        const look = APP_LOOK[pr.id];
        return (
          <div key={pr.id} ref={setWin(i)} className="os-window" aria-hidden="true">
            <Screen />
            <div className="os-face" style={{ background: look.icon }}>
              <look.Glyph strokeWidth={1.6} />
            </div>
          </div>
        );
      })}

      <button ref={homeBtn} type="button" className="os-homebar" onClick={onHome} aria-label="Back to the home screen" />
    </div>
  );
});

export default PhoneOS;
