
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and About */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-heading font-bold text-gray-800">
                PTI<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-gray-600 mb-4">
              Practice Transitions Institute specializes in dental practice transitions,
              providing expert guidance for buying, selling, and valuing dental practices.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-primary transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/transitions" className="text-gray-600 hover:text-primary transition-colors">Transitions in Action</Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-600 hover:text-primary transition-colors">Testimonials</Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-600 hover:text-primary transition-colors">Resources</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-primary transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services/value" className="text-gray-600 hover:text-primary transition-colors">Opinion of Value</Link>
              </li>
              <li>
                <Link to="/services/selling" className="text-gray-600 hover:text-primary transition-colors">Selling a Practice</Link>
              </li>
              <li>
                <Link to="/services/associateships" className="text-gray-600 hover:text-primary transition-colors">Associateships/Buying In</Link>
              </li>
              <li>
                <Link to="/services/partnerships" className="text-gray-600 hover:text-primary transition-colors">Partnerships</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={18} className="mr-3 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-600">(555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-3 text-primary mt-1 flex-shrink-0" />
                <a href="mailto:info@practicetransitions.com" className="text-gray-600 hover:text-primary transition-colors">
                  info@practicetransitions.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-600">
                  Based in California, serving the United States
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright and Bottom Links */}
        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 sm:mb-0">
            &copy; {currentYear} Practice Transitions Institute. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-primary text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-gray-500 hover:text-primary text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
