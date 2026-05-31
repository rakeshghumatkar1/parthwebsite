import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { IconAward, IconDocumentation } from "@/components/ui/icons";
import {
  BUILD_JOURNEY_2018_PROOF,
  BUILD_JOURNEY_PROOF_SLUGS,
} from "@/lib/build-journey-page-content";

const proofIcons = [IconDocumentation, IconAward];

type BuildJourney2018ProofSectionProps = {
  proofLinks: Map<string, string>;
};

export function BuildJourney2018ProofSection({
  proofLinks,
}: BuildJourney2018ProofSectionProps) {
  return (
    <Section tone="muted">
      <SectionHeader
        eyebrow="2018 Public Recognition"
        title="Public recognition from the early years"
        description={'In 2018, Parth presented at Nelkinda Tech Kids Meetup as "An Accidental Coder at the age of 11" and was recognized at Global Day of Coderetreat — showing early ability to explain, demonstrate, and learn in public.'}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {BUILD_JOURNEY_2018_PROOF.map((card, index) => {
          const Icon = proofIcons[index] ?? IconAward;
          const slug = BUILD_JOURNEY_PROOF_SLUGS[card.key];
          const link = proofLinks.get(slug);

          return (
            <article
              key={card.key}
              className="flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-7"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-tb-blue/10 text-tb-blue ring-1 ring-tb-blue/20">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold leading-snug text-tb-text">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tb-text-muted sm:text-base">
                    {card.description}
                  </p>
                  {link ? (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-tb-blue hover:underline"
                    >
                      {card.ctaLabel}
                      <span aria-hidden>→</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
