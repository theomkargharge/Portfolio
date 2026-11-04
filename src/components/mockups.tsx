import { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeftRight,
  ArrowUp,
  BadgeCheck,
  BatteryFull,
  BedDouble,
  Briefcase,
  Bug,
  Check,
  ChevronLeft,
  Copy,
  FileCheck2,
  FileDown,
  Headphones,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Mic,
  Palmtree,
  Paperclip,
  Phone as PhoneIcon,
  Plane,
  Radar,
  Send,
  Share2,
  Shirt,
  Sparkles,
  Star,
  Wifi,
} from 'lucide-react';
import portrait from '../assets/portrait.jpg';
import { experience, profile, projects } from '../data';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function StatusBar() {
  return (
    <div className="relative z-10 flex h-[2.7em] shrink-0 items-end justify-between px-[1.9em] pb-[0.25em] text-[0.9em] font-semibold text-white">
      <span>9:41</span>
      <span className="flex items-center gap-[0.35em]">
        <span className="flex items-end gap-[0.12em]">
          {[0.35, 0.5, 0.65, 0.8].map((h) => (
            <span key={h} className="w-[0.2em] rounded-[1px] bg-white" style={{ height: `${h}em` }} />
          ))}
        </span>
        <Wifi size="1.05em" strokeWidth={2.6} />
        <BatteryFull size="1.35em" strokeWidth={2} />
      </span>
    </div>
  );
}

function HomeBar() {
  return <div className="mx-auto mb-[0.55em] mt-[0.35em] h-[0.3em] w-[36%] shrink-0 rounded-full bg-white/70" />;
}

/* ------------------------------------------------------------------ */
/* Hero — AI support chat (WebSocket bot with live-agent hand-off)     */
/* ------------------------------------------------------------------ */

const LAST_STEP = 7;

