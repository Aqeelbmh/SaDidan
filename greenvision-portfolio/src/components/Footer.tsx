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
      url: "https://linkedin.com/in/ikhwanussafa-sadidan",
      icon: "/LinkedInIcon.svg",
      color: "hover:bg-yellow-400/30"
    },
    {
      name: "Email",
      url: "mailto:ikhwanussafa@example.com",
      icon: "/EmailIcon.svg",
      color: "hover:bg-cyan-400/30"
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/1234567890",
      icon: "/WhatsAppIcon.svg",
      color: "hover:bg-green-400/30"
    },
    {
      name: "Instagram",
      url: "https://instagram.com/ikhwanussafa",
      icon: "/InstagramIcon.svg",
      color: "hover:bg-pink-400/30"
    }
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
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
      <NeonBlob className="top-[-80px] left-[-60px] w-72 h-72" />
      <NeonBlob className="bottom-[-60px] right-[-40px] w-60 h-60" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="lg:col-span-2 bg-white/10 rounded-2xl p-8 backdrop-blur-xl glassmorphism border border-yellow-300/20 shadow-2xl neon-glow">
            <h3 className="text-2xl font-bold mb-4 text-yellow-300 drop-shadow-neon">
              Ikhwanussafa Sadidan, M.Sc.
            </h3>
            <p className="text-cyan-200 mb-4 leading-relaxed">
              Environmental lecturer, consultant, and researcher dedicated to sustainable development and environmental conservation. 
              Specializing in environmental impact assessment, biodiversity conservation, and climate adaptation strategies.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 drop-shadow-neon neon-glow ${social.color}`}
                  aria-label={social.name}
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-xl glassmorphism border border-cyan-400/20 shadow-2xl neon-glow">
            <h4 className="text-xl font-bold mb-4 text-cyan-300 drop-shadow-neon">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-cyan-100 hover:text-yellow-300 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-xl glassmorphism border border-green-400/20 shadow-2xl neon-glow">
            <h4 className="text-xl font-bold mb-4 text-green-300 drop-shadow-neon">Services</h4>
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
          className="border-t border-yellow-300/20 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-cyan-100 text-sm mb-4 md:mb-0">
            © {currentYear} H.K Freelance Studio. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-cyan-100 hover:text-yellow-300 text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-cyan-100 hover:text-yellow-300 text-sm transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 