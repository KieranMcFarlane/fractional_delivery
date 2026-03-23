import type { Metadata } from "next";

import { RichText } from "@/components/rich-text";
import { SiteShell } from "@/components/site-shell";
import { getHomePage } from "@/lib/directus";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomePage("fr");
  return buildMetadata("fr", "/", home);
}

export default async function HomeFrPage() {
  const home = await getHomePage("fr");

  return (
    <SiteShell locale="fr" pathname="/fr" localeLinks={{ en: "/", fr: "/fr" }}>
      <section id="home">
        <RichText html={home.bodyRichtext} />
      </section>
    </SiteShell>
  );
}
