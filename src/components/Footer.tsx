import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="border-t border-white/[0.06] px-6 py-8 reveal-top"
      style={{ background: '#080808' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="text-[15px] font-bold text-white"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            <span style={{ color: '#00d4ff' }}>&lt;</span>
            OG
            <span style={{ color: '#00d4ff' }}>/&gt;</span>
          </span>
          <span className="text-[#374151]">·</span>
          <span className="text-[13px] text-[#4b5563]">Flutter Developer — Pune, India</span>
        </div>

        <div className="flex items-center gap-1.5">
          {[
            { icon: Github, href: 'https://github.com/theomkargharge', label: 'GitHub' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/omkar-gharge-a98a59182/', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:omkarghargeog@gmail.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/[0.07] text-[#6b7280] hover:text-[#00d4ff] hover:border-[#00d4ff]/30 transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <Icon size={14} />
            </a>
          ))}
        </div>

        <div className="text-[12px] text-[#374151]">
          © 2026{' '}
          <span className="text-[#6b7280]">Omkar Gharge</span>
          {' '}— All rights reserved
        </div>
      </div>
    </footer>
  );
}
