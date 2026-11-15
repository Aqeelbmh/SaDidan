import { NextResponse } from "next/server";
import { createItem, listSection } from "@/lib/content";
import { jsonError, requireAdmin } from "@/lib/route-auth";
import {
  getSectionDef,
  isSectionSlug,
  normalizeItem,
} from "@/lib/sections";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = { params: Promise<{ section: string }> };

export async function GET(_request: Request, context: Context) {
  const { section } = await context.params;
  if (!isSectionSlug(section)) return jsonError("Unknown section.", 404);

  try {
    const items = await listSection(section);
    return NextResponse.json(items, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(`Failed to load ${section}`, error);
    return jsonError("Content could not be loaded.", 500);
  }
}

export async function POST(request: Request, context: Context) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { section } = await context.params;
  if (!isSectionSlug(section)) return jsonError("Unknown section.", 404);
  if (!getSectionDef(section)) return jsonError("Unknown section.", 404);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid request body.");
  }

  const normalized = normalizeItem(section, body);
  if (!normalized.ok) return jsonError(normalized.error);

  try {
    const item = await createItem(section, normalized.value);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error(`Failed to create ${section} item`, error);
    return jsonError("The item could not be saved.", 500);
  }
}
