"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { useIsSmallViewport } from "@/lib/prefers-reduced-motion";

export function StatCounter({
  value,
  label,
  suffix = "+",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const smallViewport = useIsSmallViewport();
  const [display, setDisplay] = useState(0);
  const formatter = useMemo(
    () => new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-CA"),
    [locale]
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        // Counting up several stats at once means several concurrent rAF
        // loops re-rendering every frame — on mobile that's the actual
        // source of jank people notice, not the hero. Skip straight to the
        // final value there (and for reduced motion) instead of animating.
        if (prefersReducedMotion || smallViewport) {
          setDisplay(value);
          return;
        }

        const duration = 1600;
        const start = performance.now();

        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(eased * value));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, smallViewport]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 text-center">
      <span className="text-glow font-mono text-4xl font-bold tabular-nums text-white sm:text-5xl">
        {formatter.format(display)}
        <span className="text-brand-light">{suffix}</span>
      </span>
      <span className="text-sm font-medium text-white/70">{label}</span>
    </div>
  );
}
