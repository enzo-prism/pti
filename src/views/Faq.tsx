
"use client";

import { Section } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/data/faq";

const Faq = () => {
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
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index + 1}`}
                className="border border-gray-200 rounded-lg overflow-hidden bg-white animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AccordionTrigger className="px-6 py-4 text-left text-lg font-semibold hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-base">
                  <p className="text-gray-600">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
