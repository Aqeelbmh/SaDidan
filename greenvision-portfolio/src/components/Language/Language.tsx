"use client";

import { motion } from "framer-motion";

const NeonBlob = ({ className }: { className?: string }) => (
  <div className={`absolute rounded-full blur-2xl opacity-60 pointer-events-none ${className}`}
    style={{ background: "linear-gradient(135deg, #ffe600 0%, #00ffe7 100%)", filter: "blur(60px)" }}
  />
);

const Language = () => {
  const languages = [
    { name: "Indonesian", percentage: 100, color: "from-yellow-400 to-yellow-500" },
    { name: "English", percentage: 90, color: "from-cyan-400 to-cyan-500" },
    { name: "Russian", percentage: 70, color: "from-green-400 to-green-500" },
    { name: "Arabic", percentage: 40, color: "from-purple-400 to-purple-500" },
    { name: "Japanese", percentage: 30, color: "from-pink-400 to-pink-500" },
  ];

  return (
    <section className="relative w-full py-24 font-sans bg-gradient-to-br from-[#0a1826] via-[#0e2233] to-[#0a1826] overflow-hidden">
      {/* Neon blobs */}
      <NeonBlob className="top-[-80px] left-[-60px] w-72 h-72" />
      <NeonBlob className="bottom-[-60px] right-[-40px] w-60 h-60" />
      
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7 }} 
            className="text-5xl font-extrabold text-white drop-shadow-neon mb-4"
          >
            Language Skills
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }} 
            animate={{ scaleX: 1 }} 
            transition={{ duration: 0.7, delay: 0.2 }} 
            className="origin-left w-32 h-1 bg-gradient-to-r from-yellow-300 via-cyan-400 to-green-400 mx-auto rounded-full neon-glow" 
          />
          <p className="text-lg text-yellow-100 mt-6 max-w-2xl mx-auto">
            Multilingual capabilities enabling global collaboration and research
          </p>
        </div>
        
        <div className="glass neon-border rounded-2xl p-10 shadow-neon">
          <div className="space-y-8">
            {languages.map((language, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="space-y-3"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-white drop-shadow-neon">
                    {language.name}
                  </h3>
                  <span className="text-yellow-300 font-bold text-lg">
                    {language.percentage}%
                  </span>
                </div>
                
                <div className="relative h-4 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${language.percentage}%` }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    className={`h-full bg-gradient-to-r ${language.color} rounded-full shadow-lg relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                  </motion.div>
                </div>
                
                {/* Proficiency level indicator */}
                <div className="flex justify-between text-xs text-cyan-200">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Advanced</span>
                  <span>Native</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Additional info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-10 pt-8 border-t border-yellow-300/20"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-yellow-300 mb-2">Academic Languages</h4>
                <p className="text-cyan-100 text-sm">
                  Proficient in English and Russian for academic research, publications, and international collaborations.
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold text-yellow-300 mb-2">Cultural Communication</h4>
                <p className="text-cyan-100 text-sm">
                  Multilingual skills enable effective communication across diverse cultural and professional contexts.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Language; 