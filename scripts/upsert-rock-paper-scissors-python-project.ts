/**
 * Idempotent upsert for the Rock Paper Scissors early Python console game.
 * Run: npm run db:upsert-rock-paper-scissors-python
 */

import { neon } from "@neondatabase/serverless";

const ROCK_PAPER_SCISSORS_PYTHON = {
  title: "Rock Paper Scissors — Early Python Console Game",
  slug: "rock-paper-scissors-early-python-console-game",
  shortDescription:
    "An early Python console game where Parth practised random choices, user input, loops, and conditional game-rule logic.",
  fullDescription:
    "Rock Paper Scissors was an early Python learning project from 2018. The program lets the user choose rock, paper, or scissors, randomly selects the computer's move, compares both choices, and prints whether the user wins, loses, or ties. This project is simple, but it is useful in the Early Work archive because it shows Parth practising programming fundamentals before his later Arduino, automation, and Python game-hacking projects. This project helps show the foundation of Parth's programming journey. It shows early Python learning in 2018 and supports the broader growth story from basic console logic to hardware automation and later Python desktop/game automation.",
  projectType: "other",
  projectPhase: "early_work",
  status: "archived",
  industry: "education_learning",
  domains: ["other", "workflow_automation"],
  featuredOnHome: false,
  featuredOnAbout: false,
  displayOrder: 334,
  techStack: [
    "Python",
    "Random Module",
    "User Input",
    "Loops",
    "Conditionals",
    "Console Game",
    "Programming Fundamentals",
  ],
  problemSolved:
    "The project was a learning exercise focused on building a small playable program. It helped practise how Python can process user input, generate random computer choices, apply game rules, and continue running until the user exits.",
  whatItDoes:
    "The script asks the user to choose rock, paper, scissors, or quit. It randomly chooses the computer's move, applies the standard game rules, prints the result, and repeats until the user enters quit.",
  parthRole:
    "Parth wrote the Python console-game logic using random selection, user input, loops, lowercase handling, and conditional decision-making.",
  githubUrl:
    "https://github.com/ParthGhumatkar/Rock-Paper-Scissors-Game/blob/master/Rock-Paper-Scissors%20game.py",
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
    WHERE slug = ${ROCK_PAPER_SCISSORS_PYTHON.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${ROCK_PAPER_SCISSORS_PYTHON.title},
        short_description = ${ROCK_PAPER_SCISSORS_PYTHON.shortDescription},
        full_description = ${ROCK_PAPER_SCISSORS_PYTHON.fullDescription},
        project_type = ${ROCK_PAPER_SCISSORS_PYTHON.projectType},
        project_phase = ${ROCK_PAPER_SCISSORS_PYTHON.projectPhase},
        status = ${ROCK_PAPER_SCISSORS_PYTHON.status},
        industry = ${ROCK_PAPER_SCISSORS_PYTHON.industry},
        domains = ${ROCK_PAPER_SCISSORS_PYTHON.domains}::project_domain[],
        featured_on_home = ${ROCK_PAPER_SCISSORS_PYTHON.featuredOnHome},
        featured_on_about = ${ROCK_PAPER_SCISSORS_PYTHON.featuredOnAbout},
        display_order = ${ROCK_PAPER_SCISSORS_PYTHON.displayOrder},
        tech_stack = ${ROCK_PAPER_SCISSORS_PYTHON.techStack},
        problem_solved = ${ROCK_PAPER_SCISSORS_PYTHON.problemSolved},
        what_it_does = ${ROCK_PAPER_SCISSORS_PYTHON.whatItDoes},
        parth_role = ${ROCK_PAPER_SCISSORS_PYTHON.parthRole},
        github_url = ${ROCK_PAPER_SCISSORS_PYTHON.githubUrl},
        demo_url = ${ROCK_PAPER_SCISSORS_PYTHON.demoUrl},
        video_url = ${ROCK_PAPER_SCISSORS_PYTHON.videoUrl},
        pdf_download_url = ${ROCK_PAPER_SCISSORS_PYTHON.pdfDownloadUrl},
        published = ${ROCK_PAPER_SCISSORS_PYTHON.published},
        hidden = ${ROCK_PAPER_SCISSORS_PYTHON.hidden},
        archived = ${ROCK_PAPER_SCISSORS_PYTHON.archived},
        updated_at = NOW()
      WHERE slug = ${ROCK_PAPER_SCISSORS_PYTHON.slug}
    `;
    console.log(
      `Updated existing Rock Paper Scissors Python project (${row.id}).`,
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
        ${ROCK_PAPER_SCISSORS_PYTHON.title},
        ${ROCK_PAPER_SCISSORS_PYTHON.slug},
        ${ROCK_PAPER_SCISSORS_PYTHON.shortDescription},
        ${ROCK_PAPER_SCISSORS_PYTHON.fullDescription},
        ${ROCK_PAPER_SCISSORS_PYTHON.projectType},
        ${ROCK_PAPER_SCISSORS_PYTHON.projectPhase},
        ${ROCK_PAPER_SCISSORS_PYTHON.status},
        ${ROCK_PAPER_SCISSORS_PYTHON.industry},
        ${ROCK_PAPER_SCISSORS_PYTHON.domains}::project_domain[],
        ${ROCK_PAPER_SCISSORS_PYTHON.featuredOnHome},
        ${ROCK_PAPER_SCISSORS_PYTHON.featuredOnAbout},
        ${ROCK_PAPER_SCISSORS_PYTHON.displayOrder},
        ${ROCK_PAPER_SCISSORS_PYTHON.techStack},
        ${ROCK_PAPER_SCISSORS_PYTHON.problemSolved},
        ${ROCK_PAPER_SCISSORS_PYTHON.whatItDoes},
        ${ROCK_PAPER_SCISSORS_PYTHON.parthRole},
        ${ROCK_PAPER_SCISSORS_PYTHON.githubUrl},
        ${ROCK_PAPER_SCISSORS_PYTHON.demoUrl},
        ${ROCK_PAPER_SCISSORS_PYTHON.videoUrl},
        ${ROCK_PAPER_SCISSORS_PYTHON.pdfDownloadUrl},
        ${ROCK_PAPER_SCISSORS_PYTHON.published},
        ${ROCK_PAPER_SCISSORS_PYTHON.hidden},
        ${ROCK_PAPER_SCISSORS_PYTHON.archived}
      )
      RETURNING id, slug
    `;
    console.log(
      `Inserted Rock Paper Scissors Python project (${inserted[0]?.id}).`,
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
    WHERE slug = ${ROCK_PAPER_SCISSORS_PYTHON.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
