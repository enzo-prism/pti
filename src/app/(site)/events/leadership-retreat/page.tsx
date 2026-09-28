import LeadershipRetreat from "@/views/LeadershipRetreat";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { rawEvents } from "@/data/events";
import { buildEventSchema } from "@/lib/structuredData";
import { isEventPast } from "@/lib/dateUtils";

const title = "2026 Dental Practice Leadership Retreat Archive";
const description =
  "An archive of PTI's participation in the June 2026 dental practice leadership retreat in Savannah, Georgia.";

export const revalidate = 3600;

const retreatEvent = rawEvents.find(
  (event) => event.detailPath === "/events/leadership-retreat"
);

const buildRetreatSchema = (referenceDate: Date) => {
  if (!retreatEvent) return null;

  // Registration closes once the final day of the retreat has passed.
  const retreatIsPast = isEventPast(
    retreatEvent.endDate ?? retreatEvent.date,
    referenceDate
  );

  return buildEventSchema({
    id: retreatEvent.id,
    title: retreatEvent.title,
    date: retreatEvent.date,
    endDate: retreatEvent.endDate,
    time: retreatEvent.time,
    timeZone: retreatEvent.timeZone,
    location: retreatEvent.location,
    description:
      typeof retreatEvent.description === "string"
        ? retreatEvent.description
        : retreatEvent.description.intro,
    registrationLink: retreatEvent.registrationLink,
    type: retreatEvent.type,
    isVirtual: retreatEvent.type === "webinar",
    detailPath: retreatEvent.detailPath,
    registrationOpen: !retreatIsPast,
  });
};

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/events/leadership-retreat",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title,
          description,
          path: "/events/leadership-retreat",
          structuredData: buildRetreatSchema(new Date()),
        })}
      />
      <LeadershipRetreat />
    </>
  );
}
