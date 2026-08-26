"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { WireframeMesh } from "@/components/motion/wireframe-mesh";
import { ArrowIcon } from "@/components/ui/icons";

export function Hero() {
  const t = useTranslations("hero");
  const titleLines = t.raw("titleLines") as string[];

  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-[var(--bg-void)] pt-24">
      <WireframeMesh />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,transparent_0%,var(--bg-void)_72%)]"
      />

      <Container className="relative z-10">
        <div className="max-w-[62rem]">
          <Reveal>
            <span className="hud-eyebrow inline-flex items-center gap-2 rounded-full border border-[var(--border-hairline)] px-4 py-1.5 text-xs font-semibold uppercase text-[var(--text-secondary)]">
              <span className="hud-dot text-[var(--accent-bright)]" aria-hidden="true" />
              {t("eyebrow")}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="text-stroke mt-7 text-balance text-[clamp(2.75rem,7vw,6.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
              {titleLines.map((line, index) => {
                const isLast = index === titleLines.length - 1;
                return (
                  <span key={line} className="block">
                    {isLast ? (
                      <>
                        {line.replace(/\.$/, "")}
                        <span className="text-[var(--accent-bright)]">.</span>
                      </>
                    ) : (
                      line
                    )}
                  </span>
                );
              })}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-[var(--text-secondary)]">
              {t("subtitle")}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <MagneticButton>
                <Button href="/contact" size="lg">
                  {t("ctaPrimary")}
                  <ArrowIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                </Button>
              </MagneticButton>
              <Button href="/projects" size="lg" variant="outline">
                {t("ctaSecondary")}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
