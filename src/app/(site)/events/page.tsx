import Events from "@/views/Events";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { rawEvents } from "@/data/events";
import { buildEventSchema } from "@/lib/structuredData";
import { parseEventDate } from "@/lib/dateUtils";

const title = "Dental Practice Transition Events";
const description =
  "Upcoming seminars, webinars, and workshops from PTI to help dentists plan successful practice transitions.";

const formatEventDescription = (event: (typeof rawEvents)[number]) => {
  if (typeof event.description === "string") {
    return event.description;
  }
  const points = event.description.learningPoints?.length
    ? ` ${event.description.learningPoints.join(" ")}`
    : "";
  return `${event.description.intro}${points}`;
};

const upcomingEventSchemas = rawEvents
  .filter((event) => {
    const eventDate = parseEventDate(event.date);
    return eventDate >= new Date();
  })
  .map((event) =>
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
    })
  );

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/events",
});

export default function Page() {
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
      <Events />
    </>
  );
}
