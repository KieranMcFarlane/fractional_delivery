"use client";

import { useEffect, useState } from "react";

import type { Locale } from "@/lib/types";

const words: Record<Locale, string[]> = {
  en: ["Asana", "Jira", "Notion", "ClickUp", "Linear"],
  fr: ["Asana", "Jira", "Notion", "ClickUp", "Linear"],
};

export function ExperiencedWith({ locale }: { locale: Locale }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "sliding-out" | "hidden-bottom">("idle");
  const labels = words[locale];

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase("sliding-out");

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % labels.length);
        setPhase("hidden-bottom");

        setTimeout(() => {
          setPhase("idle");
        }, 50);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [labels.length]);

  let transformClass = "translate-y-0 opacity-100";
  let transitionClass = "transition-all duration-500 ease-in-out";

  if (phase === "sliding-out") {
    transformClass = "-translate-y-full opacity-0";
  } else if (phase === "hidden-bottom") {
    transformClass = "translate-y-full opacity-0";
    transitionClass = "transition-none";
  }

  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-2 text-base sm:text-lg">
      <span className="pt-1 font-medium text-muted-foreground">{locale === "fr" ? "Expérimentée avec :" : "Experienced with:"}</span>
      <div className="relative flex h-[32px] w-32 items-center overflow-hidden font-serif text-2xl font-bold text-brand-orange">
        <span className={`absolute inset-y-0 flex items-center transform ${transitionClass} ${transformClass}`}>
          {labels[currentIndex]}
        </span>
      </div>
    </div>
  );
}
