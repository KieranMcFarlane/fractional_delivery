import fs from "node:fs";
import path from "node:path";

import type { DynamicEntry, Locale, LocalizedPage, LocalizedPost, SiteSettings } from "@/lib/types";

type SourceFile = {
  en: string;
  fr?: string;
};

const sourceMap = {
  home: { en: "index.html", fr: "index_1.html" },
  blog: { en: "blog.html", fr: "blog_1.html" },
  privacy: { en: "privacy-policy.html" },
  terms: { en: "terms-of-service.html" },
  postStatus: {
    en: "status-updates-to-delivery-intelligence.html",
    fr: "status-updates-to-delivery-intelligence_1.html",
  },
  postRethink: {
    en: "rethink-delivery-job-ai.html",
    fr: "rethink-delivery-job-ai_1.html",
  },
  postSigns: {
    en: "5-signs-delivery-model-is-breaking.html",
    fr: "5-signs-delivery-model-is-breaking_1.html",
  },
} satisfies Record<string, SourceFile>;

const SITE_DIR = path.join(process.cwd(), "content", "html");

function fileForLocale(file: SourceFile, locale: Locale): string {
  return locale === "fr" ? file.fr ?? file.en : file.en;
}

function readHtml(fileName: string): string {
  return fs.readFileSync(path.join(SITE_DIR, fileName), "utf8").replace(/\u0001/g, "");
}

function getTagContent(html: string, tagName: string): string {
  const match = html.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i"));
  return match?.[1]?.trim() ?? "";
}

function getMetaDescription(html: string): string {
  const match = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  return match?.[1] ?? "";
}

function removeScripts(html: string): string {
  return html.replace(/<script[\s\S]*?<\/script>/gi, "");
}

const hugeIconMap: Record<string, string> = {
  menu: "menu-01",
  x: "cancel-01",
  "arrow-left": "arrow-left-02",
  "arrow-right": "arrow-right-02",
  calendar: "calendar-03",
  linkedin: "linkedin-02",
  mail: "mail-02",
  user: "user-03",
  "book-open": "book-open-01",
  "calendar-x": "calendar-remove-01",
  check: "tick-01",
  "chevron-down": "arrow-down-01",
  clock: "clock-01",
  cpu: "chip-02",
  "git-branch": "git-branch",
  globe: "globe-02",
  languages: "language-square",
  layers: "layers-01",
  "map-pin": "location-01",
  monitor: "computer",
  rocket: "rocket-01",
  "shield-check": "shield-01",
  target: "target-01",
  "trending-down": "chart-down",
  "trending-up": "chart-up",
  users: "user-group",
  zap: "flash",
  "zap-off": "flash-off",
  "check-circle-2": "checkmark-circle-01",
};

function replaceLucideTagsWithHugeIcons(html: string): string {
  return html.replace(/<i([^>]*?)data-lucide="([^"]+)"([^>]*)><\/i>/gi, (_full, before, iconName, after) => {
    const classMatch = `${before} ${after}`.match(/class="([^"]*)"/i);
    const className = classMatch?.[1] ?? "w-4 h-4";
    const hugeIcon = hugeIconMap[iconName] ?? "circle";
    const src = `https://cdn.hugeicons.com/icons/${hugeIcon}-stroke-rounded.svg`;
    return `<img src="${src}" alt="" aria-hidden="true" class="${className}" loading="lazy" decoding="async" />`;
  });
}

function extractMainOrBody(html: string): string {
  const mainMatch = html.match(/<main[\s\S]*?<\/main>/i);
  if (mainMatch?.[0]) return replaceLucideTagsWithHugeIcons(removeScripts(mainMatch[0]));

  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return replaceLucideTagsWithHugeIcons(removeScripts(bodyMatch?.[1] ?? html));
}

