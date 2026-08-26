"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowIcon, StarIcon } from "@/components/ui/icons";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function TestimonialsCarousel() {
  const t = useTranslations("testimonials");
  const [active, setActive] = useState(0);

  const current = testimonials[active];

  function go(direction: 1 | -1) {
    setActive((prev) => (prev + direction + testimonials.length) % testimonials.length);
  }

  return (
    <section className="bg-bg-secondary py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mx-auto mt-14 max-w-3xl">
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label={t("title")}
            className="hud-card relative rounded-3xl border border-border bg-bg p-8 text-center sm:p-12"
          >
            <div
              className="flex items-center justify-center gap-1 text-brand-primary"
              aria-hidden="true"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="h-5 w-5" />
              ))}
            </div>

            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-text-secondary">
              &ldquo;{t(`items.${current.id}.quote`)}&rdquo;
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <Image
                src={current.image}
                alt={t(`items.${current.id}.name`)}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div className="text-start">
                <p className="font-bold text-text">
                  {t(`items.${current.id}.name`)}
                </p>
                <p className="text-sm text-text-secondary">
                  {t(`items.${current.id}.role`)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong text-text transition-colors hover:border-brand-primary hover:text-brand-primary"
            >
              <ArrowIcon className="h-4 w-4 rotate-180 rtl:rotate-0" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === active}
                  className={cn(
                    "h-2.5 rounded-full transition-all",
                    index === active
                      ? "w-6 bg-brand-primary shadow-[0_0_12px_-2px_var(--color-brand-light)]"
                      : "w-2.5 bg-border-strong hover:bg-brand-muted"
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong text-text transition-colors hover:border-brand-primary hover:text-brand-primary"
            >
              <ArrowIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
