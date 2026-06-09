/**
 * Idempotent upsert for the Alexa TV Voice Remote early work project.
 * Run: npm run db:upsert-alexa-tv-voice-remote
 */

import { neon } from "@neondatabase/serverless";

const ALEXA_TV_VOICE_REMOTE = {
  title: "Alexa TV Voice Remote — Arduino IR Control Prototype",
  slug: "alexa-tv-voice-remote-arduino-ir-control-prototype",
  shortDescription:
    "A voice-controlled TV and set-top box prototype where Parth used Alexa, Arduino, and an IR transmitter to send remote-style commands to home media devices.",
  fullDescription:
    "Alexa TV Voice Remote was one of Parth's strongest early integration projects from December 2018. The project used Alexa voice commands, Arduino, and an IR transmitter to control a TV and set-top box, creating a voice-remote experience similar in concept to an Amazon Fire Stick-style voice remote.\n\nThe video shows Parth reusing the same board from an earlier home-device control project and modifying the code for this new use case. Instead of only switching devices through relays, this project used an IR transmitter to send control signals to the TV and set-top box.\n\nThis project is important because it shows progression. Parth was not making isolated experiments; he was building on previous work, reusing hardware, modifying code, and applying earlier automation learning to a more specific real-world media-control problem.\n\nThis project matters because it shows system-level thinking at 14. Parth combined voice control, Arduino programming, IR transmission, device-control logic, and previous project reuse into one working prototype. It is a strong example of iterative learning: taking what he had already built, modifying it, and applying it to a new real-world use case.\n\nThis project is documented through a working video demo rather than a public code repository.",
  projectType: "automation",
  projectPhase: "early_work",
  status: "archived",
  industry: "smart_home_iot",
  domains: ["iot_hardware", "home_automation", "workflow_automation"],
  featuredOnHome: false,
  featuredOnAbout: false,
  displayOrder: 276,
  techStack: [
    "Alexa",
    "Arduino",
    "IR Transmitter",
    "IR Control",
    "TV Remote Control",
    "Set-Top Box Control",
    "Voice Commands",
    "Media Device Automation",
    "Hardware Reuse",
    "Code Modification",
    "Embedded Systems",
    "Home Automation",
    "Voice-to-IR Control",
  ],
  problemSolved:
    "The project explored how TV and set-top box actions could be controlled through Alexa voice commands instead of using a traditional handheld remote.",
  whatItDoes:
    "The system receives a voice command through Alexa, passes the control flow to Arduino, and uses an IR transmitter to send remote-style signals to a TV and set-top box. The demo shows the idea of switching devices and controlling media actions through voice-triggered IR commands.",
  parthRole:
    "Parth reused and modified the hardware and code from an earlier home automation project, connected the IR transmitter, mapped Alexa-triggered commands to TV/set-top box control actions, and demonstrated the working voice-control concept on video.",
  githubUrl: null,
  demoUrl: null,
  videoUrl: "https://www.youtube.com/watch?v=LD3r_izDWRc",
  pdfDownloadUrl: null,
  published: true,
  hidden: false,
  archived: false,
} as const;

