import type { Metadata } from "next";
import PracticeSaleChecklist from "@/views/PracticeSaleChecklist";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { PRACTICE_SALE_CHECKLIST_PATH } from "@/lib/constants";

const title = "Practice Sale Readiness Checklist for Dentists";
const description =
  "A free checklist of the financial records, valuation numbers, legal documents, and transition decisions to prepare before selling your dental practice.";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: PRACTICE_SALE_CHECKLIST_PATH,
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title,
          description,
          path: PRACTICE_SALE_CHECKLIST_PATH,
        })}
      />
      <PracticeSaleChecklist />
    </>
  );
}
