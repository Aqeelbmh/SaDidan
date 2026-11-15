export type SectionSlug =
  | "timeline"
  | "language"
  | "publications"
  | "awards"
  | "projects"
  | "gallery";

export type SettingsKey = "hero" | "contact" | "footer";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "select"
  | "tags"
  | "image"
  | "file";

export type Accent = "yellow" | "cyan" | "green" | "purple" | "pink";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  help?: string;
  rows?: number;
  min?: number;
  max?: number;
  options?: { value: string; label: string }[];
}

export interface SectionDef {
  slug: SectionSlug;
  label: string;
  singular: string;
  description: string;
  accent: Accent;
  titleKey: string;
  subtitleKey: string;
  fields: FieldDef[];
}

export interface SettingsGroupDef {
  key: SettingsKey;
  label: string;
  description: string;
  accent: Accent;
  fields: FieldDef[];
}

export const SECTION_DEFS: SectionDef[] = [
  {
    slug: "timeline",
    label: "Journey",
    singular: "timeline entry",
    description: "Education and experience entries shown in the My Journey section.",
    accent: "yellow",
    titleKey: "title",
    subtitleKey: "company",
    fields: [
      {
        key: "track",
        label: "Track",
        type: "select",
        required: true,
        options: [
          { value: "education", label: "Education" },
          { value: "experience", label: "Experience" },
        ],
      },
      { key: "year", label: "Year", type: "text", required: true, placeholder: "2022–Present" },
      { key: "title", label: "Title", type: "text", required: true, placeholder: "Lecturer, Environmental Engineering" },
      { key: "company", label: "Institution / Company", type: "text", required: true, placeholder: "UNSIKA" },
      { key: "description", label: "Details", type: "textarea", rows: 3, placeholder: "Courses taught, responsibilities, achievements…" },
      { key: "icon", label: "Emoji icon", type: "text", placeholder: "💼", help: "Optional. A single emoji shown on the card." },
    ],
  },
  {
    slug: "language",
    label: "Languages",
    singular: "language",
    description: "Language skills and the proficiency bars shown on the page.",
    accent: "cyan",
    titleKey: "name",
    subtitleKey: "category",
    fields: [
      { key: "name", label: "Language", type: "text", required: true, placeholder: "English" },
      { key: "category", label: "Level label", type: "text", required: true, placeholder: "Advanced" },
      {
        key: "proficiency",
        label: "Proficiency (0–100)",
        type: "number",
        required: true,
        min: 0,
        max: 100,
        help: "Controls the length of the progress bar.",
      },
    ],
  },
  {
    slug: "publications",
    label: "Publications",
    singular: "publication",
    description: "Research papers and articles. DOIs become clickable links on the site.",
    accent: "green",
    titleKey: "title",
    subtitleKey: "journal",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "authors", label: "Authors", type: "text", placeholder: "Sadidan, I., et al." },
      { key: "journal", label: "Journal / Conference", type: "text", required: true },
      { key: "year", label: "Year", type: "text", required: true, placeholder: "2025" },
      {
        key: "doi",
        label: "DOI or link",
        type: "text",
        placeholder: "https://doi.org/10.31603/biseeng.348",
        help: 'Use a full DOI link or a DOI code. Write "N/A" when no link exists.',
      },
      { key: "abstract", label: "Abstract", type: "textarea", rows: 4 },
    ],
  },
  {
    slug: "awards",
    label: "Awards",
    singular: "award",
    description: "Awards, grants, scholarships and recognitions.",
    accent: "purple",
    titleKey: "title",
    subtitleKey: "organization",
    fields: [
      { key: "title", label: "Award title", type: "text", required: true },
      { key: "organization", label: "Awarded by", type: "text", required: true },
      { key: "year", label: "Year", type: "text", required: true, placeholder: "2025" },
      {
        key: "category",
        label: "Category",
        type: "select",
        required: true,
        options: [
          { value: "Presentation", label: "Presentation" },
          { value: "Research", label: "Research" },
          { value: "Scholarship", label: "Scholarship" },
          { value: "Grant", label: "Grant" },
          { value: "Supervision", label: "Supervision" },
          { value: "Other", label: "Other" },
        ],
      },
      { key: "description", label: "Description", type: "textarea", rows: 3 },
    ],
  },
  {
    slug: "projects",
    label: "Projects",
    singular: "project",
    description: "Featured projects, with optional cover image and links.",
    accent: "yellow",
    titleKey: "title",
    subtitleKey: "category",
    fields: [
      { key: "title", label: "Project title", type: "text", required: true },
      { key: "category", label: "Category", type: "text", placeholder: "Consulting" },
      { key: "description", label: "Description", type: "textarea", required: true, rows: 4 },
      {
        key: "technologies",
        label: "Technologies / methods",
        type: "tags",
        help: "Separate with commas, e.g. GIS, Modeling, Field survey.",
      },
      { key: "emoji", label: "Emoji icon", type: "text", placeholder: "🌱", help: "Shown when no cover image is set." },
      { key: "imageUrl", label: "Cover image", type: "image" },
      { key: "githubUrl", label: "GitHub link", type: "text", placeholder: "https://github.com/…" },
      { key: "liveUrl", label: "Live / case study link", type: "text", placeholder: "https://…" },
    ],
  },
  {
    slug: "gallery",
    label: "Gallery",
    singular: "gallery item",
    description: "Moments from research, teaching and fieldwork. Upload a photo or keep an emoji.",
    accent: "pink",
    titleKey: "title",
    subtitleKey: "category",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "category", label: "Category", type: "text", required: true, placeholder: "Research" },
      { key: "description", label: "Description", type: "textarea", rows: 3 },
      { key: "emoji", label: "Emoji icon", type: "text", placeholder: "🌊", help: "Shown when no photo is uploaded." },
      { key: "imageUrl", label: "Photo", type: "image" },
    ],
  },
];

