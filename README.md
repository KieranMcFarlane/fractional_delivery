# Fractional Delivery (Next.js + i18n)

Next.js App Router site with:
- EN/FR localized routes (`/` and `/fr/*`)
- Static local content (no CMS dependency)
- Dynamic `sitemap.xml` and `robots.txt`

## Routes

- `/` and `/fr`
- `/blog` and `/fr/blog`
- `/:slug` and `/fr/:slug`

## Environment

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL`
- `MAILERLITE_API` (required for the ebook signup form)
- `MAILERLITE_GROUP_ID` (optional MailerLite group id)

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Tests

```bash
npm run test:unit
npm run test:e2e
```

## Legacy Export

Original static HTML export is preserved in `legacy-site/`.
