import type { Metadata } from "next";

import { localizePath } from "@/lib/i18n";
import type { Locale, SeoFields } from "@/lib/types";

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export function buildAlternates(path: string): Metadata["alternates"] {
  return {
    canonical: new URL(localizePath("en", path), siteUrl()).toString(),
    languages: {
      en: new URL(localizePath("en", path), siteUrl()).toString(),
      fr: new URL(localizePath("fr", path), siteUrl()).toString(),
    },
  };
}

export function buildMetadata(locale: Locale, path: string, seo: SeoFields): Metadata {
  const url = new URL(localizePath(locale, path), siteUrl()).toString();

  return {
    title: seo.seoTitle,
    description: seo.seoDescription,
    alternates: buildAlternates(path),
    openGraph: {
      title: seo.seoTitle,
      description: seo.seoDescription,
      url,
      type: "website",
      locale,
      images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.seoTitle,
      description: seo.seoDescription,
      images: seo.ogImage ? [seo.ogImage] : undefined,
    },
  };
}

export function formatPublishedDate(value: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    dateStyle: "long",
  }).format(new Date(value));
}
