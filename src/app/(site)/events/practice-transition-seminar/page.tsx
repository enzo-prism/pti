import PracticeTransitionSeminar from "@/views/PracticeTransitionSeminar";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { buildEventSchema } from "@/lib/structuredData";
import {
  PRACTICE_TRANSITION_SEMINAR_META_DESCRIPTION,
  PRACTICE_TRANSITION_SEMINAR_PAGE_TITLE,
  PRACTICE_TRANSITION_SEMINAR_PATH,
  buildSeminarStructuredEvent,
  getUpcomingPracticeTransitionSeminarEvents,
} from "@/data/practiceTransitionSeminar";

export const revalidate = 3600;

export const metadata = buildPageMetadata({
  title: PRACTICE_TRANSITION_SEMINAR_PAGE_TITLE,
  description: PRACTICE_TRANSITION_SEMINAR_META_DESCRIPTION,
  path: PRACTICE_TRANSITION_SEMINAR_PATH,
});

export default function Page() {
  const referenceDate = new Date();
  const upcomingEvents = getUpcomingPracticeTransitionSeminarEvents(referenceDate);
  const eventSchemas = upcomingEvents.map((event) =>
    buildEventSchema(buildSeminarStructuredEvent(event, referenceDate))
  );

  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title: PRACTICE_TRANSITION_SEMINAR_PAGE_TITLE,
          description: PRACTICE_TRANSITION_SEMINAR_META_DESCRIPTION,
          path: PRACTICE_TRANSITION_SEMINAR_PATH,
          structuredData: eventSchemas,
        })}
      />
      <PracticeTransitionSeminar
        events={upcomingEvents}
        referenceDateIso={referenceDate.toISOString()}
      />
    </>
  );
};
