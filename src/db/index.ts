import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export type Database = NeonHttpDatabase<typeof schema>;

let cachedDb: Database | null = null;

/**
 * Returns a Drizzle client for Neon. Throws if DATABASE_URL is missing.
 * Do not import this from public pages until CMS connection is explicitly scoped.
 */
export function getDb(): Database {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Configure Neon connection before using the database.",
    );
  }

  if (!cachedDb) {
    const sql = neon(url);
    cachedDb = drizzle(sql, { schema });
  }

  return cachedDb;
}

/** True when DATABASE_URL is configured (no connection attempted). */
export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export { schema };