function normalizeLocalAssetPath(value: string): string {
  if (/^(https?:\/\/|mailto:|tel:|#|data:)/i.test(value)) return value;

  if (value.startsWith("../")) {
    return `/${value.replace(/^(\.\.\/)+/, "")}`;
  }

  if (value.startsWith("./")) {
    return `/${value.replace(/^(\.\/)+/, "")}`;
  }

  if (value.startsWith("/")) return value;

  return `/${value}`;
}

function mapHtmlHref(href: string, currentLocale: Locale): string {
  if (/^(https?:\/\/|mailto:|tel:|#|javascript:)/i.test(href)) return href;

  const [pathPart, hashPart] = href.split("#");
  const [rawPath, queryPart] = pathPart.split("?");

  let relative = rawPath;
  const hasParentPrefix = relative.startsWith("../");

  if (relative.startsWith("../")) relative = relative.replace(/^(\.\.\/)+/, "");
  if (relative.startsWith("./")) relative = relative.replace(/^(\.\/)+/, "");

  let targetLocale: Locale = currentLocale;

  if (relative.startsWith("fr/") || relative.endsWith("_1.html")) {
    targetLocale = "fr";
  } else if (hasParentPrefix) {
    targetLocale = "en";
  }

  relative = relative.replace(/^fr\//, "").replace(/_1\.html$/, ".html");

  let pathname = relative;
  if (relative === "index.html") pathname = "/";
  else if (relative === "blog.html") pathname = "/blog";
  else if (relative.endsWith(".html")) pathname = `/${relative.replace(/\.html$/, "")}`;
  else pathname = normalizeLocalAssetPath(relative);

  const withLocale = targetLocale === "fr" && pathname.startsWith("/") ? `/fr${pathname === "/" ? "" : pathname}` : pathname;
  const withQuery = queryPart ? `${withLocale}?${queryPart}` : withLocale;
  return hashPart ? `${withQuery}#${hashPart}` : withQuery;
}

function rewriteInternalLinks(html: string, locale: Locale): string {
  const rewiredHref = html.replace(/href="([^"]*)"/g, (_full, href: string) => {
    return `href="${mapHtmlHref(href, locale)}"`;
  });

  return rewiredHref.replace(/src="([^"]*)"/g, (_full, src: string) => `src="${normalizeLocalAssetPath(src)}"`);
}

function pageFromFile(locale: Locale, slug: string, type: "home" | "legal" | "generic", file: SourceFile): LocalizedPage {
  const html = readHtml(fileForLocale(file, locale));
  const title = getTagContent(html, "title");
  const body = rewriteInternalLinks(extractMainOrBody(html), locale);
  const description = getMetaDescription(html);

  return {
    locale,
    slug,
    type,
    title,
    seoTitle: title,
    seoDescription: description,
    bodyRichtext: body,
  };
}

function postFromFile(locale: Locale, slug: string, file: SourceFile): LocalizedPost {
  const html = readHtml(fileForLocale(file, locale));
  const title = getTagContent(html, "title");
  const description = getMetaDescription(html);
  const body = rewriteInternalLinks(extractMainOrBody(html), locale);

  return {
    locale,
    slug,
    title,
    excerpt: description,
    seoTitle: title,
    seoDescription: description,
    contentRichtext: body,
    publishedAt: "2026-03-18T00:00:00.000Z",
    authorName: "Camille Wilhelm McFarlane",
  };
}

function localizedLabel(locale: Locale, enLabel: string, frLabel: string): string {
  return locale === "fr" ? frLabel : enLabel;
}

export const mockContent = {
  getSettings(locale: Locale): SiteSettings {
    return {
      brandName: "Fractional Delivery",
      contactEmail: "camille@fractionaldelivery.com",
      linkedinUrl: "https://linkedin.com/in/camillemcfarlane",
      ctaLabel: localizedLabel(locale, "Get in Touch", "Me contacter"),
      ctaHref: locale === "fr" ? "/fr#discovery-call" : "/#discovery-call",
      navItems: [
        {
          label: localizedLabel(locale, "How I help", "Expertise"),
          href: locale === "fr" ? "/fr#how-i-help" : "/#how-i-help",
        },
        {
          label: localizedLabel(locale, "How I work", "Méthode"),
          href: locale === "fr" ? "/fr#services" : "/#services",
        },
        {
          label: localizedLabel(locale, "Who I work with", "Clients"),
          href: locale === "fr" ? "/fr#who-i-help" : "/#who-i-help",
        },
        {
          label: localizedLabel(locale, "Insights", "Ressources"),
          href: locale === "fr" ? "/fr/blog" : "/blog",
        },
      ],
      footerText: localizedLabel(
        locale,
        "Delivery strategy and operations support for scaling teams.",
        "Conseil en opérations et delivery pour équipes en croissance.",
      ),
      legalLinks: [
        {
          label: localizedLabel(locale, "Privacy Policy", "Confidentialité"),
          href: locale === "fr" ? "/fr/privacy-policy" : "/privacy-policy",
        },
        {
          label: localizedLabel(locale, "Terms of Service", "Conditions"),
          href: locale === "fr" ? "/fr/terms-of-service" : "/terms-of-service",
        },
      ],
    };
  },

  getHome(locale: Locale): LocalizedPage {
    return pageFromFile(locale, "home", "home", sourceMap.home);
  },

  getPage(locale: Locale, slug: string): LocalizedPage | null {
    if (slug === "blog") return pageFromFile(locale, slug, "generic", sourceMap.blog);
    if (slug === "privacy-policy") return pageFromFile(locale, slug, "legal", sourceMap.privacy);
    if (slug === "terms-of-service") return pageFromFile(locale, slug, "legal", sourceMap.terms);
    return null;
  },

  getPosts(locale: Locale): LocalizedPost[] {
    return [
      postFromFile(locale, "status-updates-to-delivery-intelligence", sourceMap.postStatus),
      postFromFile(locale, "rethink-delivery-job-ai", sourceMap.postRethink),
      postFromFile(locale, "5-signs-delivery-model-is-breaking", sourceMap.postSigns),
    ];
  },

  getPost(locale: Locale, slug: string): LocalizedPost | null {
    const posts = this.getPosts(locale);
    return posts.find((post) => post.slug === slug) ?? null;
  },

  getDynamicSlugs(): DynamicEntry[] {
    return [
      { slug: "privacy-policy", kind: "page" },
      { slug: "terms-of-service", kind: "page" },
      { slug: "status-updates-to-delivery-intelligence", kind: "post" },
      { slug: "rethink-delivery-job-ai", kind: "post" },
      { slug: "5-signs-delivery-model-is-breaking", kind: "post" },
    ];
  },
};
