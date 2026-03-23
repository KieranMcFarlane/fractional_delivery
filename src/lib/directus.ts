import { createDirectus, readItems, rest } from "@directus/sdk";

import { mockContent } from "@/lib/mock-content";
import type { DynamicEntry, Locale, LocalizedPage, LocalizedPost, SiteSettings } from "@/lib/types";

type CmsPage = {
  id: number;
  slug: string;
  type: "home" | "legal" | "generic";
  status: "draft" | "published";
  hero_image?: string | null;
};

type CmsPageTranslation = {
  pages_id: number;
  languages_code: Locale;
  title: string;
  seo_title?: string;
  seo_description?: string;
  body_richtext?: string;
};

type CmsPost = {
  id: number;
  slug: string;
  status: "draft" | "published";
  published_at: string;
  author_name: string;
  cover_image?: string | null;
};

type CmsPostTranslation = {
  posts_id: number;
  languages_code: Locale;
  title: string;
  excerpt?: string;
  seo_title?: string;
  seo_description?: string;
  content_richtext?: string;
};

type CmsSiteSettings = {
  id: number;
  brand_name: string;
  contact_email: string;
  linkedin_url: string;
  cta_href: string;
};

type CmsSiteSettingsTranslation = {
  site_settings_id: number;
  languages_code: Locale;
  cta_label?: string;
  nav_items?: Array<{ label: string; href: string }>;
  footer_text?: string;
  legal_links?: Array<{ label: string; href: string }>;
};

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const client = DIRECTUS_URL ? createDirectus(DIRECTUS_URL).with(rest()) : null;

function hasClient() {
  return Boolean(client);
}

export async function getSiteSettings(locale: Locale): Promise<SiteSettings> {
  if (!hasClient()) return mockContent.getSettings(locale);

  try {
    const settingsRows = await client!.request(
      readItems("site_settings", {
        fields: ["id", "brand_name", "contact_email", "linkedin_url", "cta_href"],
        limit: 1,
      }),
    );
    const settings = (settingsRows as CmsSiteSettings[])[0];
    if (!settings) return mockContent.getSettings(locale);

    const translationRows = await client!.request(
      readItems("site_settings_translations", {
        fields: ["site_settings_id", "languages_code", "cta_label", "nav_items", "footer_text", "legal_links"],
        filter: {
          site_settings_id: { _eq: settings.id },
          languages_code: { _eq: locale },
        },
        limit: 1,
      }),
    );

    const translation = (translationRows as CmsSiteSettingsTranslation[])[0];
    const fallback = mockContent.getSettings(locale);

    return {
      brandName: settings.brand_name,
      contactEmail: settings.contact_email,
      linkedinUrl: settings.linkedin_url,
      ctaHref: settings.cta_href,
      ctaLabel: translation?.cta_label ?? fallback.ctaLabel,
      navItems: translation?.nav_items ?? fallback.navItems,
      footerText: translation?.footer_text ?? fallback.footerText,
      legalLinks: translation?.legal_links ?? fallback.legalLinks,
    };
  } catch {
    return mockContent.getSettings(locale);
  }
}

function mapPage(page: CmsPage, translation: CmsPageTranslation, locale: Locale): LocalizedPage {
  return {
    locale,
    slug: page.slug,
    type: page.type,
    title: translation.title || page.slug,
    seoTitle: translation.seo_title || translation.title || page.slug,
    seoDescription: translation.seo_description || "",
    ogImage: page.hero_image,
    bodyRichtext: translation.body_richtext || "",
  };
}

export async function getHomePage(locale: Locale): Promise<LocalizedPage> {
  if (!hasClient()) return mockContent.getHome(locale);

  try {
    const pageRows = await client!.request(
      readItems("pages", {
        fields: ["id", "slug", "type", "status", "hero_image"],
        filter: {
          slug: { _eq: "home" },
          status: { _eq: "published" },
        },
        limit: 1,
      }),
    );
    const page = (pageRows as CmsPage[])[0];
    if (!page) return mockContent.getHome(locale);

    const translationRows = await client!.request(
      readItems("pages_translations", {
        fields: ["pages_id", "languages_code", "title", "seo_title", "seo_description", "body_richtext"],
        filter: {
          pages_id: { _eq: page.id },
          languages_code: { _eq: locale },
        },
        limit: 1,
      }),
    );

    const translation = (translationRows as CmsPageTranslation[])[0];
    if (!translation) return mockContent.getHome(locale);

    return mapPage(page, translation, locale);
  } catch {
    return mockContent.getHome(locale);
  }
}

