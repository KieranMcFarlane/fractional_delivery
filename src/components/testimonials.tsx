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

    const frame = window.requestAnimationFrame(() => {
      setShowButton(el.scrollHeight > el.clientHeight);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [quote]);

  return (
    <div className="flex flex-col rounded-[1.1rem] border border-[#e6e9ef] bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className={`${colorClass} mb-4`}>
        <Quote className="h-8 w-8 opacity-20" />
      </div>
      <div className="mb-6 flex flex-grow flex-col items-start gap-2">
        <p
          ref={textRef}
          className={`testimonial-text text-[16px] leading-[1.62] text-[#3f4a59] transition-all duration-300 ${
            isClamped ? "line-clamp-6" : ""
          }`}
        >
          {quote}
        </p>
        {showButton ? (
          <button
            onClick={() => setIsClamped((prev) => !prev)}
            className="mt-2 cursor-pointer text-sm font-semibold text-brand-blue transition-colors hover:text-brand-blue/80"
          >
            {isClamped ? (locale === "fr" ? "Lire plus" : "Read more") : locale === "fr" ? "Lire moins" : "Read less"}
          </button>
        ) : null}
      </div>
      <div className="mt-auto flex flex-col gap-1">
        <span className="text-[14.5px] font-bold text-[#15233b]">
          {name}, <span className="font-normal text-muted-foreground">{role}</span>
        </span>
        {companyLogo ? (
          <div className="mt-1">
            <img src={companyLogo} alt={companyName} className="h-7 w-auto object-contain object-left opacity-70 grayscale mix-blend-multiply" />
          </div>
        ) : (
          <span className="text-[13px] font-medium text-muted-foreground">{companyName}</span>
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
          '"Camille is an extremely diligent and effective delivery lead, she is a sharp thinker with a very quick mind. Camille is not only a dedicated and reliable PM but also an inspiring and motivating person to be around, which allows her to drive teams to deliver successful digital projects. I look forward to working together again one day!"',
        name: "Pia Redway",
        role: "Associate Marketing Director, International Commercial Strategy",
        companyName: "Vertex Pharmaceuticals Inc",
        colorClass: "text-brand-pink",
      },
      {
        quote:
          "\"Camille is a very pleasant person to work with. She is very positive, dynamic and also really professional. She makes her best to understand client's needs and priorities. She has very good communication skills and knows well how to advise a brand in the way to deliver results in term of digital communication. This is a real pleasure to have Camille as interlocutor and partner.\"",
        name: "Estelle D'Hubert",
        role: "International PR Director",
        companyName: "289 Consulting",
        colorClass: "text-brand-yellow",
      },
    ],
  },
  fr: {
    badge: "TÉMOIGNAGES",
    title: "Ce que disent mes clients",
    items: [
      {
        quote:
          '"Camille a été une excellente Delivery Lead sur l’application Recce. Elle a apporté clarté, structure et un leadership serein à un projet en mouvement rapide, tout en maintenant une communication fluide entre toutes les parties prenantes."',
        name: "Jim Irving",
        role: "CEO",
        companyName: "Recce",
        colorClass: "text-brand-blue",
      },
      {
        quote:
          '"Camille est une responsable delivery extrêmement rigoureuse et efficace. Elle a l’esprit vif et une grande rapidité d’analyse. Camille n’est pas seulement une PM fiable et engagée, c’est aussi une personne inspirante et motivante à côtoyer, ce qui lui permet de faire avancer les équipes et de livrer des projets digitaux réussis. J’espère retravailler avec elle un jour !"',
        name: "Pia Redway",
        role: "Associate Marketing Director, International Commercial Strategy",
        companyName: "Vertex Pharmaceuticals Inc",
        colorClass: "text-brand-pink",
      },
      {
        quote:
          '"Camille est une personne très agréable avec qui travailler. Elle est très positive, dynamique et vraiment professionnelle. Elle fait de son mieux pour comprendre les besoins et les priorités du client. Elle possède d’excellentes compétences en communication et sait très bien conseiller une marque pour obtenir des résultats en communication digitale. C’est un vrai plaisir d’avoir Camille comme interlocutrice et partenaire."',
        name: "Estelle D'Hubert",
        role: "Directrice internationale des relations presse",
        companyName: "289 Consulting",
        colorClass: "text-brand-yellow",
      },
    ],
  },
};

export function Testimonials({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <section id="testimonials" className="container border-t border-border/40 bg-[#f5f6f9] py-20 md:py-28">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-14">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="mb-0 inline-flex w-fit items-center rounded-full border border-transparent bg-[#fdece6] px-2.5 py-0.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#e9694b]">
            {t.badge}
          </div>
          <h2 className="text-balance font-sans text-[2.45rem] font-semibold leading-[1.08] tracking-[-0.022em] text-[#15233b] md:text-[42px]">{t.title}</h2>
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
