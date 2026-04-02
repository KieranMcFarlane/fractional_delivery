import type { Metadata } from "next";

import { CookieDeclaration } from "@/components/cookie-declaration";
import { SiteShell } from "@/components/site-shell";

export const revalidate = 300;
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Politique de cookies",
  description: "Déclaration des cookies et informations de consentement pour Fractional Delivery.",
};

export default async function CookiePolicyFrPage() {
  return (
    <SiteShell locale="fr" pathname="/fr/cookie-policy" localeLinks={{ en: "/cookie-policy", fr: "/fr/cookie-policy" }}>
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-[900px] space-y-6">
          <h1 className="text-4xl md:text-5xl">Politique de cookies</h1>
          <p className="text-muted-foreground">
            Cette page affiche la déclaration des cookies en direct pour Fractional Delivery, gérée par Cookiebot.
          </p>
          <div className="rounded-2xl border bg-card p-6">
            <CookieDeclaration />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

