import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { TrustedBy } from "@/components/sections/trusted-by";
import { AboutTeaser } from "@/components/sections/about-teaser";
import { AboutSection } from "@/components/sections/about-section";
import { ServicesGrid } from "@/components/sections/services-grid";
import { AiServicesSection } from "@/components/sections/ai-services";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { WhyLinkyouSection } from "@/components/sections/why-linkyou";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { CtaSection } from "@/components/sections/cta-section";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return buildMetadata({
    locale,
    path: "/",
    title: t("defaultTitle"),
    description: t("defaultDescription"),
    siteName: t("siteName"),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TrustedBy />
      <AboutTeaser />
      <AboutSection />
      <ServicesGrid />
      <AiServicesSection />
      <ProjectsGrid />
      <ProcessTimeline />
      <WhyLinkyouSection />
      <TestimonialsCarousel />
      <CtaSection />
    </>
  );
}
