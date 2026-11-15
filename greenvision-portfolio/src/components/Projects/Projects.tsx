"use client";

import Image from "next/image";
import type { Project } from "../../lib/types";
import SectionShell from "../ui/SectionShell";
import Reveal from "../ui/Reveal";

interface ProjectsProps {
  items: Project[];
}

const Projects = ({ items }: ProjectsProps) => {
  return (
    <SectionShell
      index="06"
      label="Projects"
      title={
        <>
          Selected <em className="not-italic text-gold-soft">work</em>.
        </>
      }
      intro="Applied research and consulting — from environmental impact assessment to green infrastructure and community education."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((project, index) => (
          <Reveal key={project.id} delay={Math.min(index * 0.05, 0.3)}>
            <article className="glass group flex h-full flex-col overflow-hidden rounded-2xl transition-colors duration-300 hover:border-gold/30">
              <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
                {project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(min-width: 768px) 45vw, 92vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="relative flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(88,195,155,0.16),transparent_60%),radial-gradient(circle_at_75%_80%,rgba(199,168,106,0.14),transparent_55%)]">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/25 bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.09)]">
                      <span className="text-3xl" aria-hidden>
                        {project.emoji || "🌱"}
                      </span>
                    </div>
                    <span className="mt-5 font-mono text-[0.55rem] uppercase tracking-[0.3em] text-muted/70">
                      Project study
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,14,12,0.7)] via-transparent to-transparent" />

                <span className="absolute left-4 top-4 font-mono text-[0.62rem] tracking-[0.18em] text-ink-soft/80">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {project.category && (
                  <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[0.55rem] uppercase tracking-[0.18em] text-ink-soft backdrop-blur-md">
                    {project.category}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl leading-snug text-ink">
                  {project.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.86rem] leading-relaxed text-muted">
                  {project.description}
                </p>

                {project.technologies.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={`${tech}-${techIndex}`}
                        className="rounded-full border border-line px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.1em] text-ink-soft"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {(project.liveUrl || project.githubUrl) && (
                  <div className="mt-6 flex items-center gap-6 border-t border-line pt-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-arrow"
                      >
                        View project <span aria-hidden>↗</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-arrow"
                      >
                        Case study <span aria-hidden>↗</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
};

export default Projects;
