"use client";

import Image from "next/image";
import type { GalleryItem } from "../../lib/types";
import SectionShell from "../ui/SectionShell";
import Reveal from "../ui/Reveal";

interface GalleryProps {
  items: GalleryItem[];
  cvUrl?: string;
}

const Gallery = ({ items, cvUrl }: GalleryProps) => {
  return (
    <SectionShell
      index="07"
      label="Gallery"
      title={
        <>
          From the <em className="not-italic text-gold-soft">field</em>.
        </>
      }
      intro="Moments from research, teaching and conservation work — mangroves, classrooms, and everything between."
    >
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {items.map((item, index) => (
          <Reveal key={item.id} delay={Math.min(index * 0.04, 0.24)}>
            <figure className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-line bg-paper-2">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 24vw, 45vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                />
              ) : (
                <div className="relative flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_35%_25%,rgba(88,195,155,0.16),transparent_60%),radial-gradient(circle_at_70%_75%,rgba(199,168,106,0.16),transparent_60%)] pb-16">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/25 bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.09)]">
                    <span className="text-3xl" aria-hidden>
                      {item.emoji || "🌿"}
                    </span>
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,12,10,0.88)] via-[rgba(6,12,10,0.25)] to-transparent" />

              <figcaption className="absolute inset-x-0 bottom-0 p-4">
                {item.category && (
                  <span className="text-[0.55rem] uppercase tracking-[0.2em] text-gold-soft">
                    {item.category}
                  </span>
                )}
                <h3 className="font-display mt-1 text-[0.98rem] leading-snug text-ink">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="mt-1.5 line-clamp-2 text-[0.7rem] leading-relaxed text-ink-soft/80 transition-all duration-500 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:group-hover:max-h-16 lg:group-hover:opacity-100">
                    {item.description}
                  </p>
                )}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-line pt-8 sm:flex-row sm:items-center">
        <p className="max-w-md text-sm text-muted">
          More fieldwork and research documentation is available in the full
          portfolio and curriculum vitae.
        </p>
        <div className="flex items-center gap-6">
          <a href="#projects" className="link-arrow">
            Full portfolio <span aria-hidden>↗</span>
          </a>
          {cvUrl && (
            <a
              href={cvUrl}
              target={/^https?:\/\//i.test(cvUrl) ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="link-arrow"
            >
              Curriculum vitae <span aria-hidden>↗</span>
            </a>
          )}
        </div>
      </div>
    </SectionShell>
  );
};

export default Gallery;
