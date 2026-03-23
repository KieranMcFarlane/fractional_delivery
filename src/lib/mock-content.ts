import type { DynamicEntry, Locale, LocalizedPage, LocalizedPost, SiteSettings } from "@/lib/types";

type ByLocale<T> = Record<Locale, T>;

const settings: ByLocale<SiteSettings> = {
  en: {
    brandName: "Fractional Delivery",
    contactEmail: "camille@fractionaldelivery.com",
    linkedinUrl: "https://linkedin.com/in/camillemcfarlane",
    ctaLabel: "Get in Touch",
    ctaHref: "/#contact",
    navItems: [
      { label: "How I help", href: "/#how-i-help" },
      { label: "How I work", href: "/#services" },
      { label: "Who I work with", href: "/#who-i-help" },
      { label: "Insights", href: "/blog" },
    ],
    footerText: "Delivery strategy and operations support for scaling teams.",
    legalLinks: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
  fr: {
    brandName: "Fractional Delivery",
    contactEmail: "camille@fractionaldelivery.com",
    linkedinUrl: "https://linkedin.com/in/camillemcfarlane",
    ctaLabel: "Me contacter",
    ctaHref: "/fr#contact",
    navItems: [
      { label: "Expertise", href: "/fr#how-i-help" },
      { label: "Méthode", href: "/fr#services" },
      { label: "Clients", href: "/fr#who-i-help" },
      { label: "Ressources", href: "/fr/blog" },
    ],
    footerText: "Conseil en opérations et delivery pour équipes en croissance.",
    legalLinks: [
      { label: "Confidentialité", href: "/fr/privacy-policy" },
      { label: "Conditions", href: "/fr/terms-of-service" },
    ],
  },
};

const pages: LocalizedPage[] = [
  {
    locale: "en",
    slug: "home",
    type: "home",
    title: "Delivery Operations Consultant",
    seoTitle: "Delivery Operations Consultant | Camille Wilhelm McFarlane",
    seoDescription:
      "Helping digital, AI and tech teams scale delivery through operational structure and delivery intelligence.",
    bodyRichtext: `<section class="space-y-6"><p class="text-xs tracking-[0.2em] uppercase text-orange-600">Delivery & Operations Lead</p><h1 class="font-serif text-5xl leading-tight">Scale delivery without chaos.</h1><p class="text-lg text-zinc-700">I help leadership teams rebuild delivery operating systems when growth starts to break flow, clarity, and momentum.</p></section><section class="grid gap-4 md:grid-cols-3 pt-8"><article class="rounded-xl border p-6"><h2 class="font-semibold">Delivery Diagnostic</h2><p class="text-sm text-zinc-600 mt-2">Find bottlenecks, hidden risk, and structural drag.</p></article><article class="rounded-xl border p-6"><h2 class="font-semibold">Fractional Leadership</h2><p class="text-sm text-zinc-600 mt-2">Senior delivery leadership without full-time overhead.</p></article><article class="rounded-xl border p-6"><h2 class="font-semibold">Operating Models</h2><p class="text-sm text-zinc-600 mt-2">Build a model that scales with your next stage.</p></article></section>`,
  },
  {
    locale: "fr",
    slug: "home",
    type: "home",
    title: "Consultante en Opérations de Livraison",
    seoTitle: "Consultante en Opérations de Livraison | Camille Wilhelm McFarlane",
    seoDescription:
      "Aider les équipes digitales, IA et tech à passer à l'échelle grâce à une structure opérationnelle et à l'intelligence de livraison.",
    bodyRichtext: `<section class="space-y-6"><p class="text-xs tracking-[0.2em] uppercase text-orange-600">Responsable Delivery & Opérations</p><h1 class="font-serif text-5xl leading-tight">Scaler sans chaos.</h1><p class="text-lg text-zinc-700">J'accompagne les équipes dirigeantes pour remettre de la clarté, du rythme et de la prévisibilité dans la delivery.</p></section><section class="grid gap-4 md:grid-cols-3 pt-8"><article class="rounded-xl border p-6"><h2 class="font-semibold">Diagnostic Delivery</h2><p class="text-sm text-zinc-600 mt-2">Identifier les points de blocage et les risques cachés.</p></article><article class="rounded-xl border p-6"><h2 class="font-semibold">Leadership Fractionné</h2><p class="text-sm text-zinc-600 mt-2">Leadership delivery senior sans recrutement à plein temps.</p></article><article class="rounded-xl border p-6"><h2 class="font-semibold">Modèle Opérationnel</h2><p class="text-sm text-zinc-600 mt-2">Un système de delivery conçu pour votre phase de croissance.</p></article></section>`,
  },
  {
    locale: "en",
    slug: "privacy-policy",
    type: "legal",
    title: "Privacy Policy",
    seoTitle: "Privacy Policy | Fractional Delivery",
    seoDescription: "Privacy Policy for fractionaldelivery.com",
    bodyRichtext: "<h1 class='font-serif text-4xl mb-6'>Privacy Policy</h1><p>This website stores only essential analytics and contact form data.</p>",
  },
  {
    locale: "fr",
    slug: "privacy-policy",
    type: "legal",
    title: "Politique de confidentialité",
    seoTitle: "Confidentialité | Fractional Delivery",
    seoDescription: "Politique de confidentialité de fractionaldelivery.com",
    bodyRichtext: "<h1 class='font-serif text-4xl mb-6'>Politique de confidentialité</h1><p>Ce site ne collecte que les données essentielles d'analyse et de contact.</p>",
  },
  {
    locale: "en",
    slug: "terms-of-service",
    type: "legal",
    title: "Terms of Service",
    seoTitle: "Terms of Service | Fractional Delivery",
    seoDescription: "Terms of Service for fractionaldelivery.com",
    bodyRichtext: "<h1 class='font-serif text-4xl mb-6'>Terms of Service</h1><p>By using this website, you accept the terms and applicable UK law.</p>",
  },
  {
    locale: "fr",
    slug: "terms-of-service",
    type: "legal",
    title: "Conditions d'utilisation",
    seoTitle: "Conditions | Fractional Delivery",
    seoDescription: "Conditions d'utilisation de fractionaldelivery.com",
    bodyRichtext: "<h1 class='font-serif text-4xl mb-6'>Conditions d'utilisation</h1><p>En utilisant ce site, vous acceptez les conditions d'utilisation applicables.</p>",
  },
];

const posts: LocalizedPost[] = [
  {
    locale: "en",
    slug: "status-updates-to-delivery-intelligence",
    title: "From status updates to delivery intelligence",
    excerpt:
      "If your weekly update still starts with completed, in progress and blocked tasks, you are narrating delivery, not managing it.",
    seoTitle: "From status updates to delivery intelligence - Fractional Delivery",
    seoDescription:
      "Stop narrating delivery and start managing it with delivery intelligence.",
    contentRichtext:
      "<p>Delivery intelligence starts when signals are designed before reporting rituals are defined.</p>",
    publishedAt: "2026-03-18T00:00:00.000Z",
    authorName: "Camille Wilhelm McFarlane",
  },
  {
    locale: "fr",
    slug: "status-updates-to-delivery-intelligence",
    title: "Du reporting au pilotage de delivery",
    excerpt:
      "Si votre point hebdomadaire commence encore par les tâches terminées, vous racontez la delivery au lieu de la piloter.",
    seoTitle: "Du reporting au pilotage de delivery - Fractional Delivery",
    seoDescription:
      "Passez d'un reporting rétrospectif à un pilotage proactif de la delivery.",
    contentRichtext:
      "<p>Le pilotage de delivery commence quand les signaux précèdent les statuts hebdomadaires.</p>",
    publishedAt: "2026-03-18T00:00:00.000Z",
    authorName: "Camille Wilhelm McFarlane",
  },
  {
    locale: "en",
    slug: "rethink-delivery-job-ai",
    title: "Your job title hasn't changed. Your job has.",
    excerpt:
      "AI is changing delivery leadership from status chasing to system design.",
    seoTitle: "Your job title hasn't changed. Your job has. - Fractional Delivery",
    seoDescription: "How AI is transforming delivery leadership roles.",
    contentRichtext: "<p>The role shift is subtle until governance and decision loops break all at once.</p>",
    publishedAt: "2026-03-18T00:00:00.000Z",
    authorName: "Camille Wilhelm McFarlane",
  },
  {
    locale: "fr",
    slug: "rethink-delivery-job-ai",
    title: "Votre page de poste n'a pas changé. Votre rôle, si.",
    excerpt:
      "L'IA transforme la gestion de delivery: moins de suivi de statut, plus de design de système.",
    seoTitle: "Votre page de poste n'a pas changé. Votre rôle, si. - Fractional Delivery",
    seoDescription: "Comment l'IA transforme le rôle des responsables delivery.",
    contentRichtext: "<p>Le changement de rôle devient visible quand les anciens rituels ne produisent plus d'alignement.</p>",
    publishedAt: "2026-03-18T00:00:00.000Z",
    authorName: "Camille Wilhelm McFarlane",
  },
  {
    locale: "en",
    slug: "5-signs-delivery-model-is-breaking",
    title: "5 Signs Your Delivery Model Is Breaking As You Grow",
    excerpt:
      "Growth can hide structural delivery debt until velocity collapses.",
    seoTitle: "5 Signs Your Delivery Model Is Breaking As You Grow - Fractional Delivery",
    seoDescription:
      "Key indicators that your delivery model is breaking under scale pressure.",
    contentRichtext:
      "<p>When headcount grows faster than coordination design, output quality and pace both decline.</p>",
    publishedAt: "2026-03-18T00:00:00.000Z",
    authorName: "Camille Wilhelm McFarlane",
  },
  {
    locale: "fr",
    slug: "5-signs-delivery-model-is-breaking",
    title: "5 signes que votre modèle de delivery craque sous la croissance",
    excerpt:
      "La croissance révèle vite les limites d'un modèle de delivery non adapté.",
    seoTitle: "5 signes que votre modèle de delivery craque sous la croissance - Fractional Delivery",
    seoDescription:
      "Les signaux d'un modèle de delivery qui ne tient plus l'échelle.",
    contentRichtext:
      "<p>Quand les effectifs augmentent sans architecture de coordination, la vélocité s'érode.</p>",
    publishedAt: "2026-03-18T00:00:00.000Z",
    authorName: "Camille Wilhelm McFarlane",
  },
];

export const mockContent = {
  getSettings(locale: Locale): SiteSettings {
    return settings[locale];
  },
  getHome(locale: Locale): LocalizedPage {
    const home = pages.find((page) => page.locale === locale && page.slug === "home");
    if (!home) throw new Error(`Missing mock home content for locale: ${locale}`);
    return home;
  },
  getPage(locale: Locale, slug: string): LocalizedPage | null {
    return pages.find((page) => page.locale === locale && page.slug === slug && page.slug !== "home") ?? null;
  },
  getPosts(locale: Locale): LocalizedPost[] {
    return posts
      .filter((post) => post.locale === locale)
      .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  },
  getPost(locale: Locale, slug: string): LocalizedPost | null {
    return posts.find((post) => post.locale === locale && post.slug === slug) ?? null;
  },
  getDynamicSlugs(): DynamicEntry[] {
    const pageSlugs = new Set(
      pages
        .filter((page) => page.slug !== "home")
        .map((page) => page.slug),
    );
    const postSlugs = new Set(posts.map((post) => post.slug));

    return [
      ...Array.from(pageSlugs).map((slug) => ({ slug, kind: "page" as const })),
      ...Array.from(postSlugs).map((slug) => ({ slug, kind: "post" as const })),
    ];
  },
};
