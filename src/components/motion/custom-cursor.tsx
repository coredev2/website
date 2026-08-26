"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion, useIsCoarsePointer } from "@/lib/prefers-reduced-motion";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const coarsePointer = useIsCoarsePointer();
  const active = !reducedMotion && !coarsePointer;

  useGSAP(
    () => {
      if (!active) return;
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) return;

      const ringPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const quickX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
      const quickY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

      function onMove(event: PointerEvent) {
        gsap.set(dot, { x: event.clientX, y: event.clientY });
        ringPos.x = event.clientX;
        ringPos.y = event.clientY;
        quickX(ringPos.x);
        quickY(ringPos.y);
      }

      let visible = false;
      function show() {
        if (visible) return;
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
      }
      function hide() {
        visible = false;
        gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
      }

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointermove", show, { once: true });
      window.addEventListener("mouseleave", hide);

      return () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointermove", show);
        window.removeEventListener("mouseleave", hide);
      };
    },
    { dependencies: [active] }
  );

  if (!active) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[999]">
      <div
        ref={dotRef}
        className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-[var(--accent-bright)] opacity-0"
      />
      <div
        ref={ringRef}
        className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border border-[var(--accent-bright)]/60 opacity-0"
      />
    </div>
  );
}
