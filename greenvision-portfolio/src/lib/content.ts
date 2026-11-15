import { ensureDb, getDb } from "./db";
import { DEFAULT_SETTINGS, SEED_CONTENT } from "./defaults";
import { SECTION_DEFS, type SectionSlug, type SettingsKey } from "./sections";
import type {
  ContentSections,
  HeroSettings,
  SiteContent,
  SiteSettings,
} from "./types";

type StoredItem = Record<string, unknown> & { id: string };

function parseJson<T>(raw: unknown, fallback: T): T {
  try {
    return JSON.parse(String(raw)) as T;
  } catch {
    return fallback;
  }
}

function toStoredItem(row: Record<string, unknown>): StoredItem {
  const data = parseJson<Record<string, unknown>>(row.data, {});
  return { ...data, id: String(row.id) };
}

export async function listSection(slug: SectionSlug): Promise<StoredItem[]> {
  await ensureDb();
  const result = await getDb().execute({
    sql: `SELECT id, data FROM content_items
      WHERE section = ?
      ORDER BY position ASC, created_at ASC`,
    args: [slug],
  });
  return result.rows.map((row) => toStoredItem(row as Record<string, unknown>));
}

function fallbackItems(slug: SectionSlug): StoredItem[] {
  return SEED_CONTENT[slug].map((item, index) => ({
    ...item,
    id: `default-${slug}-${index + 1}`,
  }));
}

async function safeListSection(slug: SectionSlug): Promise<StoredItem[]> {
  try {
    const items = await listSection(slug);
    return items.length > 0 ? items : fallbackItems(slug);
  } catch (error) {
    console.error(`Failed to load "${slug}" content, using defaults.`, error);
    return fallbackItems(slug);
  }
}

export async function getAllSections(): Promise<ContentSections> {
  const [timeline, language, publications, awards, projects, gallery] =
    await Promise.all([
      safeListSection("timeline"),
      safeListSection("language"),
      safeListSection("publications"),
      safeListSection("awards"),
      safeListSection("projects"),
      safeListSection("gallery"),
    ]);

  return {
    timeline,
    language,
    publications,
    awards,
    projects,
    gallery,
  } as unknown as ContentSections;
}

export async function getSettings(): Promise<SiteSettings> {
  const stored: Partial<Record<SettingsKey, Record<string, unknown>>> = {};

  try {
    await ensureDb();
    const result = await getDb().execute({
      sql: "SELECT key, value FROM settings WHERE key IN ('hero', 'contact', 'footer')",
      args: [],
    });
    for (const row of result.rows) {
      const key = String(row.key) as SettingsKey;
      stored[key] = parseJson<Record<string, unknown>>(row.value, {});
    }
  } catch (error) {
    console.error("Failed to load settings, using defaults.", error);
  }

  return {
    hero: { ...DEFAULT_SETTINGS.hero, ...stored.hero } as unknown as HeroSettings,
    contact: {
      ...DEFAULT_SETTINGS.contact,
      ...stored.contact,
    } as unknown as SiteSettings["contact"],
    footer: {
      ...DEFAULT_SETTINGS.footer,
      ...stored.footer,
    } as unknown as SiteSettings["footer"],
  };
}

export async function getAllContent(): Promise<SiteContent> {
  const [settings, sections] = await Promise.all([
    getSettings(),
    getAllSections(),
  ]);
  return { settings, sections };
}

export async function createItem(
  slug: SectionSlug,
  values: Record<string, unknown>,
): Promise<StoredItem> {
  await ensureDb();
  const db = getDb();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  const max = await db.execute({
    sql: `SELECT COALESCE(MAX(position), -1) + 1 AS next_position
      FROM content_items WHERE section = ?`,
    args: [slug],
  });
  const position = Number(max.rows[0]?.next_position ?? 0);

  await db.execute({
    sql: `INSERT INTO content_items
      (id, section, data, position, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)`,
    args: [id, slug, JSON.stringify(values), position, now, now],
  });

  return { ...values, id };
}

export async function updateItem(
  slug: SectionSlug,
  id: string,
  values: Record<string, unknown>,
): Promise<StoredItem> {
  await ensureDb();
  const now = new Date().toISOString();
  const result = await getDb().execute({
    sql: `UPDATE content_items
      SET data = ?, updated_at = ?
      WHERE id = ? AND section = ?`,
    args: [JSON.stringify(values), now, id, slug],
  });

  if (result.rowsAffected === 0) {
    throw new Error("Item not found.");
  }

  return { ...values, id };
}

export async function deleteItem(
  slug: SectionSlug,
  id: string,
): Promise<void> {
  await ensureDb();
  const result = await getDb().execute({
    sql: "DELETE FROM content_items WHERE id = ? AND section = ?",
    args: [id, slug],
  });

  if (result.rowsAffected === 0) {
    throw new Error("Item not found.");
  }
}

