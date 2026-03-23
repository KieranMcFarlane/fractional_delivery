export type Locale = "en" | "fr";

export type NavItem = {
  label: string;
  href: string;
};

export type SiteSettings = {
  brandName: string;
  contactEmail: string;
  linkedinUrl: string;
  ctaLabel: string;
  ctaHref: string;
  navItems: NavItem[];
  footerText: string;
  legalLinks: NavItem[];
};

export type SeoFields = {
  seoTitle: string;
  seoDescription: string;
  ogImage?: string | null;
};

export type LocalizedPage = SeoFields & {
  locale: Locale;
  slug: string;
  title: string;
  bodyRichtext: string;
  type: "home" | "legal" | "generic";
};

export type LocalizedPost = SeoFields & {
  locale: Locale;
  slug: string;
  title: string;
  excerpt: string;
  contentRichtext: string;
  publishedAt: string;
  authorName: string;
  coverImage?: string | null;
};

export type DynamicEntry = {
  slug: string;
  kind: "page" | "post";
};
