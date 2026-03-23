import type { Metadata } from "next";

import { PostCard } from "@/components/post-card";
import { SiteShell } from "@/components/site-shell";
import { getPosts } from "@/lib/directus";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

export const dynamic = "force-static";

const SEO = {
  seoTitle: "Ressources - Fractional Delivery",
  seoDescription:
    "Conseils tactiques et patterns opérationnels pour les équipes digitales, IA et tech.",
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("fr", "/blog", SEO);
}

export default async function BlogFrPage() {
  const posts = await getPosts("fr");

  return (
    <SiteShell locale="fr" pathname="/fr/blog" localeLinks={{ en: "/blog", fr: "/fr/blog" }}>
      <section className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">Ressources</p>
        <h1 className="mt-3 text-5xl">Notes de Terrain</h1>
      </section>
      <section className="grid gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} locale="fr" post={post} />
        ))}
      </section>
    </SiteShell>
  );
}
