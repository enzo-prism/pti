import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PHONE_NUMBER,
  PHONE_NUMBER_TEL,
  PRACTICE_SALE_CHECKLIST_PATH,
} from "@/lib/constants";
import { SITE_CONTACT_EMAIL, BUSINESS_ADDRESS } from "@/lib/siteMetadata";
import { BUILD_ID, BUILD_DATE } from "@/lib/buildInfo";

const exploreLinks = [
  { name: "About Us", path: "/about" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "Gallery", path: "/gallery" },
  { name: "Events", path: "/events" },
  { name: "Blog", path: "/blog" },
  { name: "FAQ", path: "/faq" },
  { name: "Resources", path: "/resources" },
  { name: "What's My Practice Worth?", path: "/resources/how-much-is-my-dental-practice-worth" },
  { name: "Sale Readiness Checklist", path: PRACTICE_SALE_CHECKLIST_PATH },
  { name: "Locations", path: "/locations" },
];

const serviceLinks = [
  { name: "Services at a Glance", path: "/services" },
  { name: "Opinion of Value", path: "/services/value" },
  { name: "Selling a Practice", path: "/services/selling" },
  { name: "Selling to a DSO", path: "/services/selling-to-a-dso" },
  { name: "Associateships / Buying In", path: "/services/associateships" },
  { name: "Partnerships", path: "/services/partnerships" },
];

const linkClass =
  "text-sm text-white/70 transition-colors hover:text-white";
const headingClass =
  "mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/50";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-4 border-primary bg-[#06243f] text-white print:hidden">
      <div className="container mx-auto px-4 py-12 sm:px-6 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr] lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="block h-12 w-auto overflow-hidden rounded-lg bg-white p-1.5">
                <Image
                  src="/lovable-uploads/pti-logo.webp"
                  alt="Practice Transitions Institute logo"
                  width={480}
                  height={466}
                  className="h-full w-auto object-contain"
                  sizes="48px"
                />
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              Your trusted partner in dental practice transitions — expert
              guidance, personalized support, and proven strategies. Serving
              dentists across the United States.
            </p>
            <Button
              asChild
              variant="secondary"
              className="mt-6 !bg-white text-primary hover:!bg-white/90"
            >
              <Link href="/contact" className="inline-flex items-center gap-2">
                Book a Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <h2 className={headingClass}>Explore</h2>
            <ul className="space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className={linkClass}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services">
            <h2 className={headingClass}>Our Services</h2>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className={linkClass}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className={headingClass}>Get in Touch</h2>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
                <a href={`tel:${PHONE_NUMBER_TEL}`} className={linkClass}>
                  {PHONE_NUMBER}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
                <a
                  href={`mailto:${SITE_CONTACT_EMAIL}`}
                  className={`${linkClass} break-words`}
                >
                  {SITE_CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
                <span className="text-sm not-italic leading-relaxed text-white/70">
                  {BUSINESS_ADDRESS.streetAddress}
                  <br />
                  {BUSINESS_ADDRESS.addressLocality},{" "}
                  {BUSINESS_ADDRESS.addressRegion} {BUSINESS_ADDRESS.postalCode}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="order-2 text-center text-xs text-white/50 sm:order-1 sm:text-left">
            &copy; {currentYear} Practice Transitions Institute. All rights
            reserved.
          </p>
          <div className="order-1 flex items-center gap-5 sm:order-2">
            <Link
              href="/privacy-policy"
              className="text-xs text-white/60 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-xs text-white/60 transition-colors hover:text-white"
            >
              Terms of Service
            </Link>
            <span
              className="font-mono text-[10px] text-white/40"
              title={`Build: ${BUILD_DATE}`}
            >
              v{BUILD_ID}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
