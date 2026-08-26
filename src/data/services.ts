export type ServiceId =
  | "ai"
  | "cybersecurity"
  | "web-development"
  | "mobile-development"
  | "maintenance-support"
  | "digital-marketing"
  | "fraud-management"
  | "telecom-consultancy";

export type Service = {
  id: ServiceId;
  slug: string;
  icon:
    | "sparkles"
    | "shield"
    | "code"
    | "device"
    | "wrench"
    | "megaphone"
    | "flag"
    | "signal";
};

export const services: Service[] = [
  { id: "ai", slug: "ai-services", icon: "sparkles" },
  { id: "cybersecurity", slug: "cyber-security", icon: "shield" },
  { id: "web-development", slug: "website-development", icon: "code" },
  { id: "mobile-development", slug: "mobile-app-development", icon: "device" },
  { id: "maintenance-support", slug: "maintenance-support", icon: "wrench" },
  { id: "digital-marketing", slug: "digital-marketing", icon: "megaphone" },
  { id: "fraud-management", slug: "fraud-management", icon: "flag" },
  { id: "telecom-consultancy", slug: "telecom-consultancy", icon: "signal" },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
