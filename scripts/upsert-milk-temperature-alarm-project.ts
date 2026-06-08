/**
 * Idempotent upsert for the Milk Temperature Alarm early work project.
 * Run: npm run db:upsert-milk-temperature-alarm
 */

import { neon } from "@neondatabase/serverless";

const MILK_TEMPERATURE_ALARM = {
  title: "Milk Temperature Alarm — Arduino Monitoring Prototype",
  slug: "milk-temperature-alarm-arduino-monitoring-prototype",
  shortDescription:
    "An early Arduino temperature-monitoring prototype designed to read milk temperature, display it on an LCD, and trigger buzzer-alarm logic at a high-temperature threshold.",
  fullDescription:
    "Milk Temperature Alarm was an early Arduino experiment from 2021 focused on a simple household monitoring problem: tracking milk temperature and alerting when it reaches a high level. The project used a temperature sensor, Arduino code, an LCD display, and buzzer-alarm logic. It shows Parth experimenting with sensor input, temperature readings, display output, and threshold-based alerts in a physical electronics setup. This project is useful as an early code-backed prototype because it shows the progression from simple output control to sensor-based monitoring. It also fits the larger pattern of Parth's early work: identifying small real-world problems and testing whether Arduino-based automation could solve them.",
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
  displayOrder: 315,
  techStack: [
    "Arduino",
    "C++",
    "OneWire",
    "DallasTemperature",
    "I2C LCD",
    "Temperature Sensor",
    "Buzzer",
    "Sensor Monitoring",
    "Embedded Systems",
    "Threshold Alarm",
  ],
  problemSolved:
    "The project explored how a household temperature-monitoring task could be automated. Instead of manually watching the milk continuously, the system was intended to read the temperature and support alarm logic when the temperature crossed a defined threshold.",
  whatItDoes:
    "The Arduino sketch reads temperature data using a Dallas temperature sensor setup, displays the Celsius reading on an I2C LCD, and includes alarm-checking logic to activate a buzzer when the sensor reports a high-temperature condition. The threshold in the code is set around 94°C.",
  parthRole:
    "Parth wrote the Arduino control logic, connected sensor reading with LCD output, and experimented with buzzer-based temperature alert behavior. The project demonstrates early work with sensors, display modules, and threshold-based automation.",
  githubUrl:
    "https://github.com/ParthGhumatkar/Milk-temperature-Alarm/blob/main/MilktempAlarm.ino",
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
    WHERE slug = ${MILK_TEMPERATURE_ALARM.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${MILK_TEMPERATURE_ALARM.title},
        short_description = ${MILK_TEMPERATURE_ALARM.shortDescription},
        full_description = ${MILK_TEMPERATURE_ALARM.fullDescription},
        project_type = ${MILK_TEMPERATURE_ALARM.projectType},
        project_phase = ${MILK_TEMPERATURE_ALARM.projectPhase},
        status = ${MILK_TEMPERATURE_ALARM.status},
        industry = ${MILK_TEMPERATURE_ALARM.industry},
        domains = ${MILK_TEMPERATURE_ALARM.domains}::project_domain[],
        featured_on_home = ${MILK_TEMPERATURE_ALARM.featuredOnHome},
        featured_on_about = ${MILK_TEMPERATURE_ALARM.featuredOnAbout},
        display_order = ${MILK_TEMPERATURE_ALARM.displayOrder},
        tech_stack = ${MILK_TEMPERATURE_ALARM.techStack},
        problem_solved = ${MILK_TEMPERATURE_ALARM.problemSolved},
        what_it_does = ${MILK_TEMPERATURE_ALARM.whatItDoes},
        parth_role = ${MILK_TEMPERATURE_ALARM.parthRole},
        github_url = ${MILK_TEMPERATURE_ALARM.githubUrl},
        demo_url = ${MILK_TEMPERATURE_ALARM.demoUrl},
        video_url = ${MILK_TEMPERATURE_ALARM.videoUrl},
        pdf_download_url = ${MILK_TEMPERATURE_ALARM.pdfDownloadUrl},
        published = ${MILK_TEMPERATURE_ALARM.published},
        hidden = ${MILK_TEMPERATURE_ALARM.hidden},
        archived = ${MILK_TEMPERATURE_ALARM.archived},
        updated_at = NOW()
      WHERE slug = ${MILK_TEMPERATURE_ALARM.slug}
    `;
    console.log(`Updated existing Milk Temperature Alarm project (${row.id}).`);
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
        ${MILK_TEMPERATURE_ALARM.title},
        ${MILK_TEMPERATURE_ALARM.slug},
        ${MILK_TEMPERATURE_ALARM.shortDescription},
        ${MILK_TEMPERATURE_ALARM.fullDescription},
        ${MILK_TEMPERATURE_ALARM.projectType},
        ${MILK_TEMPERATURE_ALARM.projectPhase},
        ${MILK_TEMPERATURE_ALARM.status},
        ${MILK_TEMPERATURE_ALARM.industry},
        ${MILK_TEMPERATURE_ALARM.domains}::project_domain[],
        ${MILK_TEMPERATURE_ALARM.featuredOnHome},
        ${MILK_TEMPERATURE_ALARM.featuredOnAbout},
        ${MILK_TEMPERATURE_ALARM.displayOrder},
        ${MILK_TEMPERATURE_ALARM.techStack},
        ${MILK_TEMPERATURE_ALARM.problemSolved},
        ${MILK_TEMPERATURE_ALARM.whatItDoes},
        ${MILK_TEMPERATURE_ALARM.parthRole},
        ${MILK_TEMPERATURE_ALARM.githubUrl},
        ${MILK_TEMPERATURE_ALARM.demoUrl},
        ${MILK_TEMPERATURE_ALARM.videoUrl},
        ${MILK_TEMPERATURE_ALARM.pdfDownloadUrl},
        ${MILK_TEMPERATURE_ALARM.published},
        ${MILK_TEMPERATURE_ALARM.hidden},
        ${MILK_TEMPERATURE_ALARM.archived}
      )
      RETURNING id, slug
    `;
    console.log(`Inserted Milk Temperature Alarm project (${inserted[0]?.id}).`);
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
    WHERE slug = ${MILK_TEMPERATURE_ALARM.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
