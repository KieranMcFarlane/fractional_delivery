import type { Metadata } from "next";

import { SiteShell } from "@/components/site-shell";

export const revalidate = 300;
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie policy information for Fractional Delivery.",
};

export default function CookiePolicyPage() {
  const cookiePolicySrcDoc = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        background: transparent;
        color: inherit;
        font-family: inherit;
      }
      body {
        overflow: auto;
      }
      a.cky-banner-element {
        padding: 8px 30px;
        background: #f8f9fa;
        color: #858a8f;
        border: 1px solid #dee2e6;
        box-sizing: border-box;
        border-radius: 2px;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <!-- Start CookieYes cookie policy -->
    <script id="cky-cookie-policy" type="text/javascript" src="https://cdn-cookieyes.com/client_data/ea5f550da8c02cfb50c4b53e516bf129/cookie-policy/script.js"></script>
    <!-- End CookieYes cookie policy -->
  </body>
</html>`;

  return (
    <SiteShell locale="en" pathname="/cookie-policy" localeLinks={{ en: "/cookie-policy", fr: "/fr/cookie-policy" }}>
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-[900px]">
          <iframe
            title="Cookie Policy"
            className="w-full rounded-2xl border-0 bg-transparent"
            style={{ minHeight: "1200px" }}
            srcDoc={cookiePolicySrcDoc}
          />
        </div>
      </section>
    </SiteShell>
  );
}
