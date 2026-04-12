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

import { useEffect, useRef, useState } from 'react';

function SkillCard({ name, tag, level, color }: { name: string; tag: string; level: number; color: string }) {
  const barRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimating) {
            setIsAnimating(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, [isAnimating]);

  return (
    <div
      className="glow-card group rounded-xl border border-white/[0.07] p-5 cursor-default overflow-hidden relative"
      style={{ background: '#0c0c0c' }}
    >
      {/* Futuristic background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${color}08, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-[15px] font-semibold text-white tracking-tight">{name}</div>
            <div
              className="text-[11px] mt-1 font-medium opacity-75"
              style={{ color, fontFamily: 'JetBrains Mono, monospace' }}
            >
              {tag}
            </div>
          </div>
          <div
            className="text-[12px] font-bold tabular-nums px-2.5 py-1 rounded-md"
            style={{
              color: color,
              background: `${color}15`,
              border: `1px solid ${color}30`,
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            {level}%
          </div>
        </div>

        {/* Animated progress bar */}
        <div
          ref={barRef}
          className="relative h-[2px] rounded-full overflow-hidden group/bar"
          style={{
            background: 'rgba(255,255,255,0.05)',
            boxShadow: `inset 0 0 0 1px ${color}10`,
          }}
        >
          {/* Background glow effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(90deg, transparent, ${color}30, transparent)`,
              filter: 'blur(8px)',
            }}
          />

          {/* Animated bar fill */}
          <div
            className="h-full rounded-full relative"
            style={{
              width: isAnimating ? `${level}%` : '0%',
              background: `linear-gradient(90deg, ${color}, ${color}66, ${color})`,
              transition: `width 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)`,
              boxShadow: `0 0 12px ${color}66, inset 0 0 8px ${color}33`,
            }}
          >
            {/* Moving shine effect */}
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover/bar:opacity-60"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)`,
                animation: 'shimmer 2s infinite',
              }}
            />
          </div>
        </div>

        {/* Futuristic accent line */}
        <div
          className="absolute bottom-0 left-0 h-px opacity-0 group-hover:opacity-100 transition-all duration-500"
          style={{
            width: isAnimating ? `${level}%` : '0%',
            background: `linear-gradient(90deg, transparent, ${color}88)`,
            transition: `all 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)`,
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
        <div className="reveal-top-strong text-center mb-16">
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {skills.map((s, i) => (
            <div key={s.name} className={`reveal-zoom reveal-delay-${Math.min(i + 1, 12)}`}>
              <SkillCard {...s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
