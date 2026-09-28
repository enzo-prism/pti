"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Phone,
  Mail,
} from "lucide-react";
import type { ListedEvent } from "@/data/events";
import { trackEventRegistrationClick } from "@/lib/analytics";
import { PHONE_NUMBER_TEL } from "@/lib/constants";
import { SITE_CONTACT_EMAIL } from "@/lib/siteMetadata";
import {
  Section,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MultiDateEventCard } from "@/components/ui/multi-date-event-card";

const getEventTypeColor = (type: string) => {
  switch (type) {
    case "webinar":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "seminar":
      return "bg-green-100 text-green-700 border-green-200";
    case "workshop":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "dinner":
      return "bg-amber-100 text-amber-800 border-amber-200";
    default:
      return "bg-purple-100 text-purple-700 border-purple-200";
  }
};

interface EventsListingProps {
  /** Built on the server by `buildEventListing`, past flags included. */
  events: ListedEvent[];
}

export const EventsListing = ({ events }: EventsListingProps) => {
  const [showPastEvents, setShowPastEvents] = useState(false);

  const filteredEvents = showPastEvents
    ? events
    : events.filter((event) => !event.isPast);

  const upcomingEvents = events.filter((event) => !event.isPast);
  const pastEvents = events.filter((event) => event.isPast);

  return (
    <Section className="py-12 md:py-16 lg:py-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <SectionTitle>Upcoming Events</SectionTitle>
          <SectionSubtitle>
            Don&apos;t miss our latest educational opportunities
          </SectionSubtitle>
        </div>
        {pastEvents.length > 0 && (
          <button
            type="button"
            onClick={() => setShowPastEvents(!showPastEvents)}
            className="inline-flex min-h-11 items-center text-primary font-medium text-sm hover:text-primary/80 transition-colors"
          >
            {showPastEvents ? "Hide Past Events" : "View Past Events"}
            <ChevronRight size={16} className="ml-1" />
          </button>
        )}
      </div>

      {/* No Events Message */}
      {upcomingEvents.length === 0 && !showPastEvents && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Upcoming Events
          </h3>
          <p className="text-gray-500 mb-6">
            Please check back soon or contact us for private consultation
            options.
          </p>
          <Button asChild>
            <Link href="/contact">Schedule a Consultation</Link>
          </Button>
        </div>
      )}

      {/* Events List */}
      <div className="space-y-4 relative">
        {filteredEvents.map((event) => {
          // Render multi-date event card for grouped events
          if (event.isEventGroup && event.eventDates) {
            return (
              <MultiDateEventCard
                key={event.id}
                title={event.title}
                description={event.description}
                type={event.type}
                registrationLink={event.registrationLink}
                eventDates={event.eventDates}
                isPast={event.isPast}
                speakers={event.speakers}
                getEventTypeColor={getEventTypeColor}
              />
            );
          }
          const dateLabel = event.dateDisplay ?? event.date;
          const requiresAvailabilityConfirmation =
            event.registrationLink.startsWith("mailto:");

          // Render single event card for individual events
          return (
            <div
              key={event.id}
              className={`relative rounded-xl transition-all duration-300 group z-10 ${
                event.isPast
                  ? "bg-gray-50 border-2 border-dashed border-gray-300 shadow-none hover:shadow-sm"
                  : "bg-white border-2 border-gray-200 shadow-sm hover:shadow-lg hover:border-primary/30"
              } ${event.type === "webinar" && !event.isPast ? "bg-cover bg-center" : ""}`}
              style={
                event.type === "webinar" && !event.isPast
                  ? {
                      backgroundImage: `url(/lovable-uploads/events-hero-office.webp)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : {}
              }
            >
              {/* Status Banner */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${
                  event.isPast
                    ? "bg-gray-400"
                    : "bg-gradient-to-r from-primary to-primary/70"
                }`}
              ></div>

              {/* Overlay for webinar card to ensure text readability */}
              {event.type === "webinar" && !event.isPast && (
                <div className="absolute inset-0 bg-white/95 rounded-xl"></div>
              )}

              {/* Content wrapper with relative positioning */}
              <div className="relative z-10 p-4 md:p-6">
                {/* Event Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getEventTypeColor(event.type)}`}
                      >
                        {event.type}
                      </span>
                      {event.isPast ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 border border-gray-300">
                          Event Completed
                        </span>
                      ) : (
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
                            requiresAvailabilityConfirmation
                              ? "bg-amber-100 text-amber-800 border-amber-200"
                              : "bg-green-100 text-green-700 border-green-200"
                          }`}
                        >
                          {requiresAvailabilityConfirmation
                            ? "Confirm availability"
                            : "Registration Open"}
                        </span>
                      )}
                    </div>
                    <h3
                      className={`text-lg md:text-xl font-semibold leading-tight ${
                        event.isPast ? "text-gray-600" : "text-gray-900"
                      }`}
                    >
                      {event.title}
                    </h3>
                    {event.subtitle ? (
                      <p
                        className={`mt-1 text-sm font-medium leading-snug ${
                          event.isPast ? "text-gray-500" : "text-primary"
                        }`}
                      >
                        {event.subtitle}
                      </p>
                    ) : null}
                  </div>
                  {event.flyerImage ? (
                    <div className="mx-auto w-28 shrink-0 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-black/5 sm:mx-0">
                      <Image
                        src={event.flyerImage}
                        alt={event.flyerImageAlt ?? event.title}
                        width={141}
                        height={200}
                        className="h-auto w-full object-contain"
                        sizes="112px"
                      />
                    </div>
                  ) : null}
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  <div
                    className={`flex items-center text-sm ${
                      event.isPast ? "text-gray-500" : "text-gray-600"
                    }`}
                  >
                    <Calendar
                      size={16}
                      className={`mr-2 flex-shrink-0 ${
                        event.isPast ? "text-gray-400" : "text-primary"
                      }`}
                    />
                    <span className={event.isPast ? "" : "font-medium"}>
                      {dateLabel}
                    </span>
                  </div>
                  <div
                    className={`flex items-center text-sm ${
                      event.isPast ? "text-gray-500" : "text-gray-600"
                    }`}
                  >
                    <Clock
                      size={16}
                      className={`mr-2 flex-shrink-0 ${
                        event.isPast ? "text-gray-400" : "text-primary"
                      }`}
                    />
                    <span>{event.time}</span>
                  </div>
                  <div
                    className={`flex items-center text-sm ${
                      event.isPast ? "text-gray-500" : "text-gray-600"
                    }`}
                  >
                    <MapPin
                      size={16}
                      className={`mr-2 flex-shrink-0 ${
                        event.isPast ? "text-gray-400" : "text-primary"
                      }`}
                    />
                    <span className="line-clamp-2">{event.location}</span>
                  </div>
                </div>

                {/* Event Description */}
                <div
                  className={`mb-4 ${
                    event.isPast ? "text-gray-500" : "text-gray-600"
                  }`}
                >
                  {typeof event.description === "string" ? (
                    <p className="text-sm leading-relaxed line-clamp-3">
                      {event.description}
                    </p>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm leading-relaxed">
                        {event.description.intro}
                      </p>
                      <div>
                        <p className="text-sm font-semibold mb-2">
                          {event.description.learningPointsHeading ??
                            "At this seminar, you'll discover how to:"}
                        </p>
                        <ul className="text-sm space-y-1">
                          {event.description.learningPoints.map(
                            (point, index) => (
                              <li key={index} className="flex items-start">
                                <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {point}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {event.speakers && event.speakers.length > 0 && (
                    <div className="mb-6">
                      <h4
                        className={`text-sm font-semibold mb-3 ${
                          event.isPast ? "text-gray-600" : "text-gray-900"
                        }`}
                      >
                        {event.type === "webinar"
                          ? "Featured Speakers"
                          : "Meet Your Experts"}
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {event.speakers.map((speaker, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center text-center group"
                          >
                            <div className="relative mb-2 w-12 sm:w-16">
                              <AspectRatio ratio={4 / 5}>
                                <Image
                                  src={speaker.imageUrl}
                                  alt={speaker.name}
                                  fill
                                  sizes="(min-width: 640px) 64px, 48px"
                                  className={`object-contain rounded-lg border-2 border-white bg-white shadow-md transition-opacity duration-200 ${
                                    event.isPast
                                      ? "grayscale opacity-70"
                                      : "group-hover:opacity-90"
                                  }`}
                                />
                              </AspectRatio>
                              {!event.isPast && (
                                <div className="absolute inset-0 rounded-lg bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                              )}
                            </div>
                            <div className="px-1">
                              <p
                                className={`text-xs font-medium leading-tight mb-1 ${
                                  event.isPast
                                    ? "text-gray-500"
                                    : "text-gray-900"
                                }`}
                              >
                                {speaker.name}
                              </p>
                              <p
                                className={`text-xs leading-tight ${
                                  event.isPast
                                    ? "text-gray-400"
                                    : "text-gray-600"
                                }`}
                              >
                                {speaker.title}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {!event.isPast ? (
                    event.detailPath ? (
                      <Button
                        asChild
                        size="sm"
                        className="flex-1 sm:flex-none"
                      >
                        <Link href={event.detailPath}>View Details</Link>
                      </Button>
                    ) : requiresAvailabilityConfirmation ? (
                      <>
                        <Button
                          asChild
                          size="sm"
                          className="flex-1 sm:flex-none"
                        >
                          <a
                            href={event.registrationLink}
                            onClick={() =>
                              trackEventRegistrationClick(
                                event.title
                                  .replace(/\s+/g, "_")
                                  .toLowerCase(),
                                "email",
                              )
                            }
                          >
                            <Mail size={16} className="mr-2" />
                            Confirm Availability
                          </a>
                        </Button>
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="flex-1 sm:flex-none"
                        >
                          <a href={`tel:${PHONE_NUMBER_TEL}`}>
                            <Phone size={16} className="mr-2" />
                            Call PTI
                          </a>
                        </Button>
                      </>
                    ) : event.registrationLink.startsWith("http") ? (
                      <>
                        <Button
                          asChild
                          size="sm"
                          className="flex-1 sm:flex-none"
                        >
                          <a
                            href={event.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                              trackEventRegistrationClick(
                                event.title
                                  .replace(/\s+/g, "_")
                                  .toLowerCase(),
                                "external",
                              )
                            }
                          >
                            Register Now
                          </a>
                        </Button>
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="flex-1 sm:flex-none"
                        >
                          <a
                            href={`mailto:${SITE_CONTACT_EMAIL}?subject=Event Registration Inquiry`}
                          >
                            <Mail size={16} className="mr-2" />
                            Email Us to Register
                          </a>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          asChild
                          size="sm"
                          className="flex-1 sm:flex-none"
                        >
                          <a href={`tel:${PHONE_NUMBER_TEL}`}>
                            <Phone size={16} className="mr-2" />
                            Call to Register
                          </a>
                        </Button>
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="flex-1 sm:flex-none"
                        >
                          <a
                            href={`mailto:${SITE_CONTACT_EMAIL}?subject=Event Registration Inquiry`}
                          >
                            <Mail size={16} className="mr-2" />
                            Email Us to Register
                          </a>
                        </Button>
                      </>
                    )
                  ) : (
                    <Button
                      className="w-full sm:w-auto"
                      variant="outline"
                      disabled
                    >
                      <span className="text-gray-500 cursor-not-allowed">
                        Event Completed
                      </span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show Past Events Button */}
      {!showPastEvents && pastEvents.length > 0 && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setShowPastEvents(true)}
            className="inline-flex min-h-11 items-center text-primary hover:text-primary/80 font-medium text-sm transition-colors"
          >
            View {pastEvents.length} Past{" "}
            {pastEvents.length === 1 ? "Event" : "Events"}
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      )}
    </Section>
  );
};
