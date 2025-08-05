
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
            <p className="text-lg text-gray-600 animate-fade-in animate-delay-100">
              Schedule a complimentary consultation or reach out with any questions
              about dental practice transitions.
            </p>
          </div>
        </div>
      </div>

      <Section className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ContactForm />
          <ContactInfo />
        </div>
      </Section>
    </Layout>
  );
};

export default Contact;
