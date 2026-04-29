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
  PRACTICE_TRANSITION_SEMINAR_REGISTER_PATH,
  practiceTransitionSeminarEvents,
  practiceTransitionSeminarFaqs,
  practiceTransitionSeminarLearningPoints,
} from "@/data/practiceTransitionSeminar";

const eventDescription = [
  "A one-day seminar for dentists preparing to buy, sell, partner, bring on an associate, or better understand practice value.",
  ...practiceTransitionSeminarLearningPoints,
].join(" ");

const eventSchemas = practiceTransitionSeminarEvents.map((event) =>
  buildEventSchema({
    id: event.id,
    title: `Practice Transitions Seminar - ${event.city}`,
    date: event.date,
    time: event.time,
    location: `${event.venueName}, ${event.addressLines.join(", ")}`,
    description: eventDescription,
    registrationLink: PRACTICE_TRANSITION_SEMINAR_REGISTER_PATH,
    type: "seminar",
    detailPath: PRACTICE_TRANSITION_SEMINAR_PATH,
    offerPrice: event.earlyBirdPrice,
  })
);

const faqSchema = buildFAQSchema(practiceTransitionSeminarFaqs);
const structuredSchemas = faqSchema
  ? [...eventSchemas, faqSchema]
  : eventSchemas;

export const metadata = buildPageMetadata({
  title: PRACTICE_TRANSITION_SEMINAR_PAGE_TITLE,
  description: PRACTICE_TRANSITION_SEMINAR_META_DESCRIPTION,
  path: PRACTICE_TRANSITION_SEMINAR_PATH,
});

export default function Page() {
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
      <PracticeTransitionSeminar />
    </>
  );
}
