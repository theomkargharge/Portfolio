import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import portrait from '../assets/portrait.jpg';
import { profile } from '../data';

const links = [
  { label: 'Work', id: 'work' },
  { label: 'Experience', id: 'experience' },
  { label: 'Stack', id: 'stack' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-4">
      <nav
        className={`mx-auto mt-3 flex h-14 max-w-6xl items-center justify-between rounded-full border pl-2 pr-2 transition-all duration-500 ${
          solid
            ? 'border-white/[0.08] bg-[#0b0b0e]/75 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <a href="#top" className="group flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3" onClick={() => setOpen(false)}>
          <img src={portrait} alt="" className="h-8 w-8 rounded-full object-cover ring-1 ring-white/15" />
          <span className="text-[14.5px] font-medium tracking-[-0.01em] text-fg">{profile.name}</span>
        </a>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`rounded-full px-3.5 py-1.5 text-[13.5px] transition-colors duration-200 ${
                  active === l.id ? 'bg-white/[0.07] text-fg' : 'text-fg-2 hover:text-fg'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-1.5 md:flex">
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="rounded-full px-3.5 py-2 text-[13.5px] text-fg-2 transition-colors hover:text-fg"
          >
            Résumé
          </a>
          <a href="#contact" className="btn btn-primary !h-10 !px-4 !text-[13.5px]">
            Let’s talk <ArrowUpRight size={15} className="arrow arrow-up" />
          </a>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-fg-2 transition-colors hover:bg-white/[0.06] hover:text-fg md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </nav>

      {open && (
        <div className="intro mx-auto mt-2 max-w-6xl rounded-3xl border border-white/[0.08] bg-[#0b0b0e]/95 p-3 backdrop-blur-xl md:hidden" style={{ ['--d' as string]: '0ms' }}>
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[17px] text-fg transition-colors hover:bg-white/[0.04]"
            >
              {l.label}
              <span className="font-mono text-[11px] text-fg-3">{`#${l.id}`}</span>
            </a>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-white/[0.06] pt-3">
            <a href={profile.resume} target="_blank" rel="noreferrer" className="btn btn-ghost">
              Résumé
            </a>
            <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary">
              Let’s talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
