/**
 * Idempotent upsert for the Mobile App Controlled Water Pump early work project.
 * Run: npm run db:upsert-water-pump-bluetooth
 */

import { neon } from "@neondatabase/serverless";

const WATER_PUMP_BLUETOOTH = {
  title: "Mobile App Controlled Water Pump — Arduino Bluetooth Prototype",
  slug: "mobile-app-controlled-water-pump-arduino-bluetooth-prototype",
  shortDescription:
    "An early mobile app and Arduino project where a water pump was controlled from a phone through Bluetooth commands.",
  fullDescription:
    "Mobile App Controlled Water Pump was one of Parth's early practical automation projects from 2018. The project demonstrated how a mobile app could be used to control a physical water pump through Bluetooth and Arduino. The video shows the mobile app installed on a phone and controlling the pump. The app was made using MIT App Inventor / MIT App Developer, while the Arduino code handled Bluetooth-style serial commands and controlled the pump output. This is an important early project because it shows Parth connecting three layers at a young age: mobile app interface, wireless communication, and physical hardware control. This project is important because it is from 2018 and already shows a complete automation idea: mobile app, Bluetooth communication, Arduino control, and a real physical device. It reflects early practical thinking, not only theory or classroom coding.",
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
  displayOrder: 280,
  techStack: [
    "Arduino",
    "C++",
    "Bluetooth Communication",
    "MIT App Inventor",
    "Mobile App Control",
    "Serial Communication",
    "Water Pump",
    "LED Indicators",
    "Hardware Automation",
    "IoT Prototype",
  ],
  problemSolved:
    "The project explored how a water pump could be controlled remotely from a mobile phone. This is useful for people who use water pumps and want a simple app-based control method instead of manual switching.",
  whatItDoes:
    "The mobile app sends command values through Bluetooth. The Arduino receives those command values through serial input and switches outputs such as LED indicators and the water pump pin. The project demonstrates a basic phone-to-hardware control flow.",
  parthRole:
    "Parth built the mobile-app-controlled automation concept, worked with the Arduino control code, connected Bluetooth-style command input to physical pump output, and demonstrated the working setup on video.",
  githubUrl:
    "https://github.com/ParthGhumatkar/Water_Pump/blob/master/Water_Pump.ino",
  demoUrl: null,
  videoUrl: "https://www.youtube.com/watch?v=jX54u9ri3W4",
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
    WHERE slug = ${WATER_PUMP_BLUETOOTH.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${WATER_PUMP_BLUETOOTH.title},
        short_description = ${WATER_PUMP_BLUETOOTH.shortDescription},
        full_description = ${WATER_PUMP_BLUETOOTH.fullDescription},
        project_type = ${WATER_PUMP_BLUETOOTH.projectType},
        project_phase = ${WATER_PUMP_BLUETOOTH.projectPhase},
        status = ${WATER_PUMP_BLUETOOTH.status},
        industry = ${WATER_PUMP_BLUETOOTH.industry},
        domains = ${WATER_PUMP_BLUETOOTH.domains}::project_domain[],
        featured_on_home = ${WATER_PUMP_BLUETOOTH.featuredOnHome},
        featured_on_about = ${WATER_PUMP_BLUETOOTH.featuredOnAbout},
        display_order = ${WATER_PUMP_BLUETOOTH.displayOrder},
        tech_stack = ${WATER_PUMP_BLUETOOTH.techStack},
        problem_solved = ${WATER_PUMP_BLUETOOTH.problemSolved},
        what_it_does = ${WATER_PUMP_BLUETOOTH.whatItDoes},
        parth_role = ${WATER_PUMP_BLUETOOTH.parthRole},
        github_url = ${WATER_PUMP_BLUETOOTH.githubUrl},
        demo_url = ${WATER_PUMP_BLUETOOTH.demoUrl},
        video_url = ${WATER_PUMP_BLUETOOTH.videoUrl},
        pdf_download_url = ${WATER_PUMP_BLUETOOTH.pdfDownloadUrl},
        published = ${WATER_PUMP_BLUETOOTH.published},
        hidden = ${WATER_PUMP_BLUETOOTH.hidden},
        archived = ${WATER_PUMP_BLUETOOTH.archived},
        updated_at = NOW()
      WHERE slug = ${WATER_PUMP_BLUETOOTH.slug}
    `;
    console.log(
      `Updated existing Water Pump Bluetooth project (${row.id}).`,
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
        ${WATER_PUMP_BLUETOOTH.title},
        ${WATER_PUMP_BLUETOOTH.slug},
        ${WATER_PUMP_BLUETOOTH.shortDescription},
        ${WATER_PUMP_BLUETOOTH.fullDescription},
        ${WATER_PUMP_BLUETOOTH.projectType},
        ${WATER_PUMP_BLUETOOTH.projectPhase},
        ${WATER_PUMP_BLUETOOTH.status},
        ${WATER_PUMP_BLUETOOTH.industry},
        ${WATER_PUMP_BLUETOOTH.domains}::project_domain[],
        ${WATER_PUMP_BLUETOOTH.featuredOnHome},
        ${WATER_PUMP_BLUETOOTH.featuredOnAbout},
        ${WATER_PUMP_BLUETOOTH.displayOrder},
        ${WATER_PUMP_BLUETOOTH.techStack},
        ${WATER_PUMP_BLUETOOTH.problemSolved},
        ${WATER_PUMP_BLUETOOTH.whatItDoes},
        ${WATER_PUMP_BLUETOOTH.parthRole},
        ${WATER_PUMP_BLUETOOTH.githubUrl},
        ${WATER_PUMP_BLUETOOTH.demoUrl},
        ${WATER_PUMP_BLUETOOTH.videoUrl},
        ${WATER_PUMP_BLUETOOTH.pdfDownloadUrl},
        ${WATER_PUMP_BLUETOOTH.published},
        ${WATER_PUMP_BLUETOOTH.hidden},
        ${WATER_PUMP_BLUETOOTH.archived}
      )
      RETURNING id, slug
    `;
    console.log(
      `Inserted Water Pump Bluetooth project (${inserted[0]?.id}).`,
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
    WHERE slug = ${WATER_PUMP_BLUETOOTH.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
