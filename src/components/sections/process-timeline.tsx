import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { processSteps } from "@/data/process";

export function ProcessTimeline() {
  const t = useTranslations("process");

  return (
    <section className="bg-[var(--bg-base)] py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <ol className="relative mt-16 flex flex-col gap-10 sm:gap-0">
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 start-6 hidden w-px sm:block"
            style={{
              background:
                "linear-gradient(to bottom, var(--accent-primary), color-mix(in oklab, var(--accent-bright) 60%, transparent), transparent)",
            }}
          />
          {processSteps.map((step, index) => (
            <Reveal key={step} delay={index * 60} as="li">
              <div className="relative flex gap-6 pb-10 last:pb-0 sm:gap-8">
                <span
                  className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 font-mono text-sm font-bold text-white"
                  style={{
                    borderColor: "var(--accent-bright)",
                    background: "var(--bg-elevated)",
                    boxShadow:
                      "0 0 0 1px color-mix(in oklab, var(--accent-bright) 40%, transparent), 0 0 24px -4px color-mix(in oklab, var(--accent-bright) 70%, transparent)",
                  }}
                >
                  {t(`steps.${step}.number`)}
                </span>
                <div className="flex-1 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-6 transition-colors hover:border-[var(--accent-bright)]/40 sm:p-7">
                  <h3 className="text-lg font-bold text-white">
                    {t(`steps.${step}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {t(`steps.${step}.body`)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
