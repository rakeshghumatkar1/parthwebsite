import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/feature-card";
import {
  IconBranch,
  IconChip,
  IconDocumentation,
  IconPlay,
} from "@/components/ui/icons";
import { homeReviewTrailCards } from "@/lib/home-data";

const trailIcons = [IconBranch, IconPlay, IconDocumentation, IconChip];

export function WorkYouCanReviewSection() {
  return (
    <Section id="work-you-can-review" tone="light" dense>
      <SectionHeader
        dense
        eyebrow="Work You Can Review"
        title="A project trail built through repositories, demos, documentation, and working systems."
        description="This site brings together selected software builds, GitHub repositories, YouTube demos, screenshots, project notes, and technical documents."
      />
      <p className="-mt-5 mb-8 max-w-3xl text-sm leading-relaxed text-tb-text-muted sm:text-base">
        Visitors can review how the work has developed — from early technical
        experiments to current software systems and workflow applications.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {homeReviewTrailCards.map((card, index) => {
          const Icon = trailIcons[index % trailIcons.length];
          return (
            <FeatureCard
              key={card.id}
              title={card.title}
              description={card.description}
              icon={<Icon className="h-5 w-5" />}
              variant="emphasis"
              compact
            />
          );
        })}
      </div>

      <div className="mt-8">
        <Button href="#proof-library" variant="ghost">
          Review Proof Library
        </Button>
      </div>
    </Section>
  );
}
