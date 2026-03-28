"use client";

import type { FormEvent } from "react";

import Image from "next/image";
import Link from "next/link";

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
  newsletterText: string;
  newsletterPlaceholder: string;
  newsletterButton: string;
  roleTitle: string;
  brandDescription: string;
  navigationLinks: Array<{ label: string; href: string }>;
  focusAreaLinks: Array<{ label: string; href: string }>;
  blogLabel: string;
  rightsReserved: string;
  locationLabel: string;
  emailLabel: string;
  linkedinLabel: string;
};

const copy: Record<Locale, FooterCopy> = {
  en: {
    navigationTitle: "Navigation",
    focusAreasTitle: "Focus Areas",
    newsletterTitle: "Newsletter",
    newsletterText: "Monthly signals and practical delivery patterns for growing teams.",
    newsletterPlaceholder: "email@address.com",
    newsletterButton: "Subscribe to the Brief",
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
  },
  fr: {
    navigationTitle: "Navigation",
    focusAreasTitle: "Axes d'intervention",
    newsletterTitle: "Newsletter",
    newsletterText: "Signaux mensuels et patterns delivery pour les équipes en croissance.",
    newsletterPlaceholder: "email@address.com",
    newsletterButton: "S'abonner au Brief",
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
  },
};

function onNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  window.alert("Subscribed! Welcome to the Brief.");
}

export function Footer({ locale, settings }: FooterProps) {
  const t = copy[locale];
  const blogHref = localizePath(locale, "/blog");

  return (
    <footer className="border-t bg-muted/40 pb-8 pt-16 text-muted-foreground">
      <div className="container mx-auto max-w-[1200px]">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
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
                <Image
                  src="https://cdn.hugeicons.com/icons/linkedin-02-stroke-rounded.svg"
                  alt=""
                  width={14}
                  height={14}
                  unoptimized
                  aria-hidden="true"
                  className="h-3.5 w-3.5"
                />
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
            <p className="text-xs italic leading-relaxed">{t.newsletterText}</p>
            <form className="flex flex-col gap-2 pt-2" onSubmit={onNewsletterSubmit}>
              <input
                type="email"
                placeholder={t.newsletterPlaceholder}
                className="flex h-9 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              />
              <button
                type="submit"
                className="inline-flex h-9 items-center justify-center rounded-md bg-brand-blue px-4 text-[11px] font-bold text-white transition-colors hover:opacity-90"
              >
                {t.newsletterButton}
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 text-[11px] md:flex-row">
          <p className="text-muted-foreground">{t.rightsReserved}</p>
          <div className="flex items-center gap-6">
            {settings.legalLinks.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ))}
            <span className="hidden text-muted-foreground/30 md:inline">|</span>
            <p className="italic text-muted-foreground">{t.locationLabel}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
