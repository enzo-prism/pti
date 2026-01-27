import type { Metadata, Viewport } from "next";
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
    images: [buildAbsoluteUrl(DEFAULT_OG_IMAGE)],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: BUSINESS_DESCRIPTION,
    images: [buildAbsoluteUrl(DEFAULT_OG_IMAGE)],
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
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
