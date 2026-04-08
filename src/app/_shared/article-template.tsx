import type { Locale, LocalizedPage, LocalizedPost } from "@/lib/types";
import { formatPublishedDate, siteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { RichText } from "@/components/rich-text";
import { SiteShell } from "@/components/site-shell";

type ArticleTemplateProps = {
  locale: Locale;
  pathname: string;
  localeLinks: Partial<Record<Locale, string>>;
  page?: LocalizedPage | null;
  post?: LocalizedPost | null;
  showTitle?: boolean;
};

export function ArticleTemplate({ locale, pathname, localeLinks, page, post, showTitle = true }: ArticleTemplateProps) {
  const baseUrl = siteUrl();
  const title = page?.title ?? post?.title ?? "";
  const excerpt = page?.seoDescription ?? post?.excerpt ?? "";
  const body = page?.bodyRichtext ?? post?.contentRichtext ?? "";

  return (
    <SiteShell locale={locale} pathname={pathname} localeLinks={localeLinks}>
      <article>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": post ? "Article" : "WebPage",
            headline: post?.title ?? undefined,
            description: excerpt || undefined,
            datePublished: post?.publishedAt,
            dateModified: post?.publishedAt,
            author: post
              ? {
                  "@type": "Person",
                  name: post.authorName,
                }
              : undefined,
            mainEntityOfPage: `${baseUrl}${pathname}`,
            inLanguage: locale,
            name: title || undefined,
            url: `${baseUrl}${pathname}`,
          }}
        />

        {showTitle && title ? (
          <>
            {post ? <p className="text-xs uppercase tracking-wide text-zinc-500">{formatPublishedDate(post.publishedAt, locale)}</p> : null}
            <h1 className="mt-2 text-5xl">{title}</h1>
            {excerpt ? <p className="mt-3 text-sm text-zinc-600">{excerpt}</p> : null}
          </>
        ) : null}

        <div className={post ? "mt-8" : ""}>
          <RichText html={body} />
        </div>
      </article>
    </SiteShell>
  );
}
