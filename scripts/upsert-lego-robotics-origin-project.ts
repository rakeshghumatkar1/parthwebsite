/**
 * Idempotent upsert for the LEGO Robotics Level 1 origin early work project.
 * Run: npm run db:upsert-lego-robotics-origin
 */

import { neon } from "@neondatabase/serverless";

const LEGO_ROBOTICS_ORIGIN = {
  title: "LEGO Robotics Level 1 — Early Obstacle-Avoiding Robot Car",
  slug: "lego-robotics-level-1-early-obstacle-avoiding-robot-car",
  shortDescription:
    "An early robotics learning project where Parth built and tested a simple obstacle-responding robot car during his Level 1 LEGO robotics course at around age 12.",
  fullDescription:
    "LEGO Robotics Level 1 — Early Obstacle-Avoiding Robot Car is one of the earliest visible proof points in Parth's technical journey. Created in June 2016, this project shows Parth experimenting with robotics at around age 12 during his early LEGO robotics learning.\n\nThe video shows a small robot car moving and changing direction when it encounters an obstacle. This was part of Parth's early structured robotics learning in Pune, where he later completed all three levels of LEGO Advanced Robotics.\n\nThis phase became the foundation for his later technical confidence. Through the robotics classes, Parth started learning the basics of electronics, coding, assembling, and problem-solving. Over time, he began getting his own ideas for robotics and Arduino projects. After a few months, he started learning independently at home, using Google and YouTube whenever he got stuck.\n\nThis project is included because it represents the starting point of the journey. It came before the drone work and much earlier than the later Arduino, IoT, Bluetooth, Alexa, GSM, relay-control, sensor, and automation projects.\n\nOrigin story: Parth's early interest started with the idea of making things himself. When some materials were not easily available, his father suggested that he should join a class where he could learn the basics of electronics properly. That led him to robotics classes in Pune, where he completed all three levels of LEGO Advanced Robotics. This structured learning gave him the confidence to later learn independently at home and build his own projects.\n\nThis project matters because it marks the earliest visible stage of Parth's builder journey. At around age 12, he was already learning through hands-on robotics experiments. The LEGO robotics course gave him a structured foundation, but the important shift came later when he started applying that learning independently at home. This early phase explains how his later drone, Arduino, IoT, Bluetooth, Alexa, GSM, and automation projects became possible.\n\nThe video is titled \"Parth experimenting Robotics June 2016- Level 1 Lego course.\"\n\nThis project is documented through an early video/demo rather than a public code repository.",
  projectType: "other",
  projectPhase: "early_work",
  status: "archived",
  industry: "education_learning",
  domains: ["robotics_drones", "iot_hardware", "other"],
  featuredOnHome: false,
  featuredOnAbout: false,
  displayOrder: 260,
  techStack: [
    "LEGO Robotics",
    "Robot Car",
    "Obstacle Avoidance",
    "Robotics Learning",
    "STEM",
    "Hands-On Experiment",
    "Early Robotics",
    "Video-Demonstrated Project",
    "Foundation Learning",
    "Electronics Basics",
    "Learning Journey",
  ],
  problemSolved:
    "The project explored how a small robot car could respond to obstacles through basic robotics learning and experimentation.",
  whatItDoes:
    "The robot car moves and appears to turn when it detects an obstacle, demonstrating early hands-on learning in robotics behavior and motion control.",
  parthRole:
    "Parth built and tested the robot car as part of his early LEGO robotics learning and documented the experiment on video.",
  githubUrl: null,
  demoUrl: null,
  videoUrl: "https://www.youtube.com/shorts/adURpcXCmcI",
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
    WHERE slug = ${LEGO_ROBOTICS_ORIGIN.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${LEGO_ROBOTICS_ORIGIN.title},
        short_description = ${LEGO_ROBOTICS_ORIGIN.shortDescription},
        full_description = ${LEGO_ROBOTICS_ORIGIN.fullDescription},
        project_type = ${LEGO_ROBOTICS_ORIGIN.projectType},
        project_phase = ${LEGO_ROBOTICS_ORIGIN.projectPhase},
        status = ${LEGO_ROBOTICS_ORIGIN.status},
        industry = ${LEGO_ROBOTICS_ORIGIN.industry},
        domains = ${LEGO_ROBOTICS_ORIGIN.domains}::project_domain[],
        featured_on_home = ${LEGO_ROBOTICS_ORIGIN.featuredOnHome},
        featured_on_about = ${LEGO_ROBOTICS_ORIGIN.featuredOnAbout},
        display_order = ${LEGO_ROBOTICS_ORIGIN.displayOrder},
        tech_stack = ${LEGO_ROBOTICS_ORIGIN.techStack},
        problem_solved = ${LEGO_ROBOTICS_ORIGIN.problemSolved},
        what_it_does = ${LEGO_ROBOTICS_ORIGIN.whatItDoes},
        parth_role = ${LEGO_ROBOTICS_ORIGIN.parthRole},
        github_url = ${LEGO_ROBOTICS_ORIGIN.githubUrl},
        demo_url = ${LEGO_ROBOTICS_ORIGIN.demoUrl},
        video_url = ${LEGO_ROBOTICS_ORIGIN.videoUrl},
        pdf_download_url = ${LEGO_ROBOTICS_ORIGIN.pdfDownloadUrl},
        published = ${LEGO_ROBOTICS_ORIGIN.published},
        hidden = ${LEGO_ROBOTICS_ORIGIN.hidden},
        archived = ${LEGO_ROBOTICS_ORIGIN.archived},
        updated_at = NOW()
      WHERE slug = ${LEGO_ROBOTICS_ORIGIN.slug}
    `;
    console.log(
      `Updated existing LEGO Robotics Level 1 project (${row.id}).`,
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
        ${LEGO_ROBOTICS_ORIGIN.title},
        ${LEGO_ROBOTICS_ORIGIN.slug},
        ${LEGO_ROBOTICS_ORIGIN.shortDescription},
        ${LEGO_ROBOTICS_ORIGIN.fullDescription},
        ${LEGO_ROBOTICS_ORIGIN.projectType},
        ${LEGO_ROBOTICS_ORIGIN.projectPhase},
        ${LEGO_ROBOTICS_ORIGIN.status},
        ${LEGO_ROBOTICS_ORIGIN.industry},
        ${LEGO_ROBOTICS_ORIGIN.domains}::project_domain[],
        ${LEGO_ROBOTICS_ORIGIN.featuredOnHome},
        ${LEGO_ROBOTICS_ORIGIN.featuredOnAbout},
        ${LEGO_ROBOTICS_ORIGIN.displayOrder},
        ${LEGO_ROBOTICS_ORIGIN.techStack},
        ${LEGO_ROBOTICS_ORIGIN.problemSolved},
        ${LEGO_ROBOTICS_ORIGIN.whatItDoes},
        ${LEGO_ROBOTICS_ORIGIN.parthRole},
        ${LEGO_ROBOTICS_ORIGIN.githubUrl},
        ${LEGO_ROBOTICS_ORIGIN.demoUrl},
        ${LEGO_ROBOTICS_ORIGIN.videoUrl},
        ${LEGO_ROBOTICS_ORIGIN.pdfDownloadUrl},
        ${LEGO_ROBOTICS_ORIGIN.published},
        ${LEGO_ROBOTICS_ORIGIN.hidden},
        ${LEGO_ROBOTICS_ORIGIN.archived}
      )
      RETURNING id, slug
    `;
    console.log(
      `Inserted LEGO Robotics Level 1 project (${inserted[0]?.id}).`,
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
    WHERE slug = ${LEGO_ROBOTICS_ORIGIN.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
