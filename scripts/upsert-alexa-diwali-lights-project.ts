/**
 * Idempotent upsert for the Alexa-Enabled Diwali Lights early work project.
 * Run: npm run db:upsert-alexa-diwali-lights
 */

import { neon } from "@neondatabase/serverless";

const ALEXA_DIWALI_LIGHTS = {
  title: "Alexa-Enabled Diwali Lights — Tradition Meets Voice Automation",
  slug: "alexa-enabled-diwali-lights-tradition-meets-voice-automation",
  shortDescription:
    "A creative Alexa-based festive automation project where voice commands triggered Happy Diwali wishes and controlled fancy lights.",
  fullDescription:
    "Alexa-Enabled Diwali Lights was a creative early automation project from 2018 where Parth used Alexa voice commands to trigger Diwali wishes and control fancy lights. The video shows a working festive lighting setup responding to voice-controlled automation. This project is valuable because it shows a different dimension of Parth's early building journey: using technology not only to solve practical problems, but also to create joy, celebration, and interactive family experiences. This project brings together tradition, fun, voice control, and hands-on automation. It shows how Parth was applying technology naturally in real life — not only for utility, but also for family, culture, and celebration. This project matters because it shows that Parth's early curiosity was not limited to utility projects. He was also using technology to participate in family traditions and make celebrations more interactive. A young builder should not only be judged by serious projects; creative and festive builds also show imagination, confidence, and the habit of applying technology to real life. This Diwali project reflects that spirit: tradition, fun, voice control, and hands-on automation coming together in one working demo. This project is documented through a working video demo rather than a public code repository.",
  projectType: "automation",
  projectPhase: "early_work",
  status: "archived",
  industry: "smart_home_iot",
  domains: [
    "iot_hardware",
    "home_automation",
    "workflow_automation",
  ],
  featuredOnHome: false,
  featuredOnAbout: false,
  displayOrder: 313,
  techStack: [
    "Alexa",
    "Voice Commands",
    "Fancy Lights",
    "Lighting Automation",
    "Home Automation",
    "Festive Lighting",
    "Smart Home Prototype",
    "Interactive Automation",
    "Cultural Technology",
    "Tradition with Technology",
  ],
  problemSolved:
    "The project explored how voice commands could be used to control decorative lights and create an interactive Diwali greeting experience.",
  whatItDoes:
    "The setup uses Alexa voice commands to trigger a Happy Diwali greeting and start fancy lights. The result is a festive automation flow where a voice interaction controls a physical lighting display.",
  parthRole:
    "Parth created the festive automation concept, connected the Alexa-triggered control flow with the lighting setup, and demonstrated the working result on video.",
  githubUrl: null,
  demoUrl: null,
  videoUrl: "https://www.youtube.com/watch?v=aT_WwbUc6Jw",
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
    WHERE slug = ${ALEXA_DIWALI_LIGHTS.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${ALEXA_DIWALI_LIGHTS.title},
        short_description = ${ALEXA_DIWALI_LIGHTS.shortDescription},
        full_description = ${ALEXA_DIWALI_LIGHTS.fullDescription},
        project_type = ${ALEXA_DIWALI_LIGHTS.projectType},
        project_phase = ${ALEXA_DIWALI_LIGHTS.projectPhase},
        status = ${ALEXA_DIWALI_LIGHTS.status},
        industry = ${ALEXA_DIWALI_LIGHTS.industry},
        domains = ${ALEXA_DIWALI_LIGHTS.domains}::project_domain[],
        featured_on_home = ${ALEXA_DIWALI_LIGHTS.featuredOnHome},
        featured_on_about = ${ALEXA_DIWALI_LIGHTS.featuredOnAbout},
        display_order = ${ALEXA_DIWALI_LIGHTS.displayOrder},
        tech_stack = ${ALEXA_DIWALI_LIGHTS.techStack},
        problem_solved = ${ALEXA_DIWALI_LIGHTS.problemSolved},
        what_it_does = ${ALEXA_DIWALI_LIGHTS.whatItDoes},
        parth_role = ${ALEXA_DIWALI_LIGHTS.parthRole},
        github_url = ${ALEXA_DIWALI_LIGHTS.githubUrl},
        demo_url = ${ALEXA_DIWALI_LIGHTS.demoUrl},
        video_url = ${ALEXA_DIWALI_LIGHTS.videoUrl},
        pdf_download_url = ${ALEXA_DIWALI_LIGHTS.pdfDownloadUrl},
        published = ${ALEXA_DIWALI_LIGHTS.published},
        hidden = ${ALEXA_DIWALI_LIGHTS.hidden},
        archived = ${ALEXA_DIWALI_LIGHTS.archived},
        updated_at = NOW()
      WHERE slug = ${ALEXA_DIWALI_LIGHTS.slug}
    `;
    console.log(
      `Updated existing Alexa Diwali Lights project (${row.id}).`,
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
        ${ALEXA_DIWALI_LIGHTS.title},
        ${ALEXA_DIWALI_LIGHTS.slug},
        ${ALEXA_DIWALI_LIGHTS.shortDescription},
        ${ALEXA_DIWALI_LIGHTS.fullDescription},
        ${ALEXA_DIWALI_LIGHTS.projectType},
        ${ALEXA_DIWALI_LIGHTS.projectPhase},
        ${ALEXA_DIWALI_LIGHTS.status},
        ${ALEXA_DIWALI_LIGHTS.industry},
        ${ALEXA_DIWALI_LIGHTS.domains}::project_domain[],
        ${ALEXA_DIWALI_LIGHTS.featuredOnHome},
        ${ALEXA_DIWALI_LIGHTS.featuredOnAbout},
        ${ALEXA_DIWALI_LIGHTS.displayOrder},
        ${ALEXA_DIWALI_LIGHTS.techStack},
        ${ALEXA_DIWALI_LIGHTS.problemSolved},
        ${ALEXA_DIWALI_LIGHTS.whatItDoes},
        ${ALEXA_DIWALI_LIGHTS.parthRole},
        ${ALEXA_DIWALI_LIGHTS.githubUrl},
        ${ALEXA_DIWALI_LIGHTS.demoUrl},
        ${ALEXA_DIWALI_LIGHTS.videoUrl},
        ${ALEXA_DIWALI_LIGHTS.pdfDownloadUrl},
        ${ALEXA_DIWALI_LIGHTS.published},
        ${ALEXA_DIWALI_LIGHTS.hidden},
        ${ALEXA_DIWALI_LIGHTS.archived}
      )
      RETURNING id, slug
    `;
    console.log(
      `Inserted Alexa Diwali Lights project (${inserted[0]?.id}).`,
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
    WHERE slug = ${ALEXA_DIWALI_LIGHTS.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
