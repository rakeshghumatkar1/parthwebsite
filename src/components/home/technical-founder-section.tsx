import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { IconCheck } from "@/components/ui/icons";
import { founderCredibilityPoints } from "@/lib/home-data";

export function TechnicalFounderSection() {
  return (
    <Section id="technical-founder" tone="light">
      <SectionHeader
        eyebrow="The Technical Founder Layer"
        title="This vertical is built around a technical founder profile with visible proof."
        description="Parth’s journey started with electronics and problem-solving. A football setback led him toward YouTube, robotics, Arduino, C++, IoT, drones, Python, Raspberry, sensors, automation, and public project demos. Over time, that early technical path moved into full software systems, AI-assisted tools, data workflows, and business-facing applications."
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4 text-base leading-relaxed text-tb-text-muted sm:text-lg">
          <p>
            The important point is not only that he started young. The stronger
            point is that he kept building.
          </p>
          <p>
            This vertical is not built around generic AI positioning. It is
            built around a technical founder profile with visible proof.
          </p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {founderCredibilityPoints.map((point) => (
            <li
              key={point}
              className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-tb-text sm:text-base"
            >
              <span className="shrink-0 text-tb-blue" aria-hidden>
                <IconCheck className="h-5 w-5" />
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <Button href="#technical-founder" variant="ghost">
          Read About Parth
        </Button>
      </div>
    </Section>
  );
}
