import { useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import TechTicker from './components/TechTicker';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
          } else {
            e.target.classList.remove('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Select all elements with reveal animation classes
    const revealSelectors = [
      '.reveal', '.reveal-left', '.reveal-right', '.reveal-top', '.reveal-bottom',
      '.reveal-top-strong', '.reveal-bottom-strong',
      '.reveal-scale', '.reveal-zoom', '.reveal-rotate', '.reveal-blur',
      '.reveal-bounce', '.reveal-pop', '.reveal-fast', '.reveal-fastest'
    ];
    
    revealSelectors.forEach(selector => {
      const els = document.querySelectorAll(selector);
      els.forEach((el) => {
        observer.observe(el);
        // Trigger immediately for elements already visible on page load
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('in-view');
        }
      });
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="noise" style={{ background: '#030303' }}>
      <Nav />
      <Hero />
      <TechTicker />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
