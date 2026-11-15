"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import type { ContactSettings, HeroSettings } from "../../lib/types";

interface HeroProps {
  hero: HeroSettings;
  contact: ContactSettings;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

const Hero: React.FC<HeroProps> = ({ hero, contact }) => {
  const stats = [
    { value: hero.stat1Value, label: hero.stat1Label },
    { value: hero.stat2Value, label: hero.stat2Label },
    { value: hero.stat3Value, label: hero.stat3Label },
  ].filter((stat) => stat.value || stat.label);

  const socialLinks = [
    { href: contact.linkedin, label: "LinkedIn", Icon: FaLinkedin },
    { href: contact.facebook, label: "Facebook", Icon: FaFacebook },
    { href: contact.instagram, label: "Instagram", Icon: FaInstagram },
    { href: contact.youtube, label: "YouTube", Icon: FaYoutube },
  ].filter((social) => social.href);

  const cvIsExternal = /^https?:\/\//i.test(hero.cvUrl);

  return (
    <section className="relative overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-32 lg:pt-40">
      <div className="container-responsive">
        <div className="grid items-center gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-20">
          <div>
            <motion.p {...fadeUp(0)} className="eyebrow">
              {hero.roleTitle || "Environmental Scientist"}
            </motion.p>

            <motion.h1
              {...fadeUp(0.08)}
              className="font-display mt-6 text-[2.9rem] leading-[0.98] text-ink sm:text-6xl xl:text-[4.9rem]"
            >
              {hero.name}
              {hero.credential && (
                <span className="ml-2 align-baseline text-[0.52em] font-normal italic text-gold-soft">
                  {hero.credential}
                </span>
              )}
            </motion.h1>

            <motion.p
              {...fadeUp(0.16)}
              className="font-display mt-5 max-w-xl text-lg italic leading-snug text-ink-soft sm:text-2xl"
            >
              {hero.headline}
            </motion.p>

            <motion.div {...fadeUp(0.22)} className="mt-8 rule-gold w-16" />

            <motion.div
              {...fadeUp(0.28)}
              className="mt-8 max-w-xl space-y-4 text-[0.95rem] leading-relaxed text-muted sm:text-base"
            >
              {hero.bio1 && <p className="text-ink-soft">{hero.bio1}</p>}
              {hero.bio2 && <p>{hero.bio2}</p>}
            </motion.div>

            {hero.closing && (
              <motion.p
                {...fadeUp(0.34)}
                className="mt-6 text-[0.72rem] uppercase tracking-[0.2em] text-gold-soft"
              >
                {hero.closing}
              </motion.p>
            )}

            <motion.div
              {...fadeUp(0.4)}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              {hero.cvUrl && (
                <a
                  href={hero.cvUrl}
                  download={cvIsExternal ? undefined : true}
                  target={cvIsExternal ? "_blank" : undefined}
                  rel={cvIsExternal ? "noopener noreferrer" : undefined}
                  className="btn btn-solid"
                >
                  Download CV <span aria-hidden>↓</span>
                </a>
              )}
              <a href="#projects" className="btn btn-outline">
                Explore the work <span aria-hidden>→</span>
              </a>
            </motion.div>

            {stats.length > 0 && (
              <motion.dl
                {...fadeUp(0.48)}
                className="mt-12 grid grid-cols-3 border-t border-line pt-7"
              >
                {stats.map((stat, index) => (
                  <div
                    key={stat.label || stat.value}
                    className={index > 0 ? "border-l border-line pl-5 sm:pl-7" : "pr-4"}
                  >
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="font-display block text-3xl text-ink sm:text-[2.4rem]">
                        {stat.value}
                      </span>
                      <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.18em] text-muted">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </motion.dl>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div className="glass frame-gold relative rounded-[1.6rem] p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.15rem] bg-paper-2">
                <Image
                  src={hero.profileImage || "/profile/didan.jpeg"}
                  alt={`Portrait of ${hero.name}`}
                  fill
                  sizes="(min-width: 1024px) 38vw, 90vw"
                  priority
                  className="object-cover saturate-[0.92]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,14,12,0.55)] via-transparent to-transparent" />
              </div>
            </div>

            <div className="glass absolute -bottom-7 left-0 right-6 rounded-2xl px-5 py-4 sm:right-auto sm:max-w-[17rem] lg:-left-10">
              <p className="text-[0.62rem] uppercase tracking-[0.22em] text-gold-soft">
                {hero.roleOrg || "Universitas Singaperbangsa Karawang"}
              </p>
              <p className="mt-1.5 text-sm leading-snug text-ink-soft">
                {hero.roleTitle}
              </p>
              {hero.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5 border-t border-line pt-3">
                  {hero.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[0.58rem] uppercase tracking-[0.14em] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {socialLinks.length > 0 && (
              <div className="mt-14 flex items-center gap-2 sm:mt-16 lg:justify-end">
                <span className="mr-1 text-[0.58rem] uppercase tracking-[0.24em] text-muted">
                  Connect
                </span>
                {socialLinks.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:text-gold-soft"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex">
        <span className="text-[0.55rem] uppercase tracking-[0.34em] text-muted">
          Scroll
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-gold"
            animate={{ y: [-16, 48] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </div>
    </section>
  );
};

export default Hero;
