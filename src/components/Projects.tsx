import type { CSSProperties, ReactNode } from 'react';
import { ArrowUpRight, BedDouble, CreditCard, FileCheck2, GitBranch, Layers, Lock, Palmtree, Plane, Server, Timer, Wand2 } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { FlightScreen, Phone, RideRequestCard, RideScreen, TryOnScreen } from './mockups';
import { projects, type Project } from '../data';

const theme: Record<Project['id'], { accent: string; stage: string }> = {
  akbar: {
    accent: '#7fb0ff',
    stage: 'radial-gradient(120% 80% at 50% 0%, rgba(79,140,255,0.32), rgba(79,140,255,0.06) 45%, transparent 70%)',
  },
  tryware: {
    accent: '#c4b5fd',
    stage: 'radial-gradient(120% 80% at 50% 0%, rgba(167,139,250,0.34), rgba(244,114,182,0.08) 45%, transparent 70%)',
  },
  buggy: {
    accent: '#6ee7b7',
    stage: 'radial-gradient(120% 80% at 50% 0%, rgba(52,211,153,0.28), rgba(14,165,233,0.06) 45%, transparent 70%)',
  },
};

function FloatChip({ icon, children, delay = '0s' }: { icon: ReactNode; children: ReactNode; delay?: string }) {
  return (
    <div
      className="float-y flex w-fit items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-[#0f0f13]/80 py-1.5 pl-1.5 pr-3.5 text-[12.5px] text-fg shadow-[0_16px_40px_-16px_rgba(0,0,0,0.9)] backdrop-blur-xl"
      style={{ animationDelay: delay }}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.07]">{icon}</span>
      {children}
    </div>
  );
}

function Stage({ project, flip }: { project: Project; flip: boolean }) {
  const t = theme[project.id];
  const icon = (Icon: typeof Layers) => <Icon size={13} style={{ color: t.accent }} />;
  return (
    <div className="relative min-h-[460px] overflow-hidden bg-[#0b0b0e] sm:min-h-[560px] lg:absolute lg:inset-0 lg:min-h-0">
      <div className="absolute inset-0" style={{ background: t.stage }} />
      <div className="hero-grid absolute inset-0 opacity-60" />

      <div
        className={`absolute inset-x-0 top-12 flex justify-center sm:top-14 lg:inset-y-0 lg:top-0 lg:items-center ${
          flip ? 'xl:justify-start xl:pl-14' : 'xl:justify-end xl:pr-14'
        }`}
      >
        <Phone className="[--pw:250px] sm:[--pw:290px]">
          {project.id === 'akbar' && <FlightScreen />}
          {project.id === 'tryware' && <TryOnScreen />}
          {project.id === 'buggy' && <RideScreen />}
        </Phone>
      </div>

      <div
        className={`absolute inset-y-0 z-20 hidden flex-col justify-center gap-3 xl:flex ${flip ? 'right-8 items-end' : 'left-8 items-start'}`}
        aria-hidden="true"
      >
        {project.id === 'akbar' && (
          <>
            <FloatChip icon={icon(Plane)}>Flights</FloatChip>
            <FloatChip icon={icon(BedDouble)} delay="-1.5s">Hotels</FloatChip>
            <FloatChip icon={icon(FileCheck2)} delay="-3s">Visa services</FloatChip>
            <FloatChip icon={icon(Palmtree)} delay="-4.5s">Holiday packages</FloatChip>
            <div className="h-4" />
            <FloatChip icon={icon(CreditCard)} delay="-2s">Razorpay · Tamara · Tabby</FloatChip>
          </>
        )}
        {project.id === 'tryware' && (
          <>
            <FloatChip icon={icon(Wand2)}>gpt-image · SD + HD</FloatChip>
            <FloatChip icon={icon(Lock)} delay="-2s">Row-locked credits</FloatChip>
            <FloatChip icon={icon(Server)} delay="-4s">FastAPI on Hetzner</FloatChip>
            <FloatChip icon={icon(GitBranch)} delay="-1s">CI/CD · GitHub Actions</FloatChip>
          </>
        )}
        {project.id === 'buggy' && (
          <>
            <FloatChip icon={icon(Timer)}>−40% response time</FloatChip>
            <div className="float-y" style={{ animationDelay: '-2s' }}>
              <RideRequestCard />
            </div>
          </>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0b0b0e] to-transparent lg:hidden" />
    </div>
  );
}

function ProjectCard({ project, flip }: { project: Project; flip: boolean }) {
  const t = theme[project.id];
  return (
    <article className="reveal card spot grid lg:grid-cols-2" style={{ '--d': '60ms' } as CSSProperties}>
      <div className={`flex flex-col p-7 sm:p-10 lg:p-12 ${flip ? 'lg:order-last' : ''}`}>
        <div className="flex items-center justify-between gap-4">
          <span className="eyebrow">
            <span className="text-fg-2">{project.index}</span> · {project.category}
          </span>
          <span className="eyebrow hidden sm:inline">{project.period}</span>
        </div>

        <h3 className="mt-8 text-[clamp(32px,3.6vw,46px)] font-semibold leading-[1.02] tracking-[-0.04em] text-fg">
          {project.name}
          <span className="serif-accent mt-1 block text-[0.92em] tracking-[-0.01em]" style={{ color: t.accent }}>
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
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: t.accent }} />
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

        <div className="mt-auto flex flex-wrap gap-2 pt-9">
          {project.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="btn btn-ghost !h-10 !px-4 !text-[13.5px]">
              {l.label} <ArrowUpRight size={14} className="arrow arrow-up text-fg-3" />
            </a>
          ))}
        </div>
      </div>

      <div className={`relative border-t border-white/[0.06] lg:border-t-0 ${flip ? 'lg:border-r' : 'lg:border-l'}`}>
        <Stage project={project} flip={flip} />
      </div>
    </article>
  );
}

export default function Projects() {
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
          aside="Four apps live on the App Store and Google Play — from a travel platform with a million downloads to a GenAI product I built solo."
        />
        <div className="space-y-6 sm:space-y-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
