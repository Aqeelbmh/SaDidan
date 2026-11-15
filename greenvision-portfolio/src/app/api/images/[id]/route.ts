import { NextResponse } from "next/server";
import { deleteImage, getImage } from "@/lib/content";
import { jsonError, requireAdmin } from "@/lib/route-auth";

export const runtime = "nodejs";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Context) {
  const { id } = await context.params;

  try {
    const image = await getImage(id);
    if (!image) return jsonError("Image not found.", 404);

    return new NextResponse(image.data, {
      headers: {
        "Content-Type": image.mime,
        "Content-Length": String(image.data.byteLength),
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Failed to load image", error);
    return jsonError("The image could not be loaded.", 500);
  }
}

export async function DELETE(_request: Request, context: Context) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await context.params;

  try {
    await deleteImage(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete image", error);
    return jsonError("The image could not be deleted.", 500);
  }
}
