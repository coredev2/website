import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { CtaSection } from "@/components/sections/cta-section";
import { ArrowIcon } from "@/components/ui/icons";
import { projects, getProjectBySlug } from "@/data/projects";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { JsonLd } from "@/components/seo/json-ld";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const t = await getTranslations({ locale, namespace: "projects" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const name = t(`items.${project.id}.name`);

  return buildMetadata({
    locale,
    path: `/projects/${slug}`,
    title: `${name} | ${tMeta("siteName")}`,
    description: t(`items.${project.id}.description`),
    siteName: tMeta("siteName"),
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projects" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const name = t(`items.${project.id}.name`);
  const description = t(`items.${project.id}.description`);
  const category = t(`categoryLabels.${project.category}`);

  const breadcrumb = breadcrumbJsonLd(locale, [
    { name: "Home", path: "/" },
    { name: t("title"), path: "/projects" },
    { name, path: `/projects/${slug}` },
  ]);

  const otherProjects = projects.filter((p) => p.id !== project.id);

  return (
    <>
      <JsonLd id="ld-breadcrumb-project" data={breadcrumb} />

      <section className="py-16 sm:py-20">
        <Container>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary"
          >
            <ArrowIcon className="h-4 w-4 rotate-180 rtl:rotate-0" aria-hidden="true" />
            {t("title")}
          </Link>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <div className="hud-card relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border">
              <Image
                src={project.image}
                alt={name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
                className="object-cover"
              />
            </div>

            <div className="flex flex-col items-start gap-5">
              <span className="hud-eyebrow w-fit rounded-full bg-brand-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase text-brand-primary">
                {category}
              </span>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {name}
              </h1>
              <p className="text-lg leading-relaxed text-text-secondary">
                {description}
              </p>
              <Button href="/contact" size="lg">
                {tCommon("knowMore")}
                <ArrowIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </Button>
            </div>
          </div>

          {otherProjects.length ? (
            <div className="mt-20 border-t border-border pt-12">
              <h2 className="text-2xl font-bold text-text">
                {tCommon("viewAll")}
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {otherProjects.map((other) => (
                  <Link
                    key={other.id}
                    href={{
                      pathname: "/projects/[slug]",
                      params: { slug: other.slug },
                    }}
                    className="hud-card group flex items-center gap-4 rounded-2xl border border-border bg-bg-secondary p-4 transition-colors hover:border-brand-primary/40"
                  >
                    <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={other.image}
                        alt={t(`items.${other.id}.name`)}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-text">
                        {t(`items.${other.id}.name`)}
                      </p>
                      <span className="text-sm font-semibold text-brand-primary">
                        {tCommon("viewProject")}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
