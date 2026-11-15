"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { TimelineItem } from "../../lib/types";
import SectionShell from "../ui/SectionShell";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline = ({ items }: TimelineProps) => {
  const [activeTab, setActiveTab] = useState<"education" | "experience">(
    "education",
  );

  const currentData = items.filter((item) => item.track === activeTab);

  return (
    <SectionShell
      index="02"
      label="Journey"
      title={
        <>
          A path through <em className="not-italic text-gold-soft">education</em>{" "}
          and practice.
        </>
      }
      intro="Two decades of study, teaching and fieldwork across Indonesia and Russia — the academic grounding behind the work."
    >
      <div className="mb-10 flex gap-8 border-b border-line">
        {(
          [
            ["education", "Education"],
            ["experience", "Experience"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            className={`relative pb-3.5 text-[0.66rem] font-medium uppercase tracking-[0.22em] transition-colors ${
              activeTab === key ? "text-ink" : "text-muted hover:text-ink-soft"
            }`}
          >
            {label}
            {activeTab === key && (
              <motion.span
                layoutId="journey-tab"
                className="absolute inset-x-0 -bottom-px h-px bg-gold"
                transition={{ duration: 0.35, ease: EASE }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="relative ml-[7px] border-l border-line sm:ml-[8.5rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {currentData.length === 0 && (
              <div className="glass-quiet ml-8 rounded-2xl p-8 text-sm text-muted">
                {activeTab === "education"
                  ? "Education entries will appear here."
                  : "Experience entries will appear here."}
              </div>
            )}

            {currentData.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: index * 0.06, ease: EASE }}
                className="relative pb-9 pl-7 last:pb-0 sm:pl-10"
              >
                <span className="absolute -left-[4.5px] top-[1.35rem] h-[9px] w-[9px] rounded-full border border-gold/70 bg-paper">
                  <span className="absolute inset-[2px] rounded-full bg-gold/80" />
                </span>

                <p className="mb-2 font-mono text-[0.68rem] tracking-[0.12em] text-gold-soft sm:hidden">
                  {item.year}
                </p>

                <p className="absolute -left-[8.5rem] top-[1.15rem] hidden w-[6.5rem] text-right font-mono text-[0.7rem] tracking-[0.1em] text-muted sm:block">
                  {item.year}
                </p>

                <div className="glass rounded-2xl p-5 transition-colors duration-300 hover:border-gold/25 sm:p-6">
                  <div className="flex items-start gap-4">
                    {item.icon && (
                      <span className="glass-quiet flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg">
                        <span aria-hidden>{item.icon}</span>
                      </span>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-display text-lg leading-snug text-ink sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[0.82rem] font-medium text-gold-soft">
                        {item.company}
                      </p>
                    </div>
                  </div>
                  {item.description && (
                    <p className="mt-4 text-[0.85rem] leading-relaxed text-muted">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionShell>
  );
};

export default Timeline;
