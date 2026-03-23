import Link from "next/link";

import type { SiteSettings } from "@/lib/types";

type FooterProps = {
  settings: SiteSettings;
};

export function Footer({ settings }: FooterProps) {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-semibold">{settings.brandName}</p>
          <p className="mt-2 text-sm text-zinc-600">{settings.footerText}</p>
        </div>
        <div className="text-sm text-zinc-600">
          <p className="font-medium text-zinc-900">Contact</p>
          <a className="mt-2 block hover:text-zinc-900" href={`mailto:${settings.contactEmail}`}>
            {settings.contactEmail}
          </a>
          <a
            className="mt-1 block hover:text-zinc-900"
            href={settings.linkedinUrl}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
        <div className="text-sm text-zinc-600">
          <p className="font-medium text-zinc-900">Legal</p>
          {settings.legalLinks.map((item) => (
            <Link key={item.href} href={item.href} className="mt-2 block hover:text-zinc-900">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
