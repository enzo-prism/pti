import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { buildSiteSearchIndex } from "@/data/searchIndex";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchRecords = buildSiteSearchIndex();

  return (
    <div className="flex min-h-screen flex-col">
      <SkipToContent />
      <Navbar searchRecords={searchRecords} />
      <main id="main-content" tabIndex={-1} className="flex-1 scroll-mt-24 outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}
