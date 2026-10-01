"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { Textarea } from "@/components/ui/textarea";
import { SeminarEventDetails, SEMINAR_SELECTION_EVENT } from "./SeminarEventPreview";
import {
  PRACTICE_TRANSITION_SEMINAR_FORM_ENDPOINT,
  PRACTICE_TRANSITION_SEMINAR_FORM_ID,
  PRACTICE_TRANSITION_SEMINAR_FORM_NAME,
  PRACTICE_TRANSITION_SEMINAR_FORM_PROVIDER,
  getPracticeTransitionSeminarEvent,
  type PracticeTransitionSeminarEvent,
} from "@/data/practiceTransitionSeminar";
import { PHONE_NUMBER, PHONE_NUMBER_TEL } from "@/lib/constants";
import { trackContactFormStart, trackContactFormSubmit, trackEvent } from "@/lib/analytics";
import {
  attendeeOptions, buildDefaultFormValues, buildSeminarFormPayload,
  heardAboutOptions, isMoreThanOneAttendee, refreshSeminarRegistration,
  resolveSeminarSelection, SEMINAR_FIELD_LIMITS, validateSeminarRegistration,
  type AttendeeCount, type HeardAbout, type SeminarFormErrors, type SeminarFormValues,
} from "@/lib/seminarRegistration";

const getFieldId = (field: keyof SeminarFormValues) =>
  `seminar-${field.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`;
const getFieldErrorId = (field: keyof SeminarFormValues) => `${getFieldId(field)}-error`;
const selectClass = "flex min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const buildAttribution = (): Record<string, string> => {
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source") ?? "";
  const utmMedium = params.get("utm_medium") ?? "";
  const utmCampaign = params.get("utm_campaign") ?? "";
  return {
    page_url: window.location.href, page_path: window.location.pathname,
    referrer: document.referrer,
    campaign_source: params.get("campaign_source") ?? utmSource,
    campaign_medium: params.get("campaign_medium") ?? utmMedium,
    campaign_name: params.get("campaign_name") ?? utmCampaign,
    utm_source: utmSource, utm_medium: utmMedium, utm_campaign: utmCampaign,
    utm_term: params.get("utm_term") ?? "", utm_content: params.get("utm_content") ?? "",
  };
};

const FieldError = ({ field, errors }: { field: keyof SeminarFormValues; errors: SeminarFormErrors }) =>
  errors[field] ? <p id={getFieldErrorId(field)} className="text-sm font-medium text-destructive">{errors[field]}</p> : null;

const TextField = ({ field, label, value, error, onChange, type = "text", autoComplete, required = false }: {
  field: keyof typeof SEMINAR_FIELD_LIMITS;
  label: string; value: string; error?: string; onChange: (value: string) => void;
  type?: string; autoComplete?: string; required?: boolean;
}) => (
  <div className="space-y-2">
    <Label htmlFor={getFieldId(field)}>{label}</Label>
    <Input id={getFieldId(field)} name={field} type={type} autoComplete={autoComplete}
      inputMode={type === "tel" ? "tel" : type === "email" ? "email" : undefined}
      required={required} maxLength={SEMINAR_FIELD_LIMITS[field]} value={value}
      onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)}
      aria-describedby={error ? getFieldErrorId(field) : undefined} />
    {error && <p id={getFieldErrorId(field)} className="text-sm font-medium text-destructive">{error}</p>}
  </div>
);

interface SeminarRegistrationProps {
  events: PracticeTransitionSeminarEvent[];
  referenceDateIso: string;
}

