import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { HorizontalScrollStrip } from "@/components/motion/horizontal-strip";
import { Link } from "@/i18n/navigation";
import { services } from "@/data/services";
import { ArrowIcon } from "@/components/ui/icons";
import { serviceIconMap } from "@/components/ui/service-icon";

export function ServicesGrid({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const t = useTranslations("services");

  return (
    <section id="services" className="bg-[var(--bg-base)] py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            as={headingLevel}
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
            align="start"
          />
        </Reveal>
      </Container>

      <div className="container-app mt-14">
        <HorizontalScrollStrip>
          {services.map((service) => {
            const Icon = serviceIconMap[service.icon];
            return (
              <Link
                key={service.id}
                href={{
                  pathname: "/services/[slug]",
                  params: { slug: service.slug },
                }}
                className="group relative flex h-full w-[320px] shrink-0 snap-start flex-col gap-6 rounded-3xl p-8 sm:w-[360px]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--bg-elevated)] text-[var(--accent-bright)] transition-colors group-hover:bg-[var(--bg-elevated-2)]">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">
                    {t(`items.${service.id}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {t(`items.${service.id}.description`)}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-bright)]">
                  {t("learnMore")}
                  <ArrowIcon
                    className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                    aria-hidden="true"
                  />
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-8 bottom-6 h-px scale-x-0 transition-transform duration-300 group-hover:scale-x-100 [background:var(--gradient-primary)]"
                />
              </Link>
            );
          })}
        </HorizontalScrollStrip>
      </div>
    </section>
  );
}
