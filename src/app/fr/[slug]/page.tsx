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
  const page = await getPageBySlug("fr", slug);
  if (page) return buildMetadata("fr", `/fr/${slug}`, page);

  const post = await getPostBySlug("fr", slug);
  if (post) return buildMetadata("fr", `/fr/${slug}`, post);

  return {};
}

export default async function SlugFrPage({ params }: Props) {
  const { slug } = await params;
  const hideInjectedArticleHeader = slug === "rethink-delivery-job-ai";

  const page = await getPageBySlug("fr", slug);
  if (page) {
    const translatedPage = await getPageBySlug("en", slug);
    const localeLinks = {
      en: translatedPage ? `/${slug}` : "/",
      fr: `/fr/${slug}`,
    };

    return <ArticleTemplate locale="fr" pathname={`/fr/${slug}`} localeLinks={localeLinks} page={page} showTitle={false} />;
  }

  const post = await getPostBySlug("fr", slug);
  if (!post) notFound();

  const translatedPost = await getPostBySlug("en", slug);
  const localeLinks = {
    en: translatedPost ? `/${slug}` : "/",
    fr: `/fr/${slug}`,
  };

  return <ArticleTemplate locale="fr" pathname={`/fr/${slug}`} localeLinks={localeLinks} post={post} showTitle={!hideInjectedArticleHeader} />;
}
