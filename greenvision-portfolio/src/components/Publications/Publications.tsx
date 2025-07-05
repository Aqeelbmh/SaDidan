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
      title: "Heavy metal contamination in swiftlet feathers: A comparative study of chromium and arsenic levels in industrial and non-industrial areas of East Java, Indonesia",
      journal: "BIS Energy and Engineering",
      year: "2025",
      doi: "https://doi.org/10.31603/biseeng.348",
      abstract: "A comparative study measuring chromium and arsenic concentrations in swiftlet feathers from industrial and non-industrial areas in East Java, showing bioaccumulation as a result of environmental pollution.",
      authors: "Ikhwanussafa Sadidan, Sunu Kuntjoro, Nurul Amri Komarudin"
    },
    {
      title: "Utilization of machine learning to predict the correlation between color of river water and other water quality characters",
      journal: "Borobudur Symposium on IT & Computer Science",
      year: "2024",
      doi: "https://doi.org/10.31603/bistycs.136",
      abstract: "Machine learning (SVR & DTR) used to analyze correlations between water color and other parameters like TDS, pH, DO, COD, and Fe in environmental monitoring.",
      authors: "I Sadidan, GL Sari, EU Armin, FI Alifin, AR Budiarto"
    },
    {
      title: "Sustainable Reconstruction Plan in Abrasion-Affected Areas",
      journal: "BIS Health and Environmental Science",
      year: "2024",
      doi: "https://doi.org/10.31603/bishes.21",
      abstract: "Case study in Karawang's northern coast proposing spatial planning and risk-based reconstruction after coastal erosion, dividing land into strategic development zones.",
      authors: "AR Sugiarto, MR Fitrianto, I Sadidan, F Nurkhaerani, IP Sary"
    },
    {
      title: "A Development of Deep Learning Approach to Estimate Blue Carbon Stock on Mangrove Habitats",
      journal: "IEEE ICE3IS Conference Proceedings",
      year: "2024",
      doi: "10.1109/ICE3IS62977.2024.10775455",
      abstract: "YOLOv8-based drone image analysis to estimate mangrove structure and blue carbon stock, with high precision results outperforming previous methods.",
      authors: "Edmund U Armin, Fakhri I Alifin, Budi Arif Dermawan, Ikhwanussafa Sadidan"
    },
    {
      title: "Exploring the Use of ChatGPT in Academic Assignments: Frequency, Benefits, and Perceptions among University Students",
      journal: "IC-ITECHS Journal",
      year: "2024",
      doi: "https://doi.org/10.32664/ic-itechs.v5i1.1669",
      abstract: "Mixed-methods study examining university students' usage patterns, benefits, and perceptions of ChatGPT in academic tasks, highlighting both utility and ethical concerns.",
      authors: "Hasan Rabiev, Ikhwanussafa Sadidan, Novi Anthika Suci Nurhidayah"
    },
    {
      title: "Study of Physical and Chemical Properties of Drinking Water Sources on the Citarum River Irrigation Area in Karawang, West Java, Indonesia",
      journal: "E3S Web of Conferences",
      year: "2024",
      doi: "https://doi.org/10.1051/e3sconf/202450002002",
      abstract: "Assessment of 33 water samples showed high pollution levels in the Citarum River. Chemical tests revealed excessive turbidity and iron content above national standards."
    },
    {
      title: "Oil and Grease Contamination of Raw Water for Drinking Purposes in Karawang Regency, Indonesia",
      journal: "E3S Web of Conferences",
      year: "2024",
      doi: "https://doi.org/10.1051/e3sconf/202450002001",
      abstract: "The study detected oil, grease, and toxic metals in irrigation canals supplying drinking water, indicating pollution from industrial and domestic waste."
    },
    {
      title: "Quality Improvement of Food Products Using Taguchi Method: A Study in a Bread Product SME",
      journal: "Vol Journal",
      year: "Unknown",
      doi: "N/A",
      abstract: "A Taguchi method-based study conducted at a bread SME in Bandung to identify and optimize factors contributing to defective Kadet bread. The research achieved improved process design and reduced product defects using Analysis of Variance."
    },
    {
      title: "Road Condition Monitoring with Drones and LiDAR in Infrastructure Technology",
      journal: "Semesta Teknika",
      year: "2025",
      doi: "https://doi.org/10.18196/st.v28i1.25170",
      abstract: "This study uses drone-based LiDAR technology for road condition monitoring in Karawang, Indonesia. It achieved 93.7% accuracy in detecting road damage and validated the effectiveness of drone-LiDAR systems for efficient infrastructure assessment and predictive maintenance."
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
                <p className="text-cyan-300 text-sm mb-1">
                  {pub.year} • DOI: {pub.doi}
                </p>
                {pub.authors && (
                  <p className="text-green-300 text-sm mb-2 font-medium">
                    Authors: {pub.authors}
                  </p>
                )}
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
            <a 
              href="https://scholar.google.com/citations?user=7Zu5XFUAAAAJ&hl=en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-300 to-cyan-400 text-white rounded-lg hover:shadow-neon transition-all duration-200 hover:-translate-y-1 font-semibold liquid-btn"
            >
              View All Publications
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;
