import servicesData from "@/data/services.json";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Map of standard and card-based title slugs to keys in services.json
const slugMap: Record<string, string> = {
  "search-engine-optimization-seo": "seo",
  "seo": "seo",
  "website-design-development": "web-design",
  "web-design": "web-design",
  "social-media-marketing": "social-media",
  "social-media": "social-media",
  "pay-per-click-advertising": "paid-ads",
  "paid-ads": "paid-ads",
  "branding-identity-design": "branding",
  "branding": "branding",
  "content-marketing-copywriting": "content-marketing",
  "content-marketing": "content-marketing",
  "e-commerce-solutions": "e-commerce",
  "e-commerce": "e-commerce",
  "analytics-conversion-optimization": "analytics",
  "analytics": "analytics"
};

export function getServiceData(slugParam: string) {
  const normalized = slugify(slugParam);
  const serviceKey = slugMap[normalized] || normalized;
  const data = servicesData as Record<string, any>;

  if (!data[serviceKey]) {
    return null;
  }

  return data[serviceKey];
}
