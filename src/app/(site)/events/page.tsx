import Events from "@/views/Events";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import {
  buildEventListing,
  getUpcomingRawEvents,
} from "@/data/events";
import { getFeaturedReviews } from "@/data/reviews";
import { buildAbsoluteUrl } from "@/lib/siteMetadata";

// Date-sensitive pricing and Event offers must be fresh at the Pacific cutoff.
export const dynamic = "force-dynamic";

const title = "Dental Practice Transition Events & Workshops";
const description =
  "Upcoming webinars, seminars, and workshops for dentists planning practice transitions.";

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
          pageType: "CollectionPage",
          structuredData: [{ "@type": "ItemList", itemListElement: getUpcomingRawEvents(referenceDate).filter((event) => event.detailPath).map((event, index) => ({ "@type": "ListItem", position: index + 1, name: event.title, url: buildAbsoluteUrl(event.detailPath!) })) }],
        })}
      />
      <Events
        events={buildEventListing(referenceDate)}
        workshopReview={getFeaturedReviews("events")[0]}
      />
    </>
  );
}
