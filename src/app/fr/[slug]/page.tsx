import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { RichText } from "@/components/rich-text";
import { SiteShell } from "@/components/site-shell";
import { getDynamicSlugs, getPageBySlug, getPostBySlug } from "@/lib/directus";
import { buildMetadata, formatPublishedDate, siteUrl } from "@/lib/seo";

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
  if (page) return buildMetadata("fr", `/${slug}`, page);

  const post = await getPostBySlug("fr", slug);
  if (post) return buildMetadata("fr", `/${slug}`, post);

  return {};
}

export default async function SlugFrPage({ params }: Props) {
  const { slug } = await params;
  const baseUrl = siteUrl();
  const hideInjectedArticleHeader = slug === "rethink-delivery-job-ai";

  const page = await getPageBySlug("fr", slug);
  if (page) {
    const translatedPage = await getPageBySlug("en", slug);
    const localeLinks = {
      en: translatedPage ? `/${slug}` : "/",
      fr: `/fr/${slug}`,
    };

    return (
      <SiteShell locale="fr" pathname={`/fr/${slug}`} localeLinks={localeLinks}>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebPage",
            inLanguage: "fr",
            name: page.title,
            url: `${baseUrl}/fr/${slug}`,
          }}
        />
        <RichText html={page.bodyRichtext} />
      </SiteShell>
    );
  }

  const post = await getPostBySlug("fr", slug);
  if (!post) notFound();

  const translatedPost = await getPostBySlug("en", slug);
  const localeLinks = {
    en: translatedPost ? `/${slug}` : "/",
    fr: `/fr/${slug}`,
  };

  return (
    <SiteShell locale="fr" pathname={`/fr/${slug}`} localeLinks={localeLinks}>
      <article>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            author: {
              "@type": "Person",
              name: post.authorName,
            },
            mainEntityOfPage: `${baseUrl}/fr/${slug}`,
            inLanguage: "fr",
          }}
        />
        {!hideInjectedArticleHeader ? (
          <>
            <p className="text-xs uppercase tracking-wide text-zinc-500">{formatPublishedDate(post.publishedAt, "fr")}</p>
            <h1 className="mt-2 text-5xl">{post.title}</h1>
            <p className="mt-3 text-sm text-zinc-600">{post.excerpt}</p>
          </>
        ) : null}
        <div className="mt-8">
          <RichText html={post.contentRichtext} />
        </div>
      </article>
    </SiteShell>
  );
}
