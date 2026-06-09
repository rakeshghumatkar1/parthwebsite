/**
 * Idempotent upsert for the Bluetooth RGB Home Decor early work project.
 * Run: npm run db:upsert-bluetooth-rgb-home-decor
 */

import { neon } from "@neondatabase/serverless";

const BLUETOOTH_RGB_HOME_DECOR = {
  title: "Bluetooth RGB Home Decor — Arduino Nano App-Controlled Lighting",
  slug: "bluetooth-rgb-home-decor-arduino-nano-app-controlled-lighting",
  shortDescription:
    "An early creative lighting project where Parth used Arduino Nano, HC-05 Bluetooth, RGB LEDs, and a mobile app to control colourful home decor lighting.",
  fullDescription:
    "Bluetooth RGB Home Decor was an early creative electronics project built by Parth in June 2018. The project used RGB LEDs, wires, an HC-05 Bluetooth module, Arduino Nano, a container, and a breadboard to create a colourful glowing home decor object.\n\nThe video shows an RGB LED ring inside a handmade decor setup. The lighting is controlled through a mobile app that Parth created using MIT App Inventor / MIT App Developer. The project allowed different colour combinations and demonstrated how Bluetooth control could be used for interactive decorative lighting.\n\nThis project is useful in the Early Work archive because it shows Parth applying electronics not only to automation and device control, but also to design, ambience, and creative home use. It reflects the habit of using available materials and technical curiosity to build something visually interactive.\n\nThis project matters because it shows creative application of technology. At 14, Parth was already using Bluetooth, app creation, Arduino control, and physical materials to build interactive objects. It adds variety to his early work by showing that he was not only solving practical problems, but also using technology for creativity, design, and home ambience.\n\nThis project is documented through a working video demo rather than a public code repository.",
  projectType: "automation",
  projectPhase: "early_work",
  status: "archived",
  industry: "smart_home_iot",
  domains: ["iot_hardware", "home_automation", "other"],
  featuredOnHome: false,
  featuredOnAbout: false,
  displayOrder: 317,
  techStack: [
    "Arduino Nano",
    "HC-05 Bluetooth Module",
    "RGB LED Ring",
    "RGB LEDs",
    "MIT App Inventor",
    "MIT App Developer",
    "Mobile App Control",
    "Bluetooth Control",
    "Breadboard",
    "Container",
    "Wires",
    "Interactive Lighting",
    "Creative Electronics",
    "Home Decor Lighting",
  ],
  problemSolved:
    "The project explored how a simple home decor object could be made interactive by adding app-controlled RGB lighting through Bluetooth.",
  whatItDoes:
    "The system uses a mobile app to send Bluetooth commands through an HC-05 module to Arduino Nano. Arduino controls the RGB LED ring, allowing the decor object to glow in different colours and colour combinations.",
  parthRole:
    "Parth created the lighting concept, connected the RGB LEDs with Arduino Nano and the HC-05 Bluetooth module, built the app-control flow using MIT App Inventor / MIT App Developer, and demonstrated the working decor object on video.",
  githubUrl: null,
  demoUrl: null,
  videoUrl: "https://www.youtube.com/watch?v=PHl8K1Qv4Yw",
  pdfDownloadUrl: null,
  published: true,
  hidden: false,
  archived: false,
} as const;

