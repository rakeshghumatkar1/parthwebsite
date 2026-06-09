"use client";

import { useMemo, useState } from "react";
import { IconPlay } from "@/components/ui/icons";
import {
  getEarlyWorkCardImageSources,
  hasEarlyWorkVideoDemo,
} from "@/lib/public/early-work-card";
import type { PublicProject } from "@/lib/public/projects";

type EarlyWorkCardThumbnailProps = {
  project: PublicProject;
};

function ThumbnailPlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-white">
      <span className="text-[11px] font-medium uppercase tracking-wide text-tb-text-muted/80">
        Early build
      </span>
    </div>
  );
}

export function EarlyWorkCardThumbnail({ project }: EarlyWorkCardThumbnailProps) {
  const sources = useMemo(() => getEarlyWorkCardImageSources(project), [project]);
  const [sourceIndex, setSourceIndex] = useState(0);
  const showVideoBadge = hasEarlyWorkVideoDemo(project.videoUrl);
  const currentSrc = sources[sourceIndex];
  const showPlaceholder = !currentSrc;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-slate-100">
      {showPlaceholder ? (
        <ThumbnailPlaceholder />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentSrc}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
            onError={() => {
              setSourceIndex((index) => {
                const next = index + 1;
                return next < sources.length ? next : sources.length;
              });
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
