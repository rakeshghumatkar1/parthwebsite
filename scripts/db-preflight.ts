/**
 * DB preflight — checks DATABASE_URL and basic Neon connectivity.
 * Run: npm run db:preflight
 * Does not print connection strings or secrets.
 */

import { neon } from "@neondatabase/serverless";

async function main() {
  const url = process.env.DATABASE_URL;

  if (!url) {
    console.error("FAIL: DATABASE_URL is not set.");
    console.error("Set DATABASE_URL in .env.local (dev) or Vercel project settings.");
    process.exit(1);
  }

  const unpooled = process.env.DATABASE_URL_UNPOOLED;
  console.log("DATABASE_URL: configured");
  console.log(
    `DATABASE_URL_UNPOOLED: ${unpooled ? "configured" : "not set (migrations may use DATABASE_URL)"}`,
  );

  try {
    const sql = neon(url);
    await sql`SELECT 1 AS ok`;
    console.log("Connection: OK");
  } catch {
    console.error("FAIL: Could not connect to the database.");
    process.exit(1);
  }

  try {
    const sql = neon(url);
    const tables = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name IN (
          'projects',
          'proof_items',
          'videos',
          'milestones',
          'updates',
          'media',
          'page_sections',
          'admin_users',
          'admin_sessions'
        )
      ORDER BY table_name
    `;

    if (tables.length === 0) {
      console.log("CMS tables: none found (run npm run db:migrate after first deploy)");
    } else {
      console.log(`CMS tables found: ${tables.map((r) => r.table_name).join(", ")}`);
    }
  } catch {
    console.warn("Could not inspect table list (connection works).");
  }

  console.log("Preflight: passed");
}

main();
