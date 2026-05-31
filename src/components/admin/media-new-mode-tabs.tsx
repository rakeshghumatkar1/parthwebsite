"use client";

import Link from "next/link";

type MediaNewModeTabsProps = {
  activeMode: "url" | "upload";
};

export function MediaNewModeTabs({ activeMode }: MediaNewModeTabsProps) {
  const uploadHref = "/admin/media/new?mode=upload";

  return (
    <div className="inline-flex flex-wrap gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
      <Link
        href="/admin/media/new?mode=url"
        className={`rounded-md px-3.5 py-2 text-sm font-medium transition ${
          activeMode === "url"
            ? "bg-white text-tb-blue shadow-sm ring-1 ring-slate-200"
            : "text-tb-text-muted hover:text-tb-text"
        }`}
      >
        Add by URL
      </Link>
      <Link
        href={uploadHref}
        className={`rounded-md px-3.5 py-2 text-sm font-medium transition ${
          activeMode === "upload"
            ? "bg-white text-tb-blue shadow-sm ring-1 ring-slate-200"
            : "text-tb-text-muted hover:text-tb-text"
        }`}
      >
        Upload to Blob
      </Link>
    </div>
  );
}
