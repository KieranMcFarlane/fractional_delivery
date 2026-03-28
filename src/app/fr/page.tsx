import type { Metadata } from "next";

import { generateLocalizedHomeMetadata, renderLocalizedHomePage } from "@/app/_shared/localized-pages";

export const revalidate = 300;
export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return generateLocalizedHomeMetadata("fr");
}

export default async function HomeFrPage() {
  return renderLocalizedHomePage("fr");
}