export const SETTINGS_GROUPS: SettingsGroupDef[] = [
  {
    key: "hero",
    label: "Hero",
    description: "The first screen visitors see: name, introduction, portrait, stats and CV.",
    accent: "yellow",
    fields: [
      { key: "name", label: "Full name", type: "text", required: true },
      { key: "credential", label: "Credential shown after name", type: "text", placeholder: ", M.Sc." },
      { key: "headline", label: "Headline", type: "text", required: true, placeholder: "Ecology & Environmental Management" },
      { key: "bio1", label: "Introduction — paragraph 1", type: "textarea", required: true, rows: 4 },
      { key: "bio2", label: "Introduction — paragraph 2", type: "textarea", rows: 4 },
      { key: "closing", label: "Closing line", type: "text" },
      { key: "profileImage", label: "Portrait", type: "image" },
      { key: "cvUrl", label: "CV file", type: "file", help: "Upload a PDF, or paste an external link. Used by every Download CV button." },
      { key: "roleTitle", label: "Profile card — role", type: "text" },
      { key: "roleOrg", label: "Profile card — institution", type: "text" },
      { key: "tags", label: "Profile card — tags", type: "tags", help: "Separate with commas." },
      { key: "stat1Value", label: "Stat 1 — value", type: "text", placeholder: "5+" },
      { key: "stat1Label", label: "Stat 1 — label", type: "text", placeholder: "Years Experience" },
      { key: "stat2Value", label: "Stat 2 — value", type: "text" },
      { key: "stat2Label", label: "Stat 2 — label", type: "text" },
      { key: "stat3Value", label: "Stat 3 — value", type: "text" },
      { key: "stat3Label", label: "Stat 3 — label", type: "text" },
    ],
  },
  {
    key: "contact",
    label: "Contact",
    description: "Contact details, social links and the message form endpoint.",
    accent: "cyan",
    fields: [
      { key: "intro", label: "Introduction", type: "textarea", rows: 3 },
      { key: "email", label: "Email", type: "text", required: true, placeholder: "name@university.ac.id" },
      { key: "location", label: "Location", type: "text", placeholder: "Karawang, West Java, Indonesia" },
      { key: "institution", label: "Institution", type: "text" },
      {
        key: "formEndpoint",
        label: "Contact form endpoint",
        type: "text",
        help: "Formspree URL that receives messages. Leave empty to disable sending.",
      },
      { key: "facebook", label: "Facebook URL", type: "text" },
      { key: "instagram", label: "Instagram URL", type: "text" },
      { key: "linkedin", label: "LinkedIn URL", type: "text" },
      { key: "youtube", label: "YouTube URL", type: "text" },
    ],
  },
  {
    key: "footer",
    label: "Footer",
    description: "Footer about text, services, copyright and legal links.",
    accent: "green",
    fields: [
      { key: "aboutTitle", label: "About title", type: "text" },
      { key: "aboutText", label: "About text", type: "textarea", rows: 4 },
      { key: "copyright", label: "Copyright holder", type: "text", help: "The current year is added automatically." },
      { key: "services", label: "Services", type: "tags", help: "Separate with commas." },
      { key: "privacyUrl", label: "Privacy policy link", type: "text" },
      { key: "termsUrl", label: "Terms of service link", type: "text" },
    ],
  },
];

