/**
 * Verify Nonprofit Platform appears in public current-work project queries.
 * Run: node --env-file=.env.local ./node_modules/tsx/dist/cli.mjs scripts/verify-nonprofit-platform-project.ts
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
    SELECT slug, title, project_phase, project_type, status, industry, domains,
           published, hidden, archived, github_url, demo_url, video_url, pdf_download_url
    FROM projects
    WHERE slug = 'nonprofit-platform'
      AND published = true
      AND hidden = false
      AND archived = false
      AND project_phase = 'current_work'
  `;

  if (rows.length === 0) {
    console.error(
      "FAIL: Nonprofit Platform is not publicly visible as current_work.",
    );
    process.exit(1);
  }

  const row = rows[0];

  if (row.project_type !== "data_platform") {
    console.error("FAIL: project_type is not data_platform.");
    process.exit(1);
  }

  if (row.status !== "active") {
    console.error("FAIL: status is not active.");
    process.exit(1);
  }

  if (row.github_url !== "https://github.com/ParthGhumatkar/nonprofit-platform") {
    console.error("FAIL: github_url is incorrect.");
    process.exit(1);
  }

  if (row.demo_url || row.video_url || row.pdf_download_url) {
    console.error("FAIL: demo/video/pdf URLs should be empty.");
    process.exit(1);
  }

  console.log("PASS: Nonprofit Platform is publicly visible on /projects.");
  console.log(JSON.stringify(row, null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