export async function reorderItems(
  slug: SectionSlug,
  orderedIds: string[],
): Promise<void> {
  await ensureDb();
  const db = getDb();
  const existing = await db.execute({
    sql: "SELECT id FROM content_items WHERE section = ?",
    args: [slug],
  });

  const existingIds = new Set(existing.rows.map((row) => String(row.id)));
  if (
    orderedIds.length !== existingIds.size ||
    orderedIds.some((id) => !existingIds.has(id))
  ) {
    throw new Error("The new order does not match the current items.");
  }

  const now = new Date().toISOString();
  await db.batch(
    orderedIds.map((id, index) => ({
      sql: `UPDATE content_items SET position = ?, updated_at = ?
        WHERE id = ? AND section = ?`,
      args: [index, now, id, slug],
    })),
  );
}

export async function saveSettings(
  key: SettingsKey,
  values: Record<string, unknown>,
): Promise<void> {
  await ensureDb();
  const current = await getDb().execute({
    sql: "SELECT value FROM settings WHERE key = ?",
    args: [key],
  });
  const existing = parseJson<Record<string, unknown>>(
    current.rows[0]?.value,
    {},
  );
  const merged = { ...DEFAULT_SETTINGS[key], ...existing, ...values };

  await getDb().execute({
    sql: `INSERT INTO settings (key, value, updated_at)
      VALUES (?, ?, ?)
      ON CONFLICT(key) DO UPDATE SET
        value = excluded.value,
        updated_at = excluded.updated_at`,
    args: [key, JSON.stringify(merged), new Date().toISOString()],
  });
}

function toBytes(value: unknown): Uint8Array {
  if (value instanceof ArrayBuffer) return new Uint8Array(value);
  if (ArrayBuffer.isView(value)) {
    return new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
  }
  return new Uint8Array(0);
}

export interface StoredImage {
  mime: string;
  data: Uint8Array;
}

export async function saveImage(input: {
  mime: string;
  filename: string;
  data: Uint8Array;
}): Promise<{ id: string; url: string }> {
  await ensureDb();
  const id = crypto.randomUUID();
  await getDb().execute({
    sql: `INSERT INTO images (id, mime, filename, size, data, created_at)
      VALUES (?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      input.mime,
      input.filename.slice(0, 200),
      input.data.byteLength,
      input.data,
      new Date().toISOString(),
    ],
  });

  return { id, url: `/api/images/${id}` };
}

export async function getImage(id: string): Promise<StoredImage | null> {
  await ensureDb();
  const result = await getDb().execute({
    sql: "SELECT mime, data FROM images WHERE id = ?",
    args: [id],
  });
  const row = result.rows[0];
  if (!row) return null;

  return { mime: String(row.mime), data: toBytes(row.data) };
}

export async function deleteImage(id: string): Promise<void> {
  await ensureDb();
  await getDb().execute({
    sql: "DELETE FROM images WHERE id = ?",
    args: [id],
  });
}

export interface StoredDocument {
  mime: string;
  filename: string;
  data: Uint8Array;
}

export async function saveDocument(input: {
  mime: string;
  filename: string;
  data: Uint8Array;
}): Promise<{ id: string; url: string }> {
  await ensureDb();
  const id = crypto.randomUUID();
  await getDb().execute({
    sql: `INSERT INTO documents (id, mime, filename, size, data, created_at)
      VALUES (?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      input.mime,
      input.filename.slice(0, 200),
      input.data.byteLength,
      input.data,
      new Date().toISOString(),
    ],
  });

  return { id, url: `/api/documents/${id}` };
}

export async function getDocument(id: string): Promise<StoredDocument | null> {
  await ensureDb();
  const result = await getDb().execute({
    sql: "SELECT mime, filename, data FROM documents WHERE id = ?",
    args: [id],
  });
  const row = result.rows[0];
  if (!row) return null;

  return {
    mime: String(row.mime),
    filename: String(row.filename ?? "document.pdf"),
    data: toBytes(row.data),
  };
}

export async function deleteDocument(id: string): Promise<void> {
  await ensureDb();
  await getDb().execute({
    sql: "DELETE FROM documents WHERE id = ?",
    args: [id],
  });
}

export async function countBySection(): Promise<Record<string, number>> {
  const entries = await Promise.all(
    SECTION_DEFS.map(async (section) => {
      try {
        const items = await listSection(section.slug);
        return [section.slug, items.length] as const;
      } catch {
        return [section.slug, 0] as const;
      }
    }),
  );
  return Object.fromEntries(entries);
}
