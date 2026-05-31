import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { FeatureCard } from "@/components/ui/feature-card";
import {
  IconAutomation,
  IconDashboard,
  IconLayers,
  IconPipeline,
  IconTerminal,
  IconWorkflow,
} from "@/components/ui/icons";
import { homeCapabilityCards } from "@/lib/home-data";

const icons = [
  IconTerminal,
  IconWorkflow,
  IconAutomation,
  IconDashboard,
  IconLayers,
  IconPipeline,
];

export function WhatWeBuildSection() {
  return (
    <Section id="what-we-build" tone="muted" dense>
      <SectionHeader
        dense
        eyebrow="What We Build"
        title="Software systems where AI, automation, data, and workflow logic support business work."
        description="The work can start from a business problem, a repeated manual task, a data-handling need, a content workflow, or an internal process that needs better structure."
      />
      <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {homeCapabilityCards.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <FeatureCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={<Icon className="h-5 w-5" />}
              compact
            />
          );
        })}
      </div>
    </Section>
  );
}
