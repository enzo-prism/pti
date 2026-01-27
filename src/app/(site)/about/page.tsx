import About from "@/views/About";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";

const title = "About PTI Dental Practice Transition Experts";
const description =
  "Meet the PTI leadership team and learn our approach to dental practice valuation, sales, partnerships, and associateships.";

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/about",
});

export default function Page() {
  return (
    <>
      <StructuredData data={buildPageJsonLd({ title, description, path: "/about" })} />
      <About />
    </>
  );
}
