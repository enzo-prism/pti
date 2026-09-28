import PracticeTransitionSeminar from "@/views/PracticeTransitionSeminar";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import {
  buildEventSchema,
  buildFAQSchema,
} from "@/lib/structuredData";
import {
  PRACTICE_TRANSITION_SEMINAR_META_DESCRIPTION,
  PRACTICE_TRANSITION_SEMINAR_PAGE_TITLE,
  PRACTICE_TRANSITION_SEMINAR_PATH,
  buildSeminarStructuredEvent,
  practiceTransitionSeminarFaqs,
  getPastPracticeTransitionSeminarEvents,
  getUpcomingPracticeTransitionSeminarEvents,
} from "@/data/practiceTransitionSeminar";
import { getReviewBySlug } from "@/data/reviews";

const faqSchema = buildFAQSchema(practiceTransitionSeminarFaqs);

export const revalidate = 3600;

export const metadata = buildPageMetadata({
  title: PRACTICE_TRANSITION_SEMINAR_PAGE_TITLE,
  description: PRACTICE_TRANSITION_SEMINAR_META_DESCRIPTION,
  path: PRACTICE_TRANSITION_SEMINAR_PATH,
});

export default function Page() {
  const referenceDate = new Date();
  const upcomingEvents = getUpcomingPracticeTransitionSeminarEvents(referenceDate);
  const archivedEvents = getPastPracticeTransitionSeminarEvents(referenceDate);
  const eventSchemas = upcomingEvents.map((event) =>
    buildEventSchema(buildSeminarStructuredEvent(event, referenceDate))
  );
  const structuredSchemas = faqSchema
    ? [...eventSchemas, faqSchema]
    : eventSchemas;

  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title: PRACTICE_TRANSITION_SEMINAR_PAGE_TITLE,
          description: PRACTICE_TRANSITION_SEMINAR_META_DESCRIPTION,
          path: PRACTICE_TRANSITION_SEMINAR_PATH,
          structuredData: structuredSchemas,
        })}
      />
      <PracticeTransitionSeminar
        testimonial={getReviewBySlug("ankit-sidana-seminar-mentorship")}
        events={upcomingEvents}
        archivedEvents={archivedEvents}
        referenceDateIso={referenceDate.toISOString()}
      />
    </>
  );
}
