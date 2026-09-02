"use client";

import { openCookiePreferences } from "@/lib/consent";

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className="inline-flex min-h-11 items-center text-sm text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#06243f]"
    >
      Cookie Preferences
    </button>
  );
}
