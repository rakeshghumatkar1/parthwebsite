import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { processSteps } from "@/lib/home-data";

export function HowWorkHappensSection() {
  return (
    <Section id="how-the-work-happens" tone="muted">
      <SectionHeader
        eyebrow="How the Work Happens"
        title="The work usually starts with a business problem, workflow, or rough idea."
        description="From there, the process moves through system thinking, technical build, testing, and improvement."
      />

      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {processSteps.map((item) => (
          <li
            key={item.step}
            className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-tb-blue">
              {item.step}
            </span>
            <h3 className="mt-2 text-base font-semibold text-tb-text">
              {item.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-tb-text-muted">
              {item.description}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-10">
        <Button href="#contact" variant="ghost">
          Discuss a Software Use Case
        </Button>
      </div>
    </Section>
  );
}
