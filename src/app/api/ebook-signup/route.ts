import { NextResponse } from "next/server";

type MailerLiteError = {
  message?: string;
  errors?: Record<string, string[]>;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const apiKey = process.env.MAILERLITE_API_KEY ?? process.env.MAILERLITE_API;
  const diagnosticGroupId = process.env.MAILERLITE_GROUP_DIAGNOSTIC ?? process.env.MAILERLITE_GROUP_ID;
  const newsletterGroupId = process.env.MAILERLITE_GROUP_NEWSLETTER;

  if (!apiKey) {
    return NextResponse.json({ error: "MailerLite is not configured." }, { status: 500 });
  }

  let payload: { email?: string; locale?: string; termsAccepted?: boolean; marketingConsent?: boolean } = {};
  try {
    payload = (await request.json()) as { email?: string; locale?: string; termsAccepted?: boolean; marketingConsent?: boolean };
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const email = (payload.email ?? "").trim().toLowerCase();
  const locale = payload.locale === "fr" ? "fr" : "en";
  const termsAccepted = payload.termsAccepted === true;
  const marketingConsent = payload.marketingConsent === true;

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!termsAccepted) {
    return NextResponse.json({ error: "Please accept the Terms of Service and Privacy Policy." }, { status: 400 });
  }

  const groups: string[] = [];
  if (diagnosticGroupId) groups.push(diagnosticGroupId);
  if (marketingConsent && newsletterGroupId) groups.push(newsletterGroupId);

  const body: {
    email: string;
    groups?: string[];
    fields: Record<string, string>;
  } = {
    email,
    fields: {
      source: "delivery_diagnostic_ebook",
      locale,
      terms_accepted: termsAccepted ? "yes" : "no",
      marketing_consent: marketingConsent ? "yes" : "no",
    },
  };

  if (groups.length > 0) body.groups = groups;

  const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as MailerLiteError;
    const fallback = "Unable to subscribe right now. Please try again.";
    const message = errorData.message ?? fallback;
    return NextResponse.json({ error: message, details: errorData.errors }, { status: response.status });
  }

  return NextResponse.json({ ok: true });
}
