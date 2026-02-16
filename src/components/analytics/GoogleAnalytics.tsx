"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import {
  GA_MEASUREMENT_ID,
  shouldEnableAnalytics,
  trackPageView,
} from "@/lib/analytics";

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousPathRef = useRef<string | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    setIsEnabled(shouldEnableAnalytics());
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const query = searchParams?.toString();
    const normalizedPathname = pathname ?? "/";
    const path = `${normalizedPathname}${query ? `?${query}` : ""}`;
    if (previousPathRef.current === path) {
      return;
    }

    const referrer = previousPathRef.current
      ? `${window.location.origin}${previousPathRef.current}`
      : document.referrer || undefined;

    const timer = window.setTimeout(() => {
      trackPageView(path, {
        title: document.title,
        referrer,
      });
      previousPathRef.current = path;
    }, 0);

    return () => window.clearTimeout(timer);
  }, [isEnabled, pathname, searchParams]);

  if (!isEnabled || !GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
            window.__gaConfigured = true;
          `,
        }}
      />
      <Script
        id="google-analytics"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
