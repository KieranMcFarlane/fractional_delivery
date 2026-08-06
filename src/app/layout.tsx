import type { Metadata } from "next";
import { Hanken_Grotesk, Newsreader } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://fractionaldelivery.com"),
  applicationName: "Fractional Delivery",
  title: {
    default: "Fractional Delivery",
    template: "%s | Fractional Delivery",
  },
  description: "Delivery operations consulting for scaling AI and digital teams.",
  openGraph: {
    type: "website",
    siteName: "Fractional Delivery",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleTagId = "G-F2DFYZP4XZ";
  const enableCookieYes = process.env.NODE_ENV === "production";

  return (
    <html lang="en" className={cn("h-full", "antialiased", hankenGrotesk.variable, newsreader.variable, "font-sans")}>
      <head>
        {enableCookieYes ? (
          <Script
            id="cookieyes"
            src="https://cdn-cookieyes.com/client_data/ea5f550da8c02cfb50c4b53e516bf129/script.js"
            strategy="beforeInteractive"
          />
        ) : null}
        <Script
          id="google-consent-defaults"
          data-cookieconsent="ignore"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag("consent", "default", {
  ad_personalization: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  analytics_storage: "denied",
  functionality_storage: "denied",
  personalization_storage: "denied",
  security_storage: "granted",
  wait_for_update: 500
});
gtag("set", "ads_data_redaction", true);
gtag("set", "url_passthrough", false);`,
          }}
        />
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`} strategy="afterInteractive" />
        <Script
          id="google-tag-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleTagId}');`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
