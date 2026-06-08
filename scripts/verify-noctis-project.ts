/**
 * Verify Noctis appears in public current-work project queries.
 * Run: node --env-file=.env.local ./node_modules/tsx/dist/cli.mjs scripts/verify-noctis-project.ts
 */

import { neon } from "@neondatabase/serverless";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("FAIL: DATABASE_URL is not set.");
    process.exit(1);
  }

  const sql = neon(url);
  const rows = await sql`
    SELECT slug, title, project_phase, published, hidden, archived
    FROM projects
    WHERE slug = 'noctis'
      AND published = true
      AND hidden = false
      AND archived = false
      AND project_phase = 'current_work'
  `;

  if (rows.length === 0) {
    console.error("FAIL: Noctis is not publicly visible as current_work.");
    process.exit(1);
  }

  console.log("PASS: Noctis is publicly visible on /projects.");
  console.log(JSON.stringify(rows[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
