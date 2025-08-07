import { useState } from "react";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { Cta } from "@/components/ui/cta";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedTestimonial, setExpandedTestimonial] = useState<number | null>(null);
  
  const testimonials = [
    {
      quote: "I recently sold my dental practice after 41 years. I was primarily concerned to find a dentist who matched my treatment planning philosophy and to take good care of my wonderful patients and staff. In the current environment of corporate dentistry, I knew that it would not be an easy task. Fortunately, a colleague gave me the name of Michael Njo and Dental Strategies. Because Michael is a dentist with general practice experience, he has a great understanding of the important aspects for a transfer of a practice, not only for the seller but also for the buyer. I am quite happy that I had Dr Njo to help me navigate my sale! He was very easy to work with. I am glad to report that together we found a great match for my staff and patients.",
      author: "Gregory Baird",
      role: "Practice Seller",
      company: "3 months ago",
      rating: 5.0,
      category: "seller"
    },
    {
      quote: "I attended Mike's practice transition seminar and read his book. He was a very knowledgeable and seasoned expert in this area. I decided to use his consultation service to handle my practice sale. He was able to match a buyer within 2 weeks and completed the transaction within 45 days. He was so amazingly efficient throughout the transition process. I highly recommend him to any dentist interested in selling or buying a dental practice. Thanks again, Mike, you are my Superman.",
      author: "Tony Choi",
      role: "Practice Seller",
      company: "4 months ago",
      rating: 5.0,
      category: "seller"
    },
    {
      quote: "As we were in the midst of a complex process to sell our dental practice, we encountered challenges in securing an offer that reflected the true value of our well-established family practice. Despite garnering interest from several dentists, it proved to be a daunting task. Additionally, my need for orthopedic surgery necessitated the hiring of a dentist to fill in for a six-month period during my recovery. It was during this time that we were introduced to Dental Strategies by one of the bankers assisting us. Michael promptly met with us and initiated the process. Within just two months, we were introduced to a prospective buyer. Working with someone like Michael, who is not only a former dentist but also possesses expertise that surpasses that of a traditional real estate broker, proved to be advantageous for us. His knowledge in the field allowed us to navigate through the complexities of selling our dental practice with confidence. The assistance provided by attorney Mike Treppa, and Dental Strategies played a crucial role in successfully selling our dental practice. Their expertise and guidance not only facilitated the process but also ensured that we received an offer that truly reflected the value of our well-established family practice.",
      author: "Richard & Kimberly Crum",
      role: "Practice Sellers",
      company: "7 months ago",
      rating: 5.0,
      category: "seller"
    },
    {
      quote: "In the world of dentistry, owning your own practice is often a dream that many dentists aspire to achieve. However, the road to becoming a practice owner is not always an easy one. It requires careful planning, hard work, and the right guidance to navigate through the complex process of purchasing a dental clinic. I have always dreamed of owning my own dental practice, but I was unsure of where to begin. I attended numerous seminars and scoured online listings for dental practices on sale, but I struggled to find a clinic that met my expectations. I was overwhelmed by the amount of work and the steps required to make this dream a reality. For instance, I had no idea which attorney or lender to use, and I felt lost in the sea of information. It was during this uncertain period that I connected with Michael. He proved to be a tremendous asset, guiding me through the entire process of purchasing a dental clinic. He patiently answered all of my questions and went above and beyond to help me every step of the way. With his expertise and guidance, I was able to find a clinic that not only met my needs but exceeded my expectations. The transfer of ownership was not without its challenges, but Michael was by my side every step of the way. He fostered a positive relationship between myself and the selling dentist, ensuring a smooth and successful transition. Thanks to Michael's help, I was able to retain a highly experienced team and continue to grow this beautiful dental practice. I am grateful for his expertise and dedication, and I couldn't have achieved this dream without him. I would highly recommend Michael to anyone looking to purchase a dental clinic, as he truly goes above and beyond to make dreams a reality.",
      author: "Meng-Ju \"Colin\" Du - DMD",
      role: "Practice Buyer",
      company: "7 months ago",
      rating: 5.0,
      category: "buyer"
    },
    {
      quote: "Michael was great. I had his support 100% during the whole process. I recommend his services to anybody who has decided to sell or buy a practice. Honest, friendly and reliable. I couldn't have done this without your help. Thank you Michael!",
      author: "Maricela Murillo",
      role: "Practice Owner",
      company: "1 year ago",
      rating: 5.0,
      category: "seller"
    },
    {
      quote: "Michael goes above and beyond to get the deal done for you. I have done not one but two difficult transactions with him. There were hiccups along the way. He was persistent, always available to talk and had creative solutions to any problem. He has access to some of the best resources in the industry which helped us get the deal done on time and smoothly. Please hire him you won't regret!!",
      author: "Shilpi Seth",
      role: "Practice Owner",
      company: "1 year ago",
      rating: 5.0,
      category: "buyer"
    },
    {
      quote: "I had the pleasure of meeting Fred & Liz. Fred's insight is a goldmine for anyone looking to purchase or sell a dental practice. Fred's expertise in valuations and legalities is impressive. The resources provided seem comprehensive and well-crafted, a testament to their experience. If you're a dentist considering a practice transaction, I recommend tapping into their knowledge and experience.",
      author: "Alexander Zaykov",
      role: "Dentist",
      company: "1 year ago",
      rating: 5.0,
      category: "valuation"
    },
    {
      quote: "Thank you so much for all of your help in all of my transitions. It is quite safe to say that I would not have been able to do it without you. Your experience and knowledge always helps to keep things in perspective and allows me to hone my energy and attention. Your industry connections are also invaluable and your training allows me to speak to industry professionals as if I too am a seasoned expert. I have nothing but great appreciation and respect for you, and I will see you the next time around.",
      author: "Jason Cellars",
      role: "Practice Owner",
      company: "1 year ago",
      rating: 5.0,
      category: "buyer"
    },
    {
      quote: "Everything went fine today with the wire transfers. I am sure that you know that. Today has been super busy with the termination of 12 employees and the rehiring of the same. Before I settled down tonight, I thanked God for your hard work, kit gloves and patience with 30 years of my husband's life. This was a major decision for us and the most stressful time of our marriage. We second guessed ourselves and almost pulled out daily. It was challenging in so many ways for us. When we thought the Buyers pulled out, you and Mike Treppa closed this deal. We needed you to know that we appreciated all of the time you spent trying to make everyone happy. We watched you work the numbers in all directions and at the end of the day everyone felt like a winner! Wow! What an amazing amount of effort! We are forever grateful! Thank you so very much! ❤️",
      author: "Melisa Long",
      role: "Spouse of Practice Seller",
      company: "1 year ago",
      rating: 5.0,
      category: "seller"
    },
    {
      quote: "\"Be careful what you ask for, because I will get it for you\". That is what Michael from Dental Strategies said to me at our first face-to-face meeting. That was March 2023. We were referred to Michael after our practice was on the market for a year with few inquiries. We closed July 31, 2023 with full cash offer to a wonderful couple. That is testimony, thank you Michael.",
      author: "Keith Long",
      role: "Practice Seller",
      company: "1 year ago",
      rating: 5.0,
      category: "seller"
    },
    {
      quote: "Working with Michael Njo was an absolute pleasure during the transaction of my dental office. His wealth of professional connections and years of experience proved invaluable, ensuring a seamless process from start to finish. What impressed me most was his responsiveness and willingness to address my numerous questions promptly, even after hours, providing reassurance every step of the way. Michael's ability to find creative solutions in challenging situations was commendable, ultimately satisfying both the buyer and the seller. Thanks to his expert guidance, I am now the proud owner of a thriving dental office that has exceeded my expectations. I have no doubt that I would turn to Michael for his services again in the future, given his unmatched professionalism and dedication to achieving the best possible outcomes for his clients. He comes highly recommended as a dental consultant, and I extend my heartfelt gratitude for his outstanding support throughout the entire journey.",
      author: "Lawrence Wong",
      role: "Practice Buyer",
      company: "1 year ago",
      rating: 5.0,
      category: "buyer"
    },
    {
      quote: "As I approach the end of my pediatric dental career, I want to transition into the next phase of life well. That means being financially prepared in advance, and to leave a great practice to the next person. I'm so glad I have partnered with PTI to make this happen.",
      author: "Rick Nichols",
      role: "Pediatric Dentist",
      company: "2 years ago",
      rating: 5.0,
      category: "seller"
    },
    {
      quote: "Going through selling your practice is similar to getting ready to treat a complex dental patient. You need to gather the pre-diagnostic history and information, conduct a thorough exam, and plan a treatment path that is in line with the patient's needs. Working with a professional like Michael, who has developed a well thought out linear path when it comes to selling dental practices, ensured that I was set up with the right candidate and the sale process was executed flawlessly. I am very happy with how things turned out.",
      author: "Dr. Reza",
      role: "Practice Seller",
      company: "",
      rating: 5.0,
      category: "seller"
    },
    {
      quote: "Thank you, Michael, for guiding me through my moment yesterday morning. As Raymund said, you truly are my dental angel. I think the realization of what just happened will sink in sometime next year! You have helped me realize my dreams come true and so much more. I appreciate all the time, patience, and care that you have given during this entire process. I appreciate your guidance as a mentor and especially as a friend.",
      author: "Roy",
      role: "Dentist",
      company: "",
      rating: 5.0,
      category: "buyer"
    },
    {
      quote: "I attended the seminar with my spouse, who is the dentist, so I'm coming from a non-dental background. I came in with some knowledge of the dental career timeline and practice acquisition, and was blown away by how much more I learned in one day. Dr. Njo and the entire team taught at a level I could understand; everyone answered questions thoroughly, and my confidence in our ability to thrive in dentistry rose by more than I could have hoped.",
      author: "Rebecca",
      role: "Spouse of Dentist",
      company: "",
      rating: 5.0,
      category: "workshop"
    },
    {
      quote: "Dr. Njo and the Practice Transitions Institute have created a beautiful and comprehensive look into the lifespan of a dental career. They address how to plan for a successful career, navigate and avoid common pitfalls as both an associate and practice owner, as well as prepare for early retirement with a comfortable future ahead of you! It is catered to teach valuable principles to practitioners at any point in their careers, and the interactive presentations really bring that home.",
      author: "Teagan Willes, DDS",
      role: "Dentist",
      company: "",
      rating: 5.0,
      category: "workshop"
    },
    {
      quote: "I feel extremely fortunate to have found and chosen Fred Heppner to help me through the process of selling my practice. I enjoyed Fred's straightforward demeanor, and his ability to simplify for me what would have been an overly complex endeavor. The sale happened very quickly and efficiently, and I couldn't be more pleased with the outcome!",
      author: "Jeff Lewis, DDS, FACP",
      role: "Orthodontist",
      company: "",
      rating: 5.0,
      category: "seller"
    },
    {
      quote: "As a dental practice owner for 20 years, there comes a time when you transition from active ownership. In the fall of 2016, I made the decision to sell my successful dental practice and transition to managing as a clinical director and lead dentist. I contacted Fred for a practice appraisal and engaged his services for the sale. In March 2017, we closed the sale and I successfully transitioned. Fred was an ethical and responsive broker who found the perfect match, allowing my remaining career years to be some of the most fulfilling. I highly recommend Fred if you're considering selling or buying a practice.",
      author: "Paul, D.M.D.",
      role: "Dentist",
      company: "",
      rating: 5.0,
      category: "seller"
    },
    {
      quote: "Hi Michael!! For what's worth… I just wanted to say I personally felt today's workshop was the best. The energy was so good and I am so excited about the new team members. Thank you for always keeping things real with a positive note!!",
      author: "Karrie",
      role: "Workshop Attendee",
      company: "",
      rating: 5.0,
      category: "workshop"
    },
    {
      quote: "I have worked with Fred in many different formats over the past six to eight years. Fred is the consummate professional. I have attended his lectures, had one-on-one meetings, and most recently worked with him on the sale of my orthodontic practice. When it comes to practice transitions, Fred is the best choice. He is thorough, knowledgeable, accessible, connected, and capable. He will gather the necessary data, work tirelessly with your team members, and create a win-win scenario for all parties involved. I highly recommend his services.",
      author: "Blair Feldman, DMD, MS, MSEd",
      role: "Orthodontist",
      company: "",
      rating: 5.0,
      category: "seller"
    }
  ];
  
  const filteredTestimonials = activeFilter === "all" 
    ? testimonials 
    : testimonials.filter(t => t.category === activeFilter);
  
  const truncateQuote = (quote, length = 200) => {
    if (quote.length <= length) return quote;
    return quote.substring(0, length) + "...";
  };

  return (
    <>
      <div className="pt-28 bg-gradient-to-b from-accent to-white relative overflow-hidden">
        {/* Speech bubbles background */}
        <div 
          className="absolute inset-0 opacity-5 bg-center bg-no-repeat bg-contain"
          style={{
            backgroundImage: `url('/lovable-uploads/dfcf139a-4116-4e53-ac55-479fd8d2bbb8.png')`,
            backgroundPosition: 'center 20%'
          }}
        />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center pb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Client Testimonials & Success Stories
            </h1>
            <p className="text-lg text-gray-600 animate-fade-in animate-delay-100">
              Hear directly from dental professionals who have successfully 
              navigated practice transitions with our guidance.
            </p>
          </div>
        </div>
      </div>

      <Section>
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "all" 
                ? "bg-primary text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Stories
          </button>
          <button
            onClick={() => setActiveFilter("seller")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "seller" 
                ? "bg-primary text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Sellers
          </button>
          <button
            onClick={() => setActiveFilter("buyer")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "buyer" 
                ? "bg-primary text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Buyers
          </button>
          <button
            onClick={() => setActiveFilter("workshop")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "workshop" 
                ? "bg-primary text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Workshops & Seminars
          </button>
          <button
            onClick={() => setActiveFilter("valuation")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "valuation" 
                ? "bg-primary text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Valuations
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial, index) => (
            <Card key={index} className="animate-fade-in border border-gray-100 shadow-sm overflow-hidden" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="text-sm ml-1 font-medium text-gray-600">
                    {testimonial.rating.toFixed(1)}
                  </span>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-700 italic">
                    {expandedTestimonial === index 
                      ? testimonial.quote 
                      : truncateQuote(testimonial.quote)}
                  </p>
                  {testimonial.quote.length > 200 && (
                    <button 
                      onClick={() => setExpandedTestimonial(expandedTestimonial === index ? null : index)}
                      className="text-primary font-medium text-sm mt-2 hover:underline focus:outline-none"
                    >
                      {expandedTestimonial === index ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="font-medium text-gray-900">{testimonial.author}</p>
                  <div className="text-sm text-gray-500">
                    <span>{testimonial.role}</span>
                    {testimonial.company && (
                      <span className="ml-1">
                        • {testimonial.company}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section background="light" className="mb-8">
        <div className="max-w-4xl mx-auto">
          <SectionTitle centered>Featured Success Story</SectionTitle>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 mb-8 animate-fade-in">
            <h3 className="text-2xl font-semibold mb-4">Seamless Transition After 30 Years of Practice</h3>
            
            <div className="flex flex-col md:flex-row gap-8 mb-6">
              <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3" 
                  alt="Dr. Williams in his dental office" 
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <div className="md:w-2/3">
                <p className="text-gray-600 mb-4">
                  After 32 years building a thriving dental practice in Seattle, Dr. Williams was ready to retire 
                  but concerned about finding the right successor who would care for his loyal patients 
                  and dedicated staff.
                </p>
                <p className="text-gray-600 mb-4">
                  Working with PTI, Dr. Williams received a comprehensive practice valuation and was matched 
                  with a young dentist whose clinical philosophy and patient care approach aligned perfectly with his own.
                </p>
                <p className="text-gray-600">
                  The transition included a 6-month mentorship period where Dr. Williams gradually introduced 
                  the new dentist to patients, ensuring continuity of care and a smooth handoff of relationships.
                </p>
              </div>
            </div>
            
            <div className="bg-accent p-6 rounded-lg">
              <p className="italic text-gray-700 mb-2">
                "PTI didn't just help me sell my practice; they helped me secure my legacy. 
                Three years later, my staff is still there, my patients are happy, and I've been able to 
                enjoy retirement knowing my life's work is in good hands."
              </p>
              <p className="font-medium">— Dr. James Williams, General Dentist (Retired)</p>
            </div>
          </div>
        </div>
        
        <Cta 
          title="Ready to Write Your Own Success Story?"
          description="Join the hundreds of dental professionals who have successfully transitioned their practices with PTI's expert guidance."
          buttonText="Start Your Journey Today"
          buttonUrl="/contact"
        />
      </Section>
    </>
  );
};

export default Testimonials;
