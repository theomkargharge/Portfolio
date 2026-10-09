import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../data';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] pt-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-[15px] font-medium text-fg">{profile.name}</div>
          <div className="mt-1 text-[13.5px] text-fg-3">
            {profile.role} · {profile.location}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {[
            { icon: Github, href: profile.github, label: 'GitHub' },
            { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
            { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] text-fg-3 transition-colors hover:border-white/20 hover:text-fg"
            >
              <Icon size={16} />
            </a>
          ))}
          <a
            href="#top"
            aria-label="Back to top"
            className="ml-2 flex h-10 items-center gap-2 rounded-full border border-white/[0.08] px-4 text-[13px] text-fg-2 transition-colors hover:border-white/20 hover:text-fg"
          >
            Top <ArrowUp size={14} />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 px-5 text-[12.5px] text-fg-4 sm:flex-row sm:justify-between sm:px-6">
        <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
        <span>Designed &amp; built by Omkar · React + Tailwind</span>
      </div>

      <div className="wordmark pointer-events-none mt-8 select-none whitespace-nowrap text-center" aria-hidden="true">
        Omkar Gharge
      </div>
    </footer>
  );
}