export async function getPageBySlug(locale: Locale, slug: string): Promise<LocalizedPage | null> {
  if (!hasClient()) return mockContent.getPage(locale, slug);

  try {
    const pageRows = await client!.request(
      readItems("pages", {
        fields: ["id", "slug", "type", "status", "hero_image"],
        filter: {
          slug: { _eq: slug },
          status: { _eq: "published" },
        },
        limit: 1,
      }),
    );
    const page = (pageRows as CmsPage[])[0];
    if (!page) return null;

    const translationRows = await client!.request(
      readItems("pages_translations", {
        fields: ["pages_id", "languages_code", "title", "seo_title", "seo_description", "body_richtext"],
        filter: {
          pages_id: { _eq: page.id },
          languages_code: { _eq: locale },
        },
        limit: 1,
      }),
    );

    const translation = (translationRows as CmsPageTranslation[])[0];
    return translation ? mapPage(page, translation, locale) : null;
  } catch {
    return mockContent.getPage(locale, slug);
  }
}

function mapPost(post: CmsPost, translation: CmsPostTranslation, locale: Locale): LocalizedPost {
  return {
    locale,
    slug: post.slug,
    title: translation.title || post.slug,
    excerpt: translation.excerpt || "",
    seoTitle: translation.seo_title || translation.title || post.slug,
    seoDescription: translation.seo_description || translation.excerpt || "",
    contentRichtext: translation.content_richtext || "",
    publishedAt: post.published_at,
    authorName: post.author_name,
    coverImage: post.cover_image,
  };
}

export async function getPosts(locale: Locale): Promise<LocalizedPost[]> {
  if (!hasClient()) return mockContent.getPosts(locale);

  try {
    const postRows = await client!.request(
      readItems("posts", {
        fields: ["id", "slug", "status", "published_at", "author_name", "cover_image"],
        filter: { status: { _eq: "published" } },
        sort: ["-published_at"],
      }),
    );
    const posts = postRows as CmsPost[];
    if (posts.length === 0) return [];

    const translationRows = await client!.request(
      readItems("posts_translations", {
        fields: ["posts_id", "languages_code", "title", "excerpt", "seo_title", "seo_description", "content_richtext"],
        filter: {
          languages_code: { _eq: locale },
          posts_id: { _in: posts.map((post) => post.id) },
        },
      }),
    );
    const translations = translationRows as CmsPostTranslation[];
    const translationMap = new Map(translations.map((translation) => [translation.posts_id, translation]));

    return posts
      .map((post) => {
        const translation = translationMap.get(post.id);
        return translation ? mapPost(post, translation, locale) : null;
      })
      .filter((post): post is LocalizedPost => Boolean(post));
  } catch {
    return mockContent.getPosts(locale);
  }
}

export async function getPostBySlug(locale: Locale, slug: string): Promise<LocalizedPost | null> {
  if (!hasClient()) return mockContent.getPost(locale, slug);

  try {
    const postRows = await client!.request(
      readItems("posts", {
        fields: ["id", "slug", "status", "published_at", "author_name", "cover_image"],
        filter: {
          slug: { _eq: slug },
          status: { _eq: "published" },
        },
        limit: 1,
      }),
    );
    const post = (postRows as CmsPost[])[0];
    if (!post) return null;

    const translationRows = await client!.request(
      readItems("posts_translations", {
        fields: ["posts_id", "languages_code", "title", "excerpt", "seo_title", "seo_description", "content_richtext"],
        filter: {
          posts_id: { _eq: post.id },
          languages_code: { _eq: locale },
        },
        limit: 1,
      }),
    );
    const translation = (translationRows as CmsPostTranslation[])[0];
    return translation ? mapPost(post, translation, locale) : null;
  } catch {
    return mockContent.getPost(locale, slug);
  }
}

export async function getDynamicSlugs(): Promise<DynamicEntry[]> {
  if (!hasClient()) return mockContent.getDynamicSlugs();

  try {
    const [pageRows, postRows] = await Promise.all([
      client!.request(
        readItems("pages", {
          fields: ["slug"],
          filter: {
            status: { _eq: "published" },
            slug: { _neq: "home" },
          },
          limit: -1,
        }),
      ),
      client!.request(
        readItems("posts", {
          fields: ["slug"],
          filter: { status: { _eq: "published" } },
          limit: -1,
        }),
      ),
    ]);

    return [
      ...(pageRows as Array<{ slug: string }>).map(({ slug }) => ({ slug, kind: "page" as const })),
      ...(postRows as Array<{ slug: string }>).map(({ slug }) => ({ slug, kind: "post" as const })),
    ];
  } catch {
    return mockContent.getDynamicSlugs();
  }
}
