/**
 * Verify Zoom Automation appears in public early-work project queries.
 * Run: node --env-file=.env.local ./node_modules/tsx/dist/cli.mjs scripts/verify-zoom-automation-project.ts
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
    SELECT slug, title, project_phase, status, published, hidden, archived,
           featured_on_home, featured_on_about, github_url, video_url
    FROM projects
    WHERE slug = 'zoom-automation'
      AND published = true
      AND hidden = false
      AND archived = false
      AND project_phase = 'early_work'
  `;

  if (rows.length === 0) {
    console.error("FAIL: Zoom Automation is not publicly visible as early_work.");
    process.exit(1);
  }

  const row = rows[0];
  if (row.status !== "experiment") {
    console.error(`FAIL: status is ${row.status}, expected experiment.`);
    process.exit(1);
  }
  if (row.featured_on_home || row.featured_on_about) {
    console.error("FAIL: Zoom Automation must not be featured on home or about.");
    process.exit(1);
  }
  if (row.github_url !== "https://github.com/ParthGhumatkar/Zoom-automation") {
    console.error("FAIL: github_url mismatch.");
    process.exit(1);
  }
  if (row.video_url !== "https://www.youtube.com/watch?v=XmH9Zpsx7uQ") {
    console.error("FAIL: video_url mismatch.");
    process.exit(1);
  }

  console.log("PASS: Zoom Automation is publicly visible on /projects/early-work.");
  console.log(JSON.stringify(row, null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
