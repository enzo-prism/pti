
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Home"; // Changed from Index to Home
import NotFound from "./pages/NotFound";
import Faq from "./pages/Faq";
import Testimonials from "./pages/Testimonials";
import Events from "./pages/Events";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Services from "./pages/Services";
import Transitions from "./pages/Transitions";
import Layout from "./components/layout/Layout";

// Services pages
import Value from "./pages/services/Value";
import Selling from "./pages/services/Selling";
import Associateships from "./pages/services/Associateships";
import Partnerships from "./pages/services/Partnerships";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <BrowserRouter>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/services/value" element={<Layout><Value /></Layout>} />
          <Route path="/services/selling" element={<Layout><Selling /></Layout>} />
          <Route path="/services/associateships" element={<Layout><Associateships /></Layout>} />
          <Route path="/services/partnerships" element={<Layout><Partnerships /></Layout>} />
          <Route path="/transitions" element={<Layout><Transitions /></Layout>} />
          <Route path="/transitions/:id" element={<Layout><Transitions /></Layout>} />
          <Route path="/faq" element={<Layout><Faq /></Layout>} />
          <Route path="/testimonials" element={<Layout><Testimonials /></Layout>} />
          <Route path="/events" element={<Layout><Events /></Layout>} />
          <Route path="/resources" element={<Layout><Resources /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
