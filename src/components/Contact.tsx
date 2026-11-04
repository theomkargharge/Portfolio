import { useState, type CSSProperties } from 'react';
import { ArrowUpRight, Check, Copy, FileText, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { Station } from './JourneyPhone';
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
        <div className="reveal card relative px-6 pt-16 sm:px-12 sm:pt-20">
          <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(70% 60% at 50% 0%, rgb(var(--accent-rgb) / 0.2), transparent 70%)' }} />
          <div className="planet" aria-hidden="true" />

          <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
            <div className="text-center lg:pb-[116px] lg:text-left">
              <div className="eyebrow flex items-center justify-center gap-3 lg:justify-start">
                <span className="text-fg-2">05</span>
                <span className="h-px w-8 bg-line/15" />
                Contact
              </div>

              <h2 className="display mx-auto mt-6 max-w-4xl text-balance text-[clamp(38px,5.4vw,68px)] text-fg lg:mx-0">
                Have an idea worth shipping?{' '}
                <span className="serif-accent text-grad block pr-2">Let’s build it.</span>
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-[16.5px] leading-relaxed text-fg-2 lg:mx-0">
                A mobile app, an AI feature, or a role on your team — I’m open to new opportunities and collaborations. Email is the fastest way to reach me.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                <a href={`mailto:${profile.email}`} className="btn btn-primary !h-12 !px-6">
                  <Mail size={16} /> Send an email
                </a>
                <button onClick={copy} className="btn btn-ghost !h-12 !px-5 font-mono !text-[13.5px]" aria-live="polite">
                  {copied ? <Check size={15} className="text-ok" /> : <Copy size={15} className="text-fg-3" />}
                  {copied ? 'Copied to clipboard' : profile.email}
                </button>
              </div>

              <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-line/[0.07] pt-8 lg:mx-0 lg:justify-start" style={d(0)}>
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

            {/* the end of the trip: the journey phone touches down on the planet, an email half-written */}
            <div className="relative flex justify-center pb-[80px] pt-4">
              <Station id="contact" className="[--pw:170px] sm:[--pw:200px] lg:[--pw:230px]" />
              <span className="landing-glow" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
