import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className={`fixed top-0 w-full z-[100] transition-all duration-300 ${isScrolled ? 'py-4 backdrop-blur-xl bg-darker/70 border-b border-white/5' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold font-space text-white z-50 relative">
            Hema<span className="text-primary">.</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link, i) => (
              <a 
                key={i} 
                href={link.href}
                className="text-gray-300 hover:text-white font-outfit text-sm uppercase tracking-widest transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-secondary group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* Connect Button */}
          <a href="#contact" className="hidden md:inline-flex px-6 py-2 border border-white/20 rounded-full font-space text-sm hover:border-primary hover:text-white transition-colors duration-300">
            Let's Talk
          </a>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden z-50 relative w-8 h-8 flex flex-col justify-center items-center gap-[6px]"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={`block w-full h-[2px] bg-white transition-transform duration-300 ${isOpen ? 'translate-y-[8px] rotate-45' : ''}`}></span>
            <span className={`block w-full h-[2px] bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-full h-[2px] bg-white transition-transform duration-300 ${isOpen ? '-translate-y-[8px] -rotate-45' : ''}`}></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-darker/95 backdrop-blur-md z-[90] flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-space font-bold text-white hover:text-primary transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
