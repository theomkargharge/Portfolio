const skills = [
  { name: 'Flutter', tag: 'primary SDK', level: 95, color: '#00d4ff' },
  { name: 'Dart', tag: 'language', level: 92, color: '#00d4ff' },
  { name: 'Java', tag: 'language', level: 70, color: '#f59e0b' },
  { name: 'Firebase', tag: 'backend', level: 88, color: '#f59e0b' },
  { name: 'Supabase', tag: 'backend', level: 78, color: '#10b981' },
  { name: 'GetX', tag: 'state mgmt', level: 90, color: '#00d4ff' },
  { name: 'Riverpod', tag: 'state mgmt', level: 82, color: '#00d4ff' },
  { name: 'WebSocket', tag: 'real-time', level: 85, color: '#10b981' },
  { name: 'Google Maps', tag: 'API', level: 87, color: '#f59e0b' },
  { name: 'Razorpay', tag: 'payments', level: 83, color: '#f59e0b' },
  { name: 'AWS S3', tag: 'cloud', level: 72, color: '#f59e0b' },
  { name: 'Git / GitHub', tag: 'devops', level: 88, color: '#6b7280' },
];

function SkillCard({ name, tag, level, color }: { name: string; tag: string; level: number; color: string }) {
  return (
    <div
      className="glow-card rounded-xl border border-white/[0.07] p-5 cursor-default"
      style={{ background: '#0c0c0c' }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-[15px] font-semibold text-white">{name}</div>
          <div
            className="text-[11px] mt-0.5"
            style={{ color, fontFamily: 'JetBrains Mono, monospace' }}
          >
            {tag}
          </div>
        </div>
        <span className="text-[12px] font-bold" style={{ color }}>{level}%</span>
      </div>
      <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${level}%`,
            background: `linear-gradient(90deg, ${color}, ${color}66)`,
            transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-28 px-6"
      style={{ background: '#080808' }}
    >
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

      <div className="max-w-6xl mx-auto">
        <div className="reveal text-center mb-16">
          <span
            className="inline-block text-[11px] font-semibold tracking-[3px] uppercase text-[#00d4ff] border border-[#00d4ff]/20 bg-[#00d4ff]/[0.05] px-4 py-1.5 rounded-full mb-5"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            Tech Stack
          </span>
          <h2 className="text-[clamp(28px,4vw,48px)] font-black tracking-[-2px] leading-[1.1]">
            What I{' '}
            <span className="gradient-text-cyan">work with</span>
          </h2>
          <p className="text-[17px] text-[#6b7280] mt-4 max-w-lg mx-auto">
            A focused toolkit for building production-grade Flutter applications.
          </p>
        </div>

        <div className="reveal grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {skills.map((s) => (
            <SkillCard key={s.name} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
