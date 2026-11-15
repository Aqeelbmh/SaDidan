"use client";

import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ModalProps {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  size?: "md" | "lg";
}

export default function Modal({
  open,
  title,
  subtitle,
  onClose,
  children,
  footer,
  size = "md",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#040b09]/85 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={`relative z-10 flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl border border-line bg-[rgba(9,18,14,0.97)] shadow-[0_40px_140px_-30px_rgba(0,0,0,0.95)] backdrop-blur-2xl sm:max-h-[88vh] sm:rounded-2xl ${
              size === "lg" ? "sm:max-w-2xl" : "sm:max-w-xl"
            }`}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-5 sm:px-7">
              <div>
                <h2 className="font-display text-[1.3rem] font-semibold leading-tight text-ink sm:text-[1.45rem]">
                  {title}
                </h2>
                {subtitle && (
                  <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-[0.8rem]">
                    {subtitle}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-line text-muted transition hover:border-line-strong hover:text-ink"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
              {children}
            </div>
            {footer && (
              <div className="border-t border-line bg-[rgba(7,14,12,0.7)] px-5 py-4 sm:px-7">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
