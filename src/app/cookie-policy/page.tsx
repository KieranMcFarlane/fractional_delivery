import type { Metadata } from "next";
import Script from "next/script";

import { SiteShell } from "@/components/site-shell";

export const revalidate = 300;
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie policy information for Fractional Delivery.",
};

export default function CookiePolicyPage() {
  return (
    <SiteShell locale="en" pathname="/cookie-policy" localeLinks={{ en: "/cookie-policy", fr: "/fr/cookie-policy" }}>
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-[900px]">
          {/* Start CookieYes cookie policy */}
          <Script
            id="cky-cookie-policy"
            src="https://cdn-cookieyes.com/client_data/ea5f550da8c02cfb50c4b53e516bf129/cookie-policy/script.js"
            strategy="afterInteractive"
          />
          {/* End CookieYes cookie policy */}
        </div>
      </section>
    </SiteShell>
  );
}
