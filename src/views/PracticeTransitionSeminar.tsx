"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Section,
  SectionSubtitle,
  SectionTitle,
} from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  PRACTICE_TRANSITION_SEMINAR_EYEBROW,
  PRACTICE_TRANSITION_SEMINAR_FORM_ENDPOINT,
  PRACTICE_TRANSITION_SEMINAR_FORM_ID,
  PRACTICE_TRANSITION_SEMINAR_FORM_NAME,
  PRACTICE_TRANSITION_SEMINAR_FORM_PROVIDER,
  PRACTICE_TRANSITION_SEMINAR_HEADLINE,
  PRACTICE_TRANSITION_SEMINAR_REGISTER_PATH,
  practiceTransitionSeminarEvents,
  practiceTransitionSeminarFaqs,
  practiceTransitionSeminarLearningPoints,
  practiceTransitionSeminarValuePoints,
} from "@/data/practiceTransitionSeminar";
import { getReviewBySlug } from "@/data/reviews";
import { PHONE_NUMBER, PHONE_NUMBER_TEL } from "@/lib/constants";
import {
  trackContactFormStart,
  trackContactFormSubmit,
  trackEventRegistrationClick,
  trackPhoneCallClick,
} from "@/lib/analytics";

const attendeeOptions = ["1", "2", "3", "4", "5+"] as const;
const heardAboutOptions = [
  "Email",
  "Referral",
  "Website",
  "Event",
  "Postcard",
  "Other",
] as const;

type AttendeeCount = (typeof attendeeOptions)[number] | "";
type HeardAbout = (typeof heardAboutOptions)[number] | "";

interface SeminarFormValues {
  selectedEvent: string;
  name: string;
  email: string;
  phone: string;
  practiceName: string;
  cityState: string;
  attendeeCount: AttendeeCount;
  additionalAttendees: string;
  heardAbout: HeardAbout;
  heardAboutOther: string;
  paymentConsent: boolean;
  smsConsent: boolean;
  gotcha: string;
}

type SeminarFormErrors = Partial<Record<keyof SeminarFormValues, string>>;

const defaultFormValues: SeminarFormValues = {
  selectedEvent: practiceTransitionSeminarEvents[0]?.value ?? "",
  name: "",
  email: "",
  phone: "",
  practiceName: "",
  cityState: "",
  attendeeCount: "1",
  additionalAttendees: "",
  heardAbout: "",
  heardAboutOther: "",
  paymentConsent: false,
  smsConsent: false,
  gotcha: "",
};

const testimonial = getReviewBySlug("ankit-sidana-seminar-mentorship");

const isMoreThanOneAttendee = (value: AttendeeCount) =>
  value !== "" && value !== "1";

const isEmailLike = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const buildUtmPayload = () => {
  if (typeof window === "undefined") {
    return {
      page_url: "",
      campaign_source: "",
      campaign_medium: "",
      campaign_name: "",
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
    };
  }

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source") ?? "";
  const utmMedium = params.get("utm_medium") ?? "";
  const utmCampaign = params.get("utm_campaign") ?? "";

  return {
    page_url: window.location.href,
    campaign_source: params.get("campaign_source") ?? utmSource,
    campaign_medium: params.get("campaign_medium") ?? utmMedium,
    campaign_name: params.get("campaign_name") ?? utmCampaign,
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
  };
};

