import { NextResponse } from "next/server";

type ResendError = {
  message?: string;
  name?: string;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID;
  const topicId = process.env.RESEND_NEWSLETTER_TOPIC_ID;

  if (!apiKey) {
    return NextResponse.json({ error: "Resend is not configured." }, { status: 500 });
  }

  let payload: { email?: string; locale?: string; consentAccepted?: boolean } = {};
  try {
    payload = (await request.json()) as { email?: string; locale?: string; consentAccepted?: boolean };
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const email = (payload.email ?? "").trim().toLowerCase();
  const locale = payload.locale === "fr" ? "fr" : "en";
  const consentAccepted = payload.consentAccepted === true;

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!consentAccepted) {
    return NextResponse.json({ error: "Please accept the Privacy Policy." }, { status: 400 });
  }

  const body: {
    email: string;
    unsubscribed: boolean;
    properties: Record<string, string>;
    segments?: Array<{ id: string }>;
    topics?: Array<{ id: string; subscription: "opt_in" }>;
  } = {
    email,
    unsubscribed: false,
    properties: {
      source: "footer_newsletter",
      locale,
      consent_accepted: "yes",
    },
  };

  if (segmentId) body.segments = [{ id: segmentId }];
  if (topicId) body.topics = [{ id: topicId, subscription: "opt_in" }];

  const response = await fetch("https://api.resend.com/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": "fractional-delivery-newsletter",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (response.status === 409) {
    return NextResponse.json({ ok: true, existing: true });
  }

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as ResendError;
    return NextResponse.json(
      { error: errorData.message ?? "Unable to subscribe right now. Please try again." },
      { status: response.status },
    );
  }

  return NextResponse.json({ ok: true });
}
