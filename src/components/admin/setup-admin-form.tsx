"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  AdminAuthPanel,
  AdminField,
  AdminFormError,
  adminInputClassName,
} from "@/components/admin/admin-auth-panel";
import { setupAdminAction } from "@/lib/admin/actions";
import type { SetupFormState } from "@/lib/admin/form-state";
import { MIN_PASSWORD_LENGTH } from "@/lib/admin/constants";

const initialState: SetupFormState = {};

export function SetupAdminForm() {
  const [state, formAction, pending] = useActionState(
    setupAdminAction,
    initialState,
  );

  return (
    <AdminAuthPanel
      title="Create first admin"
      subtitle="This setup works only once. After the first admin account is created, this page is locked."
    >
      <form action={formAction} className="space-y-4">
        <AdminFormError message={state.errors?.form} />

        <AdminField id="name" label="Name" error={state.errors?.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            defaultValue={state.values?.name ?? ""}
            className={adminInputClassName(Boolean(state.errors?.name))}
            required
          />
        </AdminField>

        <AdminField id="email" label="Email" error={state.errors?.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={state.values?.email ?? ""}
            className={adminInputClassName(Boolean(state.errors?.email))}
            required
          />
        </AdminField>

        <AdminField
          id="password"
          label="Password"
          error={state.errors?.password}
          hint={`Minimum ${MIN_PASSWORD_LENGTH} characters.`}
        >
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            className={adminInputClassName(Boolean(state.errors?.password))}
            required
          />
        </AdminField>

        <AdminField
          id="confirmPassword"
          label="Confirm password"
          error={state.errors?.confirmPassword}
        >
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            className={adminInputClassName(
              Boolean(state.errors?.confirmPassword),
            )}
            required
          />
        </AdminField>

        <p className="text-sm text-tb-text-muted">
          Use this account to manage Projects, Proof Library, Videos, Updates,
          and Media later.
        </p>

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-md bg-tb-blue px-4 py-2.5 text-sm font-medium text-white transition hover:bg-tb-blue-hover disabled:opacity-60"
        >
          {pending ? "Creating account…" : "Create admin account"}
        </button>

        <p className="text-center text-sm text-tb-text-muted">
          Already have an account?{" "}
          <Link href="/admin/login" className="font-medium text-tb-blue hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AdminAuthPanel>
  );
}
