/**
 * Idempotent upsert for the Bluetooth Speaker Conversion early work project.
 * Run: npm run db:upsert-bluetooth-speaker-conversion
 */

import { neon } from "@neondatabase/serverless";

const BLUETOOTH_SPEAKER_CONVERSION = {
  title: "Bluetooth Speaker Conversion — Wired-to-Wireless Hardware Integration",
  slug: "bluetooth-speaker-conversion-wired-to-wireless-hardware-integration",
  shortDescription:
    "An early hardware-integration project where Parth converted standard wired speakers into Bluetooth-enabled speakers using a Bluetooth module.",
  fullDescription:
    "Bluetooth Speaker Conversion was one of Parth's early maker-hardware projects from March 2018. The project demonstrated how standard wired speakers could be modified with a Bluetooth module to work wirelessly.\n\nThis project is useful in the Early Work archive because it shows Parth's early habit of looking at existing devices and asking how they could be improved or repurposed. Before many of his later Arduino, IoT, relay, and automation projects, he was already experimenting with hardware integration and practical device modification.\n\nThe video description also notes that the recording setup, script writing, editing, animation, and special effects were done by Parth, adding evidence of both technical curiosity and self-driven presentation skills.\n\nThis project matters because it shows Parth's early maker mindset. At 13, he was already trying to improve existing devices using available components. It reflects practical curiosity, hardware confidence, and the habit of learning by modifying real objects.\n\nThis project is documented through a working video demo rather than a public code repository.",
  projectType: "other",
  projectPhase: "early_work",
  status: "archived",
  industry: "education_learning",
  domains: ["iot_hardware", "other"],
  featuredOnHome: false,
  featuredOnAbout: false,
  displayOrder: 315,
  techStack: [
    "Bluetooth Module",
    "Wired Speakers",
    "Audio Hardware",
    "Hardware Integration",
    "Wireless Audio",
    "DIY Electronics",
    "Maker Project",
    "Device Modification",
    "Video Editing",
    "Script Writing",
    "Animation",
    "Special Effects",
  ],
  problemSolved:
    "The project explored how wired speakers could be upgraded to receive audio wirelessly through Bluetooth instead of relying only on a wired connection.",
  whatItDoes:
    "A Bluetooth module is integrated with standard wired speakers so that audio can be sent wirelessly from a compatible device. The project demonstrates a practical wired-to-wireless speaker conversion.",
  parthRole:
    "Parth handled the hardware integration, connected the Bluetooth module with the speaker setup, and documented the project through video recording, script writing, editing, animation, and special effects.",
  githubUrl: null,
  demoUrl: null,
  videoUrl: "https://www.youtube.com/watch?v=ThNN12VA7fE",
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
    WHERE slug = ${BLUETOOTH_SPEAKER_CONVERSION.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${BLUETOOTH_SPEAKER_CONVERSION.title},
        short_description = ${BLUETOOTH_SPEAKER_CONVERSION.shortDescription},
        full_description = ${BLUETOOTH_SPEAKER_CONVERSION.fullDescription},
        project_type = ${BLUETOOTH_SPEAKER_CONVERSION.projectType},
        project_phase = ${BLUETOOTH_SPEAKER_CONVERSION.projectPhase},
        status = ${BLUETOOTH_SPEAKER_CONVERSION.status},
        industry = ${BLUETOOTH_SPEAKER_CONVERSION.industry},
        domains = ${BLUETOOTH_SPEAKER_CONVERSION.domains}::project_domain[],
        featured_on_home = ${BLUETOOTH_SPEAKER_CONVERSION.featuredOnHome},
        featured_on_about = ${BLUETOOTH_SPEAKER_CONVERSION.featuredOnAbout},
        display_order = ${BLUETOOTH_SPEAKER_CONVERSION.displayOrder},
        tech_stack = ${BLUETOOTH_SPEAKER_CONVERSION.techStack},
        problem_solved = ${BLUETOOTH_SPEAKER_CONVERSION.problemSolved},
        what_it_does = ${BLUETOOTH_SPEAKER_CONVERSION.whatItDoes},
        parth_role = ${BLUETOOTH_SPEAKER_CONVERSION.parthRole},
        github_url = ${BLUETOOTH_SPEAKER_CONVERSION.githubUrl},
        demo_url = ${BLUETOOTH_SPEAKER_CONVERSION.demoUrl},
        video_url = ${BLUETOOTH_SPEAKER_CONVERSION.videoUrl},
        pdf_download_url = ${BLUETOOTH_SPEAKER_CONVERSION.pdfDownloadUrl},
        published = ${BLUETOOTH_SPEAKER_CONVERSION.published},
        hidden = ${BLUETOOTH_SPEAKER_CONVERSION.hidden},
        archived = ${BLUETOOTH_SPEAKER_CONVERSION.archived},
        updated_at = NOW()
      WHERE slug = ${BLUETOOTH_SPEAKER_CONVERSION.slug}
    `;
    console.log(
      `Updated existing Bluetooth Speaker Conversion project (${row.id}).`,
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
        ${BLUETOOTH_SPEAKER_CONVERSION.title},
        ${BLUETOOTH_SPEAKER_CONVERSION.slug},
        ${BLUETOOTH_SPEAKER_CONVERSION.shortDescription},
        ${BLUETOOTH_SPEAKER_CONVERSION.fullDescription},
        ${BLUETOOTH_SPEAKER_CONVERSION.projectType},
        ${BLUETOOTH_SPEAKER_CONVERSION.projectPhase},
        ${BLUETOOTH_SPEAKER_CONVERSION.status},
        ${BLUETOOTH_SPEAKER_CONVERSION.industry},
        ${BLUETOOTH_SPEAKER_CONVERSION.domains}::project_domain[],
        ${BLUETOOTH_SPEAKER_CONVERSION.featuredOnHome},
        ${BLUETOOTH_SPEAKER_CONVERSION.featuredOnAbout},
        ${BLUETOOTH_SPEAKER_CONVERSION.displayOrder},
        ${BLUETOOTH_SPEAKER_CONVERSION.techStack},
        ${BLUETOOTH_SPEAKER_CONVERSION.problemSolved},
        ${BLUETOOTH_SPEAKER_CONVERSION.whatItDoes},
        ${BLUETOOTH_SPEAKER_CONVERSION.parthRole},
        ${BLUETOOTH_SPEAKER_CONVERSION.githubUrl},
        ${BLUETOOTH_SPEAKER_CONVERSION.demoUrl},
        ${BLUETOOTH_SPEAKER_CONVERSION.videoUrl},
        ${BLUETOOTH_SPEAKER_CONVERSION.pdfDownloadUrl},
        ${BLUETOOTH_SPEAKER_CONVERSION.published},
        ${BLUETOOTH_SPEAKER_CONVERSION.hidden},
        ${BLUETOOTH_SPEAKER_CONVERSION.archived}
      )
      RETURNING id, slug
    `;
    console.log(
      `Inserted Bluetooth Speaker Conversion project (${inserted[0]?.id}).`,
    );
  }

  const milkShift = await sql`
    UPDATE projects
    SET display_order = 316, updated_at = NOW()
    WHERE slug = ${MILK_ALARM_SLUG}
      AND display_order = 315
    RETURNING slug, display_order
  `;

  if (milkShift.length > 0) {
    console.log(
      "Shifted Milk Temperature Alarm display_order to 316 to keep Bluetooth Speaker at 315.",
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
    WHERE slug = ${BLUETOOTH_SPEAKER_CONVERSION.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
