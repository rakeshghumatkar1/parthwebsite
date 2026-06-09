/**
 * Idempotent upsert for the Card Game early Python logic exercise.
 * Run: npm run db:upsert-card-game-python
 */

import { neon } from "@neondatabase/serverless";

const CARD_GAME_PYTHON = {
  title: "Card Game — Early Python Logic Exercise",
  slug: "card-game-early-python-logic-exercise",
  shortDescription:
    "An early Python console game that randomly selected cards, compared values, declared a winner, and allowed repeated play through user input.",
  fullDescription:
    "Card Game was an early Python learning project from 2018. The program randomly selected a card for the computer and a card for the user, compared their face values, declared a winner or tie, and allowed the game to continue until the user chose to exit. This project is simple, but it is useful in the Early Work archive because it shows Parth's early exposure to Python, randomness, loops, conditionals, lists, and console interaction. This project helps show the foundation of Parth's programming journey. It demonstrates that his early work was not limited to Arduino and hardware; he was also practising Python logic and small interactive programs in 2018.",
  projectType: "other",
  projectPhase: "early_work",
  status: "archived",
  industry: "education_learning",
  domains: ["other", "workflow_automation"],
  featuredOnHome: false,
  featuredOnAbout: false,
  displayOrder: 333,
  techStack: [
    "Python",
    "Random Module",
    "Lists",
    "Loops",
    "Conditionals",
    "User Input",
    "Console Game",
    "Programming Fundamentals",
  ],
  problemSolved:
    "The project was mainly a learning exercise: building a small playable program to understand how random selection, comparison logic, and repeated user interaction work in Python.",
  whatItDoes:
    "The script defines card suits and faces, randomly chooses cards for both sides, compares their ranks, prints the result, and asks the user whether to continue playing.",
  parthRole:
    "Parth wrote the Python console-game logic, including lists, random choices, conditional comparison, loop control, and user input handling.",
  githubUrl:
    "https://github.com/ParthGhumatkar/Card-game/blob/master/Card%20game.py",
  demoUrl: null,
  videoUrl: null,
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
    WHERE slug = ${CARD_GAME_PYTHON.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${CARD_GAME_PYTHON.title},
        short_description = ${CARD_GAME_PYTHON.shortDescription},
        full_description = ${CARD_GAME_PYTHON.fullDescription},
        project_type = ${CARD_GAME_PYTHON.projectType},
        project_phase = ${CARD_GAME_PYTHON.projectPhase},
        status = ${CARD_GAME_PYTHON.status},
        industry = ${CARD_GAME_PYTHON.industry},
        domains = ${CARD_GAME_PYTHON.domains}::project_domain[],
        featured_on_home = ${CARD_GAME_PYTHON.featuredOnHome},
        featured_on_about = ${CARD_GAME_PYTHON.featuredOnAbout},
        display_order = ${CARD_GAME_PYTHON.displayOrder},
        tech_stack = ${CARD_GAME_PYTHON.techStack},
        problem_solved = ${CARD_GAME_PYTHON.problemSolved},
        what_it_does = ${CARD_GAME_PYTHON.whatItDoes},
        parth_role = ${CARD_GAME_PYTHON.parthRole},
        github_url = ${CARD_GAME_PYTHON.githubUrl},
        demo_url = ${CARD_GAME_PYTHON.demoUrl},
        video_url = ${CARD_GAME_PYTHON.videoUrl},
        pdf_download_url = ${CARD_GAME_PYTHON.pdfDownloadUrl},
        published = ${CARD_GAME_PYTHON.published},
        hidden = ${CARD_GAME_PYTHON.hidden},
        archived = ${CARD_GAME_PYTHON.archived},
        updated_at = NOW()
      WHERE slug = ${CARD_GAME_PYTHON.slug}
    `;
    console.log(`Updated existing Card Game Python project (${row.id}).`);
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
        ${CARD_GAME_PYTHON.title},
        ${CARD_GAME_PYTHON.slug},
        ${CARD_GAME_PYTHON.shortDescription},
        ${CARD_GAME_PYTHON.fullDescription},
        ${CARD_GAME_PYTHON.projectType},
        ${CARD_GAME_PYTHON.projectPhase},
        ${CARD_GAME_PYTHON.status},
        ${CARD_GAME_PYTHON.industry},
        ${CARD_GAME_PYTHON.domains}::project_domain[],
        ${CARD_GAME_PYTHON.featuredOnHome},
        ${CARD_GAME_PYTHON.featuredOnAbout},
        ${CARD_GAME_PYTHON.displayOrder},
        ${CARD_GAME_PYTHON.techStack},
        ${CARD_GAME_PYTHON.problemSolved},
        ${CARD_GAME_PYTHON.whatItDoes},
        ${CARD_GAME_PYTHON.parthRole},
        ${CARD_GAME_PYTHON.githubUrl},
        ${CARD_GAME_PYTHON.demoUrl},
        ${CARD_GAME_PYTHON.videoUrl},
        ${CARD_GAME_PYTHON.pdfDownloadUrl},
        ${CARD_GAME_PYTHON.published},
        ${CARD_GAME_PYTHON.hidden},
        ${CARD_GAME_PYTHON.archived}
      )
      RETURNING id, slug
    `;
    console.log(`Inserted Card Game Python project (${inserted[0]?.id}).`);
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
    WHERE slug = ${CARD_GAME_PYTHON.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
