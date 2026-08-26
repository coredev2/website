"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-bg-secondary py-20">
      <Container className="flex flex-col items-center gap-5 text-center">
        <span className="hud-eyebrow inline-flex items-center gap-2 rounded-full border border-brand-primary/25 bg-brand-primary/8 px-4 py-1.5 text-xs font-semibold uppercase text-brand-primary">
          <span className="hud-dot text-brand-primary" aria-hidden="true" />
          {t("eyebrow")}
        </span>
        <h1 className="text-glow text-balance text-3xl font-bold text-white sm:text-4xl">
          {t("title")}
        </h1>
        <p className="max-w-md text-pretty text-text-secondary">{t("body")}</p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button type="button" onClick={reset}>
            {t("retry")}
          </Button>
          <Button href="/" variant="outline">
            {t("cta")}
          </Button>
        </div>
      </Container>
    </section>
  );
}
