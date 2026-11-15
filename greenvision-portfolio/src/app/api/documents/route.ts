import { NextResponse } from "next/server";
import { saveDocument } from "@/lib/content";
import { jsonError, requireAdmin } from "@/lib/route-auth";

export const runtime = "nodejs";

const MAX_BYTES = 4 * 1024 * 1024;

function isPdf(bytes: Uint8Array): boolean {
  if (bytes.length < 5) return false;
  return (
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46 &&
    bytes[4] === 0x2d
  );
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BYTES + 1024) {
    return jsonError("Files must be smaller than 4 MB.", 413);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return jsonError("The upload could not be read.");
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return jsonError("Please choose a PDF file.");
  }
  if (file.size === 0) {
    return jsonError("The selected file is empty.");
  }
  if (file.size > MAX_BYTES) {
    return jsonError("Files must be smaller than 4 MB.");
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!isPdf(bytes)) {
    return jsonError("Please upload a PDF file.");
  }

  try {
    const stored = await saveDocument({
      mime: "application/pdf",
      filename: file.name || "document.pdf",
      data: bytes,
    });
    return NextResponse.json(stored, { status: 201 });
  } catch (error) {
    console.error("Failed to store document", error);
    return jsonError("The file could not be saved.", 500);
  }
}
