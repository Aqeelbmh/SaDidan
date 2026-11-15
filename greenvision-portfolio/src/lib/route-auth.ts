import { NextResponse } from "next/server";
import { isAdmin } from "./auth";

export async function requireAdmin(): Promise<NextResponse | null> {
  if (await isAdmin()) return null;
  return NextResponse.json(
    { error: "Your session has expired. Please sign in again." },
    { status: 401 },
  );
}

export function jsonError(message: string, status = 400): NextResponse {
  return NextResponse.json({ error: message }, { status });
}
