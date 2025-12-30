import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useGoogleAnalytics } from "@/hooks/use-google-analytics";
import { useAnalytics } from "@/hooks/use-analytics";
import Index from "./pages/Home";
import NotFound from "./pages/NotFound";
import Faq from "./pages/Faq";
import Testimonials from "./pages/Testimonials";
import Events from "./pages/Events";
import LeadershipRetreat from "./pages/LeadershipRetreat";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import DrNjo from "./pages/DrNjo";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Layout from "./components/layout/Layout";
import MinimalLayout from "./components/layout/MinimalLayout";

// Services pages
import Value from "./pages/services/Value";
import Selling from "./pages/services/Selling";
import Associateships from "./pages/services/Associateships";
import Partnerships from "./pages/services/Partnerships";

// Redirect /updates/:slug to /blog/:slug
const UpdatesRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/blog/${slug}`} replace />;
};

const queryClient = new QueryClient();

// Analytics wrapper component
const AppWithAnalytics = () => {
  useGoogleAnalytics();
  useAnalytics(); // Load GA/Hotjar only in production on canonical host
  return (
    <>
      <Toaster />
      <SonnerToaster />
      <Routes>
        <Route path="/" element={<Layout><Index /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/meet-our-team/" element={<Navigate to="/about" replace />} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/services/value" element={<Layout><Value /></Layout>} />
        <Route path="/services/selling" element={<Layout><Selling /></Layout>} />
        <Route path="/services/associateships" element={<Layout><Associateships /></Layout>} />
        <Route path="/services/partnerships" element={<Layout><Partnerships /></Layout>} />
        <Route path="/blog" element={<Layout><Blog /></Layout>} />
        <Route path="/blog/:slug" element={<Layout><BlogPost /></Layout>} />
        <Route path="/faq" element={<Layout><Faq /></Layout>} />
        <Route path="/testimonials" element={<Layout><Testimonials /></Layout>} />
        <Route path="/events" element={<Layout><Events /></Layout>} />
        <Route path="/events/leadership-retreat" element={<Layout><LeadershipRetreat /></Layout>} />
        <Route path="/speaking-engagements/" element={<Navigate to="/events" replace />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
        <Route path="/terms-of-service" element={<Layout><TermsOfService /></Layout>} />
        <Route path="/updates/:slug" element={<UpdatesRedirect />} />
        <Route path="/drnjo" element={<MinimalLayout><DrNjo /></MinimalLayout>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <BrowserRouter>
          <AppWithAnalytics />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
