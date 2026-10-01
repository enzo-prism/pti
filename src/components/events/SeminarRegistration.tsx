"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  PRACTICE_TRANSITION_SEMINAR_FORM_ENDPOINT,
  PRACTICE_TRANSITION_SEMINAR_FORM_ID,
  PRACTICE_TRANSITION_SEMINAR_FORM_NAME,
  PRACTICE_TRANSITION_SEMINAR_FORM_PROVIDER,
  getSeminarCancellationPolicy,
  type PracticeTransitionSeminarEvent,
} from "@/data/practiceTransitionSeminar";
import { PHONE_NUMBER, PHONE_NUMBER_TEL } from "@/lib/constants";
import { trackContactFormStart, trackContactFormSubmit, trackEvent } from "@/lib/analytics";
import {
  attendeeOptions,
  bestTimeToCallOptions,
  buildDefaultFormValues,
  buildSeminarFormPayload,
  refreshSeminarRegistration,
  resolveSeminarSelection,
  SEMINAR_FIELD_LIMITS,
  validateSeminarRegistration,
  type AttendeeCount,
  type BestTimeToCall,
  type SeminarFormErrors,
  type SeminarFormValues,
} from "@/lib/seminarRegistration";
import { cn } from "@/lib/utils";

const getFieldId = (field: keyof SeminarFormValues) =>
  `seminar-${field.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`;
const getFieldErrorId = (field: keyof SeminarFormValues) => `${getFieldId(field)}-error`;
const selectClass =
  "flex min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const labelClass = "text-base font-medium";

const buildAttribution = (): Record<string, string> => {
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source") ?? "";
  const utmMedium = params.get("utm_medium") ?? "";
  const utmCampaign = params.get("utm_campaign") ?? "";
  return {
    page_url: window.location.href,
    page_path: window.location.pathname,
    referrer: document.referrer,
    campaign_source: params.get("campaign_source") ?? utmSource,
    campaign_medium: params.get("campaign_medium") ?? utmMedium,
    campaign_name: params.get("campaign_name") ?? utmCampaign,
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
    utm_term: params.get("utm_term") ?? "",
    utm_content: params.get("utm_content") ?? "",
  };
};

const FieldError = ({
  field,
  errors,
}: {
  field: keyof SeminarFormValues;
  errors: SeminarFormErrors;
}) =>
  errors[field] ? (
    <p id={getFieldErrorId(field)} className="text-sm font-medium text-destructive">
      {errors[field]}
    </p>
  ) : null;

const TextField = ({
  field,
  label,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
  required = false,
}: {
  field: keyof typeof SEMINAR_FIELD_LIMITS;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) => (
  <div className="space-y-2">
    <Label htmlFor={getFieldId(field)} className={labelClass}>
      {label}
    </Label>
    <Input
      id={getFieldId(field)}
      name={field}
      type={type}
      autoComplete={autoComplete}
      inputMode={type === "tel" ? "tel" : type === "email" ? "email" : undefined}
      required={required}
      maxLength={SEMINAR_FIELD_LIMITS[field]}
      value={value}
      className="text-base md:text-base"
      onChange={(event) => onChange(event.target.value)}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? getFieldErrorId(field) : undefined}
    />
    {error && (
      <p id={getFieldErrorId(field)} className="text-sm font-medium text-destructive">
        {error}
      </p>
    )}
  </div>
);

export const SeminarCancellationPolicy = ({
  className,
}: {
  className?: string;
}) => (
  <p className={cn("text-base leading-relaxed text-muted-foreground", className)}>
    <span className="font-semibold text-foreground">Cancellation policy: </span>
    {getSeminarCancellationPolicy()}
  </p>
);

interface SeminarRegistrationProps {
  events: PracticeTransitionSeminarEvent[];
  referenceDateIso: string;
}

