/**
 * Idempotent upsert for the Swatantra current project record.
 * Run: npm run db:upsert-swatantra
 */

import { neon } from "@neondatabase/serverless";

const SWATANTRA = {
  title: "Swatantra",
  slug: "swatantra",
  shortDescription:
    "Local service profile and booking-link system with mobile/PIN authentication, shareable provider pages, availability management, and booking requests.",
  fullDescription:
    "Swatantra is a Next.js local-service profile and booking-link system for service providers. It lets providers create shareable profile pages, manage availability across morning, afternoon, and evening slots, receive booking requests, support multiple languages, and upload profile photos through Cloudinary. The system uses a Neon PostgreSQL database, custom JWT-based authentication, and a Tailwind-based interface.",
  projectType: "saas",
  projectPhase: "current_work",
  status: "active",
  industry: "general_business",
  domains: ["internal_tools", "workflow_automation", "lead_generation"],
  featuredOnHome: true,
  featuredOnAbout: true,
  displayOrder: 80,
  techStack: [
    "Next.js 14",
    "Neon PostgreSQL",
    "Custom JWT Auth",
    "Cloudinary",
    "Tailwind CSS",
    "App Router",
  ],
  problemSolved:
    "Local service providers often need a simple public profile and booking-request link without managing a full website, complicated scheduling software, or manual inquiry tracking.",
  whatItDoes:
    "Allows local service providers to create shareable profile pages, authenticate through mobile/PIN, manage availability, receive booking requests, support EN/HI/MR content, and upload profile photos through Cloudinary.",
  parthRole:
    "Built as a hands-on local-service SaaS-style project, covering product concept, Next.js implementation, database schema setup, custom authentication flow, profile-page structure, booking workflow, multilingual support, and image-upload integration.",
  githubUrl: "https://github.com/ParthGhumatkar/Swatantra",
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
    WHERE slug = ${SWATANTRA.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${SWATANTRA.title},
        short_description = ${SWATANTRA.shortDescription},
        full_description = ${SWATANTRA.fullDescription},
        project_type = ${SWATANTRA.projectType},
        project_phase = ${SWATANTRA.projectPhase},
        status = ${SWATANTRA.status},
        industry = ${SWATANTRA.industry},
        domains = ${SWATANTRA.domains}::project_domain[],
        featured_on_home = ${SWATANTRA.featuredOnHome},
        featured_on_about = ${SWATANTRA.featuredOnAbout},
        display_order = ${SWATANTRA.displayOrder},
        tech_stack = ${SWATANTRA.techStack},
        problem_solved = ${SWATANTRA.problemSolved},
        what_it_does = ${SWATANTRA.whatItDoes},
        parth_role = ${SWATANTRA.parthRole},
        github_url = ${SWATANTRA.githubUrl},
        demo_url = ${SWATANTRA.demoUrl},
        video_url = ${SWATANTRA.videoUrl},
        pdf_download_url = ${SWATANTRA.pdfDownloadUrl},
        published = ${SWATANTRA.published},
        hidden = ${SWATANTRA.hidden},
        archived = ${SWATANTRA.archived},
        updated_at = NOW()
      WHERE slug = ${SWATANTRA.slug}
    `;
    console.log(`Updated existing Swatantra project (${row.id}).`);
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
        ${SWATANTRA.title},
        ${SWATANTRA.slug},
        ${SWATANTRA.shortDescription},
        ${SWATANTRA.fullDescription},
        ${SWATANTRA.projectType},
        ${SWATANTRA.projectPhase},
        ${SWATANTRA.status},
        ${SWATANTRA.industry},
        ${SWATANTRA.domains}::project_domain[],
        ${SWATANTRA.featuredOnHome},
        ${SWATANTRA.featuredOnAbout},
        ${SWATANTRA.displayOrder},
        ${SWATANTRA.techStack},
        ${SWATANTRA.problemSolved},
        ${SWATANTRA.whatItDoes},
        ${SWATANTRA.parthRole},
        ${SWATANTRA.githubUrl},
        ${SWATANTRA.demoUrl},
        ${SWATANTRA.videoUrl},
        ${SWATANTRA.pdfDownloadUrl},
        ${SWATANTRA.published},
        ${SWATANTRA.hidden},
        ${SWATANTRA.archived}
      )
      RETURNING id, slug
    `;
    console.log(`Inserted Swatantra project (${inserted[0]?.id}).`);
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
    WHERE slug = ${SWATANTRA.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
