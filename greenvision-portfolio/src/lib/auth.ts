import { createHash, timingSafeEqual } from "node:crypto";
import { getIronSession, type IronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export interface AdminSessionData {
  isAdmin?: boolean;
  loggedInAt?: number;
}

const isProduction = process.env.NODE_ENV === "production";
// The __Host- prefix pins the cookie to this exact origin; it requires Secure,
// which only holds over https, so development keeps the plain name.
const COOKIE_NAME = isProduction ? "__Host-sadidan_admin" : "sadidan_admin";
const SESSION_TTL_SECONDS = 60 * 60 * 48;

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
      secure: isProduction,
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

if (isProduction) {
  const configured = process.env.ADMIN_PASSWORD?.trim() ?? "";
  if (configured && configured.length < 12) {
    console.warn(
      "[auth] ADMIN_PASSWORD is shorter than 12 characters. Use a longer passphrase.",
    );
  }
}

/**
 * Resolve the caller identity used for throttling. Hosting platforms set
 * x-real-ip; x-forwarded-for is only trusted as a fallback and its last hop is
 * used because leading entries can be supplied by the client.
 */
export function clientKey(headers: Headers): string {
  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) return realIp.slice(0, 64);

  const forwarded = headers
    .get("x-forwarded-for")
    ?.split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  const last = forwarded?.[forwarded.length - 1];
  return (last || "local").slice(0, 64);
}

type AttemptWindow = { count: number; resetAt: number };

const clientAttempts = new Map<string, AttemptWindow>();
const MAX_ATTEMPTS = 8;
const MAX_TRACKED_CLIENTS = 2000;
const WINDOW_MS = 10 * 60 * 1000;

// A shared ceiling so rotating IPs cannot buy unlimited guesses.
let globalCount = 0;
let globalResetAt = 0;
const MAX_GLOBAL_ATTEMPTS = 40;

function globalBlocked(): boolean {
  return Date.now() <= globalResetAt && globalCount >= MAX_GLOBAL_ATTEMPTS;
}

function recordGlobalAttempt(): void {
  if (Date.now() > globalResetAt) {
    globalCount = 0;
    globalResetAt = Date.now() + WINDOW_MS;
  }
  globalCount += 1;
}

function pruneClients(): void {
  if (clientAttempts.size < MAX_TRACKED_CLIENTS) return;
  const now = Date.now();
  for (const [key, value] of clientAttempts) {
    if (now > value.resetAt) clientAttempts.delete(key);
  }
}

export function isRateLimited(key: string): boolean {
  if (globalBlocked()) return true;

  const entry = clientAttempts.get(key);
  if (!entry) return false;
  if (Date.now() > entry.resetAt) {
    clientAttempts.delete(key);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

export function recordFailedAttempt(key: string): void {
  pruneClients();
  recordGlobalAttempt();

  const now = Date.now();
  const entry = clientAttempts.get(key);
  if (!entry || now > entry.resetAt) {
    clientAttempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }
  entry.count += 1;
}

export function clearAttempts(key: string): void {
  clientAttempts.delete(key);
}
