/**
 * Idempotent upsert for the IR Remote LED Control early work project.
 * Run: npm run db:upsert-ir-remote-led-control
 */

import { neon } from "@neondatabase/serverless";

const IR_REMOTE_LED_CONTROL = {
  title: "IR Remote LED Control — Arduino Input-Output Prototype",
  slug: "ir-remote-led-control-arduino-input-output-prototype",
  shortDescription:
    "An early Arduino project that used an IR remote sensor to receive remote-control signals and switch red, blue, and green LEDs on or off.",
  fullDescription:
    "IR Remote LED Control was an early Arduino input-output project from 2018. The project used an IR receiver to decode remote-control signals and map specific hex values to LED actions. It is a small project, but it is useful in the Early Work archive because it shows Parth learning how wireless input signals can control hardware output. This idea later appears in stronger forms through Bluetooth app control, water pump automation, and other hardware-control projects. This project helps show an early step in Parth's automation journey: receiving a wireless command, interpreting it in code, and controlling physical hardware. It is a foundation project that connects naturally to later Bluetooth and mobile-app-controlled builds.",
  projectType: "automation",
  projectPhase: "early_work",
  status: "archived",
  industry: "education_learning",
  domains: [
    "iot_hardware",
    "home_automation",
    "other",
  ],
  featuredOnHome: false,
  featuredOnAbout: false,
  displayOrder: 287,
  techStack: [
    "Arduino",
    "C++",
    "IRremote Library",
    "IR Receiver",
    "Hex Code Mapping",
    "LED Control",
    "Digital Output",
    "Wireless Control",
    "Embedded Systems",
  ],
  problemSolved:
    "The project explored how a remote control could be used to operate physical outputs through Arduino instead of using direct manual switches.",
  whatItDoes:
    "The Arduino sketch receives IR remote signals, checks the decoded hex value, and switches red, blue, and green LEDs on or off based on the command received. It also includes all-on and all-off command behavior.",
  parthRole:
    "Parth wrote the Arduino logic for receiving IR signals, mapping remote hex codes to actions, and controlling LED outputs through Arduino pins.",
  githubUrl:
    "https://github.com/ParthGhumatkar/Ir-sensor/blob/master/irsensor.ino",
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
    WHERE slug = ${IR_REMOTE_LED_CONTROL.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${IR_REMOTE_LED_CONTROL.title},
        short_description = ${IR_REMOTE_LED_CONTROL.shortDescription},
        full_description = ${IR_REMOTE_LED_CONTROL.fullDescription},
        project_type = ${IR_REMOTE_LED_CONTROL.projectType},
        project_phase = ${IR_REMOTE_LED_CONTROL.projectPhase},
        status = ${IR_REMOTE_LED_CONTROL.status},
        industry = ${IR_REMOTE_LED_CONTROL.industry},
        domains = ${IR_REMOTE_LED_CONTROL.domains}::project_domain[],
        featured_on_home = ${IR_REMOTE_LED_CONTROL.featuredOnHome},
        featured_on_about = ${IR_REMOTE_LED_CONTROL.featuredOnAbout},
        display_order = ${IR_REMOTE_LED_CONTROL.displayOrder},
        tech_stack = ${IR_REMOTE_LED_CONTROL.techStack},
        problem_solved = ${IR_REMOTE_LED_CONTROL.problemSolved},
        what_it_does = ${IR_REMOTE_LED_CONTROL.whatItDoes},
        parth_role = ${IR_REMOTE_LED_CONTROL.parthRole},
        github_url = ${IR_REMOTE_LED_CONTROL.githubUrl},
        demo_url = ${IR_REMOTE_LED_CONTROL.demoUrl},
        video_url = ${IR_REMOTE_LED_CONTROL.videoUrl},
        pdf_download_url = ${IR_REMOTE_LED_CONTROL.pdfDownloadUrl},
        published = ${IR_REMOTE_LED_CONTROL.published},
        hidden = ${IR_REMOTE_LED_CONTROL.hidden},
        archived = ${IR_REMOTE_LED_CONTROL.archived},
        updated_at = NOW()
      WHERE slug = ${IR_REMOTE_LED_CONTROL.slug}
    `;
    console.log(
      `Updated existing IR Remote LED Control project (${row.id}).`,
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
        ${IR_REMOTE_LED_CONTROL.title},
        ${IR_REMOTE_LED_CONTROL.slug},
        ${IR_REMOTE_LED_CONTROL.shortDescription},
        ${IR_REMOTE_LED_CONTROL.fullDescription},
        ${IR_REMOTE_LED_CONTROL.projectType},
        ${IR_REMOTE_LED_CONTROL.projectPhase},
        ${IR_REMOTE_LED_CONTROL.status},
        ${IR_REMOTE_LED_CONTROL.industry},
        ${IR_REMOTE_LED_CONTROL.domains}::project_domain[],
        ${IR_REMOTE_LED_CONTROL.featuredOnHome},
        ${IR_REMOTE_LED_CONTROL.featuredOnAbout},
        ${IR_REMOTE_LED_CONTROL.displayOrder},
        ${IR_REMOTE_LED_CONTROL.techStack},
        ${IR_REMOTE_LED_CONTROL.problemSolved},
        ${IR_REMOTE_LED_CONTROL.whatItDoes},
        ${IR_REMOTE_LED_CONTROL.parthRole},
        ${IR_REMOTE_LED_CONTROL.githubUrl},
        ${IR_REMOTE_LED_CONTROL.demoUrl},
        ${IR_REMOTE_LED_CONTROL.videoUrl},
        ${IR_REMOTE_LED_CONTROL.pdfDownloadUrl},
        ${IR_REMOTE_LED_CONTROL.published},
        ${IR_REMOTE_LED_CONTROL.hidden},
        ${IR_REMOTE_LED_CONTROL.archived}
      )
      RETURNING id, slug
    `;
    console.log(
      `Inserted IR Remote LED Control project (${inserted[0]?.id}).`,
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
    WHERE slug = ${IR_REMOTE_LED_CONTROL.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
