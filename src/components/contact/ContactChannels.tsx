"use client";

import { ChevronRight, Mail, Phone } from "lucide-react";
import { PHONE_NUMBER, PHONE_NUMBER_TEL } from "@/lib/constants";
import { SITE_CONTACT_EMAIL } from "@/lib/siteMetadata";
import { trackPhoneCallClick, trackSelectCta } from "@/lib/analytics";

const channelClasses =
  "group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 sm:gap-4 sm:p-5";
const iconWrapClasses =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white sm:h-12 sm:w-12";
const labelClasses =
  "block text-xs font-semibold uppercase tracking-[0.18em] text-gray-500";
const valueClasses =
  "mt-0.5 block text-base font-bold text-gray-900 sm:text-lg";
const helperClasses = "block text-xs text-gray-500 sm:text-sm";
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
        <span className={iconWrapClasses}>
          <Phone className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className={labelClasses}>Call us</span>
          <span className={valueClasses}>{PHONE_NUMBER}</span>
          <span className={helperClasses}>Tap to call, or dial directly</span>
        </span>
        <ChevronRight className={chevronClasses} aria-hidden="true" />
      </a>

      <a
        href={`mailto:${SITE_CONTACT_EMAIL}`}
        onClick={() => trackSelectCta("email_contact", "contact_page")}
        className={channelClasses}
      >
        <span className={iconWrapClasses}>
          <Mail className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className={labelClasses}>Email us</span>
          <span className={`${valueClasses} break-all`}>
            {SITE_CONTACT_EMAIL}
          </span>
          <span className={helperClasses}>Tap to email, or copy the address</span>
        </span>
        <ChevronRight className={chevronClasses} aria-hidden="true" />
      </a>
    </div>
  );
};
