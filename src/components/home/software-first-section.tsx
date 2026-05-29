import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SoftwareFirstDiagram } from "@/components/home/workflow-diagram";

export function SoftwareFirstSection() {
  return (
    <Section id="software-first" tone="light">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionHeader
            eyebrow="Software First"
            title="AI works best when the surrounding system is clear."
            description="AI can support analysis, summaries, classification, routing, research, content creation, reporting, and workflow automation."
            className="mb-8 sm:mb-10"
          />
          <div className="space-y-5 text-base leading-relaxed text-tb-text-muted sm:text-lg">
            <p>
              But the surrounding system still matters: software structure, data
              flow, interface design, permissions, testing, documentation,
              deployment, and user adoption.
            </p>
            <p>
              The focus here is not AI as a slogan. The focus is on software
              systems that can be built, reviewed, improved, and used.
            </p>
          </div>
        </div>
        <SoftwareFirstDiagram />
      </div>
    </Section>
  );
}
