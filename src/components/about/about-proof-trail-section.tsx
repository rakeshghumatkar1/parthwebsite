import { FeatureCard } from "@/components/ui/feature-card";
import {
  IconAward,
  IconDocumentation,
  IconGitHub,
  IconLayers,
  IconSystems,
} from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ABOUT_WORK_TRAIL } from "@/lib/about-page-content";

const trailIcons = [
  IconSystems,
  IconDocumentation,
  IconGitHub,
  IconLayers,
  IconAward,
];

export function AboutProofTrailSection() {
  return (
    <Section tone="light">
      <SectionHeader
        eyebrow="Work Before Claims"
        title="The story matters. The work matters more."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {ABOUT_WORK_TRAIL.map((item, index) => {
          const Icon = trailIcons[index] ?? IconSystems;
          return (
            <FeatureCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={<Icon className="h-6 w-6" />}
              variant="emphasis"
            />
          );
        })}
      </div>
    </Section>
  );
}
