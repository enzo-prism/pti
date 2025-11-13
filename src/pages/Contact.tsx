
import Layout from "@/components/layout/Layout";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import SEO from "@/components/layout/SEO";
import { buildContactPageSchema } from "@/lib/structuredData";

const Contact = () => {
  const contactSchema = buildContactPageSchema();

  return (
    <>
      <SEO
        title="Contact Practice Transitions Institute"
        description="Call or message Practice Transitions Institute to discuss dental practice valuations, sales, associateships, and personalized guidance."
        path="/contact"
        structuredData={contactSchema}
      />
      <Layout>
        <div className="pt-24 md:pt-32 bg-gradient-to-b from-accent to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center pb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Let's Talk About Your Next Chapter
            </h1>
            <div className="text-lg text-gray-600 animate-fade-in animate-delay-100 text-center max-w-2xl mx-auto">
              <p className="mb-4">
                Whether you're planning to sell, buy, or just exploring your options, we're here to help you
                make smart, confident decisions about your dental practice.
              </p>
              <p className="mb-4">
                No pressure. No sales pitch. Just honest guidance from people who know the industry.
              </p>
              <div>
                <p className="font-semibold mb-2">What You Can Expect:</p>
                <ul className="space-y-1">
                  <li>• A quick, friendly conversation—no obligation</li>
                  <li>• Answers to your biggest questions about practice transitions</li>
                  <li>• Clarity on your options and next steps</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

        <Section className="mb-0 pb-0 -mb-16 md:-mb-20">
          <div className="max-w-4xl mx-auto">
            <ContactForm />
          </div>
        </Section>
      </Layout>
    </>
  );
};

export default Contact;
