import { CheckCircle2, Clock3, FileCheck2 } from "lucide-react";
import { Section, SectionSubtitle, SectionTitle } from "@/components/ui/section";

interface ServiceEngagementDetailsProps {
  deliverables: string[];
  timeline: string;
}

export const ServiceEngagementDetails = ({
  deliverables,
  timeline,
}: ServiceEngagementDetailsProps) => (
  <Section background="light">
    <SectionTitle centered>What to expect from an engagement</SectionTitle>
    <SectionSubtitle centered>
      Clear scope, clear responsibilities, and no surprises about how the work is
      structured.
    </SectionSubtitle>

    <div className="mx-auto mt-8 grid max-w-5xl gap-6 lg:grid-cols-3">
      <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <FileCheck2 className="mb-4 h-7 w-7 text-blue-600" aria-hidden="true" />
        <h3 className="text-xl font-semibold">What you receive</h3>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-gray-600">
          {deliverables.map((deliverable) => (
            <li key={deliverable} className="flex items-start gap-2">
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              <span>{deliverable}</span>
            </li>
          ))}
        </ul>
      </article>

      <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <Clock3 className="mb-4 h-7 w-7 text-emerald-600" aria-hidden="true" />
        <h3 className="text-xl font-semibold">Timeline and communication</h3>
        <p className="mt-4 text-sm leading-relaxed text-gray-600">{timeline}</p>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          Your written engagement identifies the PTI lead, milestones, and how
          progress and decisions will be communicated.
        </p>
      </article>

      <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <CheckCircle2 className="mb-4 h-7 w-7 text-purple-600" aria-hidden="true" />
        <h3 className="text-xl font-semibold">Roles, fees, and outside advice</h3>
        <p className="mt-4 text-sm leading-relaxed text-gray-600">
          Before work begins, PTI explains its role, who it represents, potential
          conflicts, the scope of work, and fees in writing.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          PTI can coordinate with your attorney, CPA, and lender. Legal, tax, and
          lending advice remains with those licensed professionals.
        </p>
      </article>
    </div>
  </Section>
);
