"use client";

import type { Award } from "../../lib/types";
import SectionShell from "../ui/SectionShell";
import Reveal from "../ui/Reveal";

const Laurel = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
    className="h-4 w-4 text-gold"
  >
    <path
      d="M12 3.5l1.4 4.1 4.1 1.4-4.1 1.4L12 14.5l-1.4-4.1L6.5 9l4.1-1.4L12 3.5Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <path
      d="M5.5 15.5c2.5 3 6.5 4.5 13 4"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

interface AwardsProps {
  items: Award[];
}

const Awards = ({ items }: AwardsProps) => {
  return (
    <SectionShell
      index="05"
      label="Awards"
      title={
        <>
          Recognition &amp; <em className="not-italic text-gold-soft">trust</em>.
        </>
      }
      intro="Grants, scholarships and professional honours awarded for research contributions and academic excellence."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((award, index) => (
          <Reveal key={award.id} delay={Math.min(index * 0.05, 0.3)}>
            <article className="glass flex h-full flex-col rounded-2xl p-6 transition-colors duration-300 hover:border-gold/30">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[0.7rem] tracking-[0.1em] text-gold-soft">
                  {award.year}
                </span>
                {award.category && (
                  <span className="text-[0.56rem] uppercase tracking-[0.18em] text-muted">
                    {award.category}
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-start gap-2.5">
                <span className="mt-1 shrink-0">
                  <Laurel />
                </span>
                <h3 className="font-display text-[1.08rem] leading-snug text-ink">
                  {award.title}
                </h3>
              </div>

              <p className="mt-2 pl-[1.6rem] text-[0.8rem] font-medium text-ink-soft">
                {award.organization}
              </p>

              {award.description && (
                <p className="mt-4 border-t border-line pt-4 text-[0.82rem] leading-relaxed text-muted">
                  {award.description}
                </p>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
};

export default Awards;