const validateForm = (values: SeminarFormValues): SeminarFormErrors => {
  const errors: SeminarFormErrors = {};

  if (!values.selectedEvent) {
    errors.selectedEvent = "Choose a seminar date.";
  }
  if (!values.name.trim()) {
    errors.name = "Enter your full name.";
  }
  if (!isEmailLike(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.phone.trim()) {
    errors.phone = "Enter your mobile phone number.";
  }
  if (!values.cityState.trim()) {
    errors.cityState = "Enter your city and state.";
  }
  if (!values.attendeeCount) {
    errors.attendeeCount = "Choose the number of attendees.";
  }
  if (
    isMoreThanOneAttendee(values.attendeeCount) &&
    !values.additionalAttendees.trim()
  ) {
    errors.additionalAttendees = "Add the names of additional attendees.";
  }
  if (!values.heardAbout) {
    errors.heardAbout = "Tell us how you heard about PTI.";
  }
  if (values.heardAbout === "Other" && !values.heardAboutOther.trim()) {
    errors.heardAboutOther = "Tell us where you heard about PTI.";
  }
  if (!values.paymentConsent) {
    errors.paymentConsent =
      "Confirm that PTI may contact you to finalize registration and payment.";
  }

  return errors;
};

const formatCurrency = (value: number) => `$${value}`;

const getFieldErrorId = (field: keyof SeminarFormValues) =>
  `seminar-form-${field}-error`;

const getSelectedEvent = (selectedEvent: string) =>
  practiceTransitionSeminarEvents.find((event) => event.value === selectedEvent);

const buildMessage = (
  values: SeminarFormValues,
  selectedEventLabel: string
) => {
  const source =
    values.heardAbout === "Other"
      ? `Other: ${values.heardAboutOther.trim()}`
      : values.heardAbout;

  return [
    "New seminar registration received.",
    "",
    "Seminar:",
    selectedEventLabel,
    "",
    "Registrant:",
    values.name.trim(),
    values.email.trim(),
    values.phone.trim(),
    values.practiceName.trim() || "Practice name not provided",
    values.cityState.trim(),
    "",
    "Attendees:",
    values.attendeeCount,
    values.additionalAttendees.trim() || "No additional attendees listed",
    "",
    "How they heard about PTI:",
    source,
    "",
    "Consent:",
    values.paymentConsent
      ? "Understands PTI will call to confirm registration and take payment."
      : "Payment confirmation consent not provided.",
    values.smsConsent
      ? "Agreed to receive registration-related text messages."
      : "Did not opt into registration-related text messages.",
    "",
    "Follow-up:",
    "Call within one business day to confirm registration and take payment.",
  ].join("\n");
};

const buildFormPayload = (values: SeminarFormValues) => {
  const selectedEvent = getSelectedEvent(values.selectedEvent);
  const selectedEventLabel = selectedEvent?.label ?? "Practice Transition Seminar";
  const source =
    values.heardAbout === "Other"
      ? values.heardAboutOther.trim()
      : values.heardAbout;

  return {
    form_name: PRACTICE_TRANSITION_SEMINAR_FORM_NAME,
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    practice_name: values.practiceName.trim(),
    city_state: values.cityState.trim(),
    selected_event: selectedEventLabel,
    selected_event_id: selectedEvent?.id ?? "",
    selected_event_city: selectedEvent?.city ?? "",
    selected_event_date: selectedEvent?.date ?? "",
    attendee_count: values.attendeeCount,
    additional_attendee_names: values.additionalAttendees.trim(),
    heard_about: values.heardAbout,
    heard_about_detail: source,
    payment_confirmation: values.paymentConsent ? "yes" : "no",
    sms_consent: values.smsConsent ? "yes" : "no",
    subject: `New PTI Seminar Registration - ${selectedEventLabel}`,
    tags: "event-registration,practice-transition-seminar",
    message: buildMessage(values, selectedEventLabel),
    submitted_at: new Date().toISOString(),
    _gotcha: values.gotcha,
    ...buildUtmPayload(),
  };
};

const PracticeTransitionSeminar = () => {
  const [values, setValues] = useState<SeminarFormValues>(defaultFormValues);
  const [errors, setErrors] = useState<SeminarFormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const formStartedRef = useRef(false);
  const submittingRef = useRef(false);

  const selectedEvent = useMemo(
    () => getSelectedEvent(values.selectedEvent),
    [values.selectedEvent]
  );

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const updateValue = <K extends keyof SeminarFormValues>(
    field: K,
    value: SeminarFormValues[K]
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
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

    const nextErrors = validateForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitStatus("error");
      setSubmitMessage("Please complete the highlighted fields and try again.");
      return;
    }

    submittingRef.current = true;
    setSubmitStatus("submitting");
    setSubmitMessage("");

    try {
      const response = await fetch(PRACTICE_TRANSITION_SEMINAR_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buildFormPayload(values)),
      });

      if (!response.ok) {
        throw new Error(`Formspree returned ${response.status}`);
      }

      setSubmitStatus("success");
      setSubmitMessage(
        "Thank you for registering. We'll send event details by email shortly. Our team will also follow up to confirm your registration and take payment."
      );
      setValues(defaultFormValues);
      setErrors({});
      trackContactFormSubmit(
        "event_registration",
        PRACTICE_TRANSITION_SEMINAR_FORM_ID,
        PRACTICE_TRANSITION_SEMINAR_FORM_PROVIDER
      );
    } catch {
      setSubmitStatus("error");
      setSubmitMessage(
        `We could not send the form just now. Please try again, or call ${PHONE_NUMBER} so we can help reserve your seat.`
      );
    } finally {
      submittingRef.current = false;
    }
  };

  const handleRegisterCta = () => {
    trackEventRegistrationClick("practice_transition_seminar", "form");
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-primary pt-28 text-primary-foreground md:pt-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/85" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(/lovable-uploads/387f8cf6-b01b-4a65-873f-7abdbafa078f.png)",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="container relative z-10 pb-12 md:pb-16">
          <Button variant="secondary" asChild className="mb-8">
            <Link href="/events">Back to Events</Link>
          </Button>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.48fr)] lg:items-end">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-100">
                {PRACTICE_TRANSITION_SEMINAR_EYEBROW}
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                {PRACTICE_TRANSITION_SEMINAR_HEADLINE}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-blue-50 md:text-xl">
                Your practice transition is not just a transaction. It is the
                culmination of your life&apos;s work. Join Practice Transitions
                Institute for a focused one-day seminar designed to help
                dentists understand their options, protect practice value, and
                approach their next move with confidence.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="secondary">
                  <a href="#register" onClick={handleRegisterCta}>
                    Register for a Seminar
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a
                    href={`tel:${PHONE_NUMBER_TEL}`}
                    onClick={() => trackPhoneCallClick("seminar_hero")}
                    className="border-white bg-transparent text-white hover:bg-white hover:text-primary"
                  >
                    <Phone className="h-4 w-4" />
                    Call {PHONE_NUMBER}
                  </a>
                </Button>
              </div>
            </div>

            <div className="grid gap-3">
              {practiceTransitionSeminarEvents.map((event) => (
                <Card
                  key={event.id}
                  className="border-white/20 bg-white/95 text-foreground shadow-lg"
                >
                  <CardHeader className="p-5 pb-3">
                    <div className="flex items-center justify-between gap-3">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                        Registration Open
                      </Badge>
                      <span className="text-sm font-semibold text-primary">
                        {event.city}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{event.date}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {event.venueName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3 p-5 pt-0 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                      <span>{event.addressLines.join(", ")}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section className="py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.86fr)_minmax(320px,0.44fr)] lg:items-start">
          <div>
            <SectionTitle>Make Your Next Move With a Clearer Plan</SectionTitle>
            <SectionSubtitle className="mb-0">
              Whether you are preparing to sell, evaluating a partnership,
              considering an acquisition, or simply trying to understand what
              your practice is worth, the decisions you make now can shape your
              financial future and your legacy.
            </SectionSubtitle>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {practiceTransitionSeminarValuePoints.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                <p className="text-sm font-medium text-foreground">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="register" background="light" className="scroll-mt-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.66fr)_minmax(320px,0.34fr)] lg:items-start">
          <div>
            <div className="mb-6">
              <SectionTitle>Reserve Your Seat</SectionTitle>
              <SectionSubtitle className="mb-0">
                Complete the form below and our team will follow up to confirm
                your registration, answer any questions, and take payment by
                phone.
              </SectionSubtitle>
            </div>

            <Card className="border-border">
              <CardContent className="p-5 md:p-6">
                {submitStatus === "success" && (
                  <Alert className="mb-6 border-green-200 bg-green-50 text-green-900">
                    <CheckCircle2 className="h-4 w-4 text-green-700" />
                    <AlertTitle>Registration request received</AlertTitle>
                    <AlertDescription>{submitMessage}</AlertDescription>
                  </Alert>
                )}

                {submitStatus === "error" && submitMessage && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Check the form</AlertTitle>
                    <AlertDescription>{submitMessage}</AlertDescription>
                  </Alert>
                )}

                <form
                  onFocusCapture={trackFormStartOnce}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-6"
                >
                  <noscript>
                    <p className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm font-medium text-destructive">
                      Please enable JavaScript to submit this registration form,
                      or call {PHONE_NUMBER} so we can reserve your seat.
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
                    <Label htmlFor="seminar-company-url">
                      Leave this field blank
                    </Label>
                    <Input
                      id="seminar-company-url"
                      name="_gotcha"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.gotcha}
                      onChange={(event) =>
                        updateValue("gotcha", event.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-semibold">
                      Which seminar would you like to attend?
                    </Label>
                    <RadioGroup
                      value={values.selectedEvent}
                      onValueChange={(value) =>
                        updateValue("selectedEvent", value)
                      }
                      className="grid gap-3 md:grid-cols-2"
                      aria-invalid={Boolean(errors.selectedEvent)}
                      aria-describedby={
                        errors.selectedEvent
                          ? getFieldErrorId("selectedEvent")
                          : undefined
                      }
                    >
                      {practiceTransitionSeminarEvents.map((event) => (
                        <Label
                          key={event.value}
                          htmlFor={`seminar-option-${event.value}`}
                          className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
                        >
                          <RadioGroupItem
                            id={`seminar-option-${event.value}`}
                            value={event.value}
                            className="mt-1"
                          />
                          <span>
                            <span className="block font-semibold text-foreground">
                              {event.label}
                            </span>
                            <span className="mt-1 block text-sm text-muted-foreground">
                              {event.venueName}, {event.addressLines.join(", ")}
                            </span>
                          </span>
                        </Label>
                      ))}
                    </RadioGroup>
                    {errors.selectedEvent && (
                      <p
                        id={getFieldErrorId("selectedEvent")}
                        className="text-sm font-medium text-destructive"
                      >
                        {errors.selectedEvent}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="seminar-name">Full Name</Label>
                      <Input
                        id="seminar-name"
                        name="name"
                        value={values.name}
                        onChange={(event) =>
                          updateValue("name", event.target.value)
                        }
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={
                          errors.name ? getFieldErrorId("name") : undefined
                        }
                      />
                      {errors.name && (
                        <p
                          id={getFieldErrorId("name")}
                          className="text-sm font-medium text-destructive"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="seminar-email">Email</Label>
                      <Input
                        id="seminar-email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={(event) =>
                          updateValue("email", event.target.value)
                        }
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? getFieldErrorId("email") : undefined
                        }
                      />
                      {errors.email && (
                        <p
                          id={getFieldErrorId("email")}
                          className="text-sm font-medium text-destructive"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="seminar-phone">Mobile Phone</Label>
                      <Input
                        id="seminar-phone"
                        name="phone"
                        type="tel"
                        value={values.phone}
                        onChange={(event) =>
                          updateValue("phone", event.target.value)
                        }
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={
                          errors.phone ? getFieldErrorId("phone") : undefined
                        }
                      />
                      {errors.phone && (
                        <p
                          id={getFieldErrorId("phone")}
                          className="text-sm font-medium text-destructive"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="seminar-practice-name">
                        Practice Name
                      </Label>
                      <Input
                        id="seminar-practice-name"
                        name="practice_name"
                        value={values.practiceName}
                        onChange={(event) =>
                          updateValue("practiceName", event.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="seminar-city-state">City, State</Label>
                      <Input
                        id="seminar-city-state"
                        name="city_state"
                        value={values.cityState}
                        onChange={(event) =>
                          updateValue("cityState", event.target.value)
                        }
                        aria-invalid={Boolean(errors.cityState)}
                        aria-describedby={
                          errors.cityState
                            ? getFieldErrorId("cityState")
                            : undefined
                        }
                      />
                      {errors.cityState && (
                        <p
                          id={getFieldErrorId("cityState")}
                          className="text-sm font-medium text-destructive"
                        >
                          {errors.cityState}
                        </p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Number of Attendees</Label>
                      <Select
                        value={values.attendeeCount}
                        onValueChange={(value) =>
                          updateValue("attendeeCount", value as AttendeeCount)
                        }
                      >
                        <SelectTrigger
                          aria-invalid={Boolean(errors.attendeeCount)}
                          aria-describedby={
                            errors.attendeeCount
                              ? getFieldErrorId("attendeeCount")
                              : undefined
                          }
                        >
                          <SelectValue placeholder="Choose attendee count" />
                        </SelectTrigger>
                        <SelectContent>
                          {attendeeOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.attendeeCount && (
                        <p
                          id={getFieldErrorId("attendeeCount")}
                          className="text-sm font-medium text-destructive"
                        >
                          {errors.attendeeCount}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>How did you hear about us?</Label>
                      <Select
                        value={values.heardAbout}
                        onValueChange={(value) =>
                          updateValue("heardAbout", value as HeardAbout)
                        }
                      >
                        <SelectTrigger
                          aria-invalid={Boolean(errors.heardAbout)}
                          aria-describedby={
                            errors.heardAbout
                              ? getFieldErrorId("heardAbout")
                              : undefined
                          }
                        >
                          <SelectValue placeholder="Choose source" />
                        </SelectTrigger>
                        <SelectContent>
                          {heardAboutOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.heardAbout && (
                        <p
                          id={getFieldErrorId("heardAbout")}
                          className="text-sm font-medium text-destructive"
                        >
                          {errors.heardAbout}
                        </p>
                      )}
                    </div>
                  </div>

                  {isMoreThanOneAttendee(values.attendeeCount) && (
                    <div className="space-y-2">
                      <Label htmlFor="seminar-additional-attendees">
                        Names of Additional Attendees
                      </Label>
                      <Textarea
                        id="seminar-additional-attendees"
                        name="additional_attendee_names"
                        value={values.additionalAttendees}
                        onChange={(event) =>
                          updateValue("additionalAttendees", event.target.value)
                        }
                        aria-invalid={Boolean(errors.additionalAttendees)}
                        aria-describedby={
                          errors.additionalAttendees
                            ? getFieldErrorId("additionalAttendees")
                            : undefined
                        }
                      />
                      {errors.additionalAttendees && (
                        <p
                          id={getFieldErrorId("additionalAttendees")}
                          className="text-sm font-medium text-destructive"
                        >
                          {errors.additionalAttendees}
                        </p>
                      )}
                    </div>
                  )}

                  {values.heardAbout === "Other" && (
                    <div className="space-y-2">
                      <Label htmlFor="seminar-heard-about-other">
                        If Other, please specify
                      </Label>
                      <Input
                        id="seminar-heard-about-other"
                        name="heard_about_other"
                        value={values.heardAboutOther}
                        onChange={(event) =>
                          updateValue("heardAboutOther", event.target.value)
                        }
                        aria-invalid={Boolean(errors.heardAboutOther)}
                        aria-describedby={
                          errors.heardAboutOther
                            ? getFieldErrorId("heardAboutOther")
                            : undefined
                        }
                      />
                      {errors.heardAboutOther && (
                        <p
                          id={getFieldErrorId("heardAboutOther")}
                          className="text-sm font-medium text-destructive"
                        >
                          {errors.heardAboutOther}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 rounded-lg border border-border bg-background p-4">
                      <Checkbox
                        id="seminar-payment-consent"
                        checked={values.paymentConsent}
                        onCheckedChange={(checked) =>
                          updateValue("paymentConsent", checked === true)
                        }
                        aria-invalid={Boolean(errors.paymentConsent)}
                        aria-describedby={
                          errors.paymentConsent
                            ? getFieldErrorId("paymentConsent")
                            : undefined
                        }
                      />
                      <div className="space-y-1">
                        <Label
                          htmlFor="seminar-payment-consent"
                          className="leading-relaxed"
                        >
                          I understand PTI will contact me to confirm my
                          registration and take payment.
                        </Label>
                        {errors.paymentConsent && (
                          <p
                            id={getFieldErrorId("paymentConsent")}
                            className="text-sm font-medium text-destructive"
                          >
                            {errors.paymentConsent}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg border border-border bg-background p-4">
                      <Checkbox
                        id="seminar-sms-consent"
                        checked={values.smsConsent}
                        onCheckedChange={(checked) =>
                          updateValue("smsConsent", checked === true)
                        }
                      />
                      <Label
                        htmlFor="seminar-sms-consent"
                        className="text-sm leading-relaxed text-muted-foreground"
                      >
                        I agree to receive text messages from Practice
                        Transitions Institute related to my registration.
                        Message and data rates may apply. Reply STOP at any time
                        to opt out.
                      </Label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto"
                    disabled={!isHydrated || submitStatus === "submitting"}
                  >
                    {submitStatus === "submitting"
                      ? "Submitting..."
                      : "Reserve My Seat"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-5">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Registration and Pricing
                </CardTitle>
                <CardDescription>
                  Register 30 days in advance and save $100 on the first
                  participant.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 text-sm">
                  <div className="flex items-center justify-between rounded-lg bg-primary/5 p-3">
                    <span className="font-medium">Early Bird</span>
                    <span className="font-semibold text-primary">$297</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-background p-3">
                    <span className="font-medium">Standard</span>
                    <span className="font-semibold">$397</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-background p-3">
                    <span className="font-medium">Additional Guests</span>
                    <span className="font-semibold">$197 each</span>
                  </div>
                </div>
                <Separator />
                <div className="space-y-3 text-sm text-muted-foreground">
                  {practiceTransitionSeminarEvents.map((event) => (
                    <div key={event.id} className="flex items-start gap-2">
                      <Calendar className="mt-0.5 h-4 w-4 text-primary" />
                      <p>
                        <span className="font-medium text-foreground">
                          {event.city} early bird:
                        </span>{" "}
                        {event.earlyBirdDeadline}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Alert className="border-primary/20 bg-primary/5">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <AlertTitle>No credit card fields</AlertTitle>
              <AlertDescription>
                Payment is handled by phone after registration. Please do not
                submit credit card information through this form.
              </AlertDescription>
            </Alert>

            {selectedEvent && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Selected Seminar</CardTitle>
                  <CardDescription>{selectedEvent.label}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex gap-2">
                    <Clock className="mt-0.5 h-4 w-4 text-primary" />
                    <span>{selectedEvent.time}</span>
                  </div>
                  <div className="flex gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                    <span>
                      {selectedEvent.venueName},{" "}
                      {selectedEvent.addressLines.join(", ")}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
            Trusted by Dental Professionals
          </p>
          <blockquote className="mt-4 text-2xl font-semibold leading-relaxed text-foreground md:text-3xl">
            &quot;His detailed lessons on dental benefit contracts, practice
            acquisition, and decision-making gave me clarity and confidence for
            the years ahead.&quot;
          </blockquote>
          <div className="mt-5 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">
              {testimonial?.displayAuthorName ?? "Ankit Sidana"}
            </p>
            <p>{testimonial?.role ?? "Seminar Attendee"}</p>
          </div>
        </div>
      </Section>

      <Section background="light">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-start">
          <div>
            <SectionTitle>What You&apos;ll Learn</SectionTitle>
            <SectionSubtitle>
              At this seminar, you&apos;ll learn how to approach a transition with a
              more practical plan, a better grasp of value, and a clearer sense
              of what needs to happen next.
            </SectionSubtitle>
          </div>
          <div className="grid gap-4">
            {practiceTransitionSeminarLearningPoints.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-5 shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                <p className="font-medium text-foreground">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <SectionTitle centered>Questions Before You Register?</SectionTitle>
          <div className="grid gap-4">
            {practiceTransitionSeminarFaqs.map((item) => (
              <Card key={item.question}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section background="primary" className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <Users className="mx-auto mb-4 h-10 w-10 text-blue-100" />
          <SectionTitle centered className="text-white">
            Ready to reserve your seat?
          </SectionTitle>
          <SectionSubtitle centered className="text-blue-50">
            Choose the seminar date that fits your schedule, submit the form,
            and PTI will follow up to confirm the details.
          </SectionSubtitle>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary">
              <a href="#register" onClick={handleRegisterCta}>
                Register for a Seminar
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href={`tel:${PHONE_NUMBER_TEL}`}
                onClick={() => trackPhoneCallClick("seminar_footer")}
                className="border-white bg-transparent text-white hover:bg-white hover:text-primary"
              >
                Call {PHONE_NUMBER}
              </a>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default PracticeTransitionSeminar;
