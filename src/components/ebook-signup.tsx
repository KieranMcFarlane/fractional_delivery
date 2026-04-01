"use client";

import { FormEvent, useState } from "react";

import type { Locale } from "@/lib/types";

type EbookSignupProps = {
  locale: Locale;
};

const copy = {
  en: {
    badge: "FREE RESOURCE",
    heading: "Download the free Delivery Diagnostic",
    description:
      "A focused guide to understanding your delivery health. Learn how to spot hidden friction signals before they break your roadmap.",
    placeholder: "Your email address",
    cta: "Get the guide",
    note: "I hate spam. You can unsubscribe at any time.",
    cardTitle: "The Delivery Diagnostic",
    success: "Guide sent. Check your inbox.",
    error: "Unable to subscribe right now. Please try again.",
  },
  fr: {
    badge: "RESSOURCE GRATUITE",
    heading: "Téléchargez le Guide Diagnostic de Delivery",
    description:
      "Une approche concrète pour évaluer la santé de votre delivery. Apprenez à identifier les signaux de friction avant qu'ils ne freinent votre roadmap.",
    placeholder: "Votre adresse email",
    cta: "Recevoir le guide",
    note: "Pas de spam. Désinscription à tout moment.",
    cardTitle: "Le Diagnostic de Delivery",
    success: "Guide envoyé. Consultez votre boîte mail.",
    error: "Impossible de vous inscrire pour le moment. Réessayez.",
  },
} as const;

export function EbookSignup({ locale }: EbookSignupProps) {
  const t = copy[locale];
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ kind: "idle" | "success" | "error"; message: string }>({
    kind: "idle",
    message: "",
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setStatus({ kind: "idle", message: "" });

    try {
      const response = await fetch("/api/ebook-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setStatus({ kind: "error", message: data.error ?? t.error });
        return;
      }

      setStatus({ kind: "success", message: t.success });
      setEmail("");
    } catch {
      setStatus({ kind: "error", message: t.error });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="ebook" className="container border-t border-border/40 py-24 md:py-32">
      <div className="relative mx-auto max-w-[1100px] overflow-hidden rounded-[3rem] bg-brand-blue shadow-2xl shadow-brand-blue/20">
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-white/5 to-transparent" />

        <div className="relative z-10 flex flex-col items-center gap-12 p-8 md:flex-row md:p-16">
          <div className="flex-1 text-white">
            <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              {t.badge}
            </div>
            <h2 className="mb-6 font-serif text-3xl leading-tight md:text-5xl">{t.heading}</h2>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-white/80">{t.description}</p>

            <form className="flex max-w-md flex-col gap-3 sm:flex-row" onSubmit={onSubmit}>
              <input
                type="email"
                placeholder={t.placeholder}
                className="h-12 w-full rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-12 shrink-0 items-center justify-center rounded-md border border-transparent bg-white px-8 text-sm font-bold text-brand-blue transition-colors hover:border-white hover:bg-brand-blue/10 hover:text-white disabled:opacity-70"
              >
                {isSubmitting ? "..." : t.cta}
              </button>
            </form>

            {status.kind !== "idle" ? (
              <p className={`mt-4 text-xs ${status.kind === "success" ? "text-white/90" : "text-red-100"}`}>{status.message}</p>
            ) : null}
            <p className="mt-4 text-[10px] italic leading-none text-white/40">{t.note}</p>
          </div>

          <div className="flex w-full justify-center md:w-auto">
            <div className="group relative">
              <div className="absolute inset-0 bg-white/20 opacity-50 blur-3xl transition-opacity group-hover:opacity-100" />
              <div className="relative flex h-64 w-48 -rotate-2 flex-col overflow-hidden rounded-lg border-r-4 border-brand-orange bg-white p-6 shadow-2xl transition-transform duration-500 group-hover:rotate-0 md:h-80 md:w-64">
                <div className="mb-4 h-1 w-12 bg-brand-blue" />
                <div className="mb-4 font-serif text-2xl text-brand-blue">{t.cardTitle}</div>
                <div className="mt-auto">
                  <div className="mb-2 h-2 w-full bg-slate-100" />
                  <div className="h-2 w-2/3 bg-slate-100" />
                </div>
                <div className="-mb-16 -mr-16 absolute bottom-0 right-0 h-32 w-32 rounded-full bg-brand-orange/5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

