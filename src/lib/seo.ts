import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { company } from "@/data/company";

export const siteUrl = company.url;

export function absoluteUrl(path: string, locale: string) {
  const clean = path === "/" ? "" : path;
  return `${siteUrl}/${locale}${clean}`;
}

export function buildLanguageAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = absoluteUrl(path, locale);
  }
  languages["x-default"] = absoluteUrl(path, routing.defaultLocale);
  return languages;
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  siteName,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  siteName: string;
}): Metadata {
  const url = absoluteUrl(path, locale);

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/brand/og-cover.png",
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/brand/og-cover.png"],
    },
  };
}