const MILK_ALARM_SLUG =
  "milk-temperature-alarm-arduino-monitoring-prototype";

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
    WHERE slug = ${BLUETOOTH_RGB_HOME_DECOR.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${BLUETOOTH_RGB_HOME_DECOR.title},
        short_description = ${BLUETOOTH_RGB_HOME_DECOR.shortDescription},
        full_description = ${BLUETOOTH_RGB_HOME_DECOR.fullDescription},
        project_type = ${BLUETOOTH_RGB_HOME_DECOR.projectType},
        project_phase = ${BLUETOOTH_RGB_HOME_DECOR.projectPhase},
        status = ${BLUETOOTH_RGB_HOME_DECOR.status},
        industry = ${BLUETOOTH_RGB_HOME_DECOR.industry},
        domains = ${BLUETOOTH_RGB_HOME_DECOR.domains}::project_domain[],
        featured_on_home = ${BLUETOOTH_RGB_HOME_DECOR.featuredOnHome},
        featured_on_about = ${BLUETOOTH_RGB_HOME_DECOR.featuredOnAbout},
        display_order = ${BLUETOOTH_RGB_HOME_DECOR.displayOrder},
        tech_stack = ${BLUETOOTH_RGB_HOME_DECOR.techStack},
        problem_solved = ${BLUETOOTH_RGB_HOME_DECOR.problemSolved},
        what_it_does = ${BLUETOOTH_RGB_HOME_DECOR.whatItDoes},
        parth_role = ${BLUETOOTH_RGB_HOME_DECOR.parthRole},
        github_url = ${BLUETOOTH_RGB_HOME_DECOR.githubUrl},
        demo_url = ${BLUETOOTH_RGB_HOME_DECOR.demoUrl},
        video_url = ${BLUETOOTH_RGB_HOME_DECOR.videoUrl},
        pdf_download_url = ${BLUETOOTH_RGB_HOME_DECOR.pdfDownloadUrl},
        published = ${BLUETOOTH_RGB_HOME_DECOR.published},
        hidden = ${BLUETOOTH_RGB_HOME_DECOR.hidden},
        archived = ${BLUETOOTH_RGB_HOME_DECOR.archived},
        updated_at = NOW()
      WHERE slug = ${BLUETOOTH_RGB_HOME_DECOR.slug}
    `;
    console.log(
      `Updated existing Bluetooth RGB Home Decor project (${row.id}).`,
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
        ${BLUETOOTH_RGB_HOME_DECOR.title},
        ${BLUETOOTH_RGB_HOME_DECOR.slug},
        ${BLUETOOTH_RGB_HOME_DECOR.shortDescription},
        ${BLUETOOTH_RGB_HOME_DECOR.fullDescription},
        ${BLUETOOTH_RGB_HOME_DECOR.projectType},
        ${BLUETOOTH_RGB_HOME_DECOR.projectPhase},
        ${BLUETOOTH_RGB_HOME_DECOR.status},
        ${BLUETOOTH_RGB_HOME_DECOR.industry},
        ${BLUETOOTH_RGB_HOME_DECOR.domains}::project_domain[],
        ${BLUETOOTH_RGB_HOME_DECOR.featuredOnHome},
        ${BLUETOOTH_RGB_HOME_DECOR.featuredOnAbout},
        ${BLUETOOTH_RGB_HOME_DECOR.displayOrder},
        ${BLUETOOTH_RGB_HOME_DECOR.techStack},
        ${BLUETOOTH_RGB_HOME_DECOR.problemSolved},
        ${BLUETOOTH_RGB_HOME_DECOR.whatItDoes},
        ${BLUETOOTH_RGB_HOME_DECOR.parthRole},
        ${BLUETOOTH_RGB_HOME_DECOR.githubUrl},
        ${BLUETOOTH_RGB_HOME_DECOR.demoUrl},
        ${BLUETOOTH_RGB_HOME_DECOR.videoUrl},
        ${BLUETOOTH_RGB_HOME_DECOR.pdfDownloadUrl},
        ${BLUETOOTH_RGB_HOME_DECOR.published},
        ${BLUETOOTH_RGB_HOME_DECOR.hidden},
        ${BLUETOOTH_RGB_HOME_DECOR.archived}
      )
      RETURNING id, slug
    `;
    console.log(
      `Inserted Bluetooth RGB Home Decor project (${inserted[0]?.id}).`,
    );
  }

  const milkShift = await sql`
    UPDATE projects
    SET display_order = 318, updated_at = NOW()
    WHERE slug = ${MILK_ALARM_SLUG}
      AND display_order = 317
    RETURNING slug, display_order
  `;

  if (milkShift.length > 0) {
    console.log(
      "Shifted Milk Temperature Alarm display_order to 318 to keep Bluetooth RGB Home Decor at 317.",
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
    WHERE slug = ${BLUETOOTH_RGB_HOME_DECOR.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
