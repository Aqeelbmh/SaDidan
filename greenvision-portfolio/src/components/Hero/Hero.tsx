"use client";
import React from 'react';
import Image from "next/image";

const Hero: React.FC = () => {
  const handleDownloadCV = () => {
    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = '/CV-Ikhwanussafa-Sadidan.pdf';
    link.download = 'CV-Ikhwanussafa-Sadidan.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1826] via-[#0e2233] to-[#0a1826] pt-16 sm:pt-20">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-4 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-yellow-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-4 sm:right-20 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-8 sm:left-40 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1826]/80 via-[#0e2233]/60 to-[#0a1826]/80"></div>

      <div className="relative z-10 container-responsive">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Name and Title */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-yellow-300 via-cyan-400 to-green-400 bg-clip-text text-transparent">
                  Ikhwanussafa Sadidan
                </span>
                <span className="text-white">, M.Sc.</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-yellow-100 font-medium">
                Ecology & Environmental Management
              </p>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-cyan-100 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                A passionate university lecturer and researcher dedicated to sustainability and ecological innovation. With an academic foundation in Ecology and Environmental Management from Tomsk Polytechnic University (Russia) and years of teaching, researching, and consulting experience, I aim to inspire change through science and education.
              </p>
              <p className="text-base sm:text-lg text-cyan-100 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                My research focuses on environmental pollution, Geographic Information Systems (GIS), and the integration of Artificial Intelligence in ecological analysis. I currently serve as a lecturer in Faculty of Engineering at Universitas Singaperbangsa Karawang (UNSIKA), where I also responsible to coordinate international collaborations and affairs.
              </p>
              <p className="text-base sm:text-lg text-green-400 font-semibold">
                Let&apos;s work together to build a healthier, greener planet.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0">
              <div className="backdrop-blur-md bg-white/10 border border-yellow-300/20 rounded-xl p-3 sm:p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-yellow-300">5+</div>
                <div className="text-xs sm:text-sm text-cyan-100">Years Experience</div>
              </div>
              <div className="backdrop-blur-md bg-white/10 border border-cyan-400/20 rounded-xl p-3 sm:p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-cyan-400">10+</div>
                <div className="text-xs sm:text-sm text-cyan-100">Research Papers</div>
              </div>
              <div className="backdrop-blur-md bg-white/10 border border-green-400/20 rounded-xl p-3 sm:p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-400">100+</div>
                <div className="text-xs sm:text-sm text-cyan-100">Students Mentored</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <button 
                onClick={handleDownloadCV}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/25 touch-friendly"
              >
                <span className="flex items-center justify-center gap-2">
                  🟢 Download CV
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              </button>
              
              <button className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25 touch-friendly">
                <span className="flex items-center justify-center gap-2">
                  🌍 Explore My Work
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-300 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              </button>
              
              <button className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-300 hover:to-green-400 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-400/25 touch-friendly">
                <span className="flex items-center justify-center gap-2">
                  📬 Contact Me
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-300 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              </button>
            </div>
          </div>

          {/* Right side - Profile card */}
          <div className="relative order-first lg:order-last">
            <div className="backdrop-blur-md bg-white/10 border border-yellow-300/20 rounded-2xl p-6 sm:p-8 shadow-2xl max-w-sm mx-auto lg:max-w-none">
              <div className="relative">
                {/* Profile image */}
                <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 mx-auto rounded-full bg-gradient-to-br from-yellow-400 via-cyan-400 to-green-400 p-1 overflow-hidden">
                  <Image
                    src="/profile/didan.jpeg"
                    alt="Ikhwanussafa Sadidan profile photo"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover rounded-full border-4 border-yellow-300 shadow-neon"
                    priority
                  />
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-400 to-cyan-400 rounded-full opacity-80 animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full opacity-80 animate-pulse animation-delay-1000"></div>
              </div>
              
              {/* Quick info */}
              <div className="mt-4 sm:mt-6 text-center space-y-2">
                <h3 className="text-lg sm:text-xl font-semibold text-white">Lecturer of Environmental Engineering Study Program</h3>
                <p className="text-sm sm:text-base text-cyan-100">Universitas Singaperbangsa Karawang (UNSIKA)</p>
                <div className="flex flex-wrap justify-center gap-2 mt-3 sm:mt-4">
                  <span className="px-2 sm:px-3 py-1 bg-yellow-400/20 text-yellow-300 rounded-full text-xs sm:text-sm">GIS</span>
                  <span className="px-2 sm:px-3 py-1 bg-cyan-400/20 text-cyan-300 rounded-full text-xs sm:text-sm">AI</span>
                  <span className="px-2 sm:px-3 py-1 bg-green-400/20 text-green-300 rounded-full text-xs sm:text-sm">Pollution</span>
                  <span className="px-2 sm:px-3 py-1 bg-yellow-400/20 text-yellow-300 rounded-full text-xs sm:text-sm">Research</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-yellow-300/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-yellow-300/60 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

