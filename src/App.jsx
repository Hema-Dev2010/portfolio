import { useEffect } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import Hero from './sections/Hero';

import Projects from './sections/Projects';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './sections/About';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import AdminChat from './sections/AdminChat';

function App() {
  const currentPath = window.location.pathname;

  if (currentPath === '/admin' || currentPath === '/admin/') {
    return <AdminChat />;
  }

  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    }
  }, []);

  return (
    <div className="font-outfit antialiased selection:bg-primary selection:text-white">
      <CustomCursor />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
