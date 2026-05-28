"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Phone,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BookMeetingButton } from "@/components/BookMeetingButton";
import { cn } from "@/lib/utils";
import { PHONE_NUMBER, PHONE_NUMBER_TEL } from "@/lib/constants";
import { SITE_CONTACT_EMAIL } from "@/lib/siteMetadata";
import {
  trackContactFormStart,
  trackContactFormSubmit,
  trackPhoneCallClick,
} from "@/lib/analytics";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdajbelv";
const FORM_ID = "mdajbelv";
const FORM_PROVIDER = "formspree";

const interestOptions = [
  { value: "selling", label: "Selling my practice" },
  { value: "associateship", label: "Buying in / Associateship" },
  { value: "partnership", label: "Partnership" },
  { value: "valuation", label: "Practice valuation" },
  { value: "other", label: "Something else" },
] as const;

const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "That name looks a little long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .email("Please enter a valid email address."),
  phone: z.string().trim().max(30, "Please enter a valid phone number."),
  interest: z.string(),
  message: z
    .string()
    .trim()
    .min(10, "Please share a few details — at least 10 characters.")
    .max(3000, "Please keep your message under 3000 characters."),
  // Honeypot: real visitors never see or fill this.
  _gotcha: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

type SubmitState = "idle" | "success" | "error";

const selectClassName =
  "flex h-11 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-9 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

const RequiredMark = () => (
  <span aria-hidden="true" className="ml-0.5 text-destructive">
    *
  </span>
);

const OptionalHint = () => (
  <span className="ml-1 text-xs font-normal text-muted-foreground">
    (optional)
  </span>
);

export const ContactForm = () => {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const startedRef = useRef(false);
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      interest: "",
      message: "",
      _gotcha: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  // Move focus to the new state so keyboard and screen-reader users are not
  // stranded at the (now disabled) submit button after a round-trip.
  useEffect(() => {
    if (submitState === "error") {
      errorRef.current?.focus();
    } else if (submitState === "success") {
      successRef.current?.focus();
    }
  }, [submitState]);

  const handleFirstInteraction = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackContactFormStart(FORM_ID, FORM_PROVIDER);
  };

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitState("idle");

    // Honeypot tripped: accept silently so the bot believes it succeeded.
    if (values._gotcha && values._gotcha.length > 0) {
      form.reset();
      setSubmitState("success");
      return;
    }

    const payload = new FormData();
    payload.append("name", values.name);
    payload.append("email", values.email);
    if (values.phone) {
      payload.append("phone", values.phone);
    }
    if (values.interest) {
      const label =
        interestOptions.find((option) => option.value === values.interest)
          ?.label ?? values.interest;
      payload.append("interest", label);
    }
    payload.append("message", values.message);
    payload.append("_subject", `New website inquiry from ${values.name}`);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        trackContactFormSubmit("contact", FORM_ID, FORM_PROVIDER);
        form.reset();
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
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-10 md:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-7 w-7 text-primary" aria-hidden="true" />
        </div>
        <h2
          ref={successRef}
          tabIndex={-1}
          className="mt-5 text-xl font-semibold text-gray-900 outline-none sm:text-2xl"
        >
          Thank you — your message is on its way.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-600 sm:text-base">
          A member of the PTI team will be in touch within one business day.
          Prefer to talk sooner? Book a time or give us a call.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <BookMeetingButton
            location="contact_form_success"
            label="Book a 30-Minute Meeting"
            size="default"
            className="w-full sm:w-auto"
          />
          <Button
            asChild
            variant="outline"
            size="default"
            className="w-full sm:w-auto"
          >
            <a
              href={`tel:${PHONE_NUMBER_TEL}`}
              onClick={() => trackPhoneCallClick("contact_form_success")}
            >
              <Phone aria-hidden="true" />
              Call {PHONE_NUMBER}
            </a>
          </Button>
        </div>
        <button
          type="button"
          onClick={() => setSubmitState("idle")}
          className="mt-7 text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 md:p-10">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Send us a message
        </h2>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          Tell us a little about your practice and what you&apos;re hoping to
          do. We&apos;ll follow up personally — no automated sales pitch.
        </p>
      </div>

      <Form {...form}>
        <form
          action={FORMSPREE_ENDPOINT}
          method="POST"
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          onFocusCapture={handleFirstInteraction}
          className="space-y-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name
                    <RequiredMark />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      autoComplete="name"
                      placeholder="Jane Smith"
                      aria-required="true"
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email
                    <RequiredMark />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      aria-required="true"
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Phone
                    <OptionalHint />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="(555) 123-4567"
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    How can we help?
                    <OptionalHint />
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <select
                        {...field}
                        className={cn(
                          selectClassName,
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <option value="">Select a topic</option>
                        {interestOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Message
                  <RequiredMark />
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={5}
                    placeholder="Share where you are in your transition and any questions you have..."
                    aria-required="true"
                    className="min-h-[140px] resize-y text-base md:text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Honeypot: positioned off-screen and hidden from assistive tech. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden"
          >
            <label htmlFor="contact-company">Company</label>
            <input
              id="contact-company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...form.register("_gotcha")}
            />
          </div>

          {/* Subject line for the no-JS native submit fallback. */}
          <input
            type="hidden"
            name="_subject"
            value="New website inquiry — Practice Transitions Institute"
          />

          {submitState === "error" && (
            <div
              ref={errorRef}
              role="alert"
              tabIndex={-1}
              className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm outline-none"
            >
              <AlertCircle
                className="mt-0.5 h-5 w-5 shrink-0 text-destructive"
                aria-hidden="true"
              />
              <div className="text-gray-700">
                <p className="font-semibold text-destructive">
                  We couldn&apos;t send your message.
                </p>
                <p className="mt-1">
                  Please try again, or reach us directly at{" "}
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
            </div>
          )}

          <div className="flex flex-col-reverse gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-gray-500 sm:text-sm">
              We&apos;ll only use your details to respond to your inquiry.
            </p>
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden="true" />
                  Sending...
                </>
              ) : (
                <>
                  Send message
                  <Send aria-hidden="true" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
