import { mockContent } from "@/lib/mock-content";
import type { DynamicEntry, Locale, LocalizedPage, LocalizedPost, SiteSettings } from "@/lib/types";

export async function getSiteSettings(locale: Locale): Promise<SiteSettings> {
  return mockContent.getSettings(locale);
}

export async function getHomePage(locale: Locale): Promise<LocalizedPage> {
  return mockContent.getHome(locale);
}

export async function getPageBySlug(locale: Locale, slug: string): Promise<LocalizedPage | null> {
  return mockContent.getPage(locale, slug);
}

export async function getBlogPage(locale: Locale): Promise<LocalizedPage> {
  const page = mockContent.getPage(locale, "blog");
  if (!page) throw new Error(`Missing blog page for locale: ${locale}`);
  return page;
}

export async function getPosts(locale: Locale): Promise<LocalizedPost[]> {
  return mockContent.getPosts(locale);
}

export async function getPostBySlug(locale: Locale, slug: string): Promise<LocalizedPost | null> {
  return mockContent.getPost(locale, slug);
}

export async function getDynamicSlugs(): Promise<DynamicEntry[]> {
  return mockContent.getDynamicSlugs();
}
