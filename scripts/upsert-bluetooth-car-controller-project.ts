/**
 * Idempotent upsert for the Bluetooth Car Controller early work project.
 * Run: npm run db:upsert-bluetooth-car-controller
 */

import { neon } from "@neondatabase/serverless";

const BLUETOOTH_CAR_CONTROLLER = {
  title: "Bluetooth Car Controller — Arduino Serial Control Prototype",
  slug: "bluetooth-car-controller-arduino-serial-control-prototype",
  shortDescription:
    "An early Arduino Bluetooth car-control experiment using serial commands to control output pins for basic movement-direction logic.",
  fullDescription:
    "Bluetooth Car Controller was an early Arduino control experiment from 2021 focused on sending movement-style commands through serial/Bluetooth input and translating them into output-pin actions. The project code shows a simple command-driven control pattern: different input values trigger different Arduino output pins, likely representing forward, reverse, turn, and stop-style movement behavior for a small Bluetooth-controlled car or motor-control setup. This project is useful as a code-backed early prototype because it shows Parth moving from simple electronics control toward command-based robotics and movement logic. Even without demo media, the code reflects early learning around Arduino, serial communication, and motor-control patterns.",
  projectType: "automation",
  projectPhase: "early_work",
  status: "archived",
  industry: "education_learning",
  domains: [
    "iot_hardware",
    "robotics_drones",
    "workflow_automation",
    "other",
  ],
  featuredOnHome: false,
  featuredOnAbout: false,
  displayOrder: 320,
  techStack: [
    "Arduino",
    "C++",
    "Bluetooth Control",
    "Serial Communication",
    "Digital Output Control",
    "Motor Direction Logic",
    "Robotics Prototype",
    "Embedded Systems",
  ],
  problemSolved:
    "The project explored how a small vehicle or motor-control system could respond to wireless command input. It helped test the basic idea of converting phone/Bluetooth-style commands into physical output behavior through Arduino.",
  whatItDoes:
    "The Arduino sketch starts serial communication, reads command input, and maps signal values to output pins. Specific command values activate different pin combinations, while a stop command turns all movement-related outputs off.",
  parthRole:
    "Parth wrote the Arduino control logic for command-based movement behavior, tested output-pin control, and used the project as an early experiment in robotics-style control and Bluetooth/serial communication.",
  githubUrl: "https://github.com/ParthGhumatkar/Bluetooth-Car-controller",
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
    WHERE slug = ${BLUETOOTH_CAR_CONTROLLER.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${BLUETOOTH_CAR_CONTROLLER.title},
        short_description = ${BLUETOOTH_CAR_CONTROLLER.shortDescription},
        full_description = ${BLUETOOTH_CAR_CONTROLLER.fullDescription},
        project_type = ${BLUETOOTH_CAR_CONTROLLER.projectType},
        project_phase = ${BLUETOOTH_CAR_CONTROLLER.projectPhase},
        status = ${BLUETOOTH_CAR_CONTROLLER.status},
        industry = ${BLUETOOTH_CAR_CONTROLLER.industry},
        domains = ${BLUETOOTH_CAR_CONTROLLER.domains}::project_domain[],
        featured_on_home = ${BLUETOOTH_CAR_CONTROLLER.featuredOnHome},
        featured_on_about = ${BLUETOOTH_CAR_CONTROLLER.featuredOnAbout},
        display_order = ${BLUETOOTH_CAR_CONTROLLER.displayOrder},
        tech_stack = ${BLUETOOTH_CAR_CONTROLLER.techStack},
        problem_solved = ${BLUETOOTH_CAR_CONTROLLER.problemSolved},
        what_it_does = ${BLUETOOTH_CAR_CONTROLLER.whatItDoes},
        parth_role = ${BLUETOOTH_CAR_CONTROLLER.parthRole},
        github_url = ${BLUETOOTH_CAR_CONTROLLER.githubUrl},
        demo_url = ${BLUETOOTH_CAR_CONTROLLER.demoUrl},
        video_url = ${BLUETOOTH_CAR_CONTROLLER.videoUrl},
        pdf_download_url = ${BLUETOOTH_CAR_CONTROLLER.pdfDownloadUrl},
        published = ${BLUETOOTH_CAR_CONTROLLER.published},
        hidden = ${BLUETOOTH_CAR_CONTROLLER.hidden},
        archived = ${BLUETOOTH_CAR_CONTROLLER.archived},
        updated_at = NOW()
      WHERE slug = ${BLUETOOTH_CAR_CONTROLLER.slug}
    `;
    console.log(`Updated existing Bluetooth Car Controller project (${row.id}).`);
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
        ${BLUETOOTH_CAR_CONTROLLER.title},
        ${BLUETOOTH_CAR_CONTROLLER.slug},
        ${BLUETOOTH_CAR_CONTROLLER.shortDescription},
        ${BLUETOOTH_CAR_CONTROLLER.fullDescription},
        ${BLUETOOTH_CAR_CONTROLLER.projectType},
        ${BLUETOOTH_CAR_CONTROLLER.projectPhase},
        ${BLUETOOTH_CAR_CONTROLLER.status},
        ${BLUETOOTH_CAR_CONTROLLER.industry},
        ${BLUETOOTH_CAR_CONTROLLER.domains}::project_domain[],
        ${BLUETOOTH_CAR_CONTROLLER.featuredOnHome},
        ${BLUETOOTH_CAR_CONTROLLER.featuredOnAbout},
        ${BLUETOOTH_CAR_CONTROLLER.displayOrder},
        ${BLUETOOTH_CAR_CONTROLLER.techStack},
        ${BLUETOOTH_CAR_CONTROLLER.problemSolved},
        ${BLUETOOTH_CAR_CONTROLLER.whatItDoes},
        ${BLUETOOTH_CAR_CONTROLLER.parthRole},
        ${BLUETOOTH_CAR_CONTROLLER.githubUrl},
        ${BLUETOOTH_CAR_CONTROLLER.demoUrl},
        ${BLUETOOTH_CAR_CONTROLLER.videoUrl},
        ${BLUETOOTH_CAR_CONTROLLER.pdfDownloadUrl},
        ${BLUETOOTH_CAR_CONTROLLER.published},
        ${BLUETOOTH_CAR_CONTROLLER.hidden},
        ${BLUETOOTH_CAR_CONTROLLER.archived}
      )
      RETURNING id, slug
    `;
    console.log(
      `Inserted Bluetooth Car Controller project (${inserted[0]?.id}).`,
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
    WHERE slug = ${BLUETOOTH_CAR_CONTROLLER.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
