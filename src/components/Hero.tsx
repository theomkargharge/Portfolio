import type { CSSProperties } from 'react';
import { ArrowRight, Download, Headphones, Zap } from 'lucide-react';
import { ChatScreen, Phone } from './mockups';
import { profile, stats } from '../data';

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-28 sm:pt-36 lg:pb-24">
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="glow left-[-10%] top-[-20%] h-[520px] w-[620px] bg-[#6d7dff]/20" />
      <div className="glow right-[-8%] top-[10%] h-[460px] w-[460px] bg-[#c084fc]/[0.14]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-5 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
        <div>
          <div className="intro inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] py-1.5 pl-3 pr-4 text-[13px] text-fg-2" style={d(0)}>
            <span className="live-dot" />
            Open to new roles · {profile.location}
          </div>

          <h1 className="intro display mt-7 text-balance text-[clamp(44px,6.6vw,86px)] text-fg" style={d(90)}>
            Mobile apps for millions.{' '}
            <span className="serif-accent text-grad block pb-1 pr-2 text-[1.08em]">Now with AI inside.</span>
          </h1>

          <p className="intro mt-7 max-w-[34rem] text-pretty text-[17px] leading-[1.7] text-fg-2 sm:text-[18px]" style={d(180)}>
            I’m Omkar — a Flutter engineer with 3.5+ years shipping iOS &amp; Android apps, including{' '}
            <span className="text-fg">Akbar Travels</span> with 1M+ downloads. Today I bring Generative AI into the apps I build:
            LLM features, RAG pipelines and AI agents.
          </p>

          <div className="intro mt-9 flex flex-wrap items-center gap-3" style={d(270)}>
            <a href="#work" className="btn btn-primary">
              See selected work <ArrowRight size={16} className="arrow" />
            </a>
            <a href={profile.resume} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <Download size={16} /> Download résumé
            </a>
          </div>
        </div>

        <div className="intro relative mx-auto" style={d(220)}>
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {[380, 540, 700].map((s) => (
              <div
                key={s}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]"
                style={{ width: s, height: s }}
              />
            ))}
          </div>
          <div className="glow left-1/2 top-1/2 h-[380px] w-[300px] -translate-x-1/2 -translate-y-1/2 bg-[#8b7bff]/30" />

          <Phone className="relative z-10 [--pw:262px] sm:[--pw:292px]">
            <ChatScreen />
          </Phone>

          <div className="float-y absolute right-[calc(100%-30px)] top-[16%] z-20 whitespace-nowrap hidden items-center gap-2.5 rounded-2xl border border-white/10 bg-[#111115]/80 px-3.5 py-2.5 text-[13px] text-fg shadow-[0_20px_40px_-16px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:flex lg:hidden xl:flex">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#8ec5ff]/15 text-[#8ec5ff]">
              <Zap size={15} />
            </span>
            Real-time over WebSocket
          </div>

          <div className="float-y absolute left-[calc(100%-30px)] top-[34%] z-20 whitespace-nowrap hidden rounded-2xl border border-white/10 bg-[#111115]/80 px-4 py-3 shadow-[0_20px_40px_-16px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:block lg:hidden xl:block" style={{ animationDelay: '-2s' }}>
            <div className="text-[26px] font-semibold leading-none tracking-tight">
              1M<span className="text-grad">+</span>
            </div>
            <div className="mt-1 text-[12px] text-fg-3">downloads · iOS & Android</div>
          </div>

          <div className="float-y absolute right-[calc(100%-30px)] bottom-[30%] z-20 whitespace-nowrap hidden items-center gap-2.5 rounded-2xl border border-white/10 bg-[#111115]/80 px-3.5 py-2.5 text-[13px] text-fg shadow-[0_20px_40px_-16px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:flex lg:hidden xl:flex" style={{ animationDelay: '-4s' }}>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#4ade80]/15 text-[#4ade80]">
              <Headphones size={15} />
            </span>
            AI → live-agent hand-off
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-20 max-w-6xl px-5 sm:px-6 lg:mt-24">
        <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-white/[0.07] md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`reveal bg-white/[0.012] px-6 py-7 sm:px-7 ${i % 2 === 1 ? 'border-l border-white/[0.07]' : ''} ${
                i >= 2 ? 'border-t border-white/[0.07] md:border-t-0' : ''
              } ${i === 2 ? 'md:border-l' : ''}`}
              style={d(i * 80)}
            >
              <div className="text-[40px] font-semibold leading-none tracking-[-0.04em] sm:text-[48px]">
                {s.value}
                <span className="text-grad">{s.suffix}</span>
              </div>
              <div className="mt-2.5 text-[13.5px] text-fg-3">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
