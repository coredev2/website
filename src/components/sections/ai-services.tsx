import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { HudBackground } from "@/components/ui/hud-background";
import { CheckIcon, SparklesIcon, ShieldIcon } from "@/components/ui/icons";

const pillarIcons = {
  modelDev: SparklesIcon,
  nlp: ShieldIcon,
  vision: SparklesIcon,
} as const;

const pillarKeys = ["modelDev", "nlp", "vision"] as const;

export function AiServicesSection() {
  const t = useTranslations("aiServices");

  return (
    <section className="relative overflow-hidden bg-[#060d1f] py-20 sm:py-28">
      <HudBackground />

      <Container className="relative">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("intro")}
          className="[&_h2]:text-white [&_p]:text-white/70"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {pillarKeys.map((key, index) => {
            const Icon = pillarIcons[key];
            const rawItems = t.raw(`pillars.${key}.items`);
            const items = Array.isArray(rawItems)
              ? (rawItems as string[])
              : undefined;

            return (
              <Reveal key={key} delay={index * 80}>
                <div className="hud-card flex h-full flex-col gap-4 rounded-2xl border border-white/12 bg-white/[0.05] p-7 transition-colors hover:border-hud-accent/40">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/25 text-hud-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {t(`pillars.${key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/65">
                    {t(`pillars.${key}.body`)}
                  </p>
                  {items ? (
                    <ul className="mt-1 flex flex-col gap-2.5">
                      {items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2.5 text-sm text-white/75"
                        >
                          <CheckIcon
                            className="h-4 w-4 shrink-0 text-hud-accent"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
