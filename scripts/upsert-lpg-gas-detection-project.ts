/**
 * Idempotent upsert for the LPG Gas Detection early work project.
 * Run: npm run db:upsert-lpg-gas-detection
 */

import { neon } from "@neondatabase/serverless";

const LPG_GAS_DETECTION = {
  title: "LPG Gas Detection Using MQ2 Sensor — Arduino Safety Prototype",
  slug: "lpg-gas-detection-mq2-sensor-arduino-safety-prototype",
  shortDescription:
    "An early Arduino safety prototype using an MQ2 gas sensor to read LPG/gas levels and trigger buzzer-style alert behavior.",
  fullDescription:
    "LPG Gas Detection Using MQ2 Sensor was an early Arduino safety experiment from 2021 focused on detecting gas sensor readings and using a buzzer as an alert output. In the video demo, Parth explains the board/code setup and shows how the project was built around the MQ2 sensor. The GitHub code reads analog sensor values from the MQ2 sensor, prints readings to the serial monitor, and connects the logic to buzzer output behavior. This was not just a theory exercise. It was part of Parth's early pattern of taking real-world ideas — safety, sensing, alerts, automation — and implementing them through Arduino/C code and physical electronics. This project is useful because it shows Parth experimenting with a practical safety use case, not only decorative electronics. It adds another sensor domain to his early work: gas detection, analog readings, threshold logic, and alert systems.",
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
  displayOrder: 312,
  techStack: [
    "Arduino",
    "C++",
    "MQ2 Sensor",
    "Analog Sensor Reading",
    "Buzzer",
    "Serial Monitor",
    "Threshold Logic",
    "Gas Detection",
    "Safety Prototype",
    "Embedded Systems",
  ],
  problemSolved:
    "The project explored how an LPG/gas sensor could be used to detect increased gas readings and trigger an alert. It introduced the idea of sensor-based safety monitoring using a simple Arduino setup.",
  whatItDoes:
    "The Arduino sketch reads analog input from an MQ2 gas sensor, prints the sensor value through serial output, compares readings against a threshold value, and uses a buzzer output as the alert mechanism.",
  parthRole:
    "Parth worked with the Arduino board, MQ2 sensor, buzzer output, and C/Arduino code to create a gas-detection prototype. The project shows early hands-on learning with analog sensor readings, thresholds, and safety-style alert logic.",
  githubUrl:
    "https://github.com/ParthGhumatkar/How-to-detect-LPG-Gas-using-MQ2-sensor/blob/main/MQ2_sensor.ino",
  demoUrl: null,
  videoUrl: "https://www.youtube.com/watch?v=9iePnEYrDW8",
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
    WHERE slug = ${LPG_GAS_DETECTION.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${LPG_GAS_DETECTION.title},
        short_description = ${LPG_GAS_DETECTION.shortDescription},
        full_description = ${LPG_GAS_DETECTION.fullDescription},
        project_type = ${LPG_GAS_DETECTION.projectType},
        project_phase = ${LPG_GAS_DETECTION.projectPhase},
        status = ${LPG_GAS_DETECTION.status},
        industry = ${LPG_GAS_DETECTION.industry},
        domains = ${LPG_GAS_DETECTION.domains}::project_domain[],
        featured_on_home = ${LPG_GAS_DETECTION.featuredOnHome},
        featured_on_about = ${LPG_GAS_DETECTION.featuredOnAbout},
        display_order = ${LPG_GAS_DETECTION.displayOrder},
        tech_stack = ${LPG_GAS_DETECTION.techStack},
        problem_solved = ${LPG_GAS_DETECTION.problemSolved},
        what_it_does = ${LPG_GAS_DETECTION.whatItDoes},
        parth_role = ${LPG_GAS_DETECTION.parthRole},
        github_url = ${LPG_GAS_DETECTION.githubUrl},
        demo_url = ${LPG_GAS_DETECTION.demoUrl},
        video_url = ${LPG_GAS_DETECTION.videoUrl},
        pdf_download_url = ${LPG_GAS_DETECTION.pdfDownloadUrl},
        published = ${LPG_GAS_DETECTION.published},
        hidden = ${LPG_GAS_DETECTION.hidden},
        archived = ${LPG_GAS_DETECTION.archived},
        updated_at = NOW()
      WHERE slug = ${LPG_GAS_DETECTION.slug}
    `;
    console.log(`Updated existing LPG Gas Detection project (${row.id}).`);
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
        ${LPG_GAS_DETECTION.title},
        ${LPG_GAS_DETECTION.slug},
        ${LPG_GAS_DETECTION.shortDescription},
        ${LPG_GAS_DETECTION.fullDescription},
        ${LPG_GAS_DETECTION.projectType},
        ${LPG_GAS_DETECTION.projectPhase},
        ${LPG_GAS_DETECTION.status},
        ${LPG_GAS_DETECTION.industry},
        ${LPG_GAS_DETECTION.domains}::project_domain[],
        ${LPG_GAS_DETECTION.featuredOnHome},
        ${LPG_GAS_DETECTION.featuredOnAbout},
        ${LPG_GAS_DETECTION.displayOrder},
        ${LPG_GAS_DETECTION.techStack},
        ${LPG_GAS_DETECTION.problemSolved},
        ${LPG_GAS_DETECTION.whatItDoes},
        ${LPG_GAS_DETECTION.parthRole},
        ${LPG_GAS_DETECTION.githubUrl},
        ${LPG_GAS_DETECTION.demoUrl},
        ${LPG_GAS_DETECTION.videoUrl},
        ${LPG_GAS_DETECTION.pdfDownloadUrl},
        ${LPG_GAS_DETECTION.published},
        ${LPG_GAS_DETECTION.hidden},
        ${LPG_GAS_DETECTION.archived}
      )
      RETURNING id, slug
    `;
    console.log(`Inserted LPG Gas Detection project (${inserted[0]?.id}).`);
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
    WHERE slug = ${LPG_GAS_DETECTION.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
