"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  CalendarDays,
  ChevronDown,
  Home,
  Images,
  Menu,
  Phone,
  Quote,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PHONE_NUMBER, PHONE_NUMBER_TEL } from "@/lib/constants";
import {
  trackBookConsultationClick,
  trackPhoneCallClick,
} from "@/lib/analytics";
import { cn } from "@/lib/utils";

const SERVICES_MENU_ID = "primary-services-menu";
const MOBILE_MENU_ID = "mobile-navigation";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "About", path: "/about", icon: Users },
  {
    name: "Services",
    path: "/services",
    icon: Briefcase,
    dropdown: [
      { name: "Services at a Glance", path: "/services" },
      { name: "Opinion of Value", path: "/services/value" },
      { name: "Selling a Practice", path: "/services/selling" },
      { name: "Selling to a DSO", path: "/services/selling-to-a-dso" },
      { name: "Buying a Practice", path: "/services/buying" },
      { name: "Associateships / Buying In", path: "/services/associateships" },
      { name: "Partnerships", path: "/services/partnerships" },
    ],
  },
  { name: "Testimonials", path: "/testimonials", icon: Quote },
  { name: "Gallery", path: "/gallery", icon: Images },
  { name: "Events", path: "/events", icon: CalendarDays },
];

const focusClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const currentPath = pathname ?? "/";
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) =>
    path === "/"
      ? currentPath === "/"
      : currentPath === path || currentPath.startsWith(`${path}/`);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsMobileServicesOpen(false);
  };

  useEffect(() => {
    closeMenu();
    setIsServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const backgroundRegions = Array.from(
      document.querySelectorAll<HTMLElement>('main, footer, a[href="#main-content"]')
    );
    const previouslyInert = backgroundRegions.map((element) =>
      element.hasAttribute("inert")
    );
    backgroundRegions.forEach((element) => element.setAttribute("inert", ""));
    mobilePanelRef.current
      ?.querySelector<HTMLElement>('a[href], button:not([disabled])')
      ?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = Array.from(
        mobilePanelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      backgroundRegions.forEach((element, index) => {
        if (!previouslyInert[index]) element.removeAttribute("inert");
      });
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isServicesOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsServicesOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isServicesOpen]);

  const desktopNavLinkClass = (active: boolean) =>
    cn(
      "inline-flex min-h-11 items-center rounded-md px-2.5 py-2 text-sm font-semibold transition-colors",
      focusClass,
      active
        ? "bg-primary/10 text-primary"
        : "text-slate-700 hover:bg-primary/5 hover:text-primary"
    );

  const mobileNavLinkClass = (active: boolean) =>
    cn(
      "flex min-h-12 items-center gap-3 rounded-xl px-3 py-3 text-lg font-semibold transition-colors",
      focusClass,
      active
        ? "bg-primary/10 text-primary"
        : "text-slate-800 hover:bg-primary/5 hover:text-primary"
    );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur print:hidden">
      <div className="container flex min-h-[4.5rem] items-center gap-3 py-2">
        <Link
          href="/"
          onClick={closeMenu}
          className={cn("flex min-w-0 shrink-0 items-center gap-2 rounded-lg", focusClass)}
          aria-label="Practice Transitions Institute home"
        >
          <Image
            src="/lovable-uploads/pti-logo.webp"
            alt=""
            width={48}
            height={47}
            priority
            sizes="48px"
            className="h-12 w-12 rounded-md bg-white object-contain"
          />
          <span className="hidden max-w-36 text-sm font-bold leading-tight text-primary sm:block xl:max-w-44">
            Practice Transitions Institute
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="ml-auto hidden items-center justify-end gap-0.5 lg:flex">
          {navItems.map((item) => {
            if (!item.dropdown) {
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  aria-current={isActive(item.path) ? "page" : undefined}
                  className={desktopNavLinkClass(isActive(item.path))}
                >
                  {item.name}
                </Link>
              );
            }

            return (
              <div
                key={item.name}
                className="relative"
                onMouseLeave={() => setIsServicesOpen(false)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setIsServicesOpen(false);
                  }
                }}
              >
                <div
                  className={cn(
                    "flex min-h-11 items-center rounded-md transition-colors",
                    isActive(item.path)
                      ? "bg-primary/10 text-primary"
                      : "text-slate-700 hover:bg-primary/5 hover:text-primary"
                  )}
                >
                  <Link
                    href={item.path}
                    aria-current={currentPath === item.path ? "page" : undefined}
                    className={cn("rounded-l-md py-2 pl-2.5 text-sm font-semibold", focusClass)}
                  >
                    {item.name}
                  </Link>
                  <button
                    type="button"
                    aria-label={`${isServicesOpen ? "Close" : "Open"} Services menu`}
                    aria-expanded={isServicesOpen}
                    aria-controls={SERVICES_MENU_ID}
                    onClick={() => setIsServicesOpen((open) => !open)}
                    className={cn("flex min-h-11 min-w-9 items-center justify-center rounded-r-md", focusClass)}
                  >
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        isServicesOpen && "rotate-180"
                      )}
                    />
                  </button>
                </div>
                {isServicesOpen ? (
                  <div
                    id={SERVICES_MENU_ID}
                    className="absolute left-0 top-full z-50 mt-1 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
                  >
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.path}
                        aria-current={currentPath === subItem.path ? "page" : undefined}
                        className={cn(
                          "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                          focusClass,
                          currentPath === subItem.path
                            ? "bg-primary/10 text-primary"
                            : "text-slate-700 hover:bg-primary hover:text-white"
                        )}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <a
          href={`tel:${PHONE_NUMBER_TEL}`}
          onClick={() => trackPhoneCallClick("navbar")}
          className={cn(
            "ml-2 hidden min-h-11 shrink-0 items-center gap-1.5 rounded-md px-2 text-sm font-semibold text-slate-700 transition-colors hover:text-primary xl:flex",
            focusClass
          )}
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          {PHONE_NUMBER}
        </a>

        <Button asChild size="sm" className="ml-auto hidden shrink-0 sm:inline-flex lg:ml-2">
          <Link href="/contact" onClick={() => trackBookConsultationClick("navbar_desktop")}>
            Book Consultation
          </Link>
        </Button>

        <button
          ref={menuButtonRef}
          type="button"
          className={cn(
            "ml-auto flex min-h-11 min-w-11 items-center justify-center rounded-lg text-slate-800 transition-colors hover:bg-slate-100 hover:text-primary sm:ml-0 lg:hidden",
            focusClass
          )}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={`${isMenuOpen ? "Close" : "Open"} navigation menu`}
          aria-expanded={isMenuOpen}
          aria-controls={MOBILE_MENU_ID}
        >
          {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      <div
        ref={mobilePanelRef}
        id={MOBILE_MENU_ID}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
        className={cn(
          "absolute inset-x-0 top-full z-50 h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-t border-slate-200 bg-white px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 shadow-2xl transition-[transform,visibility] duration-300 lg:hidden",
          isMenuOpen ? "visible translate-x-0" : "invisible translate-x-full pointer-events-none"
        )}
      >
        <nav aria-label="Mobile navigation" className="mx-auto max-w-lg">
          {navItems.map((item) => {
            if (!item.dropdown) {
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  aria-current={isActive(item.path) ? "page" : undefined}
                  className={mobileNavLinkClass(isActive(item.path))}
                  onClick={closeMenu}
                >
                  <item.icon size={20} className="shrink-0" aria-hidden="true" />
                  {item.name}
                </Link>
              );
            }

            return (
              <div key={item.name} className="py-1">
                <div className="flex items-center gap-1">
                  <Link
                    href={item.path}
                    aria-current={currentPath === item.path ? "page" : undefined}
                    className={cn(mobileNavLinkClass(isActive(item.path)), "min-w-0 flex-1")}
                    onClick={closeMenu}
                  >
                    <item.icon size={20} className="shrink-0" aria-hidden="true" />
                    {item.name}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsMobileServicesOpen((open) => !open)}
                    aria-label={`${isMobileServicesOpen ? "Close" : "Open"} Services submenu`}
                    aria-expanded={isMobileServicesOpen}
                    aria-controls="mobile-services-menu"
                    className={cn(
                      "flex min-h-12 min-w-12 items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100 hover:text-primary",
                      focusClass
                    )}
                  >
                    <ChevronDown
                      size={20}
                      aria-hidden="true"
                      className={cn("transition-transform duration-200", isMobileServicesOpen && "rotate-180")}
                    />
                  </button>
                </div>
                {isMobileServicesOpen ? (
                  <div id="mobile-services-menu" className="ml-5 mt-1 space-y-1 border-l-2 border-slate-200 pl-4">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.path}
                        aria-current={currentPath === subItem.path ? "page" : undefined}
                        className={cn(
                          "block min-h-11 rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
                          focusClass,
                          currentPath === subItem.path
                            ? "bg-primary/10 text-primary"
                            : "text-slate-700 hover:bg-primary/5 hover:text-primary"
                        )}
                        onClick={closeMenu}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}

          <div className="mt-5 border-t border-slate-200 pt-5">
            <a
              href={`tel:${PHONE_NUMBER_TEL}`}
              onClick={() => trackPhoneCallClick("navbar_mobile")}
              className={cn(
                "flex min-h-12 items-center justify-center gap-2 rounded-lg border border-primary px-4 font-semibold text-primary hover:bg-primary/5",
                focusClass
              )}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {PHONE_NUMBER}
            </a>
            <Button className="mt-3 min-h-12 w-full" asChild>
              <Link
                href="/contact"
                onClick={() => {
                  closeMenu();
                  trackBookConsultationClick("navbar_mobile");
                }}
              >
                Book a Confidential Consultation
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
