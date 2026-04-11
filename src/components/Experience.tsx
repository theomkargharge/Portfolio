const experiences = [
  {
    company: 'Benzy Infotech · Akbar Group',
    role: 'Flutter Developer',
    period: 'Jan 2025 – Present',
    active: true,
    points: [
      'Developing and maintaining AkbarTravels — a Flutter app with 1M+ downloads across iOS and Android.',
      'Built core features for flights, hotels, visa services, and holiday packages with seamless UX.',
      'Integrated CleverTap for push notifications, Deep Linking, and payment gateways (Razorpay, Tamara, Tabby).',
      'Built a real-time AI ChatBot using WebSocket for ticket booking and live agent escalation.',
      'Managed app deployment and updates on Google Play Store and Apple App Store.',
    ],
    tags: ['Flutter', 'GetX', 'WebSocket', 'Razorpay', 'CleverTap'],
  },
  {
    company: 'Movilidad Technologies',
    role: 'Flutter Developer',
    period: 'Jun 2023 – Dec 2024',
    active: false,
    points: [
      'Integrated Google Maps with real-time location tracking, improving navigation by 25% user engagement.',
      'Implemented WebSocket for real-time communication, reducing data sync delays by 30%.',
      'Developed background services for continuous location tracking — 20% uptime improvement.',
      'Added custom animations and transitions, leading to a 15% boost in user retention.',
      'Created fully responsive UI across device sizes, reducing design rework by 20%.',
    ],
    tags: ['Flutter', 'Google Maps', 'WebSocket', 'Firebase', 'AWS S3'],
  },
  {
    company: 'Dr. BATU, Pune',
    role: 'B.Tech in Computer Science & Engineering',
    period: 'Feb 2019 – Jun 2023',
    active: false,
    points: [
      'Graduated with a CGPA of 8.47 from Dr. Babasaheb Ambedkar Technological University.',
      'Built foundational expertise in software engineering, algorithms, and mobile development.',
    ],
    tags: ['Computer Science', 'Algorithms', 'Java', 'CGPA 8.47'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="reveal text-center mb-16">
          <span
            className="inline-block text-[11px] font-semibold tracking-[3px] uppercase text-[#00d4ff] border border-[#00d4ff]/20 bg-[#00d4ff]/[0.05] px-4 py-1.5 rounded-full mb-5"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            Experience
          </span>
          <h2 className="text-[clamp(28px,4vw,48px)] font-black tracking-[-2px] leading-[1.1]">
            My{' '}
            <span className="gradient-text-cyan">professional journey</span>
          </h2>
        </div>

        <div className="relative pl-8 md:pl-12">
          <div
            className="absolute left-[11px] md:left-[15px] top-2 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, #00d4ff, rgba(0,212,255,0.15), transparent)' }}
          />

          <div className="flex flex-col gap-10">
            {experiences.map((exp, i) => (
              <div key={i} className={`reveal reveal-delay-${Math.min(i + 1, 4)} relative`}>
                <div
                  className="absolute -left-8 md:-left-12 top-[22px] translate-x-[3px] w-4 h-4 rounded-full border-2 flex items-center justify-center"
                  style={{
                    background: exp.active ? '#00d4ff' : '#0c0c0c',
                    borderColor: exp.active ? '#00d4ff' : 'rgba(255,255,255,0.12)',
                    boxShadow: exp.active ? '0 0 16px rgba(0,212,255,0.4)' : 'none',
                    animation: exp.active ? 'glow-pulse 3s ease-in-out infinite' : 'none',
                  }}
                />

                <div
                  className="glow-card rounded-2xl border border-white/[0.07] p-6 md:p-8"
                  style={{ background: '#0c0c0c' }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                    <span
                      className="text-[12px] font-semibold tracking-wider uppercase"
                      style={{ color: '#00d4ff', fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      {exp.company}
                    </span>
                    <span
                      className="text-[12px] text-[#6b7280] border border-white/[0.07] px-3 py-1 rounded-full"
                      style={{ fontFamily: 'JetBrains Mono, monospace', background: 'rgba(255,255,255,0.02)' }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <h3 className="text-[20px] font-bold tracking-tight mb-4">{exp.role}</h3>

                  <ul className="space-y-2.5 mb-5">
                    {exp.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-3 text-[14px] text-[#9ca3af] leading-[1.65]">
                        <span className="flex-shrink-0 mt-[5px]" style={{ color: '#00d4ff' }}>→</span>
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-md border border-white/[0.06] text-[#6b7280]"
                        style={{ background: 'rgba(255,255,255,0.02)', fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
