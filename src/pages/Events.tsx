
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
      title: "Preparing Your Practice for Sale: Maximizing Value",
      date: "June 15, 2024",
      time: "1:00 PM - 3:00 PM PST",
      location: "Online Webinar",
      description: "Learn key strategies to enhance your practice's value before selling. This webinar covers financial optimization, staff retention, facility updates, and more.",
      type: "webinar",
      registrationLink: "#register",
      isPast: false
    },
    {
      id: 2,
      title: "Associateship to Ownership: Creating a Successful Pathway",
      date: "July 8, 2024",
      time: "5:30 PM - 8:00 PM PST",
      location: "Dental Society of San Francisco",
      description: "This in-person workshop explores how to structure associate-to-owner transitions that benefit both parties. Perfect for practice owners planning succession or associates looking to buy in.",
      type: "workshop",
      registrationLink: "#register",
      isPast: false
    },
    {
      id: 3,
      title: "Understanding Practice Valuation Methodologies",
      date: "August 22, 2024",
      time: "12:00 PM - 1:30 PM PST",
      location: "Online Webinar",
      description: "Demystify how dental practices are valued in today's market. Learn about different valuation approaches and which factors most significantly impact your practice's worth.",
      type: "webinar",
      registrationLink: "#register",
      isPast: false
    },
    {
      id: 4,
      title: "Dental Economics Conference: Transition Planning Panel",
      date: "September 15-17, 2024",
      time: "Panel: Sept 16, 2:00 PM",
      location: "Marriott Marquis, San Diego",
      description: "PTI's founder joins other industry experts to discuss the current landscape of dental practice transitions, featuring real-world case studies and market trends.",
      type: "conference",
      registrationLink: "#register",
      isPast: false,
      imageUrl: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3"
    },
    {
      id: 5,
      title: "Legal Considerations in Practice Transitions",
      date: "March 10, 2024",
      time: "1:00 PM - 2:30 PM PST",
      location: "Online Webinar",
      description: "A comprehensive overview of the legal aspects of buying or selling a dental practice, including contract review, lease considerations, and non-compete agreements.",
      type: "webinar",
      registrationLink: "#recording",
      isPast: true
    },
    {
      id: 6,
      title: "Annual Dental Transition Summit",
      date: "January 20-21, 2024",
      time: "9:00 AM - 5:00 PM PST (both days)",
      location: "Hyatt Regency, San Francisco",
      description: "Our flagship annual event featuring keynote speakers, breakout sessions, and networking opportunities for dentists at all stages of their careers.",
      type: "conference",
      registrationLink: "#materials",
      isPast: true,
      imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3"
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
