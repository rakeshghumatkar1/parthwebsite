/**
 * Idempotent upsert for the Water Level Monitor early work project.
 * Run: npm run db:upsert-water-level-monitor
 */

import { neon } from "@neondatabase/serverless";

const LEGACY_WATER_LEVEL_SLUG =
  "water-level-monitor-jsn-sr04t-sensor-prototype";

const JSN_SR04T_GITHUB_URL =
  "https://github.com/ParthGhumatkar/Water-level-project-with-JSN-SR-04T-sensor/blob/main/JSN_SR-04T_sensor.ino";

const WATER_LEVEL_MONITOR = {
  title: "Water Level Monitor — Ultrasonic Sensor Automation Prototype",
  slug: "water-level-monitor-ultrasonic-sensor-automation-prototype",
  shortDescription:
    "An early Arduino water-level monitoring prototype using ultrasonic distance sensing, LCD output, and relay/LED control logic, with both HC-SR04 and JSN-SR04T sensor versions.",
  fullDescription:
    "Water Level Monitor was an early Arduino automation prototype from 2021 focused on measuring liquid level or distance using ultrasonic sensor setups. The project appears in two early variations: one using an HC-SR04-style sonar sensor and another using a JSN-SR04T-style ultrasonic sensor. Both versions follow the same core pattern: measure distance, display the reading, and trigger relay/LED output based on a threshold. Additional JSN-SR04T code version: " +
    JSN_SR04T_GITHUB_URL +
    ". This project is useful because it moves from simple sensor reading to a control decision. It shows early thinking around monitoring systems: measure a physical condition, display the result, and trigger a response.",
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
  displayOrder: 316,
  techStack: [
    "Arduino",
    "C++",
    "HC-SR04 Sensor",
    "JSN-SR04T Sensor",
    "Ultrasonic Sensor",
    "I2C LCD",
    "Relay",
    "LED Indicator",
    "Distance Measurement",
    "Threshold Logic",
    "Embedded Systems",
  ],
  problemSolved:
    "The project explored how a water-level or distance-monitoring task could be automated. Instead of manually checking the level, the system could measure distance, display it, and trigger a control response when the reading crossed a defined threshold.",
  whatItDoes:
    "The Arduino sketches send a trigger pulse, read echo duration, convert the value into centimeters, display the distance on an I2C LCD, and switch LED/relay output depending on whether the measured distance crosses the threshold.",
  parthRole:
    "Parth wrote Arduino control logic for ultrasonic distance sensing, LCD display output, and threshold-based LED/relay control. The project demonstrates early sensor automation and physical output control.",
  githubUrl:
    "https://github.com/ParthGhumatkar/Sonar-water-level-project-with-HC-SR04/blob/main/Sonar_water_project.ino",
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
    WHERE slug = ${WATER_LEVEL_MONITOR.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${WATER_LEVEL_MONITOR.title},
        short_description = ${WATER_LEVEL_MONITOR.shortDescription},
        full_description = ${WATER_LEVEL_MONITOR.fullDescription},
        project_type = ${WATER_LEVEL_MONITOR.projectType},
        project_phase = ${WATER_LEVEL_MONITOR.projectPhase},
        status = ${WATER_LEVEL_MONITOR.status},
        industry = ${WATER_LEVEL_MONITOR.industry},
        domains = ${WATER_LEVEL_MONITOR.domains}::project_domain[],
        featured_on_home = ${WATER_LEVEL_MONITOR.featuredOnHome},
        featured_on_about = ${WATER_LEVEL_MONITOR.featuredOnAbout},
        display_order = ${WATER_LEVEL_MONITOR.displayOrder},
        tech_stack = ${WATER_LEVEL_MONITOR.techStack},
        problem_solved = ${WATER_LEVEL_MONITOR.problemSolved},
        what_it_does = ${WATER_LEVEL_MONITOR.whatItDoes},
        parth_role = ${WATER_LEVEL_MONITOR.parthRole},
        github_url = ${WATER_LEVEL_MONITOR.githubUrl},
        demo_url = ${WATER_LEVEL_MONITOR.demoUrl},
        video_url = ${WATER_LEVEL_MONITOR.videoUrl},
        pdf_download_url = ${WATER_LEVEL_MONITOR.pdfDownloadUrl},
        published = ${WATER_LEVEL_MONITOR.published},
        hidden = ${WATER_LEVEL_MONITOR.hidden},
        archived = ${WATER_LEVEL_MONITOR.archived},
        updated_at = NOW()
      WHERE slug = ${WATER_LEVEL_MONITOR.slug}
    `;
    console.log(`Updated existing Water Level Monitor project (${row.id}).`);
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
        ${WATER_LEVEL_MONITOR.title},
        ${WATER_LEVEL_MONITOR.slug},
        ${WATER_LEVEL_MONITOR.shortDescription},
        ${WATER_LEVEL_MONITOR.fullDescription},
        ${WATER_LEVEL_MONITOR.projectType},
        ${WATER_LEVEL_MONITOR.projectPhase},
        ${WATER_LEVEL_MONITOR.status},
        ${WATER_LEVEL_MONITOR.industry},
        ${WATER_LEVEL_MONITOR.domains}::project_domain[],
        ${WATER_LEVEL_MONITOR.featuredOnHome},
        ${WATER_LEVEL_MONITOR.featuredOnAbout},
        ${WATER_LEVEL_MONITOR.displayOrder},
        ${WATER_LEVEL_MONITOR.techStack},
        ${WATER_LEVEL_MONITOR.problemSolved},
        ${WATER_LEVEL_MONITOR.whatItDoes},
        ${WATER_LEVEL_MONITOR.parthRole},
        ${WATER_LEVEL_MONITOR.githubUrl},
        ${WATER_LEVEL_MONITOR.demoUrl},
        ${WATER_LEVEL_MONITOR.videoUrl},
        ${WATER_LEVEL_MONITOR.pdfDownloadUrl},
        ${WATER_LEVEL_MONITOR.published},
        ${WATER_LEVEL_MONITOR.hidden},
        ${WATER_LEVEL_MONITOR.archived}
      )
      RETURNING id, slug
    `;
    console.log(`Inserted Water Level Monitor project (${inserted[0]?.id}).`);
  }

  const hidden = await sql`
    UPDATE projects
    SET hidden = true, updated_at = NOW()
    WHERE slug = ${LEGACY_WATER_LEVEL_SLUG}
    RETURNING slug
  `;
  if (hidden.length > 0) {
    console.log(`Hidden legacy water level slug: ${LEGACY_WATER_LEVEL_SLUG}`);
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
    WHERE slug = ${WATER_LEVEL_MONITOR.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
