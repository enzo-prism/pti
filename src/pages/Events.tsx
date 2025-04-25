import { useState } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
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
  imageUrl?: string;
}

const Events = () => {
  const [showPastEvents, setShowPastEvents] = useState(false);
  
  const events: Event[] = [
    {
      id: 1,
      title: "Ready to Retire or Buy a Practice?",
      date: "January 15, 2025",
      time: "2:00 PM PT / 5:00 PM ET",
      location: "Online Webinar",
      description: "Join our complimentary webinar to learn essential strategies for practice transitions. Topics include negotiating win-win deals, reading the economic climate, drafting agreements, maximizing practice value, and minimizing taxes.",
      type: "webinar",
      registrationLink: "mailto:info@practicetransitionsinstitute.com",
      isPast: false
    },
    {
      id: 2,
      title: "Ready to Retire or Buy a Practice?",
      date: "January 29, 2025",
      time: "5:00 PM PT / 8:00 PM ET",
      location: "Online Webinar",
      description: "Join our complimentary webinar to learn essential strategies for practice transitions. Topics include negotiating win-win deals, reading the economic climate, drafting agreements, maximizing practice value, and minimizing taxes.",
      type: "webinar",
      registrationLink: "mailto:info@practicetransitionsinstitute.com",
      isPast: false
    },
    {
      id: 3,
      title: "Mastering Your Dental Transition Into and Out of Practice",
      date: "September 27, 2024",
      time: "Full Day",
      location: "Arizona Dental Association HQ, Phoenix, AZ",
      description: "A comprehensive full-day seminar perfect for doctors pursuing a start-up or purchase, seeking partners/associates, planning ownership, or preparing to exit dentistry. $397 for first participant, $195 for each additional attendee.",
      type: "seminar",
      registrationLink: "tel:+18337841121",
      isPast: false
    },
    {
      id: 4,
      title: "Mastering Your Dental Transition Into and Out of Practice",
      date: "March 28, 2025",
      time: "Full Day",
      location: "Crowne Plaza Costa Mesa, Orange County, CA",
      description: "A comprehensive full-day seminar perfect for doctors pursuing a start-up or purchase, seeking partners/associates, planning ownership, or preparing to exit dentistry. $397 for first participant, $195 for each additional attendee.",
      type: "seminar",
      registrationLink: "tel:+18337841121",
      isPast: false
    },
    {
      id: 5,
      title: "Mastering Your Dental Transition Into and Out of Practice",
      date: "July 11, 2025",
      time: "Full Day",
      location: "UOP Arthur A. Dugoni School of Dentistry, San Francisco, CA",
      description: "A comprehensive full-day seminar perfect for doctors pursuing a start-up or purchase, seeking partners/associates, planning ownership, or preparing to exit dentistry. $397 for first participant, $195 for each additional attendee.",
      type: "seminar",
      registrationLink: "tel:+18337841121",
      isPast: false
    }
  ];
  
  const filteredEvents = showPastEvents 
    ? events 
    : events.filter(event => !event.isPast);
  
  const upcomingEvents = events.filter(event => !event.isPast);
  const pastEvents = events.filter(event => event.isPast);
  
  return (
    <Layout>
      <div className="pt-28 bg-gradient-to-b from-accent to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center pb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Speaking Engagements & Events
            </h1>
            <p className="text-lg text-gray-600 animate-fade-in animate-delay-100">
              Join us for educational seminars, webinars, and workshops on 
              dental practice transitions and management.
            </p>
          </div>
        </div>
      </div>

      <Section>
        <div className="flex justify-between items-center mb-8">
          <SectionTitle>Upcoming Events</SectionTitle>
          <div className="flex items-center">
            <button
              onClick={() => setShowPastEvents(!showPastEvents)}
              className="text-primary font-medium flex items-center"
            >
              {showPastEvents ? "Hide Past Events" : "View Past Events"}
            </button>
          </div>
        </div>
        
        {upcomingEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No upcoming events scheduled at this time.</p>
            <p className="text-gray-500">Please check back soon or contact us for private consultation options.</p>
          </div>
        )}
        
        <div className="space-y-6">
          {filteredEvents.map((event) => (
            <div 
              key={event.id}
              className="bg-white p-6 sm:p-8 rounded-lg border border-gray-100 shadow-sm animate-fade-in"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {event.imageUrl ? (
                  <div className="md:w-1/4">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="hidden md:block md:w-1/4">
                    <div className={`w-full h-48 rounded-lg flex items-center justify-center ${
                      event.type === "webinar" ? "bg-blue-50" :
                      event.type === "seminar" ? "bg-green-50" :
                      event.type === "workshop" ? "bg-yellow-50" : "bg-purple-50"
                    }`}>
                      <span className="uppercase tracking-wider text-sm font-bold px-3 py-1 rounded-full bg-white">
                        {event.type}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className={event.imageUrl ? "md:w-3/4" : "md:w-3/4"}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <span className={`text-xs uppercase tracking-wider font-medium px-2 py-1 rounded-full self-start sm:self-auto ${
                      event.type === "webinar" ? "bg-blue-100 text-blue-800" :
                      event.type === "seminar" ? "bg-green-100 text-green-800" :
                      event.type === "workshop" ? "bg-yellow-100 text-yellow-800" :
                      "bg-purple-100 text-purple-800"
                    }`}>
                      {event.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                    <div className="flex items-center text-gray-500">
                      <Calendar size={16} className="mr-2 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock size={16} className="mr-2 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin size={16} className="mr-2 text-primary" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <Button asChild variant={event.isPast ? "outline" : "default"}>
                    <a href={event.registrationLink}>
                      {event.isPast ? "View Recording & Materials" : "Register Now"}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {!showPastEvents && pastEvents.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowPastEvents(true)}
              className="text-primary hover:text-primary/80 font-medium"
            >
              View {pastEvents.length} Past {pastEvents.length === 1 ? "Event" : "Events"}
            </button>
          </div>
        )}
      </Section>

      <Section background="light" className="mb-8">
        <SectionTitle centered>Host a Private Event</SectionTitle>
        <SectionSubtitle centered>
          Looking for customized education for your dental society, study club, or office?
        </SectionSubtitle>
        
        <div className="max-w-3xl mx-auto mt-8 bg-white p-8 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
          <h3 className="text-xl font-semibold mb-4">Available Topics Include:</h3>
          
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <li className="flex items-start">
              <div className="bg-primary/10 rounded-full p-1 mr-3 mt-1">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
              </div>
              <span>Practice Valuation Fundamentals</span>
            </li>
            <li className="flex items-start">
              <div className="bg-primary/10 rounded-full p-1 mr-3 mt-1">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
              </div>
              <span>Buying Your First Practice</span>
            </li>
            <li className="flex items-start">
              <div className="bg-primary/10 rounded-full p-1 mr-3 mt-1">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
              </div>
              <span>Preparing for Practice Sale</span>
            </li>
            <li className="flex items-start">
              <div className="bg-primary/10 rounded-full p-1 mr-3 mt-1">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
              </div>
              <span>Partnership Formation & Dissolution</span>
            </li>
            <li className="flex items-start">
              <div className="bg-primary/10 rounded-full p-1 mr-3 mt-1">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
              </div>
              <span>Associate Contracts & Buy-ins</span>
            </li>
            <li className="flex items-start">
              <div className="bg-primary/10 rounded-full p-1 mr-3 mt-1">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
              </div>
              <span>DSO vs. Private Practice Transitions</span>
            </li>
          </ul>
          
          <p className="text-gray-600 mb-6">
            Our team of experts can deliver engaging, educational presentations tailored to your group's 
            specific needs and interests. All presentations can be modified for length and format.
          </p>
          
          <Button asChild>
            <a href="/contact">Inquire About Private Events</a>
          </Button>
        </div>
      </Section>
    </Layout>
  );
};

export default Events;
