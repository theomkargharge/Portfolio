import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-[#030303]/90 border-white/[0.08] backdrop-blur-xl'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="text-[15px] font-bold tracking-tight text-white hover:text-[#00d4ff] transition-colors"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          <span className="text-[#00d4ff]">&lt;</span>
          OG
          <span className="text-[#00d4ff]">/&gt;</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[13px] font-medium text-[#6b7280] hover:text-white transition-colors duration-200 tracking-wide"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="mailto:omkarghargeog@gmail.com"
          className="hidden md:inline-flex items-center gap-2 btn-shimmer bg-[#00d4ff] text-black text-[13px] font-semibold px-5 py-2 rounded-lg hover:bg-white transition-colors duration-200"
        >
          Hire Me
        </a>

        <button
          className="md:hidden text-[#6b7280] hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#080808] border-t border-white/[0.06] px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[14px] text-[#9ca3af] hover:text-white transition-colors py-1"
            >
              {l.label}
            </a>
          ))}
          <a
            href="mailto:omkarghargeog@gmail.com"
            className="inline-flex w-fit items-center gap-2 bg-[#00d4ff] text-black text-[13px] font-semibold px-5 py-2 rounded-lg mt-1"
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  );
}
