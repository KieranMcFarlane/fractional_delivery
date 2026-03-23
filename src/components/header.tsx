import Link from "next/link";

import { LOCALES, localizePath, swapLocalePath } from "@/lib/i18n";
import type { Locale, SiteSettings } from "@/lib/types";

type HeaderProps = {
  locale: Locale;
  pathname: string;
  settings: SiteSettings;
  localeLinks?: Partial<Record<Locale, string>>;
};

export function Header({ locale, pathname, settings, localeLinks }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link href={localizePath(locale, "/")} className="text-lg font-semibold tracking-tight">
          {settings.brandName}
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-zinc-600 md:flex">
          {settings.navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-zinc-900 transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-xs font-medium">
          {LOCALES.map((item) => {
            const href = localeLinks?.[item] ?? swapLocalePath(pathname, item);
            const active = item === locale;
            return (
              <Link
                key={item}
                href={href}
                className={`rounded-md border px-2 py-1 ${active ? "border-zinc-900 text-zinc-900" : "border-zinc-300 text-zinc-500"}`}
              >
                {item.toUpperCase()}
              </Link>
            );
          })}
          <Link
            href={settings.ctaHref}
            className="ml-2 hidden rounded-md bg-orange-500 px-3 py-2 text-white transition-colors hover:bg-orange-600 md:inline-block"
          >
            {settings.ctaLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
