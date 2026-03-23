import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { RichText } from "@/components/rich-text";
import { SiteShell } from "@/components/site-shell";
import { getBlogPage } from "@/lib/directus";
import { buildMetadata, siteUrl } from "@/lib/seo";

export const revalidate = 300;

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const blog = await getBlogPage("en");
  return buildMetadata("en", "/blog", blog);
}

export default async function BlogPage() {
  const blog = await getBlogPage("en");
  const baseUrl = siteUrl();

  return (
    <SiteShell locale="en" pathname="/blog" localeLinks={{ en: "/blog", fr: "/fr/blog" }}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Field Notes",
          url: `${baseUrl}/blog`,
          inLanguage: "en",
        }}
      />
      <RichText html={blog.bodyRichtext} />
    </SiteShell>
  );
}
