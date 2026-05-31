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
    <Section tone="light">
      <SectionHeader
        eyebrow="2018 Public Proof"
        title="The ability was visible early."
        description={`Parth's early journey is not a story created later for marketing. In 2018, he presented at Nelkinda Tech Kids Meetup as "An Accidental Coder at the age of 11." The presentation covered electronic components, robotics, Arduino, C++, drone-making, IoT, Python, internet-led learning, problem-solving, Alexa Home Automation, RFID attendance, and drone work.`}
      />
      <p className="-mt-6 mb-10 max-w-3xl text-base leading-relaxed text-tb-text-muted sm:text-lg">
        He was not only learning privately. He was presenting, explaining, and
        demonstrating.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        {BUILD_JOURNEY_2018_PROOF.map((card, index) => {
          const Icon = proofIcons[index] ?? IconAward;
          const slug = BUILD_JOURNEY_PROOF_SLUGS[card.key];
          const link = proofLinks.get(slug);

          return (
            <article
              key={card.key}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-100 lg:flex-row"
            >
              <div className="flex items-center justify-center border-b border-slate-200/80 bg-gradient-to-br from-tb-surface-muted to-white px-6 py-10 lg:w-2/5 lg:border-b-0 lg:border-r">
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-tb-blue/10 text-tb-blue ring-1 ring-tb-blue/20">
                    <Icon className="h-7 w-7" />
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wide text-tb-text-muted">
                    Early proof
                  </p>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="text-lg font-semibold leading-snug text-tb-text sm:text-xl">
                  {card.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-tb-text-muted sm:text-base">
                  {card.description}
                </p>
                {link ? (
                  <div className="mt-6">
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-tb-blue hover:underline"
                    >
                      {card.ctaLabel}
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
