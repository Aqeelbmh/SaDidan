import { NextRequest, NextResponse } from "next/server";
import {
  adminPasswordConfigured,
  clearAttempts,
  clientKey,
  getSession,
  isRateLimited,
  recordFailedAttempt,
  verifyAdminPassword,
} from "@/lib/auth";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 4096;

export async function POST(request: NextRequest) {
  if (!adminPasswordConfigured()) {
    return NextResponse.json(
      {
        error:
          "No admin password is configured. Set ADMIN_PASSWORD in your environment variables.",
      },
      { status: 500 },
    );
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Invalid request." }, { status: 413 });
  }

  const key = clientKey(request.headers);

  if (isRateLimited(key)) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!verifyAdminPassword(password)) {
    recordFailedAttempt(key);
    return NextResponse.json(
      { error: "That password is not correct." },
      { status: 401 },
    );
  }

  clearAttempts(key);
  const session = await getSession();
  session.isAdmin = true;
  session.loggedInAt = Date.now();
  await session.save();

  return NextResponse.json({ ok: true });
}
