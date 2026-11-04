import { useEffect, useRef, type CSSProperties } from 'react';
import SectionHeading from './SectionHeading';
import { Station } from './JourneyPhone';
import { experience } from '../data';

export default function Experience() {
  const list = useRef<HTMLOListElement>(null);

  // The timeline draws itself as you read: a comet runs down the rail and lights each job as it passes
  useEffect(() => {
    const el = list.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.55 - r.top) / r.height));
      el.style.setProperty('--p', p.toFixed(4));
      el.querySelectorAll<HTMLElement>(':scope > li').forEach((li) => li.classList.toggle('is-lit', li.offsetTop + 52 <= p * r.height));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

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

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16">
          <ol ref={list} className="timeline relative border-b border-line/[0.07]" style={{ '--p': 0 } as CSSProperties}>
            <span className="tl-track" aria-hidden="true">
              <span className="tl-fill" />
              <span className="tl-comet" />
            </span>
            {experience.map((job, i) => (
              <li
                key={job.company}
                className="reveal group relative grid gap-6 border-t border-line/[0.07] py-10 pl-8 sm:py-12 sm:pl-12 lg:grid-cols-[180px_1fr] lg:gap-10"
                style={{ '--d': `${i * 80}ms` } as CSSProperties}
              >
                <span className="tl-node" aria-hidden="true" />
                <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2 lg:flex-col lg:items-start">
                  <span className="font-mono text-[13px] text-fg-2">{job.period}</span>
                  <span className="font-mono text-[13px] text-fg-3">{job.location}, India</span>
                  {job.current && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-ok/20 bg-ok/[0.06] px-2.5 py-1 text-[11.5px] font-medium text-ok lg:mt-2">
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
                        <span className="mt-[11px] h-px w-3 shrink-0 bg-line/30" />
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

          {/* the journey phone parks here as a career app while you read */}
          <div className="relative hidden lg:block">
            <div className="sticky top-[calc(50vh-277px)] flex justify-center">
              <Station id="career" sticky className="[--pw:260px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
