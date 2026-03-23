import { localizePath } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export function normalizedPath(locale: Locale, slug?: string): string {
  if (!slug || slug === "home") {
    return "/";
  }

  if (slug === "blog") {
    return "/blog";
  }

  return `/${slug}`;
}

export function localizedNormalizedPath(locale: Locale, slug?: string): string {
  return localizePath(locale, normalizedPath(locale, slug));
}
