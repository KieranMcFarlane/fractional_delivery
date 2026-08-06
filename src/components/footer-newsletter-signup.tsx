"use client";

import { FormEvent, useState } from "react";

import type { Locale } from "@/lib/types";

const copy = {
  en: {
    placeholder: "Enter your email",
    cta: "Subscribe",
    sending: "Subscribing...",
    success: "You're subscribed.",
    error: "Unable to subscribe right now. Please try again.",
  },
  fr: {
    placeholder: "Votre adresse email",
    cta: "S'inscrire",
    sending: "Inscription...",
    success: "Vous êtes inscrit.",
    error: "Impossible de vous inscrire pour le moment. Réessayez.",
  },
} as const;

export function FooterNewsletterSignup({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ kind: "idle" | "success" | "error"; message: string }>({
    kind: "idle",
    message: "",
  });
  const canSubmit = email.trim().length > 0 && !isSubmitting;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    setStatus({ kind: "idle", message: "" });

    try {
      const response = await fetch("/api/ebook-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          locale,
          source: "footer_newsletter",
          termsAccepted: true,
          marketingConsent: true,
        }),
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
    <form className="space-y-3" onSubmit={onSubmit}>
      <input
        type="email"
        placeholder={t.placeholder}
        className="h-12 w-full rounded-md border border-border bg-white px-4 text-sm text-foreground outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button
        type="submit"
        disabled={!canSubmit}
        className="inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-md bg-brand-orange px-5 text-sm font-bold text-white transition-colors hover:bg-brand-orange/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? t.sending : t.cta}
      </button>
      {status.kind !== "idle" ? (
        <p className={`text-xs leading-relaxed ${status.kind === "success" ? "text-brand-blue" : "text-red-600"}`}>
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
