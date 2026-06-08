/**
 * Idempotent upsert for the SEO Snapshot current project record.
 * Run: npm run db:upsert-seo-snapshot
 */

import { neon } from "@neondatabase/serverless";

const SEO_SNAPSHOT = {
  title: "SEO Snapshot",
  slug: "seo-snapshot",
  shortDescription:
    "AI-assisted SEO advisory report generator with snapshot reports, lead capture, ratings, feature toggles, and a SaaS-style reporting interface.",
  fullDescription:
    "SEO Snapshot is a Next.js SaaS-style SEO advisory report generator for business owners and founders. It includes snapshot and detailed report flows, lead capture, rating submission, feature toggles, database-backed storage patterns, and a mobile-responsive interface. The project includes an AI integration layer that can be configured with OpenAI, while the README notes that report generation is currently mocked unless real AI is enabled through environment settings.",
  projectType: "saas",
  projectPhase: "current_work",
  status: "active",
  industry: "marketing_digital_services",
  domains: [
    "seo_marketing_automation",
    "ai_systems",
    "lead_generation",
    "reporting_dashboards",
  ],
  featuredOnHome: true,
  featuredOnAbout: true,
  displayOrder: 70,
  techStack: [
    "Next.js 14",
    "TypeScript",
    "Tailwind CSS",
    "Neon PostgreSQL",
    "OpenAI integration layer",
    "Vercel",
    "Feature toggles",
  ],
  problemSolved:
    "Small business owners and founders often need clear SEO guidance without heavy technical language, while service providers need a lead-capture/reporting flow that can turn website interest into structured follow-up.",
  whatItDoes:
    "Provides a SaaS-style SEO report workflow with snapshot and detailed report paths, email capture, rating submission, feature toggles, database-backed storage patterns, and an AI provider layer that can be configured for real report generation.",
  parthRole:
    "Built as a hands-on AI-assisted SaaS/reporting project, covering product flow, Next.js implementation, report structure, database setup, lead-capture workflow, feature toggles, and AI-provider integration pattern.",
  githubUrl: "https://github.com/ParthGhumatkar/seoreport",
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
    WHERE slug = ${SEO_SNAPSHOT.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${SEO_SNAPSHOT.title},
        short_description = ${SEO_SNAPSHOT.shortDescription},
        full_description = ${SEO_SNAPSHOT.fullDescription},
        project_type = ${SEO_SNAPSHOT.projectType},
        project_phase = ${SEO_SNAPSHOT.projectPhase},
        status = ${SEO_SNAPSHOT.status},
        industry = ${SEO_SNAPSHOT.industry},
        domains = ${SEO_SNAPSHOT.domains}::project_domain[],
        featured_on_home = ${SEO_SNAPSHOT.featuredOnHome},
        featured_on_about = ${SEO_SNAPSHOT.featuredOnAbout},
        display_order = ${SEO_SNAPSHOT.displayOrder},
        tech_stack = ${SEO_SNAPSHOT.techStack},
        problem_solved = ${SEO_SNAPSHOT.problemSolved},
        what_it_does = ${SEO_SNAPSHOT.whatItDoes},
        parth_role = ${SEO_SNAPSHOT.parthRole},
        github_url = ${SEO_SNAPSHOT.githubUrl},
        demo_url = ${SEO_SNAPSHOT.demoUrl},
        video_url = ${SEO_SNAPSHOT.videoUrl},
        pdf_download_url = ${SEO_SNAPSHOT.pdfDownloadUrl},
        published = ${SEO_SNAPSHOT.published},
        hidden = ${SEO_SNAPSHOT.hidden},
        archived = ${SEO_SNAPSHOT.archived},
        updated_at = NOW()
      WHERE slug = ${SEO_SNAPSHOT.slug}
    `;
    console.log(`Updated existing SEO Snapshot project (${row.id}).`);
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
        ${SEO_SNAPSHOT.title},
        ${SEO_SNAPSHOT.slug},
        ${SEO_SNAPSHOT.shortDescription},
        ${SEO_SNAPSHOT.fullDescription},
        ${SEO_SNAPSHOT.projectType},
        ${SEO_SNAPSHOT.projectPhase},
        ${SEO_SNAPSHOT.status},
        ${SEO_SNAPSHOT.industry},
        ${SEO_SNAPSHOT.domains}::project_domain[],
        ${SEO_SNAPSHOT.featuredOnHome},
        ${SEO_SNAPSHOT.featuredOnAbout},
        ${SEO_SNAPSHOT.displayOrder},
        ${SEO_SNAPSHOT.techStack},
        ${SEO_SNAPSHOT.problemSolved},
        ${SEO_SNAPSHOT.whatItDoes},
        ${SEO_SNAPSHOT.parthRole},
        ${SEO_SNAPSHOT.githubUrl},
        ${SEO_SNAPSHOT.demoUrl},
        ${SEO_SNAPSHOT.videoUrl},
        ${SEO_SNAPSHOT.pdfDownloadUrl},
        ${SEO_SNAPSHOT.published},
        ${SEO_SNAPSHOT.hidden},
        ${SEO_SNAPSHOT.archived}
      )
      RETURNING id, slug
    `;
    console.log(`Inserted SEO Snapshot project (${inserted[0]?.id}).`);
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
    WHERE slug = ${SEO_SNAPSHOT.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
