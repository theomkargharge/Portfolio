import type { CSSProperties } from 'react';
import { GraduationCap } from 'lucide-react';
import portrait from '../assets/portrait.jpg';
import { education, profile } from '../data';

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

const facts = [
  { k: 'Based in', v: 'Pune, India · IST' },
  { k: 'Currently', v: 'Flutter Developer, Benzy Infotech' },
  { k: 'Exploring', v: 'LLM agents & RAG in mobile apps' },
  { k: 'Shipped', v: '4 apps on the App Store & Play' },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="reveal relative mx-auto w-full max-w-[440px] lg:mx-0">
          <div className="glow -inset-6 bg-[#7c6cff]/[0.12]" />
          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08]">
            <img src={portrait} alt={`Portrait of ${profile.name}`} className="aspect-[4/5] w-full object-cover object-[50%_25%]" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/10 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl">
              <div className="leading-tight">
                <div className="text-[15px] font-medium text-fg">{profile.name}</div>
                <div className="text-[12.5px] text-fg-3">{profile.role}</div>
              </div>
              <span className="inline-flex items-center gap-2 text-[12px] text-[#86efac]">
                <span className="live-dot !h-1.5 !w-1.5" /> Available
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="reveal eyebrow flex items-center gap-3">
            <span className="text-fg-2">04</span>
            <span className="h-px w-8 bg-white/15" />
            About
          </div>
          <h2 className="reveal display mt-5 text-balance text-[clamp(36px,4.6vw,58px)] text-fg" style={d(80)}>
            An engineer who ships — <span className="serif-accent text-fg-2">and keeps learning.</span>
          </h2>

          <div className="reveal mt-8 space-y-5 text-[16.5px] leading-[1.75] text-fg-2" style={d(160)}>
            <p>
              At Movilidad I built a complete ride-hailing platform — rider and driver apps — with live tracking, WebSocket dispatch and
              background location. Since 2025 I’ve been at Benzy Infotech building <span className="text-fg">Akbar Travels</span>, a
              flights-and-hotels app with more than a million downloads, including its real-time AI support chatbot.
            </p>
            <p>
              On my own I built <span className="text-fg">TryWare AI</span> end to end — Flutter app, FastAPI backend, image-generation
              pipeline, payments and deployment — and took it live on Google Play. That’s where mobile and Generative AI meet for me:
              LLM features, RAG and agents that make apps genuinely more useful.
            </p>
          </div>

          <dl className="reveal mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2" style={d(220)}>
            {facts.map((f) => (
              <div key={f.k} className="bg-[#0a0a0d] px-5 py-4">
                <dt className="eyebrow !text-[10.5px]">{f.k}</dt>
                <dd className="mt-1.5 text-[14.5px] text-fg">{f.v}</dd>
              </div>
            ))}
          </dl>

          <div className="reveal mt-4 flex items-start gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-5" style={d(280)}>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-fg-2">
              <GraduationCap size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <div className="text-[15px] font-medium text-fg">{education.degree}</div>
                <div className="font-mono text-[12.5px] text-fg-3">{education.period}</div>
              </div>
              <div className="mt-1 text-[14px] text-fg-3">
                {education.school} · <span className="text-fg-2">{education.grade}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
