import type { ComponentType } from "react";
import { Activity, CalendarX, Gauge, GitBranch, TrendingDown, ZapOff } from "lucide-react";

import type { Locale } from "@/lib/types";

type Challenge = {
  title: string;
  body: string;
  accent: string;
  glow: string;
  Icon: ComponentType<{ className?: string }>;
};

const copy: Record<Locale, { badge: string; title: string; intro: string; cards: Challenge[] }> = {
  en: {
    badge: "THE CHALLENGES",
    title: "When teams usually call me",
    intro: "When growth starts to feel like chaos, it's usually because the delivery systems haven't scaled with the headcount.",
    cards: [
      {
        title: "Stalling Velocity",
        body: "Delivery keeps slowing down as the team grows and complexity increases.",
        accent: "bg-brand-orange/10 text-brand-orange",
        glow: "bg-brand-orange/10 group-hover:bg-brand-orange/20",
        Icon: TrendingDown,
      },
      {
        title: "Slipping Roadmaps",
        body: "Deadlines are consistently missed and roadmaps slip every quarter.",
        accent: "bg-brand-blue/10 text-brand-blue",
        glow: "bg-brand-blue/10 group-hover:bg-brand-blue/20",
        Icon: CalendarX,
      },
      {
        title: "Outcome Friction",
        body: "Engineers feel busy and productive, but the actual business outcomes don't move.",
        accent: "bg-brand-green/10 text-brand-green",
        glow: "bg-brand-green/10 group-hover:bg-brand-green/20",
        Icon: Gauge,
      },
      {
        title: "Priority Overload",
        body: "Priorities change faster than work completes, leading to wasted effort.",
        accent: "bg-brand-pink/10 text-brand-pink",
        glow: "bg-brand-pink/10 group-hover:bg-brand-pink/20",
        Icon: ZapOff,
      },
      {
        title: "Fragile Scale",
        body: "Leadership wants to accelerate growth but isn't sure the delivery foundation can hold it.",
        accent: "bg-brand-yellow/10 text-brand-yellow",
        glow: "bg-brand-yellow/10 group-hover:bg-brand-yellow/20",
        Icon: GitBranch,
      },
    ],
  },
  fr: {
    badge: "LES DÉFIS",
    title: "Quand les équipes font appel à moi",
    intro: "Quand la croissance ressemble au chaos, c'est souvent parce que le système de delivery n'a pas suivi la montée en charge.",
    cards: [
      {
        title: "Vélocité qui ralentit",
        body: "La delivery ralentit à mesure que l'équipe grandit et que la complexité augmente.",
        accent: "bg-brand-orange/10 text-brand-orange",
        glow: "bg-brand-orange/10 group-hover:bg-brand-orange/20",
        Icon: TrendingDown,
      },
      {
        title: "Roadmaps qui glissent",
        body: "Les échéances sont régulièrement manquées et les roadmaps décalent chaque trimestre.",
        accent: "bg-brand-blue/10 text-brand-blue",
        glow: "bg-brand-blue/10 group-hover:bg-brand-blue/20",
        Icon: CalendarX,
      },
      {
        title: "Friction sur les résultats",
        body: "L'équipe est occupée, mais les résultats business ne bougent pas.",
        accent: "bg-brand-green/10 text-brand-green",
        glow: "bg-brand-green/10 group-hover:bg-brand-green/20",
        Icon: Gauge,
      },
      {
        title: "Surcharge de priorités",
        body: "Les priorités changent plus vite que le travail n'aboutit, avec beaucoup de gaspillage.",
        accent: "bg-brand-pink/10 text-brand-pink",
        glow: "bg-brand-pink/10 group-hover:bg-brand-pink/20",
        Icon: ZapOff,
      },
      {
        title: "Scale fragile",
        body: "Le leadership veut accélérer, mais doute de la solidité de la base delivery.",
        accent: "bg-brand-yellow/10 text-brand-yellow",
        glow: "bg-brand-yellow/10 group-hover:bg-brand-yellow/20",
        Icon: GitBranch,
      },
    ],
  },
};

export function BentoChallenges({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [first, ...rest] = t.cards;

  return (
    <section id="how-i-help" className="container border-t border-border/40 py-24 md:py-32">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 lg:gap-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center rounded-full border border-brand-orange/20 bg-brand-orange/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-brand-orange">
            {t.badge}
          </div>
          <h2 className="max-w-2xl text-balance text-3xl leading-tight md:text-4xl lg:text-5xl">{t.title}</h2>
          <p className="mt-2 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">{t.intro}</p>
        </div>

        <div className="grid auto-rows-[1fr] grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="group relative overflow-hidden rounded-[2rem] border bg-card p-8 transition-all hover:shadow-md md:p-10 lg:col-span-2">
            <div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-brand-orange/10 blur-3xl transition-colors duration-500 group-hover:bg-brand-orange/20"></div>
            <div className="relative z-10 flex h-full w-full flex-col justify-between md:w-3/4">
              <div className={`mb-8 flex h-14 w-14 items-center justify-center rounded-2xl ${first.accent}`}>
                <first.Icon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="mb-3 text-2xl md:text-3xl">{first.title}</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">{first.body}</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 text-brand-orange opacity-[0.03] transition-all duration-500 group-hover:scale-110 group-hover:opacity-[0.05]">
              <Activity className="h-80 w-80" />
            </div>
          </div>

          {rest.map((card) => (
            <div key={card.title} className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border bg-card p-8 transition-all hover:shadow-md md:p-10">
              <div className={`absolute h-48 w-48 rounded-full blur-3xl transition-colors duration-500 ${card.glow}`}></div>
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className={`mb-8 flex h-14 w-14 items-center justify-center rounded-2xl ${card.accent}`}>
                  <card.Icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="mb-3 text-2xl">{card.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{card.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
