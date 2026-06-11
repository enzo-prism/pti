"use client";

import { useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { BookMeetingButton } from "@/components/BookMeetingButton";
import { PHONE_NUMBER, PHONE_NUMBER_TEL } from "@/lib/constants";
import { SITE_CONTACT_EMAIL } from "@/lib/siteMetadata";
import {
  trackContactFormStart,
  trackContactFormSubmit,
} from "@/lib/analytics";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdajbelv";
const FORM_ID = "mdajbelv";
const FORM_PROVIDER = "formspree";
const FORM_NAME = "practice-sale-readiness-checklist";

type SubmitState = "idle" | "submitting" | "success" | "error";

export const ChecklistSignupForm = () => {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const startedRef = useRef(false);

  const handleFirstInteraction = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackContactFormStart(FORM_ID, FORM_PROVIDER);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!consent) {
      setConsentError(true);
      return;
    }

    const formElement = event.currentTarget;
    const payload = new FormData(formElement);

    // Honeypot tripped: accept silently so the bot believes it succeeded.
    if ((payload.get("_gotcha") as string)?.length > 0) {
      setSubmitState("success");
      return;
    }

    payload.set("form_name", FORM_NAME);
    payload.set(
      "consent",
      "Yes — consents to be contacted by email, text, and phone"
    );
    payload.set(
      "_subject",
      "Practice Sale Readiness Checklist request — PTI website"
    );

    setSubmitState("submitting");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        trackContactFormSubmit("checklist_download", FORM_ID, FORM_PROVIDER);
        setSubmitState("success");
      } else {
        setSubmitState("error");
      }
    } catch {
      setSubmitState("error");
    }
  };

  if (submitState === "success") {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-6 w-6 text-primary" aria-hidden="true" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900 sm:text-xl">
          Thank you — your checklist is on its way.
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-600 sm:text-base">
          A member of the PTI team will email your copy within one business
          day. In the meantime, you can print or save this page — or talk
          through your readiness directly with Dr. Njo.
        </p>
        <div className="mt-6 flex justify-center">
          <BookMeetingButton
            location="checklist_form_success"
            label="Book a 30-Minute Meeting"
            size="default"
          />
        </div>
      </div>
    );
  }

  return (
    <form
      action={FORMSPREE_ENDPOINT}
      method="POST"
      onSubmit={onSubmit}
      onFocusCapture={handleFirstInteraction}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
        Get your copy by email
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
        We&apos;ll send the checklist along with practical transition guidance
        from the PTI team — no automated sales pitch.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="checklist-name">Name</Label>
          <Input
            id="checklist-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            className="h-11"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="checklist-email">
            Email{" "}
            <span aria-hidden="true" className="text-destructive">
              *
            </span>
          </Label>
          <Input
            id="checklist-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            className="h-11"
          />
        </div>
      </div>

      <div className="mt-4 space-y-2 rounded-lg border border-gray-200 bg-gray-50/70 p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            id="checklist-consent"
            checked={consent}
            onCheckedChange={(value) => {
              setConsent(value === true);
              if (value === true) setConsentError(false);
            }}
            aria-required="true"
            className="mt-0.5"
          />
          <Label
            htmlFor="checklist-consent"
            className="text-sm font-normal leading-relaxed text-gray-700"
          >
            I agree that the PTI team may contact me using the details
            I&apos;ve provided — including by email, text message, and phone
            call.{" "}
            <span aria-hidden="true" className="text-destructive">
              *
            </span>
          </Label>
        </div>
        {consentError && (
          <p role="alert" className="text-sm font-medium text-destructive">
            Please confirm the PTI team may contact you using the details
            above.
          </p>
        )}
      </div>

      {/* Honeypot: positioned off-screen and hidden from assistive tech. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="checklist-company">Company</label>
        <input
          id="checklist-company"
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {submitState === "error" && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm"
        >
          <AlertCircle
            className="mt-0.5 h-5 w-5 shrink-0 text-destructive"
            aria-hidden="true"
          />
          <p className="text-gray-700">
            We couldn&apos;t send your request. Please try again, or reach us
            at{" "}
            <a
              href={`tel:${PHONE_NUMBER_TEL}`}
              className="font-medium text-primary underline underline-offset-2"
            >
              {PHONE_NUMBER}
            </a>{" "}
            or{" "}
            <a
              href={`mailto:${SITE_CONTACT_EMAIL}`}
              className="font-medium text-primary underline underline-offset-2"
            >
              {SITE_CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
      )}

      <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-gray-500 sm:text-sm">
          We&apos;ll only use your details to respond to your request.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={submitState === "submitting"}
          className="w-full sm:w-auto"
        >
          {submitState === "submitting" ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              Sending...
            </>
          ) : (
            <>
              Email me the checklist
              <Send aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
