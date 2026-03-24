import type { Locale } from "@/lib/types";

export const LOCALES: Locale[] = ["en", "fr"];

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

export function localizePath(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const withoutTrailingSlash = normalized.length > 1 && normalized.endsWith("/")
    ? normalized.slice(0, -1)
    : normalized;

  if (withoutTrailingSlash === "/") {
    return localePrefix(locale) || "/";
  }

  return `${localePrefix(locale)}${withoutTrailingSlash}`;
}

export function swapLocalePath(pathname: string, targetLocale: Locale): string {
  const chunks = pathname.split("/").filter(Boolean);

  if (chunks[0] === "fr") {
    chunks.shift();
  }

  const basePath = chunks.length === 0 ? "/" : `/${chunks.join("/")}`;
  return localizePath(targetLocale, basePath);
}

export function stripEnglishPrefix(pathname: string): string | null {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3) || "/";
  return null;
}
