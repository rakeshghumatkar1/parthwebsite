/**
 * Idempotent upsert for the FIFA World Cup HTML school web project.
 * Run: npm run db:upsert-fifa-world-cup-html
 */

import { neon } from "@neondatabase/serverless";

const FIFA_WORLD_CUP_HTML = {
  title: "FIFA World Cup HTML Page — School Web Project",
  slug: "fifa-world-cup-html-school-web-project",
  shortDescription:
    "An early school web project where Parth created a basic HTML page about the FIFA World Cup using headings, images, lists, background styling, and formatted text.",
  fullDescription:
    "FIFA World Cup HTML Page was an early school web project from 2018. The page was built using basic HTML and covered the FIFA World Cup, the 2018 final, past winners, images, headings, and formatted content. This project is useful in the Early Work archive because it shows Parth's early exposure to web page creation before his later Arduino, automation, and Python projects. This project helps show the beginning of Parth's web-building journey. It may be simple, but it adds useful timeline value because it shows early hands-on exposure to HTML and web presentation in 2018.",
  projectType: "content_media",
  projectPhase: "early_work",
  status: "archived",
  industry: "education_learning",
  domains: ["content_automation", "other"],
  featuredOnHome: false,
  featuredOnAbout: false,
  displayOrder: 332,
  techStack: [
    "HTML",
    "Basic Web Design",
    "Images",
    "Lists",
    "Text Formatting",
    "Background Styling",
    "School Project",
    "Web Learning",
  ],
  problemSolved:
    "The project was created as a school assignment to present information about the FIFA World Cup in webpage format instead of only plain text.",
  whatItDoes:
    "The HTML page displays a title, informational sections, a background image, an external image, a list of FIFA World Cup winners, and formatted creator details.",
  parthRole:
    "Parth created the HTML page structure, added styled text, images, background formatting, and content sections as part of his school project.",
  githubUrl:
    "https://github.com/ParthGhumatkar/HTML-code-for-my-school-project/blob/master/FIFA%20WORLD%20Cup.html",
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
    WHERE slug = ${FIFA_WORLD_CUP_HTML.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${FIFA_WORLD_CUP_HTML.title},
        short_description = ${FIFA_WORLD_CUP_HTML.shortDescription},
        full_description = ${FIFA_WORLD_CUP_HTML.fullDescription},
        project_type = ${FIFA_WORLD_CUP_HTML.projectType},
        project_phase = ${FIFA_WORLD_CUP_HTML.projectPhase},
        status = ${FIFA_WORLD_CUP_HTML.status},
        industry = ${FIFA_WORLD_CUP_HTML.industry},
        domains = ${FIFA_WORLD_CUP_HTML.domains}::project_domain[],
        featured_on_home = ${FIFA_WORLD_CUP_HTML.featuredOnHome},
        featured_on_about = ${FIFA_WORLD_CUP_HTML.featuredOnAbout},
        display_order = ${FIFA_WORLD_CUP_HTML.displayOrder},
        tech_stack = ${FIFA_WORLD_CUP_HTML.techStack},
        problem_solved = ${FIFA_WORLD_CUP_HTML.problemSolved},
        what_it_does = ${FIFA_WORLD_CUP_HTML.whatItDoes},
        parth_role = ${FIFA_WORLD_CUP_HTML.parthRole},
        github_url = ${FIFA_WORLD_CUP_HTML.githubUrl},
        demo_url = ${FIFA_WORLD_CUP_HTML.demoUrl},
        video_url = ${FIFA_WORLD_CUP_HTML.videoUrl},
        pdf_download_url = ${FIFA_WORLD_CUP_HTML.pdfDownloadUrl},
        published = ${FIFA_WORLD_CUP_HTML.published},
        hidden = ${FIFA_WORLD_CUP_HTML.hidden},
        archived = ${FIFA_WORLD_CUP_HTML.archived},
        updated_at = NOW()
      WHERE slug = ${FIFA_WORLD_CUP_HTML.slug}
    `;
    console.log(
      `Updated existing FIFA World Cup HTML project (${row.id}).`,
    );
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
        ${FIFA_WORLD_CUP_HTML.title},
        ${FIFA_WORLD_CUP_HTML.slug},
        ${FIFA_WORLD_CUP_HTML.shortDescription},
        ${FIFA_WORLD_CUP_HTML.fullDescription},
        ${FIFA_WORLD_CUP_HTML.projectType},
        ${FIFA_WORLD_CUP_HTML.projectPhase},
        ${FIFA_WORLD_CUP_HTML.status},
        ${FIFA_WORLD_CUP_HTML.industry},
        ${FIFA_WORLD_CUP_HTML.domains}::project_domain[],
        ${FIFA_WORLD_CUP_HTML.featuredOnHome},
        ${FIFA_WORLD_CUP_HTML.featuredOnAbout},
        ${FIFA_WORLD_CUP_HTML.displayOrder},
        ${FIFA_WORLD_CUP_HTML.techStack},
        ${FIFA_WORLD_CUP_HTML.problemSolved},
        ${FIFA_WORLD_CUP_HTML.whatItDoes},
        ${FIFA_WORLD_CUP_HTML.parthRole},
        ${FIFA_WORLD_CUP_HTML.githubUrl},
        ${FIFA_WORLD_CUP_HTML.demoUrl},
        ${FIFA_WORLD_CUP_HTML.videoUrl},
        ${FIFA_WORLD_CUP_HTML.pdfDownloadUrl},
        ${FIFA_WORLD_CUP_HTML.published},
        ${FIFA_WORLD_CUP_HTML.hidden},
        ${FIFA_WORLD_CUP_HTML.archived}
      )
      RETURNING id, slug
    `;
    console.log(
      `Inserted FIFA World Cup HTML project (${inserted[0]?.id}).`,
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
    WHERE slug = ${FIFA_WORLD_CUP_HTML.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
