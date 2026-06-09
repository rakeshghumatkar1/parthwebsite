/**
 * Idempotent upsert for the RFID + GSM School Attendance Alert early work project.
 * Run: npm run db:upsert-rfid-gsm-attendance-alert
 */

import { neon } from "@neondatabase/serverless";

const RFID_GSM_ATTENDANCE_ALERT = {
  title:
    "RFID + GSM School Attendance Alert System — Parent SMS Prototype",
  slug: "rfid-gsm-school-attendance-alert-system-parent-sms-prototype",
  shortDescription:
    "An early school attendance and parent-alert prototype where an RFID scan triggered an automatic SMS notification using Arduino Uno and a SIM900A GSM module.",
  fullDescription:
    "RFID + GSM School Attendance Alert System was one of Parth's stronger early automation projects from 2018. The project used an RFID key and RFID reader module to detect a student's attendance event, then sent an automatic SMS notification to the parent using a SIM900A GSM module and Arduino Uno. The video and screenshots clearly show the working hardware stack: the RFID reader module, Arduino Uno, SIM900A GSM module, and the final SMS output on a mobile phone. The parent-facing message shown in the demo says, \"Dear Parent, Your child has reached/left school.\" This project is important because it shows Parth connecting identification hardware, embedded processing, and real-world communication into a practical school safety and attendance workflow. This project shows that Parth was already building practical systems in 2018, not just trying isolated electronics components. It combines hardware input, embedded control, and communication output in a useful real-world school-parent use case. It is strong evidence of early problem-solving and implementation ability. This project is documented through a working video demo rather than a public code repository.",
  projectType: "automation",
  projectPhase: "early_work",
  status: "archived",
  industry: "education_learning",
  domains: [
    "iot_hardware",
    "workflow_automation",
    "other",
  ],
  featuredOnHome: false,
  featuredOnAbout: false,
  displayOrder: 276,
  techStack: [
    "Arduino Uno",
    "RFID Module",
    "RFID Key",
    "SIM900A",
    "GSM Module",
    "SMS Alert",
    "Attendance Tracking",
    "Hardware Automation",
    "Embedded Systems",
  ],
  problemSolved:
    "The project explored how a school attendance event could automatically trigger a parent notification, so that parents could know when a child had reached school or left school.",
  whatItDoes:
    "The system detects a student's RFID key/card through the RFID reader module. Arduino Uno processes that input and sends the required signal to the SIM900A GSM module. The GSM module then sends an SMS message to the parent's mobile number.",
  parthRole:
    "Parth built the attendance-alert concept, connected the RFID reader with Arduino Uno, integrated the SIM900A GSM module, created the input-to-SMS flow, and demonstrated the working system on video.",
  githubUrl: null,
  demoUrl: null,
  videoUrl: "https://www.youtube.com/watch?v=UmEPFopwFTI",
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
    WHERE slug = ${RFID_GSM_ATTENDANCE_ALERT.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${RFID_GSM_ATTENDANCE_ALERT.title},
        short_description = ${RFID_GSM_ATTENDANCE_ALERT.shortDescription},
        full_description = ${RFID_GSM_ATTENDANCE_ALERT.fullDescription},
        project_type = ${RFID_GSM_ATTENDANCE_ALERT.projectType},
        project_phase = ${RFID_GSM_ATTENDANCE_ALERT.projectPhase},
        status = ${RFID_GSM_ATTENDANCE_ALERT.status},
        industry = ${RFID_GSM_ATTENDANCE_ALERT.industry},
        domains = ${RFID_GSM_ATTENDANCE_ALERT.domains}::project_domain[],
        featured_on_home = ${RFID_GSM_ATTENDANCE_ALERT.featuredOnHome},
        featured_on_about = ${RFID_GSM_ATTENDANCE_ALERT.featuredOnAbout},
        display_order = ${RFID_GSM_ATTENDANCE_ALERT.displayOrder},
        tech_stack = ${RFID_GSM_ATTENDANCE_ALERT.techStack},
        problem_solved = ${RFID_GSM_ATTENDANCE_ALERT.problemSolved},
        what_it_does = ${RFID_GSM_ATTENDANCE_ALERT.whatItDoes},
        parth_role = ${RFID_GSM_ATTENDANCE_ALERT.parthRole},
        github_url = ${RFID_GSM_ATTENDANCE_ALERT.githubUrl},
        demo_url = ${RFID_GSM_ATTENDANCE_ALERT.demoUrl},
        video_url = ${RFID_GSM_ATTENDANCE_ALERT.videoUrl},
        pdf_download_url = ${RFID_GSM_ATTENDANCE_ALERT.pdfDownloadUrl},
        published = ${RFID_GSM_ATTENDANCE_ALERT.published},
        hidden = ${RFID_GSM_ATTENDANCE_ALERT.hidden},
        archived = ${RFID_GSM_ATTENDANCE_ALERT.archived},
        updated_at = NOW()
      WHERE slug = ${RFID_GSM_ATTENDANCE_ALERT.slug}
    `;
    console.log(
      `Updated existing RFID GSM Attendance Alert project (${row.id}).`,
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
        ${RFID_GSM_ATTENDANCE_ALERT.title},
        ${RFID_GSM_ATTENDANCE_ALERT.slug},
        ${RFID_GSM_ATTENDANCE_ALERT.shortDescription},
        ${RFID_GSM_ATTENDANCE_ALERT.fullDescription},
        ${RFID_GSM_ATTENDANCE_ALERT.projectType},
        ${RFID_GSM_ATTENDANCE_ALERT.projectPhase},
        ${RFID_GSM_ATTENDANCE_ALERT.status},
        ${RFID_GSM_ATTENDANCE_ALERT.industry},
        ${RFID_GSM_ATTENDANCE_ALERT.domains}::project_domain[],
        ${RFID_GSM_ATTENDANCE_ALERT.featuredOnHome},
        ${RFID_GSM_ATTENDANCE_ALERT.featuredOnAbout},
        ${RFID_GSM_ATTENDANCE_ALERT.displayOrder},
        ${RFID_GSM_ATTENDANCE_ALERT.techStack},
        ${RFID_GSM_ATTENDANCE_ALERT.problemSolved},
        ${RFID_GSM_ATTENDANCE_ALERT.whatItDoes},
        ${RFID_GSM_ATTENDANCE_ALERT.parthRole},
        ${RFID_GSM_ATTENDANCE_ALERT.githubUrl},
        ${RFID_GSM_ATTENDANCE_ALERT.demoUrl},
        ${RFID_GSM_ATTENDANCE_ALERT.videoUrl},
        ${RFID_GSM_ATTENDANCE_ALERT.pdfDownloadUrl},
        ${RFID_GSM_ATTENDANCE_ALERT.published},
        ${RFID_GSM_ATTENDANCE_ALERT.hidden},
        ${RFID_GSM_ATTENDANCE_ALERT.archived}
      )
      RETURNING id, slug
    `;
    console.log(
      `Inserted RFID GSM Attendance Alert project (${inserted[0]?.id}).`,
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
    WHERE slug = ${RFID_GSM_ATTENDANCE_ALERT.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
