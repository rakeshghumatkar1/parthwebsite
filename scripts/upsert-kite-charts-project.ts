/**
 * Idempotent upsert for the Kite Charts current project record.
 * Run: npm run db:upsert-kite-charts
 */

import { neon } from "@neondatabase/serverless";

const KITE_CHARTS = {
  title: "Kite Charts",
  slug: "kite-charts",
  shortDescription:
    "Next.js trading dashboard that uses Kite Connect data and lightweight charts to display watchlists, timeframes, market status, and technical indicators.",
  fullDescription:
    "Kite Charts is a Next.js trading-dashboard project built around market-data visualization. It uses Kite Connect and lightweight charting to display a watchlist, multi-timeframe views, current price metadata, market status, and technical indicators such as SMA, EMA, Bollinger Bands, VWAP, RSI, and MACD. The project should be presented as a personal trading dashboard and data-visualization build, not as financial advice or a trading recommendation system.",
  projectType: "data_platform",
  projectPhase: "current_work",
  status: "active",
  industry: "finance_trading",
  domains: [
    "data_platforms",
    "reporting_dashboards",
    "trading_prediction_systems",
  ],
  featuredOnHome: true,
  featuredOnAbout: false,
  displayOrder: 50,
  techStack: [
    "Next.js",
    "React",
    "TypeScript",
    "Kite Connect",
    "lightweight-charts",
    "Tailwind CSS",
    "Vercel-style app structure",
  ],
  problemSolved:
    "Traders and market watchers often need a focused dashboard to review selected Indian stocks and indices with timeframes, market metadata, and technical indicators in one interface.",
  whatItDoes:
    "Displays a trading dashboard with a watchlist, selectable timeframes, current market metadata, live/closed/login-required status, and technical-indicator toggles for chart review.",
  parthRole:
    "Built as a hands-on market-data visualization project, covering Next.js implementation, chart integration, watchlist workflow, indicator controls, and trading-dashboard interface design.",
  githubUrl: "https://github.com/ParthGhumatkar/kite-charts",
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
    WHERE slug = ${KITE_CHARTS.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${KITE_CHARTS.title},
        short_description = ${KITE_CHARTS.shortDescription},
        full_description = ${KITE_CHARTS.fullDescription},
        project_type = ${KITE_CHARTS.projectType},
        project_phase = ${KITE_CHARTS.projectPhase},
        status = ${KITE_CHARTS.status},
        industry = ${KITE_CHARTS.industry},
        domains = ${KITE_CHARTS.domains}::project_domain[],
        featured_on_home = ${KITE_CHARTS.featuredOnHome},
        featured_on_about = ${KITE_CHARTS.featuredOnAbout},
        display_order = ${KITE_CHARTS.displayOrder},
        tech_stack = ${KITE_CHARTS.techStack},
        problem_solved = ${KITE_CHARTS.problemSolved},
        what_it_does = ${KITE_CHARTS.whatItDoes},
        parth_role = ${KITE_CHARTS.parthRole},
        github_url = ${KITE_CHARTS.githubUrl},
        demo_url = ${KITE_CHARTS.demoUrl},
        video_url = ${KITE_CHARTS.videoUrl},
        pdf_download_url = ${KITE_CHARTS.pdfDownloadUrl},
        published = ${KITE_CHARTS.published},
        hidden = ${KITE_CHARTS.hidden},
        archived = ${KITE_CHARTS.archived},
        updated_at = NOW()
      WHERE slug = ${KITE_CHARTS.slug}
    `;
    console.log(`Updated existing Kite Charts project (${row.id}).`);
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
        ${KITE_CHARTS.title},
        ${KITE_CHARTS.slug},
        ${KITE_CHARTS.shortDescription},
        ${KITE_CHARTS.fullDescription},
        ${KITE_CHARTS.projectType},
        ${KITE_CHARTS.projectPhase},
        ${KITE_CHARTS.status},
        ${KITE_CHARTS.industry},
        ${KITE_CHARTS.domains}::project_domain[],
        ${KITE_CHARTS.featuredOnHome},
        ${KITE_CHARTS.featuredOnAbout},
        ${KITE_CHARTS.displayOrder},
        ${KITE_CHARTS.techStack},
        ${KITE_CHARTS.problemSolved},
        ${KITE_CHARTS.whatItDoes},
        ${KITE_CHARTS.parthRole},
        ${KITE_CHARTS.githubUrl},
        ${KITE_CHARTS.demoUrl},
        ${KITE_CHARTS.videoUrl},
        ${KITE_CHARTS.pdfDownloadUrl},
        ${KITE_CHARTS.published},
        ${KITE_CHARTS.hidden},
        ${KITE_CHARTS.archived}
      )
      RETURNING id, slug
    `;
    console.log(`Inserted Kite Charts project (${inserted[0]?.id}).`);
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
    WHERE slug = ${KITE_CHARTS.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
