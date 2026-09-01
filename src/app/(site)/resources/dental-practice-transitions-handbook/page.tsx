import Handbook from "@/views/Handbook";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { HANDBOOK_PATH } from "@/lib/constants";

const title = "Dental Practice Transitions Handbook";
const description =
  "Dr. Michael Njo's published guide to buying, selling, and transitioning a dental practice in a changing market.";
const path = HANDBOOK_PATH;

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
      <Handbook />
    </>
  );
}
