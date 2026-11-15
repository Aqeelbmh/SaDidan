"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

const contentLinks = [
  { href: "/admin/timeline", label: "Journey" },
  { href: "/admin/language", label: "Languages" },
  { href: "/admin/publications", label: "Publications" },
  { href: "/admin/awards", label: "Awards" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/gallery", label: "Gallery" },
];

interface AdminShellProps {
  children: ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const signOut = async () => {
    setSigningOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  };

  const navLink = (href: string, label: string) => (
    <Link
      key={href}
      href={href}
      className={`group relative flex items-center justify-between rounded-lg px-3 py-2.5 text-[0.8rem] transition-colors ${
        isActive(href)
          ? "bg-white/[0.05] text-ink"
          : "text-ink-soft/65 hover:bg-white/[0.03] hover:text-ink"
      }`}
    >
      <span className="flex items-center gap-3">
        <span
          className={`h-1 w-1 rounded-full ${
            isActive(href) ? "bg-gold" : "bg-line-strong"
          }`}
        />
        {label}
      </span>
      {isActive(href) && (
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gold">
          edit
        </span>
      )}
    </Link>
  );

  return (
    <div className="relative min-h-screen bg-paper text-ink">
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="orb orb-emerald drift-a left-[-18%] top-[-12%] h-[34rem] w-[34rem] opacity-25" />
        <div className="orb orb-gold drift-b bottom-[-20%] right-[-12%] h-[30rem] w-[30rem] opacity-20" />
      </div>

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-line bg-[rgba(7,14,12,0.6)] backdrop-blur-xl lg:flex">
        <div className="px-6 pb-6 pt-7">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-display text-lg font-semibold text-gold">
              S
            </span>
            <span>
              <span className="block font-display text-[0.95rem] font-semibold tracking-tight text-ink">
                Content Studio
              </span>
              <span className="mt-0.5 block font-mono text-[0.58rem] uppercase tracking-[0.22em] text-muted">
                Sa&apos;didan
              </span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
          {navLink("/admin", "Overview")}
          {navLink("/admin/profile", "Profile & hero")}
          <p className="px-3 pb-2 pt-5 font-mono text-[0.55rem] uppercase tracking-[0.3em] text-muted/70">
            Content
          </p>
          {contentLinks.map((link) => navLink(link.href, link.label))}
        </nav>

        <div className="space-y-1 border-t border-line p-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[0.8rem] text-ink-soft/65 transition hover:bg-white/[0.03] hover:text-ink"
          >
            <span aria-hidden>↗</span> View live site
          </a>
          <button
            onClick={signOut}
            disabled={signingOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[0.8rem] text-ink-soft/65 transition hover:bg-red-500/10 hover:text-red-200 disabled:opacity-50"
          >
            <span aria-hidden>⏻</span>
            {signingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </aside>

      <header className="sticky top-0 z-40 border-b border-line bg-[rgba(7,14,12,0.75)] backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/admin" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-display text-sm font-semibold text-gold">
              S
            </span>
            <span className="font-display text-sm font-semibold text-ink">
              Content Studio
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-line px-3 py-2 text-xs text-ink-soft/70"
            >
              View site
            </a>
            <button
              onClick={signOut}
              disabled={signingOut}
              className="rounded-lg border border-red-400/20 px-3 py-2 text-xs text-red-200 disabled:opacity-50"
            >
              {signingOut ? "…" : "Sign out"}
            </button>
          </div>
        </div>
        <nav className="flex gap-2 overflow-x-auto px-4 pb-3">
          {[
            { href: "/admin", label: "Overview" },
            { href: "/admin/profile", label: "Profile" },
            ...contentLinks,
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-shrink-0 items-center rounded-full border px-3 py-1.5 text-[0.7rem] font-medium transition ${
                isActive(link.href)
                  ? "border-gold/40 bg-gold/10 text-gold-soft"
                  : "border-line text-ink-soft/60"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="relative z-10 lg:pl-64">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
          {children}
        </div>
      </main>
    </div>
  );
}
