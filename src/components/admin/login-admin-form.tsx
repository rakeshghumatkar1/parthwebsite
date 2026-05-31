"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  AdminAuthPanel,
  AdminField,
  AdminFormError,
  adminInputClassName,
} from "@/components/admin/admin-auth-panel";
import { loginAdminAction } from "@/lib/admin/actions";
import type { LoginFormState } from "@/lib/admin/form-state";

const initialState: LoginFormState = {};

type LoginAdminFormProps = {
  setupAvailable: boolean;
};

export function LoginAdminForm({ setupAvailable }: LoginAdminFormProps) {
  const [state, formAction, pending] = useActionState(
    loginAdminAction,
    initialState,
  );

  return (
    <AdminAuthPanel
      title="Admin login"
      subtitle="Sign in to manage Parth site content."
    >
      <form action={formAction} className="space-y-4">
        <AdminFormError message={state.errors?.form} />

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
        >
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className={adminInputClassName(Boolean(state.errors?.password))}
            required
          />
        </AdminField>

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-md bg-tb-blue px-4 py-2.5 text-sm font-medium text-white transition hover:bg-tb-blue-hover disabled:opacity-60"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>

        {setupAvailable ? (
          <p className="text-center text-sm text-tb-text-muted">
            Need the first admin account?{" "}
            <Link
              href="/admin/setup"
              className="font-medium text-tb-blue hover:underline"
            >
              Run first-time setup
            </Link>
          </p>
        ) : null}
      </form>
    </AdminAuthPanel>
  );
}
