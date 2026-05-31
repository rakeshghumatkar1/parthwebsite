import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "./constants";

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  const base = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  };
  // Clear current path and legacy /admin-scoped cookies from earlier builds.
  cookieStore.set(ADMIN_SESSION_COOKIE, "", { ...base, path: "/" });
  cookieStore.set(ADMIN_SESSION_COOKIE, "", { ...base, path: "/admin" });
}

export async function getSessionTokenFromCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
}
