import { pgEnum } from "drizzle-orm/pg-core";

export const projectTypeEnum = pgEnum("project_type", [
  "internal_tool",
  "ai_system",
  "automation",
  "data_platform",
  "saas",
  "content_media",
  "other",
]);

export const projectStatusEnum = pgEnum("project_status", [
  "active",
  "experiment",
  "archived",
  "concept",
]);

export const projectPhaseEnum = pgEnum("project_phase", [
  "current_work",
  "early_work",
]);

export const projectIndustryEnum = pgEnum("project_industry", [
  "ai_software",
  "recruitment_hr",
  "marketing_digital_services",
  "education_learning",
  "finance_trading",
  "healthcare",
  "real_estate",
  "retail_ecommerce",
  "manufacturing_operations",
  "nonprofit_social_impact",
  "smart_home_iot",
  "personal_productivity",
  "general_business",
  "other",
]);

export const projectDomainEnum = pgEnum("project_domain", [
  "ai_systems",
  "workflow_automation",
  "internal_tools",
  "data_platforms",
  "reporting_dashboards",
  "seo_marketing_automation",
  "lead_generation",
  "content_automation",
  "video_media_automation",
  "local_ai",
  "iot_hardware",
  "home_automation",
  "robotics_drones",
  "trading_prediction_systems",
  "knowledge_management",
  "other",
]);

export const proofTypeEnum = pgEnum("proof_type", [
  "github",
  "youtube",
  "screenshot",
  "pdf",
  "recognition",
  "presentation",
  "technical_note",
  "certificate",
  "milestone_proof",
  "build_document",
]);

export const videoCategoryEnum = pgEnum("video_category", [
  "demo",
  "walkthrough",
  "presentation",
  "hardware",
  "software",
  "other",
]);

export const milestoneCategoryEnum = pgEnum("milestone_category", [
  "hardware",
  "software",
  "recognition",
  "presentation",
  "other",
]);

export const updateTypeEnum = pgEnum("update_type", [
  "new_project",
  "new_repo",
  "new_video",
  "new_proof",
  "new_feature",
  "technical_note",
  "status_change",
]);

export const mediaRoleEnum = pgEnum("media_role", [
  "hero_atmospheric",
  "section_artwork",
  "card_thumbnail",
  "video_thumbnail",
  "proof_document",
  "gallery_image",
  "detail_image",
  "profile_photo",
  "lifestyle_photo",
  "og_social",
]);

export const mediaDisplayModeEnum = pgEnum("media_display_mode", [
  "bleed",
  "cover",
  "contain",
  "natural",
  "thumbnail",
  "background_decorative",
]);
