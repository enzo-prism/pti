import { CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/section";
import { BookMeetingButton } from "@/components/BookMeetingButton";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactChannels } from "@/components/contact/ContactChannels";

const expectations = [
  "A quick, friendly conversation — no obligation",
  "Answers to your biggest questions about practice transitions",
  "Clarity on your options and next steps",
];

const Contact = () => {
  return (
    <>
      <div className="pt-24 md:pt-32 bg-gradient-to-b from-accent to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center pb-10 sm:pb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 animate-fade-in leading-tight">
              Let&apos;s Talk About Your Next Chapter
            </h1>
            <p className="text-base sm:text-lg text-gray-600 animate-fade-in animate-delay-100 max-w-2xl mx-auto leading-relaxed">
              Whether you&apos;re planning to sell, buy, or just exploring your
              options, we&apos;re here to help you make smart, confident
              decisions about your dental practice.
            </p>

            <div className="mt-7 flex flex-col items-center gap-3 animate-fade-in animate-delay-100 sm:mt-8">
              <BookMeetingButton
                location="contact_page_hero"
                className="w-full sm:w-auto"
              />
              <p className="text-xs text-gray-500 sm:text-sm">
                Free 30-minute video call with Dr. Michael Njo — pick a time that
                works for you.
              </p>
            </div>

            <div className="relative mt-8 flex items-center gap-4">
              <span className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Or reach us directly
              </span>
              <span className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="mt-6 text-left animate-fade-in animate-delay-100">
              <ContactChannels />
            </div>

            <div className="mt-6 animate-fade-in animate-delay-100 sm:mt-8">
              <p className="text-sm text-gray-500 sm:text-base">
                No pressure. No sales pitch. Just honest guidance from people who
                know the industry.
              </p>
              <div className="mx-auto mt-5 max-w-md rounded-2xl border border-gray-100 bg-white/70 p-5 text-left shadow-sm sm:max-w-lg">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
                  What You Can Expect
                </p>
                <ul className="space-y-2.5">
                  {expectations.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-gray-700 sm:text-base"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Section background="light" id="contact-form">
        <div className="mx-auto max-w-2xl">
          <ContactForm />
        </div>
      </Section>
    </>
  );
};

export default Contact;
