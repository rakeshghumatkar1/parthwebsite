import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SoftwareFirstDiagram } from "@/components/home/workflow-diagram";

export function SoftwareFirstSection() {
  return (
    <Section id="software-first" tone="light">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeader
            eyebrow="Software First"
            title="Software First. AI Where It Improves the Workflow."
            description="AI is useful when it supports the system. It can help with analysis, summaries, reports, content, classification, research, decision support, routing, or workflow automation. But the foundation still matters: software structure, data flow, interface design, security, testing, deployment, documentation, and user adoption."
          />
          <p className="text-base leading-relaxed text-tb-text-muted sm:text-lg">
            This is why the focus is not on AI as a slogan. The focus is on
            software systems that can be built, tested, reviewed, improved, and
            used.
          </p>
        </div>
        <SoftwareFirstDiagram />
      </div>
    </Section>
  );
}
