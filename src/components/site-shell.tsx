import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getSiteSettings } from "@/lib/directus";
import type { Locale } from "@/lib/types";

type SiteShellProps = {
  locale: Locale;
  pathname: string;
  localeLinks?: Partial<Record<Locale, string>>;
  children: React.ReactNode;
};

export async function SiteShell({ locale, pathname, localeLinks, children }: SiteShellProps) {
  const settings = await getSiteSettings(locale);

  return (
    <>
      <Header locale={locale} pathname={pathname} localeLinks={localeLinks} settings={settings} />
      <main className="w-full flex-1">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
