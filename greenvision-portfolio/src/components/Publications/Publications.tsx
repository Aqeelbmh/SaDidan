"use client";

import type { Publication } from "../../lib/types";
import SectionShell from "../ui/SectionShell";
import Reveal from "../ui/Reveal";

interface PublicationsProps {
  items: Publication[];
}

const Publications = ({ items }: PublicationsProps) => {
  return (
    <SectionShell
      index="04"
      label="Publications"
      title={
        <>
          Research, <em className="not-italic text-gold-soft">published</em>.
        </>
      }
      intro="Peer-reviewed work on pollution, GIS, and the application of artificial intelligence to environmental analysis."
    >
      <div className="border-t border-line">
        {items.map((pub, index) => {
          const hasDoi = pub.doi && pub.doi !== "N/A";
          const doiHref = hasDoi
            ? pub.doi.startsWith("http")
              ? pub.doi
              : `https://doi.org/${pub.doi}`
            : "";

          return (
            <Reveal key={pub.id} delay={Math.min(index * 0.04, 0.25)}>
              <article className="group grid gap-3 border-b border-line py-7 sm:grid-cols-[5.5rem_1fr_auto] sm:gap-8 sm:py-8">
                <p className="font-mono text-[0.72rem] tracking-[0.08em] text-gold-soft">
                  {pub.year}
                </p>

                <div className="min-w-0">
                  <h3 className="font-display text-lg leading-snug text-ink transition-colors duration-300 group-hover:text-gold-soft sm:text-xl">
                    {pub.title}
                  </h3>
                  <p className="mt-1.5 text-[0.9rem] italic text-ink-soft">
                    {pub.journal}
                  </p>
                  {pub.authors && (
                    <p className="mt-2 text-[0.78rem] text-muted">
                      {pub.authors}
                    </p>
                  )}
                  {pub.abstract && (
                    <p className="mt-3 line-clamp-2 max-w-3xl text-[0.84rem] leading-relaxed text-muted">
                      {pub.abstract}
                    </p>
                  )}
                </div>

                <div className="sm:pt-1 sm:text-right">
                  {hasDoi ? (
                    <a
                      href={doiHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-arrow whitespace-nowrap"
                    >
                      DOI <span aria-hidden>↗</span>
                    </a>
                  ) : (
                    <span className="text-[0.7rem] uppercase tracking-[0.14em] text-muted/70">
                      Not online
                    </span>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <div className="mt-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <p className="max-w-md text-sm text-muted">
            New work in progress on AI-assisted environmental monitoring and
            sustainable urban development.
          </p>
          <a
            href="https://scholar.google.com/citations?user=7Zu5XFUAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Google Scholar <span aria-hidden>↗</span>
          </a>
        </div>
      </Reveal>
    </SectionShell>
  );
};

export default Publications;
