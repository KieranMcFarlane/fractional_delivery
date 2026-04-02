import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { CookiebotScripts } from "@/components/cookiebot-scripts";
import { TooltipProvider } from "@/components/ui/tooltip";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
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

  return (
    <html lang="en" className={cn("h-full", "antialiased", dmSans.variable, instrumentSerif.variable, "font-sans", geist.variable)}>
      <head>
        <CookiebotScripts googleTagId={googleTagId} clarityId="w49oisyyx4" />
      </head>
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