const RFID_GSM_SLUG =
  "rfid-gsm-school-attendance-alert-system-parent-sms-prototype";

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
    WHERE slug = ${ALEXA_TV_VOICE_REMOTE.slug}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0];
    await sql`
      UPDATE projects
      SET
        title = ${ALEXA_TV_VOICE_REMOTE.title},
        short_description = ${ALEXA_TV_VOICE_REMOTE.shortDescription},
        full_description = ${ALEXA_TV_VOICE_REMOTE.fullDescription},
        project_type = ${ALEXA_TV_VOICE_REMOTE.projectType},
        project_phase = ${ALEXA_TV_VOICE_REMOTE.projectPhase},
        status = ${ALEXA_TV_VOICE_REMOTE.status},
        industry = ${ALEXA_TV_VOICE_REMOTE.industry},
        domains = ${ALEXA_TV_VOICE_REMOTE.domains}::project_domain[],
        featured_on_home = ${ALEXA_TV_VOICE_REMOTE.featuredOnHome},
        featured_on_about = ${ALEXA_TV_VOICE_REMOTE.featuredOnAbout},
        display_order = ${ALEXA_TV_VOICE_REMOTE.displayOrder},
        tech_stack = ${ALEXA_TV_VOICE_REMOTE.techStack},
        problem_solved = ${ALEXA_TV_VOICE_REMOTE.problemSolved},
        what_it_does = ${ALEXA_TV_VOICE_REMOTE.whatItDoes},
        parth_role = ${ALEXA_TV_VOICE_REMOTE.parthRole},
        github_url = ${ALEXA_TV_VOICE_REMOTE.githubUrl},
        demo_url = ${ALEXA_TV_VOICE_REMOTE.demoUrl},
        video_url = ${ALEXA_TV_VOICE_REMOTE.videoUrl},
        pdf_download_url = ${ALEXA_TV_VOICE_REMOTE.pdfDownloadUrl},
        published = ${ALEXA_TV_VOICE_REMOTE.published},
        hidden = ${ALEXA_TV_VOICE_REMOTE.hidden},
        archived = ${ALEXA_TV_VOICE_REMOTE.archived},
        updated_at = NOW()
      WHERE slug = ${ALEXA_TV_VOICE_REMOTE.slug}
    `;
    console.log(
      `Updated existing Alexa TV Voice Remote project (${row.id}).`,
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
        ${ALEXA_TV_VOICE_REMOTE.title},
        ${ALEXA_TV_VOICE_REMOTE.slug},
        ${ALEXA_TV_VOICE_REMOTE.shortDescription},
        ${ALEXA_TV_VOICE_REMOTE.fullDescription},
        ${ALEXA_TV_VOICE_REMOTE.projectType},
        ${ALEXA_TV_VOICE_REMOTE.projectPhase},
        ${ALEXA_TV_VOICE_REMOTE.status},
        ${ALEXA_TV_VOICE_REMOTE.industry},
        ${ALEXA_TV_VOICE_REMOTE.domains}::project_domain[],
        ${ALEXA_TV_VOICE_REMOTE.featuredOnHome},
        ${ALEXA_TV_VOICE_REMOTE.featuredOnAbout},
        ${ALEXA_TV_VOICE_REMOTE.displayOrder},
        ${ALEXA_TV_VOICE_REMOTE.techStack},
        ${ALEXA_TV_VOICE_REMOTE.problemSolved},
        ${ALEXA_TV_VOICE_REMOTE.whatItDoes},
        ${ALEXA_TV_VOICE_REMOTE.parthRole},
        ${ALEXA_TV_VOICE_REMOTE.githubUrl},
        ${ALEXA_TV_VOICE_REMOTE.demoUrl},
        ${ALEXA_TV_VOICE_REMOTE.videoUrl},
        ${ALEXA_TV_VOICE_REMOTE.pdfDownloadUrl},
        ${ALEXA_TV_VOICE_REMOTE.published},
        ${ALEXA_TV_VOICE_REMOTE.hidden},
        ${ALEXA_TV_VOICE_REMOTE.archived}
      )
      RETURNING id, slug
    `;
    console.log(
      `Inserted Alexa TV Voice Remote project (${inserted[0]?.id}).`,
    );
  }

  const rfidShift = await sql`
    UPDATE projects
    SET display_order = 277, updated_at = NOW()
    WHERE slug = ${RFID_GSM_SLUG}
      AND display_order = 276
    RETURNING slug, display_order
  `;

  if (rfidShift.length > 0) {
    console.log(
      "Shifted RFID + GSM Attendance display_order to 277 to keep Alexa TV Voice Remote at 276.",
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
    WHERE slug = ${ALEXA_TV_VOICE_REMOTE.slug}
    LIMIT 1
  `;

  console.log("Verification:", JSON.stringify(verify[0], null, 2));
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
