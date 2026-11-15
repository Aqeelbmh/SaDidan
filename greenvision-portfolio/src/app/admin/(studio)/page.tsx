import Link from "next/link";
import { ACCENTS, CARD_CLASS } from "@/components/Admin/theme";
import { adminPasswordConfigured } from "@/lib/auth";
import { countBySection } from "@/lib/content";
import { ensureDb } from "@/lib/db";
import { SECTION_DEFS } from "@/lib/sections";

export const dynamic = "force-dynamic";

const SECTION_ICONS: Record<string, string> = {
  timeline: "🧭",
  language: "🗣️",
  publications: "📚",
  awards: "🏆",
  projects: "🧪",
  gallery: "🖼️",
};

function StatusPill({
  ok,
  label,
}: {
  ok: boolean;
  label: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium ${
        ok
          ? "border-accent/25 bg-accent/10 text-accent-soft"
          : "border-gold/30 bg-gold/10 text-gold-soft"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${ok ? "bg-accent" : "bg-gold"}`}
      />
      {label}
    </span>
  );
}

export default async function StudioOverview() {
  let dbReady = true;
  let dbError = "";

  try {
    await ensureDb();
  } catch (error) {
    dbReady = false;
    dbError =
      error instanceof Error ? error.message : "The database is unreachable.";
    console.error("Admin overview: database unavailable", error);
  }

  const counts = dbReady ? await countBySection() : {};
  const tursoConfigured = Boolean(process.env.TURSO_DATABASE_URL?.trim());
  const usingTurso = tursoConfigured && process.env.TURSO_DATABASE_URL?.startsWith("libsql");

  return (
    <div>
      <header className="mb-9">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gold">
          Overview
        </p>
        <h1 className="mt-3 max-w-2xl font-display text-[2.1rem] font-semibold leading-[1.1] text-ink sm:text-[2.7rem]">
          Your content,{" "}
          <span className="italic text-gold-soft">in one place.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          Add, edit, reorder or delete anything on your portfolio. Changes are
          live the moment you save — no code and no redeploy.
        </p>
      </header>

      {!dbReady && (
        <div className="mb-6 rounded-2xl border border-red-400/25 bg-red-500/10 px-5 py-4 text-sm text-red-100">
          <p className="font-semibold">The content database is not reachable.</p>
          <p className="mt-1 text-red-100/70">{dbError}</p>
          <p className="mt-2 text-xs text-red-100/60">
            Check <code className="rounded bg-black/30 px-1">TURSO_DATABASE_URL</code> and{" "}
            <code className="rounded bg-black/30 px-1">TURSO_AUTH_TOKEN</code> in
            Vercel → Settings → Environment Variables, then redeploy.
          </p>
        </div>
      )}

      <Link
        href="/admin/profile"
        className={`${CARD_CLASS} group mb-6 flex flex-col gap-4 border-gold/25 bg-gradient-to-r from-gold/[0.07] via-transparent to-accent/[0.06] p-5 transition hover:border-gold/40 sm:flex-row sm:items-center sm:justify-between sm:p-6`}
      >
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-xl">
            ✨
          </span>
          <div>
            <h2 className="font-display text-[1.15rem] font-semibold text-ink sm:text-[1.3rem]">
              Profile, hero &amp; contact
            </h2>
            <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-muted sm:text-sm">
              Your name, portrait, introduction, stats, CV link, contact
              details, social links and footer text.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["Hero", "Contact", "Footer"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-muted"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
        <span className="self-start rounded-md border border-gold/35 px-4 py-2 text-xs font-medium text-gold-soft transition group-hover:bg-gold/10 sm:self-center">
          Edit profile →
        </span>
      </Link>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {SECTION_DEFS.map((section) => {
          const accent = ACCENTS[section.accent];
          const count = counts[section.slug] ?? 0;
          return (
            <Link
              key={section.slug}
              href={`/admin/${section.slug}`}
              className={`${CARD_CLASS} group relative overflow-hidden p-5 transition hover:-translate-y-0.5 hover:border-line-strong`}
            >
              <div
                className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full ${accent.bg} blur-2xl transition group-hover:opacity-100`}
              />
              <div className="relative flex items-start justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white/[0.03] text-lg">
                  {SECTION_ICONS[section.slug]}
                </span>
                <span className={`font-display text-2xl font-semibold ${accent.text}`}>
                  {count}
                </span>
              </div>
              <h2 className="relative mt-4 text-sm font-medium text-ink sm:text-[0.95rem]">
                {section.label}
              </h2>
              <p className="relative mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">
                {section.description}
              </p>
              <span
                className={`relative mt-4 inline-flex items-center gap-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] ${accent.text}`}
              >
                Manage
                <span className="transition group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          );
        })}
      </div>

      <div className={`${CARD_CLASS} p-5`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-[1rem] font-semibold text-ink">
            System status
          </h2>
          <div className="flex flex-wrap gap-2">
            <StatusPill
              ok={dbReady}
              label={
                dbReady
                  ? usingTurso
                    ? "Database: Turso connected"
                    : "Database: local preview"
                  : "Database: offline"
              }
            />
            <StatusPill
              ok={adminPasswordConfigured()}
              label={
                adminPasswordConfigured()
                  ? "Admin password set"
                  : "Admin password missing"
              }
            />
            <StatusPill
              ok={Boolean(process.env.SESSION_SECRET)}
              label={
                process.env.SESSION_SECRET
                  ? "Session secret set"
                  : "Session secret missing"
              }
            />
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          Images are stored with your content in the database and served from{" "}
          <code className="rounded border border-line bg-black/30 px-1">/api/images</code>. If you
          change environment variables in Vercel, redeploy once for them to take
          effect.
        </p>
      </div>
    </div>
  );
}
