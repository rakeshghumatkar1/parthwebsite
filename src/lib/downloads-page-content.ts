/** Static copy for Downloads page — placeholder until CMS is added. */

export const DOWNLOADS_METADATA = {
  title: "Downloads | Think Big AI Systems",
  description:
    "Reusable resources, workflow files, templates, scripts, and technical material from Think Big AI Systems.",
} as const;

export const DOWNLOADS_CONTACT_URL = "https://thinkbigdigital.co/contact" as const;

export const DOWNLOADS_AVAILABILITY_NOTE =
  "Downloads will be added here after selected resources are reviewed and approved." as const;

export const DOWNLOADS_RESOURCE_CATEGORIES = [
  {
    title: "n8n Workflows",
    description:
      "Automation workflows and workflow templates will be added here when ready.",
  },
  {
    title: "Claude Skills",
    description:
      "Reusable Claude skill packages and structured AI workflow files will be added here when ready.",
  },
  {
    title: "Templates",
    description:
      "Reusable project, automation, prompt, and process templates will be added here.",
  },
  {
    title: "Guides and PDFs",
    description:
      "Setup notes, process guides, and downloadable reference documents will be added here.",
  },
  {
    title: "Scripts and Utilities",
    description:
      "Small scripts, helpers, and technical utilities will be added when approved.",
  },
  {
    title: "Project Resources",
    description:
      "Supporting files connected to selected current or early projects.",
  },
] as const;
