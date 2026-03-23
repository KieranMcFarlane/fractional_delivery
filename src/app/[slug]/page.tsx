import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RichText } from "@/components/rich-text";
import { SiteShell } from "@/components/site-shell";
import { getDynamicSlugs, getPageBySlug, getPostBySlug } from "@/lib/directus";
import { buildMetadata, formatPublishedDate } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 300;

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

    return (
      <SiteShell locale="en" pathname={`/${slug}`} localeLinks={localeLinks}>
        <h1 className="mb-6 text-5xl">{page.title}</h1>
        <RichText html={page.bodyRichtext} />
      </SiteShell>
    );
  }

  const post = await getPostBySlug("en", slug);
  if (!post) notFound();

  const translatedPost = await getPostBySlug("fr", slug);
  const localeLinks = {
    en: `/${slug}`,
    fr: translatedPost ? `/fr/${slug}` : "/fr",
  };

  return (
    <SiteShell locale="en" pathname={`/${slug}`} localeLinks={localeLinks}>
      <article>
        <p className="text-xs uppercase tracking-wide text-zinc-500">{formatPublishedDate(post.publishedAt, "en")}</p>
        <h1 className="mt-2 text-5xl">{post.title}</h1>
        <p className="mt-3 text-sm text-zinc-600">{post.excerpt}</p>
        <div className="mt-8">
          <RichText html={post.contentRichtext} />
        </div>
      </article>
    </SiteShell>
  );
}
