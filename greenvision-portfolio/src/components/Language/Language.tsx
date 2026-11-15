"use client";

import { motion } from "framer-motion";
import type { LanguageSkill } from "../../lib/types";
import SectionShell from "../ui/SectionShell";
import Reveal from "../ui/Reveal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface LanguageProps {
  items: LanguageSkill[];
}

const Language = ({ items }: LanguageProps) => {
  return (
    <SectionShell
      index="03"
      label="Languages"
      title={
        <>
          Working across <em className="not-italic text-gold-soft">borders</em>.
        </>
      }
      intro="Research and teaching that move between Indonesian, English, Russian and beyond — language as a tool for collaboration."
    >
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="space-y-6">
          <Reveal>
            <p className="prose-muted max-w-md text-[0.95rem]">
              Fieldwork, publication and international partnership all depend on
              being understood. These are the languages I work in, from daily
              teaching to academic writing.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass-quiet rounded-2xl p-6">
              <h3 className="text-[0.62rem] uppercase tracking-[0.22em] text-gold-soft">
                Academic Languages
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Proficient in English and Russian for academic research,
                publications and international collaborations.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="glass-quiet rounded-2xl p-6">
              <h3 className="text-[0.62rem] uppercase tracking-[0.22em] text-gold-soft">
                Cultural Communication
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Multilingual skills for effective communication across diverse
                cultural and professional contexts.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="glass rounded-2xl p-6 sm:p-9">
            <ul className="divide-y divide-line">
              {items.map((language, index) => (
                <li key={language.id} className="py-5 first:pt-0 last:pb-0">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-lg text-ink sm:text-xl">
                      {language.name}
                    </h3>
                    <div className="flex items-center gap-4">
                      <span className="text-[0.6rem] uppercase tracking-[0.18em] text-muted">
                        {language.category}
                      </span>
                      <span className="font-mono text-[0.68rem] text-gold-soft">
                        {language.proficiency}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.07]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${language.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.2,
                        delay: 0.15 + index * 0.08,
                        ease: EASE,
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-[#3aa47f] via-[#58c39b] to-[#c7a86a]"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
};

export default Language;
