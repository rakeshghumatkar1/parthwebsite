/**
 * Idempotent upsert for the Wi-Fi Home Device Control NodeMCU Blynk early work project.
 * Run: npm run db:upsert-wifi-home-device-control
 */

import { neon } from "@neondatabase/serverless";

const WIFI_HOME_DEVICE_CONTROL = {
  title: "Wi-Fi Home Device Control — NodeMCU Blynk IoT Prototype",
  slug: "wifi-home-device-control-nodemcu-blynk-iot-prototype",
  shortDescription:
    "An early IoT home automation project where Parth used NodeMCU, Blynk, Arduino IDE, and a 4-channel relay board to control home devices over Wi-Fi from a mobile app.",
  fullDescription:
    "Wi-Fi Home Device Control was one of Parth's earliest serious IoT automation projects. Published on 2 May 2018, the project demonstrated how home devices connected to a relay-controlled power source could be switched through a mobile app over Wi-Fi. The project used a NodeMCU Wi-Fi board, a 4-channel relay board, the Blynk mobile app, and Arduino IDE for coding. The video description explains that multiple devices connected to the same power source could be controlled through the app, and that the devices could be controlled from anywhere as long as Wi-Fi was available. At just 14, Parth was already experimenting with NodeMCU, Blynk, Arduino IDE, Wi-Fi control, and relay-based home-device automation. This project is important because it shows the early architecture behind many of his later automation projects: mobile app control, wireless communication, microcontroller logic, relay switching, and real device control. This project matters because it appears to be one of Parth's earliest complete IoT control systems. It shows that, as a 14-year-old, he was already working with app-based remote control, Wi-Fi boards, relay switching, and physical device automation. It also helps explain the technical progression into later Alexa, Bluetooth, GSM, and temperature-control projects. This project is documented through a working video demo rather than a public code repository.",
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
  displayOrder: 270,
  techStack: [
    "NodeMCU",
    "Blynk Mobile App",
    "Arduino IDE",
    "4-Channel Relay Board",
    "Wi-Fi Control",
    "IoT Prototype",
    "Mobile App Automation",
    "Relay Switching",
    "Home Automation",
    "Embedded Systems",
    "Remote Device Control",
  ],
  problemSolved:
    "The project explored how home devices could be controlled remotely through a mobile app instead of manual switching.",
  whatItDoes:
    "The system uses the Blynk mobile app to send Wi-Fi-based control commands to a NodeMCU board. The NodeMCU processes the commands and switches outputs through a 4-channel relay board, allowing connected devices to be turned on or off through the app.",
  parthRole:
    "Parth built the Wi-Fi home-control concept, configured the NodeMCU and Blynk app workflow, connected the relay board, wrote or adapted the Arduino IDE code, and demonstrated the working device-control system on video.",
  githubUrl: null,
  demoUrl: null,
  videoUrl: "https://www.youtube.com/watch?v=8q_ErPVoJJE",
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
    WHERE slug = ${WIFI_HOME_DEVICE_CONTROL.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${WIFI_HOME_DEVICE_CONTROL.title},
        short_description = ${WIFI_HOME_DEVICE_CONTROL.shortDescription},
        full_description = ${WIFI_HOME_DEVICE_CONTROL.fullDescription},
        project_type = ${WIFI_HOME_DEVICE_CONTROL.projectType},
        project_phase = ${WIFI_HOME_DEVICE_CONTROL.projectPhase},
        status = ${WIFI_HOME_DEVICE_CONTROL.status},
        industry = ${WIFI_HOME_DEVICE_CONTROL.industry},
        domains = ${WIFI_HOME_DEVICE_CONTROL.domains}::project_domain[],
        featured_on_home = ${WIFI_HOME_DEVICE_CONTROL.featuredOnHome},
        featured_on_about = ${WIFI_HOME_DEVICE_CONTROL.featuredOnAbout},
        display_order = ${WIFI_HOME_DEVICE_CONTROL.displayOrder},
        tech_stack = ${WIFI_HOME_DEVICE_CONTROL.techStack},
        problem_solved = ${WIFI_HOME_DEVICE_CONTROL.problemSolved},
        what_it_does = ${WIFI_HOME_DEVICE_CONTROL.whatItDoes},
        parth_role = ${WIFI_HOME_DEVICE_CONTROL.parthRole},
        github_url = ${WIFI_HOME_DEVICE_CONTROL.githubUrl},
        demo_url = ${WIFI_HOME_DEVICE_CONTROL.demoUrl},
        video_url = ${WIFI_HOME_DEVICE_CONTROL.videoUrl},
        pdf_download_url = ${WIFI_HOME_DEVICE_CONTROL.pdfDownloadUrl},
        published = ${WIFI_HOME_DEVICE_CONTROL.published},
        hidden = ${WIFI_HOME_DEVICE_CONTROL.hidden},
        archived = ${WIFI_HOME_DEVICE_CONTROL.archived},
        updated_at = NOW()
      WHERE slug = ${WIFI_HOME_DEVICE_CONTROL.slug}
    `;
    console.log(
      `Updated existing Wi-Fi Home Device Control project (${row.id}).`,
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
        ${WIFI_HOME_DEVICE_CONTROL.title},
        ${WIFI_HOME_DEVICE_CONTROL.slug},
        ${WIFI_HOME_DEVICE_CONTROL.shortDescription},
        ${WIFI_HOME_DEVICE_CONTROL.fullDescription},
        ${WIFI_HOME_DEVICE_CONTROL.projectType},
        ${WIFI_HOME_DEVICE_CONTROL.projectPhase},
        ${WIFI_HOME_DEVICE_CONTROL.status},
        ${WIFI_HOME_DEVICE_CONTROL.industry},
        ${WIFI_HOME_DEVICE_CONTROL.domains}::project_domain[],
        ${WIFI_HOME_DEVICE_CONTROL.featuredOnHome},
        ${WIFI_HOME_DEVICE_CONTROL.featuredOnAbout},
        ${WIFI_HOME_DEVICE_CONTROL.displayOrder},
        ${WIFI_HOME_DEVICE_CONTROL.techStack},
        ${WIFI_HOME_DEVICE_CONTROL.problemSolved},
        ${WIFI_HOME_DEVICE_CONTROL.whatItDoes},
        ${WIFI_HOME_DEVICE_CONTROL.parthRole},
        ${WIFI_HOME_DEVICE_CONTROL.githubUrl},
        ${WIFI_HOME_DEVICE_CONTROL.demoUrl},
        ${WIFI_HOME_DEVICE_CONTROL.videoUrl},
        ${WIFI_HOME_DEVICE_CONTROL.pdfDownloadUrl},
        ${WIFI_HOME_DEVICE_CONTROL.published},
        ${WIFI_HOME_DEVICE_CONTROL.hidden},
        ${WIFI_HOME_DEVICE_CONTROL.archived}
      )
      RETURNING id, slug
    `;
    console.log(
      `Inserted Wi-Fi Home Device Control project (${inserted[0]?.id}).`,
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
    WHERE slug = ${WIFI_HOME_DEVICE_CONTROL.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
