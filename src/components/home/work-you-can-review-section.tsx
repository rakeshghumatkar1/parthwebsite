import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/feature-card";
import {
  IconDocumentation,
  IconGitHub,
  IconPlay,
  IconSystems,
} from "@/components/ui/icons";
import { homeReviewTrailCards } from "@/lib/home-data";

const trailIcons = [IconGitHub, IconPlay, IconDocumentation, IconSystems];

export function WorkYouCanReviewSection() {
  return (
    <Section id="work-you-can-review" tone="light">
      <SectionHeader
        eyebrow="Work You Can Review"
        title="A project trail built through repositories, demos, documentation, and working systems."
        description="This site brings together selected software builds, GitHub repositories, YouTube demos, screenshots, project notes, and technical documents."
      />
      <p className="-mt-6 mb-10 max-w-3xl text-base leading-relaxed text-tb-text-muted sm:text-lg">
        Visitors can review how the work has developed — from early technical
        experiments to current software systems and workflow applications.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {homeReviewTrailCards.map((card, index) => {
          const Icon = trailIcons[index % trailIcons.length];
          return (
            <FeatureCard
              key={card.id}
              title={card.title}
              description={card.description}
              icon={<Icon />}
            />
          );
        })}
      </div>

      <div className="mt-10">
        <Button href="#proof-library" variant="ghost">
          Review Proof Library
        </Button>
      </div>
    </Section>
  );
}
