import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SkipToContent } from "@/components/layout/SkipToContent";

export default function MinimalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipToContent />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 scroll-mt-24 outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}
