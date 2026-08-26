import { company } from "@/data/company";
import { services } from "@/data/services";
import { siteUrl } from "@/lib/seo";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: company.name,
    url: siteUrl,
    logo: `${siteUrl}/images/brand/logo.png`,
    email: company.email,
    telephone: company.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    areaServed: "CA",
    sameAs: [],
  };
}

export function websiteJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: `${siteUrl}/${locale}`,
    name: company.name,
    inLanguage: locale,
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

export function serviceJsonLd(locale: string, title: string, description: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: title,
    description,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: "CA",
    url: `${siteUrl}/${locale}/services/${slug}`,
  };
}

export function breadcrumbJsonLd(
  locale: string,
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}/${locale}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function allServicesJsonLd(locale: string, titles: Record<string, string>, descriptions: Record<string, string>) {
  return services.map((service) =>
    serviceJsonLd(locale, titles[service.id], descriptions[service.id], service.slug)
  );
}
