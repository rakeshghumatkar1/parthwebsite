"use client";

import { useRouter, useSearchParams } from "next/navigation";

const inputClassName =
  "block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tb-blue/30";

type EarlyWorkFiltersProps = {
  basePath?: string;
};

export function EarlyWorkFilters({
  basePath = "/projects/early-work",
}: EarlyWorkFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasSearch = Boolean(searchParams.get("q")?.trim());

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    const q = formData.get("q");
    if (typeof q === "string" && q.trim()) {
      params.set("q", q.trim());
    }
    router.push(`${basePath}${params.size ? `?${params.toString()}` : ""}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3.5 sm:flex-row sm:items-end sm:gap-3"
    >
      <div className="min-w-0 flex-1">
        <label htmlFor="early-work-q" className="mb-1 block text-sm font-medium text-tb-text">
          Search
        </label>
        <input
          id="early-work-q"
          name="q"
          defaultValue={searchParams.get("q") ?? ""}
          placeholder="Title or description"
          className={inputClassName}
        />
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="submit"
          className="rounded-full bg-tb-blue px-5 py-2.5 text-sm font-medium text-white hover:bg-tb-blue-hover"
        >
          Apply
        </button>
        {hasSearch ? (
          <button
            type="button"
            onClick={() => router.push(basePath)}
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-tb-text hover:bg-tb-surface-muted"
          >
            Clear
          </button>
        ) : null}
      </div>
    </form>
  );
}
