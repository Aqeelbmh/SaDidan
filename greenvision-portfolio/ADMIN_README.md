# Content Studio (admin + backend)

Every piece of text, project, publication, award, gallery entry, image and social link on this portfolio is stored in a Turso (libSQL) database and edited from `/admin`. Saving publishes immediately — no code edits, no redeploy.

## How it works

- The public page (`/`) is server-rendered on every request from the database.
- The admin area lives at `/admin`, protected by one password.
- Images are uploaded, compressed in the browser, and stored in the database; they are served from `/api/images/<id>` with immutable caching.
- On first run the database is seeded with the current portfolio content, so the site looks identical before you touch anything.

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev
```

`.env.local` used locally:

| Variable             | Purpose                                                        |
| -------------------- | -------------------------------------------------------------- |
| `TURSO_DATABASE_URL` | `file:local.db` for local dev, or the `libsql://…` URL          |
| `TURSO_AUTH_TOKEN`   | Turso token — not needed when using `file:local.db`             |
| `ADMIN_PASSWORD`     | The password for `/admin`                                       |
| `SESSION_SECRET`     | Random string, 32+ characters (`openssl rand -hex 32`)          |

Open http://localhost:3000/admin and sign in. Data lives in `local.db` (gitignored).

## Editing content

- **Overview** — counts per section and system status.
- **Profile** — hero name, headline, bio, portrait, CV link, stats, contact details, social links, footer text.
- **Journey / Languages / Publications / Awards / Projects / Gallery** — add, edit, reorder (arrows) and delete entries.
- Images: use **Upload an image** (JPG/PNG/WebP/GIF/AVIF, resized to max 1600px) or paste an existing path/URL.

Deleting an entry removes it from the site immediately. There is no undo.

## Deploying to Vercel

1. Create the database at [turso.tech](https://turso.tech) (or use an existing one) and copy the `libsql://…` URL and an auth token.
2. In Vercel → Project → Settings → Environment Variables, add:

   | Variable             | Example                                              |
   | -------------------- | ---------------------------------------------------- |
   | `TURSO_DATABASE_URL` | `libsql://sa-didan-<org>.aws-ap-south-1.turso.io`    |
   | `TURSO_AUTH_TOKEN`   | token created with `turso db tokens create <db>`     |
   | `ADMIN_PASSWORD`     | a strong password you choose                         |
   | `SESSION_SECRET`     | output of `openssl rand -hex 32`                     |

3. Redeploy. Environment variables only take effect on a new deployment.
4. Sign in at `https://<your-domain>/admin`. The first request seeds the database.

The app must run as a Node server on Vercel. `output: "export"` must stay removed from `next.config.ts` — a static export cannot serve the API routes or admin.

## Security

- Password comparison is timing-safe; the login endpoint limits attempts (8 per 10 minutes per client).
- The admin session is an encrypted, 7-day cookie; signing out clears it.
- In production the app refuses to start admin login if `ADMIN_PASSWORD` or a valid `SESSION_SECRET` is missing.
- Link fields reject `javascript:` and other unsafe schemes server-side.
- Uploads are validated by file signature, capped at 6 MB, and require an admin session.
- Only one admin password exists; there are no user accounts.

## Data model

| Table           | Contents                                                        |
| --------------- | --------------------------------------------------------------- |
| `content_items` | `id`, `section`, `data` (JSON), `position`                      |
| `settings`      | `key` (`hero`, `contact`, `footer`), `value` (JSON)             |
| `images`        | `id`, `mime`, `filename`, `size`, `data` (BLOB), `created_at`   |

## API

All write endpoints require the admin cookie; `GET` on content and settings is public.

```text
POST   /api/auth/login              { password }
POST   /api/auth/logout
GET    /api/auth/session
GET    /api/content/:section
POST   /api/content/:section
PATCH  /api/content/:section/:id
DELETE /api/content/:section/:id
POST   /api/content/:section/reorder   { ids: string[] }
GET    /api/settings
PUT    /api/settings                { group, values }
POST   /api/images                  multipart file
GET    /api/images/:id
DELETE /api/images/:id
```

Sections: `timeline`, `language`, `publications`, `awards`, `projects`, `gallery`.
Settings groups: `hero`, `contact`, `footer`.

## Troubleshooting

- **"Admin login is not configured"** — `ADMIN_PASSWORD` or `SESSION_SECRET` is missing/too short for the current environment; set it and redeploy.
- **Site shows default content after deploy** — the database credentials are wrong or unreachable; the public page falls back to the built-in seed so the site never goes blank.
- **Changes not visible** — confirm the save toast appeared, then hard-refresh; every page response is uncached, so a reload always shows current data.
