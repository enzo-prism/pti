"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { HotjarAnalytics } from "@/components/analytics/HotjarAnalytics";
import { isCanonicalProductionHost } from "@/lib/analytics";
import {
  ANALYTICS_CONSENT_EVENT,
  getAnalyticsConsent,
  type AnalyticsConsent,
} from "@/lib/consent";

export function AnalyticsProviders() {
  const [consent, setConsent] = useState<AnalyticsConsent>("unset");
  const [onCanonicalHost, setOnCanonicalHost] = useState(false);

  useEffect(() => {
    setConsent(getAnalyticsConsent());
    setOnCanonicalHost(isCanonicalProductionHost());

    const handleConsentChange = (event: Event) => {
      const nextConsent = (event as CustomEvent<AnalyticsConsent>).detail;
      setConsent(nextConsent);
    };

    window.addEventListener(ANALYTICS_CONSENT_EVENT, handleConsentChange);
    return () =>
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, handleConsentChange);
  }, []);

  if (consent !== "accepted") {
    return null;
  }

  return (
    <>
      {/* GA and Hotjar gate themselves; Vercel Analytics needs the same
          canonical-host check so preview deployments are not tracked. */}
      {onCanonicalHost && <Analytics />}
      <GoogleAnalytics />
      <HotjarAnalytics />
    </>
  );
}
