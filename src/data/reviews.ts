export type ReviewSource = "google" | "internal" | "amazon";
export type ReviewCategory = "buyer" | "seller" | "workshop" | "valuation" | "book";

export interface ReviewRecord {
  id: string;
  slug: string;
  source: ReviewSource;
  category: ReviewCategory;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  sourceAuthorName: string;
  displayAuthorName: string;
  role?: string;
  company?: string;
  sourceUrl?: string;
  sourceDateISO?: string | null;
  sortOrder: number;
  featuredSlots?: string[];
}

const googleReviews: ReviewRecord[] = [
  {
    id: "google-john-yun",
    slug: "john-yun-startup-guidance",
    source: "google",
    category: "buyer",
    rating: 5,
    quote:
      "I had the privilege of meeting Michael through my dental architect, who highly recommended him. At the time, I was already working with a startup and business coach, but I was dissatisfied with the level of service relative to the fees I was paying. Despite the premium cost, most of my interactions were with assistants rather than the coach directly. In contrast, Michael is consistently accessible by text, email, or phone and provides direct, hands-on guidance. He has a strong understanding of the business aspects of running a dental practice and has supported my startup office in multiple areas, including leadership development, staff management, and overall business coaching. I feel very fortunate to have worked with him and would confidently recommend his services to any dentist seeking to grow their practice in a thoughtful and effective way.",
    sourceAuthorName: "John Yun",
    displayAuthorName: "John Yun",
    role: "Practice Owner",
    sortOrder: 3,
  },
  {
    id: "google-diana-fat-dds",
    slug: "diana-fat-dds-practice-transition",
    source: "google",
    category: "buyer",
    rating: 5,
    quote:
      "I began working with Dr. Michael Njo in 2006 during the purchase of a highly respected Prosthodontic practice. While the practice was already well established, transitioning ownership at that level required thoughtful leadership and experienced guidance. Dr. Njo was instrumental in making that transition seamless. He helped me establish credibility as the new owner, maintain patient confidence, and guide an established team through change with clarity and professionalism. His business and team coaching strengthened systems, workflows, and accountability, and his ability to coach people through change while maintaining morale was invaluable. His leadership coaching had an equally meaningful impact. He helped me create a culture rooted in pride, expertise, and professionalism, and supported my growth not only as a practice owner, but as a leader within the broader dental community. I firmly believe that without his guidance, the transition would have been far more challenging and my success significantly slower to achieve. His influence sharpened my leadership, streamlined my operations, and helped me build the kind of team and practice I am proud to lead. Dr. Njo is more than a consultant - he is a trusted partner in professional growth.",
    sourceAuthorName: "Diana Fat, DDS",
    displayAuthorName: "Diana Fat, DDS",
    role: "Practice Owner",
    sortOrder: 4,
  },
  {
    id: "google-mile-hi-fly-jon",
    slug: "jon-sierk-pediatric-consulting",
    source: "google",
    category: "buyer",
    rating: 5,
    quote:
      "I have worked with Dr. Michael Njo for nearly twenty years serving as my pediatric dental practice consultant. Just as importantly, he has been a trusted mentor and close friend during this time. Michael sets himself apart as a consultant with the unique expertise he has in the field, his impeccable character, and the bold short- and long-term strategic vision he sees for his clients. Michael has great experience in practice consulting because he has worked with dentists in many different stages of their careers from scratch starts to practice transitions. I think that any problem that I run into, Michael has seen it before and knows how to address it. In this way he can help identify what is not working and suggest improvements before small issues turn into big problems. Michael has a vast network of contacts that is invaluable. He has referred me to professionals in the banking, personal financial, dental insurance, fee schedules, payment processing, and staffing industries, among others. Specifically, Michael has helped us adopt marketing strategies to attract new patients, help our practice stand out in a crowded market, and deliver excellent dental services. In my practice, Michael's skill with team building has been instrumental in attracting, onboarding and retaining excellent team members. His personal coaching has helped me be a better leader, and helped our dental teams work together to deliver exceptional care for our patients. In all he does, Michael operates with integrity in his work. I have known him to dismiss clients because they do not share his values. I deeply respect this about him. Michael is true to improving the entire dental practice. He understands that if a dental team is not properly staffed, motivated, aligned, and financially sound, they cannot provide the best care to their patients. Each practice owner has a different path and Michael helps optimize each situation with his bold vision and unwavering support. He has helped me make many decisions by providing guidance on navigating complex situations. Michael understands how our professional life relates to, and supports our personal goals. His experience allows him to help us not just grow our business but live our best life while doing it. I want to thank Michael for his help throughout my career. We began working together a few years after my startup, and I would not be in the position that I am today without his help. I am deeply grateful for his mentorship and friendship over these many years.",
    sourceAuthorName: "mile_hi_fly (Jon)",
    displayAuthorName: "Jon Sierk",
    role: "Pediatric Practice Owner",
    sortOrder: 2,
  },
  {
    id: "google-ah-g-allen-herrera",
    slug: "g-allen-herrera-dds-chart-sale-support",
    source: "google",
    category: "buyer",
    rating: 5,
    quote:
      "I started with Michael in 2018 and have had an outstanding experience! He brings a wealth of knowledge and a truly professional, friendly approach to my dental practice. His advice is not only practical but also easy to implement, and I've seen improvements in patient satisfaction and office efficiency. Most recently, Michael and his team helped facilitate a chart sale that was fair to both seller and buyer (myself). He expertly guided us through the process and continues to monitor our progress, ensuring a smooth and successful transfer of patients. I highly recommend Michael to any dental team looking to level up their game!",
    sourceAuthorName: "A H (G. Allen Herrera, DDS)",
    displayAuthorName: "G. Allen Herrera, DDS",
    role: "Practice Buyer",
    featuredSlots: ["home"],
    sortOrder: 8,
  },
  {
    id: "google-blaine-leeds",
    slug: "blaine-leeds-multi-state-operations",
    source: "google",
    category: "buyer",
    rating: 5,
    quote:
      "Dr Michael has become not only a colleague, but a trusted friend who has helped navigate the challenging landscape of a multi state, multi-practice operation. His availability is his best ability. His efficient, calm leadership really made our transition smooth. Providing healthcare for patients becomes harder every day. Dr Michael makes it easier.",
    sourceAuthorName: "Blaine Leeds",
    displayAuthorName: "Blaine Leeds",
    role: "Multi-Practice Owner",
    featuredSlots: ["home"],
    sortOrder: 9,
  },
  {
    id: "google-brian-valle",
    slug: "brian-valle-sale-after-35-years",
    source: "google",
    category: "seller",
    rating: 5,
    quote:
      "After 35 years of owning my private dental practice, deciding to sell was both a deeply personal and professional milestone. I was fortunate to work with Michael Njo at Practice Transitions Institute, whose expertise, integrity and calm guidance made all the difference in this life changing process. Michael approached the transition with genuine care. As a fellow dentist himself he understood the emotional weight of passing on a practice built over decades - not just the business side, but the relationships with my patients, staff, as well as the legacy I wanted to preserve. His firsthand experience gave me confidence and I knew I was in good hands. Michael navigated every stage of the transition with professionalism and respect for my goals. He found the perfect buyer who shares my commitment to high quality dental care and will carry on the legacy I worked so hard to build. I know my patients and staff will be left in good hands. If you are considering selling your practice and want a team that truly understands the emotional and practical complexities of the process, I highly recommend Michael and the Practice Transitions Institute.",
    sourceAuthorName: "Brian Valle",
    displayAuthorName: "Brian Valle",
    role: "Practice Seller",
    featuredSlots: ["selling"],
    sortOrder: 13,
  },
  {
    id: "google-j-c",
    slug: "jc-practice-acquisition-guidance",
    source: "google",
    category: "buyer",
    rating: 5,
    quote:
      "Mike Njo was instrumental in helping me relocate from Chicago to California and guiding me through my practice acquisition. His book and webinars were also incredibly helpful, offering clear, practical insight throughout the process. Mike combines deep industry knowledge with genuine care and professionalism. I'm very grateful for his guidance and highly recommend him to any dentist considering a transition or practice purchase.",
    sourceAuthorName: "J C",
    displayAuthorName: "J. C.",
    role: "Practice Buyer",
    sortOrder: 6,
  },
  {
    id: "google-justus-williams",
    slug: "justus-williams-first-practice",
    source: "google",
    category: "buyer",
    rating: 5,
    quote:
      "Michael has made this such a smooth process for me. He knew my inexperience, but still guided and protected my decision making. I felt that everything was fairly and graciously handled. I am so grateful for his guidance. I am happy I was able to buy my first practice with Michael.",
    sourceAuthorName: "Justus Williams",
    displayAuthorName: "Justus Williams",
    role: "Practice Buyer",
    featuredSlots: ["associateships"],
    sortOrder: 10,
  },
  {
    id: "google-erica-haskett",
    slug: "erica-haskett-acquisition-support",
    source: "google",
    category: "buyer",
    rating: 5,
    quote:
      "Michael worked with me on a practice acquisition and I couldn't be more pleased. The help and advice given during the process made me feel secure in the purchase and decisions along the way of my practice. Someone as experienced as Michael in your corner is essential to navigating through the process. He's my coach, confidante, and provides honest, unfiltered advice.",
    sourceAuthorName: "Erica Haskett",
    displayAuthorName: "Erica Haskett",
    role: "Practice Buyer",
    sortOrder: 11,
  },
  {
    id: "google-linnea-westerberg",
    slug: "linnea-westerberg-transition-program",
    source: "google",
    category: "workshop",
    rating: 5,
    quote:
      "I had the opportunity of attending a transition program by Dr. Michael Njo. I was impressed beyond belief with his knowledge, expertise and caring manner when helping practice buyers and sellers. I am getting ready to transition out of practice and want my patients to be cared for in the same manner they have been for 30 years. As a Dentist I knew that Michael's level of understanding and calming expertise would allow him to guide me through this experience without a doubt. I did not hesitate for one minute before committing to work with him on this very important life change. I look forward to his guidance and have shared with my peers that any transition they plan should involve Dr. Njo.",
    sourceAuthorName: "Linnea Westerberg",
    displayAuthorName: "Linnea Westerberg",
    role: "Practice Seller",
    sortOrder: 12,
  },
  {
    id: "google-christian-lopez-cornejo",
    slug: "christian-lopez-cornejo-practice-ownership",
    source: "google",
    category: "buyer",
    rating: 5,
    quote:
      "Michael and I have worked together for almost two years in pursuit of achieving my goal of practice ownership. He has coached, supported, encouraged and guided me through the process from start to finish. He has made a breeze of what could have been the most stressful time in my career, and I have confidently taken one step after another knowing I was being coached by the best. I cannot recommend Michael and the Dental Strategies team more.",
    sourceAuthorName: "Christian Lopez Cornejo",
    displayAuthorName: "Christian Lopez Cornejo",
    role: "Practice Buyer",
    sortOrder: 14,
  },
  {
    id: "google-alec-ferradas",
    slug: "alec-ferradas-health-related-transition",
    source: "google",
    category: "seller",
    rating: 5,
    quote:
      "After being diagnosed with serious health conditions that led to having to step away from dentistry Michael Ngo was able to negotiate and complete the transition of my practice smoothly. I am relieved that both my valued patients and staff have been taken care of and that I am able to focus on healing. I believe that anyone wanting to transition their practice will find themselves in competent hands that will make their journey as easy as possible.",
    sourceAuthorName: "Alec Ferradas",
    displayAuthorName: "Alec Ferradas",
    role: "Practice Seller",
    sortOrder: 15,
  },
  {
    id: "google-richard-dare-dds",
    slug: "richard-dare-dds-seminar-feedback",
    source: "google",
    category: "workshop",
    rating: 5,
    quote:
      "I attended one of Michael Njo's seminars and was pleasantly surprised by the amount of information presented. As I am considering retiring in the next few years and selling my office, I had been feeling overwhelmed by all the details involved. However, the seminar and the book \"Dental Practice Transitions Handbook\" turned out to be a great starting point. Michael is perceptive of each dentist's needs and unique situation. I shared my timeline, and he adapted his approach accordingly. His organization has a team of professionals with the depth of expertise to handle every aspect of the transition. I look forward to working with Dental Transitions as I move into the next stage of my life.",
    sourceAuthorName: "Richard Dare, DDS",
    displayAuthorName: "Richard Dare, DDS",
    role: "Practice Seller",
    sortOrder: 16,
  },
  {
    id: "google-kevin-barry",
    slug: "kevin-barry-seminar-detail",
    source: "google",
    category: "workshop",
    rating: 5,
    quote:
      "I am so glad that I attended Dr Michael Njo's recent seminar. He went into meticulous detail about acquiring and selling a dental practice. I was fortunate to attend dental school with Dr. Njo, and I am so impressed with how he pivoted and became wise counsel for countless people in practice transitions. When it is my time to sell, I know I will be in good hands!",
    sourceAuthorName: "Kevin Barry",
    displayAuthorName: "Kevin Barry",
    role: "Seminar Attendee",
    sortOrder: 17,
  },
  {
    id: "google-jack-ohanesian",
    slug: "jack-ohanesian-win-win-deals",
    source: "google",
    category: "buyer",
    rating: 5,
    quote:
      "I have worked with Michael on several deals now, and I can honestly say there aren't many people capable of doing what Michael does. I have even sent many dentist friends his way and they all say the same thing. He is efficient, incredibly responsive, very thoughtful about crafting win-win deals for both the buyer and seller. I honestly would never consider working with anyone else. I give him my highest recommendation possible!",
    sourceAuthorName: "Jack Ohanesian",
    displayAuthorName: "Jack Ohanesian",
    role: "Dental Entrepreneur",
    sortOrder: 18,
  },
  {
    id: "google-gregory-baird",
    slug: "gregory-baird-41-year-practice-sale",
    source: "google",
    category: "seller",
    rating: 5,
    quote:
      "I recently sold my dental practice after 41 years. I was primarily concerned to find a dentist who matched my treatment planning philosophy and to take good care of my wonderful patients and staff. In the current environment of corporate dentistry, I knew that it would not be an easy task. Fortunately, a colleague gave me the name of Michael Njo and Dental Strategies. Because Michael is a dentist with general practice experience, he has a great understanding of the important aspects for a transfer of a practice, not only for the seller but also for the buyer. I am quite happy that I had Dr Njo to help me navigate my sale! He was very easy to work with. I am glad to report that together we found a great match for my staff and patients.",
    sourceAuthorName: "Gregory Baird",
    displayAuthorName: "Gregory Baird",
    role: "Practice Seller",
    sortOrder: 19,
  },
  {
    id: "google-tony-choi",
    slug: "tony-choi-fast-practice-sale",
    source: "google",
    category: "seller",
    rating: 5,
    quote:
      "I attended Mike's practice transition seminar and read his book. He was a very knowledgeable and seasoned expert in this area. I decided to use his consultation service to handle my practice sale. He was able to match a buyer within 2 weeks and completed the transaction within 45 days. He was so amazingly efficient throughout the transition process. I highly recommend him to any dentist interested in selling or buying a dental practice. Thanks again, Mike, you are my Superman.",
    sourceAuthorName: "Tony Choi",
    displayAuthorName: "Tony Choi",
    role: "Practice Seller",
    featuredSlots: ["home", "selling"],
    sortOrder: 20,
  },
  {
    id: "google-lawrence-wong",
    slug: "lawrence-wong-transaction-support",
    source: "google",
    category: "buyer",
    rating: 5,
    quote:
      "Working with Michael Njo was an absolute pleasure during the transaction of my dental office. His wealth of professional connections and years of experience proved invaluable, ensuring a seamless process from start to finish. What impressed me most was his responsiveness and willingness to address my numerous questions promptly, even after hours, providing reassurance every step of the way. Michael's ability to find creative solutions in challenging situations was commendable, ultimately satisfying both the buyer and the seller. Thanks to his expert guidance, I am now the proud owner of a thriving dental office that has exceeded my expectations. I have no doubt that I would turn to Michael for his services again in the future, given his unmatched professionalism and dedication to achieving the best possible outcomes for his clients. He comes highly recommended as a dental consultant, and I extend my heartfelt gratitude for his outstanding support throughout the entire journey.",
    sourceAuthorName: "Lawrence Wong",
    displayAuthorName: "Lawrence Wong",
    role: "Practice Buyer",
    sortOrder: 21,
  },
  {
    id: "google-colin-du-dmd",
    slug: "colin-du-dmd-practice-ownership-dream",
    source: "google",
    category: "buyer",
    rating: 5,
    quote:
      "In the world of dentistry, owning your own practice is often a dream that many dentists aspire to achieve. However, the road to becoming a practice owner is not always an easy one. It requires careful planning, hard work, and the right guidance to navigate through the complex process of purchasing a dental clinic. I have always dreamed of owning my own dental practice, but I was unsure of where to begin. I attended numerous seminars and scoured online listings for dental practices on sale, but I struggled to find a clinic that met my expectations. I was overwhelmed by the amount of work and the steps required to make this dream a reality. For instance, I had no idea which attorney or lender to use, and I felt lost in the sea of information. It was during this uncertain period that I connected with Michael. He proved to be a tremendous asset, guiding me through the entire process of purchasing a dental clinic. He patiently answered all of my questions and went above and beyond to help me every step of the way. With his expertise and guidance, I was able to find a clinic that not only met my needs but exceeded my expectations. The transfer of ownership was not without its challenges, but Michael was by my side every step of the way, helping me navigate these obstacles with ease. Thanks to his support, I was able to successfully purchase a dental clinic and realize my dream of owning my own practice. I am grateful for his expertise and dedication, and I couldn't have achieved this dream without him. If you're looking for a knowledgeable and reliable guide to help you navigate the complex world of dental practice acquisition, I highly recommend Michael. He is truly an asset in helping dentists achieve their dreams.",
    sourceAuthorName: "Meng-Ju \"Colin\" Du, DMD",
    displayAuthorName: "Meng-Ju Colin Du, DMD",
    role: "Practice Buyer",
    sortOrder: 22,
  },
  {
    id: "google-scott-smith",
    slug: "scott-smith-practice-sale-support",
    source: "google",
    category: "seller",
    rating: 4,
    quote:
      "Practice sales are emotional and trying and yet also exciting. I was glad I had PRACTICE TRANSITION INSTITUTE and Michael Nyo in my corner. Thank you Michael.",
    sourceAuthorName: "scott smith",
    displayAuthorName: "Scott Smith",
    role: "Practice Seller",
    sortOrder: 7,
  },
  {
    id: "google-kimberly-crum",
    slug: "kimberly-crum-complex-practice-sale",
    source: "google",
    category: "seller",
    rating: 5,
    quote:
      "As we were in the midst of a complex process to sell our dental practice, we encountered challenges in securing an offer that reflected the true value of our well-established family practice. Despite garnering interest from several dentists, it proved to be a daunting task. Additionally, my need for orthopedic surgery necessitated the hiring of a dentist to fill in for a six-month period during my recovery. It was during this time that we were introduced to Dental Strategies by one of the bankers assisting us. Michael promptly met with us and initiated the process. Within just two months, we were introduced to a prospective buyer. Working with someone like Michael, who is not only a former dentist but also possesses expertise that surpasses that of a traditional real estate broker, proved to be advantageous for us. His knowledge in the field allowed us to navigate through the complexities of selling our dental practice with confidence. The assistance provided by attorney Mike Treppa, and Dental Strategies played a crucial role in successfully selling our dental practice. Their expertise and guidance not only facilitated the process but also ensured that we received an offer that truly reflected the value of our well-established family practice.",
    sourceAuthorName: "Kimberly Crum",
    displayAuthorName: "Kimberly Crum",
    role: "Practice Seller",
    company: "Richard & Kimberly Crum",
    sortOrder: 23,
  },
  {
    id: "google-shilpi-seth",
    slug: "shilpi-seth-two-transactions",
    source: "google",
    category: "buyer",
    rating: 5,
    quote:
      "Michael goes above and beyond to get the deal done for you. I have done not one but two difficult transactions with him. There were hiccups along the way. He was persistent, always available to talk and had creative solutions to any problem. He has access to some of the best resources in the industry which helped us get the deal done on time and smoothly. Please hire him you won't regret!!",
    sourceAuthorName: "Shilpi Seth",
    displayAuthorName: "Shilpi Seth",
    role: "Practice Owner",
    sortOrder: 24,
  },
  {
    id: "google-keith-long",
    slug: "keith-long-full-cash-close",
    source: "google",
    category: "seller",
    rating: 5,
    quote:
      "\"Be careful what you ask for, because I will get it for you.\" That is what Michael from Dental Strategies said to me at our first face-to-face meeting. That was March 2023. We were referred to Michael after our practice was on the market for a year with few inquiries. We close July 31, 2023 with full cash offer to a wonderful couple. That is testimony, thank you Michael.",
    sourceAuthorName: "Keith Long",
    displayAuthorName: "Keith Long",
    role: "Practice Seller",
    featuredSlots: ["selling"],
    sortOrder: 25,
  },
  {
    id: "google-alexander-zaykov",
    slug: "alexander-zaykov-fred-and-liz",
    source: "google",
    category: "valuation",
    rating: 5,
    quote:
      "I had the pleasure of meeting Fred & Liz. Fred's insight is a goldmine for anyone looking to purchase or sell a dental practice. Fred's expertise in valuations and legalities is impressive. The resources provided seem comprehensive and well-crafted, a testament to their experience. If you're a dentist considering a practice transaction, I recommend tapping into their knowledge and experience.",
    sourceAuthorName: "Alexander Zaykov",
    displayAuthorName: "Alexander Zaykov",
    role: "Dentist",
    sortOrder: 26,
  },
  {
    id: "google-maricela-murillo",
    slug: "maricela-murillo-full-support",
    source: "google",
    category: "seller",
    rating: 5,
    quote:
      "Michael was great. I had his support 100% during the whole process. I recommend his services to anybody who has decided to sell or buy a practice. Honest, friendly and reliable. I couldn't have done this without your help. Thank you Michael!",
    sourceAuthorName: "Maricela Murillo",
    displayAuthorName: "Maricela Murillo",
    role: "Practice Owner",
    sortOrder: 27,
  },
  {
    id: "google-melisa-long",
    slug: "melisa-long-gratitude-note",
    source: "google",
    category: "seller",
    rating: 5,
    quote:
      "Everything went fine today with the wire transfers. I am sure that you know that. Today has been super busy with the termination of 12 employees and the rehiring of the same. Before I settled down tonight, I thanked God for your hard work, kit gloves and patience with 30 years of my husbands life. This was a major decision for us and the most stressful time of our marriage. We second guessed ourselves and almost pulled out daily. It was challenging in so many ways for us. When we thought the Buyers pulled out, you and Mike Treppa closed this deal. We needed you to know that we appreciated all of the time you spent trying to make everyone happy. We watched you work the numbers in all directions and at the end of the day everyone felt like a winner! Wow! What an amazing amount of effort! We are forever grateful! Thank you so very much!",
    sourceAuthorName: "Melisa Long",
    displayAuthorName: "Melisa Long",
    role: "Practice Seller",
    sortOrder: 28,
  },
  {
    id: "google-jason-cellars",
    slug: "jason-cellars-multiple-transitions",
    source: "google",
    category: "buyer",
    rating: 5,
    quote:
      "Thank you so much for all of your help in all of my transitions. It is quite safe to say that I would not have been able to do it without you. Your experience and knowledge always helps to keep things in perspective and allows me to hone my energy and attention. Your industry connections are also invaluable and your training allows me to speak to industry professionals as if I too am a seasoned expert. I have nothing but great appreciation and respect for you, and I will see you the next time around.",
    sourceAuthorName: "Jason Cellars",
    displayAuthorName: "Jason Cellars",
    role: "Practice Owner",
    sortOrder: 29,
  },
  {
    id: "google-rick-nichols",
    slug: "rick-nichols-fourth-transition",
    source: "google",
    category: "seller",
    rating: 5,
    quote:
      "As I approach the end of my pediatric dental career, I want to transition into the next phase of life with grace and confidence. This will be my fourth transition involving Michael and his team. I trust them with everything.",
    sourceAuthorName: "Rick Nichols",
    displayAuthorName: "Rick Nichols",
    role: "Pediatric Dentist",
    sortOrder: 30,
  },
  {
    id: "google-mike-miller",
    slug: "mike-miller-thank-you",
    source: "google",
    category: "seller",
    rating: 5,
    quote:
      "Thank you Michael, we appreciated your experience, kindness, professionalism, patience, and help when we needed it.",
    sourceAuthorName: "Mike Miller",
    displayAuthorName: "Mike Miller",
    role: "Practice Owner",
    sortOrder: 31,
  },
  {
    id: "google-dr-lee-boese",
    slug: "dr-lee-boese-major-decisions",
    source: "google",
    category: "seller",
    rating: 5,
    quote:
      "I have known Dr. Michael Nio since 2016, and over the years he has played an important role in some of the biggest professional decisions of my career. When Michael sold our practice in 2020, he delivered exactly what he said he would. His valuation proved accurate, the process was smooth, and his guidance gave us confidence every step of the way. In an environment where uncertainty can be overwhelming, Michael brought clarity, honesty, and calm leadership. I've also watched him step in for colleagues during some of the most stressful moments of their careers - navigating difficult partnership disputes, unexpected health crises, and other situations that required not just expertise, but compassion. He never shrinks from the hard conversations, and he always leads with integrity. Michael has also helped me personally during a very contentious partnership situation. His advice steadied me when I could have easily made decisions I would have regretted. His perspective was invaluable, and his loyalty was unwavering. What makes Michael unique is that he doesn't just act as a broker - he becomes a trusted advisor. He engages deeply with each client's goals, fears, and priorities. He takes the time to truly understand the full picture before offering guidance. Beyond his professional skill, Michael is someone I consider a friend and like family. He has a steady, calm presence that reassures you in difficult moments, and a genuine passion for helping dentists succeed - not just in transactions, but in building meaningful careers. I recommend him without hesitation to any dentist facing a transition, partnership decision, or major career move. Few people combine experience, integrity, and genuine care for their clients the way Michael does.",
    sourceAuthorName: "Dr. Lee Boese",
    displayAuthorName: "Dr. Lee Boese",
    role: "Practice Seller",
    featuredSlots: ["selling"],
    sortOrder: 0,
  },
  {
    id: "google-ankit-sidana",
    slug: "ankit-sidana-seminar-mentorship",
    source: "google",
    category: "workshop",
    rating: 5,
    quote:
      "I would like to sincerely thank Dr. Njo for once again taking the time to come and share his knowledge with us. Having attended his previous session as well, I truly appreciate his continued support and commitment to mentoring us. His detailed lessons on how to carefully read and analyze dental benefit contracts, understand critical clauses, evaluate reimbursement structures, and assess long-term financial implications have truly opened our horizons. Additionally, his guidance on buying a dental practice - what numbers to review, what contractual points to look over, and how to approach decision-making analytically rather than emotionally - has given me clarity and confidence for the years ahead. These insights will undoubtedly help us make wiser professional choices in the future, and personally, I would value and seek his consultation when making important decisions in these areas. Beyond his expertise, Dr. Njo is such a humble person, always approachable with an ever-smiling face. Despite his busy schedule, he generously gives us his time and attention. I feel truly thankful and blessed to not only learn from him professionally but also to know him as a person.",
    sourceAuthorName: "Ankit Sidana",
    displayAuthorName: "Ankit Sidana",
    role: "Seminar Attendee",
    featuredSlots: ["events"],
    sortOrder: 1,
  },
];

