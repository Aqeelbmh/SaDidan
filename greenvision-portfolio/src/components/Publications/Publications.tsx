"use client";

import { motion } from "framer-motion";

const NeonBlob = ({ className }: { className?: string }) => (
  <div className={`absolute rounded-full blur-2xl opacity-60 pointer-events-none ${className}`}
    style={{ background: "linear-gradient(135deg, #ffe600 0%, #00ffe7 100%)", filter: "blur(60px)" }}
  />
);

const Publications = () => {
  const publications = [
    {
      title: "Environmental Impact Assessment of Urban Development",
      journal: "Environmental Science & Technology",
      year: "2023",
      doi: "10.1000/xyz123",
      abstract: "Comprehensive analysis of urban development impacts on local ecosystems and biodiversity."
    },
    {
      title: "GIS Applications in Environmental Monitoring",
      journal: "Journal of Environmental Management",
      year: "2022",
      doi: "10.1000/abc456",
      abstract: "Innovative use of Geographic Information Systems for real-time environmental monitoring."
    },
    {
      title: "AI-Driven Pollution Prediction Models",
      journal: "Environmental Research",
      year: "2022",
      doi: "10.1000/def789",
      abstract: "Machine learning approaches for predicting environmental pollution patterns and trends."
    },
    {
      title: "Sustainable Development in Coastal Regions",
      journal: "Coastal Management",
      year: "2021",
      doi: "10.1000/ghi012",
      abstract: "Balancing economic development with environmental conservation in coastal ecosystems."
    },
    {
      title: "Climate Change Adaptation Strategies",
      journal: "Climate Policy",
      year: "2021",
      doi: "10.1000/jkl345",
      abstract: "Effective strategies for communities to adapt to changing climate conditions."
    },
    {
      title: "Biodiversity Conservation in Urban Areas",
      journal: "Urban Ecology",
      year: "2020",
      doi: "10.1000/mno678",
      abstract: "Methods for preserving biodiversity within rapidly urbanizing environments."
    }
  ];

  return (
    <section className="relative w-full py-24 font-sans bg-gradient-to-br from-[#0a1826] via-[#0e2233] to-[#0a1826] overflow-hidden">
      {/* Neon blobs */}
      <NeonBlob className="top-[-80px] left-[-60px] w-72 h-72" />
      <NeonBlob className="bottom-[-60px] right-[-40px] w-60 h-60" />
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-5xl font-extrabold text-white drop-shadow-neon mb-4">Publications</motion.h2>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="origin-left w-32 h-1 bg-gradient-to-r from-yellow-300 via-cyan-400 to-green-400 mx-auto rounded-full neon-glow" />
          <p className="text-lg text-yellow-100 mt-6 max-w-3xl mx-auto">
            Contributing to environmental science through rigorous research and impactful publications
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {publications.map((pub, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="glass neon-border rounded-2xl p-8 shadow-neon hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-2 drop-shadow-neon">
                  {pub.title}
                </h3>
                <p className="text-yellow-300 font-semibold mb-1">
                  {pub.journal}
                </p>
                <p className="text-cyan-300 text-sm mb-2">
                  {pub.year} • DOI: {pub.doi}
                </p>
              </div>
              <p className="text-cyan-100 text-sm leading-relaxed">
                {pub.abstract}
              </p>
              <div className="mt-4 pt-4 border-t border-yellow-300/20">
                <button className="text-yellow-300 hover:text-yellow-200 text-sm font-medium transition-colors duration-200">
                  Read Full Paper →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-white/10 to-yellow-300/10 rounded-xl p-8 backdrop-blur-xl glassmorphism border border-yellow-300/20">
            <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-neon">
              More Research Coming Soon
            </h3>
            <p className="text-yellow-100 mb-6 max-w-2xl mx-auto">
              Currently working on new research projects focusing on AI applications in environmental monitoring and sustainable urban development.
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-yellow-300 to-cyan-400 text-white rounded-lg hover:shadow-neon transition-all duration-200 hover:-translate-y-1 font-semibold liquid-btn">
              View All Publications
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;
