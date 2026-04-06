import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
//import { FaGithub, FaLinkedin, FaEnvelope } from 'react-contact-icons'; // We will use generic react-icons instead
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import myImage from '../assets/hero-image.jpg';

const Hero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background Animated Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">

        {/* Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          {/* <motion.div variants={itemVariants} className="inline-block">
            <span className="glass-card px-4 py-2 text-sm md:text-base font-outfit text-secondary uppercase tracking-widest rounded-full">
              👋 Welcome to my portfolio
            </span>
          </motion.div> */}

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold leading-tight">
            Hi, I'm <br />
            <span className="text-gradient drop-shadow-[0_0_15px_rgba(138,43,226,0.5)]">Hemangi Jadhav</span>
          </motion.h1>

          <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-outfit text-gray-300 font-medium h-20 md:h-12">
            <Typewriter
              words={[

                'Associate Software Developer',
                'MCA Student | .NET Developer',

              ]}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </motion.h2>

          <motion.div variants={itemVariants} className="text-gray-400 font-outfit text-lg max-w-lg leading-relaxed space-y-2">
            <p className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
              MCA Student | .NET Developer
            </p>
            <p className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
              I build modern web, mobile, and real-time applications using .NET Core, React, SQL Server, and SignalR.

            </p>
            <p className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
              10 Months On-Role Experience
            </p>
            <p className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
              10 Months Internship as Associate Software Developer
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-4">
            <a href="#http://pos-test.shauryatechnosoft.com/login" className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-blue-600 rounded-full font-bold text-white shadow-[0_0_20px_rgba(138,43,226,0.3)] hover:shadow-[0_0_30px_rgba(138,43,226,0.6)] transition-shadow duration-300 transform hover:-translate-y-1">
              View Projects
            </a>
            <button className="px-8 py-3 bg-transparent border border-white/20 rounded-full font-bold text-white hover:bg-white/5 transition-colors duration-300 transform hover:-translate-y-1">
              Download Resume
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex gap-6 mt-8">
            <a href="https://github.com/hemangijadhav-source" className="p-3 glass-card text-xl hover:text-secondary hover:-translate-y-2 transition-all duration-300"><FiGithub /></a>
            <a href="#" className="p-3 glass-card text-xl hover:text-secondary hover:-translate-y-2 transition-all duration-300"><FiLinkedin /></a>
            <a href="#" className="p-3 glass-card text-xl hover:text-secondary hover:-translate-y-2 transition-all duration-300"><FiMail /></a>
          </motion.div>

        </motion.div>

        {/* Image / 3D Element Space */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex justify-center items-center h-[400px] md:h-[500px]"
        >
          {/* Glowing Outer Rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full border border-dashed border-primary/40"
          ></motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-solid border-secondary/20"
          ></motion.div>

          {/* Main Image Container */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden glowing-shadow bg-darker border-2 border-white/10 p-2 z-10 flex items-center justify-center">
            {/* Inner profile image */}
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden relative">
              <img src={myImage} alt="Hemangi" className="w-full h-full object-cover relative z-10" />
            </div>
          </div>

          {/* Floating UI Elements */}
          {/* Top Right */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-6 right-0 md:right-10 glass-card p-3 flex items-center gap-2 z-20"
          >
            <span className="text-2xl">⚡</span>
            <div>
              <p className="text-xs text-gray-400">Total Experience</p>
              <p className="font-bold text-sm">20 Months</p>
            </div>
          </motion.div>

          {/* Left Center */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 -left-8 md:-left-20 -translate-y-1/2 glass-card p-3 flex items-center gap-2 z-20"
          >
            <span className="text-2xl">🏢</span>
            <div>
              <p className="text-xs text-gray-400">Current Position</p>
              <p className="font-bold text-sm">Associate Software</p>
              <p className="font-bold text-sm">Developer</p>
            </div>
          </motion.div>

          {/* Right Center */}
          <motion.div
            animate={{ y: [8, -8, 8] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute top-1/2 -right-8 md:-right-20 -translate-y-1/2 glass-card p-3 flex items-center gap-2 z-20"
          >
            <span className="text-2xl">🗄️</span>
            <div>
              <p className="text-xs text-gray-400">Expertise</p>
              <p className="font-bold text-sm">.NET Core • SQL Server</p>
              <p className="font-bold text-sm">• APIs</p>
            </div>
          </motion.div>

          {/* Bottom Left */}
          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-6 left-0 md:left-10 glass-card p-3 flex items-center gap-2 z-20"
          >
            <span className="text-2xl">💻</span>
            <div>
              <p className="text-xs text-gray-400">Core Stack</p>
              <p className="font-bold text-sm">React & .NET</p>
            </div>
          </motion.div>

          {/* Bottom Right */}
          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-6 right-0 md:right-10 glass-card p-3 flex items-center gap-2 z-20"
          >
            <span className="text-2xl">🎓</span>
            <div>
              <p className="text-xs text-gray-400">MCA Student</p>
              <p className="font-bold text-sm">9.7 CGPA</p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
