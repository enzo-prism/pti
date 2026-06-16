export type ReviewSource = "google" | "internal" | "amazon" | "alignable";
export type ReviewCategory =
  | "buyer"
  | "seller"
  | "workshop"
  | "valuation"
  | "consulting"
  | "book";

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

const documentReviews: ReviewRecord[] = [
  {
    id: "google-peter-igler",
    slug: "peter-igler-full-team-workshop",
    source: "google",
    category: "workshop",
    rating: 5,
    quote:
      "This past week we had our first full team workshop with Michael. What a fantastic experience! Michael was able to articulate the practice vision in such a way that the whole team left the meeting energized and motivated to work with and for each other to achieve our goals. If you are looking for a consultant to help take your practice to the next level, I highly recommend you reach out to Michael.",
    sourceAuthorName: "Peter Igler",
    displayAuthorName: "Peter Igler",
    role: "Workshop Client",
    sourceUrl:
      "https://www.google.com/maps/contrib/101998334843444272630/reviews?hl=en-US",
    sortOrder: 36,
  },
  {
    id: "google-jai-cho",
    slug: "jai-cho-webinar-clarity",
    source: "google",
    category: "workshop",
    rating: 5,
    quote:
      "Mike and the other advisors made the webinar both insightful and practical. Great real-world strategies that gave me more clarity and confidence in planning my next steps.",
    sourceAuthorName: "Jai Cho",
    displayAuthorName: "Jai Cho",
    role: "Webinar Attendee",
    sourceUrl:
      "https://www.google.com/maps/contrib/116843040214062298200/reviews?hl=en",
    sortOrder: 37,
  },
  {
    id: "google-j-anny-yoo",
    slug: "j-anny-yoo-seminar-book-guidance",
    source: "google",
    category: "buyer",
    rating: 5,
    quote:
      "Despite taking numerous courses on buying a dental practice, I still felt overwhelmed and unsure of where to begin. Working with Michael Njo and attending one of his seminars was a turning point. I gained valuable insights that I hadn't encountered elsewhere. Michael is not only incredibly knowledgeable but also genuinely cares about the success of those he works with. I also purchased his book, Dental Practice Transitions Handbook, which provided clear, practical guidance and further deepened my understanding of the transition process. Michael and his team at Dental Transitions bring both expertise and integrity to the table, and working with them has been a truly positive experience. I'm confident in the path ahead and look forward to continuing to work with Dental Transitions as I move into the next stage of my professional journey.",
    sourceAuthorName: "J. Anny Yoo",
    displayAuthorName: "J. Anny Yoo",
    role: "Practice Buyer",
    sourceUrl:
      "https://www.google.com/maps/contrib/116306192146209101321/reviews?hl=en",
    sortOrder: 38,
  },
  {
    id: "google-david-consulting-services",
    slug: "david-consulting-services-transition",
    source: "google",
    category: "consulting",
    rating: 5,
    quote:
      "Working with Michael has been the best decision I made in helping me transition in my business needs. He's very personable and always has your best interest at heart. He also has a strong network referral team to help you navigate through any questions you may have. Highly recommend him for consulting services!",
    sourceAuthorName: "david",
    displayAuthorName: "David",
    role: "Consulting Client",
    sortOrder: 39,
  },
  {
    id: "alignable-kristen-maude",
    slug: "kristen-maude-practice-growth",
    source: "alignable",
    category: "consulting",
    rating: 5,
    quote:
      "Highly recommend Michael for all things related to your dental practice's growth and success!",
    sourceAuthorName: "Kristen Maude",
    displayAuthorName: "Kristen Maude",
    role: "Dental Marketing Professional",
    company: "Gargle - Dental Marketing",
    sortOrder: 40,
  },
  {
    id: "alignable-david-alpan",
    slug: "david-alpan-dds-great-team",
    source: "alignable",
    category: "consulting",
    rating: 5,
    quote: "I highly recommend Dr. Njo and his great team.",
    sourceAuthorName: "David Alpan, DDS, MSD, Ltd.",
    displayAuthorName: "David Alpan, DDS, MSD",
    role: "Orthodontist",
    company: "Alpan Orthodontics",
    sortOrder: 41,
  },
  {
    id: "alignable-kevin-valle",
    slug: "kevin-valle-consultant-broker",
    source: "alignable",
    category: "consulting",
    rating: 5,
    quote:
      "Dr. Njo is an exceptional dental consultant and broker who brings unmatched expertise, integrity and strategic insight to every engagement. His deep understanding of both clinical practice operations and the business side of dentistry makes him an invaluable resource for dentists at every stage of their careers. As a consultant, Dr. Njo has a remarkable ability to evaluate a practice comprehensively, from production and profitability to systems, team performance and growth opportunities. His recommendations are thoughtful, data-driven and tailored to the specific goals of each client. He doesn't just identify opportunities; he provides clear, actionable strategies that lead to measurable results. As a broker, Dr. Njo demonstrates professionalism and transparency throughout the entire transaction process. He skillfully guides buyers and sellers with confidence, ensuring smooth transitions while protecting their best interests. His attention to detail, market knowledge and negotiation skills consistently lead to successful outcomes. What truly sets Dr. Njo apart is his commitment to relationships. He builds trust, communicates clearly and genuinely cares about the long-term success of the dentists and practices he serves. I highly recommend Dr. Njo to any dental professional seeking expert consulting guidance or a trusted partner in buying or selling a practice.",
    sourceAuthorName: "Kevin Valle",
    displayAuthorName: "Kevin Valle",
    role: "Dental Professional",
    sortOrder: 42,
  },
  {
    id: "internal-matt-asaro",
    slug: "matt-asaro-practice-growth",
    source: "internal",
    category: "consulting",
    rating: 5,
    quote:
      "When I first started working with Michael at Dental Strategies, I wasn't sure exactly how he could help my practice. I quickly learned that the key was actively reaching out and using him as a resource, and I'm so glad I did. Over the past several years, Michael has had a profound impact on both my professional and personal life. He's been instrumental in helping me improve my communication skills and coaching me through the complexities of managing staff effectively. What sets him apart is his ability to serve as an excellent liaison between me and my team. My staff knows they can turn to him with questions or concerns, which has created a valuable support system for everyone. The results speak for themselves: Michael has significantly strengthened my relationship with my office manager and helped us achieve consistent growth year after year. For the right practice, Michael is an exceptional resource, and I recommend him without reservation.",
    sourceAuthorName: "Matt Asaro, DDS",
    displayAuthorName: "Matt Asaro, DDS",
    role: "Practice Owner",
    sortOrder: 43,
  },
  {
    id: "internal-nelson-wong",
    slug: "nelson-wong-practice-ownership",
    source: "internal",
    category: "buyer",
    rating: 5,
    quote:
      "I want to thank you from the bottom of my heart for everything you've done for me. Without you, I would not have bought this practice and become an owner so quickly. You taught me how to purchase and manage a dental practice, and more importantly, how to think as a business owner. These are valuable lessons that will stick with me forever.",
    sourceAuthorName: "Nelson Wong",
    displayAuthorName: "Nelson Wong",
    role: "Practice Buyer",
    sortOrder: 44,
  },
  {
    id: "internal-christina-presentation-sops",
    slug: "christina-presentation-sops",
    source: "internal",
    category: "workshop",
    rating: 5,
    quote:
      "After your presentation, our spirits were high! Michael, you have a really nice way of getting down to business with such finesse. You made so many really good points in such an entertaining way. Thank you for coming and hanging out with us. I look forward to implementing your extra ideas into our SOPs next week. Your input will take us to the next level.",
    sourceAuthorName: "Christina",
    displayAuthorName: "Christina",
    role: "Workshop Attendee",
    sortOrder: 45,
  },
  {
    id: "internal-keith-boxerman",
    slug: "keith-boxerman-trusted-practice-sale",
    source: "internal",
    category: "seller",
    rating: 5,
    quote:
      "I was into year four of trying to sell my practice. I had been with three well-known brokers without success. A trusted colleague knew my situation, knew I was ready to close the doors, and implored me to call Michael. From day one the experience with Michael was different. He stated he was a transition specialist, different than a traditional broker, and his approach was based on relationships he had formed. His goal was to create a win-win situation matching a seller to the right buyer. Michael gave me hope, asked for my trust, and within two months introduced me to a terrific person, fine dentist, and a great match for my practice. Within two more months a favorable deal was on the table and soon thereafter the deal was closed and the funds were in my bank. Michael served me well. He was consistent, organized, found me a good match, and got the job done. Thank you Michael, well done sir. I am forever grateful!",
    sourceAuthorName: "Keith Boxerman, DDS",
    displayAuthorName: "Keith Boxerman, DDS",
    role: "Practice Seller",
    sortOrder: 46,
  },
  {
    id: "internal-teagan-seminar",
    slug: "teagan-seminar-career-lifespan",
    source: "internal",
    category: "workshop",
    rating: 5,
    quote:
      "Dr. Njo and the Practice Transitions Institute have created a beautiful and comprehensive look into the lifespan of a dental career. They address how to plan for a successful career, navigate and avoid common pitfalls as both an associate and practice owner, as well as prepare for early retirement with a comfortable future ahead of you! It is catered to teach valuable principles to practitioners at any point of their careers, and the interactive presentations really bring that home.",
    sourceAuthorName: "Teagan",
    displayAuthorName: "Teagan",
    role: "Seminar Attendee",
    sortOrder: 47,
  },
  {
    id: "internal-rebecca-seminar-spouse",
    slug: "rebecca-seminar-spouse-confidence",
    source: "internal",
    category: "workshop",
    rating: 5,
    quote:
      "I attended the seminar with my spouse, who is the dentist, so I'm coming from a non-dental background. I came in with some knowledge of the dental career timeline and practice acquisition, and was blown away in a good way by how much more I learned in one day. Dr. Njo and the entire team he assembled taught at a level I could understand, everyone answered questions thoroughly, and my confidence in our ability to thrive in dentistry rose by more than I could have hoped.",
    sourceAuthorName: "Rebecca",
    displayAuthorName: "Rebecca",
    role: "Seminar Attendee",
    sortOrder: 48,
  },
  {
    id: "internal-michelle-team-meeting",
    slug: "michelle-team-meeting-positive-mindset",
    source: "internal",
    category: "workshop",
    rating: 5,
    quote:
      "First I would like to say thank you for taking the time to get the team together. I think the meeting went great. We all left with a positive mindset and felt heard. I was nervous coming into the office the next day hoping it would not jump back to the energy we had before, but it was one of the best days we have had. The energy was uplifting and positive, issues were being addressed, and everyone was having a fun time. Thank you Michael!",
    sourceAuthorName: "Michelle",
    displayAuthorName: "Michelle",
    role: "Team Workshop Attendee",
    sortOrder: 49,
  },
  {
    id: "internal-jenn-team-energy",
    slug: "jenn-team-positive-energy",
    source: "internal",
    category: "workshop",
    rating: 5,
    quote:
      "It was great finally meeting you today! What you did for the team is amazing and I can feel the positive energy flowing. I just wanted to say thank you and to touch base. I like asking questions so you might hear from me every so often!",
    sourceAuthorName: "Jenn",
    displayAuthorName: "Jenn",
    role: "Team Workshop Attendee",
    sortOrder: 50,
  },
  {
    id: "internal-merlin-business-club",
    slug: "merlin-dugoni-business-club",
    source: "internal",
    category: "workshop",
    rating: 5,
    quote:
      "Thank you so much for your time you gave us tonight as well as the expertise you shared. You have been such a big help with the Dugoni Business Club and I really appreciate everything you have done for me and us. I have already received great feedback and know your event was a success!",
    sourceAuthorName: "Merlin",
    displayAuthorName: "Merlin",
    role: "Dugoni Business Club",
    sortOrder: 51,
  },
  {
    id: "internal-christina-dentistry-better",
    slug: "christina-dentistry-better-place",
    source: "internal",
    category: "consulting",
    rating: 5,
    quote:
      "Thank you for taking time out of your busy schedule for me this morning. Really I have no complaints. I am happy with where I'm at. Michael, I just want to say that dentistry is a better place with you in it!",
    sourceAuthorName: "Christina",
    displayAuthorName: "Christina",
    role: "Consulting Client",
    sortOrder: 52,
  },
  {
    id: "internal-dominique-office-opening",
    slug: "dominique-office-opening-guidance",
    source: "internal",
    category: "buyer",
    rating: 5,
    quote:
      "I can't even find the words. I am truly grateful for you! Of all of the things to come out of opening my own office this was such a blessing. I appreciate all of your help and guidance. I hope that through the course of our relationship I can give back to you what you have given to me.",
    sourceAuthorName: "Dominique",
    displayAuthorName: "Dominique",
    role: "Practice Owner",
    sortOrder: 53,
  },
  {
    id: "internal-reza-practice-sale",
    slug: "reza-linear-practice-sale",
    source: "internal",
    category: "seller",
    rating: 5,
    quote:
      "Late fall of 2020 I decided to sell my general dental practice after 31 years of practicing. Through a friend I was introduced to Michael. We had an excellent initial conversation discussing what I had in mind, the reason for selling my office, details of the process, and the timeline I was looking at. What I appreciated the most about working with Michael was that he did not have a slew of individuals lined up to come and kick the tires and waste precious time and emotions. Michael presented two closely vetted potential candidates. The way Michael sets up the contracts and agreements minimizes the potential pitfalls that many buyers and sellers fall into. Michael is an expert who has developed a well-thought-out linear path when it comes to selling dental practices. He set me up with the right candidate and facilitated the sale process well. I am very happy with how things turned out.",
    sourceAuthorName: "Reza",
    displayAuthorName: "Reza",
    role: "Practice Seller",
    sortOrder: 54,
  },
  {
    id: "internal-sandy-shelby-transition",
    slug: "sandy-shelby-heartbreaking-transition",
    source: "internal",
    category: "seller",
    rating: 5,
    quote:
      "Thank you so much for all your help with our transition. Heartbreaking circumstances, but we couldn't be more thankful that the outcome is good for both our family and our dear friend. I will pass your information along to my brother and encourage him to reach out to you. We wish you the best as well. God bless!",
    sourceAuthorName: "Sandy and Shelby",
    displayAuthorName: "Sandy and Shelby",
    role: "Practice Transition Client",
    sortOrder: 55,
  },
  {
    id: "internal-val-personnel-coaching",
    slug: "val-personnel-coaching",
    source: "internal",
    category: "consulting",
    rating: 5,
    quote:
      "I just want to circle back to the last night conversation and say from the bottom of my heart thank you again. Thank you for teaching me how to deal with personnel, how to hold my ground without being mean or offensive. You are amazing. Thank you for being here for me, holding my hand and showing me the way. I admire and appreciate you.",
    sourceAuthorName: "Val",
    displayAuthorName: "Val",
    role: "Consulting Client",
    sortOrder: 56,
  },
  {
    id: "internal-jason-acquisition-mentor",
    slug: "jason-acquisition-mentor",
    source: "internal",
    category: "buyer",
    rating: 5,
    quote:
      "Thank you for your call this morning. It has been great having you by my side throughout this process as a guide and mentor. The thing I am most appreciative about is how available you have been for advice. Going through the uncharted territory of buying this practice, there were always times when I would be talking with someone and did not know what the norm was, and it was great to have you in my corner to run things by as a seasoned vet. Your early advice on how to negotiate my meetings with the seller and how to deal with his broker was incredibly helpful. It was also very nice to have someone who has gone through this process so many times give me a bird's-eye view of the entire process. You made it clear at the beginning what the process was, what order everything came in, and what I would need for each step. It has been a pleasure working with you so far, and I am very happy to have worked with you and hope to continue working with you.",
    sourceAuthorName: "Jason",
    displayAuthorName: "Jason",
    role: "Practice Buyer",
    sortOrder: 57,
  },
  {
    id: "internal-karrie-workshop",
    slug: "karrie-best-workshop",
    source: "internal",
    category: "workshop",
    rating: 5,
    quote:
      "I just wanted to say I personally felt today's workshop was the best. The energy was so good and I am so excited about the new team members. Thank you for always keeping things real with a positive note!",
    sourceAuthorName: "Karrie",
    displayAuthorName: "Karrie",
    role: "Workshop Attendee",
    sortOrder: 58,
  },
  {
    id: "internal-hui-smooth-transition",
    slug: "hui-smooth-transition",
    source: "internal",
    category: "seller",
    rating: 5,
    quote:
      "Thanks for everything. I can't thank you enough for making this transition go very smoothly.",
    sourceAuthorName: "Hui",
    displayAuthorName: "Hui",
    role: "Practice Transition Client",
    sortOrder: 59,
  },
  {
    id: "internal-michelle-dental-angel",
    slug: "michelle-dental-angel",
    source: "internal",
    category: "seller",
    rating: 5,
    quote:
      "Thank you for guiding me through my moment. You truly are my dental angel. I think the realization of what just happened will sink in sometime next year! You have helped me realize my dreams come true and so much more. I appreciate all the time, patience and care that you have given during this entire process. I appreciate your guidance as a mentor and especially as a friend. You have a very special talent, gift, and integrity of character. I sincerely thank you for being you.",
    sourceAuthorName: "Michelle",
    displayAuthorName: "Michelle",
    role: "Practice Transition Client",
    sortOrder: 60,
  },
  {
    id: "internal-arthur-practice-growth",
    slug: "arthur-practice-growth",
    source: "internal",
    category: "consulting",
    rating: 5,
    quote:
      "I just want to write to thank you for all you have done for me and the office. Since your arrival, my office has been in such great order that everyone knows their responsibilities and how to be accountable. The practice is running smoothly right now with the associate doctors doing very well. Our revenue has gone from being on track to hit $3M to now on track to hit $4.4M for the year. Thank you for helping me look for a second practice to purchase. Without you, none of this is possible. I am grateful you have come to our office and our lives.",
    sourceAuthorName: "Arthur",
    displayAuthorName: "Arthur",
    role: "Practice Owner",
    sortOrder: 61,
  },
  {
    id: "internal-lois-office-culture",
    slug: "lois-office-culture",
    source: "internal",
    category: "consulting",
    rating: 5,
    quote:
      "Michael, I truly do appreciate all that you have done in the office. Last year at this same time my staff was unhappy, rude to one another and I was extremely unhappy with them. I am seeing an improvement and the mood in the office is improving, and I know that this is the direct result of your participation in the practice. You have done a great job.",
    sourceAuthorName: "Lois",
    displayAuthorName: "Lois",
    role: "Practice Owner",
    sortOrder: 62,
  },
  {
    id: "internal-michelle-residents",
    slug: "michelle-residents-presentation",
    source: "internal",
    category: "workshop",
    rating: 5,
    quote:
      "I will definitely be in touch, because the residents this year really enjoyed hearing your presentation.",
    sourceAuthorName: "Michelle",
    displayAuthorName: "Michelle",
    role: "Residency Program Director",
    company: "UMC Residents, Fresno",
    sortOrder: 63,
  },
  {
    id: "internal-howard-chi-residents",
    slug: "howard-chi-residents-presentation",
    source: "internal",
    category: "workshop",
    rating: 5,
    quote:
      "The residents shared with me how informative and invaluable your presentation was. I would definitely like you back next year. You can spend half or the whole day with us. Whatever you need.",
    sourceAuthorName: "Howard Chi",
    displayAuthorName: "Howard Chi",
    role: "Residency Program Director",
    company: "UOP Residents, Stockton and San Francisco",
    sortOrder: 64,
  },
  {
    id: "internal-monte-smith",
    slug: "monte-smith-smooth-transaction",
    source: "internal",
    category: "seller",
    rating: 5,
    quote:
      "Everything has gone real smoothly with the whole transaction up to this point. I think the whole thing is a real blessing to our family. It is all because of you! Thanks. Keep in touch! I know I will need some advice about various management issues in the future.",
    sourceAuthorName: "Monte Smith, DDS",
    displayAuthorName: "Monte Smith, DDS",
    role: "Practice Seller",
    sortOrder: 65,
  },
  {
    id: "internal-eugenio-practice-purchase",
    slug: "eugenio-practice-purchase",
    source: "internal",
    category: "buyer",
    rating: 5,
    quote:
      "I just want to say thank you for being so instrumental in the purchase of my practice. I have been so fortunate to meet you and work with you for the past almost two years. I still can't believe that we did it! Now it is going to take lots of work to get to where I want to be, but purchasing this practice is a great beginning and I owe you so much.",
    sourceAuthorName: "Eugenio",
    displayAuthorName: "Eugenio",
    role: "Practice Buyer",
    sortOrder: 66,
  },
  {
    id: "internal-craig-not-given-up",
    slug: "craig-not-given-up",
    source: "internal",
    category: "consulting",
    rating: 5,
    quote:
      "Just want to say how thankful I am to have met you and that you have not given up on me. I am a little slow, but I will eventually get this. Good things are happening day by day.",
    sourceAuthorName: "Craig",
    displayAuthorName: "Craig",
    role: "Consulting Client",
    sortOrder: 67,
  },
  {
    id: "internal-lynn-team-development",
    slug: "lynn-team-development",
    source: "internal",
    category: "consulting",
    rating: 5,
    quote:
      "Thank you so much for helping us develop as a team. We could not have come this far without your help.",
    sourceAuthorName: "Lynn",
    displayAuthorName: "Lynn",
    role: "Practice Team Client",
    sortOrder: 68,
  },
  {
    id: "internal-lois-nino-transfer",
    slug: "lois-nino-practice-transfer",
    source: "internal",
    category: "seller",
    rating: 5,
    quote:
      "Wednesday's meeting was great. The staff is really coming together. It has been a journey, and one not possible without your patience and sincerity. Your ability to transmit your passion and belief in the profession and teaching people to walk that walk has made all the difference in the office. Thank you also for holding my hand as the Nino practice transferred and helping me work through the financial problems associated with that transfer. I know that the office has a long way to go and I can see the path and a time coming when I can just do dentistry.",
    sourceAuthorName: "Lois",
    displayAuthorName: "Lois",
    role: "Practice Transition Client",
    sortOrder: 69,
  },
  {
    id: "internal-al-painless-transfer",
    slug: "al-painless-transfer",
    source: "internal",
    category: "seller",
    rating: 5,
    quote:
      "Just wanted to thank you again for a job well done. You made what could have been a long and difficult process relatively painless. I look forward to Jack's continuing success with the practice and will do everything I can to expedite that.",
    sourceAuthorName: "Al",
    displayAuthorName: "Al",
    role: "Practice Seller",
    sortOrder: 70,
  },
  {
    id: "internal-krissy-motivating-meeting",
    slug: "krissy-motivating-meeting",
    source: "internal",
    category: "consulting",
    rating: 5,
    quote:
      "Just wanted to say it was great seeing you today and thank you for our meeting. You are the only person I know that can make a two-hour meeting very entertaining! You are very motivating and have a great sense as to how an office should run. Thanks again for everything!",
    sourceAuthorName: "Krissy",
    displayAuthorName: "Krissy",
    role: "Consulting Client",
    sortOrder: 71,
  },
  {
    id: "internal-ryan-partner-management",
    slug: "ryan-partner-management",
    source: "internal",
    category: "consulting",
    rating: 5,
    quote:
      "You really did an amazing job working with all the partners and I'm excited to learn from you and become a better manager and partner. I'm grateful for you.",
    sourceAuthorName: "Ryan",
    displayAuthorName: "Ryan",
    role: "Practice Partner",
    sortOrder: 72,
  },
  {
    id: "internal-steve-leadership-coaching",
    slug: "steve-leadership-coaching",
    source: "internal",
    category: "consulting",
    rating: 5,
    quote:
      "All great teams have good players, coaches and management. We've been blessed to have you all as team members to support the work we do for our patients, but have struggled in areas of coaching and managing. That's why we've brought Michael aboard. He's helping us become better leaders and managers first, then better coaches to obtain the results we all desire. He's not just another consultant. He's different; he approaches his work differently than any other consultant or coach I've worked with.",
    sourceAuthorName: "Steve",
    displayAuthorName: "Steve",
    role: "Practice Leader",
    sortOrder: 73,
  },
  {
    id: "internal-mic-mpdg-culture",
    slug: "mic-mpdg-culture-change",
    source: "internal",
    category: "consulting",
    rating: 5,
    quote:
      "We are looking forward to working with Michael Njo to help change the culture of the MPDG. Our retreat was the most productive in my 30 years here. I'm excited to do the hard work that will make a difference for all of us. The change needs to start with the partners, and the communication between us all needs to be open, constructive and effective. Although this will be a work in progress, I'm confident that we should see some immediate results. Thanks to all of you for your support through the years. We have a bright future.",
    sourceAuthorName: "Mic",
    displayAuthorName: "Mic",
    role: "Practice Leader",
    sortOrder: 74,
  },
  {
    id: "internal-kim-c-bonus-system",
    slug: "kim-c-bonus-system",
    source: "internal",
    category: "consulting",
    rating: 5,
    quote:
      "I have been meaning to email you, and I was signing a card for the doctors and wanted to let you know how much the bonus system is appreciated. It is amazing to have all our hard work appreciated, and actually it makes it more exciting to come to work every day. I love my job here. Thanks for all your hard work!",
    sourceAuthorName: "Kim C",
    displayAuthorName: "Kim C",
    role: "Practice Team Member",
    sortOrder: 75,
  },
  {
    id: "internal-lee-win-win",
    slug: "lee-win-win-transition",
    source: "internal",
    category: "seller",
    rating: 5,
    quote:
      "Michael, I poured my heart into the new office and I kept telling myself it was real, but this has been a long road. I shared with a few colleagues close to me and what you did was incredible. I know there are no guarantees in life, but you can do things to become successful. I truly believe this was a win-win for everyone. Thank you for your hard work and perseverance. I am glad we will get to continue our working relationship. I have gotten to know you over the years and see you more as my friend than a broker.",
    sourceAuthorName: "Lee",
    displayAuthorName: "Lee",
    role: "Practice Transition Client",
    sortOrder: 76,
  },
  {
    id: "internal-wounacott-major-transition",
    slug: "wounacott-major-transition",
    source: "internal",
    category: "seller",
    rating: 5,
    quote:
      "Thanks so much for the important role you've played in such a major transition in our lives. We are thrilled with pretty much everything about where we are now, and we appreciate the role you played in helping us get here. Thanks!",
    sourceAuthorName: "Michael and Courtney Wounacott",
    displayAuthorName: "Michael and Courtney Wounacott",
    role: "Practice Transition Clients",
    sourceDateISO: "2012-09-04",
    sortOrder: 77,
  },
  {
    id: "internal-sue-collaborative-harmony",
    slug: "sue-collaborative-harmony",
    source: "internal",
    category: "consulting",
    rating: 5,
    quote:
      "Thank you for ushering in a new era of collaborative harmony for our organization! I can't thank you enough for the peace of mind that you've already brought into my life.",
    sourceAuthorName: "Sue",
    displayAuthorName: "Sue",
    role: "Practice Leader",
    sourceDateISO: "2018-10-08",
    sortOrder: 78,
  },
  {
    id: "internal-nicole-mpdg",
    slug: "nicole-mpdg-bonus-support",
    source: "internal",
    category: "consulting",
    rating: 5,
    quote:
      "Thank you Michael for all that you do! I really appreciate the bonus that you helped me get. Thank you for the time you put into MPDG.",
    sourceAuthorName: "Nicole",
    displayAuthorName: "Nicole",
    role: "Practice Team Member",
    company: "Ventura Thompson Family",
    sortOrder: 79,
  },
  {
    id: "internal-jessica-sale-facilitation",
    slug: "jessica-sale-facilitation",
    source: "internal",
    category: "seller",
    rating: 5,
    quote:
      "Thank you so much for the beautiful orchid arrangement. Valod was so impressed with your business knowledge, and he often said he wished we had met you sooner because things would have transpired very differently. Thank you for your time and effort in facilitating the sale.",
    sourceAuthorName: "Jessica",
    displayAuthorName: "Jessica",
    role: "Practice Seller",
    sortOrder: 80,
  },
  {
    id: "internal-jan-guidance",
    slug: "jan-guidance-positive-enthusiasm",
    source: "internal",
    category: "consulting",
    rating: 5,
    quote:
      "We are thrilled to have you! Thank you for the guidance and positive enthusiasm you share with me. I love my job and your advice helps me to grow. I appreciate all you do.",
    sourceAuthorName: "Jan",
    displayAuthorName: "Jan",
    role: "Practice Team Member",
    sourceDateISO: "2011-01-26",
    sortOrder: 81,
  },
  {
    id: "internal-brittany-transition-well",
    slug: "brittany-transition-well",
    source: "internal",
    category: "consulting",
    rating: 5,
    quote:
      "Thank you so much for all your help and expertise. You have helped me grow, learn, and transition well. Looking forward to all that's ahead!",
    sourceAuthorName: "Brittany",
    displayAuthorName: "Brittany",
    role: "Consulting Client",
    sortOrder: 82,
  },
  {
    id: "internal-andrew-wang",
    slug: "andrew-wang-light-at-end-of-tunnel",
    source: "internal",
    category: "consulting",
    rating: 5,
    quote:
      "Thank you for your help! I can see the light at the end of the tunnel.",
    sourceAuthorName: "Andrew Wang, DDS",
    displayAuthorName: "Andrew Wang, DDS",
    role: "Consulting Client",
    sourceDateISO: "2019-01-17",
    sortOrder: 83,
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

export const reviews: ReviewRecord[] = [
  ...googleReviews,
  ...documentReviews,
  ...amazonReviews,
].sort((a, b) => a.sortOrder - b.sortOrder);

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
