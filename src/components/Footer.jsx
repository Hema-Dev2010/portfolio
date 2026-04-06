import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="relative py-8 px-6 border-t border-white/10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-sm h-32 bg-primary/10 filter blur-[80px]"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center z-10 relative gap-6">
        
        <div className="text-center md:text-left">
          <p className="text-xl font-bold font-space text-white">Hema<span className="text-primary">.</span></p>
          <p className="text-sm font-outfit text-gray-500 mt-2">© {new Date().getFullYear()} Hemangi Jadhav. All rights reserved.</p>
        </div>

        <div className="flex gap-4">
          <a href="https://github.com/hemangijadhav-source" className="text-gray-400 hover:text-white transition-colors p-2 glass-card rounded-full hover:bg-white/10"><FiGithub /></a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 glass-card rounded-full hover:bg-white/10"><FiLinkedin /></a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 glass-card rounded-full hover:bg-white/10"><FiMail /></a>
        </div>

        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 text-sm font-space text-gray-400 hover:text-secondary transition-colors"
        >
          Back to top <FiArrowUp />
        </button>

      </div>
    </footer>
  );
};

export default Footer;
