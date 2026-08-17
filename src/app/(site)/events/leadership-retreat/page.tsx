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
const retreatEndDate = retreatEvent?.dateDisplay
  ? "June 6, 2026"
  : undefined;
const retreatIsPast = retreatEvent ? isEventPast(retreatEvent.date) : true;

const retreatSchema = retreatEvent
  ? buildEventSchema({
      id: retreatEvent.id,
      title: retreatEvent.title,
      date: retreatEvent.date,
      endDate: retreatEndDate,
      time: retreatEvent.time,
      location: retreatEvent.location,
      description:
        typeof retreatEvent.description === "string"
          ? retreatEvent.description
          : retreatEvent.description.intro,
      registrationLink: retreatEvent.registrationLink,
      type: retreatEvent.type,
      isVirtual: retreatEvent.type === "webinar",
      detailPath: retreatEvent.detailPath,
      eventStatus: retreatIsPast ? "completed" : "scheduled",
      registrationOpen: !retreatIsPast,
    })
  : null;

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
          structuredData: retreatSchema,
        })}
      />
      <LeadershipRetreat />
    </>
  );
}
