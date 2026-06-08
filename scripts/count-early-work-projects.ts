/**
 * Count publicly visible early-work projects.
 * Run: node --env-file=.env.local ./node_modules/tsx/dist/cli.mjs scripts/count-early-work-projects.ts
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
    SELECT slug, title, display_order
    FROM projects
    WHERE project_phase = 'early_work'
      AND published = true
      AND hidden = false
      AND archived = false
    ORDER BY display_order, title
  `;

  console.log(`COUNT: ${rows.length}`);
  console.log(JSON.stringify(rows, null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