export const SeminarRegistration = ({
  events,
  referenceDateIso,
}: SeminarRegistrationProps) => {
  const [availableEvents, setAvailableEvents] = useState(events);
  const [values, setValues] = useState<SeminarFormValues>(() =>
    buildDefaultFormValues(events)
  );
  const [errors, setErrors] = useState<SeminarFormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [scheduleMessage, setScheduleMessage] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const formStartedRef = useRef(false);
  const submittingRef = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const displayedAtRef = useRef(new Date(referenceDateIso));

  const applyRefresh = useCallback(
    (now: Date, requestedValue?: string | null) => {
      const refreshed = refreshSeminarRegistration(
        events,
        values.selectedEvent,
        displayedAtRef.current,
        now
      );
      const selection =
        requestedValue !== undefined
          ? resolveSeminarSelection(events, requestedValue, now)
          : refreshed.selectedEvent;
      displayedAtRef.current = now;
      setAvailableEvents(refreshed.openEvents);
      setValues((current) => ({
        ...current,
        selectedEvent: selection?.value ?? "",
      }));
      if (requestedValue === undefined && refreshed.change) {
        setScheduleMessage(
          refreshed.change === "price_changed"
            ? "The registration price has changed. Please review the updated price before submitting."
            : "The previous seminar date is no longer open. Please review the current date before submitting."
        );
      }
      return refreshed;
    },
    [events, values.selectedEvent]
  );

  useEffect(() => {
    const now = new Date();
    const requestedValue = new URLSearchParams(window.location.search).get("event");
    const selected = resolveSeminarSelection(events, requestedValue, now);
    if (requestedValue && selected?.value !== requestedValue) {
      setScheduleMessage(
        "The linked seminar date is unavailable. Please review the current date below."
      );
    }
    const refreshed = refreshSeminarRegistration(
      events,
      selected?.value ?? "",
      now,
      now
    );
    displayedAtRef.current = now;
    setAvailableEvents(refreshed.openEvents);
    setValues((current) => ({ ...current, selectedEvent: selected?.value ?? "" }));
    setIsHydrated(true);
  }, [events]);

  useEffect(() => {
    const refresh = () => {
      if (!submittingRef.current) applyRefresh(new Date());
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") refresh();
    };
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [applyRefresh]);

  useEffect(() => {
    if (submitStatus === "success" || (submitStatus === "error" && submitMessage)) {
      statusRef.current?.focus();
    }
  }, [submitMessage, submitStatus]);

  const updateValue = <K extends keyof SeminarFormValues>(
    field: K,
    value: SeminarFormValues[K]
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const trackFormStartOnce = () => {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    trackContactFormStart(
      PRACTICE_TRANSITION_SEMINAR_FORM_ID,
      PRACTICE_TRANSITION_SEMINAR_FORM_PROVIDER
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;
    trackFormStartOnce();
    const submittedAt = new Date();
    const fresh = applyRefresh(submittedAt);
    if (fresh.change) {
      if (!values.gotcha) {
        trackEvent("seminar_form_error", {
          error_kind: fresh.change,
          fields: "selectedEvent",
        });
      }
      setSubmitStatus("error");
      setSubmitMessage(
        fresh.change === "price_changed"
          ? "Please review the updated registration price, then submit again."
          : "That date is no longer available. Review the current seminar selection, then submit again."
      );
      return;
    }

    const submissionValues: SeminarFormValues = {
      ...values,
      paymentConsent: true,
    };
    const nextErrors = validateSeminarRegistration(
      submissionValues,
      fresh.openEvents
    );
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      if (!values.gotcha) {
        trackEvent("seminar_form_error", {
          error_kind: "validation",
          fields: Object.keys(nextErrors).join(","),
        });
      }
      setSubmitStatus("error");
      setSubmitMessage("Please check the highlighted fields and try again.");
      const firstInvalidField = Object.keys(nextErrors)[0] as keyof SeminarFormValues;
      window.requestAnimationFrame(() =>
        document.getElementById(getFieldId(firstInvalidField))?.focus()
      );
      return;
    }

    submittingRef.current = true;
    setSubmitStatus("submitting");
    setSubmitMessage("");
    setScheduleMessage("");
    try {
      const response = await fetch(PRACTICE_TRANSITION_SEMINAR_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          buildSeminarFormPayload(submissionValues, fresh.openEvents, {
            submittedAt,
            environment:
              process.env.NEXT_PUBLIC_VERCEL_ENV ??
              process.env.NODE_ENV ??
              "production",
            attribution: buildAttribution(),
          })
        ),
      });
      if (!response.ok) throw new Error(`Formspree returned ${response.status}`);
      setSubmitStatus("success");
      setSubmitMessage(
        "Thank you. PTI will call you to complete registration and payment. Your seat is confirmed after payment."
      );
      setValues({
        ...buildDefaultFormValues(fresh.openEvents),
        selectedEvent: values.selectedEvent,
      });
      setErrors({});
      if (!values.gotcha) {
        trackContactFormSubmit(
          "event_registration",
          PRACTICE_TRANSITION_SEMINAR_FORM_ID,
          PRACTICE_TRANSITION_SEMINAR_FORM_PROVIDER
        );
      }
    } catch {
      if (!values.gotcha) trackEvent("seminar_form_error", { error_kind: "submission" });
      setSubmitStatus("error");
      setSubmitMessage(
        `We could not send the form. Please try again, or call ${PHONE_NUMBER} for help registering.`
      );
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-md md:p-6">
      <h2 className="text-2xl font-bold text-foreground">
        {availableEvents.length > 0
          ? "Request your registration call"
          : "Join the Next Seminar"}
      </h2>
      <p className="mt-2 text-base leading-relaxed text-muted-foreground">
        {availableEvents.length > 0
          ? "Registration is completed by phone. Tell us a little about you and we will call you at a time that works."
          : "There are no seminar dates open right now. Contact PTI to ask about future dates."}
      </p>

      {scheduleMessage && (
        <p role="status" className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4 text-base">
          {scheduleMessage}
        </p>
      )}

      {(submitStatus === "success" ||
        (submitStatus === "error" && submitMessage)) && (
        <Alert
          ref={statusRef}
          tabIndex={-1}
          variant={submitStatus === "error" ? "destructive" : "default"}
          role={submitStatus === "error" ? "alert" : "status"}
          className="mt-4 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {submitStatus === "success" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertTitle>
            {submitStatus === "success"
              ? "Registration call requested"
              : "Check your registration"}
          </AlertTitle>
          <AlertDescription>{submitMessage}</AlertDescription>
        </Alert>
      )}

      {availableEvents.length > 0 ? (
        <form
          id="seminar-register-form"
          onFocusCapture={trackFormStartOnce}
          onSubmit={handleSubmit}
          noValidate
          className="relative mt-6 space-y-4"
        >
          <noscript>
            <p className="rounded-lg border border-destructive/30 p-4 text-base">
              Enable JavaScript to submit, or call {PHONE_NUMBER} to register.
            </p>
          </noscript>
          <input
            type="hidden"
            name="form_name"
            value={PRACTICE_TRANSITION_SEMINAR_FORM_NAME}
          />
          <div
            aria-hidden="true"
            className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
          >
            <Label htmlFor="seminar-hp-field">Leave this field blank</Label>
            <Input
              id="seminar-hp-field"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              value={values.gotcha}
              onChange={(event) => updateValue("gotcha", event.target.value)}
            />
          </div>

          <TextField
            field="name"
            label="Full name"
            autoComplete="name"
            required
            value={values.name}
            error={errors.name}
            onChange={(value) => updateValue("name", value)}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              field="phone"
              label="Phone"
              type="tel"
              autoComplete="tel"
              required
              value={values.phone}
              error={errors.phone}
              onChange={(value) => updateValue("phone", value)}
            />
            <TextField
              field="email"
              label="Email"
              type="email"
              autoComplete="email"
              required
              value={values.email}
              error={errors.email}
              onChange={(value) => updateValue("email", value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seminar-selected-event" className={labelClass}>
              Which seminar?
            </Label>
            <select
              id="seminar-selected-event"
              name="selected_event"
              required
              className={selectClass}
              value={values.selectedEvent}
              onChange={(event) => {
                const now = new Date();
                const selection = resolveSeminarSelection(
                  events,
                  event.target.value,
                  now
                );
                applyRefresh(now, selection?.value ?? "");
                setScheduleMessage("");
                setErrors((current) => {
                  const next = { ...current };
                  delete next.selectedEvent;
                  return next;
                });
              }}
              aria-invalid={Boolean(errors.selectedEvent)}
              aria-describedby={
                errors.selectedEvent ? getFieldErrorId("selectedEvent") : undefined
              }
            >
              {availableEvents.map((event) => (
                <option key={event.id} value={event.value}>
                  {event.label}
                </option>
              ))}
            </select>
            <FieldError field="selectedEvent" errors={errors} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seminar-best-time-to-call" className={labelClass}>
              Best time to call
            </Label>
            <select
              id="seminar-best-time-to-call"
              name="best_time_to_call"
              required
              className={selectClass}
              value={values.bestTimeToCall}
              onChange={(event) =>
                updateValue("bestTimeToCall", event.target.value as BestTimeToCall)
              }
              aria-invalid={Boolean(errors.bestTimeToCall)}
              aria-describedby={
                errors.bestTimeToCall
                  ? getFieldErrorId("bestTimeToCall")
                  : undefined
              }
            >
              <option value="">Choose a time</option>
              {bestTimeToCallOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FieldError field="bestTimeToCall" errors={errors} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seminar-attendee-count" className={labelClass}>
              Attendees
            </Label>
            <select
              id="seminar-attendee-count"
              name="attendee_count"
              required
              className={selectClass}
              value={values.attendeeCount}
              onChange={(event) =>
                updateValue("attendeeCount", event.target.value as AttendeeCount)
              }
              aria-invalid={Boolean(errors.attendeeCount)}
              aria-describedby={
                errors.attendeeCount
                  ? getFieldErrorId("attendeeCount")
                  : undefined
              }
            >
              {attendeeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FieldError field="attendeeCount" errors={errors} />
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">
            We use these details to process your registration and follow up about
            this event. Read our{" "}
            <Link
              href="/privacy-policy"
              className="font-medium text-primary underline underline-offset-4"
            >
              privacy policy
            </Link>
            . Do not enter payment-card information.
          </p>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={!isHydrated || submitStatus === "submitting"}
          >
            {submitStatus === "submitting" ? "Submitting..." : "Call me to register"}
          </Button>

          <p className="text-base leading-relaxed">
            Prefer to register now?{" "}
            <a
              href={`tel:${PHONE_NUMBER_TEL}`}
              className="font-semibold text-primary underline underline-offset-4"
            >
              Call {PHONE_NUMBER}
            </a>
          </p>

          <SeminarCancellationPolicy className="hidden lg:block" />
        </form>
      ) : (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <a href={`tel:${PHONE_NUMBER_TEL}`}>Call {PHONE_NUMBER}</a>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Contact PTI</Link>
          </Button>
        </div>
      )}
    </div>
  );
};
