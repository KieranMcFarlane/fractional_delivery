import type { Metadata } from "next";

import { SiteShell } from "@/components/site-shell";
import { RichText } from "@/components/rich-text";
import { getPageBySlug } from "@/lib/directus";

export const revalidate = 300;
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Politique de cookies",
  description: "Informations de politique de cookies pour Fractional Delivery.",
};

export default async function CookiePolicyFrPage() {
  const page = await getPageBySlug("fr", "cookie-policy");

  return (
    <SiteShell locale="fr" pathname="/fr/cookie-policy" localeLinks={{ en: "/cookie-policy", fr: "/fr/cookie-policy" }}>
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-[900px]">
          {page ? <RichText html={page.bodyRichtext} /> : null}
        </div>
      </section>
    </SiteShell>
  );
}
