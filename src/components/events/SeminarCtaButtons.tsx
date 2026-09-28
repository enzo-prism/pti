"use client";

import type { ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { trackEventRegistrationClick, trackPhoneCallClick } from "@/lib/analytics";
import { PHONE_NUMBER_TEL } from "@/lib/constants";

interface SeminarCtaButtonProps {
  children: ReactNode;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  /** Applied to the link itself, matching `<Button asChild><a className>`. */
  className?: string;
}

/** Jump to the registration form and record the registration intent. */
export const SeminarRegisterButton = ({
  children,
  size,
  variant,
  className,
}: SeminarCtaButtonProps) => (
  <Button asChild size={size} variant={variant}>
    <a
      href="#register"
      className={className}
      onClick={() =>
        trackEventRegistrationClick("practice_transition_seminar", "form")
      }
    >
      {children}
    </a>
  </Button>
);

/** Call PTI and record where on the seminar page the call started. */
export const SeminarPhoneButton = ({
  children,
  size,
  variant,
  className,
  location,
}: SeminarCtaButtonProps & { location: string }) => (
  <Button asChild size={size} variant={variant}>
    <a
      href={`tel:${PHONE_NUMBER_TEL}`}
      className={className}
      onClick={() => trackPhoneCallClick(location)}
    >
      {children}
    </a>
  </Button>
);
