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
      quote: "Michael worked with me on a practice acquisition and I couldn't be more pleased. The help and advice given during the process made me feel secure in the purchase and decisions along the way of my practice. Someone as experienced as Michael in your corner is essential to navigating through the process. He's my coach, confidante, and provides honest, unfiltered advice.",
      author: "Erica Haskett",
      role: "Practice Buyer",
      company: "4 weeks ago",
      rating: 5.0,
      category: "buyer"
    },
    {
      quote: "Despite taking numerous courses on buying a dental practice, I still felt overwhelmed and unsure of where to begin. Working with Michael Njo and attending one of his seminars was a turning point. I gained valuable insights that I hadn't encountered elsewhere. Michael is not only incredibly knowledgeable but also genuinely cares about the success of those he works with. I also purchased his book, Dental Practice Transitions Handbook, which provided clear, practical guidance and further deepened my understanding of the transition process. Michael and his team at Dental Transitions bring both expertise and integrity to the table, and working with them has been a truly positive experience. I'm confident in the path ahead and look forward to continuing to work with Dental Transitions as I move into the next stage of my professional journey.",
      author: "J. Anny Yoo",
      role: "Seminar Attendee",
      company: "3 weeks ago",
      rating: 5.0,
      category: "workshop"
    },
    {
      quote: "Mike and the other advisors made the webinar both insightful and practical. Great real-world strategies that gave me more clarity and confidence in planning my next steps.",
      author: "Jai Cho",
      role: "Webinar Attendee",
      company: "3 weeks ago",
      rating: 5.0,
      category: "workshop"
    },
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
      quote: "Favorite part about DBC is learning from Dr. Njo and working with the rest of the executive board",
      author: "Armaan Grewal",
      role: "Dugoni Business Club Member",
      company: "9/15/2025",
      rating: 5.0,
      category: "workshop"
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
    },
    {
      quote: "Hi Dr. Njo, I'm reaching out to you because of all of the dental field professionals I know, I think you are the most qualified to answer my question(s). My overarching question relates to the advice that I've heard several professionals offer about practice acquisition, which is to 'buy the biggest practice you can handle.' I have been actively informing myself on details of practice acquisition and management over the last few months. I have been listening to the Shared Practices podcast (so far I've listened to over 30 hours of practice acquisition specific information), I read your Dental Practice Transitions Handbook, I read The Million Dollar Dentist, I've read various resources from Breakaway Practices, Next Level Practices, and The Lifestyle Practice. Most of my learning helps me know what I don't know and what professionals I will need to help me in every step of my future.",
      author: "T.W.",
      role: "Practice Buyer",
      company: "",
      rating: 5.0,
      category: "buyer"
    },
    {
      quote: "I was into year 4 of trying to sell my practice. I had been with 3 well known brokers without success. A trusted colleague knew my situation, knew I was ready to close the doors and implored me to call Michael. He said: 'Michael helped me resolve a difficult situation, he's different, he's special, and he will help you. You can trust him!' From day one the experience with Michael was different. He stated he was a transition specialist, different than a traditional broker and his approach was based on relationships he had formed. His goal was to create a win win situation matching a seller to the right buyer. Michael gave me hope, asked for my trust, and within 2 months introduced me to a terrific person, fine dentist, and a great match for my practice. Within 2 more months a favorable deal was on the table and soon thereafter the deal was closed and the funds were in my bank. Michael served me well, he was consistent, organized, found me a good match and got the job done! Thank you Michael well done Sir, as I am forever grateful!",
      author: "Keith Boxerman, D.D.S.",
      role: "Practice Seller",
      company: "",
      rating: 5.0,
      category: "seller"
    },
    {
      quote: "Dear Michael, I just want to express my gratitude to you for the amazing meeting. So much positive information and graceful solutions, I really appreciate it. Thank you!",
      author: "Val",
      role: "Dentist",
      company: "",
      rating: 5.0,
      category: "buyer"
    },
    {
      quote: "Fred was wonderful to work with. I was buying my partner out and he was instrumental in being a non biased 3rd party to facilitate the sale and make sure each party understood the other side and each piece of the sale. He really took his time in speaking to us together and individually and was able to communicate all questions and concerns seamlessly. He also made himself available just about whenever necessary day or night. I would absolutely work with Fred again on future transactions given my great experience. He truly cared about both parties involved, not just a commission.",
      author: "Jeff G., D.D.S.",
      role: "Practice Owner",
      company: "",
      rating: 5.0,
      category: "seller"
    },
    {
      quote: "Thank you Michael for everything you did for me but even more my family. My dad is in a much better place, the local dental society is pretty shook up because some think he was still working so there are a lot of scared dentists. But you and I know my dad checked every box for preexisting conditions but if his death encourages people to wear masks that is helpful.",
      author: "Lee",
      role: "Family Member",
      company: "",
      rating: 5.0,
      category: "seller"
    },
    {
      quote: "I have dealt with brokers of all sorts in my life. Many were little more than listers, relying on others to do the 'heavy' work of actually making a sale happen. I wanted an individual who was not just a lister. I received that with Fred. His prospectus of my practice was bank ready. I followed his recommendations for my discussions with a buyer. Though not an accountant, his review of my recent tax returns showed an accounting error that provided me a large refund after submitting an amended return. Also not an attorney, he explained points in the contract that I should consider. He communicated well with the buyer and the lender right up until funds were wired to me from the lender. He was WELL worth his fee and I'm most happy I had his help working through what can be a very difficult process with unexpected roadblocks. THANK YOU FRED!!",
      author: "R. Branstrator, D.D.S.",
      role: "Practice Seller",
      company: "",
      rating: 5.0,
      category: "seller"
    },
    {
      quote: "Thank you for guiding me through my moment yesterday morning. As Raymund said, you truly are my dental angel. I think the realization of what just happened will sink in sometime next year! You have helped me realize my dreams come true and so much more. I appreciate all the time, patience and care that you have given during this entire process. I appreciate your guidance as a mentor and especially as a friend. You have a very special talent, gift, and integrity of character. I sincerely thank you for being you.",
      author: "Michelle",
      role: "Practice Buyer",
      company: "",
      rating: 5.0,
      category: "buyer"
    },
    {
      quote: "Michael, I truly do appreciate all that you have done in the office. Last year at this same time my staff was unhappy, rude to one another and I was extremely unhappy with them. There were days that I wanted to clean house and start with a new staff. I love practicing dentistry but dislike the pettiness and how truly mean women can be to one another. I am seeing an improvement and the mood in the office is improving and I know that this is the direct result of your participation in the practice. You have done a great job. Wishing you a wonderful New Year.",
      author: "Lois",
      role: "Practice Owner",
      company: "",
      rating: 5.0,
      category: "seller"
    },
    {
      quote: "Michael, I just want to say THANK YOU for being so instrumental in the purchase of my practice. I have been so fortunate of meeting you and working with you for the past (almost) two years. I still can't believe that we did it! Now, it is going to take lots of work to get to where I want to be, but purchasing the practice (this practice) is a great beginning and I owe you soo much. Please let me know when you are around this area to take you to a good lunch or dinner, which is the least I can do to show you my appreciation.",
      author: "Eugenio",
      role: "Practice Buyer",
      company: "",
      rating: 5.0,
      category: "buyer"
    },
    {
      quote: "Fred Heppner was a true asset in the sale of my practice. In a short time, Fred gleaned huge amounts of information from my office computer and put together a reader-friendly prospectus. At that point, the sale of the practice was put online in a discreet listing. Fred kept me informed and updated throughout as to any bites. I really appreciated his prompt email responses to my questions and depended a lot on his knowledge of management as well as tax information. His business and computer skills and his outreach to the state dental association made my transition perfect. I was completely satisfied with the negotiations and closure of my practice sale. He has splendid contacts with banks, attorneys, and management companies in the Southwest region. I can confidently recommend Fred Heppner for his accessibility and expertise in the business of dental transitions. He has a pleasant demeanor and is very approachable.",
      author: "B. Holbrook, DMD",
      role: "Practice Seller",
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
          className="absolute inset-0 opacity-10 bg-center bg-no-repeat bg-contain"
          style={{
            backgroundImage: `url('/lovable-uploads/76513465-2197-4c41-9fdb-637b791c3368.png')`,
            backgroundPosition: 'center 20%'
          }}
        />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center pb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              What our Clients are Saying
            </h1>
            <p className="text-lg text-gray-600 animate-fade-in animate-delay-100">
              Helping dentists through one of the most important transitions of their career is an honor.
              We're proud to share the kind words from clients who've trusted us to guide them — and we're
              deeply thankful for the opportunity to be part of their journey.
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
            
            <div className="mb-6">
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
        
        {/* Second Featured Success Story */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
            <h3 className="text-2xl font-semibold mb-6">Transforming Lives Through Cosmetic Dentistry</h3>
            
            <div className="grid md:grid-cols-3 gap-8 mb-6">
              <div className="md:col-span-1">
                <img 
                  src="/lovable-uploads/bccc97e0-b404-49e4-bd5d-ae51c3f45346.png" 
                  alt="Dr. Matt Asaro, DDS - Cosmetic Dentist at Asaro Dental Aesthetics"
                  className="w-full h-auto rounded-lg shadow-md"
                />
                <div className="text-center mt-4">
                  <h4 className="font-semibold text-gray-900">Dr. Matt Asaro, DDS</h4>
                  <p className="text-sm text-gray-600">
                    <a 
                      href="https://asarodentalaesthetics.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Asaro Dental Aesthetics
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <p className="text-gray-600 mb-4">
                  At <a 
                    href="https://asarodentalaesthetics.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    Asaro Dental Aesthetics
                  </a>, we are dedicated to more than just enhancing smiles; we transform lives. 
                  Cosmetic dentistry is no longer just about changing how you look—it's about embracing transformation 
                  and self-care as a lifestyle. The emotional impact of this work brings tears and speechlessness, 
                  making this work a deeply fulfilling experience.
                </p>
                <p className="text-gray-600 mb-4">
                  I cannot share these cases without recognizing those who helped make them possible. First, my team 
                  at Asaro Dental Aesthetics. They are truly the best in Los Angeles and none of this happens without them. 
                  Putting these cases together also takes a team of great mentors, labs, and specialists. I cannot express 
                  enough thanks and appreciation for their support, particularly:
                </p>
                <div className="grid grid-cols-1 gap-2 mb-4">
                  <div className="text-sm">
                    <p className="text-gray-600">• Jennifer, Azita, Dr. Serhi Vyzu</p>
                    <p className="text-gray-600">• V Smile Ceramists</p>
                    <p className="text-gray-600">• Dr. Ahmed Mataria (Implants)</p>
                    <p className="text-gray-600">• Dr. Shahriah Agahi (Periodontist)</p>
                    <p className="text-gray-600">• <span className="font-bold text-primary">Dr. Michael Njo (Coach/Consultant)</span></p>
                    <p className="text-gray-600">• Dr. John Kois (Kois Center)</p>
                    <p className="text-gray-600">• Dr. Amir Rad (Anesthesia)</p>
                    <p className="text-gray-600">• Brentwood Endo (Dr. Robby Rezai)</p>
                    <p className="text-gray-600">• Dr. Luke Shapiro (Ortho Mentor)</p>
                    <p className="text-gray-600">• Invisalign (Aligned Technology)</p>
                    <p className="text-gray-600">• Zero Bone Loss Lab (Perla & Jessica)</p>
                    <p className="text-gray-600">• Evelyn Quintana (Wife, Support System)</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  We look forward to continuing our mission of creating smiles that radiate confidence and happiness. 
                  Thank you for reading and we hope you enjoy!
                </p>
              </div>
            </div>
            
            <div className="bg-accent p-6 rounded-lg">
              <p className="italic text-gray-700 mb-2">
                "Cosmetic dentistry is no longer just about changing how you look—it's about embracing transformation 
                and self-care as a lifestyle. The emotional impact of this work brings tears and speechlessness, 
                making this work a deeply fulfilling experience."
              </p>
              <p className="font-medium">— Matt Asaro, DDS, <a 
                href="https://asarodentalaesthetics.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Asaro Dental Aesthetics
              </a></p>
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
