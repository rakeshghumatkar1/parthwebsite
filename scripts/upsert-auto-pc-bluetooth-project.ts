/**
 * Idempotent upsert for the Auto PC Turn On/Off early work project record.
 * Run: npm run db:upsert-auto-pc-bluetooth
 */

import { neon } from "@neondatabase/serverless";

const AUTO_PC_BLUETOOTH = {
  title: "Auto PC Turn On/Off Using Bluetooth App and Arduino",
  slug: "auto-pc-turn-on-off-bluetooth-app-arduino",
  shortDescription:
    "An early Arduino and Bluetooth-based home automation project that used a phone button to turn a PC and UPS on/off through servo-controlled physical switching.",
  fullDescription:
    "Auto PC Turn On/Off was an early hardware automation project from 2021 built around a simple personal problem: forgetting to turn off the PC and not wanting to get out of bed to switch it off. Parth built a Bluetooth app and Arduino-based setup that could trigger the switching sequence from a phone. The system used servo motors to physically operate the PC and UPS switches, turning a small everyday inconvenience into a working automation prototype. The project was also playfully described as being made for people who do not remember to turn their PC off and are not willing to get up from bed to do it. This early work is useful because it was not only screen-based coding — it connected software commands to real physical action and shows early interest in IoT, home automation, electronics, robotics-style movement, and practical problem-solving.",
  projectType: "automation",
  projectPhase: "early_work",
  status: "archived",
  industry: "smart_home_iot",
  domains: [
    "iot_hardware",
    "home_automation",
    "robotics_drones",
    "workflow_automation",
  ],
  featuredOnHome: false,
  featuredOnAbout: false,
  displayOrder: 310,
  techStack: [
    "Arduino",
    "C++",
    "Bluetooth App",
    "Servo Motors",
    "RTC Module",
    "Serial Communication",
    "Physical Automation",
    "Embedded Systems",
    "Home Automation",
    "IoT Prototype",
  ],
  problemSolved:
    "The project solved a personal convenience problem: switching off a PC and UPS without physically getting up. Instead of treating it as a minor irritation, Parth converted it into an automation experiment using a phone, Arduino, servo motors, and timing logic.",
  whatItDoes:
    "The system allows a user to press a button on a phone and trigger the PC/UPS switching sequence. On the hardware side, Arduino controls multiple servo motors that physically operate switches. The code also includes RTC-based timing logic, serial command handling, and button-triggered control paths.",
  parthRole:
    "Parth designed and coded the Arduino control logic, connected the servo-based switching sequence, tested the hardware movement, and built the project as a working home automation demo. The project connected mobile input, embedded code, physical hardware, and everyday problem-solving.",
  githubUrl:
    "https://github.com/ParthGhumatkar/Height-of-Laziness-Mobile-App-to-switch-on-off-your-PC-and-UPS/blob/main/Switch%20on-off%20your%20PC%20and%20UPS.ino",
  demoUrl: null,
  videoUrl: "https://www.youtube.com/watch?v=5RiJlsMprjU",
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
    WHERE slug = ${AUTO_PC_BLUETOOTH.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${AUTO_PC_BLUETOOTH.title},
        short_description = ${AUTO_PC_BLUETOOTH.shortDescription},
        full_description = ${AUTO_PC_BLUETOOTH.fullDescription},
        project_type = ${AUTO_PC_BLUETOOTH.projectType},
        project_phase = ${AUTO_PC_BLUETOOTH.projectPhase},
        status = ${AUTO_PC_BLUETOOTH.status},
        industry = ${AUTO_PC_BLUETOOTH.industry},
        domains = ${AUTO_PC_BLUETOOTH.domains}::project_domain[],
        featured_on_home = ${AUTO_PC_BLUETOOTH.featuredOnHome},
        featured_on_about = ${AUTO_PC_BLUETOOTH.featuredOnAbout},
        display_order = ${AUTO_PC_BLUETOOTH.displayOrder},
        tech_stack = ${AUTO_PC_BLUETOOTH.techStack},
        problem_solved = ${AUTO_PC_BLUETOOTH.problemSolved},
        what_it_does = ${AUTO_PC_BLUETOOTH.whatItDoes},
        parth_role = ${AUTO_PC_BLUETOOTH.parthRole},
        github_url = ${AUTO_PC_BLUETOOTH.githubUrl},
        demo_url = ${AUTO_PC_BLUETOOTH.demoUrl},
        video_url = ${AUTO_PC_BLUETOOTH.videoUrl},
        pdf_download_url = ${AUTO_PC_BLUETOOTH.pdfDownloadUrl},
        published = ${AUTO_PC_BLUETOOTH.published},
        hidden = ${AUTO_PC_BLUETOOTH.hidden},
        archived = ${AUTO_PC_BLUETOOTH.archived},
        updated_at = NOW()
      WHERE slug = ${AUTO_PC_BLUETOOTH.slug}
    `;
    console.log(`Updated existing Auto PC Bluetooth project (${row.id}).`);
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
        ${AUTO_PC_BLUETOOTH.title},
        ${AUTO_PC_BLUETOOTH.slug},
        ${AUTO_PC_BLUETOOTH.shortDescription},
        ${AUTO_PC_BLUETOOTH.fullDescription},
        ${AUTO_PC_BLUETOOTH.projectType},
        ${AUTO_PC_BLUETOOTH.projectPhase},
        ${AUTO_PC_BLUETOOTH.status},
        ${AUTO_PC_BLUETOOTH.industry},
        ${AUTO_PC_BLUETOOTH.domains}::project_domain[],
        ${AUTO_PC_BLUETOOTH.featuredOnHome},
        ${AUTO_PC_BLUETOOTH.featuredOnAbout},
        ${AUTO_PC_BLUETOOTH.displayOrder},
        ${AUTO_PC_BLUETOOTH.techStack},
        ${AUTO_PC_BLUETOOTH.problemSolved},
        ${AUTO_PC_BLUETOOTH.whatItDoes},
        ${AUTO_PC_BLUETOOTH.parthRole},
        ${AUTO_PC_BLUETOOTH.githubUrl},
        ${AUTO_PC_BLUETOOTH.demoUrl},
        ${AUTO_PC_BLUETOOTH.videoUrl},
        ${AUTO_PC_BLUETOOTH.pdfDownloadUrl},
        ${AUTO_PC_BLUETOOTH.published},
        ${AUTO_PC_BLUETOOTH.hidden},
        ${AUTO_PC_BLUETOOTH.archived}
      )
      RETURNING id, slug
    `;
    console.log(`Inserted Auto PC Bluetooth project (${inserted[0]?.id}).`);
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
    WHERE slug = ${AUTO_PC_BLUETOOTH.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
