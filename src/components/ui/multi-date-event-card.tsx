import { Calendar, Clock, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";

interface EventDate {
  date: string;
  time: string;
  location: string;
  isPast: boolean;
}

interface MultiDateEventCardProps {
  title: string;
  description: string | {
    intro: string;
    learningPoints: string[];
  };
  type: "webinar" | "seminar" | "workshop" | "conference";
  registrationLink: string;
  eventDates: EventDate[];
  isPast: boolean;
  speakers?: Array<{
    name: string;
    title: string;
    imageUrl: string;
  }>;
  getEventTypeColor: (type: string) => string;
}

export const MultiDateEventCard = ({
  title,
  description,
  type,
  registrationLink,
  eventDates,
  isPast,
  speakers,
  getEventTypeColor
}: MultiDateEventCardProps) => {
  const upcomingDates = eventDates.filter(date => !date.isPast);
  const pastDates = eventDates.filter(date => date.isPast);
  
  const uniqueLocations = [...new Set(eventDates.map(date => date.location))];
  const locationText = uniqueLocations.length === 1 
    ? uniqueLocations[0] 
    : `${uniqueLocations.length} locations available`;

  return (
    <div 
      className={`relative rounded-xl transition-all duration-300 group z-10 ${
        isPast 
          ? "bg-gray-50 border-2 border-dashed border-gray-300 shadow-none hover:shadow-sm" 
          : "bg-white border-2 border-gray-200 shadow-sm hover:shadow-lg hover:border-primary/30"
      }`}
    >
      {/* Status Banner */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${
        isPast ? "bg-gray-400" : "bg-gradient-to-r from-primary to-primary/70"
      }`}></div>
      
      {/* Content wrapper */}
      <div className="relative z-10 p-4 md:p-6">
        {/* Event Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getEventTypeColor(type)}`}>
                {type}
              </span>
              {isPast ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 border border-gray-300">
                  Event Completed
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200 animate-pulse">
                  Registration Open
                </span>
              )}
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                {eventDates.length} dates
              </span>
            </div>
            <h3 className={`text-lg md:text-xl font-semibold leading-tight ${
              isPast ? "text-gray-600" : "text-gray-900"
            }`}>
              {title}
            </h3>
          </div>
        </div>
        
        {/* Summary info for grouped events */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className={`flex items-center text-sm ${
            isPast ? "text-gray-500" : "text-gray-600"
          }`}>
            <Calendar size={16} className={`mr-2 flex-shrink-0 ${
              isPast ? "text-gray-400" : "text-primary"
            }`} />
            <span className={isPast ? "" : "font-medium"}>
              {upcomingDates.length > 0 ? `Next: ${upcomingDates[0].date}` : `Last: ${eventDates[eventDates.length - 1].date}`}
            </span>
          </div>
          <div className={`flex items-center text-sm ${
            isPast ? "text-gray-500" : "text-gray-600"
          }`}>
            <Clock size={16} className={`mr-2 flex-shrink-0 ${
              isPast ? "text-gray-400" : "text-primary"
            }`} />
            <span>{eventDates[0].time}</span>
          </div>
          <div className={`flex items-center text-sm ${
            isPast ? "text-gray-500" : "text-gray-600"
          }`}>
            <MapPin size={16} className={`mr-2 flex-shrink-0 ${
              isPast ? "text-gray-400" : "text-primary"
            }`} />
            <span className="line-clamp-2">{locationText}</span>
          </div>
        </div>

        {/* Event Description */}
        <div className={`mb-4 ${
          isPast ? "text-gray-500" : "text-gray-600"
        }`}>
          {typeof description === 'string' ? (
            <p className="text-sm leading-relaxed line-clamp-3">
              {description}
            </p>
          ) : (
            <div className="space-y-3">
              <p className="text-sm leading-relaxed">
                {description.intro}
              </p>
              <div>
                <p className="text-sm font-semibold mb-2">At this seminar, you'll discover how to:</p>
                <ul className="text-sm space-y-1">
                  {description.learningPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Individual Event Dates */}
        <div className="mb-4">
          <div className="mb-3">
            <h4 className={`text-sm font-semibold ${
              isPast ? "text-gray-600" : "text-gray-900"
            }`}>
              Available Dates & Locations
            </h4>
          </div>
          
          <div className="space-y-2">
            {eventDates.map((eventDate, index) => (
              <div
                key={`${eventDate.date}-${eventDate.time}-${eventDate.location}-${index}`}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border ${
                  eventDate.isPast 
                    ? "bg-gray-50 border-gray-200" 
                    : "bg-primary/5 border-primary/20"
                }`}
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                  <div className={`flex items-center text-sm ${
                    eventDate.isPast ? "text-gray-500" : "text-gray-700"
                  }`}>
                    <Calendar size={14} className="mr-2 flex-shrink-0" />
                    <span className={!eventDate.isPast ? "font-medium" : ""}>{eventDate.date}</span>
                  </div>
                  <div className={`flex items-center text-sm ${
                    eventDate.isPast ? "text-gray-500" : "text-gray-700"
                  }`}>
                    <Clock size={14} className="mr-2 flex-shrink-0" />
                    <span>{eventDate.time}</span>
                  </div>
                  <div className={`flex items-center text-sm ${
                    eventDate.isPast ? "text-gray-500" : "text-gray-700"
                  }`}>
                    <MapPin size={14} className="mr-2 flex-shrink-0" />
                    <span>{eventDate.location}</span>
                  </div>
                </div>
                {eventDate.isPast && (
                  <span className="text-xs text-gray-500 mt-2 sm:mt-0 sm:ml-3">
                    Completed
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Speakers Section for Webinars */}
        {type === "webinar" && speakers && speakers.length > 0 && (
          <div className="mb-6">
            <h4 className={`text-sm font-semibold mb-3 ${
              isPast ? "text-gray-600" : "text-gray-900"
            }`}>Featured Speakers</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {speakers.map((speaker, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden mb-2">
                    <img 
                      src={speaker.imageUrl} 
                      alt={speaker.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h5 className={`text-xs font-medium leading-tight ${
                    isPast ? "text-gray-600" : "text-gray-900"
                  }`}>
                    {speaker.name}
                  </h5>
                  <p className={`text-xs leading-tight ${
                    isPast ? "text-gray-500" : "text-gray-600"
                  }`}>
                    {speaker.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {!isPast && (
            <>
              {registrationLink.startsWith('tel:') ? (
                <>
                  <Button 
                    size="sm" 
                    className="flex-1 sm:flex-none"
                    onClick={() => {
                      window.open(registrationLink, '_self');
                      trackCTAClick('event_phone_registration', `event_${title.replace(/\s+/g, '_').toLowerCase()}`);
                    }}
                  >
                    <Phone size={16} className="mr-2" />
                    Call or text to register
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 sm:flex-none"
                    onClick={() => {
                      window.open('mailto:elizabetharmato@gmail.com,dentalstrategies@gmail.com?subject=Event Registration Inquiry', '_self');
                      trackCTAClick('event_email_registration', `event_${title.replace(/\s+/g, '_').toLowerCase()}`);
                    }}
                  >
                    <Mail size={16} className="mr-2" />
                    Email us to register
                  </Button>
                </>
              ) : registrationLink.startsWith('mailto:') ? (
                <>
                  <Button 
                    size="sm" 
                    className="flex-1 sm:flex-none"
                    onClick={() => window.open(registrationLink, '_self')}
                  >
                    <Mail size={16} className="mr-2" />
                    Email us to register
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 sm:flex-none"
                    onClick={() => window.open('mailto:elizabetharmato@gmail.com,dentalstrategies@gmail.com?subject=Event Registration Inquiry', '_self')}
                  >
                    <Mail size={16} className="mr-2" />
                    Alternative Email
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    size="sm" 
                    className="flex-1 sm:flex-none"
                    onClick={() => {
                      window.open(registrationLink, '_blank');
                      trackCTAClick('event_external_registration', `event_${title.replace(/\s+/g, '_').toLowerCase()}`);
                    }}
                  >
                    Register Now
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 sm:flex-none"
                    onClick={() => window.open('mailto:elizabetharmato@gmail.com,dentalstrategies@gmail.com?subject=Event Registration Inquiry', '_self')}
                  >
                    <Mail size={16} className="mr-2" />
                    Email us to register
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};