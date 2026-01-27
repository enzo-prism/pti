
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { faqItems } from "@/data/faq";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
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
