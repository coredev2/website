import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { StatCounter } from "@/components/ui/stat-counter";
import { HudBackground } from "@/components/ui/hud-background";
import { CheckIcon } from "@/components/ui/icons";
import { stats } from "@/data/stats";

export function AboutSection({
  headingLevel = "h2",
  full = false,
}: {
  headingLevel?: "h1" | "h2";
  full?: boolean;
}) {
  const t = useTranslations("about");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section id="about" className="py-20 sm:py-28">
      <Container className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col items-start gap-6 text-start">
          <span className="inline-flex items-center rounded-full border border-brand-primary/25 bg-brand-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-primary">
            {t("eyebrow")}
          </span>
          {headingLevel === "h1" ? (
            <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {t("title")}
            </h1>
          ) : (
            <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("title")}
            </h2>
          )}
          <p className="text-lg font-medium text-text-secondary">
            {t("lead")}
          </p>

          {(full ? paragraphs : paragraphs.slice(0, 2)).map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-text-secondary">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="hud-card rounded-3xl border border-border bg-bg-secondary p-7 transition-colors hover:border-brand-primary/40 sm:p-9">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-primary">
            {t("supportBadge")}
          </span>
          <h3 className="mt-5 text-2xl font-bold text-white">
            {t("supportTitle")}
          </h3>
          <p className="mt-3 leading-relaxed text-text-secondary">
            {t("supportBody")}
          </p>
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-brand-primary/20 bg-bg p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-primary/12 text-brand-primary">
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold text-text">
              {t("supportTitle")}
            </span>
          </div>
        </div>
      </Container>

      <div className="relative mt-16 overflow-hidden bg-[#060d1f] py-14 sm:py-16">
        <HudBackground scanline={false} />
        <Container className="relative">
          <div className="flex flex-col items-center gap-2 text-center">
            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              {t("statsTitle")}
            </h3>
            <p className="text-white/65">{t("statsSubtitle")}</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {stats.map((stat) => (
              <StatCounter
                key={stat.id}
                value={stat.value}
                label={t(`stats.${stat.id}`)}
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
