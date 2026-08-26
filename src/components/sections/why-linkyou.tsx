import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CheckIcon } from "@/components/ui/icons";

const pointKeys = [
  "experience",
  "fullCycle",
  "ai",
  "security",
  "enterprise",
  "support",
  "scalable",
  "partnership",
] as const;

export function WhyLinkyouSection() {
  const t = useTranslations("whyLinkyou");

  return (
    <section id="why" className="bg-bg-secondary py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pointKeys.map((key, index) => (
            <Reveal key={key} delay={index * 50}>
              <div className="hud-card flex h-full flex-col gap-3 rounded-2xl border border-border bg-bg p-6 transition-colors hover:border-brand-primary/40">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                  <CheckIcon className="h-4 w-4" aria-hidden="true" />
                </span>
                <h3 className="text-base font-bold text-text">
                  {t(`points.${key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {t(`points.${key}.body`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
