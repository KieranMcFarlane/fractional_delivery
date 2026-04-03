import type { Metadata } from "next";

import { SiteShell } from "@/components/site-shell";

export const revalidate = 300;
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Politique de cookies",
  description: "Informations de politique de cookies pour Fractional Delivery.",
};

export default async function CookiePolicyFrPage() {
  return (
    <SiteShell locale="fr" pathname="/fr/cookie-policy" localeLinks={{ en: "/cookie-policy", fr: "/fr/cookie-policy" }}>
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-[900px] space-y-6">
          <h1 className="text-4xl md:text-5xl">Politique de cookies</h1>
          <p className="text-muted-foreground">
            Les préférences cookies sont gérées via la bannière CookieYes présente sur le site.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
