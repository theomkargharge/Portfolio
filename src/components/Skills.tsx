import type { CSSProperties, ReactNode } from 'react';
import { Brain, CreditCard, Plug, Server, Smartphone, Wrench } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { skillGroups } from '../data';

type Group = { title: string; blurb: string; items: string[] };

const pipeline = ['Query', 'Embed', 'Vector DB', 'Retrieve', 'LLM', 'Agent'];

function GroupCard({ group, icon, className = '', delay = 0, children }: { group: Group; icon: ReactNode; className?: string; delay?: number; children?: ReactNode }) {
  return (
    <div className={`reveal card spot flex flex-col p-6 sm:p-8 ${className}`} style={{ '--d': `${delay}ms` } as CSSProperties}>
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-fg-2">{icon}</span>
        <h3 className="text-[19px] font-semibold tracking-[-0.025em] text-fg">{group.title}</h3>
      </div>
      <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-fg-3">{group.blurb}</p>
      {children}
      <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
        {group.items.map((s) => (
          <span key={s} className="chip">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const g = skillGroups;
  return (
    <section id="stack" className="relative overflow-hidden py-24 sm:py-32">
      <div className="glow left-1/2 top-1/3 h-[420px] w-[720px] -translate-x-1/2 bg-[#7c6cff]/[0.07]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          index="03"
          label="Stack"
          title={
            <>
              Mobile craft, <span className="serif-accent text-grad pr-1">AI fluency.</span>
            </>
          }
          aside="The tools I reach for — from Flutter state management to retrieval pipelines and the infrastructure that serves them."
        />

        <div className="grid gap-4 md:grid-cols-6">
          <GroupCard group={g.ai} icon={<Brain size={17} />} className="md:col-span-4">
            <div className="mt-7 rounded-2xl border border-white/[0.06] bg-black/20 p-4 sm:p-5">
              <div className="eyebrow mb-4 !text-[10.5px]">RAG pipeline</div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-x-0 sm:gap-y-3">
                {pipeline.map((n, i) => (
                  <div key={n} className="flex items-center">
                    <span
                      className="pipe-node rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 font-mono text-[12px] text-fg-2"
                      style={{ '--i': i } as CSSProperties}
                    >
                      {n}
                    </span>
                    {i < pipeline.length - 1 && <span className="mx-1.5 hidden h-px w-6 bg-white/15 sm:block" />}
                  </div>
                ))}
              </div>
            </div>
          </GroupCard>

          <GroupCard group={g.mobile} icon={<Smartphone size={17} />} className="md:col-span-2" delay={80}>
            <div className="mt-7 space-y-2">
              {[
                { os: 'iOS', store: 'App Store' },
                { os: 'Android', store: 'Google Play' },
              ].map((t) => (
                <div key={t.os} className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-black/20 px-3.5 py-2.5 font-mono text-[12px]">
                  <span className="text-fg">{t.os}</span>
                  <span className="flex items-center gap-2 text-fg-3">
                    {t.store} <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
                  </span>
                </div>
              ))}
            </div>
          </GroupCard>
          <GroupCard group={g.backend} icon={<Server size={17} />} className="md:col-span-2" delay={0} />
          <GroupCard group={g.payments} icon={<CreditCard size={17} />} className="md:col-span-2" delay={80} />
          <GroupCard group={g.integrations} icon={<Plug size={17} />} className="md:col-span-2" delay={160} />

          <div className="reveal card spot grid gap-6 p-6 sm:p-8 md:col-span-6 md:grid-cols-[280px_1fr] md:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-fg-2">
                  <Wrench size={17} />
                </span>
                <h3 className="text-[19px] font-semibold tracking-[-0.025em] text-fg">{g.tools.title}</h3>
              </div>
              <p className="mt-3 text-[14.5px] leading-relaxed text-fg-3">{g.tools.blurb}</p>
            </div>
            <div className="flex flex-wrap gap-1.5 md:justify-end">
              {g.tools.items.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
