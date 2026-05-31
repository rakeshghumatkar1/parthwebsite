"use client";

import Link from "next/link";

type MediaNewModeTabsProps = {
  activeMode: "url" | "upload";
};

export function MediaNewModeTabs({ activeMode }: MediaNewModeTabsProps) {
  const uploadHref = "/admin/media/new?mode=upload";

  return (
    <div className="flex flex-wrap gap-2 border-b border-tb-navy-border pb-4">
      <Link
        href="/admin/media/new?mode=url"
        className={`rounded-md px-4 py-2 text-sm font-medium ${
          activeMode === "url"
            ? "bg-tb-blue text-white"
            : "border border-tb-navy-border text-tb-text hover:bg-tb-surface-muted"
        }`}
      >
        Add by URL
      </Link>
      <Link
        href={uploadHref}
        className={`rounded-md px-4 py-2 text-sm font-medium ${
          activeMode === "upload"
            ? "bg-tb-blue text-white"
            : "border border-tb-navy-border text-tb-text hover:bg-tb-surface-muted"
        }`}
      >
        Upload to Blob
      </Link>
    </div>
  );
}
