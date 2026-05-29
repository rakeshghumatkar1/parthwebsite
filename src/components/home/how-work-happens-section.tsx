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
      <p className="-mt-8 mb-12 max-w-3xl text-base leading-relaxed text-tb-text-muted sm:text-lg">
        From there, the work moves through system thinking, build structure,
        testing, and improvement.
      </p>

      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4 xl:gap-5">
        {processSteps.map((item) => (
          <li
            key={item.step}
            className="flex min-h-[240px] flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:min-h-[260px] sm:p-7"
          >
            <span className="text-3xl font-bold tabular-nums leading-none text-tb-blue/30">
              {item.step}
            </span>
            <h3 className="mt-4 text-base font-semibold leading-snug text-tb-text sm:text-lg">
              {item.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-tb-text-muted sm:text-base">
              {item.description}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-12">
        <Button href="#contact" variant="ghost">
          Discuss a Software Use Case
        </Button>
      </div>
    </Section>
  );
}
