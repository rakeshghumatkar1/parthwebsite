import { and, count, eq, gt } from "drizzle-orm";
import { getDb } from "@/db";
import { adminSessions, adminUsers, type AdminUser } from "@/db/schema/admin-auth";
import { SESSION_MAX_AGE_SECONDS } from "./constants";
import { hashPassword, verifyPassword } from "./password";
import {
  generateSessionToken,
  hashSessionToken,
} from "./session-token";
import {
  clearSessionCookie,
  getSessionTokenFromCookie,
  setSessionCookie,
} from "./session-cookie";

export async function countActiveAdmins(): Promise<number> {
  const db = getDb();
  const [row] = await db
    .select({ value: count() })
    .from(adminUsers)
    .where(eq(adminUsers.isActive, true));
  return row?.value ?? 0;
}

export async function isSetupAvailable(): Promise<boolean> {
  return (await countActiveAdmins()) === 0;
}

export async function getAdminByEmail(
  email: string,
): Promise<AdminUser | undefined> {
  const db = getDb();
  const normalized = email.trim().toLowerCase();
  const [user] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, normalized))
    .limit(1);
  return user;
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const token = await getSessionTokenFromCookie();
  if (!token) {
    return null;
  }

  const db = getDb();
  const tokenHash = hashSessionToken(token);
  const now = new Date();

  const [row] = await db
    .select({ user: adminUsers })
    .from(adminSessions)
    .innerJoin(adminUsers, eq(adminSessions.adminUserId, adminUsers.id))
    .where(
      and(
        eq(adminSessions.sessionTokenHash, tokenHash),
        gt(adminSessions.expiresAt, now),
      ),
    )
    .limit(1);

  if (!row?.user?.isActive) {
    return null;
  }

  return row.user;
}

export async function createAdminSession(
  adminUserId: string,
  meta?: { userAgent?: string; ipAddress?: string },
): Promise<void> {
  const db = getDb();
  const token = generateSessionToken();
  const tokenHash = hashSessionToken(token);
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);

  await db.insert(adminSessions).values({
    adminUserId,
    sessionTokenHash: tokenHash,
    expiresAt,
    userAgent: meta?.userAgent ?? null,
    ipAddress: meta?.ipAddress ?? null,
  });

  await setSessionCookie(token);
}

export async function deleteSessionByToken(token: string): Promise<void> {
  const db = getDb();
  const tokenHash = hashSessionToken(token);
  await db
    .delete(adminSessions)
    .where(eq(adminSessions.sessionTokenHash, tokenHash));
}

export async function logoutCurrentSession(): Promise<void> {
  const token = await getSessionTokenFromCookie();
  if (token) {
    await deleteSessionByToken(token);
  }
  await clearSessionCookie();
}

export async function createFirstAdminUser(input: {
  name: string;
  email: string;
  password: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!(await isSetupAvailable())) {
    return { ok: false, error: "Setup has already been completed." };
  }

  const db = getDb();
  const normalizedEmail = input.email.trim().toLowerCase();
  const existing = await getAdminByEmail(normalizedEmail);
  if (existing) {
    return { ok: false, error: "An account with this email already exists." };
  }

  const passwordHash = await hashPassword(input.password);

  const [created] = await db
    .insert(adminUsers)
    .values({
      name: input.name.trim(),
      email: normalizedEmail,
      passwordHash,
    })
    .returning({ id: adminUsers.id });

  if (!created) {
    return { ok: false, error: "Could not create admin account. Try again." };
  }

  return { ok: true };
}

export async function authenticateAdmin(
  email: string,
  password: string,
  meta?: { userAgent?: string; ipAddress?: string },
): Promise<{ ok: true } | { ok: false }> {
  const user = await getAdminByEmail(email);
  if (!user || !user.isActive) {
    return { ok: false };
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return { ok: false };
  }

  const db = getDb();
  await db
    .update(adminUsers)
    .set({ lastLoginAt: new Date(), updatedAt: new Date() })
    .where(eq(adminUsers.id, user.id));

  await createAdminSession(user.id, meta);
  return { ok: true };
}

export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    throw new Error("Admin session required");
  }
  return admin;
}