export function ChatScreen() {
  const [step, setStep] = useState(() => (prefersReducedMotion() ? LAST_STEP : 0));

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const wait = step === 0 ? 700 : step === LAST_STEP ? 4600 : step === 2 ? 1300 : 1500;
    const t = setTimeout(() => setStep((s) => (s >= LAST_STEP ? 0 : s + 1)), wait);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <div className="flex h-full flex-col bg-[#0c0c10]">
      <StatusBar />

      <div className="flex shrink-0 items-center gap-[0.7em] border-b border-white/[0.06] px-[1em] pb-[0.8em] pt-[0.6em]">
        <ChevronLeft size="1.4em" className="text-white/60" />
        <div className="relative flex h-[2.5em] w-[2.5em] items-center justify-center rounded-full" style={{ background: 'var(--grad)' }}>
          <Sparkles size="1.15em" className="text-[#0b0b0e]" />
          <span className="absolute bottom-0 right-0 h-[0.7em] w-[0.7em] rounded-full border-2 border-[#0c0c10] bg-[#4ade80]" />
        </div>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="text-[1.05em] font-semibold text-white">Trip Assistant</div>
          <div className="text-[0.78em] text-white/45">AI · live agents on standby</div>
        </div>
        <PhoneIcon size="1.15em" className="text-white/50" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-end gap-[0.55em] overflow-hidden px-[0.9em] pb-[0.7em]">
        <div className="mx-auto text-[0.72em] text-white/30">Today</div>
        <div className="max-w-[80%] rounded-[1.15em] rounded-bl-[0.35em] border border-white/[0.06] bg-[#17171d] px-[0.9em] py-[0.6em] text-[0.92em] leading-snug text-white/90">
          Hi there 👋 I can book, change or cancel trips, and fetch your tickets. What do you need?
        </div>

        {step >= 1 && (
          <div className="msg-in ml-auto max-w-[80%] rounded-[1.15em] rounded-br-[0.35em] px-[0.9em] py-[0.6em] text-[0.92em] leading-snug text-white" style={{ background: 'linear-gradient(135deg,#2563eb,#38bdf8)' }}>
            Cancel my Mumbai → Dubai flight on 14 Oct
          </div>
        )}

        {step === 2 && (
          <div className="msg-in typing flex w-fit items-center gap-[0.3em] rounded-[1.15em] rounded-bl-[0.35em] border border-white/[0.06] bg-[#17171d] px-[0.9em] py-[0.75em]">
            <span />
            <span />
            <span />
          </div>
        )}

        {step >= 3 && (
          <div className="msg-in max-w-[86%] rounded-[1.15em] rounded-bl-[0.35em] border border-white/[0.06] bg-[#17171d] p-[0.55em] text-[0.92em] text-white/90">
            <p className="px-[0.35em] pb-[0.5em] pt-[0.15em] leading-snug">Found it — booking AT-48219.</p>
            <div className="rounded-[0.8em] border border-white/[0.06] bg-[#0f0f13] p-[0.7em]">
              <div className="flex items-center justify-between">
                <span className="text-[1.25em] font-semibold tracking-tight text-white">BOM</span>
                <span className="mx-[0.5em] flex flex-1 items-center gap-[0.3em] text-white/30">
                  <span className="h-px flex-1 border-t border-dashed border-white/20" />
                  <Plane size="0.95em" className="text-[#8ec5ff]" />
                  <span className="h-px flex-1 border-t border-dashed border-white/20" />
                </span>
                <span className="text-[1.25em] font-semibold tracking-tight text-white">DXB</span>
              </div>
              <div className="mt-[0.15em] flex justify-between text-[0.75em] text-white/45">
                <span>06:10</span>
                <span>Tue, 14 Oct</span>
                <span>08:05</span>
              </div>
              <div className="mt-[0.6em] flex items-center justify-between border-t border-white/[0.06] pt-[0.55em] text-[0.8em]">
                <span className="text-white/50">Refund to card</span>
                <span className="font-semibold text-[#a7f3d0]">₹18,450</span>
              </div>
            </div>
          </div>
        )}

        {step >= 4 && (
          <div className="msg-in flex flex-wrap gap-[0.4em]">
            <span className="rounded-full border border-white/10 px-[0.8em] py-[0.4em] text-[0.8em] text-white/70">Confirm cancellation</span>
            <span
              className={`rounded-full border px-[0.8em] py-[0.4em] text-[0.8em] transition-colors duration-300 ${
                step >= 5 ? 'border-[#60a5fa]/60 bg-[#60a5fa]/15 text-white' : 'border-white/10 text-white/70'
              }`}
            >
              Talk to an agent
            </span>
          </div>
        )}

        {step >= 5 && (
          <div className="msg-in ml-auto max-w-[80%] rounded-[1.15em] rounded-br-[0.35em] px-[0.9em] py-[0.6em] text-[0.92em] leading-snug text-white" style={{ background: 'linear-gradient(135deg,#2563eb,#38bdf8)' }}>
            Talk to an agent
          </div>
        )}

        {step >= 6 && (
          <div className="msg-in mx-auto flex items-center gap-[0.5em] rounded-full border border-white/[0.07] bg-white/[0.03] px-[0.85em] py-[0.4em] text-[0.75em] text-white/60">
            {step === 6 ? (
              <>
                <span className="spin h-[0.9em] w-[0.9em] rounded-full border-[1.5px] border-white/20 border-t-white/80" />
                Connecting you to a live agent…
              </>
            ) : (
              <>
                <Headphones size="1.05em" className="text-[#4ade80]" />
                Riya from support joined
              </>
            )}
          </div>
        )}

        {step >= 7 && (
          <div className="msg-in max-w-[82%] rounded-[1.15em] rounded-bl-[0.35em] border border-white/[0.06] bg-[#17171d] px-[0.9em] py-[0.6em] text-[0.92em] leading-snug text-white/90">
            Hi! I’ve got your booking open — let’s sort this out.
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-[0.5em] px-[0.9em] pb-[0.2em]">
        <div className="flex h-[2.7em] flex-1 items-center justify-between rounded-full border border-white/[0.08] bg-[#15151a] px-[1em] text-[0.88em] text-white/35">
          Ask about a booking…
          <Mic size="1.1em" />
        </div>
        <div className="flex h-[2.7em] w-[2.7em] items-center justify-center rounded-full bg-white text-[#0b0b0e]">
          <Send size="1.1em" />
        </div>
      </div>
      <HomeBar />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Akbar Travels — flight search                                       */
/* ------------------------------------------------------------------ */

const flights = [
  { code: 'A', color: '#4f8cff', dep: '06:10', arr: '08:05', dur: '3h 25m · Non-stop', price: '₹14,820', tag: 'Cheapest' },
  { code: 'B', color: '#f59e0b', dep: '09:45', arr: '11:35', dur: '3h 20m · Non-stop', price: '₹16,240', tag: 'Fastest' },
  { code: 'C', color: '#ec4899', dep: '13:20', arr: '17:50', dur: '6h 00m · 1 stop', price: '₹13,990', tag: '' },
];

export function FlightScreen() {
  return (
    <div className="flex h-full flex-col bg-[#0b0d12]">
      <StatusBar />
      <div className="flex shrink-0 items-start justify-between px-[1.1em] pt-[0.7em]">
        <div>
          <div className="text-[1.55em] font-semibold tracking-tight text-white">Flights</div>
          <div className="text-[0.78em] text-white/45">One way · 1 adult · Economy</div>
        </div>
        <div className="h-[2.3em] w-[2.3em] overflow-hidden rounded-full ring-1 ring-white/15">
          <img src={portrait} alt="" className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="mx-[0.9em] mt-[0.9em] shrink-0 rounded-[1.2em] border border-white/[0.07] bg-[#131722] p-[0.9em]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[0.68em] tracking-[0.1em] text-white/40">FROM</div>
            <div className="text-[1.5em] font-semibold leading-none tracking-tight text-white">BOM</div>
            <div className="text-[0.75em] text-white/45">Mumbai</div>
          </div>
          <div className="flex h-[2.2em] w-[2.2em] items-center justify-center rounded-full border border-white/10 bg-[#1b2131] text-[#7fb0ff]">
            <ArrowLeftRight size="1em" />
          </div>
          <div className="text-right">
            <div className="text-[0.68em] tracking-[0.1em] text-white/40">TO</div>
            <div className="text-[1.5em] font-semibold leading-none tracking-tight text-white">DXB</div>
            <div className="text-[0.75em] text-white/45">Dubai</div>
          </div>
        </div>
        <div className="mt-[0.8em] grid grid-cols-2 border-t border-white/[0.06] pt-[0.7em] text-[0.8em]">
          <div>
            <div className="text-[0.85em] tracking-[0.1em] text-white/40">DEPART</div>
            <div className="text-white">Tue, 14 Oct</div>
          </div>
          <div className="text-right">
            <div className="text-[0.85em] tracking-[0.1em] text-white/40">TRAVELLERS</div>
            <div className="text-white">1 Adult</div>
          </div>
        </div>
        <div className="mt-[0.8em] flex h-[2.5em] items-center justify-center rounded-[0.8em] bg-[#4f8cff] text-[0.88em] font-semibold text-white">
          Search flights
        </div>
      </div>

      <div className="mt-[1em] flex shrink-0 items-baseline justify-between px-[1.1em]">
        <span className="text-[0.95em] font-semibold text-white">Best options</span>
        <span className="text-[0.72em] text-white/40">Sorted by price</span>
      </div>

      <div className="mt-[0.5em] flex min-h-0 flex-1 flex-col gap-[0.45em] overflow-hidden px-[0.9em]">
        {flights.map((f, i) => (
          <div
            key={f.code}
            className={`flex items-center gap-[0.7em] rounded-[1em] border p-[0.7em] ${
              i === 0 ? 'border-[#4f8cff]/40 bg-[#4f8cff]/[0.08]' : 'border-white/[0.06] bg-white/[0.02]'
            }`}
          >
            <div className="flex h-[2.2em] w-[2.2em] shrink-0 items-center justify-center rounded-[0.6em] text-[0.85em] font-bold text-white" style={{ background: f.color }}>
              <Plane size="1.05em" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[0.92em] font-semibold text-white">
                {f.dep} <span className="text-white/30">—</span> {f.arr}
              </div>
              <div className="text-[0.72em] text-white/45">{f.dur}</div>
            </div>
            <div className="text-right">
              <div className="text-[0.92em] font-semibold text-white">{f.price}</div>
              {f.tag && <div className={`text-[0.66em] font-medium ${i === 0 ? 'text-[#4ade80]' : 'text-[#fbbf24]'}`}>{f.tag}</div>}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[0.4em] grid shrink-0 grid-cols-4 border-t border-white/[0.06] bg-[#0b0d12] px-[0.6em] pt-[0.6em] text-[0.66em]">
        {[
          { icon: Plane, label: 'Flights', on: true },
          { icon: BedDouble, label: 'Hotels' },
          { icon: FileCheck2, label: 'Visa' },
          { icon: Palmtree, label: 'Holidays' },
        ].map(({ icon: Icon, label, on }) => (
          <div key={label} className={`flex flex-col items-center gap-[0.3em] ${on ? 'text-[#7fb0ff]' : 'text-white/40'}`}>
            <Icon size="1.9em" strokeWidth={1.8} />
            {label}
          </div>
        ))}
      </div>
      <HomeBar />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* TryWare AI — virtual try-on                                         */
/* ------------------------------------------------------------------ */

const swatches = [
  'linear-gradient(140deg,#1e2a4a,#0f1629)',
  'linear-gradient(140deg,#d6c7a9,#9c8b6c)',
  'linear-gradient(140deg,#3b3b3f,#17171a)',
  'linear-gradient(140deg,#7a2e3a,#3d1219)',
];

export function TryOnScreen() {
  return (
    <div className="flex h-full flex-col bg-[#0d0b12]">
      <StatusBar />
      <div className="flex shrink-0 items-center justify-between px-[1.1em] pb-[0.7em] pt-[0.6em]">
        <div className="flex items-center gap-[0.4em] text-[1.25em] font-semibold tracking-tight text-white">
          <Sparkles size="0.95em" className="text-[#a5b4fc]" />
          TryWare
        </div>
        <div className="flex items-center gap-[0.35em] rounded-full border border-[#a5b4fc]/25 bg-[#a5b4fc]/10 px-[0.75em] py-[0.3em] text-[0.78em] font-medium text-[#e0e7ff]">
          ✦ 24 credits
        </div>
      </div>

      <div className="relative mx-[0.9em] min-h-0 flex-1 overflow-hidden rounded-[1.4em] border border-white/[0.08]">
        <img src={portrait} alt="" className="absolute inset-0 h-full w-full object-cover object-[50%_20%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b12] via-transparent to-[#0d0b12]/30" />
        <div className="scan absolute inset-x-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,#a5b4fc,#8be9ff,transparent)', boxShadow: '0 0 18px 4px rgba(139,233,255,0.55)' }} />
        <div className="absolute left-[0.7em] top-[0.7em] flex items-center gap-[0.45em] rounded-full bg-black/55 px-[0.7em] py-[0.35em] text-[0.74em] text-white backdrop-blur">
          <span className="spin h-[0.85em] w-[0.85em] rounded-full border-[1.5px] border-white/25 border-t-white" />
          Generating · HD
        </div>
        <div className="absolute inset-x-[0.8em] bottom-[0.8em]">
          <div className="mb-[0.45em] flex items-center justify-between text-[0.78em]">
            <span className="font-medium text-white">Navy blazer · Slim fit</span>
            <span className="text-white/55">2 credits</span>
          </div>
          <div className="h-[0.3em] overflow-hidden rounded-full bg-white/15">
            <div className="progress h-full rounded-full" style={{ background: 'linear-gradient(90deg,#8be9ff,#60a5fa,#c3cfff)' }} />
          </div>
        </div>
      </div>

      <div className="mx-[0.9em] mt-[0.75em] grid shrink-0 grid-cols-2 rounded-full border border-white/[0.07] bg-white/[0.03] p-[0.25em] text-center text-[0.8em]">
        <span className="py-[0.4em] text-white/50">Standard</span>
        <span className="rounded-full bg-white py-[0.4em] font-semibold text-[#0d0b12]">HD</span>
      </div>

      <div className="mx-[0.9em] mt-[0.7em] grid shrink-0 grid-cols-4 gap-[0.5em]">
        {swatches.map((bg, i) => (
          <div
            key={bg}
            className={`flex aspect-square items-center justify-center rounded-[0.8em] ${i === 0 ? 'ring-2 ring-[#a5b4fc] ring-offset-2 ring-offset-[#0d0b12]' : 'ring-1 ring-white/10'}`}
            style={{ background: bg }}
          >
            <Shirt size="1.4em" className="text-white/70" strokeWidth={1.6} />
          </div>
        ))}
      </div>

      <div className="mx-[0.9em] mt-[0.75em] flex h-[2.8em] shrink-0 items-center justify-center gap-[0.4em] rounded-[0.9em] text-[0.9em] font-semibold text-[#0d0b12]" style={{ background: 'var(--grad)' }}>
        <Sparkles size="1em" /> Try it on
      </div>
      <HomeBar />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Buggy — live ride tracking                                          */
/* ------------------------------------------------------------------ */

const ROUTE = 'M 70 470 L 70 380 Q 70 360 90 360 L 170 360 Q 190 360 190 340 L 190 250 Q 190 230 210 230 L 240 230 L 240 150';

export function RideScreen() {
  const reduced = prefersReducedMotion();
  return (
    <div className="relative h-full overflow-hidden bg-[#0d1311]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 640" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="route-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>
        <rect width="300" height="640" fill="#0d1311" />
        <path d="M -20 120 C 60 150 120 90 200 130 S 300 120 330 100" stroke="#0f2233" strokeWidth="22" fill="none" />
        <rect x="200" y="400" width="90" height="110" rx="10" fill="#10261b" />
        {[
          [10, 160, 50, 70], [10, 250, 50, 90], [90, 160, 80, 60], [90, 240, 80, 100], [210, 270, 80, 70],
          [10, 400, 40, 120], [90, 390, 80, 60], [90, 470, 80, 80], [210, 160, 22, 50], [250, 160, 40, 50],
          [10, 560, 120, 70], [150, 560, 140, 70], [90, 60, 90, 40], [210, 40, 80, 40],
        ].map(([x, y, w, h]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="7" fill="#141c19" />
        ))}
        <g stroke="#1d2925" strokeLinecap="round" fill="none">
          <path d="M 70 0 V 640" strokeWidth="9" />
          <path d="M 190 0 V 640" strokeWidth="9" />
          <path d="M 0 360 H 300" strokeWidth="9" />
          <path d="M 0 230 H 300" strokeWidth="7" />
          <path d="M 240 0 V 360" strokeWidth="6" />
          <path d="M 0 540 H 300" strokeWidth="6" />
          <path d="M 130 360 V 640" strokeWidth="5" />
        </g>
        <path d={ROUTE} stroke="#34d399" strokeWidth="9" fill="none" opacity="0.35" filter="url(#route-glow)" strokeLinejoin="round" />
        <path d={ROUTE} stroke="#34d399" strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
        <path d={ROUTE} stroke="#d1fae5" strokeWidth="1.5" fill="none" className="route-dash" strokeLinejoin="round" opacity="0.8" />

        <g transform="translate(240 150)">
          <rect x="-9" y="-9" width="18" height="18" rx="4" fill="#f4f4f5" />
          <rect x="-3.5" y="-3.5" width="7" height="7" rx="1.5" fill="#0d1311" />
        </g>
        <g transform="translate(70 470)">
          <circle r="16" fill="#34d399" opacity="0.18">
            {!reduced && <animate attributeName="r" values="8;20;8" dur="2.4s" repeatCount="indefinite" />}
          </circle>
          <circle r="7" fill="#34d399" stroke="#0d1311" strokeWidth="3" />
        </g>

        <g>
          {!reduced && <animateMotion dur="9s" repeatCount="indefinite" rotate="auto" path={ROUTE} />}
          <g transform={reduced ? 'translate(190 300) rotate(-90)' : undefined}>
            <rect x="-11" y="-6.5" width="22" height="13" rx="4" fill="#f4f4f5" />
            <rect x="2" y="-5" width="6" height="10" rx="1.5" fill="#0d1311" opacity="0.7" />
          </g>
        </g>
      </svg>

      <div className="relative z-10">
        <StatusBar />
      </div>

      <div className="absolute inset-x-[0.9em] top-[3.6em] z-10 rounded-[1.1em] border border-white/[0.08] bg-[#0f1513]/90 p-[0.75em] text-[0.82em] backdrop-blur">
        <div className="flex items-center gap-[0.6em]">
          <span className="h-[0.6em] w-[0.6em] rounded-full bg-[#34d399]" />
          <span className="text-white">Shivajinagar</span>
          <span className="ml-auto text-white/40">Pickup</span>
        </div>
        <div className="ml-[0.27em] h-[0.8em] border-l border-dashed border-white/20" />
        <div className="flex items-center gap-[0.6em]">
          <span className="h-[0.6em] w-[0.6em] rounded-[2px] bg-white" />
          <span className="text-white">Viman Nagar</span>
          <span className="ml-auto text-white/40">Drop</span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 rounded-t-[1.6em] border-t border-white/[0.08] bg-[#0e0f12] px-[1em] pt-[0.55em]">
        <div className="mx-auto h-[0.28em] w-[2.6em] rounded-full bg-white/20" />
        <div className="mt-[0.8em] flex items-end justify-between">
          <div>
            <div className="flex items-center gap-[0.4em] text-[0.74em] text-[#6ee7b7]">
              <span className="live-dot !h-[0.5em] !w-[0.5em] !bg-[#34d399]" /> Live tracking
            </div>
            <div className="text-[1.2em] font-semibold tracking-tight text-white">Driver arriving</div>
          </div>
          <div className="text-right">
            <div className="text-[1.6em] font-semibold leading-none tracking-tight text-white">3 min</div>
            <div className="text-[0.7em] text-white/40">0.8 km away</div>
          </div>
        </div>
        <div className="mt-[0.8em] flex items-center gap-[0.7em] rounded-[1em] border border-white/[0.06] bg-white/[0.03] p-[0.6em]">
          <div className="flex h-[2.4em] w-[2.4em] items-center justify-center rounded-full bg-gradient-to-br from-[#34d399] to-[#0ea5e9] text-[0.8em] font-bold text-[#06110d]">RK</div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="text-[0.88em] font-medium text-white">Rahul K.</div>
            <div className="truncate text-[0.7em] text-white/45">Buggy Mini · MH 12 AB 4521</div>
          </div>
          <div className="flex items-center gap-[0.2em] text-[0.78em] text-white/80">
            <Star size="0.9em" className="fill-[#fbbf24] text-[#fbbf24]" /> 4.9
          </div>
        </div>
        <div className="mt-[0.6em] grid grid-cols-3 gap-[0.45em] text-[0.74em] text-white/80">
          {[
            { icon: PhoneIcon, label: 'Call' },
            { icon: MessageCircle, label: 'Message' },
            { icon: Share2, label: 'Share' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-[0.35em] rounded-full border border-white/[0.07] py-[0.55em]">
              <Icon size="1.1em" /> {label}
            </div>
          ))}
        </div>
        <HomeBar />
      </div>
    </div>
  );
}

/* Buggy Sarathi — the driver app's floating ride-request bubble */
export function RideRequestCard() {
  return (
    <div className="w-[230px] rounded-[20px] border border-white/10 bg-[#0f1211]/90 p-3.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl" aria-hidden="true">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#34d399] text-[11px] font-bold text-[#06110d]">BS</div>
          <div className="leading-tight">
            <div className="text-[12.5px] font-semibold text-white">New ride request</div>
            <div className="text-[10.5px] text-white/45">Buggy Sarathi · driver</div>
          </div>
        </div>
        <svg viewBox="0 0 36 36" className="h-8 w-8 -rotate-90">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" pathLength={100} className="countdown" />
        </svg>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div className="text-[11.5px] leading-relaxed text-white/60">
          Pickup in <span className="text-white">1.2 km</span>
          <br />
          Trip · <span className="text-white">7.4 km</span>
        </div>
        <div className="text-[20px] font-semibold tracking-tight text-white">₹142</div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-[12px] font-medium">
        <div className="rounded-full border border-white/10 py-2 text-center text-white/70">Decline</div>
        <div className="rounded-full bg-[#34d399] py-2 text-center text-[#06110d]">Accept</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* AppInspect — in-app network inspector for QC                        */
/* ------------------------------------------------------------------ */

type Tone = 'ok' | 'err' | 'warn';

const toneColor: Record<Tone, string> = { ok: '#4ade80', err: '#f87171', warn: '#fbbf24' };

const calls: { method: string; path: string; status: string; tone: Tone; time: string; flag?: string }[] = [
  { method: 'GET', path: '/cart', status: '200 OK', tone: 'ok', time: '182 ms' },
  { method: 'GET', path: '/user/profile', status: '200 OK', tone: 'ok', time: '96 ms', flag: 'Repeated ×3' },
  { method: 'POST', path: '/orders', status: '500 Server error', tone: 'err', time: '1.2 s' },
  { method: 'GET', path: '/offers', status: 'Parse error', tone: 'warn', time: '240 ms', flag: 'offers[0].price' },
];

const INSPECT_LAST = 6;

export function InspectScreen() {
  const [step, setStep] = useState(() => (prefersReducedMotion() ? INSPECT_LAST : 1));

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const wait = step === INSPECT_LAST ? 4200 : step === 4 ? 1400 : 1000;
    const t = setTimeout(() => setStep((s) => (s >= INSPECT_LAST ? 1 : s + 1)), wait);
    return () => clearTimeout(t);
  }, [step]);

  const shown = calls.slice(0, Math.min(step, calls.length));
  const errors = shown.filter((c) => c.tone === 'err').length;
  const parse = shown.filter((c) => c.tone === 'warn').length;

  return (
    <div className="flex h-full flex-col bg-[#0a0d10]">
      <StatusBar />

      <div className="flex shrink-0 items-center gap-[0.6em] px-[1em] pb-[0.7em] pt-[0.6em]">
        <div className="flex h-[2.3em] w-[2.3em] items-center justify-center rounded-[0.75em] bg-[#67e8f9]/15 text-[#67e8f9]">
          <Radar size="1.2em" />
        </div>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="text-[1.05em] font-semibold text-white">AppInspect</div>
          <div className="text-[0.74em] text-white/45">Calls on this screen</div>
        </div>
        <div className="grid grid-cols-2 rounded-full border border-white/[0.07] bg-white/[0.03] p-[0.2em] text-[0.72em]">
          <span className="rounded-full bg-white px-[0.7em] py-[0.25em] font-semibold text-[#0a0d10]">Calls</span>
          <span className="px-[0.7em] py-[0.25em] text-white/50">Logs</span>
        </div>
      </div>

      <div className="flex shrink-0 gap-[0.4em] overflow-hidden px-[0.9em] text-[0.74em]">
        <span className="flex shrink-0 items-center gap-[0.4em] rounded-full border border-[#67e8f9]/35 bg-[#67e8f9]/10 px-[0.8em] py-[0.35em] text-white">
          CheckoutScreen
          <span className="font-mono text-[#67e8f9]">{shown.length}</span>
        </span>
        <span className="shrink-0 rounded-full border border-white/[0.07] px-[0.8em] py-[0.35em] text-white/50">CartScreen</span>
        <span className="shrink-0 rounded-full border border-white/[0.07] px-[0.8em] py-[0.35em] text-white/50">HomeScreen</span>
      </div>

      <div
        className={`mx-[0.9em] mt-[0.7em] flex shrink-0 items-center gap-[0.5em] rounded-[0.8em] border px-[0.75em] py-[0.5em] text-[0.76em] transition-colors duration-500 ${
          errors ? 'border-[#f87171]/30 bg-[#f87171]/10 text-[#fecaca]' : 'border-[#4ade80]/25 bg-[#4ade80]/[0.08] text-[#bbf7d0]'
        }`}
      >
        {errors ? <AlertTriangle size="1.1em" className="shrink-0 text-[#f87171]" /> : <Check size="1.1em" className="shrink-0 text-[#4ade80]" />}
        {errors ? `${errors} server error${parse ? ` · ${parse} parse error` : ''}` : 'All calls healthy'}
      </div>

      <div className="mt-[0.6em] flex min-h-0 flex-1 flex-col gap-[0.4em] overflow-hidden px-[0.9em]">
        {shown.map((c) => (
          <div
            key={c.path}
            className={`msg-in flex gap-[0.6em] rounded-[0.9em] border px-[0.7em] py-[0.55em] ${
              c.tone === 'err' ? 'border-[#f87171]/30 bg-[#f87171]/[0.06]' : 'border-white/[0.06] bg-white/[0.02]'
            }`}
          >
            <span className="mt-[0.25em] w-[0.22em] shrink-0 self-stretch rounded-full" style={{ background: toneColor[c.tone] }} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-[0.45em] font-mono text-[0.8em]">
                <span className={c.method === 'POST' ? 'text-[#a5b4fc]' : 'text-[#67e8f9]'}>{c.method}</span>
                <span className="truncate text-white">{c.path}</span>
                <span className="ml-auto shrink-0 text-white/40">{c.time}</span>
              </div>
              <div className="mt-[0.2em] flex items-center gap-[0.45em] text-[0.72em]">
                <span style={{ color: toneColor[c.tone] }}>{c.status}</span>
                {c.flag && (
                  <span className="truncate rounded-full border border-white/[0.08] px-[0.55em] py-[0.05em] font-mono text-white/55">{c.flag}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {step >= 5 && (
        <div className="msg-in mx-[0.9em] mt-[0.5em] shrink-0 rounded-[0.9em] border border-white/[0.07] bg-[#06080a] p-[0.7em] font-mono text-[0.66em] leading-[1.55] text-white/60">
          <div className="mb-[0.3em] flex items-center justify-between font-sans text-[1.08em]">
            <span className="text-white/45">cURL · POST /orders</span>
            {step >= 6 ? (
              <span className="msg-in flex items-center gap-[0.3em] text-[#4ade80]">
                <Check size="1.05em" /> Copied
              </span>
            ) : (
              <Copy size="1.05em" className="text-white/40" />
            )}
          </div>
          <div>
            <span className="text-[#67e8f9]">curl</span> -X POST \
          </div>
          <div className="pl-[1em]">&apos;https://api.shop.dev/orders&apos; \</div>
          <div className="truncate pl-[1em]">
            -H &apos;Authorization: Bearer <span className="text-[#fbbf24]">••••••</span>&apos;
          </div>
        </div>
      )}

      <div className="mx-[0.9em] mt-[0.6em] grid shrink-0 grid-cols-2 gap-[0.45em] text-[0.78em] font-medium">
        <div className="flex h-[2.6em] items-center justify-center gap-[0.4em] rounded-[0.8em] border border-white/[0.08] text-white/80">
          <Share2 size="1.05em" /> Export HAR
        </div>
        <div className="flex h-[2.6em] items-center justify-center gap-[0.4em] rounded-[0.8em] bg-[#67e8f9] text-[#05161a]">
          <Bug size="1.05em" /> Bug report
        </div>
      </div>
      <HomeBar />
    </div>
  );
}

/* AppInspect — the floating bubble that turns red when a call fails */
export function InspectBubble() {
  return (
    <div className="flex w-fit items-center gap-3 rounded-[20px] border border-white/10 bg-[#0e1114]/90 py-3 pl-3 pr-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl" aria-hidden="true">
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#f87171]/40 bg-[#f87171]/15 text-[#fca5a5]">
        <Radar size={19} />
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-[#0e1114] bg-[#ef4444] px-1 text-[10px] font-bold text-white">
          4
        </span>
      </div>
      <div className="min-w-0 leading-tight">
        <div className="text-[12.5px] font-semibold text-white">1 call failing</div>
        <div className="mt-0.5 text-[10.5px] text-white/45">POST /orders · 500</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Journey stop — Career, in step with the Experience timeline         */
/* ------------------------------------------------------------------ */

const LOGOS = ['linear-gradient(150deg,#8ec5ff,#6366f1)', 'linear-gradient(150deg,#34d399,#0ea5e9)'];
const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2);

export function CareerScreen() {
  const fill = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  // Read the page's own timeline: how far its rail has drawn, and which job it has reached
  useEffect(() => {
    let raf = 0;
    let shown = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const line = document.querySelector<HTMLElement>('.timeline');
      if (!line) return;
      const p = parseFloat(line.style.getPropertyValue('--p')) || 0;
      if (fill.current) fill.current.style.transform = `scaleY(${p.toFixed(3)})`;
      const reached = Math.max(0, line.querySelectorAll(':scope > li.is-lit').length - 1);
      if (reached !== shown) {
        shown = reached;
        setActive(reached);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="flex h-full flex-col bg-[#0b0b10]">
      <StatusBar />
      <div className="flex shrink-0 items-center justify-between px-[1.1em] pb-[0.9em] pt-[0.6em]">
        <div>
          <div className="text-[1.55em] font-semibold tracking-tight text-white">Career</div>
          <div className="text-[0.76em] text-white/45">3.5+ years · {experience.length} product teams</div>
        </div>
        <div className="h-[2.5em] w-[2.5em] overflow-hidden rounded-full ring-2 ring-[#60a5fa]/60">
          <img src={portrait} alt="" draggable={false} className="h-full w-full object-cover object-[50%_20%]" />
        </div>
      </div>

      <div className="relative mx-[1em] flex flex-col gap-[0.7em]">
        <span className="absolute bottom-[1.6em] left-[1.95em] top-[1.6em] w-px bg-white/10" />
        <span ref={fill} className="absolute bottom-[1.6em] left-[1.95em] top-[1.6em] w-px origin-top" style={{ background: 'var(--grad)', transform: 'scaleY(0)' }} />
        {experience.map((job, i) => (
          <div
            key={job.company}
            className={`relative rounded-[1.1em] border p-[0.8em] transition-colors duration-500 ${
              i === active ? 'border-[#60a5fa]/45 bg-[#60a5fa]/[0.09]' : 'border-white/[0.06] bg-white/[0.02]'
            }`}
          >
            <div className="flex items-start gap-[0.75em]">
              <span className="relative z-10 flex h-[2.3em] w-[2.3em] shrink-0 items-center justify-center rounded-[0.75em] font-bold text-white" style={{ background: LOGOS[i % LOGOS.length] }}>
                <span className="text-[0.82em]">{initials(job.company)}</span>
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <div className="flex items-center justify-between gap-[0.4em]">
                  <span className="truncate text-[0.95em] font-semibold text-white">{job.company}</span>
                  {job.current && <span className="shrink-0 rounded-full bg-[#4ade80]/15 px-[0.55em] py-[0.15em] text-[0.62em] font-medium text-[#86efac]">Now</span>}
                </div>
                <div className="mt-[0.15em] text-[0.76em] text-white/65">{job.role}</div>
                <div className="mt-[0.2em] flex items-center gap-[0.3em] text-[0.68em] text-white/40">
                  <Briefcase size="1em" /> {job.period}
                </div>
              </div>
            </div>
            <div className="mt-[0.6em] flex flex-wrap gap-[0.3em] pl-[3.05em]">
              {job.tags.slice(0, 3).map((t) => (
                <span key={t} className="rounded-full border border-white/[0.08] px-[0.55em] py-[0.12em] text-[0.62em] text-white/60">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-[1em] mt-auto flex h-[2.7em] shrink-0 items-center justify-center gap-[0.45em] rounded-[0.9em] text-[0.86em] font-semibold text-[#0b0b10]" style={{ background: 'var(--grad)' }}>
        <FileDown size="1.05em" /> Download résumé
      </div>
      <HomeBar />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Journey stop — Profile card                                         */
/* ------------------------------------------------------------------ */

export function ProfileScreen() {
  const actions = [
    { Icon: MessageCircle, label: 'Message' },
    { Icon: PhoneIcon, label: 'Call' },
    { Icon: Mail, label: 'Email' },
    { Icon: Linkedin, label: 'LinkedIn' },
  ];
  return (
    <div className="relative flex h-full flex-col bg-[#0b0b10]">
      <div className="os-wall" style={{ bottom: 'auto', height: '27%' }} />
      <div className="relative">
        <StatusBar />
      </div>

      <div className="relative mt-[3.4em] flex flex-col items-center px-[1em] text-center">
        <div className="rounded-full p-[0.22em]" style={{ background: 'var(--grad)' }}>
          <img src={portrait} alt="" draggable={false} className="h-[6em] w-[6em] rounded-full border-[0.22em] border-[#0b0b10] object-cover object-[50%_20%]" />
        </div>
        <div className="mt-[0.65em] flex items-center gap-[0.3em] text-[1.3em] font-semibold tracking-tight text-white">
          {profile.name} <BadgeCheck size="0.85em" className="text-[#8ec5ff]" />
        </div>
        <div className="text-[0.8em] text-white/55">{profile.role}</div>
        <div className="mt-[0.3em] flex items-center gap-[0.3em] text-[0.72em] text-white/40">
          <MapPin size="1em" /> {profile.location} · IST
        </div>
        <div className="mt-[0.8em] inline-flex items-center gap-[0.45em] rounded-full border border-[#4ade80]/25 bg-[#4ade80]/10 px-[0.8em] py-[0.3em] text-[0.72em] text-[#86efac]">
          <span className="live-dot !h-[0.5em] !w-[0.5em]" /> Open to new roles
        </div>
      </div>

      <div className="mt-[1.1em] grid grid-cols-4 gap-[0.4em] px-[1em]">
        {actions.map(({ Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-[0.35em]">
            <span className="flex h-[2.6em] w-[2.6em] items-center justify-center rounded-full bg-white/[0.07] text-white">
              <Icon size="1.1em" />
            </span>
            <span className="text-[0.62em] text-white/50">{label}</span>
          </div>
        ))}
      </div>

      <div className="mx-[1em] mt-[1em] grid grid-cols-3 rounded-[1.1em] border border-white/[0.07] bg-white/[0.03] py-[0.75em] text-center">
        {[
          { v: '3.5+', l: 'Years' },
          { v: '1M+', l: 'Downloads' },
          { v: String(projects.length), l: 'Apps live' },
        ].map((s, i) => (
          <div key={s.l} className={i ? 'border-l border-white/[0.07]' : ''}>
            <div className="text-[1.15em] font-semibold tracking-tight text-white">{s.v}</div>
            <div className="text-[0.62em] text-white/45">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="os-card mx-[1em] mt-[0.7em] flex items-center gap-[0.7em] p-[0.75em]">
        <span className="flex h-[2.1em] w-[2.1em] shrink-0 items-center justify-center rounded-[0.7em]" style={{ background: 'var(--grad)' }}>
          <Sparkles size="1.05em" className="text-[#0b0b0e]" />
        </span>
        <div className="min-w-0 leading-tight">
          <div className="text-[0.6em] uppercase tracking-[0.14em] text-white/45">Now exploring</div>
          <div className="truncate text-[0.82em] text-white">LLM agents & RAG in mobile apps</div>
        </div>
      </div>
      <div className="mt-auto">
        <HomeBar />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Journey stop — the email that ends the trip                         */
/* ------------------------------------------------------------------ */

const MESSAGE = 'Hi Omkar,\nI found your portfolio among the stars ✦ Let’s build an app people use every day — with AI inside.';
const KEY_ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

export function ComposeScreen() {
  const [typed, setTyped] = useState(() => (prefersReducedMotion() ? MESSAGE.length : 0));

  useEffect(() => {
    if (typed >= MESSAGE.length) return;
    const pause = /[\n.✦—]/.test(MESSAGE[typed]) ? 280 : 34;
    const t = setTimeout(() => setTyped((n) => n + 1), pause);
    return () => clearTimeout(t);
  }, [typed]);

  const pressed = MESSAGE[typed - 1]?.toLowerCase();

  return (
    <a href={`mailto:${profile.email}`} draggable={false} aria-label={`Email ${profile.name}`} className="flex h-full flex-col bg-[#0b0b10] text-white">
      <StatusBar />
      <div className="flex shrink-0 items-center justify-between px-[1em] pb-[0.6em] pt-[0.5em]">
        <span className="text-[0.86em] text-[#8ec5ff]">Cancel</span>
        <span className="text-[0.95em] font-semibold">New Message</span>
        <span className="send-pulse flex h-[2.1em] w-[2.1em] items-center justify-center rounded-full text-[#0b0b10]" style={{ background: 'var(--grad)' }}>
          <ArrowUp size="1.15em" strokeWidth={2.6} />
        </span>
      </div>
      <div className="mx-[1em] shrink-0 border-t border-white/[0.07] py-[0.55em] text-[0.78em]">
        <span className="text-white/40">To </span>
        <span className="rounded-full bg-[#8ec5ff]/15 px-[0.6em] py-[0.15em] text-[#bfdbfe]">{profile.email}</span>
      </div>
      <div className="mx-[1em] shrink-0 border-y border-white/[0.07] py-[0.55em] text-[0.78em]">
        <span className="text-white/40">Subject </span>Let’s build something ✦
      </div>
      <div className="mx-[1em] mt-[0.7em] min-h-0 flex-1 whitespace-pre-wrap text-[0.86em] leading-relaxed text-white/85">
        {MESSAGE.slice(0, typed)}
        <span className="caret" />
      </div>
      <div className="flex shrink-0 items-center gap-[0.5em] px-[1em] pb-[0.55em] text-[0.68em] text-white/45">
        <Paperclip size="1.1em" /> Résumé.pdf
      </div>
      <div className="shrink-0 bg-[#15151c] px-[0.35em] pt-[0.5em]">
        {KEY_ROWS.map((row, r) => (
          <div key={row} className="mb-[0.35em] flex gap-[0.3em]" style={{ paddingInline: `${r * 0.85}em` }}>
            {[...row].map((k) => (
              <span key={k} className={`kbd-key ${k === pressed ? 'is-down' : ''}`}>
                {k}
              </span>
            ))}
          </div>
        ))}
        <div className="flex gap-[0.3em]">
          <span className="kbd-key !flex-[0_0_22%]">123</span>
          <span className={`kbd-key ${pressed === ' ' ? 'is-down' : ''}`}>space</span>
          <span className="kbd-key !flex-[0_0_22%] !bg-[#6366f1] !text-white">send</span>
        </div>
        <HomeBar />
      </div>
    </a>
  );
}
