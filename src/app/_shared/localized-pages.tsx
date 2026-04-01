import type { Metadata } from "next";

import { AboutSection } from "@/components/about-section";
import { BentoChallenges } from "@/components/bento-challenges";
import { JsonLd } from "@/components/json-ld";
import { RichText } from "@/components/rich-text";
import { SiteShell } from "@/components/site-shell";
import { Testimonials } from "@/components/testimonials";
import { getBlogPage, getHomePage } from "@/lib/directus";
import type { Locale } from "@/lib/types";
import { buildMetadata, siteUrl } from "@/lib/seo";

function homePathname(locale: Locale): string {
  return locale === "fr" ? "/fr" : "/";
}

function blogPathname(locale: Locale): string {
  return locale === "fr" ? "/fr/blog" : "/blog";
}

const TOKENS = {
  bento: "<!--__BENTO_CHALLENGES__-->",
  about: "<!--__ABOUT_SECTION__-->",
  testimonials: "<!--__TESTIMONIALS_SECTION__-->",
} as const;

function extractMainContent(html: string): string {
  const match = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  return match?.[1] ?? html;
}

function replaceSectionWithToken(content: string, sectionId: string, token: string): { content: string; found: boolean } {
  const pattern = new RegExp(`<section id="${sectionId}"[\\s\\S]*?<\\/section>`, "i");
  const match = content.match(pattern);
  if (!match) return { content, found: false };
  return { content: content.replace(pattern, token), found: true };
}

function insertTokenBeforeSection(content: string, sectionId: string, token: string): { content: string; found: boolean } {
  const pattern = new RegExp(`(<section id="${sectionId}"[\\s\\S]*?<\\/section>)`, "i");
  const match = content.match(pattern);
  if (!match) return { content, found: false };
  return { content: content.replace(pattern, `${token}$1`), found: true };
}

function buildHomeFragments(html: string): { parts: string[]; hasBento: boolean; hasAbout: boolean; hasTestimonials: boolean } {
  let content = extractMainContent(html);

  const hasExistingTestimonials = /<section id="testimonials"[\s\S]*?<\/section>/i.test(content);
  const bento = replaceSectionWithToken(content, "how-i-help", TOKENS.bento);
  content = bento.content;
  const about = replaceSectionWithToken(content, "about", TOKENS.about);
  content = about.content;

  let hasTestimonials = false;
  if (!hasExistingTestimonials) {
    const testimonialAnchors = ["investment", "faq", "discovery-call"] as const;
    for (const anchor of testimonialAnchors) {
      const testimonials = insertTokenBeforeSection(content, anchor, TOKENS.testimonials);
      content = testimonials.content;
      if (testimonials.found) {
        hasTestimonials = true;
        break;
      }
    }
  }

  const splitPattern = new RegExp(`(${TOKENS.bento}|${TOKENS.about}|${TOKENS.testimonials})`);
  return { parts: content.split(splitPattern), hasBento: bento.found, hasAbout: about.found, hasTestimonials };
}

export async function generateLocalizedHomeMetadata(locale: Locale): Promise<Metadata> {
  const home = await getHomePage(locale);
  return buildMetadata(locale, "/", home);
}

export async function renderLocalizedHomePage(locale: Locale) {
  const home = await getHomePage(locale);
  const baseUrl = siteUrl();
  const fragments = buildHomeFragments(home.bodyRichtext);

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
        {fragments.parts.map((part, index) => {
          if (part === TOKENS.bento) return fragments.hasBento ? <BentoChallenges key={`bento-${index}`} locale={locale} /> : null;
          if (part === TOKENS.about) return fragments.hasAbout ? <AboutSection key={`about-${index}`} locale={locale} /> : null;
          if (part === TOKENS.testimonials) {
            return fragments.hasTestimonials ? <Testimonials key={`testimonials-${index}`} locale={locale} /> : null;
          }
          return part.trim() ? <RichText key={`html-${index}`} html={part} /> : null;
        })}
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
