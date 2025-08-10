
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { PHONE_NUMBER } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const isMobile = useIsMobile();
  
  return (
    <footer className="bg-gray-50 pt-12 pb-6 border-t">
      <div className="container px-4 sm:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Logo and About */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <div className="h-12 w-auto bg-white rounded-lg overflow-hidden">
                <img 
                  src="/lovable-uploads/18b2244b-dbb5-4dd6-a1ca-c6a28fed53c6.png"
                  alt="PTI Logo"
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Practice Transitions Institute specializes in dental practice transitions,
              providing expert guidance for buying, selling, and valuing dental practices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-3 text-gray-800">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 text-sm hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 text-sm hover:text-primary transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/transitions" className="text-gray-600 text-sm hover:text-primary transition-colors">Transitions in Action</Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-600 text-sm hover:text-primary transition-colors">Testimonials</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 text-sm hover:text-primary transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base font-semibold mb-3 text-gray-800">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services/value" className="text-gray-600 text-sm hover:text-primary transition-colors">Opinion of Value</Link>
              </li>
              <li>
                <Link to="/services/selling" className="text-gray-600 text-sm hover:text-primary transition-colors">Selling a Practice</Link>
              </li>
              <li>
                <Link to="/services/associateships" className="text-gray-600 text-sm hover:text-primary transition-colors">Associateships/Buying In</Link>
              </li>
              <li>
                <Link to="/services/partnerships" className="text-gray-600 text-sm hover:text-primary transition-colors">Partnerships</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-base font-semibold mb-3 text-gray-800">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Phone size={16} className="mr-2 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-600 text-sm">{PHONE_NUMBER}</span>
              </li>
              <li className="flex items-start">
                <Mail size={16} className="mr-2 text-primary mt-1 flex-shrink-0" />
                <a href="mailto:info@practicetransitions.com" className="text-gray-600 text-sm hover:text-primary transition-colors">
                  info@practicetransitions.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-600 text-sm">
                  3182 Campus Drive #274<br />
                  San Mateo, CA 94403
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright and Bottom Links */}
        <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs mb-4 sm:mb-0 text-center sm:text-left">
            &copy; {currentYear} Practice Transitions Institute. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-primary text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-gray-500 hover:text-primary text-xs transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
