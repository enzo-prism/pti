"use client";

import { Mail, Phone } from "lucide-react";
import { PHONE_NUMBER, PHONE_NUMBER_TEL } from "@/lib/constants";
import { SITE_CONTACT_EMAIL } from "@/lib/siteMetadata";
import { trackPhoneCallClick, trackSelectCta } from "@/lib/analytics";

const channelClasses =
  "group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2";
const iconWrapClasses =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white";
const labelClasses =
  "block text-xs font-semibold uppercase tracking-[0.18em] text-gray-500";

export const ContactChannels = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <a
        href={`tel:${PHONE_NUMBER_TEL}`}
        onClick={() => trackPhoneCallClick("contact_page")}
        className={channelClasses}
      >
        <span className={iconWrapClasses}>
          <Phone className="h-5 w-5" />
        </span>
        <span className="min-w-0">
          <span className={labelClasses}>Call us</span>
          <span className="mt-0.5 block text-lg font-bold text-gray-900">
            {PHONE_NUMBER}
          </span>
          <span className="text-sm text-gray-500">Tap to call, or dial directly</span>
        </span>
      </a>

      <a
        href={`mailto:${SITE_CONTACT_EMAIL}`}
        onClick={() => trackSelectCta("email_contact", "contact_page")}
        className={channelClasses}
      >
        <span className={iconWrapClasses}>
          <Mail className="h-5 w-5" />
        </span>
        <span className="min-w-0">
          <span className={labelClasses}>Email us</span>
          <span className="mt-0.5 block break-words text-lg font-bold text-gray-900">
            {SITE_CONTACT_EMAIL}
          </span>
          <span className="text-sm text-gray-500">Tap to email, or copy the address</span>
        </span>
      </a>
    </div>
  );
};
