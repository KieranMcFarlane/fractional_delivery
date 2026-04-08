import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleTemplate } from "@/app/_shared/article-template";
import { getDynamicSlugs, getPageBySlug, getPostBySlug } from "@/lib/directus";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 300;
export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const entries = await getDynamicSlugs();
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug("en", slug);
  if (page) return buildMetadata("en", `/${slug}`, page);

  const post = await getPostBySlug("en", slug);
  if (post) return buildMetadata("en", `/${slug}`, post);

  return {};
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;

  const page = await getPageBySlug("en", slug);
  if (page) {
    const translatedPage = await getPageBySlug("fr", slug);
    const localeLinks = {
      en: `/${slug}`,
      fr: translatedPage ? `/fr/${slug}` : "/fr",
    };

    return <ArticleTemplate locale="en" pathname={`/${slug}`} localeLinks={localeLinks} page={page} showTitle={false} />;
  }

  const post = await getPostBySlug("en", slug);
  if (!post) notFound();

  const translatedPost = await getPostBySlug("fr", slug);
  const localeLinks = {
    en: `/${slug}`,
    fr: translatedPost ? `/fr/${slug}` : "/fr",
  };

  return <ArticleTemplate locale="en" pathname={`/${slug}`} localeLinks={localeLinks} post={post} showTitle={false} />;
}
