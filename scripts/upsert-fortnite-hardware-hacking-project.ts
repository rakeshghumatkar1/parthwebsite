/**
 * Idempotent upsert for the Hardware Hacking Fortnite early work project.
 * Run: npm run db:upsert-fortnite-hardware-hacking
 */

import { neon } from "@neondatabase/serverless";

const FORTNITE_HARDWARE_HACKING = {
  title: "Hardware Hacking Fortnite — Arduino Keyboard Automation Prototype",
  slug: "hardware-hacking-fortnite-arduino-keyboard-automation-prototype",
  shortDescription:
    "An early gaming and hardware-hacking experiment where Arduino keyboard emulation was used to trigger predefined Fortnite key actions through a physical button.",
  fullDescription:
    "Hardware Hacking Fortnite was an early gaming-related automation experiment from 2021. Parth was an avid gamer, and this project shows how that curiosity moved into technical implementation. Instead of only playing the game, he experimented with how hardware input could trigger keyboard-style actions inside Fortnite. The Arduino code reads a physical button and sends predefined keyboard inputs using the Keyboard library, turning a gaming idea into a hardware automation prototype. The word \"hacking\" here should be understood in the maker sense: finding creative gaps, experimenting with hardware/software interaction, and learning how code can control real software behavior. This was maker-style hardware hacking and keyboard automation — not cheating, bypassing security, or malicious hacking. This project is useful because it shows a different side of Parth's early learning. It was not only about sensors, motors, and displays; he was also exploring gaming, keyboard automation, human-computer interaction, and maker-style hardware hacking. It shows curiosity, experimentation, and a willingness to apply coding ideas to things he personally cared about.",
  projectType: "automation",
  projectPhase: "early_work",
  status: "archived",
  industry: "education_learning",
  domains: [
    "iot_hardware",
    "workflow_automation",
    "other",
  ],
  featuredOnHome: false,
  featuredOnAbout: false,
  displayOrder: 318,
  techStack: [
    "Arduino",
    "C++",
    "Keyboard Library",
    "Button Input",
    "Keyboard Emulation",
    "Input Automation",
    "Gaming Prototype",
    "Hardware-Controlled Software Input",
    "Maker Hacking",
  ],
  problemSolved:
    "The project explored how repeated keyboard actions in a game could be triggered through a physical hardware button. It connected gaming behavior, hardware input, and automated keyboard output in one experiment.",
  whatItDoes:
    "The Arduino sketch uses a button input and the Keyboard library. When the button is pressed, the board sends a sequence of predefined keyboard inputs with short delays between some actions.",
  parthRole:
    "Parth wrote the Arduino keyboard automation logic, connected button input with software output, and used a gaming use case to explore how hardware can control software actions.",
  githubUrl:
    "https://github.com/ParthGhumatkar/Hacking-Fortnite-using-hardware-automation/blob/main/Fortnite_hack.ino",
  demoUrl: null,
  videoUrl: "https://www.youtube.com/watch?v=q3yYeDS2EQg",
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
    WHERE slug = ${FORTNITE_HARDWARE_HACKING.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${FORTNITE_HARDWARE_HACKING.title},
        short_description = ${FORTNITE_HARDWARE_HACKING.shortDescription},
        full_description = ${FORTNITE_HARDWARE_HACKING.fullDescription},
        project_type = ${FORTNITE_HARDWARE_HACKING.projectType},
        project_phase = ${FORTNITE_HARDWARE_HACKING.projectPhase},
        status = ${FORTNITE_HARDWARE_HACKING.status},
        industry = ${FORTNITE_HARDWARE_HACKING.industry},
        domains = ${FORTNITE_HARDWARE_HACKING.domains}::project_domain[],
        featured_on_home = ${FORTNITE_HARDWARE_HACKING.featuredOnHome},
        featured_on_about = ${FORTNITE_HARDWARE_HACKING.featuredOnAbout},
        display_order = ${FORTNITE_HARDWARE_HACKING.displayOrder},
        tech_stack = ${FORTNITE_HARDWARE_HACKING.techStack},
        problem_solved = ${FORTNITE_HARDWARE_HACKING.problemSolved},
        what_it_does = ${FORTNITE_HARDWARE_HACKING.whatItDoes},
        parth_role = ${FORTNITE_HARDWARE_HACKING.parthRole},
        github_url = ${FORTNITE_HARDWARE_HACKING.githubUrl},
        demo_url = ${FORTNITE_HARDWARE_HACKING.demoUrl},
        video_url = ${FORTNITE_HARDWARE_HACKING.videoUrl},
        pdf_download_url = ${FORTNITE_HARDWARE_HACKING.pdfDownloadUrl},
        published = ${FORTNITE_HARDWARE_HACKING.published},
        hidden = ${FORTNITE_HARDWARE_HACKING.hidden},
        archived = ${FORTNITE_HARDWARE_HACKING.archived},
        updated_at = NOW()
      WHERE slug = ${FORTNITE_HARDWARE_HACKING.slug}
    `;
    console.log(
      `Updated existing Fortnite Hardware Hacking project (${row.id}).`,
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
        ${FORTNITE_HARDWARE_HACKING.title},
        ${FORTNITE_HARDWARE_HACKING.slug},
        ${FORTNITE_HARDWARE_HACKING.shortDescription},
        ${FORTNITE_HARDWARE_HACKING.fullDescription},
        ${FORTNITE_HARDWARE_HACKING.projectType},
        ${FORTNITE_HARDWARE_HACKING.projectPhase},
        ${FORTNITE_HARDWARE_HACKING.status},
        ${FORTNITE_HARDWARE_HACKING.industry},
        ${FORTNITE_HARDWARE_HACKING.domains}::project_domain[],
        ${FORTNITE_HARDWARE_HACKING.featuredOnHome},
        ${FORTNITE_HARDWARE_HACKING.featuredOnAbout},
        ${FORTNITE_HARDWARE_HACKING.displayOrder},
        ${FORTNITE_HARDWARE_HACKING.techStack},
        ${FORTNITE_HARDWARE_HACKING.problemSolved},
        ${FORTNITE_HARDWARE_HACKING.whatItDoes},
        ${FORTNITE_HARDWARE_HACKING.parthRole},
        ${FORTNITE_HARDWARE_HACKING.githubUrl},
        ${FORTNITE_HARDWARE_HACKING.demoUrl},
        ${FORTNITE_HARDWARE_HACKING.videoUrl},
        ${FORTNITE_HARDWARE_HACKING.pdfDownloadUrl},
        ${FORTNITE_HARDWARE_HACKING.published},
        ${FORTNITE_HARDWARE_HACKING.hidden},
        ${FORTNITE_HARDWARE_HACKING.archived}
      )
      RETURNING id, slug
    `;
    console.log(
      `Inserted Fortnite Hardware Hacking project (${inserted[0]?.id}).`,
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
    WHERE slug = ${FORTNITE_HARDWARE_HACKING.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
