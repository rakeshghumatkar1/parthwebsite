/**
 * Idempotent upsert for the Robotic Arm Aarti for Ganpati early work project.
 * Run: npm run db:upsert-robotic-arm-aarti-ganpati
 */

import { neon } from "@neondatabase/serverless";

const ROBOTIC_ARM_AARTI_GANPATI = {
  title: "Robotic Arm Aarti for Ganpati — Tradition Meets Robotics",
  slug: "robotic-arm-aarti-for-ganpati-tradition-meets-robotics",
  shortDescription:
    "A creative early robotics project where Parth used a robotic arm and Arduino Mega to perform aarti/prayer movement in front of Ganpati during a festival setting.",
  fullDescription:
    "Robotic Arm Aarti for Ganpati was one of Parth's most creative early projects. Built in 2018, the project used a robotic arm kit, Arduino Mega, wires, and a power bank to create a working setup in which the robotic arm performed aarti/prayer movement in front of Ganpati. The video and screenshots show the robotic arm operating in a real festive setting, with the lamp movement positioned as part of a traditional devotional ritual. This project is important because it shows a different dimension of Parth's engineering mindset: he was not only solving practical automation problems, but also using robotics to creatively connect technology with culture, celebration, and lived tradition. This project shows that Parth was applying technology naturally in real life. He used his technical curiosity not only for utility, but also for family traditions, festivals, and meaningful cultural experiences. This project matters because it shows originality, confidence, and the ability to apply engineering beyond textbook use cases. It reflects how Parth used technology not only for utility or efficiency, but also to connect with family traditions, culture, and real-life celebrations. It is a strong example of creativity combined with execution. This project is documented through a working video demo rather than a public code repository.",
  projectType: "automation",
  projectPhase: "early_work",
  status: "archived",
  industry: "education_learning",
  domains: [
    "robotics_drones",
    "iot_hardware",
    "other",
  ],
  featuredOnHome: false,
  featuredOnAbout: false,
  displayOrder: 281,
  techStack: [
    "Robotic Arm",
    "Arduino Mega",
    "Power Bank",
    "Wires",
    "Hardware Control",
    "Festival Innovation",
    "Creative Robotics",
    "Interactive Automation",
    "Cultural Technology",
    "Tradition with Technology",
  ],
  problemSolved:
    "The project explored how a robotic system could be used to perform a repetitive ritual movement in a controlled way during a festive or devotional setting.",
  whatItDoes:
    "The setup uses a robotic arm kit controlled through Arduino Mega to move a lit aarti/niranjan in front of the Ganpati idol, demonstrating a robotics-based interpretation of a traditional prayer movement.",
  parthRole:
    "Parth created the idea, assembled the robotics setup, connected and controlled the hardware using Arduino Mega, and demonstrated the working result on video.",
  githubUrl: null,
  demoUrl: null,
  videoUrl: "https://www.youtube.com/watch?v=4ZPQ9KFTB5M",
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
    WHERE slug = ${ROBOTIC_ARM_AARTI_GANPATI.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${ROBOTIC_ARM_AARTI_GANPATI.title},
        short_description = ${ROBOTIC_ARM_AARTI_GANPATI.shortDescription},
        full_description = ${ROBOTIC_ARM_AARTI_GANPATI.fullDescription},
        project_type = ${ROBOTIC_ARM_AARTI_GANPATI.projectType},
        project_phase = ${ROBOTIC_ARM_AARTI_GANPATI.projectPhase},
        status = ${ROBOTIC_ARM_AARTI_GANPATI.status},
        industry = ${ROBOTIC_ARM_AARTI_GANPATI.industry},
        domains = ${ROBOTIC_ARM_AARTI_GANPATI.domains}::project_domain[],
        featured_on_home = ${ROBOTIC_ARM_AARTI_GANPATI.featuredOnHome},
        featured_on_about = ${ROBOTIC_ARM_AARTI_GANPATI.featuredOnAbout},
        display_order = ${ROBOTIC_ARM_AARTI_GANPATI.displayOrder},
        tech_stack = ${ROBOTIC_ARM_AARTI_GANPATI.techStack},
        problem_solved = ${ROBOTIC_ARM_AARTI_GANPATI.problemSolved},
        what_it_does = ${ROBOTIC_ARM_AARTI_GANPATI.whatItDoes},
        parth_role = ${ROBOTIC_ARM_AARTI_GANPATI.parthRole},
        github_url = ${ROBOTIC_ARM_AARTI_GANPATI.githubUrl},
        demo_url = ${ROBOTIC_ARM_AARTI_GANPATI.demoUrl},
        video_url = ${ROBOTIC_ARM_AARTI_GANPATI.videoUrl},
        pdf_download_url = ${ROBOTIC_ARM_AARTI_GANPATI.pdfDownloadUrl},
        published = ${ROBOTIC_ARM_AARTI_GANPATI.published},
        hidden = ${ROBOTIC_ARM_AARTI_GANPATI.hidden},
        archived = ${ROBOTIC_ARM_AARTI_GANPATI.archived},
        updated_at = NOW()
      WHERE slug = ${ROBOTIC_ARM_AARTI_GANPATI.slug}
    `;
    console.log(
      `Updated existing Robotic Arm Aarti Ganpati project (${row.id}).`,
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
        ${ROBOTIC_ARM_AARTI_GANPATI.title},
        ${ROBOTIC_ARM_AARTI_GANPATI.slug},
        ${ROBOTIC_ARM_AARTI_GANPATI.shortDescription},
        ${ROBOTIC_ARM_AARTI_GANPATI.fullDescription},
        ${ROBOTIC_ARM_AARTI_GANPATI.projectType},
        ${ROBOTIC_ARM_AARTI_GANPATI.projectPhase},
        ${ROBOTIC_ARM_AARTI_GANPATI.status},
        ${ROBOTIC_ARM_AARTI_GANPATI.industry},
        ${ROBOTIC_ARM_AARTI_GANPATI.domains}::project_domain[],
        ${ROBOTIC_ARM_AARTI_GANPATI.featuredOnHome},
        ${ROBOTIC_ARM_AARTI_GANPATI.featuredOnAbout},
        ${ROBOTIC_ARM_AARTI_GANPATI.displayOrder},
        ${ROBOTIC_ARM_AARTI_GANPATI.techStack},
        ${ROBOTIC_ARM_AARTI_GANPATI.problemSolved},
        ${ROBOTIC_ARM_AARTI_GANPATI.whatItDoes},
        ${ROBOTIC_ARM_AARTI_GANPATI.parthRole},
        ${ROBOTIC_ARM_AARTI_GANPATI.githubUrl},
        ${ROBOTIC_ARM_AARTI_GANPATI.demoUrl},
        ${ROBOTIC_ARM_AARTI_GANPATI.videoUrl},
        ${ROBOTIC_ARM_AARTI_GANPATI.pdfDownloadUrl},
        ${ROBOTIC_ARM_AARTI_GANPATI.published},
        ${ROBOTIC_ARM_AARTI_GANPATI.hidden},
        ${ROBOTIC_ARM_AARTI_GANPATI.archived}
      )
      RETURNING id, slug
    `;
    console.log(
      `Inserted Robotic Arm Aarti Ganpati project (${inserted[0]?.id}).`,
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
    WHERE slug = ${ROBOTIC_ARM_AARTI_GANPATI.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
