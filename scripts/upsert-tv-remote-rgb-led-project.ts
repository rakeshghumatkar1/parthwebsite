/**
 * Idempotent upsert for the TV Remote RGB LED Control early work project.
 * Run: npm run db:upsert-tv-remote-rgb-led
 */

import { neon } from "@neondatabase/serverless";

const TV_REMOTE_RGB_LED = {
  title: "TV Remote RGB LED Control — Arduino IR Prototype",
  slug: "tv-remote-rgb-led-control-arduino-ir-prototype",
  shortDescription:
    "An early Arduino IR-control project where Parth used a TV remote to control RGB LEDs through C-language code and hardware integration.",
  fullDescription:
    "TV Remote RGB LED Control was one of Parth's early Arduino and hardware-integration projects from March 2018. The project demonstrated how a TV remote could be used to control RGB LEDs through Arduino and C-language code.\n\nThis project is useful in the Early Work archive because it shows one of Parth's early steps into remote-controlled hardware interaction. Before the later Wi-Fi, Bluetooth, Alexa, GSM, and relay-based automation projects, he was already experimenting with signal input, code-based control, and physical LED output.\n\nThe video description also notes that the C-language code, Arduino and hardware integration, recording setup, script writing, editing, animation, and special effects were done by Parth.\n\nThis project matters because it shows an early foundation in hardware control. At 13, Parth was already learning how external signals could be interpreted by code and converted into visible physical output. It also shows early self-driven documentation and presentation skills.\n\nThis project is documented through a working video demo rather than a public code repository.",
  projectType: "automation",
  projectPhase: "early_work",
  status: "archived",
  industry: "education_learning",
  domains: ["iot_hardware", "home_automation", "other"],
  featuredOnHome: false,
  featuredOnAbout: false,
  displayOrder: 316,
  techStack: [
    "Arduino",
    "C Language",
    "TV Remote",
    "IR Control",
    "RGB LEDs",
    "Hardware Integration",
    "Signal Processing",
    "LED Control",
    "Video Editing",
    "Script Writing",
    "Animation",
    "Special Effects",
  ],
  problemSolved:
    "The project explored how a regular TV remote could be used as an input device to control RGB LED behavior through Arduino.",
  whatItDoes:
    "The system receives commands from a TV remote and uses Arduino/C-language logic to control RGB LED output. The project demonstrates a basic remote-input to LED-output control flow.",
  parthRole:
    "Parth wrote or implemented the C-language Arduino code, connected the hardware, integrated the TV remote control behavior with RGB LED output, and documented the project through video recording, script writing, editing, animation, and special effects.",
  githubUrl: null,
  demoUrl: null,
  videoUrl: "https://www.youtube.com/watch?v=Io4yJMf0cRg",
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
    WHERE slug = ${TV_REMOTE_RGB_LED.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${TV_REMOTE_RGB_LED.title},
        short_description = ${TV_REMOTE_RGB_LED.shortDescription},
        full_description = ${TV_REMOTE_RGB_LED.fullDescription},
        project_type = ${TV_REMOTE_RGB_LED.projectType},
        project_phase = ${TV_REMOTE_RGB_LED.projectPhase},
        status = ${TV_REMOTE_RGB_LED.status},
        industry = ${TV_REMOTE_RGB_LED.industry},
        domains = ${TV_REMOTE_RGB_LED.domains}::project_domain[],
        featured_on_home = ${TV_REMOTE_RGB_LED.featuredOnHome},
        featured_on_about = ${TV_REMOTE_RGB_LED.featuredOnAbout},
        display_order = ${TV_REMOTE_RGB_LED.displayOrder},
        tech_stack = ${TV_REMOTE_RGB_LED.techStack},
        problem_solved = ${TV_REMOTE_RGB_LED.problemSolved},
        what_it_does = ${TV_REMOTE_RGB_LED.whatItDoes},
        parth_role = ${TV_REMOTE_RGB_LED.parthRole},
        github_url = ${TV_REMOTE_RGB_LED.githubUrl},
        demo_url = ${TV_REMOTE_RGB_LED.demoUrl},
        video_url = ${TV_REMOTE_RGB_LED.videoUrl},
        pdf_download_url = ${TV_REMOTE_RGB_LED.pdfDownloadUrl},
        published = ${TV_REMOTE_RGB_LED.published},
        hidden = ${TV_REMOTE_RGB_LED.hidden},
        archived = ${TV_REMOTE_RGB_LED.archived},
        updated_at = NOW()
      WHERE slug = ${TV_REMOTE_RGB_LED.slug}
    `;
    console.log(
      `Updated existing TV Remote RGB LED Control project (${row.id}).`,
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
        ${TV_REMOTE_RGB_LED.title},
        ${TV_REMOTE_RGB_LED.slug},
        ${TV_REMOTE_RGB_LED.shortDescription},
        ${TV_REMOTE_RGB_LED.fullDescription},
        ${TV_REMOTE_RGB_LED.projectType},
        ${TV_REMOTE_RGB_LED.projectPhase},
        ${TV_REMOTE_RGB_LED.status},
        ${TV_REMOTE_RGB_LED.industry},
        ${TV_REMOTE_RGB_LED.domains}::project_domain[],
        ${TV_REMOTE_RGB_LED.featuredOnHome},
        ${TV_REMOTE_RGB_LED.featuredOnAbout},
        ${TV_REMOTE_RGB_LED.displayOrder},
        ${TV_REMOTE_RGB_LED.techStack},
        ${TV_REMOTE_RGB_LED.problemSolved},
        ${TV_REMOTE_RGB_LED.whatItDoes},
        ${TV_REMOTE_RGB_LED.parthRole},
        ${TV_REMOTE_RGB_LED.githubUrl},
        ${TV_REMOTE_RGB_LED.demoUrl},
        ${TV_REMOTE_RGB_LED.videoUrl},
        ${TV_REMOTE_RGB_LED.pdfDownloadUrl},
        ${TV_REMOTE_RGB_LED.published},
        ${TV_REMOTE_RGB_LED.hidden},
        ${TV_REMOTE_RGB_LED.archived}
      )
      RETURNING id, slug
    `;
    console.log(
      `Inserted TV Remote RGB LED Control project (${inserted[0]?.id}).`,
    );
  }

  const milkShift = await sql`
    UPDATE projects
    SET display_order = 317, updated_at = NOW()
    WHERE slug = ${MILK_ALARM_SLUG}
      AND display_order = 316
    RETURNING slug, display_order
  `;

  if (milkShift.length > 0) {
    console.log(
      "Shifted Milk Temperature Alarm display_order to 317 to keep TV Remote RGB LED at 316.",
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
    WHERE slug = ${TV_REMOTE_RGB_LED.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
