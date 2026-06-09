/**
 * Idempotent upsert for the Smart Temperature Controller HEMS early work project.
 * Run: npm run db:upsert-smart-temperature-controller
 */

import { neon } from "@neondatabase/serverless";

const SMART_TEMPERATURE_CONTROLLER = {
  title: "Smart Temperature Controller — Arduino Nano HEMS Prototype",
  slug: "smart-temperature-controller-arduino-nano-hems-prototype",
  shortDescription:
    "An early Home Energy Management System prototype where Arduino Nano used DHT11 temperature readings to control heater and cooler outputs through a 4-channel relay board.",
  fullDescription:
    "Smart Temperature Controller was an early Home Energy Management System prototype built by Parth in June 2018. The project used Arduino Nano, a DHT11 temperature sensor, wires, an extension cord, and a 4-channel relay board to demonstrate temperature-based heater and cooler control. The video shows the Arduino Nano connected to the sensor and relay board, with heater and cooler outputs connected through an extension board. Parth demonstrates the control logic by changing the sensor temperature using ice and normal room exposure. When the temperature drops, the heater turns on. When the temperature rises, the cooler turns on. This project is useful because it shows Parth moving beyond simple sensor reading. He was connecting sensor data, threshold logic, relay switching, and real device response into one working control system. This project shows early systems thinking: sensing the environment, making a decision in code, and controlling a real-world output. It is strong evidence that Parth was already experimenting with automation logic, device control, and energy-management ideas in 2018. This project is documented through a working video demo rather than a public code repository.",
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
  displayOrder: 311,
  techStack: [
    "Arduino Nano",
    "DHT11 Sensor",
    "4-Channel Relay Board",
    "Temperature Sensor",
    "Heater Control",
    "Cooler Control",
    "Extension Cord",
    "Relay Switching",
    "Hardware Automation",
    "Home Energy Management System",
    "Sensor-Based Automation",
  ],
  problemSolved:
    "The project explored how temperature readings could be used to automatically control heating and cooling devices in a basic home energy management setup.",
  whatItDoes:
    "The system reads temperature from a DHT11 sensor through Arduino Nano. Based on the measured temperature, the Arduino controls relay outputs connected to heater and cooler devices. The demo shows the cooler turning on when the temperature increases and the heater turning on when the temperature decreases.",
  parthRole:
    "Parth built the temperature-control concept, connected Arduino Nano with the DHT11 sensor and 4-channel relay board, configured the heater/cooler output flow, and demonstrated the working prototype on video.",
  githubUrl: null,
  demoUrl: null,
  videoUrl: "https://www.youtube.com/watch?v=vgrUCm34thg",
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
    WHERE slug = ${SMART_TEMPERATURE_CONTROLLER.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${SMART_TEMPERATURE_CONTROLLER.title},
        short_description = ${SMART_TEMPERATURE_CONTROLLER.shortDescription},
        full_description = ${SMART_TEMPERATURE_CONTROLLER.fullDescription},
        project_type = ${SMART_TEMPERATURE_CONTROLLER.projectType},
        project_phase = ${SMART_TEMPERATURE_CONTROLLER.projectPhase},
        status = ${SMART_TEMPERATURE_CONTROLLER.status},
        industry = ${SMART_TEMPERATURE_CONTROLLER.industry},
        domains = ${SMART_TEMPERATURE_CONTROLLER.domains}::project_domain[],
        featured_on_home = ${SMART_TEMPERATURE_CONTROLLER.featuredOnHome},
        featured_on_about = ${SMART_TEMPERATURE_CONTROLLER.featuredOnAbout},
        display_order = ${SMART_TEMPERATURE_CONTROLLER.displayOrder},
        tech_stack = ${SMART_TEMPERATURE_CONTROLLER.techStack},
        problem_solved = ${SMART_TEMPERATURE_CONTROLLER.problemSolved},
        what_it_does = ${SMART_TEMPERATURE_CONTROLLER.whatItDoes},
        parth_role = ${SMART_TEMPERATURE_CONTROLLER.parthRole},
        github_url = ${SMART_TEMPERATURE_CONTROLLER.githubUrl},
        demo_url = ${SMART_TEMPERATURE_CONTROLLER.demoUrl},
        video_url = ${SMART_TEMPERATURE_CONTROLLER.videoUrl},
        pdf_download_url = ${SMART_TEMPERATURE_CONTROLLER.pdfDownloadUrl},
        published = ${SMART_TEMPERATURE_CONTROLLER.published},
        hidden = ${SMART_TEMPERATURE_CONTROLLER.hidden},
        archived = ${SMART_TEMPERATURE_CONTROLLER.archived},
        updated_at = NOW()
      WHERE slug = ${SMART_TEMPERATURE_CONTROLLER.slug}
    `;
    console.log(
      `Updated existing Smart Temperature Controller project (${row.id}).`,
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
        ${SMART_TEMPERATURE_CONTROLLER.title},
        ${SMART_TEMPERATURE_CONTROLLER.slug},
        ${SMART_TEMPERATURE_CONTROLLER.shortDescription},
        ${SMART_TEMPERATURE_CONTROLLER.fullDescription},
        ${SMART_TEMPERATURE_CONTROLLER.projectType},
        ${SMART_TEMPERATURE_CONTROLLER.projectPhase},
        ${SMART_TEMPERATURE_CONTROLLER.status},
        ${SMART_TEMPERATURE_CONTROLLER.industry},
        ${SMART_TEMPERATURE_CONTROLLER.domains}::project_domain[],
        ${SMART_TEMPERATURE_CONTROLLER.featuredOnHome},
        ${SMART_TEMPERATURE_CONTROLLER.featuredOnAbout},
        ${SMART_TEMPERATURE_CONTROLLER.displayOrder},
        ${SMART_TEMPERATURE_CONTROLLER.techStack},
        ${SMART_TEMPERATURE_CONTROLLER.problemSolved},
        ${SMART_TEMPERATURE_CONTROLLER.whatItDoes},
        ${SMART_TEMPERATURE_CONTROLLER.parthRole},
        ${SMART_TEMPERATURE_CONTROLLER.githubUrl},
        ${SMART_TEMPERATURE_CONTROLLER.demoUrl},
        ${SMART_TEMPERATURE_CONTROLLER.videoUrl},
        ${SMART_TEMPERATURE_CONTROLLER.pdfDownloadUrl},
        ${SMART_TEMPERATURE_CONTROLLER.published},
        ${SMART_TEMPERATURE_CONTROLLER.hidden},
        ${SMART_TEMPERATURE_CONTROLLER.archived}
      )
      RETURNING id, slug
    `;
    console.log(
      `Inserted Smart Temperature Controller project (${inserted[0]?.id}).`,
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
    WHERE slug = ${SMART_TEMPERATURE_CONTROLLER.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
