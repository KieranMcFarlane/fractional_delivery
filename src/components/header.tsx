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
  const navOrder = ["how-i-help", "who-i-help", "services", "blog"];
  const orderedNavItems = [...settings.navItems].sort((a, b) => {
    const getRank = (href: string) => {
      const idx = navOrder.findIndex((key) => href.includes(key));
      return idx === -1 ? Number.MAX_SAFE_INTEGER : idx;
    };
    return getRank(a.href) - getRank(b.href);
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href={localizePath(locale, "/")} className="flex items-center gap-3">
          <Image
            src="/vector.png"
            alt="Fractional Delivery logo"
            width={160}
            height={80}
            className="h-[2.5rem] w-auto"
            priority
          />
          <span className="sr-only">{settings.brandName}</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {orderedNavItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-foreground/60 transition-colors hover:text-foreground/80">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 border-l border-border/60 pl-4 text-[12px] font-bold tracking-widest md:mr-[6px] md:flex">
            {LOCALES.map((item, idx) => {
              const href = localeLinks?.[item] ?? swapLocalePath(pathname, item);
              const active = item === locale;
              return (
                <span key={item} className="inline-flex items-center gap-2">
                  {idx > 0 ? <span className="text-muted-foreground/30">|</span> : null}
                  <Link href={href} className={active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}>
                    {item.toUpperCase()}
                  </Link>
                </span>
              );
            })}
          </div>
          <Link
            href={settings.ctaHref}
            className="hidden h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-[16px] font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 md:inline-flex"
          >
            {settings.ctaLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
