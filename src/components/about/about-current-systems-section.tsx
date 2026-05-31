import { FeatureCard } from "@/components/ui/feature-card";
import {
  IconAutomation,
  IconChip,
  IconDashboard,
  IconDatabase,
  IconPipeline,
  IconTerminal,
  IconWorkflow,
} from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ABOUT_CURRENT_SYSTEMS } from "@/lib/about-page-content";

const systemIcons = [
  IconChip,
  IconTerminal,
  IconWorkflow,
  IconAutomation,
  IconDatabase,
  IconDashboard,
  IconTerminal,
  IconPipeline,
];

export function AboutCurrentSystemsSection() {
  return (
    <Section tone="light" dense>
      <SectionHeader
        dense
        eyebrow="Current Capability"
        title="Systems Parth builds today."
        description="AI-assisted software, automation pipelines, internal tools, and data systems — project-oriented builds you can review on the portfolio."
      />
      <div className="grid auto-rows-fr gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-2.5">
        {ABOUT_CURRENT_SYSTEMS.map((item, index) => {
          const Icon = systemIcons[index] ?? IconTerminal;
          return (
            <FeatureCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={<Icon className="h-3.5 w-3.5" />}
              compact
            />
          );
        })}
      </div>
    </Section>
  );
}
