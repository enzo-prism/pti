import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Inter, Montserrat } from "next/font/google";
import { Providers } from "@/components/providers";
import {
  SITE_NAME,
  BUSINESS_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  CANONICAL_SITE_URL,
  DEFAULT_LOCALE,
  buildAbsoluteUrl,
} from "@/lib/siteMetadata";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_SITE_URL),
  title: SITE_NAME,
  description: BUSINESS_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_NAME,
    description: BUSINESS_DESCRIPTION,
    url: CANONICAL_SITE_URL,
    siteName: SITE_NAME,
    locale: DEFAULT_LOCALE,
    type: "website",
    images: [
      {
        url: buildAbsoluteUrl(DEFAULT_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: BUSINESS_DESCRIPTION,
    images: [
      {
        url: buildAbsoluteUrl(DEFAULT_OG_IMAGE),
        alt: SITE_NAME,
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-256.png", sizes: "256x256", type: "image/png" },
    ],
    apple: [{ url: "/favicon-256.png", sizes: "256x256", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_NAME,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${montserrat.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Suspense fallback={null}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
