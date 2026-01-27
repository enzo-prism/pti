import LeadershipRetreat from "@/views/LeadershipRetreat";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { rawEvents } from "@/data/events";
import { buildEventSchema } from "@/lib/structuredData";

const title = "Leadership Retreat for Practice Owners";
const description =
  "Join PTI's leadership retreat in Savannah, GA for practice owners ready to lead with clarity and confidence.";

const retreatEvent = rawEvents.find(
  (event) => event.detailPath === "/events/leadership-retreat"
);

const retreatSchema = retreatEvent
  ? buildEventSchema({
      id: retreatEvent.id,
      title: retreatEvent.title,
      date: retreatEvent.date,
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
