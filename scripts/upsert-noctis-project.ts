/**
 * Idempotent upsert for the Noctis current project record.
 * Run: npm run db:upsert-noctis
 */

import { neon } from "@neondatabase/serverless";

const NOCTIS = {
  title: "Noctis",
  slug: "noctis",
  shortDescription:
    "Privacy-first local AI journaling app with a multi-tab editor, offline Ollama companion, image support, and built-in crisis-resource access.",
  fullDescription:
    "Noctis is a Windows desktop journaling application designed around local privacy and offline AI support. It provides a multi-tab notepad, auto-save tracking, find-and-replace, image insertion, custom fonts, and an optional local AI companion powered by Ollama and llama3.2:3b. The app is positioned as supportive journaling software, not clinical advice, and includes mental-health crisis resources for India and global users.",
  projectType: "ai_system",
  projectPhase: "current_work",
  status: "active",
  industry: "personal_productivity",
  domains: ["local_ai", "ai_systems", "knowledge_management"],
  featuredOnHome: true,
  featuredOnAbout: true,
  displayOrder: 20,
  techStack: [
    "Python 3.13",
    "CustomTkinter",
    "Tkinter",
    "Ollama",
    "llama3.2:3b",
    "Pillow",
    "requests",
    "Windows",
  ],
  problemSolved:
    "Many journaling and AI-note tools send user data to cloud systems, which can be uncomfortable for private thoughts, mental-health notes, or sensitive personal writing.",
  whatItDoes:
    "Provides a local desktop journaling workspace with multi-tab notes, image support, find-and-replace, optional offline AI responses, summarization, grammar support, and built-in crisis-resource access.",
  parthRole:
    "Built as a hands-on local AI desktop software project, covering product concept, Python desktop implementation, Ollama integration, privacy-first workflow, editor features, and testing.",
  githubUrl: "https://github.com/ParthGhumatkar/noctis",
  demoUrl: "https://github.com/ParthGhumatkar/noctis/releases",
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
    WHERE slug = ${NOCTIS.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${NOCTIS.title},
        short_description = ${NOCTIS.shortDescription},
        full_description = ${NOCTIS.fullDescription},
        project_type = ${NOCTIS.projectType},
        project_phase = ${NOCTIS.projectPhase},
        status = ${NOCTIS.status},
        industry = ${NOCTIS.industry},
        domains = ${NOCTIS.domains}::project_domain[],
        featured_on_home = ${NOCTIS.featuredOnHome},
        featured_on_about = ${NOCTIS.featuredOnAbout},
        display_order = ${NOCTIS.displayOrder},
        tech_stack = ${NOCTIS.techStack},
        problem_solved = ${NOCTIS.problemSolved},
        what_it_does = ${NOCTIS.whatItDoes},
        parth_role = ${NOCTIS.parthRole},
        github_url = ${NOCTIS.githubUrl},
        demo_url = ${NOCTIS.demoUrl},
        video_url = ${NOCTIS.videoUrl},
        pdf_download_url = ${NOCTIS.pdfDownloadUrl},
        published = ${NOCTIS.published},
        hidden = ${NOCTIS.hidden},
        archived = ${NOCTIS.archived},
        updated_at = NOW()
      WHERE slug = ${NOCTIS.slug}
    `;
    console.log(`Updated existing Noctis project (${row.id}).`);
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
        ${NOCTIS.title},
        ${NOCTIS.slug},
        ${NOCTIS.shortDescription},
        ${NOCTIS.fullDescription},
        ${NOCTIS.projectType},
        ${NOCTIS.projectPhase},
        ${NOCTIS.status},
        ${NOCTIS.industry},
        ${NOCTIS.domains}::project_domain[],
        ${NOCTIS.featuredOnHome},
        ${NOCTIS.featuredOnAbout},
        ${NOCTIS.displayOrder},
        ${NOCTIS.techStack},
        ${NOCTIS.problemSolved},
        ${NOCTIS.whatItDoes},
        ${NOCTIS.parthRole},
        ${NOCTIS.githubUrl},
        ${NOCTIS.demoUrl},
        ${NOCTIS.videoUrl},
        ${NOCTIS.pdfDownloadUrl},
        ${NOCTIS.published},
        ${NOCTIS.hidden},
        ${NOCTIS.archived}
      )
      RETURNING id, slug
    `;
    console.log(`Inserted Noctis project (${inserted[0]?.id}).`);
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
    WHERE slug = ${NOCTIS.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
