"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import { localizePath } from "@/lib/i18n";
import type { Locale, SiteSettings } from "@/lib/types";

type FooterProps = {
  locale: Locale;
  settings: SiteSettings;
};

type FooterCopy = {
  navigationTitle: string;
  focusAreasTitle: string;
  newsletterTitle: string;
  roleTitle: string;
  brandDescription: string;
  navigationLinks: Array<{ label: string; href: string }>;
  focusAreaLinks: Array<{ label: string; href: string }>;
  blogLabel: string;
  rightsReserved: string;
  locationLabel: string;
  emailLabel: string;
  linkedinLabel: string;
  privacyLabel: string;
  termsLabel: string;
};

const copy: Record<Locale, FooterCopy> = {
  en: {
    navigationTitle: "Navigation",
    focusAreasTitle: "Focus Areas",
    newsletterTitle: "Newsletter",
    roleTitle: "Delivery & Operations Lead",
    brandDescription:
      "Providing senior delivery leadership and tech operations consultancy for high-growth product, AI and engineering teams.",
    navigationLinks: [
      { label: "Why work with me", href: "/#why-me" },
      { label: "How I work", href: "/#services" },
      { label: "Investment", href: "/#investment" },
    ],
    focusAreaLinks: [
      { label: "Delivery Diagnostic", href: "/#investment" },
      { label: "Fractional Leadership", href: "/#investment" },
      { label: "Operating Models", href: "/#investment" },
      { label: "Discovery Call", href: "/#discovery-call" },
    ],
    blogLabel: "Blog & Briefs",
    rightsReserved: "© 2026 Fractional Delivery. All rights reserved.",
    locationLabel: "Based in Leamington Spa, UK",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    privacyLabel: "Privacy Policy",
    termsLabel: "Terms of Service",
  },
  fr: {
    navigationTitle: "Navigation",
    focusAreasTitle: "Axes d'intervention",
    newsletterTitle: "Newsletter",
    roleTitle: "Delivery & Operations Lead",
    brandDescription:
      "Leadership senior en delivery et conseil en opérations tech pour les équipes produit, IA et engineering à forte croissance.",
    navigationLinks: [
      { label: "Pourquoi travailler avec moi", href: "/#why-me" },
      { label: "Comment je travaille", href: "/#services" },
      { label: "Investissement", href: "/#investment" },
    ],
    focusAreaLinks: [
      { label: "Diagnostic de Delivery", href: "/#investment" },
      { label: "Leadership Fractionné", href: "/#investment" },
      { label: "Modèles Opérationnels", href: "/#investment" },
      { label: "Discovery Call", href: "/#discovery-call" },
    ],
    blogLabel: "Blog & Briefs",
    rightsReserved: "© 2026 Fractional Delivery. Tous droits réservés.",
    locationLabel: "Basée à Leamington Spa, Royaume-Uni",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    privacyLabel: "Confidentialité",
    termsLabel: "Conditions",
  },
};

export function Footer({ locale, settings }: FooterProps) {
  const t = copy[locale];
  const blogHref = localizePath(locale, "/blog");
  const privacyHref = localizePath(locale, "/privacy-policy");
  const termsHref = localizePath(locale, "/terms-of-service");

  return (
    <footer className="border-t bg-muted/40 pb-8 pt-16 text-muted-foreground">
      <div className="container mx-auto max-w-[1200px]">
        <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4" itemScope itemType="https://schema.org/Person">
            <div className="font-sans text-lg font-semibold tracking-tight text-foreground" itemProp="name">
              Camille Wilhelm McFarlane
            </div>
            <p className="text-sm font-medium text-brand-blue" itemProp="jobTitle">
              {t.roleTitle}
            </p>
            <p className="max-w-xs text-xs leading-relaxed">{t.brandDescription}</p>
            <div className="flex items-center gap-4 pt-2 text-xs">
              <a
                href={`mailto:${settings.contactEmail}`}
                className="flex items-center gap-2 transition-colors hover:text-brand-blue"
                itemProp="email"
              >
                <Image
                  src="https://cdn.hugeicons.com/icons/mail-02-stroke-rounded.svg"
                  alt=""
                  width={14}
                  height={14}
                  unoptimized
                  aria-hidden="true"
                  className="h-3.5 w-3.5"
                />
                {t.emailLabel}
              </a>
              <a
                href={settings.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-brand-blue"
              >
                {t.linkedinLabel}
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-foreground">{t.navigationTitle}</h4>
            <ul className="space-y-3 text-sm">
              {t.navigationLinks.map((item) => (
                <li key={item.label}>
                  <Link href={localizePath(locale, item.href)} className="transition-colors hover:text-brand-blue">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={blogHref} className="transition-colors hover:text-brand-blue">
                  {t.blogLabel}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-foreground">{t.focusAreasTitle}</h4>
            <ul className="space-y-3 text-sm">
              {t.focusAreaLinks.map((item) => (
                <li key={item.label}>
                  <Link href={localizePath(locale, item.href)} className="transition-colors hover:text-brand-blue">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-foreground">{t.newsletterTitle}</h4>
            <div data-supascribe-embed-id="905066645628" data-supascribe-subscribe />
            <Script
              src="https://js.supascribe.com/v1/loader/b2nQm9wgMLWsDqQydwXvtHZwvSD2.js"
              strategy="afterInteractive"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-10 text-[11px] md:flex-row">
          <p className="text-muted-foreground">{t.rightsReserved}</p>
          <div className="flex items-center gap-6">
            <Link href={privacyHref} className="transition-colors hover:text-foreground">
              {t.privacyLabel}
            </Link>
            <Link href={termsHref} className="transition-colors hover:text-foreground">
              {t.termsLabel}
            </Link>
            <span className="hidden text-muted-foreground/30 md:inline">|</span>
            <p className="italic text-muted-foreground">{t.locationLabel}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
