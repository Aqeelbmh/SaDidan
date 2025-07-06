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
            Language Skills
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }} 
            animate={{ scaleX: 1 }} 
            transition={{ duration: 0.7, delay: 0.2 }} 
            className="origin-left w-24 sm:w-32 h-1 bg-gradient-to-r from-yellow-300 via-cyan-400 to-green-400 mx-auto rounded-full neon-glow" 
          />
          <p className="text-base sm:text-lg text-yellow-100 mt-4 sm:mt-6 max-w-2xl mx-auto px-4">
            Multilingual capabilities enabling global collaboration and research
          </p>
        </div>
        
        <div className="glass neon-border rounded-2xl p-6 sm:p-8 lg:p-10 shadow-neon max-w-4xl mx-auto">
          <div className="space-y-6 sm:space-y-8">
            {languages.map((language, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="space-y-3"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg sm:text-xl font-semibold text-white drop-shadow-neon">
                    {language.name}
                  </h3>
                  <span className="text-yellow-300 font-bold text-base sm:text-lg">
                    {language.percentage}%
                  </span>
                </div>
                
                <div className="relative h-3 sm:h-4 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
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
                  <span className="hidden sm:inline">Beginner</span>
                  <span className="hidden sm:inline">Intermediate</span>
                  <span className="hidden sm:inline">Advanced</span>
                  <span className="hidden sm:inline">Native</span>
                  <span className="sm:hidden">Basic</span>
                  <span className="sm:hidden">Fluent</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Additional info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-yellow-300/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <h4 className="text-base sm:text-lg font-semibold text-yellow-300 mb-2">Academic Languages</h4>
                <p className="text-cyan-100 text-sm">
                  Proficient in English and Russian for academic research, publications, and international collaborations.
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-base sm:text-lg font-semibold text-yellow-300 mb-2">Cultural Communication</h4>
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