
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import SEO from "@/components/layout/SEO";
import { buildFAQSchema } from "@/lib/structuredData";

interface FaqItem {
  question: string;
  answer: string;
}

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems: FaqItem[] = [
    {
      question: "How much is my dental practice worth?",
      answer: "The value of a dental practice depends on numerous factors including revenue history, profitability, patient base, location, equipment, lease terms, and market conditions. At PTI, we provide a comprehensive Opinion of Value service that analyzes these factors using industry-standard methodologies to determine a fair market value for your practice. This valuation is essential whether you're planning to sell, seeking a partner, or simply want to understand your practice's current worth."
    },
    {
      question: "How long does the practice transition process take?",
      answer: "The timeline for a practice transition varies depending on several factors, including the complexity of the practice, the type of transition, and the readiness of both parties. Typically, the process can take anywhere from 3-12 months from initial consultation to completed transition. At PTI, we work diligently to make the process as efficient as possible while ensuring all legal, financial, and practical considerations are thoroughly addressed."
    },
    {
      question: "What's the difference between an appraisal and an opinion of value?",
      answer: "An appraisal is typically a formal, comprehensive document prepared by a certified appraiser that may be used for legal proceedings, financing, or other official purposes. An opinion of value, which PTI provides, is a professional assessment of a practice's worth based on industry standards and market knowledge. Our opinion of value service is specifically tailored to dental practices and provides actionable insights for transition planning without the additional cost and time associated with formal appraisals."
    },
    {
      question: "Should I tell my staff that I'm planning to sell my practice?",
      answer: "The timing of when to inform your staff about a practice sale is a delicate matter. Generally, we advise maintaining confidentiality during the initial stages of the sale process to prevent unnecessary anxiety or staff turnover. Once you have a committed buyer and a defined transition plan, we help you develop a communication strategy to inform your team in a way that emphasizes continuity of care and job security. PTI provides guidance on this communication process as part of our comprehensive transition services."
    },
    {
      question: "What are the tax implications of selling my dental practice?",
      answer: "Selling a dental practice can have significant tax implications, including potential capital gains taxes and allocation of the purchase price among different asset classes. Each situation is unique based on your practice structure, sale terms, and personal financial situation. While PTI does not provide tax advice, we work closely with your CPA or tax advisor to structure the transaction in a way that aims for optimal tax treatment. We strongly recommend consulting with a tax professional experienced in dental practice transitions early in the process."
    },
    {
      question: "How can I prepare my practice for sale to maximize its value?",
      answer: "Preparing your practice for sale typically involves strategies such as ensuring solid financial records, maintaining or increasing production, upgrading essential equipment, addressing facility aesthetics, documenting systems and procedures, and building a strong patient base. PTI offers pre-sale consulting to help you identify specific improvements that could increase your practice's value. Ideally, preparation should begin 1-3 years before you plan to sell, though we can assist at any stage of the process."
    },
    {
      question: "What should I look for when buying a dental practice?",
      answer: "When buying a dental practice, key considerations include the practice's financial health, patient demographics and retention, location and facility condition, staff quality and retention, equipment status, reputation in the community, and growth potential. Additionally, you should evaluate how well the practice aligns with your clinical philosophy and career goals. PTI helps buyers conduct thorough due diligence and provides guidance on financing options, transition planning, and post-acquisition strategies to ensure a successful ownership transition."
    }
  ];

  const faqSchema = buildFAQSchema(faqItems);

  return (
    <>
      <SEO
        title="Dental Practice Transition FAQ"
        description="Answers to common dental practice transition questions covering valuations, sale timelines, associateships, taxes, and preparation tips."
        path="/faq"
        structuredData={faqSchema}
      />
      <div className="pt-24 md:pt-32 bg-gradient-to-b from-accent to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center pb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 animate-fade-in animate-delay-100">
              Find answers to common questions about dental practice transitions,
              valuation, and the selling process.
            </p>
          </div>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden bg-white animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-semibold text-lg">{item.question}</span>
                  <ChevronDown 
                    className={`h-5 w-5 text-primary transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all ${
                    openIndex === index ? "max-h-96 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section background="light" className="mb-8">
        <Cta
          title="Still have questions?"
          description="Schedule a complimentary consultation with our team of experts to explore your options and create a personalized transition plan."
          buttonText="Contact Us Today"
          buttonUrl="/contact"
        />
      </Section>
    </>
  );
};

export default Faq;
