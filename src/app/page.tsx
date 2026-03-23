import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { RichText } from "@/components/rich-text";
import { SiteShell } from "@/components/site-shell";
import { getHomePage } from "@/lib/directus";
import { buildMetadata, siteUrl } from "@/lib/seo";

export const revalidate = 300;
export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomePage("en");
  return buildMetadata("en", "/", home);
}

export default async function HomePage() {
  const home = await getHomePage("en");
  const baseUrl = siteUrl();

  return (
    <SiteShell locale="en" pathname="/" localeLinks={{ en: "/", fr: "/fr" }}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Fractional Delivery",
          url: baseUrl,
        }}
      />
      <section id="home">
        <RichText html={home.bodyRichtext} />
      </section>
    </SiteShell>
  );
}
