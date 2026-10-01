import {
  PRACTICE_TRANSITION_SEMINAR_FORM_KEY,
  PRACTICE_TRANSITION_SEMINAR_FORM_NAME,
  PRACTICE_TRANSITION_SEMINAR_FORM_QA_FIELD,
  PRACTICE_TRANSITION_SEMINAR_FORM_SITE,
  getPracticeTransitionSeminarEvent,
  getSeminarRegistrationPrice,
  isSeminarEarlyBirdPriceAvailable,
  type PracticeTransitionSeminarEvent,
} from "@/data/practiceTransitionSeminar";
import { isEventUpcoming } from "@/lib/dateUtils";

export const attendeeOptions = ["1", "2", "3", "4", "5+"] as const;
export const heardAboutOptions = [
  "Email",
  "Referral",
  "Website",
  "Event",
  "Postcard",
  "Other",
] as const;

export type AttendeeCount = (typeof attendeeOptions)[number] | "";
export type HeardAbout = (typeof heardAboutOptions)[number] | "";

export interface SeminarFormValues {
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

export type SeminarFormErrors = Partial<Record<keyof SeminarFormValues, string>>;

export const buildDefaultFormValues = (
  events: PracticeTransitionSeminarEvent[]
): SeminarFormValues => ({
  selectedEvent: events[0]?.value ?? "",
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
});

export const isMoreThanOneAttendee = (value: AttendeeCount) =>
  value !== "" && value !== "1";

const isEmailLike = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const isPhoneLike = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return /^[+\d\s().-]+$/.test(value) && digits.length >= 10 && digits.length <= 15;
};

export const SEMINAR_FIELD_LIMITS = {
  name: 100, email: 254, phone: 30, practiceName: 200,
  cityState: 120, additionalAttendees: 500, heardAboutOther: 200,
} as const;

/** Resolve campaign links only against dates still open in Pacific time. */
export const resolveSeminarSelection = (
  events: PracticeTransitionSeminarEvent[],
  requestedValue: string | null | undefined,
  referenceDate: Date
) => {
  const openEvents = events.filter((event) => isEventUpcoming(event.date, referenceDate));
  return getPracticeTransitionSeminarEvent(requestedValue ?? "", openEvents) ?? openEvents[0];
};

/** Compare the visible quote with current eligibility before any POST. */
export const refreshSeminarRegistration = (
  events: PracticeTransitionSeminarEvent[],
  selectedValue: string,
  displayedAt: Date,
  now: Date
) => {
  const openEvents = events.filter((event) => isEventUpcoming(event.date, now));
  const current = getPracticeTransitionSeminarEvent(selectedValue, openEvents);
  const previous = getPracticeTransitionSeminarEvent(selectedValue, events);
  const selectedEvent = current ?? openEvents[0];
  const change = !current
    ? "event_unavailable"
    : previous && getSeminarRegistrationPrice(previous, displayedAt) !== getSeminarRegistrationPrice(current, now)
      ? "price_changed"
      : undefined;
  return { openEvents, selectedEvent, change };
};

export const formatCurrency = (value: number) => `$${value}`;

