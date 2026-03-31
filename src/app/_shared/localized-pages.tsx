import type { Metadata } from "next";

import { AboutSection } from "@/components/about-section";
import { JsonLd } from "@/components/json-ld";
import { RichText } from "@/components/rich-text";
import { SiteShell } from "@/components/site-shell";
import { getBlogPage, getHomePage } from "@/lib/directus";
import type { Locale } from "@/lib/types";
import { buildMetadata, siteUrl } from "@/lib/seo";

function homePathname(locale: Locale): string {
  return locale === "fr" ? "/fr" : "/";
}

function blogPathname(locale: Locale): string {
  return locale === "fr" ? "/fr/blog" : "/blog";
}

const ABOUT_SECTION_PATTERN = /<section id="about"[\s\S]*?<\/section>/i;

function extractMainContent(html: string): string {
  const match = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  return match?.[1] ?? html;
}

function splitHomeSections(html: string): { before: string; after: string; hasAbout: boolean } {
  const content = extractMainContent(html);
  const match = content.match(ABOUT_SECTION_PATTERN);

  if (!match || typeof match.index !== "number") {
    return { before: content, after: "", hasAbout: false };
  }

  const before = content.slice(0, match.index);
  const after = content.slice(match.index + match[0].length);
  return { before, after, hasAbout: true };
}

export async function generateLocalizedHomeMetadata(locale: Locale): Promise<Metadata> {
  const home = await getHomePage(locale);
  return buildMetadata(locale, "/", home);
}

export async function renderLocalizedHomePage(locale: Locale) {
  const home = await getHomePage(locale);
  const baseUrl = siteUrl();
  const sections = splitHomeSections(home.bodyRichtext);

  return (
    <SiteShell locale={locale} pathname={homePathname(locale)} localeLinks={{ en: "/", fr: "/fr" }}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Fractional Delivery",
          url: baseUrl,
          ...(locale === "fr" ? { inLanguage: "fr" } : {}),
        }}
      />
      <section id="home">
        {sections.before.trim() ? <RichText html={sections.before} /> : null}
        {sections.hasAbout ? <AboutSection locale={locale} /> : null}
        {sections.after.trim() ? <RichText html={sections.after} /> : null}
      </section>
    </SiteShell>
  );
}

export async function generateLocalizedBlogMetadata(locale: Locale): Promise<Metadata> {
  const blog = await getBlogPage(locale);
  return buildMetadata(locale, "/blog", blog);
}

export async function renderLocalizedBlogPage(locale: Locale) {
  const blog = await getBlogPage(locale);
  const baseUrl = siteUrl();
  const pathname = blogPathname(locale);

  return (
    <SiteShell locale={locale} pathname={pathname} localeLinks={{ en: "/blog", fr: "/fr/blog" }}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: locale === "fr" ? "Notes de Terrain" : "Field Notes",
          url: `${baseUrl}${pathname}`,
          inLanguage: locale,
        }}
      />
      <RichText html={blog.bodyRichtext} />
    </SiteShell>
  );
}
