import PracticeTransitionSeminar from "@/views/PracticeTransitionSeminar";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { buildAbsoluteUrl } from "@/lib/siteMetadata";
import {
  PRACTICE_TRANSITION_SEMINAR_META_DESCRIPTION,
  PRACTICE_TRANSITION_SEMINAR_PAGE_TITLE,
  PRACTICE_TRANSITION_SEMINAR_PATH,
  getSeminarDetailPath,
  getUpcomingPracticeTransitionSeminarEvents,
} from "@/data/practiceTransitionSeminar";

// Date-sensitive pricing and Event offers must be fresh at the Pacific cutoff.
export const dynamic = "force-dynamic";

export const metadata = buildPageMetadata({
  title: PRACTICE_TRANSITION_SEMINAR_PAGE_TITLE,
  description: PRACTICE_TRANSITION_SEMINAR_META_DESCRIPTION,
  path: PRACTICE_TRANSITION_SEMINAR_PATH,
});

export default function Page() {
  const referenceDate = new Date();
  const upcomingEvents = getUpcomingPracticeTransitionSeminarEvents(referenceDate);
  const eventList = { "@type": "ItemList", itemListElement: upcomingEvents.map((event, index) => ({ "@type": "ListItem", position: index + 1, name: `Dental Practice Transition Seminar - ${event.city}`, url: buildAbsoluteUrl(getSeminarDetailPath(event)) })) };

  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title: PRACTICE_TRANSITION_SEMINAR_PAGE_TITLE,
          description: PRACTICE_TRANSITION_SEMINAR_META_DESCRIPTION,
          path: PRACTICE_TRANSITION_SEMINAR_PATH,
          pageType: "CollectionPage",
          structuredData: [eventList],
        })}
      />
      <PracticeTransitionSeminar
        events={upcomingEvents}
        referenceDateIso={referenceDate.toISOString()}
      />
    </>
  );
};