const amazonReviews: ReviewRecord[] = [
  {
    id: "amazon-dr-jaraha-review",
    slug: "amazon-dr-a-jaraha-insightful",
    source: "amazon",
    category: "book",
    rating: 5,
    quote:
      "Very insightful book! I found the chapters in this book extremely informative. It covers topics that every Dentist should know, but are rarely talked about in dental school or dental circles. It was a great read coming right out of dental school. I highly recommend.",
    sourceAuthorName: "Dr. A. Jaraha",
    displayAuthorName: "Dr. A. Jaraha",
    role: "Amazon Reviewer",
    company: "Dental Practice Transitions Handbook",
    sourceDateISO: "2023-06-18",
    sortOrder: 32,
  },
  {
    id: "amazon-technoguru-review",
    slug: "amazon-technoguru-exceptional-value",
    source: "amazon",
    category: "book",
    rating: 5,
    quote:
      "In Dental Practice Transitions Handbook, Dr. Michael A. Njo deftly navigates the ever-changing landscape of dental practice transitions, providing insightful advice and guidance to dental professionals at any stage of their career. Dr. Njo's approach emphasizes the importance of careful planning and educated decision-making to ensure long-term success in a field that has seen significant changes in recent years. The ideal audience for Dental Practice Transitions Handbook is dental professionals at any stage of their career, particularly those who are considering a transition, such as a partnership, acquisition, or sale of a practice. I wholeheartedly recommend Dental Practice Transitions Handbook by Dr. Michael A. Njo.",
    sourceAuthorName: "Technoguru",
    displayAuthorName: "Technoguru",
    role: "Amazon Reviewer",
    company: "Dental Practice Transitions Handbook",
    sourceDateISO: "2024-01-11",
    sortOrder: 33,
  },
  {
    id: "amazon-customer-review",
    slug: "amazon-customer-worth-its-weight-in-gold",
    source: "amazon",
    category: "book",
    rating: 5,
    quote:
      "Dr. Njo is very knowledgable on all aspects of private practice dentistry. Reading this book will give you a lot of valuable insight to what decisions you should and shouldn't make in order to maximize your success in your dental career.",
    sourceAuthorName: "Amazon Customer",
    displayAuthorName: "Amazon Customer",
    role: "Amazon Reviewer",
    company: "Dental Practice Transitions Handbook",
    sourceDateISO: "2024-02-02",
    sortOrder: 34,
  },
  {
    id: "amazon-sloane-review",
    slug: "amazon-sloane-great-read",
    source: "amazon",
    category: "book",
    rating: 5,
    quote:
      "I listened to the author lecture about this book and the topic. I have started reading it and am so thankful that I have the resource at my fingertips!",
    sourceAuthorName: "Sloane",
    displayAuthorName: "Sloane",
    role: "Amazon Reviewer",
    company: "Dental Practice Transitions Handbook",
    sourceDateISO: "2024-01-11",
    sortOrder: 35,
  },
];

