import { cache } from "react";

import { mockContent } from "@/lib/mock-content";
import type { DynamicEntry, Locale, LocalizedPage, LocalizedPost, SiteSettings } from "@/lib/types";

export const getSiteSettings = cache(async (locale: Locale): Promise<SiteSettings> => {
  return mockContent.getSettings(locale);
});

export const getHomePage = cache(async (locale: Locale): Promise<LocalizedPage> => {
  return mockContent.getHome(locale);
});

export const getPageBySlug = cache(async (locale: Locale, slug: string): Promise<LocalizedPage | null> => {
  return mockContent.getPage(locale, slug);
});

export const getBlogPage = cache(async (locale: Locale): Promise<LocalizedPage> => {
  const page = mockContent.getPage(locale, "blog");
  if (!page) throw new Error(`Missing blog page for locale: ${locale}`);
  return page;
});

export const getPosts = cache(async (locale: Locale): Promise<LocalizedPost[]> => {
  return mockContent.getPosts(locale);
});

export const getPostBySlug = cache(async (locale: Locale, slug: string): Promise<LocalizedPost | null> => {
  return mockContent.getPost(locale, slug);
});

export const getDynamicSlugs = cache(async (): Promise<DynamicEntry[]> => {
  return mockContent.getDynamicSlugs();
});
