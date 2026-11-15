import { NextResponse } from "next/server";
import { deleteDocument, getDocument } from "@/lib/content";
import { jsonError, requireAdmin } from "@/lib/route-auth";

export const runtime = "nodejs";

type Context = { params: Promise<{ id: string }> };

function attachmentHeader(filename: string): string {
  const ascii =
    filename
      .replace(/[^\x20-\x7e]/g, "_")
      .replace(/["\\]/g, "_")
      .slice(0, 120) || "document.pdf";
  return `attachment; filename="${ascii}"`;
}

export async function GET(_request: Request, context: Context) {
  const { id } = await context.params;

  try {
    const document = await getDocument(id);
    if (!document) return jsonError("File not found.", 404);

    const body = new Uint8Array(document.data);

    return new NextResponse(body, {
      headers: {
        "Content-Type": document.mime,
        "Content-Length": String(body.byteLength),
        "Content-Disposition": attachmentHeader(document.filename),
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Failed to load document", error);
    return jsonError("The file could not be loaded.", 500);
  }
}

export async function DELETE(_request: Request, context: Context) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await context.params;

  try {
    await deleteDocument(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete document", error);
    return jsonError("The file could not be deleted.", 500);
  }
}
