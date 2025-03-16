
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Home"; // Changed from Index to Home
import NotFound from "./pages/NotFound";
import Faq from "./pages/Faq";
import Testimonials from "./pages/Testimonials";
import Events from "./pages/Events";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import Layout from "./components/layout/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Layout><Index /></Layout>} />
        <Route path="/faq" element={<Layout><Faq /></Layout>} />
        <Route path="/testimonials" element={<Layout><Testimonials /></Layout>} />
        <Route path="/events" element={<Layout><Events /></Layout>} />
        <Route path="/resources" element={<Layout><Resources /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
