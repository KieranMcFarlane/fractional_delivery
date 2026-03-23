import type { MetadataRoute } from "next";

import { getDynamicSlugs, getPosts } from "@/lib/directus";
import { localizePath } from "@/lib/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

function fullUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [dynamicSlugs, postsEn, postsFr] = await Promise.all([
    getDynamicSlugs(),
    getPosts("en"),
    getPosts("fr"),
  ]);
  const postDateMap = new Map<string, Date>();
  for (const post of [...postsEn, ...postsFr]) {
    const current = postDateMap.get(post.slug);
    const candidate = new Date(post.publishedAt);
    if (!current || candidate > current) {
      postDateMap.set(post.slug, candidate);
    }
  }
  const staticPaths = ["/", "/blog"];
  const dynamicPaths = dynamicSlugs.map((entry) => `/${entry.slug}`);

  const uniquePaths = Array.from(new Set([...staticPaths, ...dynamicPaths]));

  return uniquePaths.map((path) => ({
    url: fullUrl(localizePath("en", path)),
    lastModified: postDateMap.get(path.replace(/^\//, "")) ?? new Date(),
    alternates: {
      languages: {
        en: fullUrl(localizePath("en", path)),
        fr: fullUrl(localizePath("fr", path)),
      },
    },
  }));
}
