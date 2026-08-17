"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { BookMeetingButton } from "@/components/BookMeetingButton";
import { PrintChecklistButton } from "@/components/resources/PrintChecklistButton";
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
  const startedRef = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitState === "success" || submitState === "error") {
      statusRef.current?.focus();
    }
  }, [submitState]);

  const handleFirstInteraction = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackContactFormStart(FORM_ID, FORM_PROVIDER);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    const payload = new FormData(formElement);

    // Honeypot tripped: accept silently so the bot believes it succeeded.
    if ((payload.get("_gotcha") as string)?.length > 0) {
      setSubmitState("success");
      return;
    }

    payload.set("form_name", FORM_NAME);
    payload.set(
      "marketing_consent",
      consent
        ? "Yes — opted into occasional educational emails"
        : "No — resource access only"
    );
    payload.set("resource_accessed_at", new Date().toISOString());
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
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm outline-none focus:ring-2 focus:ring-primary sm:p-8"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-6 w-6 text-primary" aria-hidden="true" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900 sm:text-xl">
          Your printable checklist is ready.
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-600 sm:text-base">
          Use the button below to open your browser&apos;s print dialog and save a
          clean PDF immediately. You can also talk through your readiness with
          Dr. Njo.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <PrintChecklistButton />
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
        Save an instant printable copy
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
        Enter your email to unlock the print and Save as PDF button immediately.
        Educational emails are optional.
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
            }}
            className="mt-0.5"
          />
          <Label
            htmlFor="checklist-consent"
            className="text-sm font-normal leading-relaxed text-gray-700"
          >
            Email me occasional dental-practice transition guidance from PTI.
            This is optional and is not required to access the checklist. I can
            unsubscribe at any time.
          </Label>
        </div>
        <p className="pl-8 text-xs leading-relaxed text-gray-500">
          PTI uses your email to provide this requested resource. See our{" "}
          <Link
            href="/privacy-policy"
            className="font-medium text-primary underline underline-offset-2"
          >
            privacy policy
          </Link>
          .
        </p>
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
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mt-4 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm outline-none focus:ring-2 focus:ring-destructive"
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
          Resource access is immediate. Marketing emails require the optional
          checkbox above.
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
              Get instant checklist access
              <Send aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
