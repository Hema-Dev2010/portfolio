import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section id="about" className="min-h-screen py-24 px-6 relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="text-secondary font-space tracking-widest uppercase text-sm font-bold">Discover</span>
          <h2 className="text-5xl md:text-6xl font-bold font-space mt-2">
            About <span className="text-gradient">Me</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Image/Visuals with Parallax */}
          <div className="relative h-[500px] hidden lg:flex justify-center items-center">
            {/* Background Blob */}
            <div className="absolute w-72 h-72 bg-primary/20 rounded-full mix-blend-screen filter blur-[80px] animate-pulse"></div>

            {/* Parallax Cards */}
            <motion.div style={{ y: y1 }} className="absolute z-10 top-10 left-10 w-64 h-80 glass-card p-4 tilt-container">
              <div className="w-full h-full border border-white/10 rounded-xl bg-dark object-cover flex justify-center items-center overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/5"></div>
                <span className="text-5xl">👩‍💻</span>
              </div>
            </motion.div>

            <motion.div style={{ y: y2 }} className="absolute z-20 bottom-10 right-10 w-56 h-64 glass-card p-4 backdrop-blur-xl bg-secondary/10 tilt-container">
              <div className="w-full h-full border border-white/10 rounded-xl bg-dark object-cover flex justify-center items-center overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-white/5"></div>
                <span className="text-5xl">🚀</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Text & Stats */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4 text-gray-300 font-outfit text-lg leading-relaxed"
            >
              <p>
                As an <strong className="text-white">Associate Software Developer</strong> with 10 months of on-role experience and prior internship grounding, I specialize in crafting robust, high-performance web applications.
              </p>
              <p>
                My expertise spans the <strong className="text-secondary">.NET Core ecosystem</strong>, deep integration with <strong className="text-primary">SQL Server</strong>, and building dynamic frontends using <strong className="text-blue-400">React.js</strong>. I thrive on translating complex business requirements into sleek, scalable, and responsive software solutions.
              </p>
              <p>
                Currently pursuing my MCA, I continuously explore modern paradigms like SignalR for real-time capabilities and mobile cross-platform development with Flutter.
              </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { number: "20+", label: "Months Experience" },
                { number: "5+", label: "Projects Built" },
                { number: "10+", label: "Tech Stacks" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 text-center hover:bg-white/5 transition-colors border-t-0 border-l-0 border-b-primary/50 border-r-secondary/50"
                >
                  <h3 className="text-4xl font-space font-bold text-white mb-2">{stat.number}</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
