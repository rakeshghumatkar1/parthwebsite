"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import {
  authenticateAdmin,
  createAdminSession,
  createFirstAdminUser,
  getAdminByEmail,
  isSetupAvailable,
} from "./auth";
import type { LoginFormState, SetupFormState } from "./form-state";
import {
  validateConfirmPassword,
  validateEmail,
  validateLoginPassword,
  validateName,
  validatePassword,
} from "./validation";

async function getRequestMeta(): Promise<{
  userAgent?: string;
  ipAddress?: string;
}> {
  const headerList = await headers();
  return {
    userAgent: headerList.get("user-agent") ?? undefined,
    ipAddress:
      headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      headerList.get("x-real-ip") ??
      undefined,
  };
}

export async function setupAdminAction(
  _prevState: SetupFormState,
  formData: FormData,
): Promise<SetupFormState> {
  if (!(await isSetupAvailable())) {
    return {
      errors: { form: "Setup has already been completed." },
    };
  }

  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  const values = { name, email };

  const errors: NonNullable<SetupFormState["errors"]> = {};
  const nameError = validateName(name);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  const confirmError = validateConfirmPassword(password, confirmPassword);

  if (nameError) errors.name = nameError;
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  if (confirmError) errors.confirmPassword = confirmError;

  if (Object.keys(errors).length > 0) {
    return { errors, values };
  }

  const existing = await getAdminByEmail(email);
  if (existing) {
    return {
      errors: { email: "An account with this email already exists." },
      values,
    };
  }

  const result = await createFirstAdminUser({ name, email, password });
  if (!result.ok) {
    return { errors: { form: result.error }, values };
  }

  const created = await getAdminByEmail(email);
  if (!created) {
    return {
      errors: { form: "Account was created but login failed. Try signing in." },
      values,
    };
  }

  await createAdminSession(created.id, await getRequestMeta());
  redirect("/admin");
}

export async function loginAdminAction(
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const values = { email };

  const errors: NonNullable<LoginFormState["errors"]> = {};
  const emailError = validateEmail(email);
  const passwordError = validateLoginPassword(password);

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  if (Object.keys(errors).length > 0) {
    return { errors, values };
  }

  const result = await authenticateAdmin(
    email,
    password,
    await getRequestMeta(),
  );
  if (!result.ok) {
    return {
      errors: {
        form: "Invalid email or password. Check your details and try again.",
      },
      values,
    };
  }

  redirect("/admin");
}
