"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { INPUT_CLASS, LABEL_CLASS } from "./theme";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };
      if (!response.ok) {
        setError(data.error || "Sign in failed. Please try again.");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-paper px-4 py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="orb orb-emerald drift-a left-[-16%] top-[-10%] h-[32rem] w-[32rem] opacity-30" />
        <div className="orb orb-gold drift-b bottom-[-18%] right-[-12%] h-[28rem] w-[28rem] opacity-25" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass frame-gold relative w-full max-w-md rounded-2xl p-8 sm:p-10"
      >
        <div className="mb-9 text-center">
          <span className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-display text-xl font-semibold text-gold">
            S
          </span>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-muted">
            Private area
          </p>
          <h1 className="mt-3 font-display text-[1.9rem] font-semibold leading-tight text-ink">
            Content Studio
          </h1>
          <p className="mt-2 text-sm text-muted">
            Sign in to edit your portfolio content.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label htmlFor="admin-password" className={LABEL_CLASS}>
              Admin password
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoFocus
                autoComplete="current-password"
                placeholder="Enter your password"
                className={`${INPUT_CLASS} pr-20`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted transition hover:text-ink"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-200"
              role="alert"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="btn btn-solid w-full text-[0.8rem] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-between border-t border-line pt-5 text-[0.7rem] text-muted">
          <Link href="/" className="transition hover:text-accent-soft">
            ← Back to website
          </Link>
          <span className="font-mono uppercase tracking-[0.2em]">
            Authorised only
          </span>
        </div>
      </motion.div>
    </div>
  );
}
