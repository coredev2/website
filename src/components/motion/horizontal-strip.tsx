"use client";

import { useRef, useSyncExternalStore, type ReactNode } from "react";
import { useLocale } from "next-intl";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { directionSign, localeToDir } from "@/lib/motion-rtl";
import { usePrefersReducedMotion } from "@/lib/prefers-reduced-motion";

const DESKTOP_QUERY = "(min-width: 1024px)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(DESKTOP_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function useIsDesktop() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false
  );
}

/**
 * Pins the section and scrubs the track horizontally on desktop scroll;
 * degrades to native horizontal scroll-snap (no pinning) on smaller
 * viewports and whenever reduced-motion is requested.
 */
export function HorizontalScrollStrip({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const reducedMotion = usePrefersReducedMotion();
  const dir = localeToDir(useLocale());
  const pinEnabled = isDesktop && !reducedMotion;

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track || !pinEnabled) return;

      const distance = () => track.scrollWidth - section.clientWidth;
      const sign = directionSign(dir);

      const tween = gsap.to(track, {
        x: () => sign * -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          // Offset by the sticky header's height (h-20 = 80px) so the pinned
          // strip locks in fully below it instead of getting clipped behind it.
          start: "top 80",
          end: () => `+=${Math.max(distance(), 0)}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: sectionRef, dependencies: [pinEnabled, dir] }
  );

  return (
    <div
      ref={sectionRef}
      className={pinEnabled ? "relative overflow-x-hidden" : "relative"}
    >
      <div
        ref={trackRef}
        className={
          pinEnabled
            ? "flex w-max gap-6"
            : "flex w-full gap-5 overflow-x-auto snap-x snap-mandatory pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        }
      >
        {children}
      </div>
    </div>
  );
}
