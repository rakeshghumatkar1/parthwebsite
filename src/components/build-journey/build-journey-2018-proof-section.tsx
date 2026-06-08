import type { ReactNode } from "react";
import { Section } from "@/components/ui/section";
import {
  BUILD_JOURNEY_2018_PROOF,
  BUILD_JOURNEY_2018_SECTION_INTRO,
  BUILD_JOURNEY_CODERETREAT_2018_VIDEO_CAPTION,
  BUILD_JOURNEY_CODERETREAT_2018_VIDEO_URL,
  BUILD_JOURNEY_NELKINDA_MUG_EVIDENCE,
  BUILD_JOURNEY_NELKINDA_TWITTER_EVIDENCE,
} from "@/lib/build-journey-page-content";
import { parseYouTubeUrl } from "@/lib/public/youtube";

const coderetreatEmbed = parseYouTubeUrl(BUILD_JOURNEY_CODERETREAT_2018_VIDEO_URL);

/** Shared evidence media slot height across both milestone cards. */
const EVIDENCE_MEDIA_SLOT_CLASS =
  "h-[340px] min-h-0 w-full sm:h-[360px] lg:h-[410px]";

const MILESTONE_CARD_CLASS =
  "flex min-w-0 flex-col rounded-lg border border-slate-200/90 bg-white p-3.5 shadow-sm ring-1 ring-slate-100 sm:p-4";

const SLOT_FOOTER_CLASS =
  "shrink-0 border-t border-slate-200/70 bg-slate-50/90 px-1.5 py-0.5 text-[9px] leading-[1.2] text-tb-text-muted";

const EVIDENCE_TILE_CLASS =
  "flex h-full min-w-0 flex-col overflow-hidden rounded-md border border-slate-200/80 bg-gradient-to-b from-slate-100/90 to-slate-50/70";

type MilestoneEvidenceCardProps = {
  title: string;
  description: string;
  media: ReactNode;
};

function MilestoneEvidenceCard({
  title,
  description,
  media,
}: MilestoneEvidenceCardProps) {
  return (
    <article className={MILESTONE_CARD_CLASS}>
      <h3 className="text-base font-semibold leading-snug text-tb-text">{title}</h3>
      <p className="mt-1.5 text-sm leading-snug text-tb-text-muted">{description}</p>
      <div className={`mt-2.5 min-w-0 overflow-hidden ${EVIDENCE_MEDIA_SLOT_CLASS}`}>
        {media}
      </div>
    </article>
  );
}

function NelkindaMugEvidenceTile() {
  const evidence = BUILD_JOURNEY_NELKINDA_MUG_EVIDENCE;

  return (
    <figure className={EVIDENCE_TILE_CLASS}>
      <div className="shrink-0 border-b border-slate-200/70 bg-slate-100/80 px-2 py-1.5">
        <p className="text-[10px] font-bold leading-tight tracking-tight text-tb-text sm:text-[11px]">
          {evidence.headline}
        </p>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-1.5 py-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={evidence.src}
          alt={evidence.alt}
          loading="lazy"
          className="max-h-full max-w-full object-contain object-center"
        />
        <a
          href={evidence.src}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-1 right-1 rounded bg-white/90 px-1 py-px text-[8px] font-medium leading-none text-tb-text-muted shadow-sm ring-1 ring-slate-200/80 backdrop-blur-sm hover:text-tb-blue"
        >
          Open full image
        </a>
      </div>

      <div className="shrink-0 border-t border-slate-200/60 bg-slate-100/70 px-2 py-1">
        <p className="text-[9px] font-semibold leading-tight text-tb-text sm:text-[10px]">
          {evidence.label}
        </p>
      </div>

      <figcaption className={SLOT_FOOTER_CLASS}>{evidence.caption}</figcaption>
    </figure>
  );
}

function NelkindaTwitterEvidenceTile() {
  const evidence = BUILD_JOURNEY_NELKINDA_TWITTER_EVIDENCE;

  return (
    <figure className={`${EVIDENCE_TILE_CLASS} from-slate-50/90 to-slate-50/50`}>
      <div className="relative min-h-0 flex-1 overflow-hidden px-1 py-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={evidence.src}
          alt={evidence.alt}
          loading="lazy"
          className="h-full w-full object-contain object-top"
        />
        <a
          href={evidence.src}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-1 right-1 rounded bg-white/90 px-1 py-px text-[8px] font-medium leading-none text-tb-text-muted shadow-sm ring-1 ring-slate-200/80 backdrop-blur-sm hover:text-tb-blue"
        >
          Open full image
        </a>
      </div>
      <figcaption className={SLOT_FOOTER_CLASS}>{evidence.caption}</figcaption>
    </figure>
  );
}

function NelkindaEvidenceMedia() {
  return (
    <div className="grid h-full min-w-0 grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-2">
      <NelkindaMugEvidenceTile />
      <NelkindaTwitterEvidenceTile />
    </div>
  );
}

function CoderetreatEvidenceMedia() {
  if (!coderetreatEmbed) {
    return null;
  }

  return (
    <div className="flex h-full min-w-0 flex-col overflow-hidden rounded-md border border-slate-200 bg-black">
      <div className="min-h-0 flex-1">
        <iframe
          src={coderetreatEmbed.embedUrl}
          title="Global Day of Coderetreat 2018 recognition video on YouTube"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="h-full w-full"
        />
      </div>
      <p className={SLOT_FOOTER_CLASS}>{BUILD_JOURNEY_CODERETREAT_2018_VIDEO_CAPTION}</p>
    </div>
  );
}

export function BuildJourney2018ProofSection() {
  const nelkinda = BUILD_JOURNEY_2018_PROOF[0];
  const coderetreat = BUILD_JOURNEY_2018_PROOF[1];

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
          {BUILD_JOURNEY_2018_SECTION_INTRO}
        </p>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-2 lg:items-start">
        <MilestoneEvidenceCard
          title={nelkinda.title}
          description={nelkinda.description}
          media={<NelkindaEvidenceMedia />}
        />

        <MilestoneEvidenceCard
          title={coderetreat.title}
          description={coderetreat.description}
          media={<CoderetreatEvidenceMedia />}
        />
      </div>
    </Section>
  );
}
