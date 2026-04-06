import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { projects } from '../data/projects';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.15}
        glareColor="lightblue"
        glarePosition="all"
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        className="h-full"
      >
        <div className="glass-card h-full p-6 flex flex-col group relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]">
          {/* Animated Gradient Border on Hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

          {/* Image Placeholder */}
          <div className="w-full h-48 bg-dark rounded-xl mb-6 relative overflow-hidden border border-white/5 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-500">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/5 pointer-events-none"></div>
            {project.imagePlaceholder}
          </div>

          <h3 className="text-2xl font-space font-bold mb-3">{project.title}</h3>
          
          <p className="text-gray-400 font-outfit text-sm mb-6 flex-grow">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t, i) => (
              <span key={i} className="text-xs px-3 py-1 bg-white/5 rounded-full font-space text-secondary border border-secondary/20">
                {t}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10 z-10">
            <a 
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <FiGithub /> Code
            </a>
            <a 
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors"
            >
              Live Demo <FiExternalLink />
            </a>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="min-h-screen py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-primary font-space tracking-widest uppercase text-sm font-bold">Portfolio</span>
          <h2 className="text-5xl md:text-6xl font-bold font-space mt-2">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
