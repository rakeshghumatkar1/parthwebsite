/**
 * Idempotent upsert for the Alexa Home Automation early work project.
 * Run: npm run db:upsert-alexa-home-automation
 */

import { neon } from "@neondatabase/serverless";

const ALEXA_HOME_AUTOMATION = {
  title: "Alexa Home Automation — 4-Device IoT Control Prototype",
  slug: "alexa-home-automation-4-device-iot-control-prototype",
  shortDescription:
    "An early Alexa-based home automation project where Parth used a Wemos D1 board, WiFi, Sinric, and a 4-channel relay to control household devices by voice.",
  fullDescription:
    "Alexa Home Automation was one of Parth's strongest early IoT projects. Built in 2018, it used Amazon Alexa voice control with a Wemos D1 board and a 4-channel relay to control multiple household devices. The video shows the actual hardware setup, including the Wemos D1 board and relay module. The relay controlled an extension cord connected to household devices, while the board and relay were powered through a power bank. The project was not just a classroom exercise — it was built and used at home. At that time, voice-controlled home automation was still new for many Indian households. Parth learned the setup independently and created a working system that connected voice commands, cloud IoT communication, WiFi, microcontroller logic, and real electrical device control. This project is important because it shows Parth thinking beyond simple electronics. In 2018, he was already working with voice assistants, WiFi-based IoT, cloud command handling, relay control, and real-world home automation. It reflects the ability to learn a new technology independently and turn it into a working home-use implementation.",
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
  displayOrder: 275,
  techStack: [
    "Arduino",
    "C++",
    "ESP8266",
    "Wemos D1",
    "Alexa",
    "Sinric",
    "WebSockets",
    "ArduinoJson",
    "WiFi",
    "4-Channel Relay",
    "Voice Control",
    "IoT Prototype",
    "Home Automation",
  ],
  problemSolved:
    "The project explored how everyday household devices could be controlled by voice using Alexa instead of manual switches. It demonstrated how voice assistants could become a practical interface for home automation.",
  whatItDoes:
    "The system receives Alexa-triggered device commands through a WiFi-connected Wemos D1 board. The Arduino code connects to WiFi, communicates through the Sinric IoT service using WebSockets, processes power-state commands, and switches one of four relay outputs to turn connected devices on or off.",
  parthRole:
    "Parth learned the Alexa-IoT setup independently, configured the Wemos D1 board, connected the 4-channel relay, wrote and adapted the Arduino/ESP8266 code, mapped device commands to relay outputs, and demonstrated real household device control on video.",
  githubUrl:
    "https://github.com/ParthGhumatkar/Alexa-Home-Automation/blob/master/switch_example_wemos_d1_mini_with_relay.ino",
  demoUrl: null,
  videoUrl: "https://www.youtube.com/watch?v=FEcWwpfCTWQ",
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
    WHERE slug = ${ALEXA_HOME_AUTOMATION.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${ALEXA_HOME_AUTOMATION.title},
        short_description = ${ALEXA_HOME_AUTOMATION.shortDescription},
        full_description = ${ALEXA_HOME_AUTOMATION.fullDescription},
        project_type = ${ALEXA_HOME_AUTOMATION.projectType},
        project_phase = ${ALEXA_HOME_AUTOMATION.projectPhase},
        status = ${ALEXA_HOME_AUTOMATION.status},
        industry = ${ALEXA_HOME_AUTOMATION.industry},
        domains = ${ALEXA_HOME_AUTOMATION.domains}::project_domain[],
        featured_on_home = ${ALEXA_HOME_AUTOMATION.featuredOnHome},
        featured_on_about = ${ALEXA_HOME_AUTOMATION.featuredOnAbout},
        display_order = ${ALEXA_HOME_AUTOMATION.displayOrder},
        tech_stack = ${ALEXA_HOME_AUTOMATION.techStack},
        problem_solved = ${ALEXA_HOME_AUTOMATION.problemSolved},
        what_it_does = ${ALEXA_HOME_AUTOMATION.whatItDoes},
        parth_role = ${ALEXA_HOME_AUTOMATION.parthRole},
        github_url = ${ALEXA_HOME_AUTOMATION.githubUrl},
        demo_url = ${ALEXA_HOME_AUTOMATION.demoUrl},
        video_url = ${ALEXA_HOME_AUTOMATION.videoUrl},
        pdf_download_url = ${ALEXA_HOME_AUTOMATION.pdfDownloadUrl},
        published = ${ALEXA_HOME_AUTOMATION.published},
        hidden = ${ALEXA_HOME_AUTOMATION.hidden},
        archived = ${ALEXA_HOME_AUTOMATION.archived},
        updated_at = NOW()
      WHERE slug = ${ALEXA_HOME_AUTOMATION.slug}
    `;
    console.log(
      `Updated existing Alexa Home Automation project (${row.id}).`,
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
        ${ALEXA_HOME_AUTOMATION.title},
        ${ALEXA_HOME_AUTOMATION.slug},
        ${ALEXA_HOME_AUTOMATION.shortDescription},
        ${ALEXA_HOME_AUTOMATION.fullDescription},
        ${ALEXA_HOME_AUTOMATION.projectType},
        ${ALEXA_HOME_AUTOMATION.projectPhase},
        ${ALEXA_HOME_AUTOMATION.status},
        ${ALEXA_HOME_AUTOMATION.industry},
        ${ALEXA_HOME_AUTOMATION.domains}::project_domain[],
        ${ALEXA_HOME_AUTOMATION.featuredOnHome},
        ${ALEXA_HOME_AUTOMATION.featuredOnAbout},
        ${ALEXA_HOME_AUTOMATION.displayOrder},
        ${ALEXA_HOME_AUTOMATION.techStack},
        ${ALEXA_HOME_AUTOMATION.problemSolved},
        ${ALEXA_HOME_AUTOMATION.whatItDoes},
        ${ALEXA_HOME_AUTOMATION.parthRole},
        ${ALEXA_HOME_AUTOMATION.githubUrl},
        ${ALEXA_HOME_AUTOMATION.demoUrl},
        ${ALEXA_HOME_AUTOMATION.videoUrl},
        ${ALEXA_HOME_AUTOMATION.pdfDownloadUrl},
        ${ALEXA_HOME_AUTOMATION.published},
        ${ALEXA_HOME_AUTOMATION.hidden},
        ${ALEXA_HOME_AUTOMATION.archived}
      )
      RETURNING id, slug
    `;
    console.log(
      `Inserted Alexa Home Automation project (${inserted[0]?.id}).`,
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
    WHERE slug = ${ALEXA_HOME_AUTOMATION.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
