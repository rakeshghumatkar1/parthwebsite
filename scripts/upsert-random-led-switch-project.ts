/**
 * Idempotent upsert for the Random LED Switch early work project.
 * Run: npm run db:upsert-random-led-switch
 */

import { neon } from "@neondatabase/serverless";

const RANDOM_LED_SWITCH = {
  title: "Random LED Switch — Arduino Logic Experiment",
  slug: "random-led-switch-arduino-logic-experiment",
  shortDescription:
    "A small Arduino learning experiment that used a button press, random number generation, and switch-case logic to turn different LEDs on.",
  fullDescription:
    "Random LED Switch was an early Arduino logic experiment from 2021 focused on button input, random selection, and LED output behavior. The project used a button press to trigger a random number, then used switch-case logic to choose which LED pattern should turn on. This was a small but useful learning project because it connected physical input with program logic and visible hardware output. This project is useful as a small code-backed early learning prototype. It shows the foundation of later automation work: reading a physical input, making a programmatic decision, and controlling hardware output.",
  projectType: "automation",
  projectPhase: "early_work",
  status: "archived",
  industry: "education_learning",
  domains: ["iot_hardware", "workflow_automation", "other"],
  featuredOnHome: false,
  featuredOnAbout: false,
  displayOrder: 330,
  techStack: [
    "Arduino",
    "C++",
    "LED Control",
    "Button Input",
    "Random Number Generation",
    "Switch Case Logic",
    "Serial Output",
    "Digital Output Control",
  ],
  problemSolved:
    "The project was mainly a learning experiment. It explored how Arduino could read a physical button, process the input, generate a random choice, and convert that decision into visible LED behavior.",
  whatItDoes:
    "When the button input changes, the code generates a random number between different cases. Depending on the selected case, it turns on all LEDs or one specific LED such as red, blue, or green. The project also prints the random number and LED state messages through serial output.",
  parthRole:
    "Parth wrote the Arduino logic for button reading, random case selection, serial output, and LED control. The project helped practice basic electronics control, conditional logic, and switch-case programming.",
  githubUrl:
    "https://github.com/ParthGhumatkar/Random-Led-Switches-On/blob/main/RandomLedOn.ino",
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
    WHERE slug = ${RANDOM_LED_SWITCH.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${RANDOM_LED_SWITCH.title},
        short_description = ${RANDOM_LED_SWITCH.shortDescription},
        full_description = ${RANDOM_LED_SWITCH.fullDescription},
        project_type = ${RANDOM_LED_SWITCH.projectType},
        project_phase = ${RANDOM_LED_SWITCH.projectPhase},
        status = ${RANDOM_LED_SWITCH.status},
        industry = ${RANDOM_LED_SWITCH.industry},
        domains = ${RANDOM_LED_SWITCH.domains}::project_domain[],
        featured_on_home = ${RANDOM_LED_SWITCH.featuredOnHome},
        featured_on_about = ${RANDOM_LED_SWITCH.featuredOnAbout},
        display_order = ${RANDOM_LED_SWITCH.displayOrder},
        tech_stack = ${RANDOM_LED_SWITCH.techStack},
        problem_solved = ${RANDOM_LED_SWITCH.problemSolved},
        what_it_does = ${RANDOM_LED_SWITCH.whatItDoes},
        parth_role = ${RANDOM_LED_SWITCH.parthRole},
        github_url = ${RANDOM_LED_SWITCH.githubUrl},
        demo_url = ${RANDOM_LED_SWITCH.demoUrl},
        video_url = ${RANDOM_LED_SWITCH.videoUrl},
        pdf_download_url = ${RANDOM_LED_SWITCH.pdfDownloadUrl},
        published = ${RANDOM_LED_SWITCH.published},
        hidden = ${RANDOM_LED_SWITCH.hidden},
        archived = ${RANDOM_LED_SWITCH.archived},
        updated_at = NOW()
      WHERE slug = ${RANDOM_LED_SWITCH.slug}
    `;
    console.log(`Updated existing Random LED Switch project (${row.id}).`);
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
        ${RANDOM_LED_SWITCH.title},
        ${RANDOM_LED_SWITCH.slug},
        ${RANDOM_LED_SWITCH.shortDescription},
        ${RANDOM_LED_SWITCH.fullDescription},
        ${RANDOM_LED_SWITCH.projectType},
        ${RANDOM_LED_SWITCH.projectPhase},
        ${RANDOM_LED_SWITCH.status},
        ${RANDOM_LED_SWITCH.industry},
        ${RANDOM_LED_SWITCH.domains}::project_domain[],
        ${RANDOM_LED_SWITCH.featuredOnHome},
        ${RANDOM_LED_SWITCH.featuredOnAbout},
        ${RANDOM_LED_SWITCH.displayOrder},
        ${RANDOM_LED_SWITCH.techStack},
        ${RANDOM_LED_SWITCH.problemSolved},
        ${RANDOM_LED_SWITCH.whatItDoes},
        ${RANDOM_LED_SWITCH.parthRole},
        ${RANDOM_LED_SWITCH.githubUrl},
        ${RANDOM_LED_SWITCH.demoUrl},
        ${RANDOM_LED_SWITCH.videoUrl},
        ${RANDOM_LED_SWITCH.pdfDownloadUrl},
        ${RANDOM_LED_SWITCH.published},
        ${RANDOM_LED_SWITCH.hidden},
        ${RANDOM_LED_SWITCH.archived}
      )
      RETURNING id, slug
    `;
    console.log(`Inserted Random LED Switch project (${inserted[0]?.id}).`);
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
    WHERE slug = ${RANDOM_LED_SWITCH.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
