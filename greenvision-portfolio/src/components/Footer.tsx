"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const NeonBlob = ({ className }: { className?: string }) => (
  <div className={`absolute rounded-full blur-2xl opacity-60 pointer-events-none ${className}`}
    style={{ background: "linear-gradient(135deg, #ffe600 0%, #00ffe7 100%)", filter: "blur(60px)" }}
  />
);

const Footer = () => {
  const [currentYear] = useState(new Date().getFullYear());

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://id.linkedin.com/in/sadidan-ikhwanussafa-9624b990",
      icon: "/LinkedInIcon.svg",
      color: "hover:bg-yellow-400/30"
    },
    {
      name: "Instagram",
      url: "https://instagram.com/sadidun",
      icon: "/InstagramIcon.svg",
      color: "hover:bg-pink-400/30"
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@sadidan26",
      icon: "/YouTubeIcon.svg",
      color: "hover:bg-red-400/30"
    },
    {
      name: "Email",
      url: "mailto:sadidan@unsika.ac.id",
      icon: "/EmailIcon.svg",
      color: "hover:bg-cyan-400/30"
    }
  ];

  const quickLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Publications", href: "#publications" },
    { name: "Contact", href: "#contact" }
  ];

  const services = [
    "Environmental Consulting",
    "Research Collaboration",
    "Academic Mentoring",
    "GIS Analysis"
  ];

  return (
    <footer className="relative bg-gradient-to-br from-[#0a1826] via-[#0e2233] to-[#0a1826] text-white font-sans overflow-hidden">
      {/* Neon blobs */}
      <NeonBlob className="top-[-80px] left-[-60px] w-48 h-48 sm:w-72 sm:h-72" />
      <NeonBlob className="bottom-[-60px] right-[-40px] w-40 h-40 sm:w-60 sm:h-60" />
      
      <div className="relative z-10 container-responsive py-8 sm:py-12">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8"
        >
          {/* About Section */}
          <div className="lg:col-span-2 bg-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl glassmorphism border border-yellow-300/20 shadow-2xl neon-glow">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-yellow-300 drop-shadow-neon">
              Ikhwanussafa Sadidan, M.Sc.
            </h3>
            <p className="text-cyan-200 mb-4 leading-relaxed text-sm sm:text-base">
              Lecturer of Environmental Engineering Study Program, consultant, and researcher dedicated to sustainable development and environmental conservation. 
              Specializing in environmental impact assessment, biodiversity conservation, and climate adaptation strategies.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 sm:w-12 sm:h-12 bg-yellow-400/20 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 drop-shadow-neon neon-glow touch-friendly ${social.color}`}
                  aria-label={social.name}
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={24}
                    height={24}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl glassmorphism border border-cyan-400/20 shadow-2xl neon-glow">
            <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-cyan-300 drop-shadow-neon">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-cyan-100 hover:text-yellow-300 transition-colors duration-200 text-sm touch-friendly block py-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="bg-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl glassmorphism border border-green-400/20 shadow-2xl neon-glow">
            <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-green-300 drop-shadow-neon">Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index} className="text-cyan-100 text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.2 }}
          className="border-t border-yellow-300/20 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-cyan-100 text-sm mb-4 md:mb-0 text-center md:text-left">
            © {currentYear} H.K Freelance Studio. All rights reserved.
          </div>
          <div className="flex space-x-4 sm:space-x-6">
            <a href="/Privacy Policy_h.k.pdf" target="_blank" rel="noopener noreferrer" className="text-cyan-100 hover:text-yellow-300 text-sm transition-colors duration-200 touch-friendly">
              Privacy Policy
            </a>
            <a href="/Terms of Service_hk.pdf" target="_blank" rel="noopener noreferrer" className="text-cyan-100 hover:text-yellow-300 text-sm transition-colors duration-200 touch-friendly">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 