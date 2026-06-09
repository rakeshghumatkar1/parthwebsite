/**
 * Idempotent upsert for the Early Drone Assembly and Flight Tests project.
 * Run: npm run db:upsert-early-drone-flight-tests
 */

import { neon } from "@neondatabase/serverless";

const EARLY_DRONE_FLIGHT_TESTS = {
  title: "Early Drone Assembly and Flight Tests — Guided Robotics Project",
  slug: "early-drone-assembly-flight-tests-guided-robotics-project",
  shortDescription:
    "An early guided robotics project where Parth learned drone assembly, programming/configuration, and flight testing at the age of 13.",
  fullDescription:
    "Early Drone Assembly and Flight Tests was one of Parth's earliest robotics-related learning projects from 2017. At 13, Parth was learning how to assemble, configure, and fly a drone with the guidance of his teacher, Love Kushwah.\n\nThe first documented flying video was published on 12 August 2017 and shows the drone flying after earlier setup and troubleshooting. The video description mentions that the drone was made by Parth with teacher guidance, and that the first flight took time because of a faulty battery charger before it finally worked.\n\nA second video from September 2017 documents the drone flying after assembly and programming/configuration under teacher guidance.\n\nThis project is included because it shows Parth's early hands-on exposure to robotics and physical systems before his later Arduino, IoT, relay-control, Bluetooth, Alexa, and sensor-based projects.\n\nThis project matters because it shows where Parth's hands-on technical journey started. Before the later independent Arduino and IoT builds, he was already learning through real hardware, flight testing, troubleshooting, and guided robotics practice. It helps explain the progression from early robotics exposure into later self-driven electronics and automation projects.\n\nSupporting video: Drone flying after assembly/programming under teacher guidance — https://www.youtube.com/watch?v=beosK7MXhWs\n\nThis project is documented through working video demos rather than a public code repository.",
  projectType: "other",
  projectPhase: "early_work",
  status: "archived",
  industry: "education_learning",
  domains: ["robotics_drones", "iot_hardware", "other"],
  featuredOnHome: false,
  featuredOnAbout: false,
  displayOrder: 265,
  techStack: [
    "Drone",
    "Robotics",
    "Drone Assembly",
    "Flight Test",
    "Programming Configuration",
    "Teacher-Guided Learning",
    "Troubleshooting",
    "Hardware Learning",
    "Early Robotics",
    "Video-Demonstrated Project",
  ],
  problemSolved:
    "The project was a guided learning exercise focused on understanding how a drone is assembled, configured, troubleshot, and tested for flight.",
  whatItDoes:
    "The project demonstrates a drone flying after assembly and programming/configuration. It documents Parth's early exposure to robotics hardware, flight testing, and hands-on technical learning.",
  parthRole:
    "Parth participated in drone assembly, programming/configuration, troubleshooting, and flight testing under teacher guidance. The project was documented through public YouTube videos showing the drone flying.",
  githubUrl: null,
  demoUrl: null,
  videoUrl: "https://www.youtube.com/watch?v=RHldiWpA9Gw",
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
    WHERE slug = ${EARLY_DRONE_FLIGHT_TESTS.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${EARLY_DRONE_FLIGHT_TESTS.title},
        short_description = ${EARLY_DRONE_FLIGHT_TESTS.shortDescription},
        full_description = ${EARLY_DRONE_FLIGHT_TESTS.fullDescription},
        project_type = ${EARLY_DRONE_FLIGHT_TESTS.projectType},
        project_phase = ${EARLY_DRONE_FLIGHT_TESTS.projectPhase},
        status = ${EARLY_DRONE_FLIGHT_TESTS.status},
        industry = ${EARLY_DRONE_FLIGHT_TESTS.industry},
        domains = ${EARLY_DRONE_FLIGHT_TESTS.domains}::project_domain[],
        featured_on_home = ${EARLY_DRONE_FLIGHT_TESTS.featuredOnHome},
        featured_on_about = ${EARLY_DRONE_FLIGHT_TESTS.featuredOnAbout},
        display_order = ${EARLY_DRONE_FLIGHT_TESTS.displayOrder},
        tech_stack = ${EARLY_DRONE_FLIGHT_TESTS.techStack},
        problem_solved = ${EARLY_DRONE_FLIGHT_TESTS.problemSolved},
        what_it_does = ${EARLY_DRONE_FLIGHT_TESTS.whatItDoes},
        parth_role = ${EARLY_DRONE_FLIGHT_TESTS.parthRole},
        github_url = ${EARLY_DRONE_FLIGHT_TESTS.githubUrl},
        demo_url = ${EARLY_DRONE_FLIGHT_TESTS.demoUrl},
        video_url = ${EARLY_DRONE_FLIGHT_TESTS.videoUrl},
        pdf_download_url = ${EARLY_DRONE_FLIGHT_TESTS.pdfDownloadUrl},
        published = ${EARLY_DRONE_FLIGHT_TESTS.published},
        hidden = ${EARLY_DRONE_FLIGHT_TESTS.hidden},
        archived = ${EARLY_DRONE_FLIGHT_TESTS.archived},
        updated_at = NOW()
      WHERE slug = ${EARLY_DRONE_FLIGHT_TESTS.slug}
    `;
    console.log(
      `Updated existing Early Drone Assembly and Flight Tests project (${row.id}).`,
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
        ${EARLY_DRONE_FLIGHT_TESTS.title},
        ${EARLY_DRONE_FLIGHT_TESTS.slug},
        ${EARLY_DRONE_FLIGHT_TESTS.shortDescription},
        ${EARLY_DRONE_FLIGHT_TESTS.fullDescription},
        ${EARLY_DRONE_FLIGHT_TESTS.projectType},
        ${EARLY_DRONE_FLIGHT_TESTS.projectPhase},
        ${EARLY_DRONE_FLIGHT_TESTS.status},
        ${EARLY_DRONE_FLIGHT_TESTS.industry},
        ${EARLY_DRONE_FLIGHT_TESTS.domains}::project_domain[],
        ${EARLY_DRONE_FLIGHT_TESTS.featuredOnHome},
        ${EARLY_DRONE_FLIGHT_TESTS.featuredOnAbout},
        ${EARLY_DRONE_FLIGHT_TESTS.displayOrder},
        ${EARLY_DRONE_FLIGHT_TESTS.techStack},
        ${EARLY_DRONE_FLIGHT_TESTS.problemSolved},
        ${EARLY_DRONE_FLIGHT_TESTS.whatItDoes},
        ${EARLY_DRONE_FLIGHT_TESTS.parthRole},
        ${EARLY_DRONE_FLIGHT_TESTS.githubUrl},
        ${EARLY_DRONE_FLIGHT_TESTS.demoUrl},
        ${EARLY_DRONE_FLIGHT_TESTS.videoUrl},
        ${EARLY_DRONE_FLIGHT_TESTS.pdfDownloadUrl},
        ${EARLY_DRONE_FLIGHT_TESTS.published},
        ${EARLY_DRONE_FLIGHT_TESTS.hidden},
        ${EARLY_DRONE_FLIGHT_TESTS.archived}
      )
      RETURNING id, slug
    `;
    console.log(
      `Inserted Early Drone Assembly and Flight Tests project (${inserted[0]?.id}).`,
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
    WHERE slug = ${EARLY_DRONE_FLIGHT_TESTS.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
