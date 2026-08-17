import About from "@/views/About";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";

const title = "About Practice Transitions Institute";
const description =
  "Meet PTI's leadership and learn how the firm guides dental practice valuations, sales, acquisitions, DSO offers, buy-ins, and partnerships.";

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
