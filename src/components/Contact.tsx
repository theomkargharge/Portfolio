import { useState, type CSSProperties } from 'react';
import { ArrowUpRight, Check, Copy, FileText, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { profile } from '../data';

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

const links = [
  { icon: Linkedin, label: 'LinkedIn', href: profile.linkedin },
  { icon: Github, label: 'GitHub', href: profile.github },
  { icon: FileText, label: 'Résumé', href: profile.resume },
  { icon: Phone, label: profile.phone, href: profile.phoneHref },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="reveal card relative px-6 py-16 text-center sm:px-12 sm:py-24">
          <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(70% 60% at 50% 0%, rgba(124,108,255,0.22), transparent 70%)' }} />
          <div className="hero-grid absolute inset-0 -z-10 opacity-70" />

          <div className="eyebrow flex items-center justify-center gap-3">
            <span className="text-fg-2">05</span>
            <span className="h-px w-8 bg-white/15" />
            Contact
          </div>

          <h2 className="display mx-auto mt-6 max-w-4xl text-balance text-[clamp(38px,6.2vw,80px)] text-fg">
            Have an idea worth shipping?{' '}
            <span className="serif-accent text-grad block pr-2">Let’s build it.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-[16.5px] leading-relaxed text-fg-2">
            A mobile app, an AI feature, or a role on your team — I’m open to new opportunities and collaborations. Email is the fastest way to reach me.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={`mailto:${profile.email}`} className="btn btn-primary !h-12 !px-6">
              <Mail size={16} /> Send an email
            </a>
            <button onClick={copy} className="btn btn-ghost !h-12 !px-5 font-mono !text-[13.5px]" aria-live="polite">
              {copied ? <Check size={15} className="text-[#4ade80]" /> : <Copy size={15} className="text-fg-3" />}
              {copied ? 'Copied to clipboard' : profile.email}
            </button>
          </div>

          <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-white/[0.07] pt-8" style={d(0)}>
            {links.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') || href.endsWith('.pdf') ? '_blank' : undefined}
                rel="noreferrer"
                className="group inline-flex items-center gap-2 text-[14px] text-fg-2 transition-colors hover:text-fg"
              >
                <Icon size={15} className="text-fg-3 transition-colors group-hover:text-fg" />
                <span className="link-u">{label}</span>
                {href.startsWith('http') && <ArrowUpRight size={13} className="text-fg-3" />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
