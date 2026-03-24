import Image from "next/image";
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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href={localizePath(locale, "/")} className="flex items-center gap-3">
          <Image src="/vector.png" alt="Fractional Delivery logo" width={82} height={56} priority />
          <span className="text-lg font-semibold tracking-tight transition-colors hover:text-brand-blue">{settings.brandName}</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {settings.navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-foreground/60 transition-colors hover:text-foreground/80">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 border-l border-border/60 pl-4 text-xs font-bold tracking-widest md:flex">
          {LOCALES.map((item) => {
            const href = localeLinks?.[item] ?? swapLocalePath(pathname, item);
            const active = item === locale;
            return (
              <Link
                key={item}
                href={href}
                className={active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}
              >
                {item.toUpperCase()}
              </Link>
            );
          })}
          </div>
          <Link
            href={settings.ctaHref}
            className="hidden h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:inline-flex"
          >
            {settings.ctaLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
