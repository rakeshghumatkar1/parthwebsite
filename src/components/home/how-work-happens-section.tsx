import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { processSteps } from "@/lib/home-data";

export function HowWorkHappensSection() {
  return (
    <Section id="how-the-work-happens" tone="muted">
      <SectionHeader
        eyebrow="How the Work Happens"
        title="Start with the workflow. Then define the system around it."
        description="Most useful software work starts with a clear view of the workflow: what the business is trying to handle, what is currently manual or unclear, what data is involved, and where AI or automation can support the process."
      />
      <p className="-mt-6 mb-10 max-w-3xl text-base leading-relaxed text-tb-text-muted sm:text-lg">
        From there, the work moves through system thinking, build structure,
        testing, and improvement.
      </p>

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
