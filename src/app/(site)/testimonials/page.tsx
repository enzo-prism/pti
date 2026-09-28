import Testimonials from "@/views/Testimonials";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { reviews } from "@/data/reviews";

const title = "Dental Practice Transition Testimonials";
const description =
  "Hear from dentists who trusted PTI for practice valuation, sales, partnerships, and transition planning.";
const path = "/testimonials";

export const metadata = buildPageMetadata({
  title,
  description,
  path,
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title,
          description,
          path,
        })}
      />
      <Testimonials reviews={reviews} />
    </>
  );
}
