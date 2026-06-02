"use client";

import { FormEvent, useState } from "react";
import { Loader2, Mail } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { localizePath } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { cn } from "@/lib/utils";

type NewsletterSignupProps = {
  locale: Locale;
};

const copy = {
  en: {
    placeholder: "email@address.com",
    cta: "Subscribe",
    sending: "Subscribing",
    success: "You're on the list.",
    error: "Unable to subscribe right now. Please try again.",
    consent: "I agree to receive email updates from Fractional Delivery.",
    consentError: "Please accept the Privacy Policy.",
    privacyPrefix: "Read the",
    privacyLabel: "Privacy Policy",
  },
  fr: {
    placeholder: "email@adresse.com",
    cta: "S'inscrire",
    sending: "Inscription",
    success: "Vous êtes inscrit.",
    error: "Impossible de vous inscrire pour le moment. Réessayez.",
    consent: "J'accepte de recevoir des emails de Fractional Delivery.",
    consentError: "Veuillez accepter la Politique de confidentialité.",
    privacyPrefix: "Consultez la",
    privacyLabel: "Politique de confidentialité",
  },
} as const;

export function NewsletterSignup({ locale }: NewsletterSignupProps) {
  const t = copy[locale];
  const privacyHref = localizePath(locale, "/privacy-policy");
  const [email, setEmail] = useState("");
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ kind: "idle" | "success" | "error"; message: string }>({
    kind: "idle",
    message: "",
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    if (!consentAccepted) {
      setStatus({ kind: "error", message: t.consentError });
      return;
    }

    setIsSubmitting(true);
    setStatus({ kind: "idle", message: "" });

    try {
      const response = await fetch("/api/newsletter-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale, consentAccepted }),
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setStatus({ kind: "error", message: data.error ?? t.error });
        return;
      }

      setEmail("");
      setConsentAccepted(false);
      setStatus({ kind: "success", message: t.success });
    } catch {
      setStatus({ kind: "error", message: t.error });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      <div className="flex min-w-0 items-center gap-2 rounded-md border border-border bg-background px-3 focus-within:ring-2 focus-within:ring-ring/40">
        <Mail className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={t.placeholder}
          className="h-10 min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>

      <label className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
          checked={consentAccepted}
          onChange={(event) => setConsentAccepted(event.target.checked)}
          required
        />
        <span>{t.consent}</span>
      </label>

      <Button type="submit" size="lg" className="h-10 w-full cursor-pointer" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            {t.sending}
          </>
        ) : (
          t.cta
        )}
      </Button>

      {status.kind !== "idle" ? (
        <p
          className={cn(
            "text-xs leading-relaxed",
            status.kind === "success" ? "text-brand-green" : "text-destructive",
          )}
        >
          {status.message}
        </p>
      ) : null}

      <p className="text-xs leading-relaxed text-muted-foreground">
        {t.privacyPrefix}{" "}
        <Link href={privacyHref} className="underline transition-colors hover:text-foreground">
          {t.privacyLabel}
        </Link>
        .
      </p>
    </form>
  );
}
