import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { siteUrl, buildLanguageAlternates } from "@/lib/seo";

const staticPaths = ["/", "/about", "/services", "/projects", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${siteUrl}/${locale}${path === "/" ? "" : path}`,
        lastModified: new Date(),
        changeFrequency: path === "/" ? "weekly" : "monthly",
        priority: path === "/" ? 1 : 0.7,
        alternates: { languages: buildLanguageAlternates(path) },
      });
    }
  }

  for (const service of services) {
    const path = `/services/${service.slug}`;
    for (const locale of routing.locales) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: buildLanguageAlternates(path) },
      });
    }
  }

  for (const project of projects) {
    const path = `/projects/${project.slug}`;
    for (const locale of routing.locales) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: buildLanguageAlternates(path) },
      });
    }
  }

  return entries;
}
