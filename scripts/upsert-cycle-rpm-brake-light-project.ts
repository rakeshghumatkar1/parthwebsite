/**
 * Idempotent upsert for the Cycle RPM & Brake Light System early work project.
 * Run: npm run db:upsert-cycle-rpm-brake-light
 */

import { neon } from "@neondatabase/serverless";

const CYCLE_RPM_BRAKE_LIGHT = {
  title: "Cycle RPM & Brake Light System — Arduino Hall Sensor Prototype",
  slug: "cycle-rpm-brake-light-system-arduino-hall-sensor-prototype",
  shortDescription:
    "An early cycle-tech prototype where Parth used Arduino, a Hall effect sensor, magnet, OLED display, and RGB LEDs to measure wheel rotation/RPM and create brake-light style signals.",
  fullDescription:
    "Cycle RPM & Brake Light System was an early Arduino project built by Parth in May 2018. The project used a Hall effect sensor, magnet, OLED display, RGB LED ring, circuit board, wires, and a power bank to create a cycle-based sensing and signal system.\n\nThe idea came from using available resources creatively. Instead of waiting for a lab or formal equipment, Parth used his cycle and available electronics to build a working prototype. A magnet was attached near the cycle wheel/spokes, and the Hall effect sensor detected the magnet during rotation. Arduino then processed the signal, calculated RPM, and displayed the result on an OLED screen.\n\nThe project also used RGB LEDs for visual signaling. The video shows the LED ring changing behavior during braking and continuing a fade-in mode when the sensor does not detect movement.\n\nThis project matters because it shows independent thinking and resourcefulness. Parth was not only copying textbook circuits; he was looking at objects around him and applying electronics to real-life use cases. At 14, he was already combining sensing, calculation, display output, and visual signaling into a working prototype using the materials available to him.\n\nThis project is documented through a working video demo rather than a public code repository.",
  projectType: "automation",
  projectPhase: "early_work",
  status: "archived",
  industry: "education_learning",
  domains: ["iot_hardware", "robotics_drones", "other"],
  featuredOnHome: false,
  featuredOnAbout: false,
  displayOrder: 313,
  techStack: [
    "Arduino",
    "Hall Effect Sensor",
    "OLED Display",
    "RGB LED Ring",
    "Magnet Detection",
    "RPM Calculation",
    "Cycle Prototype",
    "Power Bank",
    "Circuit Board",
    "Wires",
    "Sensor-Based Control",
    "LED Signaling",
    "Brake Signal",
    "Available-Resource Innovation",
  ],
  problemSolved:
    "The project explored how a simple cycle could be enhanced with sensor-based speed/RPM measurement and visual safety-style signals using affordable electronics.",
  whatItDoes:
    "The Hall effect sensor detects a magnet attached to the cycle wheel/spokes during rotation. Arduino receives the signal, performs the calculation, and displays RPM on an OLED screen. The RGB LED ring is used as a visual signal system, including brake-related light behavior and a fade-in lighting mode when no movement is detected.",
  parthRole:
    "Parth created the cycle-tech concept, connected the Hall effect sensor and magnet setup, used Arduino coding to process wheel-rotation signals, connected the OLED display and RGB LED ring, and demonstrated the working prototype on video. The video description also credits Parth for video editing and script.",
  githubUrl: null,
  demoUrl: null,
  videoUrl: "https://www.youtube.com/watch?v=eeGYe6o6xgs",
  pdfDownloadUrl: null,
  published: true,
  hidden: false,
  archived: false,
} as const;

