"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import {
  GA_MEASUREMENT_ID,
  shouldEnableAnalytics,
  trackPageView,
} from "@/lib/analytics";

const NAVIGATION_EVENT_NAME = "pti:history-change";

const getCurrentPath = () =>
  `${window.location.pathname}${window.location.search}`;

const dispatchNavigationEvent = () => {
  window.dispatchEvent(new Event(NAVIGATION_EVENT_NAME));
};

export function GoogleAnalytics() {
  const previousPathRef = useRef<string | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    setIsEnabled(shouldEnableAnalytics());
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const originalPushState = window.history.pushState.bind(
      window.history,
    ) as History["pushState"];
    const originalReplaceState = window.history.replaceState.bind(
      window.history,
    ) as History["replaceState"];

    const trackCurrentPage = () => {
      const path = getCurrentPath();
      if (previousPathRef.current === path) {
        return undefined;
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
    };

    window.history.pushState = ((...args: Parameters<History["pushState"]>) => {
      originalPushState(...args);
      dispatchNavigationEvent();
    }) as History["pushState"];

    window.history.replaceState = ((
      ...args: Parameters<History["replaceState"]>
    ) => {
      originalReplaceState(...args);
      dispatchNavigationEvent();
    }) as History["replaceState"];

    window.addEventListener(NAVIGATION_EVENT_NAME, trackCurrentPage);
    window.addEventListener("popstate", trackCurrentPage);

    const cleanupInitialTrack = trackCurrentPage();

    return () => {
      cleanupInitialTrack?.();
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener(NAVIGATION_EVENT_NAME, trackCurrentPage);
      window.removeEventListener("popstate", trackCurrentPage);
    };
  }, [isEnabled]);

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