export const reviews: ReviewRecord[] = [...googleReviews, ...amazonReviews].sort(
  (a, b) => a.sortOrder - b.sortOrder
);

export const getReviewBySlug = (slug: string): ReviewRecord | undefined => {
  return reviews.find((review) => review.slug === slug);
};

export const getAllReviewSlugs = (): string[] => {
  return reviews.map((review) => review.slug);
};

export const getFeaturedReviews = (slot: string): ReviewRecord[] => {
  return reviews
    .filter((review) => review.featuredSlots?.includes(slot))
    .sort((a, b) => a.sortOrder - b.sortOrder);
};

export const getReviewAggregate = (
  records: ReviewRecord[]
): { ratingValue: number; reviewCount: number } => {
  if (!records.length) {
    return { ratingValue: 0, reviewCount: 0 };
  }

  const totalRating = records.reduce((sum, review) => sum + review.rating, 0);
  return {
    ratingValue: Number((totalRating / records.length).toFixed(2)),
    reviewCount: records.length,
  };
};

export const getAdjacentReviewsBySlug = (
  slug: string
): { previous?: ReviewRecord; next?: ReviewRecord } => {
  const index = reviews.findIndex((review) => review.slug === slug);
  if (index === -1) return {};

  return {
    previous: index > 0 ? reviews[index - 1] : undefined,
    next: index < reviews.length - 1 ? reviews[index + 1] : undefined,
  };
};
