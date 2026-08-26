import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProjectsGrid } from "@/components/sections/projects-grid";
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
  const t = await getTranslations({ locale, namespace: "projects" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });

  return buildMetadata({
    locale,
    path: "/projects",
    title: `${t("title")} | ${tMeta("siteName")}`,
    description: t("subtitle"),
    siteName: tMeta("siteName"),
  });
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projects" });

  const breadcrumb = breadcrumbJsonLd(locale, [
    { name: "Home", path: "/" },
    { name: t("title"), path: "/projects" },
  ]);

  return (
    <>
      <JsonLd id="ld-breadcrumb-projects" data={breadcrumb} />
      <ProjectsGrid headingLevel="h1" />
      <CtaSection />
    </>
  );
}
