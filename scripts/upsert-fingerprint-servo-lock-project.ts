/**
 * Idempotent upsert for the Fingerprint Sensor Servo Lock early work project.
 * Run: npm run db:upsert-fingerprint-servo-lock
 */

import { neon } from "@neondatabase/serverless";

const FINGERPRINT_SERVO_LOCK = {
  title: "Fingerprint Sensor Servo Lock — Arduino Access Prototype",
  slug: "fingerprint-sensor-servo-lock-arduino-access-prototype",
  shortDescription:
    "An early Arduino access-control prototype using a fingerprint sensor to trigger servo movement after a recognized fingerprint match.",
  fullDescription:
    "Fingerprint Sensor Servo Lock was an early Arduino access-control experiment from 2021. The project connected a fingerprint sensor with servo movement, testing how biometric-style input could be used to trigger a physical locking or unlocking action. The code checks fingerprint input, searches for a stored fingerprint match, and moves the servo when a valid fingerprint ID is found. It is a focused prototype that fits Parth's broader early interest in electronics, identity-based access, and physical automation. This project is useful because it shows early exploration of identity-based control. It also connects sensor input, recognition logic, and physical movement — a pattern that later appears in more complex access-control and automation ideas.",
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
  displayOrder: 326,
  techStack: [
    "Arduino",
    "C++",
    "Adafruit Fingerprint Sensor",
    "SoftwareSerial",
    "Servo Motor",
    "Biometric Input",
    "Access Control",
    "Embedded Systems",
    "Physical Automation",
  ],
  problemSolved:
    "The project explored how fingerprint recognition could be connected to a physical access mechanism. Instead of using only a button or manual switch, the system used fingerprint matching as the trigger for servo movement.",
  whatItDoes:
    "The Arduino sketch initializes the fingerprint sensor, reads a fingerprint image, converts it for matching, searches against stored templates, and moves a servo when the fingerprint ID is valid.",
  parthRole:
    "Parth wrote the Arduino control logic, connected fingerprint sensor input with servo output, and tested a simple biometric-access automation flow.",
  githubUrl:
    "https://github.com/ParthGhumatkar/Fingerprint-sensor-servo/blob/main/Fingerprint_sensor___servo.ino",
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
    WHERE slug = ${FINGERPRINT_SERVO_LOCK.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${FINGERPRINT_SERVO_LOCK.title},
        short_description = ${FINGERPRINT_SERVO_LOCK.shortDescription},
        full_description = ${FINGERPRINT_SERVO_LOCK.fullDescription},
        project_type = ${FINGERPRINT_SERVO_LOCK.projectType},
        project_phase = ${FINGERPRINT_SERVO_LOCK.projectPhase},
        status = ${FINGERPRINT_SERVO_LOCK.status},
        industry = ${FINGERPRINT_SERVO_LOCK.industry},
        domains = ${FINGERPRINT_SERVO_LOCK.domains}::project_domain[],
        featured_on_home = ${FINGERPRINT_SERVO_LOCK.featuredOnHome},
        featured_on_about = ${FINGERPRINT_SERVO_LOCK.featuredOnAbout},
        display_order = ${FINGERPRINT_SERVO_LOCK.displayOrder},
        tech_stack = ${FINGERPRINT_SERVO_LOCK.techStack},
        problem_solved = ${FINGERPRINT_SERVO_LOCK.problemSolved},
        what_it_does = ${FINGERPRINT_SERVO_LOCK.whatItDoes},
        parth_role = ${FINGERPRINT_SERVO_LOCK.parthRole},
        github_url = ${FINGERPRINT_SERVO_LOCK.githubUrl},
        demo_url = ${FINGERPRINT_SERVO_LOCK.demoUrl},
        video_url = ${FINGERPRINT_SERVO_LOCK.videoUrl},
        pdf_download_url = ${FINGERPRINT_SERVO_LOCK.pdfDownloadUrl},
        published = ${FINGERPRINT_SERVO_LOCK.published},
        hidden = ${FINGERPRINT_SERVO_LOCK.hidden},
        archived = ${FINGERPRINT_SERVO_LOCK.archived},
        updated_at = NOW()
      WHERE slug = ${FINGERPRINT_SERVO_LOCK.slug}
    `;
    console.log(`Updated existing Fingerprint Servo Lock project (${row.id}).`);
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
        ${FINGERPRINT_SERVO_LOCK.title},
        ${FINGERPRINT_SERVO_LOCK.slug},
        ${FINGERPRINT_SERVO_LOCK.shortDescription},
        ${FINGERPRINT_SERVO_LOCK.fullDescription},
        ${FINGERPRINT_SERVO_LOCK.projectType},
        ${FINGERPRINT_SERVO_LOCK.projectPhase},
        ${FINGERPRINT_SERVO_LOCK.status},
        ${FINGERPRINT_SERVO_LOCK.industry},
        ${FINGERPRINT_SERVO_LOCK.domains}::project_domain[],
        ${FINGERPRINT_SERVO_LOCK.featuredOnHome},
        ${FINGERPRINT_SERVO_LOCK.featuredOnAbout},
        ${FINGERPRINT_SERVO_LOCK.displayOrder},
        ${FINGERPRINT_SERVO_LOCK.techStack},
        ${FINGERPRINT_SERVO_LOCK.problemSolved},
        ${FINGERPRINT_SERVO_LOCK.whatItDoes},
        ${FINGERPRINT_SERVO_LOCK.parthRole},
        ${FINGERPRINT_SERVO_LOCK.githubUrl},
        ${FINGERPRINT_SERVO_LOCK.demoUrl},
        ${FINGERPRINT_SERVO_LOCK.videoUrl},
        ${FINGERPRINT_SERVO_LOCK.pdfDownloadUrl},
        ${FINGERPRINT_SERVO_LOCK.published},
        ${FINGERPRINT_SERVO_LOCK.hidden},
        ${FINGERPRINT_SERVO_LOCK.archived}
      )
      RETURNING id, slug
    `;
    console.log(
      `Inserted Fingerprint Servo Lock project (${inserted[0]?.id}).`,
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
    WHERE slug = ${FINGERPRINT_SERVO_LOCK.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
