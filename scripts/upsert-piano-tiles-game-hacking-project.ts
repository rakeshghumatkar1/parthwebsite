/**
 * Idempotent upsert for the Piano Tiles Game Hacking early work project.
 * Run: npm run db:upsert-piano-tiles-game-hacking
 */

import { neon } from "@neondatabase/serverless";

const PIANO_TILES_GAME_HACKING = {
  title: "Piano Tiles Game Hacking — Python Auto-Click Prototype",
  slug: "piano-tiles-game-hacking-python-auto-click-prototype",
  shortDescription:
    "An early Python game-hacking experiment that used screen pixel detection and automated mouse clicks to play Piano Tiles.",
  fullDescription:
    "Piano Tiles Game Hacking was an early Python automation experiment from 2021 built around a simple gaming problem: Parth had started playing Piano Tiles and realized he was not very good at the game. Instead of only practising manually, he explored whether code could detect the black tiles and click them automatically. The project used Python desktop automation libraries to read pixel colours from the screen and trigger mouse clicks at the right positions. The word \"hacking\" here should be understood in the maker sense: finding creative gaps, experimenting with software automation, and learning how code can interact with real games on screen. This was maker-style game hacking and desktop automation — not cheating, bypassing security, or malicious hacking. This project is useful because it shows a different side of Parth's early learning. He was not limited to Arduino and C-style hardware projects. He was also exploring Python, desktop automation, screen reading, mouse control, and game interaction. It reflects a maker-style hacking mindset: seeing a gap, testing whether software can solve it, and moving into a new language and toolset to make the idea work. It also shows how Parth's gaming interest became a path into Python automation.",
  projectType: "automation",
  projectPhase: "early_work",
  status: "archived",
  industry: "education_learning",
  domains: ["workflow_automation", "other"],
  featuredOnHome: false,
  featuredOnAbout: false,
  displayOrder: 319,
  techStack: [
    "Python",
    "PyAutoGUI",
    "Keyboard",
    "Win32API",
    "Mouse Automation",
    "Pixel Detection",
    "Game Automation",
    "Auto Clicker",
    "Desktop Automation",
    "Maker Hacking",
  ],
  problemSolved:
    "The project explored whether a repetitive visual game could be automated by detecting screen pixels and clicking the correct areas faster and more consistently than a human player.",
  whatItDoes:
    "The Python script checks specific screen coordinates where Piano Tiles lanes appear. If a pixel at one of those positions is black, the script triggers a mouse click at that coordinate. The loop continues until the escape key is pressed.",
  parthRole:
    "Parth wrote the Python automation script, used pixel detection to identify black tiles, mapped screen coordinates to click positions, and connected visual detection with automated mouse input.",
  githubUrl:
    "https://github.com/ParthGhumatkar/PIANO-TILES-HACK-USING-PYTHON/blob/main/hackgame.py",
  demoUrl: null,
  videoUrl: "https://www.youtube.com/watch?v=1Z_ygTjK-Gc",
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
    WHERE slug = ${PIANO_TILES_GAME_HACKING.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${PIANO_TILES_GAME_HACKING.title},
        short_description = ${PIANO_TILES_GAME_HACKING.shortDescription},
        full_description = ${PIANO_TILES_GAME_HACKING.fullDescription},
        project_type = ${PIANO_TILES_GAME_HACKING.projectType},
        project_phase = ${PIANO_TILES_GAME_HACKING.projectPhase},
        status = ${PIANO_TILES_GAME_HACKING.status},
        industry = ${PIANO_TILES_GAME_HACKING.industry},
        domains = ${PIANO_TILES_GAME_HACKING.domains}::project_domain[],
        featured_on_home = ${PIANO_TILES_GAME_HACKING.featuredOnHome},
        featured_on_about = ${PIANO_TILES_GAME_HACKING.featuredOnAbout},
        display_order = ${PIANO_TILES_GAME_HACKING.displayOrder},
        tech_stack = ${PIANO_TILES_GAME_HACKING.techStack},
        problem_solved = ${PIANO_TILES_GAME_HACKING.problemSolved},
        what_it_does = ${PIANO_TILES_GAME_HACKING.whatItDoes},
        parth_role = ${PIANO_TILES_GAME_HACKING.parthRole},
        github_url = ${PIANO_TILES_GAME_HACKING.githubUrl},
        demo_url = ${PIANO_TILES_GAME_HACKING.demoUrl},
        video_url = ${PIANO_TILES_GAME_HACKING.videoUrl},
        pdf_download_url = ${PIANO_TILES_GAME_HACKING.pdfDownloadUrl},
        published = ${PIANO_TILES_GAME_HACKING.published},
        hidden = ${PIANO_TILES_GAME_HACKING.hidden},
        archived = ${PIANO_TILES_GAME_HACKING.archived},
        updated_at = NOW()
      WHERE slug = ${PIANO_TILES_GAME_HACKING.slug}
    `;
    console.log(
      `Updated existing Piano Tiles Game Hacking project (${row.id}).`,
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
        ${PIANO_TILES_GAME_HACKING.title},
        ${PIANO_TILES_GAME_HACKING.slug},
        ${PIANO_TILES_GAME_HACKING.shortDescription},
        ${PIANO_TILES_GAME_HACKING.fullDescription},
        ${PIANO_TILES_GAME_HACKING.projectType},
        ${PIANO_TILES_GAME_HACKING.projectPhase},
        ${PIANO_TILES_GAME_HACKING.status},
        ${PIANO_TILES_GAME_HACKING.industry},
        ${PIANO_TILES_GAME_HACKING.domains}::project_domain[],
        ${PIANO_TILES_GAME_HACKING.featuredOnHome},
        ${PIANO_TILES_GAME_HACKING.featuredOnAbout},
        ${PIANO_TILES_GAME_HACKING.displayOrder},
        ${PIANO_TILES_GAME_HACKING.techStack},
        ${PIANO_TILES_GAME_HACKING.problemSolved},
        ${PIANO_TILES_GAME_HACKING.whatItDoes},
        ${PIANO_TILES_GAME_HACKING.parthRole},
        ${PIANO_TILES_GAME_HACKING.githubUrl},
        ${PIANO_TILES_GAME_HACKING.demoUrl},
        ${PIANO_TILES_GAME_HACKING.videoUrl},
        ${PIANO_TILES_GAME_HACKING.pdfDownloadUrl},
        ${PIANO_TILES_GAME_HACKING.published},
        ${PIANO_TILES_GAME_HACKING.hidden},
        ${PIANO_TILES_GAME_HACKING.archived}
      )
      RETURNING id, slug
    `;
    console.log(
      `Inserted Piano Tiles Game Hacking project (${inserted[0]?.id}).`,
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
    WHERE slug = ${PIANO_TILES_GAME_HACKING.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
