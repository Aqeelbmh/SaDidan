"use client";

import { motion } from "framer-motion";

const AwardIcon = () => (
  <svg width="32" height="32" fill="none" viewBox="0 0 32 32" className="text-gold">
    <circle cx="16" cy="16" r="14" fill="#E6C200" fillOpacity="0.18" />
    <path d="M16 6L18.09 12.26L24.97 12.27L19.45 16.14L21.54 22.4L16 18.53L10.46 22.4L12.55 16.14L7.03 12.27L13.91 12.26L16 6Z" fill="#E6C200" />
  </svg>
);

const awards = [
  {
    title: "Best Pitch Presenter",
    organization: "SEARCA Agro Innovator Program, University of the Philippines Los Banos",
    year: "2025",
    description: "Recognized for outstanding presentation skills and innovative pitch in agricultural innovation program.",
    category: "Presentation"
  },
  {
    title: "Best Presenter",
    organization: "6th Borobudur International Symposium on Science and Technology, UNIMMA",
    year: "2024",
    description: "Awarded for exceptional presentation at international symposium on science and technology.",
    category: "Presentation"
  },
  {
    title: "Supervising Lecturer for PIMNAS 2024",
    organization: "PKM Video Constructive Ideas",
    year: "2024",
    description: "Successfully supervised students for PIMNAS 2024 in PKM Video Constructive Ideas category.",
    category: "Supervision"
  },
  {
    title: "SPADA Documentary Video Grant",
    organization: "Indonesian Ministry of Culture, Research and Technology",
    year: "2023",
    description: "Received grant for Learning Video Innovation Competition from the Indonesian Ministry of Culture, Research and Technology.",
    category: "Grant"
  },
  {
    title: "Best Presenter",
    organization: "4th Borobudur International Symposium on Science and Technology, UNIMMA",
    year: "2022",
    description: "Recognized for outstanding presentation at international symposium on science and technology.",
    category: "Presentation"
  },
  {
    title: "Second Best Paper",
    organization: "XIII International Scientific Symposium, Tomsk Polytechnic University",
    year: "2019",
    description: "Awarded second place for research paper on 'Geoecological Problem of Subsoil Development'.",
    category: "Research"
  },
  {
    title: "Third Best Paper",
    organization: "XIII International Scientific Symposium, Tomsk Polytechnic University",
    year: "2018",
    description: "Awarded third place for research paper on 'Geoecological Problem of Subsoil Development'.",
    category: "Research"
  },
  {
    title: "Russian Government Scholarship",
    organization: "Russian Government",
    year: "2016-2019",
    description: "Full scholarship awardee for master's degree studies in Russia.",
    category: "Scholarship"
  },
  {
    title: "Pikiran Rakyat Scholarship",
    organization: "Pikiran Rakyat",
    year: "2012-2013",
    description: "Scholarship awardee for undergraduate studies.",
    category: "Scholarship"
  }
];

const NeonBlob = ({ className }: { className?: string }) => (
  <div className={`absolute rounded-full blur-2xl opacity-60 pointer-events-none ${className}`}
    style={{ background: "linear-gradient(135deg, #ffe600 0%, #00ffe7 100%)", filter: "blur(60px)" }}
  />
);

const Awards = () => {
  return (
    <section className="relative w-full py-24 font-sans bg-gradient-to-br from-[#0a1826] via-[#0e2233] to-[#0a1826] overflow-hidden">
      {/* Neon blobs */}
      <NeonBlob className="top-[-80px] left-[-60px] w-72 h-72" />
      <NeonBlob className="bottom-[-60px] right-[-40px] w-60 h-60" />
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-5xl font-extrabold text-white drop-shadow-neon mb-4">Achievements & Awards</motion.h2>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="origin-left w-32 h-1 bg-gradient-to-r from-yellow-300 via-cyan-400 to-green-400 mx-auto rounded-full neon-glow" />
          <p className="text-lg text-yellow-100 mt-6 max-w-3xl mx-auto">
            Recognized for academic excellence, research contributions, and professional achievements
          </p>
        </div>
        
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 rounded-2xl p-8 border border-yellow-300/30 hover:shadow-neon transition-all duration-300 hover:-translate-y-2 group flex flex-col backdrop-blur-xl glassmorphism neon-glow"
            >
              <div className="flex items-start space-x-4 mb-4">
                <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 2, repeatType: 'loop' }} className="flex-shrink-0 w-12 h-12 flex items-center justify-center drop-shadow-neon">
                  <AwardIcon />
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white leading-tight drop-shadow-neon">
                      {award.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      award.category === 'Presentation' ? 'bg-yellow-400/20 text-yellow-300' :
                      award.category === 'Research' ? 'bg-cyan-400/20 text-cyan-300' :
                      award.category === 'Scholarship' ? 'bg-green-400/20 text-green-300' :
                      award.category === 'Grant' ? 'bg-purple-400/20 text-purple-300' :
                      'bg-pink-400/20 text-pink-300'
                    }`}>
                      {award.category}
                    </span>
                  </div>
                  <p className="text-yellow-200 font-medium text-sm">
                    {award.organization}
                  </p>
                  <p className="text-yellow-100 text-sm">
                    {award.year}
                  </p>
                </div>
              </div>
              <p className="text-yellow-100 text-sm leading-relaxed mb-4">
                {award.description}
              </p>
              <div className="mt-auto pt-4 border-t border-yellow-300/20">
                <button className="w-full px-4 py-2 bg-gradient-to-r from-yellow-300 to-cyan-400 text-white rounded-lg hover:shadow-neon transition-all duration-200 hover:-translate-y-0.5 font-medium text-sm liquid-btn">
                  View Certificate
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-white/10 to-yellow-300/10 rounded-xl p-8 backdrop-blur-xl glassmorphism border border-yellow-300/20">
            <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-neon">
              Let&apos;s Work Together
            </h3>
            <p className="text-yellow-100 mb-6 max-w-2xl mx-auto">
              Ready to collaborate on environmental projects that make a difference? Let&apos;s discuss how we can work together to create sustainable solutions.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-yellow-300 to-cyan-400 text-white rounded-lg hover:shadow-neon transition-all duration-200 hover:-translate-y-1 font-semibold liquid-btn">
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;
