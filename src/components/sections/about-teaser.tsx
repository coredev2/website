import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export function AboutTeaser() {
  const t = useTranslations("aboutTeaser");

  return (
    <section className="relative overflow-hidden bg-[var(--bg-base)] py-24 sm:py-32">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 whitespace-nowrap text-[clamp(6rem,22vw,16rem)] font-extrabold uppercase text-white/[0.04] select-none"
      >
        {t("backgroundWord")}
      </span>

      <Container className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="flex flex-col gap-5">
            <p className="flex items-center gap-2.5 text-lg font-bold text-white sm:text-xl">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: "var(--gradient-primary)" }}
                aria-hidden="true"
              />
              {t("intro")}
            </p>
            <p className="max-w-lg text-pretty leading-relaxed text-[var(--text-secondary)]">
              {t("body")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div
            className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[var(--border-hairline)]"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, color-mix(in oklab, var(--accent-primary) 35%, transparent), var(--bg-elevated) 65%)",
            }}
          >
            <img
              src="/images/about/team.jpg"
              alt={t("imageAlt")}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="hud-grid-bg absolute inset-0 opacity-40" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
