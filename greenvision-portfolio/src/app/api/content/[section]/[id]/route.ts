import { NextResponse } from "next/server";
import { deleteItem, updateItem } from "@/lib/content";
import { jsonError, requireAdmin } from "@/lib/route-auth";
import { isSectionSlug, normalizeItem } from "@/lib/sections";

export const runtime = "nodejs";

type Context = { params: Promise<{ section: string; id: string }> };

export async function PATCH(request: Request, context: Context) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { section, id } = await context.params;
  if (!isSectionSlug(section)) return jsonError("Unknown section.", 404);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid request body.");
  }

  const normalized = normalizeItem(section, body);
  if (!normalized.ok) return jsonError(normalized.error);

  try {
    const item = await updateItem(section, id, normalized.value);
    return NextResponse.json(item);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "The item could not be updated.";
    return jsonError(message, message === "Item not found." ? 404 : 500);
  }
}

export async function DELETE(_request: Request, context: Context) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { section, id } = await context.params;
  if (!isSectionSlug(section)) return jsonError("Unknown section.", 404);

  try {
    await deleteItem(section, id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "The item could not be deleted.";
    return jsonError(message, message === "Item not found." ? 404 : 500);
  }
}
