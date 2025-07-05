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
      title: "Performa Model YOLOv8 untuk Deteksi Kondisi Mengantuk pada Pengendara Mobil",
      journal: "Brahmana: Jurnal Penerapan Kecerdasan Buatan",
      year: "2023",
      doi: "N/A",
      abstract: "Deep Learning-based YOLOv8 model was implemented to detect drowsiness in drivers using a dataset of 3708 images. It achieved high accuracy with mAP of 0.98055 and F1-score of 0.9496."
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
      doi: "	https://doi.org/10.1051/e3sconf/202450002001",
      abstract: "The study detected oil, grease, and toxic metals in irrigation canals supplying drinking water, indicating pollution from industrial and domestic waste."
    },
    {
      title: "Penilaian Status Mutu Air Sungai Citarum Menggunakan Metode Indeks Pencemaran",
      journal: "Ruwa Jurai: Jurnal Kesehatan Lingkungan",
      year: "2024",
      doi: "https://doi.org/10.26630/rj.v18i2.4562",
      abstract: "Using Pollution Index Method, this study evaluated water quality in Karawang's section of the Citarum River. Four parameters exceeded the permissible limit, classifying the water as \"Lightly Polluted.\""
    },
    {
      title: "Pemanfaatan Machine Learning untuk Memprediksi Kandungan Dissolved Oxygen (DO) pada Air Sungai",
      journal: "Brahmana: Jurnal Penerapan Kecerdasan Buatan",
      year: "2023",
      doi: "N/A",
      abstract: "Machine Learning models (SVR and Decision Tree Regressor) were used to predict Dissolved Oxygen levels in the Citarum River. Decision Tree yielded better prediction accuracy."
    },
    {
      title: "Edukasi Kesiapsiagaan Banjir ROB pada Masyarakat di Pesisir Pantai Utara Karawang",
      journal: "Martabe: Jurnal Pengabdian Kepada Masyarakat",
      year: "2023",
      doi: "http://dx.doi.org/10.31604/jpm.v6i12.4490-4494",
      abstract: "Flood preparedness education was provided to coastal communities in Karawang through pre- and post-surveys. The program improved awareness and readiness for tidal floods (ROB)."
    },
    {
      title: "Faktor Sosial dan Budaya Kaitannya dengan Nilai Jual Kerbau (Kasus di Pasar Bolu, Kabupaten Toraja Utara)",
      journal: "Students e-Journal",
      year: "2015",
      doi: "N/A",
      abstract: "A qualitative case study exploring how social status, traditions, and cultural practices in Toraja influence the market value of buffaloes at Pasar Bolu."
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
