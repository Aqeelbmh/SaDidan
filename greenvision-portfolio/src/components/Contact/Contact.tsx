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
    <section className="relative w-full py-24 font-sans bg-gradient-to-br from-[#0a1826] via-[#0e2233] to-[#0a1826] overflow-hidden">
      {/* Neon blobs */}
      <NeonBlob className="top-[-80px] left-[-60px] w-72 h-72" />
      <NeonBlob className="bottom-[-60px] right-[-40px] w-60 h-60" />
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-5xl font-extrabold text-white drop-shadow-neon mb-4">Let&apos;s Connect</motion.h2>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="origin-left w-32 h-1 bg-gradient-to-r from-yellow-300 via-cyan-400 to-green-400 mx-auto rounded-full neon-glow" />
          <p className="text-lg text-yellow-100 mt-6 max-w-3xl mx-auto">
            Ready to collaborate on environmental projects or discuss opportunities? I&apos;d love to hear from you.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div>
              <h3 className="text-2xl font-bold text-cyan-300 mb-6 drop-shadow-neon">Get In Touch</h3>
              <p className="text-cyan-200 leading-relaxed mb-8">
                Whether you&apos;re interested in environmental consulting, research collaboration, or educational partnerships, I&apos;m always open to discussing new opportunities and innovative projects.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-cyan-400/20 rounded-full flex items-center justify-center shadow-lg drop-shadow-neon">
                  <Image src="/EmailIcon.svg" alt="Email" width={24} height={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-white drop-shadow-neon">Email</h4>
                  <p className="text-cyan-200">sadidan@unsika.ac.id</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-cyan-400/20 rounded-full flex items-center justify-center shadow-lg drop-shadow-neon">
                  <Image src="/LocationIcon.svg" alt="Location" width={24} height={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-white drop-shadow-neon">Location</h4>
                  <p className="text-cyan-200">Karawang, West Java, Indonesia</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-cyan-400/20 rounded-full flex items-center justify-center shadow-lg drop-shadow-neon">
                  <Image src="/InstitutionIcon.svg" alt="Institution" width={24} height={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-white drop-shadow-neon">Institution</h4>
                  <p className="text-cyan-200">Universitas Singaperbangsa Karawang</p>
                </div>
              </div>
            </div>
            
            <div className="pt-6">
              <h4 className="font-semibold text-white mb-4 drop-shadow-neon">Connect on Social Media</h4>
              <div className="flex space-x-4">
                <a href="https://id.linkedin.com/in/sadidan-ikhwanussafa-9624b990" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-cyan-400/20 rounded-full flex items-center justify-center text-blue-700 hover:bg-blue-400/30 transition-all duration-200 hover:-translate-y-1 drop-shadow-neon" aria-label="LinkedIn">
                  <Image src="/LinkedInIcon.svg" alt="LinkedIn" width={20} height={20} />
                </a>
                <a href="https://instagram.com/sadidun" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-cyan-400/20 rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-400/30 transition-all duration-200 hover:-translate-y-1 drop-shadow-neon" aria-label="Instagram">
                   <Image src="/InstagramIcon.svg" alt="Instagram" width={20} height={20} />
                </a>
                <a href="https://youtube.com/@sadidan26" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-cyan-400/20 rounded-full flex items-center justify-center text-red-600 hover:bg-red-400/30 transition-all duration-200 hover:-translate-y-1 drop-shadow-neon" aria-label="YouTube">
                  <Image src="/YouTubeIcon.svg" alt="YouTube" width={20} height={20} />
                </a>
                <a href="mailto:sadidan@unsika.ac.id" className="w-12 h-12 bg-cyan-400/20 rounded-full flex items-center justify-center text-cyan-600 hover:bg-cyan-400/30 transition-all duration-200 hover:-translate-y-1 drop-shadow-neon" aria-label="Email">
                  <Image src="/EmailIcon.svg" alt="Email" width={20} height={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-2xl p-10 border border-cyan-400/30 shadow-2xl backdrop-blur-xl glassmorphism neon-glow">
            <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-neon">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2 drop-shadow-neon">
                    First Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-cyan-400/30 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-white/10 text-white placeholder-cyan-300 glassmorphism neon-glow transition-all duration-200"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2 drop-shadow-neon">
                    Last Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-cyan-400/30 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-white/10 text-white placeholder-cyan-300 glassmorphism neon-glow transition-all duration-200"
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
                  className="w-full px-4 py-3 border border-cyan-400/30 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-white/10 text-white placeholder-cyan-300 glassmorphism neon-glow transition-all duration-200"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2 drop-shadow-neon">
                  Subject
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-cyan-400/30 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-white/10 text-white placeholder-cyan-300 glassmorphism neon-glow transition-all duration-200"
                  placeholder="What&apos;s this about?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2 drop-shadow-neon">
                  Message
                </label>
                <textarea 
                  rows={5}
                  className="w-full px-4 py-3 border border-cyan-400/30 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-white/10 text-white placeholder-cyan-300 glassmorphism neon-glow transition-all duration-200 resize-none"
                  placeholder="Tell me about your project or inquiry..."
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-400 to-green-400 text-white rounded-lg hover:shadow-neon transition-all duration-200 hover:-translate-y-1 font-semibold liquid-btn"
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

