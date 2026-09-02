import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import { getCalendlyUrl } from "@/lib/constants";
import { getOgImagePath } from "@/lib/og";
import { BreadcrumbSchema, OrganizationSchema, WebsiteSchema } from "@/components/seo/JsonLd";
import { getBreadcrumbItems, getPageTitle, getPageDescription } from "@/lib/seo";
import { getCanonicalUrl } from "@/lib/canonical";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    practiceName: "",
    location: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll be in touch shortly.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      practiceName: "",
      location: "",
      message: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>{getPageTitle("home")}</title>
        <meta name="description" content={getPageDescription("home")} />
        <link rel="canonical" href={getCanonicalUrl("/").split("?")[0]} />
        <meta property="og:title" content={getPageTitle("home")} />
        <meta property="og:description" content={getPageDescription("home")} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={getCanonicalUrl("/").split("?")[0]} />
        <meta property="og:image" content={getOgImagePath()} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getPageTitle("home")} />
        <meta name="twitter:description" content={getPageDescription("home")} />
        <meta name="twitter:image" content={getOgImagePath()} />
      </Helmet>
      <OrganizationSchema />
      <WebsiteSchema />
      <BreadcrumbSchema items={getBreadcrumbItems("home")} />
      <div className="flex min-h-0 flex-col">
        {/* Hero Section */}
        <section className="min-h-0 relative flex items-center overflow-hidden bg-gradient-to-br from-primary via-primary-hover to-primary-dark py-16 sm:py-20 md:min-h-[calc(100svh-4.5rem-var(--cookie-banner-space,0px))] md:py-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-block mb-4 px-4 py-2 bg-secondary/20 rounded-full">
                <span className="text-secondary font-medium text-sm">Trusted Dental Practice Transitions</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                Expert Guidance for Your Dental Practice Transition
              </h1>
              
              <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
                Whether you&apos;re selling, buying, or forming a partnership, we provide confidential, 
                expert guidance to maximize value and ensure a smooth transition.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-secondary hover:bg-secondary-hover text-secondary-foreground text-lg px-8 py-6"
                >
                  <a href={getCalendlyUrl()} target="_blank" rel="noopener noreferrer">
                    Schedule a Consultation
                  </a>
                </Button>
                <Button 
                  asChild
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6"
                >
                  <Link to="/services">
                    Explore Services
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose Professional Transition Strategies?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                With over 30 years of experience in dental practice transitions, we understand the unique 
                challenges and opportunities that come with buying, selling, or partnering in a dental practice. 
                Our team of experts provides personalized, confidential guidance throughout every step of the process.
              </p>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">
                  Learn More About Us
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How We Can Help
              </h2>
              <p className="text-lg text-muted-foreground">
                Comprehensive services tailored to your unique situation
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Selling Your Practice",
                  description: "Maximize value and find the right buyer with our proven process.",
                  link: "/services/selling"
                },
                {
                  title: "Buying a Practice",
                  description: "Find the perfect practice opportunity and navigate the acquisition process.",
                  link: "/services/buying"
                },
                {
                  title: "Partnerships",
                  description: "Structure successful partnerships that benefit all parties involved.",
                  link: "/services/partnerships"
                }
              ].map((service, index) => (
                <div key={index} className="bg-card p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-card-foreground mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <Button asChild variant="link" className="p-0">
                    <Link to={service.link}>
                      Learn More →
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8">
                Contact us today for a confidential consultation. We&apos;re here to help you navigate 
                your practice transition with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-secondary hover:bg-secondary-hover text-secondary-foreground"
                >
                  <a href={getCalendlyUrl()} target="_blank" rel="noopener noreferrer">
                    Schedule a Consultation
                  </a>
                </Button>
                <Button 
                  asChild
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