export const SeminarRegistration = ({ events, referenceDateIso }: SeminarRegistrationProps) => {
  const [availableEvents, setAvailableEvents] = useState(events);
  const [referenceDate, setReferenceDate] = useState(() => new Date(referenceDateIso));
  const [values, setValues] = useState<SeminarFormValues>(() => buildDefaultFormValues(events));
  const [errors, setErrors] = useState<SeminarFormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [scheduleMessage, setScheduleMessage] = useState("");
  const [optionalOpen, setOptionalOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const formStartedRef = useRef(false);
  const submittingRef = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const selectedEvent = getPracticeTransitionSeminarEvent(values.selectedEvent, availableEvents);

  const applyRefresh = useCallback((now: Date, requestedValue?: string | null) => {
    const refreshed = refreshSeminarRegistration(events, values.selectedEvent, referenceDate, now);
    const selection = requestedValue !== undefined
      ? resolveSeminarSelection(events, requestedValue, now)
      : refreshed.selectedEvent;
    setReferenceDate(now);
    setAvailableEvents(refreshed.openEvents);
    setValues((current) => ({ ...current, selectedEvent: selection?.value ?? "" }));
    if (requestedValue === undefined && refreshed.change) {
      setScheduleMessage(refreshed.change === "price_changed"
        ? "The registration price has changed. Please review the updated price before submitting."
        : "The previous seminar date is no longer open. Please review the current date before submitting.");
    }
    return refreshed;
  }, [events, referenceDate, values.selectedEvent]);

  // Hydration starts from SSR values, then validates campaign and cached dates.
  useEffect(() => {
    const now = new Date();
    const requestedValue = new URLSearchParams(window.location.search).get("event");
    const selected = resolveSeminarSelection(events, requestedValue, now);
    if (requestedValue && selected?.value !== requestedValue) {
      setScheduleMessage("The linked seminar date is unavailable. Please review the current date below.");
    }
    const refreshed = refreshSeminarRegistration(events, selected?.value ?? "", now, now);
    setReferenceDate(now);
    setAvailableEvents(refreshed.openEvents);
    setValues((current) => ({ ...current, selectedEvent: selected?.value ?? "" }));
    setIsHydrated(true);
  }, [events]);

  useEffect(() => {
    const refresh = () => { if (!submittingRef.current) applyRefresh(new Date()); };
    const onVisibility = () => { if (document.visibilityState === "visible") refresh(); };
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [applyRefresh]);

  useEffect(() => {
    if (isHydrated) window.dispatchEvent(new CustomEvent(SEMINAR_SELECTION_EVENT, { detail: values.selectedEvent }));
  }, [isHydrated, values.selectedEvent, referenceDate]);

  useEffect(() => {
    if (submitStatus === "success" || (submitStatus === "error" && submitMessage)) statusRef.current?.focus();
  }, [submitMessage, submitStatus]);

  const updateValue = <K extends keyof SeminarFormValues>(field: K, value: SeminarFormValues[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => { const next = { ...current }; delete next[field]; return next; });
  };
  const trackFormStartOnce = () => {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    trackContactFormStart(PRACTICE_TRANSITION_SEMINAR_FORM_ID, PRACTICE_TRANSITION_SEMINAR_FORM_PROVIDER);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;
    trackFormStartOnce();
    const submittedAt = new Date();
    const fresh = applyRefresh(submittedAt);
    if (fresh.change) {
      if (!values.gotcha) trackEvent("seminar_form_error", { error_kind: fresh.change, fields: "selectedEvent" });
      setSubmitStatus("error");
      setSubmitMessage(fresh.change === "price_changed"
        ? "Please review the updated registration price, then submit again."
        : "That date is no longer available. Review the current seminar selection, then submit again.");
      return;
    }
    const nextErrors = validateSeminarRegistration(values, fresh.openEvents);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      if (!values.gotcha) trackEvent("seminar_form_error", { error_kind: "validation", fields: Object.keys(nextErrors).join(",") });
      if (["practiceName", "cityState", "heardAbout", "heardAboutOther"].some((field) => field in nextErrors)) setOptionalOpen(true);
      setSubmitStatus("error");
      setSubmitMessage("Please check the highlighted fields and try again.");
      const firstInvalidField = Object.keys(nextErrors)[0] as keyof SeminarFormValues;
      window.requestAnimationFrame(() => document.getElementById(getFieldId(firstInvalidField))?.focus());
      return;
    }
    submittingRef.current = true;
    setSubmitStatus("submitting");
    setSubmitMessage("");
    setScheduleMessage("");
    try {
      const response = await fetch(PRACTICE_TRANSITION_SEMINAR_FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(buildSeminarFormPayload(values, fresh.openEvents, {
          submittedAt,
          environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV ?? "production",
          attribution: buildAttribution(),
        })),
      });
      if (!response.ok) throw new Error(`Formspree returned ${response.status}`);
      setSubmitStatus("success");
      setSubmitMessage("Thank you. PTI will contact you to finalize registration and payment by phone. Your seat is confirmed after payment.");
      setValues({ ...buildDefaultFormValues(fresh.openEvents), selectedEvent: values.selectedEvent });
      setErrors({});
      if (!values.gotcha) trackContactFormSubmit("event_registration", PRACTICE_TRANSITION_SEMINAR_FORM_ID, PRACTICE_TRANSITION_SEMINAR_FORM_PROVIDER);
    } catch {
      if (!values.gotcha) trackEvent("seminar_form_error", { error_kind: "submission" });
      setSubmitStatus("error");
      setSubmitMessage(`We could not send the form. Please try again, or call ${PHONE_NUMBER} for help registering.`);
    } finally { submittingRef.current = false; }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <SectionTitle>{availableEvents.length > 0 ? "Register for the Seminar" : "Join the Next Seminar"}</SectionTitle>
      <SectionSubtitle className="mb-6">{availableEvents.length > 0
        ? "Complete the short form. PTI will contact you to finalize registration and payment by phone. Your seat is confirmed after payment."
        : "There are no seminar dates open right now. Contact PTI to ask about future dates."}</SectionSubtitle>
      {scheduleMessage && <p role="status" className="mb-4 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm">{scheduleMessage}</p>}
      {selectedEvent && <div className="mb-6"><SeminarEventDetails event={selectedEvent} referenceDate={referenceDate} /></div>}
      <div className="rounded-xl border border-border bg-card p-5 md:p-6">
        {(submitStatus === "success" || (submitStatus === "error" && submitMessage)) && (
          <Alert ref={statusRef} tabIndex={-1} variant={submitStatus === "error" ? "destructive" : "default"}
            role={submitStatus === "error" ? "alert" : "status"} className="mb-6 focus:outline-none focus:ring-2 focus:ring-primary">
            {submitStatus === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertTitle>{submitStatus === "success" ? "Registration form received" : "Check your registration"}</AlertTitle>
            <AlertDescription>{submitMessage}</AlertDescription>
          </Alert>
        )}
        {availableEvents.length > 0 ? (
          <form id="seminar-register-form" onFocusCapture={trackFormStartOnce} onSubmit={handleSubmit} noValidate className="space-y-6">
            <noscript><p className="rounded-lg border border-destructive/30 p-4 text-sm">Enable JavaScript to submit, or call {PHONE_NUMBER} to register.</p></noscript>
            <input type="hidden" name="form_name" value={PRACTICE_TRANSITION_SEMINAR_FORM_NAME} />
            <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
              <Label htmlFor="seminar-hp-field">Leave this field blank</Label>
              <Input id="seminar-hp-field" name="_gotcha" tabIndex={-1} autoComplete="off" value={values.gotcha} onChange={(event) => updateValue("gotcha", event.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seminar-selected-event">Seminar date <span className="font-normal text-muted-foreground">(other dates available)</span></Label>
              <select id="seminar-selected-event" name="selected_event" required className={selectClass} value={values.selectedEvent}
                onChange={(event) => {
                  const now = new Date();
                  const selection = resolveSeminarSelection(events, event.target.value, now);
                  applyRefresh(now, selection?.value ?? "");
                  setScheduleMessage("");
                  setErrors((current) => { const next = { ...current }; delete next.selectedEvent; return next; });
                }}
                aria-invalid={Boolean(errors.selectedEvent)} aria-describedby={errors.selectedEvent ? getFieldErrorId("selectedEvent") : undefined}>
                {availableEvents.map((event) => <option key={event.id} value={event.value}>{event.label}</option>)}
              </select>
              <FieldError field="selectedEvent" errors={errors} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField field="name" label="Full name" autoComplete="name" required value={values.name} error={errors.name} onChange={(value) => updateValue("name", value)} />
              <TextField field="email" label="Email" type="email" autoComplete="email" required value={values.email} error={errors.email} onChange={(value) => updateValue("email", value)} />
              <TextField field="phone" label="Mobile phone" type="tel" autoComplete="tel" required value={values.phone} error={errors.phone} onChange={(value) => updateValue("phone", value)} />
              <div className="space-y-2">
                <Label htmlFor="seminar-attendee-count">Number of attendees</Label>
                <select id="seminar-attendee-count" name="attendee_count" required className={selectClass} value={values.attendeeCount}
                  onChange={(event) => updateValue("attendeeCount", event.target.value as AttendeeCount)}
                  aria-invalid={Boolean(errors.attendeeCount)} aria-describedby={errors.attendeeCount ? getFieldErrorId("attendeeCount") : undefined}>
                  {attendeeOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
                <FieldError field="attendeeCount" errors={errors} />
              </div>
            </div>
            {isMoreThanOneAttendee(values.attendeeCount) && <div className="space-y-2">
              <Label htmlFor="seminar-additional-attendees">Additional attendee names (optional)</Label>
              <Textarea id="seminar-additional-attendees" name="additional_attendee_names" maxLength={SEMINAR_FIELD_LIMITS.additionalAttendees}
                value={values.additionalAttendees} onChange={(event) => updateValue("additionalAttendees", event.target.value)}
                aria-invalid={Boolean(errors.additionalAttendees)} aria-describedby={errors.additionalAttendees ? getFieldErrorId("additionalAttendees") : "seminar-guest-help"} />
              <p id="seminar-guest-help" className="text-sm text-muted-foreground">You can confirm guest names when PTI calls.</p>
              <FieldError field="additionalAttendees" errors={errors} />
            </div>}
            <details open={optionalOpen} onToggle={(event) => setOptionalOpen(event.currentTarget.open)} className="rounded-lg border border-border">
              <summary className="min-h-11 cursor-pointer px-4 py-3 text-sm font-medium">Optional details</summary>
              <div className="grid gap-4 p-4 pt-0 sm:grid-cols-2">
                <TextField field="practiceName" label="Practice name (optional)" autoComplete="organization" value={values.practiceName} error={errors.practiceName} onChange={(value) => updateValue("practiceName", value)} />
                <TextField field="cityState" label="City, state (optional)" autoComplete="address-level2" value={values.cityState} error={errors.cityState} onChange={(value) => updateValue("cityState", value)} />
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="seminar-heard-about">How did you hear about us? (optional)</Label>
                  <select id="seminar-heard-about" name="heard_about" className={selectClass} value={values.heardAbout}
                    onChange={(event) => updateValue("heardAbout", event.target.value as HeardAbout)}
                    aria-invalid={Boolean(errors.heardAbout)} aria-describedby={errors.heardAbout ? getFieldErrorId("heardAbout") : undefined}>
                    <option value="">Choose a source (optional)</option>
                    {heardAboutOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                  <FieldError field="heardAbout" errors={errors} />
                </div>
                {values.heardAbout === "Other" && <TextField field="heardAboutOther" label="Other source (optional)" value={values.heardAboutOther} error={errors.heardAboutOther} onChange={(value) => updateValue("heardAboutOther", value)} />}
              </div>
            </details>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox className="h-11 w-11" id="seminar-payment-consent" checked={values.paymentConsent} onCheckedChange={(checked) => updateValue("paymentConsent", checked === true)}
                  aria-required="true" aria-invalid={Boolean(errors.paymentConsent)} aria-describedby={errors.paymentConsent ? getFieldErrorId("paymentConsent") : undefined} />
                <div className="space-y-1"><Label htmlFor="seminar-payment-consent" className="flex min-h-11 items-center leading-relaxed">PTI may contact me to finalize registration and payment by phone. I understand my seat is confirmed after payment.</Label><FieldError field="paymentConsent" errors={errors} /></div>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox className="h-11 w-11" id="seminar-sms-consent" checked={values.smsConsent} onCheckedChange={(checked) => updateValue("smsConsent", checked === true)} />
                <Label htmlFor="seminar-sms-consent" className="flex min-h-11 items-center text-sm leading-relaxed text-muted-foreground">Send me registration-related texts (optional). Message and data rates may apply. Reply STOP to opt out. Consent is not required to register.</Label>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">We use these details to process your registration and follow up about this event. Read our <Link href="/privacy-policy" className="font-medium text-primary underline underline-offset-4">privacy policy</Link>. Do not enter payment-card information.</p>
            </div>
            <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={!isHydrated || submitStatus === "submitting"}>{submitStatus === "submitting" ? "Submitting..." : "Register Now"}</Button>
          </form>
        ) : <div className="flex flex-col gap-3 sm:flex-row"><Button asChild><a href={`tel:${PHONE_NUMBER_TEL}`}>Call {PHONE_NUMBER}</a></Button><Button asChild variant="outline"><Link href="/contact">Contact PTI</Link></Button></div>}
      </div>
    </div>
  );
};
