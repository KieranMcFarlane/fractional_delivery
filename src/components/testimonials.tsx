"use client";

import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";

import type { Locale } from "@/lib/types";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  companyName: string;
  companyLogo?: string;
  colorClass: string;
};

function TestimonialItem({ quote, name, role, companyName, companyLogo, colorClass, locale }: Testimonial & { locale: Locale }) {
  const [isClamped, setIsClamped] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    if (el.scrollHeight > el.clientHeight) setShowButton(true);
  }, [quote]);

  return (
    <div className="flex flex-col rounded-[2rem] border bg-card p-10 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className={`${colorClass} mb-6`}>
        <Quote className="h-10 w-10 opacity-20" />
      </div>
      <div className="mb-8 flex flex-grow flex-col items-start gap-2">
        <p
          ref={textRef}
          className={`testimonial-text text-xl leading-relaxed italic text-foreground transition-all duration-300 md:text-2xl ${
            isClamped ? "line-clamp-6" : ""
          }`}
        >
          {quote}
        </p>
        {showButton ? (
          <button
            onClick={() => setIsClamped((prev) => !prev)}
            className="mt-2 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-blue/80"
          >
            {isClamped ? (locale === "fr" ? "Lire plus" : "Read more") : locale === "fr" ? "Lire moins" : "Read less"}
          </button>
        ) : null}
      </div>
      <div className="mt-auto flex flex-col gap-1">
        <span className="font-semibold text-foreground">
          {name}, <span className="font-normal text-muted-foreground">{role}</span>
        </span>
        {companyLogo ? (
          <div className="mt-1">
            <img src={companyLogo} alt={companyName} className="h-7 w-auto object-contain object-left opacity-70 grayscale mix-blend-multiply" />
          </div>
        ) : (
          <span className="text-sm font-medium text-muted-foreground">{companyName}</span>
        )}
      </div>
    </div>
  );
}

const copy: Record<Locale, { badge: string; title: string; items: Testimonial[] }> = {
  en: {
    badge: "TESTIMONIALS",
    title: "What clients say",
    items: [
      {
        quote:
          '"Camille was an outstanding Delivery Lead on the Recce app. She brought clarity, structure, and calm leadership to a fast-moving project and kept communication flowing across stakeholders."',
        name: "Jim Irving",
        role: "CEO",
        companyName: "Recce",
        colorClass: "text-brand-blue",
      },
      {
        quote:
          '"The diagnostic was eye-opening. We identified bottlenecks we did not even know existed and saw a significant increase in delivery velocity."',
        name: "Marcus T.",
        role: "Head of Product",
        companyName: "ThirtyThree",
        companyLogo: "/images/media__1773645534353.png",
        colorClass: "text-brand-orange",
      },
      {
        quote:
          '"The fractional model is the perfect bridge for us. We get senior delivery expertise each week without the overhead of a full-time hire."',
        name: "Sarah L.",
        role: "CEO",
        companyName: "ISU",
        companyLogo: "/images/isu.png",
        colorClass: "text-brand-green",
      },
    ],
  },
  fr: {
    badge: "TÉMOIGNAGES",
    title: "Ce que disent mes clients",
    items: [
      {
        quote:
          '"Camille a apporté clarté, structure et leadership calme sur un projet en mouvement rapide, avec une communication fluide entre toutes les parties prenantes."',
        name: "Jim Irving",
        role: "CEO",
        companyName: "Recce",
        colorClass: "text-brand-blue",
      },
      {
        quote:
          '"Le diagnostic a été très révélateur. Nous avons identifié des blocages invisibles et constaté une nette hausse de la vélocité delivery."',
        name: "Marcus T.",
        role: "Head of Product",
        companyName: "ThirtyThree",
        companyLogo: "/images/media__1773645534353.png",
        colorClass: "text-brand-orange",
      },
      {
        quote:
          '"Le modèle fractionné est parfait pour nous. Nous bénéficions d’un niveau senior chaque semaine sans supporter le coût d’un poste à temps plein."',
        name: "Sarah L.",
        role: "CEO",
        companyName: "ISU",
        companyLogo: "/images/isu.png",
        colorClass: "text-brand-green",
      },
    ],
  },
};

export function Testimonials({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <section id="testimonials" className="container border-t border-border/40 py-24 md:py-32">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="mb-4 inline-flex w-fit items-center rounded-full border border-transparent bg-brand-blue/20 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-brand-blue">
            {t.badge}
          </div>
          <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl">{t.title}</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item) => (
            <TestimonialItem key={`${item.name}-${item.companyName}`} {...item} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
