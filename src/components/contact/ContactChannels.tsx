"use client";

import { ChevronRight, Mail, Phone } from "lucide-react";
import { PHONE_NUMBER, PHONE_NUMBER_TEL } from "@/lib/constants";
import { SITE_CONTACT_EMAIL } from "@/lib/siteMetadata";
import { trackPhoneCallClick, trackSelectCta } from "@/lib/analytics";

const channelClasses =
  "group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 sm:p-5";
const iconWrapClasses =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white sm:h-11 sm:w-11";
const labelClasses =
  "flex-1 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500";
// Value sits on its own full-width row and never wraps; the size scales only
// where the card is wide enough to keep the longest value (the email) on a
// single line.
const valueClasses =
  "mt-3 block whitespace-nowrap text-sm font-bold text-gray-900 sm:text-base lg:text-lg";
const helperClasses = "mt-1 block text-xs text-gray-500 sm:text-sm";
const chevronClasses =
  "h-5 w-5 shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-primary";

export const ContactChannels = () => {
  return (
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
      <a
        href={`tel:${PHONE_NUMBER_TEL}`}
        onClick={() => trackPhoneCallClick("contact_page")}
        className={channelClasses}
      >
        <div className="flex items-center gap-3">
          <span className={iconWrapClasses}>
            <Phone className="h-5 w-5" />
          </span>
          <span className={labelClasses}>Call us</span>
          <ChevronRight className={chevronClasses} aria-hidden="true" />
        </div>
        <span className={valueClasses}>{PHONE_NUMBER}</span>
        <span className={helperClasses}>Tap to call, or dial directly</span>
      </a>

      <a
        href={`mailto:${SITE_CONTACT_EMAIL}`}
        onClick={() => trackSelectCta("email_contact", "contact_page")}
        className={channelClasses}
      >
        <div className="flex items-center gap-3">
          <span className={iconWrapClasses}>
            <Mail className="h-5 w-5" />
          </span>
          <span className={labelClasses}>Email us</span>
          <ChevronRight className={chevronClasses} aria-hidden="true" />
        </div>
        <span className={valueClasses}>{SITE_CONTACT_EMAIL}</span>
        <span className={helperClasses}>Tap to email, or copy the address</span>
      </a>
    </div>
  );
};
