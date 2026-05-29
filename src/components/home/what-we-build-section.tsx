import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { FeatureCard } from "@/components/ui/feature-card";
import { IconLayers, IconWorkflow } from "@/components/ui/icons";
import { homeCapabilityCards } from "@/lib/home-data";

const icons = [IconWorkflow, IconLayers, IconWorkflow, IconLayers, IconWorkflow, IconLayers];

export function WhatWeBuildSection() {
  return (
    <Section id="what-we-build" tone="muted">
      <SectionHeader
        eyebrow="What We Build"
        title="Software systems where AI, automation, data, and workflow logic support business work."
        description="The work can start from a business problem, a repeated manual task, a data-handling need, a content workflow, or an internal process that needs better structure."
      />
      <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {homeCapabilityCards.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <FeatureCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={<Icon className="h-6 w-6" />}
            />
          );
        })}
      </div>
    </Section>
  );
}
