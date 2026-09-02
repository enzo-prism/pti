import Link from "next/link";
import {
  Section,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { Handshake, FileText, Scale, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { ServiceEngagementDetails } from "@/components/services/ServiceEngagementDetails";

const Partnerships = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-10 pb-12 md:pt-16 md:pb-16 bg-gradient-to-b from-accent to-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 animate-fade-in leading-tight">
              Structure a Dental Partnership With Clear Expectations
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fade-in animate-delay-100 leading-relaxed">
              PTI helps dentists evaluate fit, value the ownership interests,
              define business terms, and prepare each party&apos;s attorney to
              document the arrangement.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Plan the Relationship, Not Just the Ownership Percentage
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              A partnership changes compensation, control, risk, workload, and
              the path to a future exit. Those expectations should be discussed
              before ownership changes.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              PTI helps the prospective partners pressure-test the business
              arrangement, establish a valuation framework, and coordinate with
              independent legal and tax advisors.
            </p>
            <div className="flex justify-center sm:justify-start">
              <Button asChild size="lg">
                <Link href="/contact">Discuss a Practice Partnership</Link>
              </Button>
            </div>
          </div>
          <div className="animate-fade-in animate-delay-100">
            <div className="mx-auto overflow-hidden rounded-lg bg-slate-100 shadow-md md:max-w-md">
              <Image
                src="/lovable-uploads/drnjo-2026/conference-room-meeting.webp"
                alt="Dental professionals discussing a partnership plan"
                width={320}
                height={240}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Process Section */}
      <Section background="light">
        <SectionTitle centered>Our Partnership Process</SectionTitle>
        <SectionSubtitle centered>
          Creating sustainable partnerships built on transparency and equity
        </SectionSubtitle>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Initial Assessment</h3>
            <p className="text-gray-600 leading-relaxed">
              We review practice metrics, each dentist&apos;s goals, proposed
              roles, and known points of tension to assess fit.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-100">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Scale className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Valuation and Structure
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We develop a valuation planning range and compare ownership,
              compensation, governance, and future buy-sell options.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-200">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Handshake className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Attorney Coordination
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We organize the agreed business terms for each party&apos;s
              attorney to review and document. PTI does not draft legal
              agreements.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-300">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Implementation</h3>
            <p className="text-gray-600 leading-relaxed">
              We coordinate the transition workstreams and help the partners
              establish decision, communication, and review rhythms.
            </p>
          </div>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section>
        <SectionTitle centered>Potential Benefits to Plan For</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Financial Benefits
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">
                    Shared Overhead Costs
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Partners may share facility, equipment, and administrative
                    costs when the economics and usage are defined clearly.
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">
                    Increased Production Capacity
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Multiple practitioners may increase facility use and
                    clinical capacity when patient demand supports it.
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Economies of Scale</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Combined purchasing and shared operations can create
                    efficiencies, depending on the practice and agreement.
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Risk Distribution</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Financial responsibility may be distributed, but the
                    agreement should state how risk and capital needs are
                    allocated.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-100">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Lifestyle Benefits
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">
                    Better Work-Life Balance
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Shared clinical responsibilities and coverage may create
                    more scheduling flexibility.
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">
                    Complementary Skill Sets
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Partners can specialize in different clinical areas or
                    aspects of business management.
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">
                    Professional Support
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    A partnership can create regular opportunities for
                    mentorship, collaboration, and shared decisions.
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Succession Planning</h4>
                  <p className="text-gray-600 leading-relaxed">
                    The ownership structure can document a phased retirement and
                    continuity plan.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <ServiceEngagementDetails
        deliverables={[
          "Partner goals, roles, and fit assessment",
          "Valuation, ownership, compensation, and governance framework",
          "Business-term summary and implementation coordination for outside advisors",
        ]}
        timeline="Partnership planning depends on the parties' readiness, the valuation scope, and the legal and tax work required. PTI defines the phases, decision points, and estimated schedule in writing."
      />

      {/* FAQ Section */}
      <Section background="light">
        <SectionTitle centered>Frequently Asked Questions</SectionTitle>

        <div className="max-w-4xl mx-auto mt-8">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem
              value="item-1"
              className="bg-white rounded-lg border border-gray-200"
            >
              <AccordionTrigger className="px-4 sm:px-6 py-4 text-sm sm:text-base md:text-lg font-semibold">
                What are the key elements of a durable dental partnership
                agreement?
              </AccordionTrigger>
              <AccordionContent className="px-4 sm:px-6 pb-4 text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                A strong agreement clearly outlines ownership percentages,
                responsibilities, decision-making processes (governance),
                compensation models, buy-sell provisions, and dispute resolution
                mechanisms.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="bg-white rounded-lg border border-gray-200"
            >
              <AccordionTrigger className="px-4 sm:px-6 py-4 text-sm sm:text-base md:text-lg font-semibold">
                What are common pitfalls to avoid when forming a dental
                partnership?
              </AccordionTrigger>
              <AccordionContent className="px-4 sm:px-6 pb-4 text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                Lack of clear communication, unequal workload or compensation
                without a fair system, poorly defined decision-making processes,
                and inadequate buy-sell agreements are common issues.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="bg-white rounded-lg border border-gray-200"
            >
              <AccordionTrigger className="px-4 sm:px-6 py-4 text-sm sm:text-base md:text-lg font-semibold">
                How do partners handle disagreements or disputes in a dental
                practice?
              </AccordionTrigger>
              <AccordionContent className="px-4 sm:px-6 pb-4 text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                The partnership agreement should outline a process for dispute
                resolution, which may include mediation or arbitration. Open and
                honest communication is crucial.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="bg-white rounded-lg border border-gray-200"
            >
              <AccordionTrigger className="px-4 sm:px-6 py-4 text-sm sm:text-base md:text-lg font-semibold">
                What are the tax implications of forming a dental partnership?
              </AccordionTrigger>
              <AccordionContent className="px-4 sm:px-6 pb-4 text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                Tax treatment depends on the entities, ownership structure,
                compensation, state, and transaction. Each prospective partner
                should obtain advice from a qualified CPA or tax attorney before
                agreeing to the structure.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-5"
              className="bg-white rounded-lg border border-gray-200"
            >
              <AccordionTrigger className="px-4 sm:px-6 py-4 text-sm sm:text-base md:text-lg font-semibold">
                How does a partnership impact practice valuation for future sale
                or transition?
              </AccordionTrigger>
              <AccordionContent className="px-4 sm:px-6 pb-4 text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                The effect depends on profitability, governance, transfer
                restrictions, buyer appeal, and how an ownership interest can be
                valued and sold. The legal documents should define the future
                valuation and transfer process.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="mb-8">
        <Cta
          title="Considering Shared Ownership?"
          description="Start with a confidential conversation about the dentists, the practice, and the business terms that need to align."
          buttonText="Discuss a Practice Partnership"
          buttonUrl="/contact"
        />
      </Section>
    </>
  );
};

export default Partnerships;
