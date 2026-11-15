import { createHash, timingSafeEqual } from "node:crypto";
import { getIronSession, type IronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export interface AdminSessionData {
  isAdmin?: boolean;
  loggedInAt?: number;
}

const COOKIE_NAME = "sadidan_admin";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

function sessionSecret(): string {
  const secret = process.env.SESSION_SECRET?.trim();
  if (secret && secret.length >= 32) return secret;
  if (process.env.NODE_ENV !== "production") {
    return "sadidan-local-development-session-secret-change-me";
  }
  throw new Error(
    "SESSION_SECRET must be set to a random string of at least 32 characters.",
  );
}

function sessionOptions(): SessionOptions {
  return {
    password: sessionSecret(),
    cookieName: COOKIE_NAME,
    ttl: SESSION_TTL_SECONDS,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_TTL_SECONDS,
    },
  };
}

export async function getSession(): Promise<IronSession<AdminSessionData>> {
  const cookieStore = await cookies();
  return getIronSession<AdminSessionData>(cookieStore, sessionOptions());
}

export async function isAdmin(): Promise<boolean> {
  try {
    const session = await getSession();
    return Boolean(session.isAdmin);
  } catch {
    return false;
  }
}

export function adminPasswordConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD?.trim());
}

export function verifyAdminPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD?.trim();
  if (!expected) return false;
  const provided = createHash("sha256").update(input).digest();
  const reference = createHash("sha256").update(expected).digest();
  return timingSafeEqual(provided, reference);
}

const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 10 * 60 * 1000;

export function isRateLimited(key: string): boolean {
  const entry = attempts.get(key);
  if (!entry) return false;
  if (Date.now() > entry.resetAt) {
    attempts.delete(key);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

export function recordFailedAttempt(key: string): void {
  const entry = attempts.get(key);
  if (!entry || Date.now() > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: Date.now() + WINDOW_MS });
    return;
  }
  entry.count += 1;
}

export function clearAttempts(key: string): void {
  attempts.delete(key);
}
