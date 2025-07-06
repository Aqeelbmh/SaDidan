"use client";

import { motion } from "framer-motion";

const galleryItems = [
  {
    title: "Field Research in Mangrove Ecosystems",
    description: "Conducting biodiversity surveys and carbon stock assessments in coastal mangrove habitats.",
    category: "Research",
    image: "🌊"
  },
  {
    title: "Environmental Impact Assessment",
    description: "Leading comprehensive EIA studies for sustainable infrastructure development projects.",
    category: "Consulting",
    image: "📊"
  },
  {
    title: "Community Environmental Education",
    description: "Engaging with local communities to promote environmental awareness and sustainable practices.",
    category: "Education",
    image: "👥"
  },
  {
    title: "Waste Management Innovation",
    description: "Developing and implementing sustainable waste management solutions for urban areas.",
    category: "Innovation",
    image: "♻️"
  },
  {
    title: "Biodiversity Conservation",
    description: "Working on species protection and habitat restoration in protected areas.",
    category: "Conservation",
    image: "🦋"
  },
  {
    title: "Climate Adaptation Planning",
    description: "Designing resilience strategies for communities vulnerable to climate change impacts.",
    category: "Policy",
    image: "🌱"
  },
  {
    title: "Academic Research Collaboration",
    description: "Collaborating with international researchers on environmental science projects.",
    category: "Research",
    image: "🔬"
  },
  {
    title: "Sustainable Development Projects",
    description: "Implementing green infrastructure and sustainable development initiatives.",
    category: "Development",
    image: "🏗️"
  }
];

const NeonBlob = ({ className }: { className?: string }) => (
  <div className={`absolute rounded-full blur-2xl opacity-60 pointer-events-none ${className}`}
    style={{ background: "linear-gradient(135deg, #ffe600 0%, #00ffe7 100%)", filter: "blur(60px)" }}
  />
);

const Gallery = () => {
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
            Work Gallery
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }} 
            animate={{ scaleX: 1 }} 
            transition={{ duration: 0.7, delay: 0.2 }} 
            className="origin-left w-24 sm:w-32 h-1 bg-gradient-to-r from-yellow-300 via-cyan-400 to-green-400 mx-auto rounded-full neon-glow" 
          />
          <p className="text-base sm:text-lg text-yellow-100 mt-4 sm:mt-6 max-w-3xl mx-auto px-4">
            A visual journey through environmental research, conservation efforts, and sustainable development projects
          </p>
        </div>
        
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 rounded-2xl overflow-hidden border border-yellow-300/30 hover:shadow-neon transition-all duration-300 hover:-translate-y-2 group flex flex-col backdrop-blur-xl glassmorphism neon-glow"
            >
              <div className="flex flex-col items-center p-4 sm:p-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-300/20 rounded-full flex items-center justify-center text-2xl sm:text-3xl shadow mb-3 sm:mb-4 drop-shadow-neon">
                  {item.image}
                </div>
                <span className="px-2 sm:px-3 py-1 bg-yellow-300/20 text-yellow-800 text-xs font-semibold rounded-full mb-2 neon-glow">
                  {item.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-tight text-center drop-shadow-neon">
                  {item.title}
                </h3>
                <p className="text-yellow-100 text-sm leading-relaxed mb-4 text-center">
                  {item.description}
                </p>
                <button className="w-full px-4 py-2 sm:py-3 bg-gradient-to-r from-yellow-300 to-cyan-400 text-white rounded-lg hover:shadow-neon transition-all duration-200 hover:-translate-y-0.5 font-medium text-sm mt-auto liquid-btn touch-friendly">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-gradient-to-r from-white/10 to-yellow-300/10 rounded-xl p-6 sm:p-8 backdrop-blur-xl glassmorphism border border-yellow-300/20">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 drop-shadow-neon">
              Want to See More?
            </h3>
            <p className="text-yellow-100 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">
              Explore more of my work, research projects, and environmental initiatives through my detailed portfolio.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="px-6 py-3 sm:py-4 bg-gradient-to-r from-yellow-300 to-cyan-400 text-white rounded-lg hover:shadow-neon transition-all duration-200 hover:-translate-y-1 font-semibold liquid-btn touch-friendly">
                View Full Portfolio
              </button>
              <button className="px-6 py-3 sm:py-4 border-2 border-yellow-300 text-yellow-800 rounded-lg hover:bg-yellow-300 hover:text-white transition-all duration-200 hover:-translate-y-1 font-semibold liquid-btn touch-friendly">
                Download CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
