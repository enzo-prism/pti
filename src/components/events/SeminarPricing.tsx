import {
  getSeminarPriceQuote,
  type PracticeTransitionSeminarEvent,
} from "@/data/practiceTransitionSeminar";
import { formatCurrency, type AttendeeCount } from "@/lib/seminarRegistration";

interface SeminarPricingProps {
  event: PracticeTransitionSeminarEvent;
  referenceDate: Date;
  attendeeCount: AttendeeCount;
}

export const SeminarPricing = ({ event, referenceDate, attendeeCount }: SeminarPricingProps) => {
  const quote = getSeminarPriceQuote(event, referenceDate);
  const count = Number(attendeeCount);
  return (
    <section aria-label="Registration pricing" aria-live="polite" aria-atomic="true" className="rounded-xl border border-primary/20 bg-primary/5 p-5">
      <h3 className="text-lg font-bold text-primary">
        {quote.isPromotional ? "Early registration special" : "Registration pricing"}
      </h3>
      {quote.isPromotional && (
        <p className="mt-2 text-base leading-relaxed">
          Register by {quote.promotionEndsOn} and save {formatCurrency(event.standardPrice - quote.primaryPrice)}.
        </p>
      )}
      <p className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-3xl font-bold text-primary" data-testid="seminar-primary-price">{formatCurrency(quote.primaryPrice)}</span>
        {quote.isPromotional && <del className="text-base text-muted-foreground">{formatCurrency(event.standardPrice)}</del>}
        <span className="text-base">first participant</span>
      </p>
      <p className="mt-2 text-base">Additional attendees are {formatCurrency(quote.guestPrice)} each.</p>
      {count > 1 && (
        <p className="mt-2 text-base font-semibold">
          Total for {count} attendees: {formatCurrency(quote.primaryPrice + (count - 1) * quote.guestPrice)}
        </p>
      )}
      {attendeeCount === "5+" && <p className="mt-2 text-base">PTI will confirm your group total by phone.</p>}
    </section>
  );
};
