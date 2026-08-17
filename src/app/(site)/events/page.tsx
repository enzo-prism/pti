import Events from "@/views/Events";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { getUpcomingRawEvents, rawEvents } from "@/data/events";
import { getFeaturedReviews } from "@/data/reviews";
import { buildEventSchema } from "@/lib/structuredData";

export const revalidate = 3600;

const title = "Dental Practice Transition Events & Workshops";
const description =
  "Upcoming webinars, seminars, and workshops for dentists planning practice transitions.";

const formatEventDescription = (event: (typeof rawEvents)[number]) => {
  if (typeof event.description === "string") {
    return event.description;
  }
  const points = event.description.learningPoints?.length
    ? ` ${event.description.learningPoints.join(" ")}`
    : "";
  return `${event.description.intro}${points}`;
};

const getUpcomingEventSchemas = (referenceDate: Date) =>
  getUpcomingRawEvents(referenceDate).map((event) =>
    buildEventSchema({
      id: event.id,
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: formatEventDescription(event),
      registrationLink: event.registrationLink,
      type: event.type,
      isVirtual: event.type === "webinar",
      detailPath: event.detailPath,
      offerPrice: event.offerPrice,
      offerPriceCurrency: event.offerPriceCurrency,
    })
  );

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/events",
});

export default function Page() {
  const upcomingEventSchemas = getUpcomingEventSchemas(new Date());

  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title,
          description,
          path: "/events",
          structuredData: upcomingEventSchemas,
        })}
      />
      <Events workshopReview={getFeaturedReviews("events")[0]} />
    </>
  );
}
