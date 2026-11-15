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
    if (error instanceof Error && error.message === "Item not found.") {
      return jsonError("Item not found.", 404);
    }
    console.error(`Failed to update ${section} item`, error);
    return jsonError("The item could not be updated.", 500);
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
    if (error instanceof Error && error.message === "Item not found.") {
      return jsonError("Item not found.", 404);
    }
    console.error(`Failed to delete ${section} item`, error);
    return jsonError("The item could not be deleted.", 500);
  }
}
