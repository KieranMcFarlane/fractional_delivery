import type { Metadata } from "next";

import { SiteShell } from "@/components/site-shell";
import { RichText } from "@/components/rich-text";
import { getPageBySlug } from "@/lib/directus";

export const revalidate = 300;
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie policy information for Fractional Delivery.",
};

export default async function CookiePolicyPage() {
  const page = await getPageBySlug("en", "cookie-policy");

  return (
    <SiteShell locale="en" pathname="/cookie-policy" localeLinks={{ en: "/cookie-policy", fr: "/fr/cookie-policy" }}>
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-[900px]">
          {page ? <RichText html={page.bodyRichtext} /> : null}
        </div>
      </section>
    </SiteShell>
  );
}
