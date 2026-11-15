import { NextResponse } from "next/server";
import { getSettings, saveSettings } from "@/lib/content";
import { jsonError, requireAdmin } from "@/lib/route-auth";
import {
  getSettingsGroup,
  isSettingsKey,
  normalizeSettings,
} from "@/lib/sections";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await getSettings(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Failed to load settings", error);
    return jsonError("Settings could not be loaded.", 500);
  }
}

export async function PUT(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid request body.");
  }

  const payload = body as { group?: unknown; values?: unknown };
  const group = typeof payload.group === "string" ? payload.group : "";

  if (!isSettingsKey(group) || !getSettingsGroup(group)) {
    return jsonError("Unknown settings group.", 404);
  }

  if (
    !payload.values ||
    typeof payload.values !== "object" ||
    Array.isArray(payload.values)
  ) {
    return jsonError("Invalid settings payload.");
  }

  try {
    const existing = await getSettings();
    const merged = {
      ...(existing[group] as unknown as Record<string, unknown>),
      ...(payload.values as Record<string, unknown>),
    };
    const normalized = normalizeSettings(group, merged);
    if (!normalized.ok) return jsonError(normalized.error);

    await saveSettings(group, normalized.value);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(`Failed to save ${group} settings`, error);
    return jsonError("The settings could not be saved.", 500);
  }
}
