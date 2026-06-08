/**
 * Idempotent upsert for the Shorts CLI Pipeline current project record.
 * Run: npm run db:upsert-shorts-cli-pipeline
 */

import { neon } from "@neondatabase/serverless";

const SHORTS_CLI_PIPELINE = {
  title: "Shorts CLI Pipeline",
  slug: "shorts-cli-pipeline",
  shortDescription:
    "Terminal-based YouTube Shorts production pipeline that generates scripts, voiceovers, AI scenes, synced captions, and vertical MP4 videos.",
  fullDescription:
    "Shorts CLI Pipeline is a terminal-based content automation system for creating vertical YouTube Shorts. It turns a one-line fact into script options, supports script selection, generates ElevenLabs voiceover, creates AI scene images with GPT-4 and DALL-E 3, syncs captions with Whisper, and renders a 720x1280 H.264 MP4 through bundled FFmpeg. The pipeline is designed as a modular CLI workflow where each step produces an artifact consumed by the next step.",
  projectType: "content_media",
  projectPhase: "current_work",
  status: "active",
  industry: "marketing_digital_services",
  domains: [
    "content_automation",
    "video_media_automation",
    "ai_systems",
  ],
  featuredOnHome: true,
  featuredOnAbout: true,
  displayOrder: 60,
  techStack: [
    "Node.js",
    "FFmpeg",
    "FFprobe",
    "OpenAI GPT-4",
    "DALL-E 3",
    "Whisper",
    "ElevenLabs",
    "fluent-ffmpeg",
  ],
  problemSolved:
    "Short-form video creation can involve repetitive manual steps: script writing, voiceover generation, image creation, caption timing, clip stitching, and final video rendering.",
  whatItDoes:
    "Runs a modular CLI pipeline that generates script options, lets the user choose a script, creates voiceover, generates AI scenes, synchronizes captions, and renders a vertical YouTube Shorts MP4.",
  parthRole:
    "Built as a hands-on content automation project, covering CLI workflow design, Node.js implementation, AI script generation, voiceover handling, image-generation flow, caption syncing, FFmpeg rendering, and error-handling improvements.",
  githubUrl: "https://github.com/ParthGhumatkar/shorts-cli-pipeline",
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
    WHERE slug = ${SHORTS_CLI_PIPELINE.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${SHORTS_CLI_PIPELINE.title},
        short_description = ${SHORTS_CLI_PIPELINE.shortDescription},
        full_description = ${SHORTS_CLI_PIPELINE.fullDescription},
        project_type = ${SHORTS_CLI_PIPELINE.projectType},
        project_phase = ${SHORTS_CLI_PIPELINE.projectPhase},
        status = ${SHORTS_CLI_PIPELINE.status},
        industry = ${SHORTS_CLI_PIPELINE.industry},
        domains = ${SHORTS_CLI_PIPELINE.domains}::project_domain[],
        featured_on_home = ${SHORTS_CLI_PIPELINE.featuredOnHome},
        featured_on_about = ${SHORTS_CLI_PIPELINE.featuredOnAbout},
        display_order = ${SHORTS_CLI_PIPELINE.displayOrder},
        tech_stack = ${SHORTS_CLI_PIPELINE.techStack},
        problem_solved = ${SHORTS_CLI_PIPELINE.problemSolved},
        what_it_does = ${SHORTS_CLI_PIPELINE.whatItDoes},
        parth_role = ${SHORTS_CLI_PIPELINE.parthRole},
        github_url = ${SHORTS_CLI_PIPELINE.githubUrl},
        demo_url = ${SHORTS_CLI_PIPELINE.demoUrl},
        video_url = ${SHORTS_CLI_PIPELINE.videoUrl},
        pdf_download_url = ${SHORTS_CLI_PIPELINE.pdfDownloadUrl},
        published = ${SHORTS_CLI_PIPELINE.published},
        hidden = ${SHORTS_CLI_PIPELINE.hidden},
        archived = ${SHORTS_CLI_PIPELINE.archived},
        updated_at = NOW()
      WHERE slug = ${SHORTS_CLI_PIPELINE.slug}
    `;
    console.log(`Updated existing Shorts CLI Pipeline project (${row.id}).`);
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
        ${SHORTS_CLI_PIPELINE.title},
        ${SHORTS_CLI_PIPELINE.slug},
        ${SHORTS_CLI_PIPELINE.shortDescription},
        ${SHORTS_CLI_PIPELINE.fullDescription},
        ${SHORTS_CLI_PIPELINE.projectType},
        ${SHORTS_CLI_PIPELINE.projectPhase},
        ${SHORTS_CLI_PIPELINE.status},
        ${SHORTS_CLI_PIPELINE.industry},
        ${SHORTS_CLI_PIPELINE.domains}::project_domain[],
        ${SHORTS_CLI_PIPELINE.featuredOnHome},
        ${SHORTS_CLI_PIPELINE.featuredOnAbout},
        ${SHORTS_CLI_PIPELINE.displayOrder},
        ${SHORTS_CLI_PIPELINE.techStack},
        ${SHORTS_CLI_PIPELINE.problemSolved},
        ${SHORTS_CLI_PIPELINE.whatItDoes},
        ${SHORTS_CLI_PIPELINE.parthRole},
        ${SHORTS_CLI_PIPELINE.githubUrl},
        ${SHORTS_CLI_PIPELINE.demoUrl},
        ${SHORTS_CLI_PIPELINE.videoUrl},
        ${SHORTS_CLI_PIPELINE.pdfDownloadUrl},
        ${SHORTS_CLI_PIPELINE.published},
        ${SHORTS_CLI_PIPELINE.hidden},
        ${SHORTS_CLI_PIPELINE.archived}
      )
      RETURNING id, slug
    `;
    console.log(
      `Inserted Shorts CLI Pipeline project (${inserted[0]?.id}).`,
    );
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
    WHERE slug = ${SHORTS_CLI_PIPELINE.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
