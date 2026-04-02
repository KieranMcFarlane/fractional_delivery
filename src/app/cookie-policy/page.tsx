import type { Metadata } from "next";

import { CookieDeclaration } from "@/components/cookie-declaration";
import { SiteShell } from "@/components/site-shell";

export const revalidate = 300;
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie declaration and cookie policy details for Fractional Delivery.",
};

export default async function CookiePolicyPage() {
  return (
    <SiteShell locale="en" pathname="/cookie-policy" localeLinks={{ en: "/cookie-policy", fr: "/fr/cookie-policy" }}>
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-[900px] space-y-6">
          <h1 className="text-4xl md:text-5xl">Cookie Policy</h1>
          <p className="text-muted-foreground">
            This page provides the live cookie declaration for Fractional Delivery, managed through Cookiebot.
          </p>
          <div className="rounded-2xl border bg-card p-6">
            <CookieDeclaration />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

