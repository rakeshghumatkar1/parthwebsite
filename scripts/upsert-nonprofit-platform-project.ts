/**
 * Idempotent upsert for the Nonprofit Platform current project record.
 * Run: node --env-file=.env.local ./node_modules/tsx/dist/cli.mjs scripts/upsert-nonprofit-platform-project.ts
 */

import { neon } from "@neondatabase/serverless";

const NONPROFIT_PLATFORM = {
  title: "Nonprofit Platform",
  slug: "nonprofit-platform",
  shortDescription:
    "Data platform that ingests IRS Form 990 nonprofit filings, structures them in PostgreSQL, and generates SEO-friendly static nonprofit profile pages with financial and filing data.",
  fullDescription:
    "Nonprofit Platform is a data-platform project for exploring U.S. nonprofit tax filings through fast, crawlable static pages. It combines a Python ingestion pipeline, PostgreSQL datastore, and Astro static-site generation to process IRS Form 990-series XML filings, extract nonprofit financial and operational data, and generate organisation profile pages with filing history, financial trends, grants, compensation data, and location/category directories.",
  projectType: "data_platform",
  projectPhase: "current_work",
  status: "active",
  industry: "nonprofit_social_impact",
  domains: [
    "data_platforms",
    "reporting_dashboards",
    "seo_marketing_automation",
  ],
  featuredOnHome: true,
  featuredOnAbout: true,
  displayOrder: 15,
  techStack: [
    "Python",
    "PostgreSQL",
    "Astro",
    "Tailwind CSS",
    "Docker Compose",
    "nginx",
    "irsx",
    "lxml",
    "psycopg2",
    "pandas",
    "pyarrow",
    "requests",
    "pg",
    "Chart.js",
    "Alpine.js",
  ],
  problemSolved:
    "Public nonprofit filing data is available but difficult for normal users and search engines to explore because raw IRS Form 990 XML files are not presented as fast, structured, SEO-friendly organisation pages.",
  whatItDoes:
    "Downloads and parses nonprofit tax filing XML data, stores structured organisation and filing records in PostgreSQL, and generates static nonprofit profile and directory pages with financial trends, filing history, grants, compensation, state, city, category, and sitemap structures.",
  parthRole:
    "Built as a hands-on nonprofit data-platform project, covering data pipeline design, Python ingestion scripts, PostgreSQL schema, XML parsing workflow, Astro static-site generation, SEO structure, directory pages, chart/report components, and Docker-based local orchestration.",
  githubUrl: "https://github.com/ParthGhumatkar/nonprofit-platform",
  demoUrl: null,
  videoUrl: null,
  pdfDownloadUrl: null,
  published: true,
  hidden: false,
  archived: false,
} as const;

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("FAIL: DATABASE_URL is not set.");
    process.exit(1);
  }

  const sql = neon(url);

  const existing = await sql`
    SELECT id, slug, title, display_order
    FROM projects
    WHERE slug = ${NONPROFIT_PLATFORM.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${NONPROFIT_PLATFORM.title},
        short_description = ${NONPROFIT_PLATFORM.shortDescription},
        full_description = ${NONPROFIT_PLATFORM.fullDescription},
        project_type = ${NONPROFIT_PLATFORM.projectType},
        project_phase = ${NONPROFIT_PLATFORM.projectPhase},
        status = ${NONPROFIT_PLATFORM.status},
        industry = ${NONPROFIT_PLATFORM.industry},
        domains = ${NONPROFIT_PLATFORM.domains}::project_domain[],
        featured_on_home = ${NONPROFIT_PLATFORM.featuredOnHome},
        featured_on_about = ${NONPROFIT_PLATFORM.featuredOnAbout},
        display_order = ${NONPROFIT_PLATFORM.displayOrder},
        tech_stack = ${NONPROFIT_PLATFORM.techStack},
        problem_solved = ${NONPROFIT_PLATFORM.problemSolved},
        what_it_does = ${NONPROFIT_PLATFORM.whatItDoes},
        parth_role = ${NONPROFIT_PLATFORM.parthRole},
        github_url = ${NONPROFIT_PLATFORM.githubUrl},
        demo_url = ${NONPROFIT_PLATFORM.demoUrl},
        video_url = ${NONPROFIT_PLATFORM.videoUrl},
        pdf_download_url = ${NONPROFIT_PLATFORM.pdfDownloadUrl},
        published = ${NONPROFIT_PLATFORM.published},
        hidden = ${NONPROFIT_PLATFORM.hidden},
        archived = ${NONPROFIT_PLATFORM.archived},
        updated_at = NOW()
      WHERE slug = ${NONPROFIT_PLATFORM.slug}
    `;
    console.log(`Updated existing Nonprofit Platform project (${row.id}).`);
  } else {
    const inserted = await sql`
      INSERT INTO projects (
        title,
        slug,
        short_description,
        full_description,
        project_type,
        project_phase,
        status,
        industry,
        domains,
        featured_on_home,
        featured_on_about,
        display_order,
        tech_stack,
        problem_solved,
        what_it_does,
        parth_role,
        github_url,
        demo_url,
        video_url,
        pdf_download_url,
        published,
        hidden,
        archived
      ) VALUES (
        ${NONPROFIT_PLATFORM.title},
        ${NONPROFIT_PLATFORM.slug},
        ${NONPROFIT_PLATFORM.shortDescription},
        ${NONPROFIT_PLATFORM.fullDescription},
        ${NONPROFIT_PLATFORM.projectType},
        ${NONPROFIT_PLATFORM.projectPhase},
        ${NONPROFIT_PLATFORM.status},
        ${NONPROFIT_PLATFORM.industry},
        ${NONPROFIT_PLATFORM.domains}::project_domain[],
        ${NONPROFIT_PLATFORM.featuredOnHome},
        ${NONPROFIT_PLATFORM.featuredOnAbout},
        ${NONPROFIT_PLATFORM.displayOrder},
        ${NONPROFIT_PLATFORM.techStack},
        ${NONPROFIT_PLATFORM.problemSolved},
        ${NONPROFIT_PLATFORM.whatItDoes},
        ${NONPROFIT_PLATFORM.parthRole},
        ${NONPROFIT_PLATFORM.githubUrl},
        ${NONPROFIT_PLATFORM.demoUrl},
        ${NONPROFIT_PLATFORM.videoUrl},
        ${NONPROFIT_PLATFORM.pdfDownloadUrl},
        ${NONPROFIT_PLATFORM.published},
        ${NONPROFIT_PLATFORM.hidden},
        ${NONPROFIT_PLATFORM.archived}
      )
      RETURNING id, slug
    `;
    console.log(`Inserted Nonprofit Platform project (${inserted[0]?.id}).`);
  }

  const verify = await sql`
    SELECT
      slug,
      title,
      project_phase,
      project_type,
      status,
      industry,
      domains,
      featured_on_home,
      featured_on_about,
      display_order,
      published,
      hidden,
      archived,
      github_url,
      demo_url,
      video_url,
      pdf_download_url
    FROM projects
    WHERE slug = ${NONPROFIT_PLATFORM.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
