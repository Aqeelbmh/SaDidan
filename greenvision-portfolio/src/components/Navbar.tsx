"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Timeline", href: "#timeline" },
  { label: "Publications", href: "#publications" },
  { label: "Projects", href: "#projects" },
  { label: "Awards", href: "#awards" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActive(`#${sections[i]}`);
            break;
          }
        }
      }
    };

    // Set initial active section
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setActive(href);
    setOpen(false);
    
    // Smooth scroll to section
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95vw] max-w-4xl flex items-center justify-center px-6 py-3 rounded-full backdrop-blur-xl bg-white/10 border border-yellow-300/30 shadow-2xl glassmorphism" style={{boxShadow: '0 8px 32px 0 rgba(255,255,0,0.15)'}}>
      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-8 items-center justify-center flex-1" role="menubar">
        {navLinks.map(link => (
          <li key={link.href} role="none">
            <a
              href={link.href}
              className={`px-2 py-1 rounded font-medium transition-colors duration-200 text-cyan-100 hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 ${active === link.href ? 'text-yellow-300 underline underline-offset-4' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              role="menuitem"
              tabIndex={0}
              aria-current={active === link.href ? 'page' : undefined}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <span className={`block w-7 h-1 rounded-full bg-yellow-300 transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-7 h-1 rounded-full bg-cyan-200 transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-7 h-1 rounded-full bg-yellow-300 transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>
      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden flex flex-col items-center gap-6 py-8 bg-white/10 backdrop-blur-lg border-b border-yellow-300/20 shadow-sm absolute top-full left-0 w-full rounded-b-2xl"
            role="menu"
          >
            {navLinks.map(link => (
              <li key={link.href} role="none">
                <a
                  href={link.href}
                  className={`text-xl font-semibold px-6 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-colors duration-200 ${active === link.href ? 'text-yellow-300' : 'text-cyan-100 hover:text-yellow-300'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  role="menuitem"
                  tabIndex={0}
                  aria-current={active === link.href ? 'page' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 