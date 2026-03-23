import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { RichText } from "@/components/rich-text";
import { SiteShell } from "@/components/site-shell";
import { getBlogPage } from "@/lib/directus";
import { buildMetadata, siteUrl } from "@/lib/seo";

export const revalidate = 300;

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const blog = await getBlogPage("fr");
  return buildMetadata("fr", "/blog", blog);
}

export default async function BlogFrPage() {
  const blog = await getBlogPage("fr");
  const baseUrl = siteUrl();

  return (
    <SiteShell locale="fr" pathname="/fr/blog" localeLinks={{ en: "/blog", fr: "/fr/blog" }}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Notes de Terrain",
          url: `${baseUrl}/fr/blog`,
          inLanguage: "fr",
        }}
      />
      <RichText html={blog.bodyRichtext} />
    </SiteShell>
  );
}
