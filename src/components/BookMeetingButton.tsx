"use client";

import { CalendarClock } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { MICHAEL_NJO_CALENDLY_URL } from "@/lib/constants";
import {
  trackBookConsultationClick,
  trackEventRegistrationClick,
} from "@/lib/analytics";

interface BookMeetingButtonProps {
  // Where the button lives, for analytics (e.g. "contact_page_hero").
  location: string;
  label?: string;
  href?: string;
  eventName?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
}

export const BookMeetingButton = ({
  location,
  label = "Schedule a 30-Minute Meeting with Dr. Njo",
  href = MICHAEL_NJO_CALENDLY_URL,
  eventName,
  variant = "default",
  size = "lg",
  className,
}: BookMeetingButtonProps) => {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a
        href={href}
        target={href.startsWith("mailto:") || href.startsWith("tel:") ? "_self" : "_blank"}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        onClick={() =>
          eventName
            ? trackEventRegistrationClick(eventName, "external")
            : trackBookConsultationClick(location)
        }
      >
        <CalendarClock aria-hidden="true" />
        {label}
      </a>
    </Button>
  );
};
