import { createClient, type Client } from "@libsql/client";
import { DEFAULT_SETTINGS, SEED_CONTENT } from "./defaults";
import { SECTION_DEFS } from "./sections";

let client: Client | null = null;
let initPromise: Promise<void> | null = null;

function databaseUrl(): string {
  const configured = process.env.TURSO_DATABASE_URL?.trim();
  if (configured) return configured;
  if (process.env.NODE_ENV !== "production") return "file:local.db";
  throw new Error(
    "TURSO_DATABASE_URL is not configured. Add it to the Vercel environment variables.",
  );
}

export function getDb(): Client {
  if (!client) {
    client = createClient({
      url: databaseUrl(),
      authToken: process.env.TURSO_AUTH_TOKEN?.trim() || undefined,
    });
  }
  return client;
}

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS content_items (
    id TEXT PRIMARY KEY,
    section TEXT NOT NULL,
    data TEXT NOT NULL,
    position INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS idx_content_items_section
    ON content_items (section, position)`,
  `CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS images (
    id TEXT PRIMARY KEY,
    mime TEXT NOT NULL,
    filename TEXT,
    size INTEGER NOT NULL,
    data BLOB NOT NULL,
    created_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS documents (
    id TEXT PRIMARY KEY,
    mime TEXT NOT NULL,
    filename TEXT,
    size INTEGER NOT NULL,
    data BLOB NOT NULL,
    created_at TEXT NOT NULL
  )`,
];

async function seed(db: Client): Promise<void> {
  const now = new Date().toISOString();
  const statements: Parameters<Client["batch"]>[0] = [];

  for (const section of SECTION_DEFS) {
    SEED_CONTENT[section.slug].forEach((item, index) => {
      statements.push({
        sql: `INSERT OR IGNORE INTO content_items
          (id, section, data, position, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?)`,
        args: [
          `seed-${section.slug}-${index + 1}`,
          section.slug,
          JSON.stringify(item),
          index,
          now,
          now,
        ],
      });
    });
  }

  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    statements.push({
      sql: `INSERT OR IGNORE INTO settings (key, value, updated_at)
        VALUES (?, ?, ?)`,
      args: [key, JSON.stringify(value), now],
    });
  }

  statements.push({
    sql: `INSERT OR IGNORE INTO settings (key, value, updated_at)
      VALUES ('seed_version', '1', ?)`,
    args: [now],
  });

  await db.batch(statements);
}

async function initialize(): Promise<void> {
  const db = getDb();
  await db.batch(SCHEMA);

  const seeded = await db.execute({
    sql: "SELECT value FROM settings WHERE key = 'seed_version'",
    args: [],
  });

  if (seeded.rows.length === 0) {
    await seed(db);
  }
}

export function ensureDb(): Promise<void> {
  if (!initPromise) {
    initPromise = initialize().catch((error) => {
      initPromise = null;
      throw error;
    });
  }
  return initPromise;
}
