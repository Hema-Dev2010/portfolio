import { motion } from 'framer-motion';

const skillsData = [
  { name: ".NET Core", icon: "🌐", color: "text-purple-400" },
  { name: "React.js", icon: "⚛️", color: "text-blue-400" },
  { name: "SQL Server", icon: "🛢️", color: "text-gray-300" },
  //{ name: "Flutter", icon: "📱", color: "text-blue-300" },
  { name: "SignalR", icon: "📡", color: "text-red-400" },
  { name: "Dapper ORM", icon: "⚡", color: "text-yellow-400" },
  { name: "JavaScript", icon: "💛", color: "text-yellow-300" },
  //{ name: "Tailwind CSS", icon: "🎨", color: "text-teal-400" },
  { name: "Git", icon: "🔧", color: "text-orange-500" },
  { name: "Web APIs", icon: "🔌", color: "text-green-400" }
];

const Skills = () => {
  return (
    <section id="skills" className="min-h-screen py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="text-secondary font-space tracking-widest uppercase text-sm font-bold">Expertise</span>
          <h2 className="text-5xl md:text-6xl font-bold font-space mt-2">
            My <span className="text-gradient">Tech Stack</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-4xl mx-auto">
          {skillsData.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                boxShadow: "0 0 20px rgba(0, 255, 255, 0.4)",
                borderColor: "rgba(0, 255, 255, 0.5)"
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="glass-card flex flex-col items-center justify-center p-6 w-32 h-32 md:w-40 md:h-40 cursor-none relative overflow-hidden group"
            >
              {/* Backlight on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <span className={`text-4xl md:text-5xl mb-4 ${skill.color} drop-shadow-lg`}>
                {skill.icon}
              </span>
              <p className="font-outfit font-medium text-sm md:text-base text-gray-300 text-center">
                {skill.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
