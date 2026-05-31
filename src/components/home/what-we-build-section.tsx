import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { FeatureCard } from "@/components/ui/feature-card";
import {
  IconAutomation,
  IconChip,
  IconDatabase,
  IconTerminal,
} from "@/components/ui/icons";
import { homeCapabilityCards } from "@/lib/home-data";

const icons = [IconTerminal, IconChip, IconAutomation, IconDatabase];

export function WhatWeBuildSection() {
  return (
    <Section id="what-we-build" tone="light" dense>
      <SectionHeader
        dense
        eyebrow="What We Build"
        title="Software systems where AI, automation, data, and workflow logic support business work."
        description="The work can start from a business problem, a repeated manual task, a data-handling need, or an internal process that needs better structure."
      />
      <div className="grid auto-rows-fr gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-2.5">
        {homeCapabilityCards.map((item, index) => {
          const Icon = icons[index];
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
