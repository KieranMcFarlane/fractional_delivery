"use client";

import Link from "next/link";
import { useState } from "react";

import { LOCALES, swapLocalePath } from "@/lib/i18n";
import type { Locale, SiteSettings } from "@/lib/types";

type MobileHeaderMenuProps = {
  locale: Locale;
  pathname: string;
  settings: SiteSettings;
  localeLinks?: Partial<Record<Locale, string>>;
  orderedNavItems: SiteSettings["navItems"];
};

export function MobileHeaderMenu({ locale, pathname, settings, localeLinks, orderedNavItems }: MobileHeaderMenuProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setMobileOpen((value) => !value)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/60 text-foreground md:hidden"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
        aria-controls="mobile-menu"
      >
        <span className="text-lg leading-none">{mobileOpen ? "×" : "☰"}</span>
      </button>
      {mobileOpen ? (
        <div
          id="mobile-menu"
          className="absolute left-0 right-0 top-full z-50 mt-3 rounded-b-2xl border border-border/40 bg-background/98 px-4 pb-4 pt-3 shadow-xl backdrop-blur"
        >
          <nav className="flex flex-col gap-3 text-sm font-medium">
            {orderedNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-foreground/70 transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center gap-2 border-t border-border/40 pt-4 text-[12px] font-bold tracking-widest">
            {LOCALES.map((item, idx) => {
              const href = localeLinks?.[item] ?? swapLocalePath(pathname, item);
              const active = item === locale;
              return (
                <span key={item} className="inline-flex items-center gap-2">
                  {idx > 0 ? <span className="text-muted-foreground/30">|</span> : null}
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}
                  >
                    {item.toUpperCase()}
                  </Link>
                </span>
              );
            })}
          </div>
          <Link
            href={settings.ctaHref}
            onClick={() => setMobileOpen(false)}
            className="mt-4 inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-[16px] font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {settings.ctaLabel}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
