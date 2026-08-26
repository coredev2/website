"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Recalculates ScrollTrigger positions after layout-affecting changes.
 * GSAP batches trigger measurement and won't always re-check "already in
 * view" triggers until a scroll event fires, so anything visible on first
 * paint (e.g. the hero) can stay stuck at its pre-animation state without
 * this. Also re-runs on locale switch since an LTR/RTL flip changes layout.
 */
export function useScrollTriggerRefresh() {
  const locale = useLocale();

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    const timeout = window.setTimeout(refresh, 300);
    window.addEventListener("load", refresh);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
      window.removeEventListener("load", refresh);
    };
  }, [locale]);
}
