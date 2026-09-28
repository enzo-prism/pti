import Events from "@/views/Events";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import {
  buildEventListing,
  getUpcomingRawEvents,
  type RawEvent,
} from "@/data/events";
import {
  buildSeminarStructuredEvent,
  practiceTransitionSeminarEvents,
} from "@/data/practiceTransitionSeminar";
import { getFeaturedReviews } from "@/data/reviews";
import { buildEventSchema } from "@/lib/structuredData";

export const revalidate = 3600;

const title = "Dental Practice Transition Events & Workshops";
const description =
  "Upcoming webinars, seminars, and workshops for dentists planning practice transitions.";

const formatEventDescription = (event: RawEvent) => {
  if (typeof event.description === "string") {
    return event.description;
  }
  const points = event.description.learningPoints?.length
    ? ` ${event.description.learningPoints.join(" ")}`
    : "";
  return `${event.description.intro}${points}`;
};

const getUpcomingEventSchemas = (referenceDate: Date) =>
  getUpcomingRawEvents(referenceDate).map((event) => {
    const seminar = practiceTransitionSeminarEvents.find(
      (candidate) => candidate.id === event.id
    );
    if (seminar) {
      return buildEventSchema(buildSeminarStructuredEvent(seminar, referenceDate));
    }

    return buildEventSchema({
      id: event.id,
      title: event.title,
      date: event.date,
      endDate: event.endDate,
      time: event.time,
      timeZone: event.timeZone,
      location: event.location,
      description: formatEventDescription(event),
      registrationLink: event.registrationLink,
      type: event.type,
      isVirtual: event.type === "webinar",
      detailPath: event.detailPath,
      image: event.flyerImage,
      offerPrice: event.offerPrice,
      offerPriceCurrency: event.offerPriceCurrency,
    });
  });

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/events",
});

export default function Page() {
  const referenceDate = new Date();

  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title,
          description,
          path: "/events",
          structuredData: getUpcomingEventSchemas(referenceDate),
        })}
      />
      <Events
        events={buildEventListing(referenceDate)}
        workshopReview={getFeaturedReviews("events")[0]}
      />
    </>
  );
}