export const SECTION_SLUGS = SECTION_DEFS.map((section) => section.slug);

export function getSectionDef(slug: string): SectionDef | undefined {
  return SECTION_DEFS.find((section) => section.slug === slug);
}

export function isSectionSlug(value: string): value is SectionSlug {
  return SECTION_SLUGS.includes(value as SectionSlug);
}

export function getSettingsGroup(key: string): SettingsGroupDef | undefined {
  return SETTINGS_GROUPS.find((group) => group.key === key);
}

export function isSettingsKey(value: string): value is SettingsKey {
  return SETTINGS_GROUPS.some((group) => group.key === value);
}

const MAX_TEXT = 400;
const MAX_LONG_TEXT = 8000;

function isSafeLink(value: string): boolean {
  if (!value) return true;
  if (value.startsWith("//")) return false;
  if (value.startsWith("/")) return true;
  return /^(https?:\/\/|mailto:)/i.test(value);
}

function normalizeTags(raw: unknown): string[] {
  const parts = Array.isArray(raw)
    ? raw
    : typeof raw === "string"
      ? raw.split(",")
      : [];
  return parts
    .map((part) => String(part).trim())
    .filter(Boolean)
    .slice(0, 24)
    .map((part) => part.slice(0, 80));
}

export type NormalizeResult =
  | { ok: true; value: Record<string, unknown> }
  | { ok: false; error: string };

export function normalizeFields(
  fields: FieldDef[],
  input: Record<string, unknown>,
): NormalizeResult {
  const value: Record<string, unknown> = {};

  for (const field of fields) {
    const raw = input[field.key];

    if (field.type === "tags") {
      const tags = normalizeTags(raw);
      if (field.required && tags.length === 0) {
        return { ok: false, error: `${field.label} is required.` };
      }
      value[field.key] = tags;
      continue;
    }

    if (field.type === "number") {
      const text = raw === null || raw === undefined ? "" : String(raw).trim();
      if (!text) {
        if (field.required) return { ok: false, error: `${field.label} is required.` };
        value[field.key] = field.min ?? 0;
        continue;
      }
      const number = Number(text);
      if (!Number.isFinite(number)) {
        return { ok: false, error: `${field.label} must be a number.` };
      }
      const min = field.min ?? Number.NEGATIVE_INFINITY;
      const max = field.max ?? Number.POSITIVE_INFINITY;
      value[field.key] = Math.min(max, Math.max(min, Math.round(number)));
      continue;
    }

    const text = raw === null || raw === undefined ? "" : String(raw).trim();

    if (field.type === "select") {
      if (!text) {
        if (field.required) return { ok: false, error: `${field.label} is required.` };
        value[field.key] = field.options?.[0]?.value ?? "";
        continue;
      }
      const allowed = field.options?.some((option) => option.value === text);
      if (!allowed) {
        return { ok: false, error: `${field.label} has an invalid value.` };
      }
      value[field.key] = text;
      continue;
    }

    if (field.required && !text) {
      return { ok: false, error: `${field.label} is required.` };
    }

    const isLinkField =
      field.type === "file" ||
      /^(imageUrl|profileImage|privacyUrl|termsUrl|githubUrl|liveUrl|cvUrl|formEndpoint|facebook|instagram|linkedin|youtube|doi)$/.test(
        field.key,
      );
    if (text && isLinkField && !isSafeLink(text)) {
      return { ok: false, error: `${field.label} must be a full link or a path starting with /.` };
    }

    const limit = field.type === "textarea" ? MAX_LONG_TEXT : MAX_TEXT;
    value[field.key] = text.slice(0, limit);
  }

  return { ok: true, value };
}

export function normalizeItem(slug: SectionSlug, input: unknown): NormalizeResult {
  const def = getSectionDef(slug);
  if (!def) return { ok: false, error: "Unknown section." };
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, error: "Invalid content payload." };
  }
  return normalizeFields(def.fields, input as Record<string, unknown>);
}

export function normalizeSettings(key: SettingsKey, input: unknown): NormalizeResult {
  const group = getSettingsGroup(key);
  if (!group) return { ok: false, error: "Unknown settings group." };
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, error: "Invalid settings payload." };
  }
  return normalizeFields(group.fields, input as Record<string, unknown>);
}
