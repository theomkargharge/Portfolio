import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'AkbarTravels: Flights & Hotels',
    icon: '',
    desc: "One of India's leading travel booking platforms. Flights, hotels, visa services, and holiday packages — all in one app. Built and maintained at Benzy Infotech for Akbar Group.",
    tags: [
      { label: 'Flutter', color: '#00d4ff' },
      { label: 'WebSocket', color: '#10b981' },
      { label: 'Razorpay', color: '#f59e0b' },
      { label: 'CleverTap', color: '#f59e0b' },
      { label: 'GetX', color: '#00d4ff' },
    ],
    stat: '1M+ Downloads',
    statColor: '#10b981',
    links: [
      { label: 'Play Store', href: 'https://play.google.com/store/search?q=akbar%20travels&c=apps&hl=en_IN' },
      { label: 'App Store', href: 'https://apps.apple.com/app/akbar-travels/id6504057226' },
    ],
    featured: true,
  },
  {
    title: 'Buggy Sarathi — Driver App',
    icon: '',
    desc: 'A professional driver app built from scratch with real-time ride notifications, background GPS tracking, payment integration, and document uploads via S3. Improved route accuracy by 30%.',
    tags: [
      { label: 'Flutter', color: '#00d4ff' },
      { label: 'Google Maps', color: '#f59e0b' },
      { label: 'WebSocket', color: '#10b981' },
      { label: 'Firebase', color: '#f59e0b' },
      { label: 'AWS S3', color: '#f59e0b' },
    ],
    stat: '–40% Response Time',
    statColor: '#00d4ff',
    links: [
      { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=com.buggy.captain' },
    ],
    featured: false,
  },
  {
    title: 'Buggy — Ride Hailing App',
    icon: '',
    desc: 'A customer-facing ride-hailing app for Android & iOS — think Ola/Uber. Real-time tracking with moving markers (like Rapido), Google Places API, and Firebase notifications. 30% boost in user engagement.',
    tags: [
      { label: 'Flutter', color: '#00d4ff' },
      { label: 'Maps + Places', color: '#f59e0b' },
      { label: 'WebSocket', color: '#10b981' },
      { label: 'Firebase', color: '#f59e0b' },
      { label: 'Riverpod', color: '#00d4ff' },
    ],
    stat: '+25% Satisfaction',
    statColor: '#f59e0b',
    links: [
      { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=com.buggy.user' },
    ],
    featured: false,
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-28 px-6"
      style={{ background: '#080808' }}
    >
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

      <div className="max-w-6xl mx-auto">
        <div className="reveal-top-strong text-center mb-16">
          <span
            className="inline-block text-[11px] font-semibold tracking-[3px] uppercase text-[#00d4ff] border border-[#00d4ff]/20 bg-[#00d4ff]/[0.05] px-4 py-1.5 rounded-full mb-5"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            Projects
          </span>
          <h2 className="text-[clamp(28px,4vw,48px)] font-black tracking-[-2px] leading-[1.1]">
            Apps I've{' '}
            <span className="gradient-text-cyan">shipped</span>
          </h2>
          <p className="text-[17px] text-[#6b7280] mt-4 max-w-lg mx-auto">
            Real production apps used by real people — millions of them.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <div
              key={p.title}
              className={`${i % 2 === 0 ? 'reveal-left' : 'reveal-right'} reveal-delay-${Math.min(i + 1, 4)} glow-card relative rounded-2xl border border-white/[0.07] overflow-hidden flex flex-col`}
              style={{ background: '#0c0c0c' }}
            >
              {p.featured && (
                <div
                  className="absolute top-4 right-4 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-[#00d4ff]/25 text-[#00d4ff]"
                  style={{ background: 'rgba(0,212,255,0.07)', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Featured
                </div>
              )}

              <div className="project-card-line" />

              <div className="p-6 flex-1">
                <span className="text-[42px] block mb-4 leading-none select-none">{p.icon}</span>
                <h3 className="text-[18px] font-bold tracking-tight mb-2">{p.title}</h3>
                <p className="text-[14px] text-[#9ca3af] leading-[1.7]">{p.desc}</p>

                <div className="flex gap-2 mt-4">
                  {p.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] text-[#6b7280] hover:text-[#00d4ff] border border-white/[0.07] hover:border-[#00d4ff]/30 px-3 py-1.5 rounded-lg transition-all duration-200"
                      style={{ background: 'rgba(255,255,255,0.02)' }}
                    >
                      {l.label} <ExternalLink size={11} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2 px-6 py-4 border-t border-white/[0.05]">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md"
                      style={{
                        color: tag.color,
                        background: `${tag.color}12`,
                        border: `1px solid ${tag.color}22`,
                        fontFamily: 'JetBrains Mono, monospace',
                      }}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
                <span
                  className="text-[11px] font-bold px-2.5 py-1 rounded-full border"
                  style={{
                    color: p.statColor,
                    background: `${p.statColor}10`,
                    borderColor: `${p.statColor}22`,
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {p.stat}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
