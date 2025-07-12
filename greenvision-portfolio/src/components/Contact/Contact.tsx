"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const NeonBlob = ({ className }: { className?: string }) => (
  <div className={`absolute rounded-full blur-2xl opacity-60 pointer-events-none ${className}`}
    style={{ background: "linear-gradient(135deg, #ffe600 0%, #00ffe7 100%)", filter: "blur(60px)" }}
  />
);

const Contact = () => {
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
            Let&apos;s Connect
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }} 
            animate={{ scaleX: 1 }} 
            transition={{ duration: 0.7, delay: 0.2 }} 
            className="origin-left w-24 sm:w-32 h-1 bg-gradient-to-r from-yellow-300 via-cyan-400 to-green-400 mx-auto rounded-full neon-glow" 
          />
          <p className="text-base sm:text-lg text-yellow-100 mt-4 sm:mt-6 max-w-3xl mx-auto px-4">
            Ready to collaborate on environmental projects or discuss opportunities? I&apos;d love to hear from you.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          <div className="space-y-8 sm:space-y-10">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-cyan-300 mb-4 sm:mb-6 drop-shadow-neon">Get In Touch</h3>
              <p className="text-cyan-200 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                Whether you&apos;re interested in environmental consulting, research collaboration, or educational partnerships, I&apos;m always open to discussing new opportunities and innovative projects.
              </p>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-400/20 rounded-full flex items-center justify-center shadow-lg drop-shadow-neon flex-shrink-0">
                  <Image src="/EmailIcon.svg" alt="Email" width={20} height={20} className="sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-white drop-shadow-neon text-sm sm:text-base">Email</h4>
                  <p className="text-cyan-200 text-sm sm:text-base break-all">ikhwanussafa.sadidan@unsika.ac.id</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-400/20 rounded-full flex items-center justify-center shadow-lg drop-shadow-neon flex-shrink-0">
                  <Image src="/LocationIcon.svg" alt="Location" width={20} height={20} className="sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-white drop-shadow-neon text-sm sm:text-base">Location</h4>
                  <p className="text-cyan-200 text-sm sm:text-base">Karawang, West Java, Indonesia</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-400/20 rounded-full flex items-center justify-center shadow-lg drop-shadow-neon flex-shrink-0">
                  <Image src="/InstitutionIcon.svg" alt="Institution" width={20} height={20} className="sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-white drop-shadow-neon text-sm sm:text-base">Institution</h4>
                  <p className="text-cyan-200 text-sm sm:text-base">Universitas Singaperbangsa Karawang</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-400/20 rounded-full flex items-center justify-center shadow-lg drop-shadow-neon flex-shrink-0">
                  <Image src="/WhatsAppIcon.svg" alt="WhatsApp" width={20} height={20} className="sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-white drop-shadow-neon text-sm sm:text-base">WhatsApp / Phone</h4>
                  <p className="text-cyan-200 text-sm sm:text-base break-all">+6281299880365</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 sm:pt-6">
              <h4 className="font-semibold text-white mb-3 sm:mb-4 drop-shadow-neon text-sm sm:text-base">Connect on Social Media</h4>
              <div className="flex space-x-3 sm:space-x-4">
                <a 
                  href="https://id.linkedin.com/in/sadidan-ikhwanussafa-9624b990" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-400/20 rounded-full flex items-center justify-center text-blue-700 hover:bg-blue-400/30 transition-all duration-200 hover:-translate-y-1 drop-shadow-neon touch-friendly" 
                  aria-label="LinkedIn"
                >
                  <Image src="/LinkedInIcon.svg" alt="LinkedIn" width={16} height={16} className="sm:w-5 sm:h-5" />
                </a>
                <a 
                  href="https://instagram.com/sadidun" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-400/20 rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-400/30 transition-all duration-200 hover:-translate-y-1 drop-shadow-neon touch-friendly" 
                  aria-label="Instagram"
                >
                   <Image src="/InstagramIcon.svg" alt="Instagram" width={16} height={16} className="sm:w-5 sm:h-5" />
                </a>
                <a 
                  href="https://youtube.com/@sadidan26" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-400/20 rounded-full flex items-center justify-center text-red-600 hover:bg-red-400/30 transition-all duration-200 hover:-translate-y-1 drop-shadow-neon touch-friendly" 
                  aria-label="YouTube"
                >
                  <Image src="/YouTubeIcon.svg" alt="YouTube" width={16} height={16} className="sm:w-5 sm:h-5" />
                </a>
                <a 
                  href="mailto:ikhwanussafa.sadidan@unsika.ac.id" 
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-400/20 rounded-full flex items-center justify-center text-cyan-600 hover:bg-cyan-400/30 transition-all duration-200 hover:-translate-y-1 drop-shadow-neon touch-friendly" 
                  aria-label="Email"
                >
                  <Image src="/EmailIcon.svg" alt="Email" width={16} height={16} className="sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://wa.me/6281299880365"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-400/20 rounded-full flex items-center justify-center text-green-600 hover:bg-green-400/30 transition-all duration-200 hover:-translate-y-1 drop-shadow-neon touch-friendly"
                  aria-label="WhatsApp"
                >
                  <Image src="/WhatsAppIcon.svg" alt="WhatsApp" width={16} height={16} className="sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 border border-cyan-400/30 shadow-2xl backdrop-blur-xl glassmorphism neon-glow">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 drop-shadow-neon">Send a Message</h3>
            <form className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2 drop-shadow-neon">
                    First Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-cyan-400/30 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-white/10 text-white placeholder-cyan-300 glassmorphism neon-glow transition-all duration-200 text-sm sm:text-base touch-friendly"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2 drop-shadow-neon">
                    Last Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-cyan-400/30 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-white/10 text-white placeholder-cyan-300 glassmorphism neon-glow transition-all duration-200 text-sm sm:text-base touch-friendly"
                    placeholder="Your last name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2 drop-shadow-neon">
                  Email
                </label>
                <input 
                  type="email" 
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-cyan-400/30 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-white/10 text-white placeholder-cyan-300 glassmorphism neon-glow transition-all duration-200 text-sm sm:text-base touch-friendly"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2 drop-shadow-neon">
                  Subject
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-cyan-400/30 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-white/10 text-white placeholder-cyan-300 glassmorphism neon-glow transition-all duration-200 text-sm sm:text-base touch-friendly"
                  placeholder="What&apos;s this about?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2 drop-shadow-neon">
                  Message
                </label>
                <textarea 
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-cyan-400/30 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-white/10 text-white placeholder-cyan-300 glassmorphism neon-glow transition-all duration-200 resize-none text-sm sm:text-base touch-friendly"
                  placeholder="Tell me about your project or inquiry..."
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-cyan-400 to-green-400 text-white rounded-lg hover:shadow-neon transition-all duration-200 hover:-translate-y-1 font-semibold liquid-btn touch-friendly"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

