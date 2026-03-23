# Fractional Delivery (Next.js + Directus)

Next.js App Router migration with:
- SEO-friendly server rendering (SSG + ISR)
- EN/FR localized routes (`/` and `/fr/*`)
- Directus content integration (`pages`, `posts`, `site_settings`)
- Dynamic `sitemap.xml` and `robots.txt`
- Revalidation webhook endpoint for publish updates

## Routes

- `/` and `/fr`
- `/blog` and `/fr/blog`
- `/:slug` and `/fr/:slug`

## Environment

Copy `.env.example` to `.env.local` and set:

- `DIRECTUS_URL`
- `NEXT_PUBLIC_SITE_URL`
- `REVALIDATE_SECRET`
- `DIRECTUS_ADMIN_TOKEN` (only required for bootstrap/seed scripts)

## Local Development

```bash
npm install
npm run dev
```

## Directus Setup

Bootstrap collections/fields:

```bash
npm run directus:bootstrap
```

Seed initial EN/FR content:

```bash
npm run directus:seed
```

Seed data is in `directus/seed-data.json`.

## Revalidation Webhook

POST `/api/revalidate` with:

```json
{
  "secret": "REVALIDATE_SECRET",
  "path": "/blog"
}
```

Configure Directus flow/webhook on content publish events to call this endpoint.

## Tests

```bash
npm run test:unit
npm run test:e2e
```

## Legacy Export

Original static HTML export is preserved in `legacy-site/`.
