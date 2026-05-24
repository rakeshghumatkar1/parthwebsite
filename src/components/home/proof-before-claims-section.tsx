import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { IconCheck } from "@/components/ui/icons";
import { proofSignals } from "@/lib/home-data";

export function ProofBeforeClaimsSection() {
  return (
    <Section id="proof-before-claims" tone="light">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <SectionHeader
            eyebrow="Proof Before Claims"
            title="This site is built around visible work, not abstract AI claims."
            description="Parth started coding and building technology projects around age 11. Since then, his work has moved across electronics, robotics, Arduino, C++, IoT, drones, Python, Raspberry, sensors, automation, GitHub repositories, YouTube demos, and current software systems."
          />
          <p className="text-base leading-relaxed text-tb-text-muted sm:text-lg">
            His credibility is self-built. It does not depend only on a college
            name, formal credential, or job title. It comes from more than a
            decade of building, testing, debugging, documenting, and improving
            technology projects.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-tb-surface-muted p-6 sm:p-8">
          <p className="text-sm font-semibold text-tb-text">Key proof signals</p>
          <ul className="mt-4 space-y-3">
            {proofSignals.map((signal) => (
              <li key={signal} className="flex gap-3 text-sm text-tb-text-muted sm:text-base">
                <span className="mt-0.5 shrink-0 text-tb-blue" aria-hidden>
                  <IconCheck className="h-5 w-5" />
                </span>
                <span>{signal}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="#proof-before-claims" variant="ghost">
              Review Proof Library
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
