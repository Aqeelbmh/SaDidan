import type { Metadata } from "next";
import SettingsManager from "@/components/Admin/SettingsManager";
import { getSettings } from "@/lib/content";
import { ensureDb } from "@/lib/db";
import { SETTINGS_GROUPS } from "@/lib/sections";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Profile & hero — Content Studio",
  robots: { index: false, follow: false },
};

export default async function ProfileSettingsPage() {
  const settings = await getSettings();

  let loadError = "";
  try {
    await ensureDb();
  } catch (error) {
    console.error("Admin: settings database unavailable", error);
    loadError =
      "The database is not reachable right now, so saving may fail. Check TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in Vercel.";
  }

  return (
    <SettingsManager
      groups={SETTINGS_GROUPS}
      initial={settings}
      loadError={loadError}
    />
  );
}
