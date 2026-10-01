"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import {
  getSeminarRegistrationPrice,
  type PracticeTransitionSeminarEvent,
} from "@/data/practiceTransitionSeminar";
import { formatCurrency, resolveSeminarSelection } from "@/lib/seminarRegistration";

export const SEMINAR_SELECTION_EVENT = "pti:seminar-selection";

export const SeminarEventDetails = ({
  event, referenceDate, heading = "Selected seminar",
}: {
  event: PracticeTransitionSeminarEvent;
  referenceDate: Date;
  heading?: string;
}) => (
  <div className="rounded-xl border border-primary/20 bg-card p-5 text-foreground shadow-sm md:p-6">
    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">{heading}</p>
    <h2 className="text-xl font-semibold">{event.city}</h2>
    <div className="mt-3 space-y-2 text-sm text-muted-foreground">
      <p className="flex items-start gap-2"><Calendar className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span className="font-medium text-foreground">{event.date}</span></p>
      <p className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{event.time} Pacific time</span></p>
      <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span><strong className="font-medium text-foreground">{event.venueName}</strong><br />{event.addressLines.join(", ")}</span></p>
    </div>
    <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4">
      <div><p className="text-2xl font-bold text-primary">{formatCurrency(getSeminarRegistrationPrice(event, referenceDate))}</p><p className="text-sm text-muted-foreground">First attendee</p></div>
      <div><p className="text-2xl font-bold text-primary">{formatCurrency(event.guestPrice)}</p><p className="text-sm text-muted-foreground">Each additional attendee</p></div>
    </div>
    <p className="mt-4 text-xs leading-relaxed text-muted-foreground">PTI finalizes registration and payment by phone. Your seat is confirmed after payment.</p>
  </div>
);

/** Keeps the hero aligned with campaign links and the form's selected date. */
export const SeminarEventPreview = ({ events, referenceDateIso }: {
  events: PracticeTransitionSeminarEvent[];
  referenceDateIso: string;
}) => {
  const [referenceDate, setReferenceDate] = useState(() => new Date(referenceDateIso));
  const [selectedValue, setSelectedValue] = useState(events[0]?.value ?? "");
  useEffect(() => {
    const refresh = () => {
      const now = new Date();
      setReferenceDate(now);
      setSelectedValue((current) => resolveSeminarSelection(events, current, now)?.value ?? "");
    };
    const now = new Date();
    const campaignEvent = new URLSearchParams(window.location.search).get("event");
    setReferenceDate(now);
    setSelectedValue(resolveSeminarSelection(events, campaignEvent, now)?.value ?? "");
    const onSelection = (event: Event) => {
      const value = (event as CustomEvent<string>).detail;
      const now = new Date();
      setReferenceDate(now);
      setSelectedValue(resolveSeminarSelection(events, value, now)?.value ?? "");
    };
    const onVisibility = () => { if (document.visibilityState === "visible") refresh(); };
    window.addEventListener(SEMINAR_SELECTION_EVENT, onSelection);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener(SEMINAR_SELECTION_EVENT, onSelection);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [events]);
  const event = resolveSeminarSelection(events, selectedValue, referenceDate);
  return event ? <SeminarEventDetails event={event} referenceDate={referenceDate} heading="Register for the seminar" /> : <p className="rounded-lg border border-white/20 p-5">New seminar dates will be announced here.</p>;
};
