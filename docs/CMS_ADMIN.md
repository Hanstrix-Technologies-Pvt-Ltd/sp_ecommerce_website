# STELZ CMS Admin Guide

## What this CMS manages

| Admin module | Public website impact |
|---|---|
| Gallery | `/gallery` installations + concepts carousels |
| Key Projects | Home **STELZ Footprint** carousel |
| Clients | `/clients` grid, About partners, Services partners |

## Setup

The CMS runs on **Neon**: Postgres (via Prisma) for data and Neon Object Storage
(S3-compatible bucket `assets`, `public_read`, declared in `neon.ts`) for uploads.

1. Link and pull Neon credentials (writes `DATABASE_URL`, `DATABASE_URL_UNPOOLED`,
   `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_ENDPOINT_URL_S3`, `AWS_REGION` into `.env`):

```bash
npm i -g neon@latest && neon login
neon deploy        # or: neon env pull
```

   Then set admin secrets in `.env.local` (do **not** set `DATABASE_URL` there; it would override Neon's):

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-strong-password
ADMIN_SESSION_SECRET=long-random-secret-at-least-16-chars
```

2. Initialize database and seed from existing static content:

```bash
npm run cms:setup
```

3. Start the app and open `/admin/login`.

## Security notes

- All `/api/admin/*` mutations require an httpOnly session cookie.
- `/admin` routes are auth-gated in the dashboard layout.
- Never commit `.env` / `.env.local` (both are gitignored).
- Uploaded images are stored in the Neon bucket under `cms/<folder>/` with unique keys and immutable caching.
- Managed uploads are deleted only when no other CMS record references them.
- Existing `/assets/...` seed images are left in place (not deleted).

## Deployment notes

- Set the same Neon env vars on the host (Vercel etc.). No local disk is required, so ephemeral filesystems are fine.
- `DATABASE_URL` is the pooled connection (app traffic); `DATABASE_URL_UNPOOLED` is used by Prisma as `directUrl` for `db push`.
- Consider putting a CDN in front of the bucket endpoint for hot public images.

## Scripts

- `npm run db:generate` — Prisma client
- `npm run db:push` — apply schema
- `npm run db:seed` — import current Gallery / Footprint / Clients content
- `npm run cms:setup` — generate + push + seed
