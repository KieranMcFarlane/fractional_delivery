import type { Metadata } from "next";

import { SiteShell } from "@/components/site-shell";

export const revalidate = 300;
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie policy information for Fractional Delivery.",
};

export default async function CookiePolicyPage() {
  return (
    <SiteShell locale="en" pathname="/cookie-policy" localeLinks={{ en: "/cookie-policy", fr: "/fr/cookie-policy" }}>
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-[900px] space-y-6">
          <h1 className="text-4xl md:text-5xl">Cookie Policy</h1>
          <p className="text-muted-foreground">
            Cookie preferences are managed by the CookieYes banner available on the site.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
