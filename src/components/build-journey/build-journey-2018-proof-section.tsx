import { Section } from "@/components/ui/section";
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
    <Section tone="light" dense>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-blue">
          2018 Public Recognition
        </p>
        <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-tb-text sm:text-2xl">
          Two public milestones from 2018
        </h2>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-tb-text-muted">
          Presenting at Nelkinda Tech Kids Meetup and participating in Global
          Day of Coderetreat — supporting evidence of early ability to explain,
          demonstrate, and learn in public.
        </p>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        {BUILD_JOURNEY_2018_PROOF.map((card, index) => {
          const Icon = proofIcons[index] ?? IconAward;
          const slug = BUILD_JOURNEY_PROOF_SLUGS[card.key];
          const link = proofLinks.get(slug);

          return (
            <article
              key={card.key}
              className="flex h-full flex-col rounded-lg border border-slate-200/90 bg-white p-3.5 shadow-sm ring-1 ring-slate-100 sm:p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-tb-blue/20 bg-tb-blue/10 text-tb-blue">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold leading-snug text-tb-text">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-tb-text-muted">
                    {card.description}
                  </p>
                  {link ? (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-medium text-tb-blue hover:underline"
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