const DIWALI_SLUG =
  "alexa-enabled-diwali-lights-tradition-meets-voice-automation";

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
    WHERE slug = ${CYCLE_RPM_BRAKE_LIGHT.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${CYCLE_RPM_BRAKE_LIGHT.title},
        short_description = ${CYCLE_RPM_BRAKE_LIGHT.shortDescription},
        full_description = ${CYCLE_RPM_BRAKE_LIGHT.fullDescription},
        project_type = ${CYCLE_RPM_BRAKE_LIGHT.projectType},
        project_phase = ${CYCLE_RPM_BRAKE_LIGHT.projectPhase},
        status = ${CYCLE_RPM_BRAKE_LIGHT.status},
        industry = ${CYCLE_RPM_BRAKE_LIGHT.industry},
        domains = ${CYCLE_RPM_BRAKE_LIGHT.domains}::project_domain[],
        featured_on_home = ${CYCLE_RPM_BRAKE_LIGHT.featuredOnHome},
        featured_on_about = ${CYCLE_RPM_BRAKE_LIGHT.featuredOnAbout},
        display_order = ${CYCLE_RPM_BRAKE_LIGHT.displayOrder},
        tech_stack = ${CYCLE_RPM_BRAKE_LIGHT.techStack},
        problem_solved = ${CYCLE_RPM_BRAKE_LIGHT.problemSolved},
        what_it_does = ${CYCLE_RPM_BRAKE_LIGHT.whatItDoes},
        parth_role = ${CYCLE_RPM_BRAKE_LIGHT.parthRole},
        github_url = ${CYCLE_RPM_BRAKE_LIGHT.githubUrl},
        demo_url = ${CYCLE_RPM_BRAKE_LIGHT.demoUrl},
        video_url = ${CYCLE_RPM_BRAKE_LIGHT.videoUrl},
        pdf_download_url = ${CYCLE_RPM_BRAKE_LIGHT.pdfDownloadUrl},
        published = ${CYCLE_RPM_BRAKE_LIGHT.published},
        hidden = ${CYCLE_RPM_BRAKE_LIGHT.hidden},
        archived = ${CYCLE_RPM_BRAKE_LIGHT.archived},
        updated_at = NOW()
      WHERE slug = ${CYCLE_RPM_BRAKE_LIGHT.slug}
    `;
    console.log(
      `Updated existing Cycle RPM & Brake Light project (${row.id}).`,
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
        ${CYCLE_RPM_BRAKE_LIGHT.title},
        ${CYCLE_RPM_BRAKE_LIGHT.slug},
        ${CYCLE_RPM_BRAKE_LIGHT.shortDescription},
        ${CYCLE_RPM_BRAKE_LIGHT.fullDescription},
        ${CYCLE_RPM_BRAKE_LIGHT.projectType},
        ${CYCLE_RPM_BRAKE_LIGHT.projectPhase},
        ${CYCLE_RPM_BRAKE_LIGHT.status},
        ${CYCLE_RPM_BRAKE_LIGHT.industry},
        ${CYCLE_RPM_BRAKE_LIGHT.domains}::project_domain[],
        ${CYCLE_RPM_BRAKE_LIGHT.featuredOnHome},
        ${CYCLE_RPM_BRAKE_LIGHT.featuredOnAbout},
        ${CYCLE_RPM_BRAKE_LIGHT.displayOrder},
        ${CYCLE_RPM_BRAKE_LIGHT.techStack},
        ${CYCLE_RPM_BRAKE_LIGHT.problemSolved},
        ${CYCLE_RPM_BRAKE_LIGHT.whatItDoes},
        ${CYCLE_RPM_BRAKE_LIGHT.parthRole},
        ${CYCLE_RPM_BRAKE_LIGHT.githubUrl},
        ${CYCLE_RPM_BRAKE_LIGHT.demoUrl},
        ${CYCLE_RPM_BRAKE_LIGHT.videoUrl},
        ${CYCLE_RPM_BRAKE_LIGHT.pdfDownloadUrl},
        ${CYCLE_RPM_BRAKE_LIGHT.published},
        ${CYCLE_RPM_BRAKE_LIGHT.hidden},
        ${CYCLE_RPM_BRAKE_LIGHT.archived}
      )
      RETURNING id, slug
    `;
    console.log(
      `Inserted Cycle RPM & Brake Light project (${inserted[0]?.id}).`,
    );
  }

  const diwaliShift = await sql`
    UPDATE projects
    SET display_order = 314, updated_at = NOW()
    WHERE slug = ${DIWALI_SLUG}
      AND display_order = 313
    RETURNING slug, display_order
  `;

  if (diwaliShift.length > 0) {
    console.log(
      "Shifted Alexa Diwali Lights display_order to 314 to keep Cycle RPM at 313.",
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
    WHERE slug = ${CYCLE_RPM_BRAKE_LIGHT.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
