import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutSection } from "@/components/sections/about-section";
import { WhyLinkyouSection } from "@/components/sections/why-linkyou";
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
  const t = await getTranslations({ locale, namespace: "about" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });

  return buildMetadata({
    locale,
    path: "/about",
    title: `${t("title")} | ${tMeta("siteName")}`,
    description: t("lead"),
    siteName: tMeta("siteName"),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  const breadcrumb = breadcrumbJsonLd(locale, [
    { name: "Home", path: "/" },
    { name: t("title"), path: "/about" },
  ]);

  return (
    <>
      <JsonLd id="ld-breadcrumb-about" data={breadcrumb} />
      <AboutSection headingLevel="h1" full />
      <WhyLinkyouSection />
      <CtaSection />
    </>
  );
}
