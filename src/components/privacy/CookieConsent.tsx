"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  COOKIE_BANNER_SPACE_PROPERTY,
  cookieBannerSpacePx,
  getAnalyticsConsent,
  OPEN_COOKIE_PREFERENCES_EVENT,
  saveAnalyticsConsent,
  shouldFocusCookieBanner,
  type AnalyticsConsent,
} from "@/lib/consent";

export function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [consent, setConsent] = useState<AnalyticsConsent>("unset");
  const [openedBy, setOpenedBy] = useState<"first-visit" | "preferences">(
    "first-visit",
  );
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bannerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const storedConsent = getAnalyticsConsent();
    setConsent(storedConsent);
    setIsOpen(storedConsent === "unset");
    setOpenedBy("first-visit");

    const openPreferences = () => {
      setOpenedBy("preferences");
      setIsOpen(true);
    };
    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);
    return () =>
      window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);
  }, []);

  useEffect(() => {
    if (isOpen && shouldFocusCookieBanner(openedBy)) {
      headingRef.current?.focus();
    }
  }, [isOpen, openedBy]);

  useEffect(() => {
    if (!isOpen) {
      document.documentElement.style.removeProperty(
        COOKIE_BANNER_SPACE_PROPERTY,
      );
      return;
    }

    const banner = bannerRef.current;
    if (!banner) return;

    const syncSpace = () => {
      document.documentElement.style.setProperty(
        COOKIE_BANNER_SPACE_PROPERTY,
        cookieBannerSpacePx(banner.getBoundingClientRect().height),
      );
    };

    syncSpace();
    const observer = new ResizeObserver(syncSpace);
    observer.observe(banner);
    window.addEventListener("resize", syncSpace);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncSpace);
      document.documentElement.style.removeProperty(
        COOKIE_BANNER_SPACE_PROPERTY,
      );
    };
  }, [isOpen]);

  const chooseConsent = (choice: Exclude<AnalyticsConsent, "unset">) => {
    const isWithdrawingConsent = consent === "accepted" && choice === "declined";
    saveAnalyticsConsent(choice);
    setConsent(choice);
    setIsOpen(false);
    if (isWithdrawingConsent) {
      window.location.reload();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <aside
      ref={bannerRef}
      data-cookie-banner=""
      aria-label="Cookie preferences"
      className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[70] mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:inset-x-6 sm:p-6"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="text-lg font-bold text-slate-950 outline-none"
          >
            Your Privacy Choices
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            PTI uses optional analytics cookies from Google Analytics, Hotjar,
            and Vercel to understand how the site is used. They stay off unless
            you accept. Essential site features work either way. Read our{" "}
            <Link
              href="/privacy-policy"
              className="font-semibold text-primary underline underline-offset-4 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
          {consent !== "unset" ? (
            <p className="mt-2 text-xs font-medium text-slate-600">
              Current choice: {consent === "accepted" ? "accepted" : "declined"}
            </p>
          ) : null}
        </div>
        <div className="flex w-full shrink-0 flex-col-reverse gap-2 sm:w-auto sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={() => chooseConsent("declined")}
            className="min-h-11 w-full sm:w-auto"
          >
            Decline Analytics
          </Button>
          <Button
            type="button"
            onClick={() => chooseConsent("accepted")}
            className="min-h-11 w-full sm:w-auto"
          >
            Accept Analytics
          </Button>
        </div>
      </div>
    </aside>
  );
}
