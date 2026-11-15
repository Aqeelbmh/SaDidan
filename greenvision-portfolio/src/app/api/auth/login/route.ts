import { NextRequest, NextResponse } from "next/server";
import {
  adminPasswordConfigured,
  clearAttempts,
  getSession,
  isRateLimited,
  recordFailedAttempt,
  verifyAdminPassword,
} from "@/lib/auth";

export const runtime = "nodejs";

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

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a few minutes and try again." },
      { status: 429 },
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
    recordFailedAttempt(ip);
    return NextResponse.json(
      { error: "That password is not correct." },
      { status: 401 },
    );
  }

  clearAttempts(ip);
  const session = await getSession();
  session.isAdmin = true;
  session.loggedInAt = Date.now();
  await session.save();

  return NextResponse.json({ ok: true });
}
