"use client";

import { motion } from "framer-motion";

const NeonBlob = ({ className }: { className?: string }) => (
  <div className={`absolute rounded-full blur-2xl opacity-60 pointer-events-none ${className}`}
    style={{ background: "linear-gradient(135deg, #ffe600 0%, #00ffe7 100%)", filter: "blur(60px)" }}
  />
);

const Projects = () => {
  const projects = [
    {
      title: "Environmental Impact Assessment",
      description: "Comprehensive EIA for major infrastructure projects, ensuring compliance with environmental regulations and sustainable development practices.",
      technologies: ["GIS", "Environmental Modeling", "Stakeholder Analysis"],
      image: "🌱",
      category: "Consulting"
    },
    {
      title: "Waste Management System Design",
      description: "Developed sustainable waste management solutions for urban areas, focusing on circular economy principles and community engagement.",
      technologies: ["Waste Analysis", "Community Planning", "Sustainability Metrics"],
      image: "♻️",
      category: "Research"
    },
    {
      title: "Biodiversity Conservation Program",
      description: "Led conservation initiatives for endangered species, implementing habitat restoration and monitoring programs in protected areas.",
      technologies: ["Species Monitoring", "Habitat Mapping", "Conservation Planning"],
      image: "🦋",
      category: "Conservation"
    },
    {
      title: "Climate Adaptation Strategy",
      description: "Designed climate resilience strategies for coastal communities, incorporating traditional knowledge with modern scientific approaches.",
      technologies: ["Climate Modeling", "Risk Assessment", "Community Engagement"],
      image: "🌊",
      category: "Policy"
    },
    {
      title: "Environmental Education Platform",
      description: "Created digital learning resources for environmental education, making complex ecological concepts accessible to diverse audiences.",
      technologies: ["Digital Learning", "Content Creation", "Educational Technology"],
      image: "📚",
      category: "Education"
    },
    {
      title: "Green Infrastructure Planning",
      description: "Planned and implemented green infrastructure projects in urban areas, enhancing ecosystem services and community well-being.",
      technologies: ["Urban Planning", "Ecosystem Services", "Green Design"],
      image: "🏙️",
      category: "Urban Planning"
    }
  ];

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 font-sans bg-gradient-to-br from-[#0a1826] via-[#0e2233] to-[#0a1826] overflow-hidden">
      {/* Neon blobs */}
      <NeonBlob className="top-[-80px] left-[-60px] w-48 h-48 sm:w-72 sm:h-72" />
      <NeonBlob className="bottom-[-60px] right-[-40px] w-40 h-40 sm:w-60 sm:h-60" />
      
      <div className="relative z-20 container-responsive">
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7 }} 
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-neon mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }} 
            animate={{ scaleX: 1 }} 
            transition={{ duration: 0.7, delay: 0.2 }} 
            className="origin-left w-24 sm:w-32 h-1 bg-gradient-to-r from-yellow-300 via-cyan-400 to-green-400 mx-auto rounded-full neon-glow" 
          />
          <p className="text-base sm:text-lg text-yellow-100 mt-4 sm:mt-6 max-w-3xl mx-auto px-4">
            Transforming environmental challenges into sustainable solutions through innovative projects
          </p>
        </div>
        
        <div className="grid gap-6 sm:gap-8 lg:gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 rounded-2xl overflow-hidden border border-yellow-300/30 hover:shadow-neon transition-all duration-300 hover:-translate-y-2 group flex flex-col backdrop-blur-xl glassmorphism neon-glow"
            >
              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-yellow-300/20 rounded-xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg drop-shadow-neon">
                    {project.image}
                  </div>
                  <span className="px-2 sm:px-3 py-1 bg-yellow-300/20 text-yellow-800 text-xs font-semibold rounded-full neon-glow">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 leading-tight drop-shadow-neon">
                  {project.title}
                </h3>
                <p className="text-yellow-100 mb-4 leading-relaxed flex-1 text-sm sm:text-base">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 sm:px-3 py-1 bg-yellow-300/10 text-yellow-800 text-xs font-medium rounded-full neon-glow"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                  <button className="flex-1 px-4 py-2 sm:py-3 bg-gradient-to-r from-yellow-300 to-cyan-400 text-white rounded-lg hover:shadow-neon transition-all duration-200 hover:-translate-y-0.5 font-medium text-sm touch-friendly">
                    View Details
                  </button>
                  <button className="px-4 py-2 sm:py-3 border border-yellow-300 text-yellow-800 rounded-lg hover:bg-yellow-300 hover:text-white transition-all duration-200 hover:-translate-y-0.5 font-medium text-sm touch-friendly">
                    Case Study
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12 sm:mt-16">
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-300 to-cyan-400 text-white rounded-lg hover:shadow-neon transition-all duration-200 hover:-translate-y-1 font-semibold liquid-btn touch-friendly">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
