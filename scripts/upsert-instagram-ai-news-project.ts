/**
 * Idempotent upsert for the Instagram AI News Generator current project record.
 * Run: npm run db:upsert-instagram-ai-news
 */

import { neon } from "@neondatabase/serverless";

const INSTAGRAM_AI_NEWS = {
  title: "Instagram AI News Generator",
  slug: "instagram-ai-news-generator",
  shortDescription:
    "Automated AI-news content pipeline that discovers AI stories, rewrites headlines, generates cinematic backgrounds, and renders branded Instagram-ready post images.",
  fullDescription:
    "Instagram AI News Generator is an automated content pipeline for producing 1080x1350 Instagram news posts about AI. It discovers and filters AI news from multiple APIs, uses GPT-4o to select and rewrite headlines, uses GPT-4o-mini for cinematic scene analysis, generates dramatic DALL-E 3 backgrounds, and composites the final branded image through Puppeteer and Sharp.",
  projectType: "content_media",
  projectPhase: "current_work",
  status: "active",
  industry: "marketing_digital_services",
  domains: [
    "content_automation",
    "seo_marketing_automation",
    "video_media_automation",
    "ai_systems",
  ],
  featuredOnHome: true,
  featuredOnAbout: true,
  displayOrder: 40,
  techStack: [
    "Node.js",
    "GPT-4o",
    "GPT-4o-mini",
    "DALL-E 3",
    "Puppeteer",
    "Sharp",
    "NewsAPI",
    "GNews",
    "NewsData",
  ],
  problemSolved:
    "AI-news content creation can be slow and repetitive because creators need to monitor multiple sources, choose visual stories, rewrite headlines, generate artwork, design posts, and prepare captions manually.",
  whatItDoes:
    "Fetches AI-news headlines, selects visually strong stories, rewrites headlines, generates cinematic image prompts and backgrounds, detects company logos, renders branded Instagram posts, and creates captions with hashtags.",
  parthRole:
    "Built as a hands-on AI content automation project, covering workflow design, Node.js implementation, API integration, prompt logic, post rendering, brand asset handling, and output testing.",
  githubUrl: "https://github.com/ParthGhumatkar/instagram-ai-news",
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
    WHERE slug = ${INSTAGRAM_AI_NEWS.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${INSTAGRAM_AI_NEWS.title},
        short_description = ${INSTAGRAM_AI_NEWS.shortDescription},
        full_description = ${INSTAGRAM_AI_NEWS.fullDescription},
        project_type = ${INSTAGRAM_AI_NEWS.projectType},
        project_phase = ${INSTAGRAM_AI_NEWS.projectPhase},
        status = ${INSTAGRAM_AI_NEWS.status},
        industry = ${INSTAGRAM_AI_NEWS.industry},
        domains = ${INSTAGRAM_AI_NEWS.domains}::project_domain[],
        featured_on_home = ${INSTAGRAM_AI_NEWS.featuredOnHome},
        featured_on_about = ${INSTAGRAM_AI_NEWS.featuredOnAbout},
        display_order = ${INSTAGRAM_AI_NEWS.displayOrder},
        tech_stack = ${INSTAGRAM_AI_NEWS.techStack},
        problem_solved = ${INSTAGRAM_AI_NEWS.problemSolved},
        what_it_does = ${INSTAGRAM_AI_NEWS.whatItDoes},
        parth_role = ${INSTAGRAM_AI_NEWS.parthRole},
        github_url = ${INSTAGRAM_AI_NEWS.githubUrl},
        demo_url = ${INSTAGRAM_AI_NEWS.demoUrl},
        video_url = ${INSTAGRAM_AI_NEWS.videoUrl},
        pdf_download_url = ${INSTAGRAM_AI_NEWS.pdfDownloadUrl},
        published = ${INSTAGRAM_AI_NEWS.published},
        hidden = ${INSTAGRAM_AI_NEWS.hidden},
        archived = ${INSTAGRAM_AI_NEWS.archived},
        updated_at = NOW()
      WHERE slug = ${INSTAGRAM_AI_NEWS.slug}
    `;
    console.log(`Updated existing Instagram AI News Generator project (${row.id}).`);
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
        ${INSTAGRAM_AI_NEWS.title},
        ${INSTAGRAM_AI_NEWS.slug},
        ${INSTAGRAM_AI_NEWS.shortDescription},
        ${INSTAGRAM_AI_NEWS.fullDescription},
        ${INSTAGRAM_AI_NEWS.projectType},
        ${INSTAGRAM_AI_NEWS.projectPhase},
        ${INSTAGRAM_AI_NEWS.status},
        ${INSTAGRAM_AI_NEWS.industry},
        ${INSTAGRAM_AI_NEWS.domains}::project_domain[],
        ${INSTAGRAM_AI_NEWS.featuredOnHome},
        ${INSTAGRAM_AI_NEWS.featuredOnAbout},
        ${INSTAGRAM_AI_NEWS.displayOrder},
        ${INSTAGRAM_AI_NEWS.techStack},
        ${INSTAGRAM_AI_NEWS.problemSolved},
        ${INSTAGRAM_AI_NEWS.whatItDoes},
        ${INSTAGRAM_AI_NEWS.parthRole},
        ${INSTAGRAM_AI_NEWS.githubUrl},
        ${INSTAGRAM_AI_NEWS.demoUrl},
        ${INSTAGRAM_AI_NEWS.videoUrl},
        ${INSTAGRAM_AI_NEWS.pdfDownloadUrl},
        ${INSTAGRAM_AI_NEWS.published},
        ${INSTAGRAM_AI_NEWS.hidden},
        ${INSTAGRAM_AI_NEWS.archived}
      )
      RETURNING id, slug
    `;
    console.log(
      `Inserted Instagram AI News Generator project (${inserted[0]?.id}).`,
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
    WHERE slug = ${INSTAGRAM_AI_NEWS.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
