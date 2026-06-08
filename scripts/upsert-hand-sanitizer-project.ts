/**
 * Idempotent upsert for the Automatic Hand Sanitizer Dispenser early work project.
 * Run: npm run db:upsert-hand-sanitizer
 */

import { neon } from "@neondatabase/serverless";

const HAND_SANITIZER = {
  title: "Automatic Hand Sanitizer Dispenser — COVID-19 Home Prototype",
  slug: "automatic-hand-sanitizer-dispenser-covid-19-home-prototype",
  shortDescription:
    "An early Arduino-based automatic hand sanitizer dispenser built during COVID lockdown to reduce hand contact with the sanitizer pump.",
  fullDescription:
    "Automatic Hand Sanitizer Dispenser was an early COVID-period hardware automation project from 2020 built at home. The problem was simple and practical: if many people touch the top of a sanitizer bottle, the dispenser surface itself can become a contact point. Parth built an automatic dispensing prototype from scratch using available spare parts at home. Because it was created during lockdown, the project was built under real constraints, without easy access to new spare parts. It was not designed to look sleek or commercial, but it was functional and used at home. This project is important because it connects coding and electronics to a real public-health problem from the COVID period. It also shows a builder's mindset under constraints: using whatever parts were available, accepting that the prototype may not look polished, but making it functional enough for home use.",
  projectType: "automation",
  projectPhase: "early_work",
  status: "archived",
  industry: "healthcare",
  domains: [
    "iot_hardware",
    "home_automation",
    "workflow_automation",
    "other",
  ],
  featuredOnHome: false,
  featuredOnAbout: false,
  displayOrder: 290,
  techStack: [
    "Arduino",
    "C++",
    "IR Sensor",
    "Digital Output Control",
    "Embedded Systems",
    "Hardware Automation",
    "Contactless Dispenser",
    "COVID-19 Project",
    "Home-built Prototype",
  ],
  problemSolved:
    "The project addressed a hygiene problem during the COVID period: reducing repeated hand contact with the sanitizer dispenser. Instead of pressing the bottle manually, the user could trigger dispensing automatically.",
  whatItDoes:
    "The system uses an IR sensor input to detect a hand or object near the dispenser. Based on the sensor state, Arduino switches output pins to activate the dispensing mechanism. The project demonstrates a simple contactless automation flow: detect presence, trigger dispensing, and stop when not needed.",
  parthRole:
    "Parth implemented the Arduino control logic, connected the IR-sensor-based trigger, used available household spare parts, and built the working dispenser prototype at home during lockdown. The project shows early practical experimentation with electronics, automation, and real-world problem-solving.",
  githubUrl:
    "https://github.com/ParthGhumatkar/Automatic-Hand-sanitizer-dispenser-Covid-19/blob/main/Covid-19ProjectCode.ino",
  demoUrl: null,
  videoUrl: "https://www.youtube.com/watch?v=9xN_c7dH8EA",
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
    WHERE slug = ${HAND_SANITIZER.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${HAND_SANITIZER.title},
        short_description = ${HAND_SANITIZER.shortDescription},
        full_description = ${HAND_SANITIZER.fullDescription},
        project_type = ${HAND_SANITIZER.projectType},
        project_phase = ${HAND_SANITIZER.projectPhase},
        status = ${HAND_SANITIZER.status},
        industry = ${HAND_SANITIZER.industry},
        domains = ${HAND_SANITIZER.domains}::project_domain[],
        featured_on_home = ${HAND_SANITIZER.featuredOnHome},
        featured_on_about = ${HAND_SANITIZER.featuredOnAbout},
        display_order = ${HAND_SANITIZER.displayOrder},
        tech_stack = ${HAND_SANITIZER.techStack},
        problem_solved = ${HAND_SANITIZER.problemSolved},
        what_it_does = ${HAND_SANITIZER.whatItDoes},
        parth_role = ${HAND_SANITIZER.parthRole},
        github_url = ${HAND_SANITIZER.githubUrl},
        demo_url = ${HAND_SANITIZER.demoUrl},
        video_url = ${HAND_SANITIZER.videoUrl},
        pdf_download_url = ${HAND_SANITIZER.pdfDownloadUrl},
        published = ${HAND_SANITIZER.published},
        hidden = ${HAND_SANITIZER.hidden},
        archived = ${HAND_SANITIZER.archived},
        updated_at = NOW()
      WHERE slug = ${HAND_SANITIZER.slug}
    `;
    console.log(`Updated existing Hand Sanitizer project (${row.id}).`);
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
        ${HAND_SANITIZER.title},
        ${HAND_SANITIZER.slug},
        ${HAND_SANITIZER.shortDescription},
        ${HAND_SANITIZER.fullDescription},
        ${HAND_SANITIZER.projectType},
        ${HAND_SANITIZER.projectPhase},
        ${HAND_SANITIZER.status},
        ${HAND_SANITIZER.industry},
        ${HAND_SANITIZER.domains}::project_domain[],
        ${HAND_SANITIZER.featuredOnHome},
        ${HAND_SANITIZER.featuredOnAbout},
        ${HAND_SANITIZER.displayOrder},
        ${HAND_SANITIZER.techStack},
        ${HAND_SANITIZER.problemSolved},
        ${HAND_SANITIZER.whatItDoes},
        ${HAND_SANITIZER.parthRole},
        ${HAND_SANITIZER.githubUrl},
        ${HAND_SANITIZER.demoUrl},
        ${HAND_SANITIZER.videoUrl},
        ${HAND_SANITIZER.pdfDownloadUrl},
        ${HAND_SANITIZER.published},
        ${HAND_SANITIZER.hidden},
        ${HAND_SANITIZER.archived}
      )
      RETURNING id, slug
    `;
    console.log(`Inserted Hand Sanitizer project (${inserted[0]?.id}).`);
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
    WHERE slug = ${HAND_SANITIZER.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
