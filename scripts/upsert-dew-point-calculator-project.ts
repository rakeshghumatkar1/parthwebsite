/**
 * Idempotent upsert for the Dew Point Calculator early work project.
 * Run: npm run db:upsert-dew-point-calculator
 */

import { neon } from "@neondatabase/serverless";

const DEW_POINT_CALCULATOR = {
  title: "Dew Point Calculator — Arduino DHT11 Sensor Prototype",
  slug: "dew-point-calculator-arduino-dht11-sensor-prototype",
  shortDescription:
    "An early Arduino environmental-sensor prototype that used DHT11 temperature and humidity readings to calculate and display dew point values.",
  fullDescription:
    "Dew Point Calculator was an early Arduino sensor project from 2018. The project used a DHT11 sensor to read temperature and humidity, then calculated dew point using a formula and displayed the result on an LCD. This project is useful in the Early Work archive because it shows Parth experimenting not only with hardware input/output, but also with sensor data and mathematical calculation. This project shows a different type of early learning: combining electronics with data interpretation. It adds variety to Parth's early work because it connects sensors, formulas, unit conversion, and display output.",
  projectType: "automation",
  projectPhase: "early_work",
  status: "archived",
  industry: "education_learning",
  domains: [
    "iot_hardware",
    "home_automation",
    "other",
  ],
  featuredOnHome: false,
  featuredOnAbout: false,
  displayOrder: 285,
  techStack: [
    "Arduino",
    "C++",
    "DHT11 Sensor",
    "Humidity Sensor",
    "Temperature Sensor",
    "Dew Point Calculation",
    "LCD Display",
    "Formula Logic",
    "Unit Conversion",
    "Embedded Systems",
  ],
  problemSolved:
    "The project explored how environmental readings such as temperature and humidity could be converted into a more useful calculated value: dew point.",
  whatItDoes:
    "The Arduino sketch reads humidity and temperature from a DHT11 sensor, checks whether the sensor reading is valid, calculates dew point, converts the dew point value from Celsius to Fahrenheit, and prints the result on an LCD.",
  parthRole:
    "Parth wrote the Arduino logic for reading sensor values, checking sensor errors, applying the dew point calculation, converting units, and displaying the result.",
  githubUrl:
    "https://github.com/ParthGhumatkar/Dewpoint/blob/master/dewpoint.ino",
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
    WHERE slug = ${DEW_POINT_CALCULATOR.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${DEW_POINT_CALCULATOR.title},
        short_description = ${DEW_POINT_CALCULATOR.shortDescription},
        full_description = ${DEW_POINT_CALCULATOR.fullDescription},
        project_type = ${DEW_POINT_CALCULATOR.projectType},
        project_phase = ${DEW_POINT_CALCULATOR.projectPhase},
        status = ${DEW_POINT_CALCULATOR.status},
        industry = ${DEW_POINT_CALCULATOR.industry},
        domains = ${DEW_POINT_CALCULATOR.domains}::project_domain[],
        featured_on_home = ${DEW_POINT_CALCULATOR.featuredOnHome},
        featured_on_about = ${DEW_POINT_CALCULATOR.featuredOnAbout},
        display_order = ${DEW_POINT_CALCULATOR.displayOrder},
        tech_stack = ${DEW_POINT_CALCULATOR.techStack},
        problem_solved = ${DEW_POINT_CALCULATOR.problemSolved},
        what_it_does = ${DEW_POINT_CALCULATOR.whatItDoes},
        parth_role = ${DEW_POINT_CALCULATOR.parthRole},
        github_url = ${DEW_POINT_CALCULATOR.githubUrl},
        demo_url = ${DEW_POINT_CALCULATOR.demoUrl},
        video_url = ${DEW_POINT_CALCULATOR.videoUrl},
        pdf_download_url = ${DEW_POINT_CALCULATOR.pdfDownloadUrl},
        published = ${DEW_POINT_CALCULATOR.published},
        hidden = ${DEW_POINT_CALCULATOR.hidden},
        archived = ${DEW_POINT_CALCULATOR.archived},
        updated_at = NOW()
      WHERE slug = ${DEW_POINT_CALCULATOR.slug}
    `;
    console.log(
      `Updated existing Dew Point Calculator project (${row.id}).`,
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
        ${DEW_POINT_CALCULATOR.title},
        ${DEW_POINT_CALCULATOR.slug},
        ${DEW_POINT_CALCULATOR.shortDescription},
        ${DEW_POINT_CALCULATOR.fullDescription},
        ${DEW_POINT_CALCULATOR.projectType},
        ${DEW_POINT_CALCULATOR.projectPhase},
        ${DEW_POINT_CALCULATOR.status},
        ${DEW_POINT_CALCULATOR.industry},
        ${DEW_POINT_CALCULATOR.domains}::project_domain[],
        ${DEW_POINT_CALCULATOR.featuredOnHome},
        ${DEW_POINT_CALCULATOR.featuredOnAbout},
        ${DEW_POINT_CALCULATOR.displayOrder},
        ${DEW_POINT_CALCULATOR.techStack},
        ${DEW_POINT_CALCULATOR.problemSolved},
        ${DEW_POINT_CALCULATOR.whatItDoes},
        ${DEW_POINT_CALCULATOR.parthRole},
        ${DEW_POINT_CALCULATOR.githubUrl},
        ${DEW_POINT_CALCULATOR.demoUrl},
        ${DEW_POINT_CALCULATOR.videoUrl},
        ${DEW_POINT_CALCULATOR.pdfDownloadUrl},
        ${DEW_POINT_CALCULATOR.published},
        ${DEW_POINT_CALCULATOR.hidden},
        ${DEW_POINT_CALCULATOR.archived}
      )
      RETURNING id, slug
    `;
    console.log(
      `Inserted Dew Point Calculator project (${inserted[0]?.id}).`,
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
    WHERE slug = ${DEW_POINT_CALCULATOR.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
