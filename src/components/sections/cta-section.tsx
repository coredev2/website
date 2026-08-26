import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/ui/icons";

export function CtaSection() {
  const t = useTranslations("cta");

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-brand-primary px-6 py-14 text-center sm:px-14 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="hud-grid-bg absolute inset-0 opacity-30" />
            <div className="absolute -top-16 start-[-4%] h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-16 end-[-4%] h-64 w-64 rounded-full bg-brand-dark/30 blur-3xl" />
          </div>
          <div className="relative flex flex-col items-center gap-5">
            <h2 className="text-glow text-balance text-3xl font-bold text-white sm:text-4xl">
              {t("title")}
            </h2>
            <p className="max-w-xl text-pretty text-white/85">
              {t("subtitle")}
            </p>
            <Button
              href="/contact"
              size="lg"
              className="mt-2 bg-white text-brand-primary hover:bg-white/90"
            >
              {t("button")}
              <ArrowIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
