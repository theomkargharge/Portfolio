import { Mail, Linkedin, Github, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const contactLinks = [
  {
    label: 'Send Email',
    sub: 'omkarghargeog@gmail.com',
    icon: Mail,
    href: 'mailto:omkarghargeog@gmail.com',
    primary: true,
  },
  {
    label: 'LinkedIn',
    sub: 'omkar-gharge',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/omkar-gharge-a98a59182/',
    primary: false,
  },
  {
    label: 'GitHub',
    sub: 'theomkargharge',
    icon: Github,
    href: 'https://github.com/theomkargharge',
    primary: false,
  },
];

const info = [
  { icon: Mail, label: 'Email', value: 'omkarghargeog@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 85303 23286' },
  { icon: MapPin, label: 'Location', value: 'Pune, Maharashtra, India' },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="orb orb-cyan" style={{ width: 500, height: 500, bottom: -200, right: -100, animationDelay: '-2s' }} />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="reveal-bottom-strong">
          <span
            className="inline-block text-[11px] font-semibold tracking-[3px] uppercase text-[#00d4ff] border border-[#00d4ff]/20 bg-[#00d4ff]/[0.05] px-4 py-1.5 rounded-full mb-5"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            Contact
          </span>
          <h2 className="text-[clamp(28px,4vw,52px)] font-black tracking-[-2px] leading-[1.1] mb-4">
            Let's build something{' '}
            <span className="gradient-text-cyan">great</span>
          </h2>
          <p className="text-[17px] text-[#6b7280] max-w-lg mx-auto">
            Open to new opportunities, collaborations, and interesting Flutter projects. My inbox is always open.
          </p>
        </div>

        <div
          className="reveal-blur contact-glow rounded-2xl border border-white/[0.07] p-8 md:p-12 mt-12 relative overflow-hidden"
          style={{ background: '#0c0c0c' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.04) 0%, transparent 60%)' }}
          />

          <div className="relative z-10">
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {contactLinks.map((c, i) => (
                <div key={c.label} className={`reveal-pop reveal-delay-${i + 1}`}>
                  <a
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className={`btn-shimmer inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-[14px] transition-all duration-200 group ${
                      c.primary
                        ? 'bg-[#00d4ff] text-black hover:bg-white'
                        : 'bg-white/[0.04] border border-white/[0.1] text-white hover:border-[#00d4ff]/40 hover:text-[#00d4ff]'
                    }`}
                  >
                    <c.icon size={16} />
                    {c.label}
                    <ArrowUpRight size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              ))}
            </div>

            <div className="section-divider mb-8" />

            <div className="flex flex-wrap justify-center gap-8">
              {info.map((item, i) => (
                <div key={item.label} className={`reveal-bottom reveal-delay-${i + 4}`}>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <item.icon size={13} className="text-[#00d4ff]" />
                      <span className="text-[11px] text-[#6b7280] font-semibold uppercase tracking-wider"
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {item.label}
                      </span>
                    </div>
                    <div className="text-[14px] text-[#e2e8f0] font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
