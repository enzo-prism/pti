"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PHONE_NUMBER, PHONE_NUMBER_TEL } from "@/lib/constants";
import { trackCTAClick } from "@/lib/analytics";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { 
      name: "Services", 
      path: "/services",
      dropdown: [
        { name: "Services at a Glance", path: "/services" },
        { name: "Opinion of Value", path: "/services/value" },
        { name: "Selling a Practice", path: "/services/selling" },
        { name: "Associateships/Buying In", path: "/services/associateships" },
        { name: "Partnerships", path: "/services/partnerships" },
      ]
    },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Events", path: "/events" },
    { name: "Blog", path: "/blog" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white shadow-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-3 md:gap-y-4 lg:flex-nowrap">
          <div className="order-1 flex w-full items-center justify-between md:w-auto md:gap-4">
            <div className="flex max-w-full flex-col text-left">
              <Link href="/" className="text-sm md:text-base font-medium text-gray-600 hover:text-primary transition-colors" onClick={closeMenu}>
                Serving The United States
              </Link>
              <a 
                href={`tel:${PHONE_NUMBER_TEL}`}
                className="mt-1 flex items-center text-sm md:text-base font-semibold text-gray-800 transition-colors hover:text-primary whitespace-nowrap"
                onClick={() => trackCTAClick('phone_call', 'navbar')}
              >
                <Phone className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                {PHONE_NUMBER}
              </a>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-700 z-10"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <Button
            asChild
            size="sm"
            className="order-2 hidden shrink-0 md:inline-flex md:ml-auto lg:order-3 lg:ml-4"
          >
            <Link 
              href="/contact"
              onClick={() => trackCTAClick('book_consultation', 'navbar_desktop')}
            >
              Book Consultation
            </Link>
          </Button>

          {/* Desktop Navigation */}
          <nav className="order-3 hidden w-full items-center justify-center gap-2 md:flex md:flex-wrap lg:order-2 lg:w-auto lg:flex-1 lg:flex-nowrap lg:justify-center xl:justify-end">
          {navItems.map((item) => (
            item.dropdown ? (
              <div 
                key={item.name} 
                className="relative group"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <Link
                  href={item.path}
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                    pathname === item.path || pathname.startsWith(item.path) ? "text-primary" : "text-gray-700"
                  }`}
                >
                  {item.name} <ChevronDown size={16} className="ml-1" />
                </Link>
                {isServicesOpen && (
                  <div className="absolute left-0 mt-0 w-56 bg-white shadow-lg rounded-md overflow-hidden transform opacity-100 scale-100 transition-all origin-top-left z-50">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.path}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.path}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.path ? "text-primary" : "text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            )
          ))}
        </nav>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`fixed inset-0 bg-white z-0 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
        >
          <div className="flex flex-col h-full pt-20 px-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              item.dropdown ? (
                <div key={item.name} className="py-2">
                  <div className="flex items-center">
                    <Link
                      href={item.path}
                      className={`flex-1 py-2 text-lg font-medium ${
                        pathname === item.path || pathname.startsWith(item.path) ? "text-primary" : "text-gray-700"
                      }`}
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                    <button 
                      className="p-2 text-gray-600 hover:text-primary"
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      aria-label="Toggle services menu"
                    >
                      <ChevronDown 
                        size={20} 
                        className={`transition-transform ${isServicesOpen ? "rotate-180" : ""}`} 
                      />
                    </button>
                  </div>
                  {isServicesOpen && (
                    <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-200 pl-4">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.path}
                          className="block py-2 text-gray-600 hover:text-primary"
                          onClick={closeMenu}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                href={item.path}
                className={`py-2 text-lg font-medium block ${
                  pathname === item.path ? "text-primary" : "text-gray-700"
                }`}
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              )
            ))}
            <Button className="mt-4 w-full" asChild>
              <Link 
                href="/contact" 
                onClick={(e) => {
                  closeMenu();
                  trackCTAClick('book_consultation', 'navbar_mobile');
                }}
              >
                Book Consultation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
