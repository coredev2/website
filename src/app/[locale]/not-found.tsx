import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/ui/icons";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-bg-secondary py-20">
      <Container className="flex flex-col items-center gap-5 text-center">
        <span className="hud-eyebrow font-mono text-7xl font-bold text-brand-primary/30 sm:text-8xl">
          {t("eyebrow")}
        </span>
        <h1 className="text-glow text-balance text-3xl font-bold text-white sm:text-4xl">
          {t("title")}
        </h1>
        <p className="max-w-md text-pretty text-text-secondary">
          {t("body")}
        </p>
        <Button href="/" size="lg" className="mt-2">
          {t("cta")}
          <ArrowIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
        </Button>
      </Container>
    </section>
  );
}
