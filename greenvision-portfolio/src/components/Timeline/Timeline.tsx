"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";



const GraduationIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-yellow-400">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-cyan-400">
    <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

const NeonBlob = ({ className }: { className?: string }) => (
  <div className={`absolute rounded-full blur-2xl opacity-60 pointer-events-none ${className}`}
    style={{ background: "linear-gradient(135deg, #ffe600 0%, #00ffe7 100%)", filter: "blur(60px)" }}
  />
);

const Timeline = () => {
  const [activeTab, setActiveTab] = useState<'education' | 'experience'>('education');

  const education = [
    {
      year: '2011–2015',
      icon: <GraduationIcon />,
      title: 'B.Sc. in Animal Science',
      place: 'Universitas Padjadjaran, Indonesia',
      details: 'GPA 3.24/4.0',
      color: 'from-yellow-400 to-yellow-500'
    },
    {
      year: '2016–2017',
      icon: <GraduationIcon />,
      title: 'Preparatory Program (Russian Language & Science)',
      place: 'Tyumen State University, Russia',
      color: 'from-yellow-400 to-yellow-500'
    },
    {
      year: '2017–2019',
      icon: <GraduationIcon />,
      title: 'M.Sc. in Ecology & Environmental Management',
      place: 'Tomsk Polytechnic University, Russia',
      details: 'GPA 4.82/5.0',
      color: 'from-yellow-400 to-yellow-500'
    },
  ];

  const experience = [
    {
      year: '2022–Present',
      icon: <BriefcaseIcon />,
      title: 'Lecturer, Environmental Engineering',
      place: 'UNSIKA',
      details: 'Courses: Environmental Ecology, GIS, Environmental Management Systems, Digital Literacy, Artificial Intelligence',
      color: 'from-cyan-400 to-cyan-500'
    },
    {
      year: '',
      icon: <BriefcaseIcon />,
      title: 'International Affairs Coordinator',
      place: 'UNSIKA',
      details: 'Facilitating student exchanges and global partnerships',
      color: 'from-cyan-400 to-cyan-500'
    },
    {
      year: '2023–Present',
      icon: <BriefcaseIcon />,
      title: 'Environmental Consultant',
      place: 'PT Djaya Enviro Consulting',
      details: 'Conducting environmental impact assessments & compliance documentation',
      color: 'from-green-400 to-green-500'
    },
    {
      year: '2020–2022',
      icon: <BriefcaseIcon />,
      title: 'Customer Specialist',
      place: 'LATOKEN',
      details: 'Handling user support in a fintech platform',
      color: 'from-purple-400 to-purple-500'
    },
    {
      year: '2019–2020',
      icon: <BriefcaseIcon />,
      title: 'Website Admin & Content Creator',
      place: 'MagicBit Inc.',
      details: 'Building Indonesian outreach & content strategy',
      color: 'from-pink-400 to-pink-500'
    },
    {
      year: '2016–2019',
      icon: <BriefcaseIcon />,
      title: 'Citizen Journalist',
      place: 'Freelance',
      details: 'Reporting and writing news',
      color: 'from-orange-400 to-orange-500'
    },
    {
      year: '2016',
      icon: <BriefcaseIcon />,
      title: 'Animal Keeper',
      place: 'Ragunan Zoo',
      details: 'Wildlife care, environmental enrichment, and education',
      color: 'from-red-400 to-red-500'
    },
  ];

  const currentData = activeTab === 'education' ? education : experience;

  return (
    <section className="relative w-full py-24 font-sans bg-gradient-to-br from-[#0a1826] via-[#0e2233] to-[#0a1826] overflow-hidden">
      {/* Neon blobs */}
      <NeonBlob className="top-[-80px] left-[-60px] w-72 h-72" />
      <NeonBlob className="bottom-[-60px] right-[-40px] w-60 h-60" />
      
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7 }} 
            className="text-5xl font-extrabold text-white drop-shadow-neon mb-4"
          >
            My Journey So Far
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }} 
            animate={{ scaleX: 1 }} 
            transition={{ duration: 0.7, delay: 0.2 }} 
            className="origin-left w-32 h-1 bg-gradient-to-r from-yellow-300 via-cyan-400 to-green-400 mx-auto rounded-full neon-glow" 
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-12">
          <div className="glass neon-border rounded-2xl p-2 backdrop-blur-xl">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('education')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'education'
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg shadow-yellow-400/25'
                    : 'text-yellow-300 hover:text-yellow-200 hover:bg-white/10'
                }`}
              >
                <span className="flex items-center gap-2">
                  <GraduationIcon />
                  Education
                </span>
              </button>
              <button
                onClick={() => setActiveTab('experience')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'experience'
                    ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-white shadow-lg shadow-cyan-400/25'
                    : 'text-cyan-300 hover:text-cyan-200 hover:bg-white/10'
                }`}
              >
                <span className="flex items-center gap-2">
                  <BriefcaseIcon />
                  Experience
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Content */}
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-300/30 via-cyan-400/30 to-green-400/30 rounded-full"></div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {currentData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Timeline Item */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="glass neon-border rounded-2xl p-6 backdrop-blur-xl shadow-neon hover:scale-105 transition-transform duration-300">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} shadow-lg`}>
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-white mb-2 drop-shadow-neon">
                            {item.title}
                          </h4>
                          <p className="text-yellow-200 font-medium mb-1">{item.place}</p>
                          <p className="text-sm text-yellow-100 mb-2">{item.year}</p>
                          {item.details && (
                            <p className="text-sm text-cyan-100 leading-relaxed">{item.details}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-yellow-300 to-cyan-400 rounded-full shadow-neon border-2 border-white"></div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
