import { useState } from "react";
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: "webinar" | "seminar" | "workshop" | "conference";
  registrationLink: string;
  isPast: boolean;
  earlyBirdDeadline?: string;
  earlyBirdSavings?: string;
  speakers?: Array<{
    name: string;
    title: string;
    imageUrl: string;
  }>;
}

const Events = () => {
  const [showPastEvents, setShowPastEvents] = useState(false);
  
  const events: Event[] = [
    {
      id: 1,
      title: "Mastering Your Dental Transition Into and Out of Practice",
      date: "March 28, 2025",
      time: "Full Day",
      location: "Crown Plaza, Costa Mesa CA",
      description: "A comprehensive full-day seminar perfect for doctors pursuing a start-up or purchase, seeking partners/associates, planning ownership, or preparing to exit dentistry. Join us in Orange County for expert guidance on dental practice transitions.",
      type: "seminar",
      registrationLink: "tel:+18337841121",
      isPast: false
    },
    {
      id: 2,
      title: "Mastering Your Dental Transition Into and Out of Practice",
      date: "July 11, 2025",
      time: "Full Day",
      location: "Arthur A. Dugoni School of Dentistry, U.O.P., San Francisco, CA",
      description: "A comprehensive full-day seminar perfect for doctors pursuing a start-up or purchase, seeking partners/associates, planning ownership, or preparing to exit dentistry. Join us at the prestigious University of the Pacific dental school.",
      type: "seminar",
      registrationLink: "tel:+18337841121",
      isPast: false,
      earlyBirdDeadline: "June 11, 2025",
      earlyBirdSavings: "$100"
    },
    {
      id: 3,
      title: "2025 & Beyond – Essential Financial & Practice-Transition Insights for Dentists",
      date: "August 27, 2025",
      time: "5:30 PM PT • 8:30 PM ET",
      location: "Online (live)",
      description: "A complimentary live Q&A where Practice Transitions Institute & CBG Financial Planning answer your biggest questions on buying, valuing, and growing a practice—plus key 2026 tax-code changes. Reserve your spot today!",
      type: "webinar",
      registrationLink: "/contact",
      isPast: false,
      speakers: [
        {
          name: "Michael Njo, DDS",
          title: "Practice Transitions Institute",
          imageUrl: "/lovable-uploads/2abe4abe-f5e3-42fb-81da-aba0ecad4edb.png"
        },
        {
          name: "Fred Heppner, MBA", 
          title: "Practice Transitions Institute",
          imageUrl: "/lovable-uploads/221b47eb-42ef-4e5a-b834-3c6b82cafa64.png"
        },
        {
          name: "Liz Armato, COO Host",
          title: "Practice Transitions Institute", 
          imageUrl: "/lovable-uploads/003914a8-e86a-4d38-9f29-15539ac6ce98.png"
        },
        {
          name: "Dan Garwood, AAMS, MBA",
          title: "CBG Financial Planning",
          imageUrl: "/lovable-uploads/4febf84a-cf18-4369-9cae-12a88e5f79f1.png"
        }
      ]
    }
  ];
  
  const filteredEvents = showPastEvents 
    ? events 
    : events.filter(event => !event.isPast);
  
  const upcomingEvents = events.filter(event => !event.isPast);
  const pastEvents = events.filter(event => event.isPast);
  
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "webinar":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "seminar":
        return "bg-green-100 text-green-700 border-green-200";
      case "workshop":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-purple-100 text-purple-700 border-purple-200";
    }
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Section background="primary" className="py-12 md:py-20 lg:py-24">
        <div className="text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Speaking Engagements & Events
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 leading-relaxed max-w-4xl mx-auto px-4">
            Join us for educational seminars on dental practice transitions and management.
          </p>
        </div>
      </Section>

      {/* Events Section */}
      <Section className="py-12 md:py-16 lg:py-20">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <SectionTitle>Upcoming Events</SectionTitle>
            <SectionSubtitle>Don't miss our latest educational opportunities</SectionSubtitle>
          </div>
          {pastEvents.length > 0 && (
            <button
              onClick={() => setShowPastEvents(!showPastEvents)}
              className="text-primary font-medium text-sm flex items-center hover:text-primary/80 transition-colors"
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
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Upcoming Events</h3>
            <p className="text-gray-500 mb-6">Please check back soon or contact us for private consultation options.</p>
            <Button asChild>
              <Link to="/contact">Schedule a Consultation</Link>
            </Button>
          </div>
        )}
        
        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <div 
              key={event.id}
              className={`bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden ${
                event.type === "webinar" ? "bg-cover bg-center" : ""
              }`}
              style={event.type === "webinar" ? {
                backgroundImage: `url(/lovable-uploads/387f8cf6-b01b-4a65-873f-7abdbafa078f.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              } : {}}
            >
              {/* Overlay for webinar card to ensure text readability */}
              {event.type === "webinar" && (
                <div className="absolute inset-0 bg-white/95 rounded-xl"></div>
              )}
              
              {/* Content wrapper with relative positioning */}
              <div className="relative z-10">
                {/* Event Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getEventTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                      {event.isPast && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                          Past Event
                        </span>
                      )}
                      {event.earlyBirdDeadline && !event.isPast && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">
                          Early Bird Available
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 leading-tight">
                      {event.title}
                    </h3>
                  </div>
                </div>
                
                {/* Event Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar size={16} className="mr-2 text-primary flex-shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock size={16} className="mr-2 text-primary flex-shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin size={16} className="mr-2 text-primary flex-shrink-0" />
                    <span className="line-clamp-2">{event.location}</span>
                  </div>
                </div>
                
                {/* Early Bird Notice */}
                {event.earlyBirdDeadline && !event.isPast && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                    <p className="text-orange-800 text-sm font-medium">
                      🎯 Early Bird Special: Register by {event.earlyBirdDeadline} and save {event.earlyBirdSavings}!
                    </p>
                  </div>
                )}
                
                {/* Event Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {event.description}
                </p>
                
                {/* Speakers Section for Webinars */}
                {event.type === "webinar" && event.speakers && event.speakers.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Featured Speakers</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {event.speakers.map((speaker, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                          <div className="relative mb-2">
                            <img
                              src={speaker.imageUrl}
                              alt={speaker.name}
                              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-200"
                            />
                            <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                          </div>
                          <div className="px-1">
                            <p className="text-xs font-medium text-gray-900 leading-tight mb-1">{speaker.name}</p>
                            <p className="text-xs text-gray-600 leading-tight">{speaker.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Action Button */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className="w-full sm:w-auto" variant={event.isPast ? "outline" : "default"}>
                    <Link to="/contact">
                      {event.isPast ? "View Materials" : "Register Now"}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Show Past Events Button */}
        {!showPastEvents && pastEvents.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowPastEvents(true)}
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm transition-colors"
            >
              View {pastEvents.length} Past {pastEvents.length === 1 ? "Event" : "Events"}
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        )}
      </Section>

      {/* Private Events Section */}
      <Section background="light" className="py-12 md:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <SectionTitle>Host a Private Event</SectionTitle>
            <SectionSubtitle>
              Looking for customized education for your dental society, study club, or office?
            </SectionSubtitle>
          </div>
          
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold mb-6 text-center md:text-left">Available Topics Include:</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                "Practice Valuation Fundamentals",
                "Buying Your First Practice",
                "Preparing for Practice Sale",
                "Partnership Formation & Dissolution",
                "Associate Contracts & Buy-ins",
                "DSO vs. Private Practice Transitions"
              ].map((topic, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-gray-700">{topic}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-gray-600 text-sm leading-relaxed">
                Our team of experts can deliver engaging, educational presentations tailored to your group's 
                specific needs and interests. All presentations can be modified for length and format.
              </p>
            </div>
            
            <div className="text-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/contact">Inquire About Private Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Events;
