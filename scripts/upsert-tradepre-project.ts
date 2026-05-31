/**
 * Idempotent upsert for the TradePre current project record.
 * Run: npm run db:upsert-tradepre
 */

import { neon } from "@neondatabase/serverless";

const TRADEPRE = {
  title: "TradePre",
  slug: "tradepre",
  shortDescription:
    "ML-powered trading prediction system for Indian stocks using technical indicators, ensemble models, backtesting, and an LLM synthesis layer.",
  fullDescription:
    "TradePre is a desktop-based trading prediction system that collects OHLCV data, engineers technical indicators, creates R1-before-S1 labels, trains multiple machine learning models, validates predictions with walk-forward backtesting, and runs a daily prediction workflow. It also includes a Claude/LLM synthesis layer and a Flet desktop interface for setup, training, and signal review.",
  projectType: "ai_system",
  projectPhase: "current_work",
  status: "active",
  industry: "finance_trading",
  domains: [
    "trading_prediction_systems",
    "ai_systems",
    "data_platforms",
  ],
  featuredOnHome: true,
  featuredOnAbout: true,
  displayOrder: 30,
  techStack: [
    "Python",
    "XGBoost",
    "scikit-learn",
    "Pandas",
    "Kite Connect",
    "Flet",
    "Claude / LLM",
    "Backtesting",
  ],
  problemSolved:
    "Traders and analysts need a structured way to test whether price is more likely to hit bullish or bearish pivot levels first, instead of relying only on manual chart reading or untested assumptions.",
  whatItDoes:
    "Collects market data, builds technical features, labels historical outcomes, trains ensemble ML models, backtests predictions, runs daily prediction workflows, and presents signals through a desktop interface.",
  parthRole:
    "Built as a hands-on AI/ML trading system project, covering workflow design, Python implementation, model pipeline, backtesting logic, desktop interface, and iterative testing.",
  githubUrl: "https://github.com/ParthGhumatkar/Tradepre",
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
    WHERE slug = ${TRADEPRE.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${TRADEPRE.title},
        short_description = ${TRADEPRE.shortDescription},
        full_description = ${TRADEPRE.fullDescription},
        project_type = ${TRADEPRE.projectType},
        project_phase = ${TRADEPRE.projectPhase},
        status = ${TRADEPRE.status},
        industry = ${TRADEPRE.industry},
        domains = ${TRADEPRE.domains}::project_domain[],
        featured_on_home = ${TRADEPRE.featuredOnHome},
        featured_on_about = ${TRADEPRE.featuredOnAbout},
        display_order = ${TRADEPRE.displayOrder},
        tech_stack = ${TRADEPRE.techStack},
        problem_solved = ${TRADEPRE.problemSolved},
        what_it_does = ${TRADEPRE.whatItDoes},
        parth_role = ${TRADEPRE.parthRole},
        github_url = ${TRADEPRE.githubUrl},
        demo_url = ${TRADEPRE.demoUrl},
        video_url = ${TRADEPRE.videoUrl},
        pdf_download_url = ${TRADEPRE.pdfDownloadUrl},
        published = ${TRADEPRE.published},
        hidden = ${TRADEPRE.hidden},
        archived = ${TRADEPRE.archived},
        updated_at = NOW()
      WHERE slug = ${TRADEPRE.slug}
    `;
    console.log(`Updated existing TradePre project (${row.id}).`);
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
        ${TRADEPRE.title},
        ${TRADEPRE.slug},
        ${TRADEPRE.shortDescription},
        ${TRADEPRE.fullDescription},
        ${TRADEPRE.projectType},
        ${TRADEPRE.projectPhase},
        ${TRADEPRE.status},
        ${TRADEPRE.industry},
        ${TRADEPRE.domains}::project_domain[],
        ${TRADEPRE.featuredOnHome},
        ${TRADEPRE.featuredOnAbout},
        ${TRADEPRE.displayOrder},
        ${TRADEPRE.techStack},
        ${TRADEPRE.problemSolved},
        ${TRADEPRE.whatItDoes},
        ${TRADEPRE.parthRole},
        ${TRADEPRE.githubUrl},
        ${TRADEPRE.demoUrl},
        ${TRADEPRE.videoUrl},
        ${TRADEPRE.pdfDownloadUrl},
        ${TRADEPRE.published},
        ${TRADEPRE.hidden},
        ${TRADEPRE.archived}
      )
      RETURNING id, slug
    `;
    console.log(`Inserted TradePre project (${inserted[0]?.id}).`);
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
    WHERE slug = ${TRADEPRE.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
