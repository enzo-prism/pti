"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import {
  GA_MEASUREMENT_ID,
  initializeAnalytics,
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

    initializeAnalytics();
  }, [isEnabled]);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const query = searchParams?.toString();
    const path = `${pathname}${query ? `?${query}` : ""}`;
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

  if (!isEnabled) {
    return null;
  }

  return (
    <Script
      id="google-tag-manager"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
    />
  );
}
