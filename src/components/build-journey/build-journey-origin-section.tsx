import Link from "next/link";
import { StepChain } from "@/components/build-journey/step-chain";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { IconArrowRight } from "@/components/ui/icons";
import {
  BUILD_JOURNEY_ORIGIN_CHAIN,
  BUILD_JOURNEY_STRUCTURED_EXPOSURE_ANCHOR,
} from "@/lib/build-journey-page-content";

export function BuildJourneyOriginSection() {
  return (
    <Section tone="light">
      <SectionHeader
        eyebrow="Where the Journey Started"
        title="Football stopped. Curiosity did not."
      />
      <div className="max-w-3xl space-y-4 text-base leading-relaxed text-tb-text-muted sm:text-lg">
        <p>
          Football was one of Parth&apos;s early interests. A knee problem stopped
          him from continuing with football the way he wanted. While his friends
          were playing and going for tournaments, he had to stay away from the
          playground.
        </p>
        <p>YouTube became a way to pass time.</p>
        <p>
          One day, he came across a video about sharpening a pencil with a motor.
          That small video triggered his curiosity about electronics. It showed him
          that technology could move, control, respond, and solve small real-world
          problems.
        </p>
        <p>
          He wanted to build something like that himself. When the materials were
          not easy to find, the next step became a robotics class in Pune.
        </p>
      </div>

      <div className="mt-10">
        <StepChain steps={BUILD_JOURNEY_ORIGIN_CHAIN} />
      </div>

      <p className="mt-10">
        <Link
          href={`#${BUILD_JOURNEY_STRUCTURED_EXPOSURE_ANCHOR}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-tb-blue hover:underline sm:text-base"
        >
          Continue to Early Builder Stack
          <IconArrowRight className="h-4 w-4 rotate-90" />
        </Link>
      </p>
    </Section>
  );
}
