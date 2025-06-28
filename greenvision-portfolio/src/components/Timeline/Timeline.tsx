"use client";

import { motion } from "framer-motion";

const LeafIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-leaf">
    <path d="M12 2C17 8 22 12 12 22C2 12 7 8 12 2Z" fill="#A3C585" fillOpacity="0.3"/>
    <path d="M12 2C17 8 22 12 12 22C2 12 7 8 12 2Z" stroke="#6CBF84" strokeWidth="1.5" fill="none"/>
  </svg>
);

const NeonBlob = ({ className }: { className?: string }) => (
  <div className={`absolute rounded-full blur-2xl opacity-60 pointer-events-none ${className}`}
    style={{ background: "linear-gradient(135deg, #ffe600 0%, #00ffe7 100%)", filter: "blur(60px)" }}
  />
);

const Timeline = () => {
  const education = [
    {
      year: '2017–2019',
      icon: <LeafIcon />,
      title: 'M.Sc. in Ecology & Environmental Management',
      place: 'Tomsk Polytechnic University, Russia',
      details: 'GPA 4.82/5.0',
    },
    {
      year: '2016–2017',
      icon: <LeafIcon />,
      title: 'Preparatory Program (Russian Language & Science)',
      place: 'Tyumen State University, Russia',
    },
    {
      year: '2011–2015',
      icon: <LeafIcon />,
      title: 'B.Sc. in Animal Science',
      place: 'Universitas Padjadjaran, Indonesia',
      details: 'GPA 3.24/4.0',
    },
  ];

  const experience = [
    {
      year: '2022–Present',
      icon: <LeafIcon />,
      title: 'Lecturer, Environmental Engineering',
      place: 'UNSIKA',
      details: 'Courses: Environmental Ecology, GIS, Environmental Management Systems, Digital Literacy, Artificial Intelligence',
    },
    {
      year: '',
      icon: <LeafIcon />,
      title: 'International Affairs Coordinator',
      place: 'UNSIKA',
      details: 'Facilitating student exchanges and global partnerships',
    },
    {
      year: '2023–Present',
      icon: <LeafIcon />,
      title: 'Environmental Consultant',
      place: 'PT Djaya Enviro Consulting',
      details: 'Conducting environmental impact assessments & compliance documentation',
    },
    {
      year: '2020–2022',
      icon: <LeafIcon />,
      title: 'Customer Specialist',
      place: 'LATOKEN',
      details: 'Handling user support in a fintech platform',
    },
    {
      year: '2019–2020',
      icon: <LeafIcon />,
      title: 'Website Admin & Content Creator',
      place: 'MagicBit Inc.',
      details: 'Building Indonesian outreach & content strategy',
    },
    {
      year: '2016',
      icon: <LeafIcon />,
      title: 'Animal Keeper',
      place: 'Ragunan Zoo',
      details: 'Wildlife care, environmental enrichment, and education',
    },
  ];

  return (
    <section className="relative w-full py-24 font-sans bg-gradient-to-br from-[#0a1826] via-[#0e2233] to-[#0a1826] overflow-hidden">
      {/* Neon blobs */}
      <NeonBlob className="top-[-80px] left-[-60px] w-72 h-72" />
      <NeonBlob className="bottom-[-60px] right-[-40px] w-60 h-60" />
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-5xl font-extrabold text-white drop-shadow-neon mb-4">
            My Journey So Far
          </motion.h2>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="origin-left w-32 h-1 bg-gradient-to-r from-yellow-300 via-cyan-400 to-green-400 mx-auto rounded-full neon-glow" />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Education Timeline */}
          <div className="space-y-10">
            <h3 className="text-3xl font-bold text-yellow-300 mb-8 text-center lg:text-left drop-shadow-neon">Education</h3>
            <div className="relative border-l-4 border-yellow-300/30 pl-8">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative mb-12 last:mb-0 group`}
                >
                  <div className="absolute -left-7 top-2 drop-shadow-neon">{item.icon}</div>
                  <div className={`rounded-2xl border border-yellow-300/30 p-6 bg-white/10 backdrop-blur-xl glassmorphism shadow-2xl neon-glow transition-all duration-300 ${index % 2 === 0 ? 'ml-0' : 'ml-8'}`}> 
                    <h4 className="text-xl font-semibold text-white mb-1 drop-shadow-neon">{item.title}</h4>
                    <p className="text-yellow-200 font-medium mb-1">{item.place}</p>
                    <p className="text-sm text-yellow-100 mb-1">{item.year}</p>
                    {item.details && (
                      <p className="text-sm text-yellow-100">{item.details}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Experience Timeline */}
          <div className="space-y-10">
            <h3 className="text-3xl font-bold text-yellow-300 mb-8 text-center lg:text-left drop-shadow-neon">Experience</h3>
            <div className="relative border-l-4 border-yellow-300/30 pl-8">
              {experience.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative mb-12 last:mb-0 group`}
                >
                  <div className="absolute -left-7 top-2 drop-shadow-neon">{item.icon}</div>
                  <div className={`rounded-2xl border border-yellow-300/30 p-6 bg-white/10 backdrop-blur-xl glassmorphism shadow-2xl neon-glow transition-all duration-300 ${index % 2 === 0 ? 'ml-0' : 'ml-8'}`}> 
                    <h4 className="text-xl font-semibold text-white mb-1 drop-shadow-neon">{item.title}</h4>
                    <p className="text-yellow-200 font-medium mb-1">{item.place}</p>
                    <p className="text-sm text-yellow-100 mb-1">{item.year}</p>
                    {item.details && (
                      <p className="text-sm text-yellow-100">{item.details}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
