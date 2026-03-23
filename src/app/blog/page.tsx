import type { Metadata } from "next";

import { PostCard } from "@/components/post-card";
import { SiteShell } from "@/components/site-shell";
import { getPosts } from "@/lib/directus";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

export const dynamic = "force-static";

const SEO = {
  seoTitle: "Field notes - Fractional Delivery",
  seoDescription:
    "Insights and practical advice for scaling digital, AI and tech teams without operational chaos.",
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("en", "/blog", SEO);
}

export default async function BlogPage() {
  const posts = await getPosts("en");

  return (
    <SiteShell locale="en" pathname="/blog" localeLinks={{ en: "/blog", fr: "/fr/blog" }}>
      <section className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">Insights</p>
        <h1 className="mt-3 text-5xl">Field Notes</h1>
      </section>
      <section className="grid gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} locale="en" post={post} />
        ))}
      </section>
    </SiteShell>
  );
}
