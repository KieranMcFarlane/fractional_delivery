import Image from "next/image";
import type { Locale } from "@/lib/types";

type AboutCopy = {
  label: string;
  name: string;
  intro: string;
  bio: string;
  whyTitle: string;
  bullets: Array<{ text: string; icon: string; tone: string }>;
  aiNote: string;
  based: string;
  working: string;
  languages: string;
};

const copy: Record<Locale, AboutCopy> = {
  en: {
    label: "About",
    name: "Camille | Delivery & Operations Lead",
    intro:
      "I help product and engineering teams scale delivery without losing clarity or momentum. Not by adding more process, but by building the right operational foundations for where the team is heading next.",
    bio: "I've spent the last 8 years working inside fast-growing digital, AI and tech teams. Agencies, international organisations, and high-growth startups. The contexts vary, but the challenge is usually the same: delivery that worked brilliantly at one size stops working at the next. I've sat in the delivery seat, not just advised from outside it.",
    whyTitle: "Why teams choose me",
    bullets: [
      {
        text: "Worked inside scaling teams, not just advised them",
        icon: "layers-01",
        tone: "bg-brand-orange/10 text-brand-orange",
      },
      {
        text: "No framework to sell - practical structure around your reality",
        icon: "shield-01",
        tone: "bg-brand-blue/10 text-brand-blue",
      },
      {
        text: "Built for the growth gap where informal delivery breaks",
        icon: "book-open-01",
        tone: "bg-brand-green/10 text-brand-green",
      },
    ],
    aiNote:
      "I use AI tooling to surface delivery risks earlier - estimation drift, recurring blockers, coordination friction - so problems are caught before they compound.",
    based: "Based in the UK",
    working: "Working across Europe",
    languages: "English & French",
  },
  fr: {
    label: "À propos",
    name: "Camille | Responsable Delivery & Opérations",
    intro:
      "J'aide les équipes produit et ingénierie à faire évoluer leur delivery sans perdre en clarté ni en élan. Non pas en ajoutant plus de processus, mais en construisant les bases opérationnelles adaptées à l'étape suivante.",
    bio: "J'ai passé les 8 dernières années au cœur d'équipes digitales, IA et tech en pleine croissance. Agences, organisations internationales, startups à forte croissance. Les contextes varient, mais le défi est presque toujours le même : une delivery qui fonctionnait brillamment à une certaine taille cesse de fonctionner à la suivante. J'ai occupé le terrain, je ne me suis pas contentée de conseiller depuis l'extérieur.",
    whyTitle: "Pourquoi les équipes me choisissent",
    bullets: [
      {
        text: "J'ai travaillé au cœur des équipes en croissance, pas seulement en conseil externe",
        icon: "layers-01",
        tone: "bg-brand-orange/10 text-brand-orange",
      },
      {
        text: "Aucun framework à vendre - une structure pragmatique autour de votre réalité",
        icon: "shield-01",
        tone: "bg-brand-blue/10 text-brand-blue",
      },
      {
        text: "Conçu pour le moment où la croissance fait craquer la delivery informelle",
        icon: "book-open-01",
        tone: "bg-brand-green/10 text-brand-green",
      },
    ],
    aiNote:
      "J'utilise l'IA pour détecter plus tôt les risques delivery - dérives d'estimation, bloqueurs récurrents, frictions de coordination - afin d'agir avant qu'ils ne s'accumulent.",
    based: "Basée au Royaume-Uni",
    working: "Interventions dans toute l'Europe",
    languages: "Anglais & Français",
  },
};

export function AboutSection({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const rowIconClass = "h-3.5 w-3.5 text-muted-foreground";

  return (
    <section id="about" className="container border-t border-border/40 py-24 md:py-32">
      <div className="mx-auto max-w-[1100px] rounded-2xl border bg-card p-8 shadow-sm md:p-12 lg:p-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-14">
          <div className="relative text-left">
            <div className="mb-6 inline-flex items-center rounded-full border border-transparent bg-brand-orange/20 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-brand-orange">
              {t.label}
            </div>

            <div className="mb-6 flex items-center gap-4">
              <h2 className="text-3xl leading-tight md:text-4xl">{t.name}</h2>
            </div>

            <p className="text-xl font-medium leading-relaxed text-foreground">{t.intro}</p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{t.bio}</p>
            <div className="mt-6 max-w-[16rem] overflow-hidden rounded-xl bg-card lg:absolute lg:bottom-0 lg:right-0 lg:mt-0">
              <Image
                src="/images/camm/about-frame.png"
                alt="Camille Wilhelm portrait"
                width={320}
                height={320}
                className="hidden h-auto w-full object-cover"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col gap-8 rounded-xl border border-border/10 bg-muted/30 p-8">
            <div>
              <h3 className="mb-6 text-2xl">{t.whyTitle}</h3>
              <ul className="space-y-5 text-sm leading-relaxed text-muted-foreground">
              {t.bullets.map((bullet) => (
                <li key={bullet.text} className="flex items-start gap-4">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${bullet.tone}`}>
                    <img
                      src={`https://cdn.hugeicons.com/icons/${bullet.icon}-stroke-rounded.svg`}
                      alt=""
                      aria-hidden="true"
                      className="h-5 w-5"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <span>{bullet.text}</span>
                </li>
              ))}
              </ul>
            </div>

            <div className="mt-5 border-t border-border/70 pt-4">
              <p className="text-sm leading-relaxed text-muted-foreground">{t.aiNote}</p>
            </div>

            <div className="mt-5 space-y-2.5 border-t border-border/70 pt-4">
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-foreground">
                <img
                  src="https://cdn.hugeicons.com/icons/location-01-stroke-rounded.svg"
                  alt=""
                  aria-hidden="true"
                  className={rowIconClass}
                  loading="lazy"
                  decoding="async"
                />
                <span>{t.based}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-foreground">
                <img
                  src="https://cdn.hugeicons.com/icons/globe-02-stroke-rounded.svg"
                  alt=""
                  aria-hidden="true"
                  className={rowIconClass}
                  loading="lazy"
                  decoding="async"
                />
                <span>{t.working}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-foreground">
                <img
                  src="https://cdn.hugeicons.com/icons/language-square-stroke-rounded.svg"
                  alt=""
                  aria-hidden="true"
                  className={rowIconClass}
                  loading="lazy"
                  decoding="async"
                />
                <span>{t.languages}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
