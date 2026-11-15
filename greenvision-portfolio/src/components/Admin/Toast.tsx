"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface ToastState {
  kind: "success" | "error";
  message: string;
}

interface ToastProps {
  toast: ToastState | null;
  onClose: () => void;
}

export default function Toast({ toast, onClose }: ToastProps) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onClose, 4200);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          role="status"
          className={`fixed bottom-5 right-5 z-[70] flex max-w-sm items-start gap-3 rounded-xl border px-4 py-3.5 text-sm shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl ${
            toast.kind === "success"
              ? "border-accent/30 bg-[#58c39b]/15 text-[#d7f1e6]"
              : "border-red-400/30 bg-red-500/15 text-red-100"
          }`}
        >
          <span
            className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
              toast.kind === "success"
                ? "bg-accent/25 text-accent-soft"
                : "bg-red-400/25 text-red-200"
            }`}
          >
            {toast.kind === "success" ? "✓" : "!"}
          </span>
          <span className="leading-relaxed">{toast.message}</span>
          <button
            onClick={onClose}
            className="ml-2 text-current/60 transition hover:text-current"
            aria-label="Dismiss message"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
