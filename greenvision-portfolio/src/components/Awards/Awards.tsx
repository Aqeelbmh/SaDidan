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
    title: "Outstanding Environmental Research Award",
    organization: "Indonesian Environmental Society",
    year: "2023",
    description: "Recognized for innovative research in sustainable waste management and circular economy implementation.",
  },
  {
    title: "Best Paper Award",
    organization: "International Conference on Environmental Science",
    year: "2022",
    description: "Awarded for groundbreaking research on biodiversity conservation in urban ecosystems.",
  },
  {
    title: "Environmental Leadership Award",
    organization: "Green Campus Initiative",
    year: "2021",
    description: "Honored for exceptional leadership in promoting environmental awareness and sustainable practices.",
  },
  {
    title: "Academic Excellence Award",
    organization: "Tomsk Polytechnic University",
    year: "2019",
    description: "Graduated with distinction for outstanding academic performance in Ecology & Environmental Management.",
  },
  {
    title: "Community Service Award",
    organization: "Environmental Education Foundation",
    year: "2020",
    description: "Recognized for contributions to environmental education and community outreach programs.",
  },
  {
    title: "Innovation in Sustainability Award",
    organization: "Sustainable Development Council",
    year: "2022",
    description: "Awarded for developing innovative approaches to climate change adaptation and resilience.",
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
          <motion.h2 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-5xl font-extrabold text-white drop-shadow-neon mb-4">Awards & Recognition</motion.h2>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="origin-left w-32 h-1 bg-gradient-to-r from-yellow-300 via-cyan-400 to-green-400 mx-auto rounded-full neon-glow" />
          <p className="text-lg text-yellow-100 mt-6 max-w-3xl mx-auto">
            Honored for contributions to environmental science, education, and sustainable development
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
                  <h3 className="text-lg font-bold text-white mb-1 leading-tight drop-shadow-neon">
                    {award.title}
                  </h3>
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
