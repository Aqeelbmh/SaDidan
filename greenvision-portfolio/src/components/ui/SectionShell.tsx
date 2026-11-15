"use client";

import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionShellProps {
  index: string;
  label: string;
  title: ReactNode;
  intro?: string;
  children: ReactNode;
  className?: string;
  headerExtra?: ReactNode;
}

export default function SectionShell({
  index,
  label,
  title,
  intro,
  children,
  className = "",
  headerExtra,
}: SectionShellProps) {
  return (
    <div className={`section-pad relative ${className}`}>
      <div className="container-responsive">
        <header className="max-w-3xl">
          <Reveal>
            <span className="eyebrow">
              {index} <span aria-hidden>—</span> {label}
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-5 text-[2.4rem] leading-[1.04] text-ink sm:text-5xl lg:text-[3.6rem]">
              {title}
            </h2>
          </Reveal>
          {intro && (
            <Reveal delay={0.12}>
              <p className="prose-muted mt-6 max-w-2xl text-[0.98rem] sm:text-base">
                {intro}
              </p>
            </Reveal>
          )}
          {headerExtra && <Reveal delay={0.16}>{headerExtra}</Reveal>}
        </header>

        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </div>
  );
}
