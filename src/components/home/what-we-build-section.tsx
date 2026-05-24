import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { FeatureCard } from "@/components/ui/feature-card";
import { IconLayers, IconWorkflow } from "@/components/ui/icons";
import { whatWeBuildItems } from "@/lib/home-data";

const icons = [IconWorkflow, IconLayers, IconWorkflow, IconLayers, IconWorkflow, IconLayers];

export function WhatWeBuildSection() {
  return (
    <Section id="what-we-build" tone="muted">
      <SectionHeader
        eyebrow="What We Build"
        title="We build software systems where AI, automation, data, and workflow logic support business work."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {whatWeBuildItems.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <FeatureCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={<Icon />}
            />
          );
        })}
      </div>
    </Section>
  );
}
