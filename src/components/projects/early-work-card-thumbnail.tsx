"use client";

import { useMemo, useState } from "react";
import { IconPlay } from "@/components/ui/icons";
import {
  getEarlyWorkCardImageSources,
  getEarlyWorkFallbackThumbnailLabel,
  hasEarlyWorkVideoDemo,
} from "@/lib/public/early-work-card";
import type { PublicProject } from "@/lib/public/projects";

type EarlyWorkCardThumbnailProps = {
  project: PublicProject;
};

function EarlyWorkFallbackThumbnail({ project }: { project: PublicProject }) {
  const mainLabel = getEarlyWorkFallbackThumbnailLabel(project);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-tb-blue/[0.09] via-slate-50/95 to-tb-cyan/[0.08] px-4 py-5">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(37,99,235,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.12) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_40%,rgba(37,99,235,0.1),transparent)]"
        aria-hidden
      />

      <div
        className="relative mb-2.5 flex h-11 w-11 items-center justify-center rounded-lg border border-tb-blue/20 bg-white/80 shadow-sm ring-1 ring-white/70"
        aria-hidden
      >
        <span className="h-4 w-4 rounded-sm border-2 border-tb-blue/45" />
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-tb-cyan/55 ring-2 ring-white/80" />
        <span className="absolute -bottom-0.5 -left-0.5 h-2 w-2 rounded-full bg-tb-blue/25" />
      </div>

      <p className="relative text-[9px] font-semibold uppercase tracking-[0.16em] text-tb-blue/85">
        Early build
      </p>
      <p className="relative mt-1 text-center text-sm font-semibold leading-snug text-tb-text">
        {mainLabel}
      </p>
      <p className="relative mt-0.5 text-[10px] font-medium text-tb-text-muted">
        Archive item
      </p>
    </div>
  );
}

export function EarlyWorkCardThumbnail({ project }: EarlyWorkCardThumbnailProps) {
  const sources = useMemo(() => getEarlyWorkCardImageSources(project), [project]);
  const [sourceIndex, setSourceIndex] = useState(0);
  const showVideoBadge = hasEarlyWorkVideoDemo(project.videoUrl);
  const currentSrc = sources[sourceIndex];
  const showPlaceholder = !currentSrc || sourceIndex >= sources.length;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-t-xl border-b border-slate-200/70 bg-slate-100">
      {showPlaceholder ? (
        <EarlyWorkFallbackThumbnail project={project} />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentSrc}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
            onError={() => {
              setSourceIndex((index) => index + 1);
            }}
          />
          {showVideoBadge && sourceIndex === 0 ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-2.5 pb-2 pt-6">
              <span className="inline-flex items-center gap-1 rounded-md bg-black/45 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-[1px]">
                <IconPlay className="h-3 w-3" />
                Video demo
              </span>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
