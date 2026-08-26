import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { CtaSection } from "@/components/sections/cta-section";
import { ArrowIcon, CheckIcon } from "@/components/ui/icons";
import { serviceIconMap } from "@/components/ui/service-icon";
import { services, getServiceBySlug } from "@/data/services";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { serviceJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { JsonLd } from "@/components/seo/json-ld";
import { Link } from "@/i18n/navigation";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((service) => ({ locale, slug: service.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const t = await getTranslations({ locale, namespace: "services" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const title = t(`items.${service.id}.title`);

  return buildMetadata({
    locale,
    path: `/services/${slug}`,
    title: `${title} | ${tMeta("siteName")}`,
    description: t(`items.${service.id}.description`),
    siteName: tMeta("siteName"),
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const Icon = serviceIconMap[service.icon];
  const title = t(`items.${service.id}.title`);
  const description = t(`items.${service.id}.description`);

  const jsonLd = serviceJsonLd(locale, title, description, service.slug);
  const breadcrumb = breadcrumbJsonLd(locale, [
    { name: "Home", path: "/" },
    { name: t("title"), path: "/services" },
    { name: title, path: `/services/${slug}` },
  ]);

  const otherServices = services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <>
      <JsonLd id="ld-service" data={jsonLd} />
      <JsonLd id="ld-breadcrumb-service" data={breadcrumb} />

      <PageHeader eyebrow={t("eyebrow")} title={title} subtitle={description} />

      <section className="py-20 sm:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-6">
            <span className="glow-ring flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </span>
            <p className="text-lg leading-relaxed text-text-secondary">
              {description}
            </p>
            <Button href="/contact" className="w-fit">
              {tCommon("knowMore")}
              <ArrowIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Button>
          </div>

          <aside className="hud-card flex flex-col gap-4 rounded-2xl border border-border bg-bg-secondary p-6 transition-colors hover:border-brand-primary/40">
            <h2 className="hud-eyebrow text-sm font-semibold uppercase text-brand-primary">
              {t("title")}
            </h2>
            <ul className="flex flex-col gap-3">
              {otherServices.map((other) => (
                <li key={other.id}>
                  <Link
                    href={{
                      pathname: "/services/[slug]",
                      params: { slug: other.slug },
                    }}
                    className="flex items-center gap-2.5 text-sm font-semibold text-text transition-colors hover:text-brand-primary"
                  >
                    <CheckIcon className="h-4 w-4 shrink-0 text-brand-primary" aria-hidden="true" />
                    {t(`items.${other.id}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/services"
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary"
            >
              {tCommon("viewAll")}
              <ArrowIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </aside>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
