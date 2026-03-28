import type { Metadata } from "next";

import { generateLocalizedBlogMetadata, renderLocalizedBlogPage } from "@/app/_shared/localized-pages";

export const revalidate = 300;

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return generateLocalizedBlogMetadata("fr");
}

export default async function BlogFrPage() {
  return renderLocalizedBlogPage("fr");
}
