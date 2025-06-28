"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const NeonBlob = ({ className }: { className?: string }) => (
  <div className={`absolute rounded-full blur-2xl opacity-60 pointer-events-none ${className}`}
    style={{ background: "linear-gradient(135deg, #ffe600 0%, #00ffe7 100%)", filter: "blur(60px)" }}
  />
);

const About = () => {
  return (
    <section className="relative w-full py-24 font-sans bg-gradient-to-br from-[#0a1826] via-[#0e2233] to-[#0a1826] overflow-hidden">
      {/* Neon blobs */}
      <NeonBlob className="top-[-80px] left-[-60px] w-72 h-72" />
      <NeonBlob className="bottom-[-60px] right-[-40px] w-60 h-60" />
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-5xl font-extrabold text-white drop-shadow-neon mb-4">About Me</motion.h2>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="origin-left w-32 h-1 bg-gradient-to-r from-yellow-300 via-cyan-400 to-green-400 mx-auto rounded-full neon-glow" />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative flex justify-center">
            <div className="w-72 h-72 rounded-full bg-white/10 border border-yellow-300/30 shadow-xl backdrop-blur-lg flex items-center justify-center glassmorphism overflow-hidden">
              <Image
                src="/profile/didan.jpeg"
                alt="Ikhwanussafa Sadidan"
                width={256}
                height={256}
                className="rounded-full object-cover border-2 border-cyan-300 shadow-lg"
              />
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="glass neon-border shadow-neon rounded-2xl p-10">
              <h3 className="text-2xl font-bold neon-text mb-4">Environmental Lecturer & Consultant</h3>
              <div className="space-y-4 text-cyan-100 leading-relaxed">
                <p>
                  Hello! I&apos;m Ikhwanussafa Sadidan, M.Sc., a passionate environmental lecturer and consultant dedicated to sustainability and ecological innovation. With an academic foundation in Environmental Management from Tomsk Polytechnic University (Russia) and years of teaching and consulting experience, I aim to inspire change through science and education.
                </p>
                <p>
                  My research focuses on environmental pollution, Geographic Information Systems (GIS), and the integration of Artificial Intelligence in ecological analysis. I currently serve as a lecturer in Environmental Engineering at Universitas Singaperbangsa Karawang (UNSIKA), where I also coordinate international collaborations.
                </p>
                <p className="font-semibold text-neon-green">
                  Let&apos;s work together to build a healthier, greener planet.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="glass neon-border rounded-xl p-6 text-center shadow-neon">
                <div className="text-3xl font-bold text-neon-green drop-shadow">5+</div>
                <div className="text-sm text-cyan-100">Years Experience</div>
              </div>
              <div className="glass neon-border rounded-xl p-6 text-center shadow-neon">
                <div className="text-3xl font-bold text-neon-green drop-shadow">10+</div>
                <div className="text-sm text-cyan-100">Research Papers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
