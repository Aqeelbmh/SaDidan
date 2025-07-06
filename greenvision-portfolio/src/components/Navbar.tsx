"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Timeline", href: "#timeline" },
  { label: "Languages", href: "#language" },
  { label: "Publications", href: "#publications" },
  { label: "Awards", href: "#awards" },
  { label: "Projects", href: "#projects" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      // Check if navbar should have scrolled background
      setScrolled(window.scrollY > 50);

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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (open && !(event.target as Element).closest('nav')) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when mobile menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [open]);

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
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/20 backdrop-blur-xl border-b border-yellow-300/30 shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="container-responsive">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <span className="text-xl sm:text-2xl font-bold text-white">
                Sadidan
              </span>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex gap-6 xl:gap-8 items-center" role="menubar">
              {navLinks.map(link => (
                <li key={link.href} role="none">
                  <a
                    href={link.href}
                    className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 text-cyan-100 hover:text-yellow-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-transparent touch-friendly ${
                      active === link.href 
                        ? 'text-yellow-300 bg-white/10 underline underline-offset-4' 
                        : ''
                    }`}
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

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden touch-friendly p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-transparent"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-6 h-0.5 bg-yellow-300 rounded-full transition-all duration-300 ${
                  open ? 'rotate-45 translate-y-0.5' : '-translate-y-1'
                }`} />
                <span className={`block w-6 h-0.5 bg-cyan-200 rounded-full transition-all duration-300 ${
                  open ? 'opacity-0' : 'opacity-100'
                }`} />
                <span className={`block w-6 h-0.5 bg-yellow-300 rounded-full transition-all duration-300 ${
                  open ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'
                }`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-white/10 backdrop-blur-xl border-t border-yellow-300/20 shadow-lg"
              id="mobile-menu"
              role="menu"
            >
              <div className="container-responsive py-4">
                <ul className="space-y-2">
                  {navLinks.map(link => (
                    <li key={link.href} role="none">
                      <a
                        href={link.href}
                        className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 touch-friendly ${
                          active === link.href 
                            ? 'text-yellow-300 bg-white/10' 
                            : 'text-cyan-100 hover:text-yellow-300 hover:bg-white/5'
                        }`}
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 