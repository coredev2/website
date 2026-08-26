"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ArrowIcon } from "@/components/ui/icons";
import { projects, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectCategory;

export function ProjectsGrid({
  showHeading = true,
  headingLevel = "h2",
}: {
  showHeading?: boolean;
  headingLevel?: "h1" | "h2";
}) {
  const t = useTranslations("projects");
  const tCommon = useTranslations("common");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () => projects.filter((p) => filter === "all" || p.category === filter),
    [filter]
  );

  const filters: Filter[] = ["all", "web", "mobile"];

  return (
    <section id="projects" className="py-20 sm:py-28">
      <Container>
        {showHeading ? (
          <SectionHeading
            as={headingLevel}
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        ) : null}

        <div
          role="tablist"
          aria-label={t("title")}
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {filters.map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={filter === key}
              onClick={() => setFilter(key)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                filter === key
                  ? "bg-brand-primary text-white shadow-[0_0_20px_-4px_var(--color-brand-light)]"
                  : "bg-bg-secondary text-text-secondary hover:text-brand-primary"
              )}
            >
              {t(`filters.${key}`)}
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {filtered.map((project, index) => (
            <Reveal key={project.id} delay={index * 80}>
              <Link
                href={{
                  pathname: "/projects/[slug]",
                  params: { slug: project.slug },
                }}
                className="hud-card group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg-secondary transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-[0_25px_50px_-25px_rgba(8,44,127,0.4)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={t(`items.${project.id}.name`)}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
                  <span className="hud-eyebrow w-fit rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase text-brand-primary">
                    {t(`categoryLabels.${project.category}`)}
                  </span>
                  <h3 className="text-xl font-bold text-text">
                    {t(`items.${project.id}.name`)}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-text-secondary">
                    {t(`items.${project.id}.description`)}
                  </p>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary">
                    {tCommon("viewProject")}
                    <ArrowIcon
                      className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
