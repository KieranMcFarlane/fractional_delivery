import { NextResponse } from "next/server";

type MailerLiteError = {
  message?: string;
  errors?: Record<string, string[]>;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const apiKey = process.env.MAILERLITE_API;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!apiKey) {
    return NextResponse.json({ error: "MailerLite is not configured." }, { status: 500 });
  }

  let payload: { email?: string; locale?: string } = {};
  try {
    payload = (await request.json()) as { email?: string; locale?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const email = (payload.email ?? "").trim().toLowerCase();
  const locale = payload.locale === "fr" ? "fr" : "en";

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const body: {
    email: string;
    groups?: string[];
    fields: Record<string, string>;
  } = {
    email,
    fields: {
      source: "delivery_diagnostic_ebook",
      locale,
    },
  };

  if (groupId) body.groups = [groupId];

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

