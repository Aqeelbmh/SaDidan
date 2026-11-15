"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Journey", href: "#timeline" },
  { label: "Languages", href: "#language" },
  { label: "Publications", href: "#publications" },
  { label: "Awards", href: "#awards" },
  { label: "Projects", href: "#projects" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

const Navbar = ({ name }: { name: string }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const scrollPosition = window.scrollY + 120;

      for (let i = navLinks.length - 1; i >= 0; i--) {
        const id = navLinks[i].href.substring(1);
        const section = document.getElementById(id);
        if (!section) continue;
        if (
          scrollPosition >= section.offsetTop &&
          scrollPosition < section.offsetTop + section.offsetHeight
        ) {
          setActive(navLinks[i].href);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNavClick = (href: string) => {
    setActive(href);
    setOpen(false);
    document
      .getElementById(href.substring(1))
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-[rgba(9,18,15,0.72)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-responsive">
          <div className="flex h-[4.5rem] items-center justify-between gap-6">
            <a
              href="#hero"
              onClick={(event) => {
                event.preventDefault();
                handleNavClick("#hero");
              }}
              className="group flex items-center gap-3"
              aria-label={`${name} — back to top`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 font-mono text-[0.62rem] tracking-[0.08em] text-gold-soft transition-colors group-hover:border-gold">
                {initials(name) || "IS"}
              </span>
              <span className="hidden flex-col leading-tight sm:flex">
                <span className="font-display text-[0.98rem] text-ink">
                  {name}
                </span>
                <span className="mt-0.5 text-[0.58rem] uppercase tracking-[0.28em] text-muted">
                  Environmental Scientist
                </span>
              </span>
            </a>

            <nav
              aria-label="Sections"
              className="hidden items-center gap-5 lg:flex xl:gap-7"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavClick(link.href);
                  }}
                  aria-current={active === link.href ? "true" : undefined}
                  className={`relative py-2 text-[0.64rem] font-medium uppercase tracking-[0.2em] transition-colors ${
                    active === link.href
                      ? "text-ink"
                      : "text-muted hover:text-ink-soft"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300 ${
                      active === link.href ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-line text-ink transition-colors hover:border-gold/50 lg:hidden"
            >
              <span
                className={`h-px w-4 bg-current transition-transform duration-300 ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-4 bg-current transition-opacity duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`h-px w-4 bg-current transition-transform duration-300 ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[rgba(7,14,12,0.96)] backdrop-blur-2xl lg:hidden"
          >
            <div className="container-responsive flex h-full flex-col justify-center pb-10 pt-24">
              <ul className="space-y-1">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.04, ease: EASE }}
                  >
                    <a
                      href={link.href}
                      onClick={(event) => {
                        event.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className="flex items-baseline gap-4 border-b border-line/60 py-3.5"
                    >
                      <span className="font-mono text-[0.6rem] tracking-[0.2em] text-gold/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`font-display text-2xl ${
                          active === link.href ? "text-gold-soft" : "text-ink"
                        }`}
                      >
                        {link.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-10 text-[0.62rem] uppercase tracking-[0.28em] text-muted">
                {name} · Portfolio
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
