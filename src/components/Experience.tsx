import type { CSSProperties } from 'react';
import SectionHeading from './SectionHeading';
import { experience } from '../data';

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          index="02"
          label="Experience"
          title={
            <>
              3.5+ years of <span className="serif-accent text-fg-2">shipping to production.</span>
            </>
          }
          aside="Two product teams, one focus: fast, reliable Flutter apps that people use every day."
        />

        <ol className="border-b border-white/[0.07]">
          {experience.map((job, i) => (
            <li
              key={job.company}
              className="reveal group grid gap-6 border-t border-white/[0.07] py-10 sm:py-12 lg:grid-cols-[260px_1fr] lg:gap-12"
              style={{ '--d': `${i * 80}ms` } as CSSProperties}
            >
              <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2 lg:flex-col lg:items-start">
                <span className="font-mono text-[13px] text-fg-2">{job.period}</span>
                <span className="font-mono text-[13px] text-fg-3">{job.location}, India</span>
                {job.current && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#4ade80]/20 bg-[#4ade80]/[0.06] px-2.5 py-1 text-[11.5px] font-medium text-[#86efac] lg:mt-2">
                    <span className="live-dot !h-1.5 !w-1.5" /> Current
                  </span>
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-[clamp(24px,2.6vw,32px)] font-semibold tracking-[-0.035em] text-fg">{job.company}</h3>
                  <span className="text-[14px] text-fg-3">{job.detail}</span>
                </div>
                <div className="serif-accent mt-1 text-[22px] text-fg-2">{job.role}</div>

                <ul className="mt-6 space-y-3.5">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-3.5 text-[15.5px] leading-[1.7] text-fg-2">
                      <span className="mt-[11px] h-px w-3 shrink-0 bg-white/30" />
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-1.5">
                  {job.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
