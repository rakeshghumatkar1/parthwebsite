export const INDUSTRY_OPTIONS = [
  { value: "ai_software", label: "AI / Software" },
  { value: "recruitment_hr", label: "Recruitment / HR" },
  { value: "marketing_digital_services", label: "Marketing / Digital Services" },
  { value: "education_learning", label: "Education / Learning" },
  { value: "finance_trading", label: "Finance / Trading" },
  { value: "healthcare", label: "Healthcare" },
  { value: "real_estate", label: "Real Estate" },
  { value: "retail_ecommerce", label: "Retail / Ecommerce" },
  { value: "manufacturing_operations", label: "Manufacturing / Operations" },
  { value: "nonprofit_social_impact", label: "Nonprofit / Social Impact" },
  { value: "smart_home_iot", label: "Smart Home / IoT" },
  { value: "personal_productivity", label: "Personal Productivity" },
  { value: "general_business", label: "General Business" },
  { value: "other", label: "Other" },
] as const;

export const DOMAIN_OPTIONS = [
  { value: "ai_systems", label: "AI Systems" },
  { value: "workflow_automation", label: "Workflow Automation" },
  { value: "internal_tools", label: "Internal Tools" },
  { value: "data_platforms", label: "Data Platforms" },
  { value: "reporting_dashboards", label: "Reporting / Dashboards" },
  { value: "seo_marketing_automation", label: "SEO / Marketing Automation" },
  { value: "lead_generation", label: "Lead Generation" },
  { value: "content_automation", label: "Content Automation" },
  { value: "video_media_automation", label: "Video / Media Automation" },
  { value: "local_ai", label: "Local AI" },
  { value: "iot_hardware", label: "IoT / Hardware" },
  { value: "home_automation", label: "Home Automation" },
  { value: "robotics_drones", label: "Robotics / Drones" },
  { value: "trading_prediction_systems", label: "Trading / Prediction Systems" },
  { value: "knowledge_management", label: "Knowledge Management" },
  { value: "other", label: "Other" },
] as const;

export type IndustryValue = (typeof INDUSTRY_OPTIONS)[number]["value"];
export type DomainValue = (typeof DOMAIN_OPTIONS)[number]["value"];

export const INDUSTRY_VALUES = INDUSTRY_OPTIONS.map((option) => option.value);
export const DOMAIN_VALUES = DOMAIN_OPTIONS.map((option) => option.value);

export const INDUSTRY_LABELS: Record<IndustryValue, string> = Object.fromEntries(
  INDUSTRY_OPTIONS.map((option) => [option.value, option.label]),
) as Record<IndustryValue, string>;

export const DOMAIN_LABELS: Record<DomainValue, string> = Object.fromEntries(
  DOMAIN_OPTIONS.map((option) => [option.value, option.label]),
) as Record<DomainValue, string>;

export function industryLabel(value: string): string {
  return INDUSTRY_LABELS[value as IndustryValue] ?? value;
}

export function domainLabel(value: string): string {
  return DOMAIN_LABELS[value as DomainValue] ?? value;
}

export function domainLabels(values: string[]): string[] {
  return values.map(domainLabel);
}

export function formatDomainsCompact(values: string[]): string {
  const labels = domainLabels(values);
  if (labels.length === 0) return "—";
  if (labels.length <= 2) return labels.join(", ");
  return `${labels.slice(0, 2).join(", ")} +${labels.length - 2}`;
}
