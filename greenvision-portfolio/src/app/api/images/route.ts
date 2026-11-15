import { NextResponse } from "next/server";
import { saveImage } from "@/lib/content";
import { jsonError, requireAdmin } from "@/lib/route-auth";

export const runtime = "nodejs";

const MAX_BYTES = 6 * 1024 * 1024;

function detectImageMime(bytes: Uint8Array): string | null {
  if (bytes.length < 12) return null;
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "image/png";
  }
  if (
    bytes[0] === 0x47 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x38
  ) {
    return "image/gif";
  }
  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "image/webp";
  }
  const brand = String.fromCharCode(...bytes.slice(4, 12));
  if (brand.startsWith("ftypavif") || brand.startsWith("ftypavis")) {
    return "image/avif";
  }
  return null;
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BYTES + 1024) {
    return jsonError("Images must be smaller than 6 MB.", 413);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return jsonError("The upload could not be read.");
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return jsonError("Please choose an image file.");
  }
  if (file.size === 0) {
    return jsonError("The selected file is empty.");
  }
  if (file.size > MAX_BYTES) {
    return jsonError("Images must be smaller than 6 MB.");
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const mime = detectImageMime(bytes);
  if (!mime) {
    return jsonError("Please upload a JPG, PNG, WebP, GIF or AVIF image.");
  }

  try {
    const stored = await saveImage({
      mime,
      filename: file.name || "upload",
      data: bytes,
    });
    return NextResponse.json(stored, { status: 201 });
  } catch (error) {
    console.error("Failed to store image", error);
    return jsonError("The image could not be saved.", 500);
  }
}
