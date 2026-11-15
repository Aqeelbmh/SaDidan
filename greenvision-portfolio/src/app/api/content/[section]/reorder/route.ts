import { NextResponse } from "next/server";
import { reorderItems } from "@/lib/content";
import { jsonError, requireAdmin } from "@/lib/route-auth";
import { isSectionSlug } from "@/lib/sections";

export const runtime = "nodejs";

type Context = { params: Promise<{ section: string }> };

export async function POST(request: Request, context: Context) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { section } = await context.params;
  if (!isSectionSlug(section)) return jsonError("Unknown section.", 404);

  let ids: unknown;
  try {
    const body = (await request.json()) as { ids?: unknown };
    ids = body.ids;
  } catch {
    return jsonError("Invalid request body.");
  }

  if (
    !Array.isArray(ids) ||
    ids.length === 0 ||
    ids.some((id) => typeof id !== "string")
  ) {
    return jsonError("An ordered list of item ids is required.");
  }

  try {
    await reorderItems(section, ids as string[]);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "The order could not be saved.";
    return jsonError(message, 400);
  }
}
