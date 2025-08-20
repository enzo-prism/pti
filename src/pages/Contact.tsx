
import Layout from "@/components/layout/Layout";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";

const Contact = () => {
  return (
    <Layout>
      <div className="pt-28 bg-gradient-to-b from-accent to-white">
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

      <Section className="mb-2">
        <div className="max-w-4xl mx-auto">
          <ContactForm />
        </div>
      </Section>
    </Layout>
  );
};

export default Contact;
