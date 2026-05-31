import { FeatureCard } from "@/components/ui/feature-card";
import { IconLayers, IconSystems, IconWorkflow } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ABOUT_CURRENT_SYSTEMS } from "@/lib/about-page-content";

const systemIcons = [IconWorkflow, IconLayers, IconSystems];

export function AboutCurrentSystemsSection() {
  return (
    <Section tone="light">
      <SectionHeader
        eyebrow="From Early Experiments to Software Systems"
        title="The foundation was experiments. The impact is in current systems."
        description="The early story explains the foundation. The current proof is in the systems being built now."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ABOUT_CURRENT_SYSTEMS.map((item, index) => {
          const Icon = systemIcons[index % systemIcons.length];
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
