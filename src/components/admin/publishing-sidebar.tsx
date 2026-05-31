import Link from "next/link";
import { AdminFieldHint } from "./admin-form-section";
import { adminActionRailClass, adminBtnPrimaryClass } from "@/lib/admin/admin-ui";
import { FIELD_HINTS } from "@/lib/admin/cms-guidance";

function checkboxClassName() {
  return "mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-tb-blue focus:ring-tb-blue/30";
}

type PublishingSidebarProps = {
  values: {
    published: boolean;
    hidden: boolean;
    archived?: boolean;
    featuredOnHome?: boolean;
    featuredOnAbout?: boolean;
    displayOrder: string;
  };
  errors?: { displayOrder?: string };
  updatedAt?: string;
  pending: boolean;
  submitLabel: string;
  backHref: string;
  backLabel?: string;
  showFeaturedAbout?: boolean;
  showFeaturedHome?: boolean;
  showArchived?: boolean;
  extraNote?: string;
};

export function PublishingSidebar({
  values,
  errors,
  updatedAt,
  pending,
  submitLabel,
  backHref,
  backLabel = "Back to list",
  showFeaturedAbout = true,
  showFeaturedHome = true,
  showArchived = false,
  extraNote,
}: PublishingSidebarProps) {
  return (
    <section className={adminActionRailClass}>
      <div>
        <h2 className="text-sm font-semibold text-tb-text">Publishing</h2>
        <p className="mt-1 text-xs leading-relaxed text-tb-text-muted">
          Controls what appears on public pages. Drafts stay admin-only until
          published and not hidden.
        </p>
        {extraNote ? (
          <p className="mt-2 text-xs text-tb-text-muted">{extraNote}</p>
        ) : null}
      </div>

      <label className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          name="published"
          defaultChecked={values.published}
          className={checkboxClassName()}
        />
        <span>
          <span className="font-medium">Published</span>
          <AdminFieldHint>{FIELD_HINTS.published}</AdminFieldHint>
        </span>
      </label>

      <label className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          name="hidden"
          defaultChecked={values.hidden}
          className={checkboxClassName()}
        />
        <span>
          <span className="font-medium">Hidden</span>
          <AdminFieldHint>{FIELD_HINTS.hidden}</AdminFieldHint>
        </span>
      </label>

      {showArchived ? (
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            name="archived"
            defaultChecked={values.archived}
            className={checkboxClassName()}
          />
          <span>
            <span className="font-medium">Archived</span>
            <AdminFieldHint>{FIELD_HINTS.archived}</AdminFieldHint>
          </span>
        </label>
      ) : null}

      {showFeaturedHome ? (
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            name="featuredOnHome"
            defaultChecked={values.featuredOnHome}
            className={checkboxClassName()}
          />
          <span>
            <span className="font-medium">Featured on Home</span>
            <AdminFieldHint>{FIELD_HINTS.featuredOnHome}</AdminFieldHint>
          </span>
        </label>
      ) : null}

      {showFeaturedAbout ? (
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            name="featuredOnAbout"
            defaultChecked={values.featuredOnAbout}
            className={checkboxClassName()}
          />
          <span>
            <span className="font-medium">Featured on About</span>
            <AdminFieldHint>{FIELD_HINTS.featuredOnAbout}</AdminFieldHint>
          </span>
        </label>
      ) : null}

      <div className="space-y-1">
        <label htmlFor="displayOrder" className="block text-sm font-medium">
          Display order
        </label>
        <input
          id="displayOrder"
          name="displayOrder"
          type="number"
          defaultValue={values.displayOrder}
          className={`block w-full rounded-md border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tb-blue/30 ${
            errors?.displayOrder ? "border-red-400" : "border-slate-200"
          }`}
        />
        <AdminFieldHint>{FIELD_HINTS.displayOrder}</AdminFieldHint>
        {errors?.displayOrder ? (
          <p className="text-sm text-red-600">{errors.displayOrder}</p>
        ) : null}
      </div>

      {updatedAt ? (
        <p className="text-xs text-tb-text-muted">Last updated: {updatedAt}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className={`w-full disabled:opacity-60 ${adminBtnPrimaryClass}`}
      >
        {pending ? "Saving…" : submitLabel}
      </button>
      <Link
        href={backHref}
        className="block text-center text-xs font-medium text-tb-blue hover:underline"
      >
        {backLabel}
      </Link>
    </section>
  );
}

export { checkboxClassName };
