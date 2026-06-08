/**
 * Idempotent upsert for the Zoom Automation early work project record.
 * Run: npm run db:upsert-zoom-automation
 */

import { neon } from "@neondatabase/serverless";

const ZOOM_AUTOMATION = {
  title: "Zoom Automation",
  slug: "zoom-automation",
  shortDescription:
    "Earlier build from May 2021 exploring Python-based Zoom workflow automation, scheduled desktop actions, screenshot-based UI control, WhatsApp alerts, and hardware-assisted experimentation during remote learning.",
  fullDescription:
    "Originally created on GitHub in May 2021, Zoom Automation was an early student-era automation experiment built during remote learning. It explored how Python could open scheduled Zoom class links, interact with the desktop interface through screenshot-based automation, post a predefined class message, trigger WhatsApp notifications, and experiment with hardware-assisted workflow control. This project is included as Early Work because it shows curiosity, creativity, and early automation thinking, not because it was a current product or production Zoom integration.",
  projectType: "automation",
  projectPhase: "early_work",
  status: "experiment",
  industry: "education_learning",
  domains: ["workflow_automation", "internal_tools", "iot_hardware"],
  featuredOnHome: false,
  featuredOnAbout: false,
  displayOrder: 300,
  techStack: [
    "Python",
    "PyAutoGUI",
    "schedule",
    "webbrowser",
    "pywhatkit",
    "Arduino-assisted workflow",
    "PyInstaller",
    "Windows desktop automation",
  ],
  problemSolved:
    "During remote learning, repeated online-class setup steps created a narrow personal automation problem: opening scheduled Zoom sessions, interacting with the desktop interface, and triggering simple notifications at the right time.",
  whatItDoes:
    "Runs scheduled Python automation to open Zoom class links, interact with the desktop Zoom/browser interface using screenshot-based automation, post a predefined class message, and optionally send WhatsApp class-start notifications. The project also reflects early experimentation with hardware-assisted workflow control and Windows packaging.",
  parthRole:
    "Built as an early hands-on automation experiment, covering Python scripting, timed workflows, desktop UI automation, screenshot-based control, notification logic, hardware-assisted experimentation, and Windows executable packaging attempts.",
  githubUrl: "https://github.com/ParthGhumatkar/Zoom-automation",
  demoUrl: null,
  videoUrl: "https://www.youtube.com/watch?v=XmH9Zpsx7uQ",
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
    WHERE slug = ${ZOOM_AUTOMATION.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${ZOOM_AUTOMATION.title},
        short_description = ${ZOOM_AUTOMATION.shortDescription},
        full_description = ${ZOOM_AUTOMATION.fullDescription},
        project_type = ${ZOOM_AUTOMATION.projectType},
        project_phase = ${ZOOM_AUTOMATION.projectPhase},
        status = ${ZOOM_AUTOMATION.status},
        industry = ${ZOOM_AUTOMATION.industry},
        domains = ${ZOOM_AUTOMATION.domains}::project_domain[],
        featured_on_home = ${ZOOM_AUTOMATION.featuredOnHome},
        featured_on_about = ${ZOOM_AUTOMATION.featuredOnAbout},
        display_order = ${ZOOM_AUTOMATION.displayOrder},
        tech_stack = ${ZOOM_AUTOMATION.techStack},
        problem_solved = ${ZOOM_AUTOMATION.problemSolved},
        what_it_does = ${ZOOM_AUTOMATION.whatItDoes},
        parth_role = ${ZOOM_AUTOMATION.parthRole},
        github_url = ${ZOOM_AUTOMATION.githubUrl},
        demo_url = ${ZOOM_AUTOMATION.demoUrl},
        video_url = ${ZOOM_AUTOMATION.videoUrl},
        pdf_download_url = ${ZOOM_AUTOMATION.pdfDownloadUrl},
        published = ${ZOOM_AUTOMATION.published},
        hidden = ${ZOOM_AUTOMATION.hidden},
        archived = ${ZOOM_AUTOMATION.archived},
        updated_at = NOW()
      WHERE slug = ${ZOOM_AUTOMATION.slug}
    `;
    console.log(`Updated existing Zoom Automation project (${row.id}).`);
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
        ${ZOOM_AUTOMATION.title},
        ${ZOOM_AUTOMATION.slug},
        ${ZOOM_AUTOMATION.shortDescription},
        ${ZOOM_AUTOMATION.fullDescription},
        ${ZOOM_AUTOMATION.projectType},
        ${ZOOM_AUTOMATION.projectPhase},
        ${ZOOM_AUTOMATION.status},
        ${ZOOM_AUTOMATION.industry},
        ${ZOOM_AUTOMATION.domains}::project_domain[],
        ${ZOOM_AUTOMATION.featuredOnHome},
        ${ZOOM_AUTOMATION.featuredOnAbout},
        ${ZOOM_AUTOMATION.displayOrder},
        ${ZOOM_AUTOMATION.techStack},
        ${ZOOM_AUTOMATION.problemSolved},
        ${ZOOM_AUTOMATION.whatItDoes},
        ${ZOOM_AUTOMATION.parthRole},
        ${ZOOM_AUTOMATION.githubUrl},
        ${ZOOM_AUTOMATION.demoUrl},
        ${ZOOM_AUTOMATION.videoUrl},
        ${ZOOM_AUTOMATION.pdfDownloadUrl},
        ${ZOOM_AUTOMATION.published},
        ${ZOOM_AUTOMATION.hidden},
        ${ZOOM_AUTOMATION.archived}
      )
      RETURNING id, slug
    `;
    console.log(`Inserted Zoom Automation project (${inserted[0]?.id}).`);
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
    WHERE slug = ${ZOOM_AUTOMATION.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
