"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { HotjarAnalytics } from "@/components/analytics/HotjarAnalytics";
import { GA_MEASUREMENT_ID, isCanonicalProductionHost } from "@/lib/analytics";
import { captureLeadAttribution } from "@/lib/leadAttribution";
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
    captureLeadAttribution();

    const handleConsentChange = (event: Event) => {
      const nextConsent = (event as CustomEvent<AnalyticsConsent>).detail;
      if (GA_MEASUREMENT_ID) {
        (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = nextConsent === "declined";
        window.gtag?.("consent", "update", { analytics_storage: nextConsent === "accepted" ? "granted" : "denied" });
      }
      setConsent(nextConsent);
      captureLeadAttribution();
    };

    window.addEventListener(ANALYTICS_CONSENT_EVENT, handleConsentChange);
    return () =>
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, handleConsentChange);
  }, []);

  if (!onCanonicalHost) return null;

  return (
    <>
      {/* GA and Hotjar gate themselves; Vercel Analytics needs the same
          canonical-host check so preview deployments are not tracked. */}
      {consent !== "declined" ? <GoogleAnalytics /> : null}
      {consent === "accepted" ? <><Analytics /><HotjarAnalytics /></> : null}
    </>
  );
}
