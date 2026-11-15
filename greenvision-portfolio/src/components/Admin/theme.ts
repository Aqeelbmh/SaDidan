import type { Accent } from "../../lib/sections";

export interface AccentTheme {
  text: string;
  softText: string;
  bg: string;
  border: string;
  gradient: string;
  ring: string;
  glow: string;
  dot: string;
}

export const ACCENTS: Record<Accent, AccentTheme> = {
  yellow: {
    text: "text-gold",
    softText: "text-gold-soft",
    bg: "bg-gold/10",
    border: "border-gold/30",
    gradient: "from-[#dcc294] to-[#c7a86a]",
    ring: "focus:ring-gold/20",
    glow: "shadow-[0_18px_50px_-24px_rgba(199,168,106,0.55)]",
    dot: "bg-gold",
  },
  cyan: {
    text: "text-accent",
    softText: "text-accent-soft",
    bg: "bg-accent/10",
    border: "border-accent/30",
    gradient: "from-[#8ad6b8] to-[#58c39b]",
    ring: "focus:ring-accent/20",
    glow: "shadow-[0_18px_50px_-24px_rgba(88,195,155,0.55)]",
    dot: "bg-accent",
  },
  green: {
    text: "text-[#a8dcc6]",
    softText: "text-[#c6e9d9]",
    bg: "bg-[#8ad6b8]/10",
    border: "border-[#8ad6b8]/30",
    gradient: "from-[#a8dcc6] to-[#6bc2a2]",
    ring: "focus:ring-[#8ad6b8]/20",
    glow: "shadow-[0_18px_50px_-24px_rgba(138,214,184,0.5)]",
    dot: "bg-[#a8dcc6]",
  },
  purple: {
    text: "text-[#c2d0c8]",
    softText: "text-[#dbe4df]",
    bg: "bg-[#9fb3a9]/10",
    border: "border-[#9fb3a9]/30",
    gradient: "from-[#c2d0c8] to-[#9fb3a9]",
    ring: "focus:ring-[#9fb3a9]/20",
    glow: "shadow-[0_18px_50px_-24px_rgba(159,179,169,0.45)]",
    dot: "bg-[#c2d0c8]",
  },
  pink: {
    text: "text-[#e0c0a9]",
    softText: "text-[#efd6c6]",
    bg: "bg-[#cfa58c]/10",
    border: "border-[#cfa58c]/30",
    gradient: "from-[#efd6c6] to-[#cfa58c]",
    ring: "focus:ring-[#cfa58c]/20",
    glow: "shadow-[0_18px_50px_-24px_rgba(207,165,140,0.45)]",
    dot: "bg-[#e0c0a9]",
  },
};

export const INPUT_CLASS =
  "w-full rounded-lg border border-line bg-[rgba(10,20,17,0.55)] px-4 py-3 text-sm text-ink placeholder:text-muted/50 outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/15 disabled:opacity-50";

export const LABEL_CLASS =
  "mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted";

export const CARD_CLASS =
  "rounded-2xl border border-line bg-[rgba(255,255,255,0.025)] backdrop-blur-xl";
