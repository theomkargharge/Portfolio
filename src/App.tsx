import { useEffect } from 'react';
import Splash from './components/Splash';
import Starfield from './components/Starfield';
import JourneyPhone from './components/JourneyPhone';
import Nav from './components/Nav';
import Hero from './components/Hero';
import TechTicker from './components/TechTicker';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  // Reveal elements once as they scroll into view — including ones mounted later
  // (the Work section swaps layouts at the desktop breakpoint)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    const watch = (root: ParentNode) => root.querySelectorAll('.reveal:not(.in-view)').forEach((el) => observer.observe(el));
    watch(document);
    const added = new MutationObserver((records) =>
      records.forEach((r) =>
        r.addedNodes.forEach((n) => {
          if (!(n instanceof Element)) return;
          if (n.matches('.reveal:not(.in-view)')) observer.observe(n);
          watch(n);
        })
      )
    );
    added.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      added.disconnect();
    };
  }, []);

  // Cursor spotlight on any .spot card
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('.spot');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div className="grain relative isolate min-h-screen overflow-x-clip bg-ink text-fg">
      <Splash />
      <Starfield />
      <Nav />
      <main>
        <Hero />
        <TechTicker />
        <Projects />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
      <JourneyPhone />
      <Footer />
    </div>
  );
}

export default App;