export const validateSeminarRegistration = (
  values: SeminarFormValues,
  availableEvents: PracticeTransitionSeminarEvent[]
): SeminarFormErrors => {
  const errors: SeminarFormErrors = {};

  if (
    !values.selectedEvent ||
    !getPracticeTransitionSeminarEvent(values.selectedEvent, availableEvents)
  ) {
    errors.selectedEvent = "Choose an available seminar date.";
  }
  if (values.name.trim().length < 2) {
    errors.name = "Enter your full name.";
  }
  if (!isEmailLike(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!isPhoneLike(values.phone)) {
    errors.phone = "Enter a valid phone number with an area code.";
  }
  if (!(attendeeOptions as readonly string[]).includes(values.attendeeCount)) {
    errors.attendeeCount = "Choose the number of attendees.";
  }
  if (values.heardAbout !== "" && !(heardAboutOptions as readonly string[]).includes(values.heardAbout)) {
    errors.heardAbout = "Choose a listed source or leave this optional field blank.";
  }
  for (const [field, limit] of Object.entries(SEMINAR_FIELD_LIMITS)) {
    const key = field as keyof typeof SEMINAR_FIELD_LIMITS;
    if (values[key].length > limit) errors[key] = `Use ${limit} characters or fewer.`;
  }
  if (values.paymentConsent !== true) {
    errors.paymentConsent =
      "Confirm that PTI may contact you to finalize registration and payment.";
  }
  if (typeof values.smsConsent !== "boolean") {
    errors.smsConsent = "Choose whether to receive registration text messages.";
  }

  return errors;
};

interface QuotedPrice {
  price: number;
  earlyBird: boolean;
}

const quotePrice = (
  event: PracticeTransitionSeminarEvent | undefined,
  referenceDate: Date
): QuotedPrice | undefined =>
  event
    ? {
        price: getSeminarRegistrationPrice(event, referenceDate),
        earlyBird: isSeminarEarlyBirdPriceAvailable(event, referenceDate),
      }
    : undefined;

const buildMessage = (
  values: SeminarFormValues,
  selectedEventLabel: string,
  quote: QuotedPrice | undefined
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
    quote
      ? `Price shown at registration: ${formatCurrency(quote.price)} (${
          quote.earlyBird ? "early-bird" : "standard"
        })`
      : "Price shown at registration: not available",
    "",
    "Registrant:",
    values.name.trim(),
    values.email.trim(),
    values.phone.trim(),
    values.practiceName.trim() || "Practice name not provided",
    values.cityState.trim() || "City and state not provided",
    "",
    "Attendees:",
    values.attendeeCount,
    (isMoreThanOneAttendee(values.attendeeCount) ? values.additionalAttendees.trim() : "") || "Additional names can be confirmed by phone",
    "",
    "How they heard about PTI:",
    source || "Not provided",
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
    "Contact the registrant to finalize registration and take payment by phone.",
  ].join("\n");
};

export interface SeminarPayloadContext {
  /** The checked submission instant; the displayed quote must match it. */
  submittedAt: Date;
  environment: string;
  /** Page URL, referrer, and campaign parameters captured in the browser. */
  attribution: Record<string, string>;
}

export const buildSeminarFormPayload = (
  values: SeminarFormValues,
  availableEvents: PracticeTransitionSeminarEvent[],
  context: SeminarPayloadContext
) => {
  const selectedEvent = getPracticeTransitionSeminarEvent(
    values.selectedEvent,
    availableEvents
  );
  const selectedEventLabel = selectedEvent?.label ?? "Practice Transition Seminar";
  const source =
    values.heardAbout === "Other"
      ? values.heardAboutOther.trim()
      : values.heardAbout;
  const quote = quotePrice(selectedEvent, context.submittedAt);

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
    quoted_price: quote ? formatCurrency(quote.price) : "",
    early_bird_applied: quote ? (quote.earlyBird ? "yes" : "no") : "",
    attendee_count: values.attendeeCount,
    additional_attendee_names: isMoreThanOneAttendee(values.attendeeCount) ? values.additionalAttendees.trim() : "",
    heard_about: values.heardAbout,
    heard_about_detail: source,
    payment_confirmation: values.paymentConsent ? "yes" : "no",
    sms_consent: values.smsConsent ? "yes" : "no",
    subject: `New PTI Seminar Registration - ${selectedEventLabel}`,
    tags: "event-registration,practice-transition-seminar",
    message: buildMessage(values, selectedEventLabel, quote),
    submitted_at: context.submittedAt.toISOString(),
    site: PRACTICE_TRANSITION_SEMINAR_FORM_SITE,
    form_key: PRACTICE_TRANSITION_SEMINAR_FORM_KEY,
    environment: context.environment,
    [PRACTICE_TRANSITION_SEMINAR_FORM_QA_FIELD]: "false",
    _gotcha: values.gotcha,
    ...context.attribution,
  };
};
