import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ServicesGrid } from "@/components/sections/services-grid";
import { AiServicesSection } from "@/components/sections/ai-services";
import { CtaSection } from "@/components/sections/cta-section";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { JsonLd } from "@/components/seo/json-ld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });

  return buildMetadata({
    locale,
    path: "/services",
    title: `${t("title")} | ${tMeta("siteName")}`,
    description: t("subtitle"),
    siteName: tMeta("siteName"),
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });

  const breadcrumb = breadcrumbJsonLd(locale, [
    { name: "Home", path: "/" },
    { name: t("title"), path: "/services" },
  ]);

  return (
    <>
      <JsonLd id="ld-breadcrumb-services" data={breadcrumb} />
      <ServicesGrid headingLevel="h1" />
      <AiServicesSection />
      <CtaSection />
    </>
  );
}
