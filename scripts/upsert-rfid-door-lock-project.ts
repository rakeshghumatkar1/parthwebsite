/**
 * Idempotent upsert for the RFID Door Lock early work project.
 * Run: npm run db:upsert-rfid-door-lock
 */

import { neon } from "@neondatabase/serverless";

const RFID_DOOR_LOCK = {
  title: "RFID Door Lock — Arduino Access Control Prototype",
  slug: "rfid-door-lock-arduino-access-control-prototype",
  shortDescription:
    "An early Arduino access-control prototype using RFID scanning, keypad password entry, LCD feedback, servo locking, buzzer alerts, and SMS-style command handling.",
  fullDescription:
    "RFID Door Lock was an early Arduino security and access-control prototype from 2021. The project explored how a door-lock system could combine multiple authentication and feedback methods: RFID card scanning, keypad password entry, LCD messages, servo movement, LED indicators, buzzer alerts, and SIM900-based message handling. Compared with smaller Arduino experiments, this project shows a more layered build. It connects sensor input, user authentication, display output, physical locking movement, and remote-style command handling into one prototype. This project is important because it shows Parth moving beyond single-sensor experiments into a more integrated electronics system. It combines identity checking, password logic, physical movement, user feedback, and remote command handling — all useful concepts for later automation and system-building work.",
  projectType: "automation",
  projectPhase: "early_work",
  status: "archived",
  industry: "smart_home_iot",
  domains: [
    "iot_hardware",
    "home_automation",
    "workflow_automation",
    "other",
  ],
  featuredOnHome: false,
  featuredOnAbout: false,
  displayOrder: 325,
  techStack: [
    "Arduino",
    "C++",
    "MFRC522 RFID",
    "Keypad",
    "I2C LCD",
    "Servo Motor",
    "SIM900",
    "SoftwareSerial",
    "SPI",
    "Buzzer",
    "LED Indicators",
    "Embedded Systems",
  ],
  problemSolved:
    "The project explored how a simple door-access system could be automated with electronic authentication. Instead of a manual lock-only setup, the prototype tested RFID-based access, password verification, feedback messages, alert behavior, and servo-controlled door movement.",
  whatItDoes:
    "The system asks the user to scan an RFID tag. If the tag matches, it moves to password entry through a keypad. When the password is accepted, the servo opens the lock position and then returns it back. If access is denied or the password is wrong, the buzzer and feedback logic are triggered. The code also includes SIM900 message handling for open/close commands.",
  parthRole:
    "Parth wrote the Arduino control logic, connected multiple modules, and built the authentication flow across RFID, keypad, LCD, servo, buzzer, LED, and SIM900 components. The project shows early experimentation with multi-step access control and physical automation.",
  githubUrl:
    "https://github.com/ParthGhumatkar/RFID-DOOR-LOCK/blob/main/RFIDDoorLOCK.ino",
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
    WHERE slug = ${RFID_DOOR_LOCK.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${RFID_DOOR_LOCK.title},
        short_description = ${RFID_DOOR_LOCK.shortDescription},
        full_description = ${RFID_DOOR_LOCK.fullDescription},
        project_type = ${RFID_DOOR_LOCK.projectType},
        project_phase = ${RFID_DOOR_LOCK.projectPhase},
        status = ${RFID_DOOR_LOCK.status},
        industry = ${RFID_DOOR_LOCK.industry},
        domains = ${RFID_DOOR_LOCK.domains}::project_domain[],
        featured_on_home = ${RFID_DOOR_LOCK.featuredOnHome},
        featured_on_about = ${RFID_DOOR_LOCK.featuredOnAbout},
        display_order = ${RFID_DOOR_LOCK.displayOrder},
        tech_stack = ${RFID_DOOR_LOCK.techStack},
        problem_solved = ${RFID_DOOR_LOCK.problemSolved},
        what_it_does = ${RFID_DOOR_LOCK.whatItDoes},
        parth_role = ${RFID_DOOR_LOCK.parthRole},
        github_url = ${RFID_DOOR_LOCK.githubUrl},
        demo_url = ${RFID_DOOR_LOCK.demoUrl},
        video_url = ${RFID_DOOR_LOCK.videoUrl},
        pdf_download_url = ${RFID_DOOR_LOCK.pdfDownloadUrl},
        published = ${RFID_DOOR_LOCK.published},
        hidden = ${RFID_DOOR_LOCK.hidden},
        archived = ${RFID_DOOR_LOCK.archived},
        updated_at = NOW()
      WHERE slug = ${RFID_DOOR_LOCK.slug}
    `;
    console.log(`Updated existing RFID Door Lock project (${row.id}).`);
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
        ${RFID_DOOR_LOCK.title},
        ${RFID_DOOR_LOCK.slug},
        ${RFID_DOOR_LOCK.shortDescription},
        ${RFID_DOOR_LOCK.fullDescription},
        ${RFID_DOOR_LOCK.projectType},
        ${RFID_DOOR_LOCK.projectPhase},
        ${RFID_DOOR_LOCK.status},
        ${RFID_DOOR_LOCK.industry},
        ${RFID_DOOR_LOCK.domains}::project_domain[],
        ${RFID_DOOR_LOCK.featuredOnHome},
        ${RFID_DOOR_LOCK.featuredOnAbout},
        ${RFID_DOOR_LOCK.displayOrder},
        ${RFID_DOOR_LOCK.techStack},
        ${RFID_DOOR_LOCK.problemSolved},
        ${RFID_DOOR_LOCK.whatItDoes},
        ${RFID_DOOR_LOCK.parthRole},
        ${RFID_DOOR_LOCK.githubUrl},
        ${RFID_DOOR_LOCK.demoUrl},
        ${RFID_DOOR_LOCK.videoUrl},
        ${RFID_DOOR_LOCK.pdfDownloadUrl},
        ${RFID_DOOR_LOCK.published},
        ${RFID_DOOR_LOCK.hidden},
        ${RFID_DOOR_LOCK.archived}
      )
      RETURNING id, slug
    `;
    console.log(`Inserted RFID Door Lock project (${inserted[0]?.id}).`);
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
    WHERE slug = ${RFID_DOOR_LOCK.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
