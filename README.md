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
- `NEXT_PUBLIC_COOKIEBOT_ID` (Cookiebot CBID)
- `MAILERLITE_API_KEY` (required for ebook signup form; `MAILERLITE_API` is supported as fallback)
- `MAILERLITE_GROUP_DIAGNOSTIC` (group id for all diagnostic downloads; `MAILERLITE_GROUP_ID` fallback)
- `MAILERLITE_GROUP_NEWSLETTER` (optional group id for users who opt into marketing emails)
- `RESEND_API_KEY` (required for footer newsletter signup)
- `RESEND_NEWSLETTER_SEGMENT_ID` (optional Resend segment id for footer newsletter signups)
- `RESEND_NEWSLETTER_TOPIC_ID` (optional Resend topic id for footer newsletter signups)

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
