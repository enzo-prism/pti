import About from "@/views/About";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";

const title = "About Practice Transitions Institute";
const description =
  "Meet the PTI leadership team and learn how we guide dentists through practice transitions with integrity, expertise, and personalized support.";

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
