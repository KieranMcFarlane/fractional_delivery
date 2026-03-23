import Link from "next/link";

import { localizePath } from "@/lib/i18n";
import { formatPublishedDate } from "@/lib/seo";
import type { Locale, LocalizedPost } from "@/lib/types";

type PostCardProps = {
  locale: Locale;
  post: LocalizedPost;
};

export function PostCard({ locale, post }: PostCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        {formatPublishedDate(post.publishedAt, locale)}
      </p>
      <h2 className="mt-3 text-3xl leading-tight">{post.title}</h2>
      <p className="mt-3 text-sm text-zinc-600">{post.excerpt}</p>
      <Link
        href={localizePath(locale, `/${post.slug}`)}
        className="mt-5 inline-flex text-sm font-semibold text-orange-600 hover:text-orange-700"
      >
        {locale === "fr" ? "Lire l'article" : "Read article"}
      </Link>
    </article>
  );
}
