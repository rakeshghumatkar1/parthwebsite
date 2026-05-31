"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PROOF_TYPE_LABELS } from "@/lib/public/proof";

const inputClassName =
  "block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tb-blue/30";

type ProjectOption = { id: string; title: string };

type ProofFiltersProps = {
  projectOptions: ProjectOption[];
};

export function ProofFilters({ projectOptions }: ProofFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      if (typeof value === "string" && value.trim()) {
        params.set(key, value.trim());
      }
    }
    router.push(`/proof${params.size ? `?${params.toString()}` : ""}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <div>
        <label htmlFor="q" className="mb-1 block text-sm font-medium text-tb-text">
          Search
        </label>
        <input
          id="q"
          name="q"
          defaultValue={searchParams.get("q") ?? ""}
          placeholder="Title or description"
          className={inputClassName}
        />
      </div>
      <div>
        <label
          htmlFor="proofType"
          className="mb-1 block text-sm font-medium text-tb-text"
        >
          Proof type
        </label>
        <select
          id="proofType"
          name="proofType"
          defaultValue={searchParams.get("proofType") ?? ""}
          className={inputClassName}
        >
          <option value="">All types</option>
          {Object.entries(PROOF_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="relatedProjectId"
          className="mb-1 block text-sm font-medium text-tb-text"
        >
          Related project
        </label>
        <select
          id="relatedProjectId"
          name="relatedProjectId"
          defaultValue={searchParams.get("relatedProjectId") ?? ""}
          className={inputClassName}
        >
          <option value="">All projects</option>
          {projectOptions.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-end gap-2">
        <button
          type="submit"
          className="rounded-full bg-tb-blue px-5 py-2.5 text-sm font-medium text-white hover:bg-tb-blue-hover"
        >
          Apply
        </button>
        <button
          type="button"
          onClick={() => router.push("/proof")}
          className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-tb-text hover:bg-tb-surface-muted"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
