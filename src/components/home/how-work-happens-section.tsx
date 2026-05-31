import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { processSteps } from "@/lib/home-data";

export function HowWorkHappensSection() {
  return (
    <Section
      id="contact"
      tone="muted"
      dense
      className="border-t border-slate-200/80"
    >
      <SectionHeader
        dense
        eyebrow="How the Work Happens"
        title="Start with the workflow. Then define the system around it."
        description="Useful software work starts with the workflow, then moves through system design, build, testing, and improvement."
      />

      <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5 lg:gap-2">
        {processSteps.map((item) => (
          <li
            key={item.step}
            className="flex min-h-[152px] flex-col rounded-lg border border-slate-200/90 bg-white p-3 shadow-sm sm:min-h-[156px]"
          >
            <span className="text-base font-bold tabular-nums leading-none text-tb-blue/35">
              {item.step}
            </span>
            <h3 className="mt-2 text-sm font-semibold leading-snug text-tb-text">
              {item.title}
            </h3>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-tb-text-muted">
              {item.description}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200/90 bg-white px-4 py-3.5 sm:px-5">
        <p className="text-sm text-tb-text-muted">
          Have a software or AI workflow idea?
        </p>
        <div className="flex flex-wrap gap-3">
          <Button href="#contact" variant="primary" size="lg">
            Discuss a Software Use Case
          </Button>
          <Button href="#selected-project-builds" variant="ghost" size="lg">
            View Current Projects
          </Button>
        </div>
      </div>
    </Section>
  );
}
