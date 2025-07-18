"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";

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

  // Fallback data
  const fallbackEducation = [
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

  const fallbackExperience = [
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

  useEffect(() => {
    // Only fetch from API if running on localhost (development)
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      (async () => {
        try {
          await api.timeline();
          // setTimelineData(data); // This line is removed
        } catch {
          // setError('Failed to fetch timeline data.');
        } finally {
          // setLoading(false); // This line is removed
        }
      })();
    } else {
      // In production or static export, always use fallback data and never call the API
      // setTimelineData([]); // fallback data is used below // This line is removed
      // setError('Timeline data is not available in production.');
    }
  }, []);

  // Always use fallback data in production/static export
  const currentData = activeTab === 'education' ? fallbackEducation : fallbackExperience;

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
            My Journey
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }} 
            animate={{ scaleX: 1 }} 
            transition={{ duration: 0.7, delay: 0.2 }} 
            className="origin-left w-24 sm:w-32 h-1 bg-gradient-to-r from-yellow-300 via-cyan-400 to-green-400 mx-auto rounded-full neon-glow" 
          />
        </div>
        
        {/* Filter Buttons */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="glass neon-border rounded-2xl p-1 sm:p-2 backdrop-blur-xl w-full max-w-md">
            <div className="flex space-x-1 sm:space-x-2">
              <button
                onClick={() => setActiveTab('education')}
                className={`flex-1 px-4 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base touch-friendly ${
                  activeTab === 'education'
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg shadow-yellow-400/25'
                    : 'text-yellow-300 hover:text-yellow-200 hover:bg-white/10'
                }`}
              >
                <span className="flex items-center justify-center gap-1 sm:gap-2">
                  <GraduationIcon />
                  <span className="hidden sm:inline">Education</span>
                  <span className="sm:hidden">Edu</span>
                </span>
              </button>
              <button
                onClick={() => setActiveTab('experience')}
                className={`flex-1 px-4 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base touch-friendly ${
                  activeTab === 'experience'
                    ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-white shadow-lg shadow-cyan-400/25'
                    : 'text-cyan-300 hover:text-cyan-200 hover:bg-white/10'
                }`}
              >
                <span className="flex items-center justify-center gap-1 sm:gap-2">
                  <BriefcaseIcon />
                  <span className="hidden sm:inline">Experience</span>
                  <span className="sm:hidden">Exp</span>
                </span>
              </button>
            </div>
          </div>
        </div>
          
        {/* Timeline Content */}
        <div className="relative">
          {/* Desktop Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-300/30 via-cyan-400/30 to-green-400/30 rounded-full"></div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 sm:space-y-8"
            >
              {currentData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  } lg:${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Timeline Item */}
                  <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                    <div className="glass neon-border rounded-2xl p-4 sm:p-6 backdrop-blur-xl shadow-neon hover:scale-105 transition-transform duration-300">
                      {/* Timeline Dot */}
                      <div className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-yellow-300 to-cyan-400 rounded-full border-4 border-white shadow-lg hidden lg:block"></div>
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm sm:text-base font-semibold text-yellow-300 bg-yellow-400/10 px-2 py-1 rounded-full">
                              {item.year}
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-tight">
                            {item.title}
                          </h3>
                          <p className="text-cyan-300 font-medium mb-2 text-sm sm:text-base">
                            {item.place}
                          </p>
                    {item.details && (
                            <p className="text-cyan-100 text-sm leading-relaxed">
                              {item.details}
                            </p>
                    )}
                        </div>
                      </div>
                    </div>
                  </div>
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