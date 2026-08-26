"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion, useIsCoarsePointer } from "@/lib/prefers-reduced-motion";

const PULL = 10;

export function MagneticButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const coarsePointer = useIsCoarsePointer();
  const disabled = reducedMotion || coarsePointer;

  useGSAP(
    () => {
      const node = ref.current;
      if (!node || disabled) return;

      function onMove(event: PointerEvent) {
        const rect = node!.getBoundingClientRect();
        const relX = event.clientX - rect.left - rect.width / 2;
        const relY = event.clientY - rect.top - rect.height / 2;
        gsap.to(node, {
          x: (relX / rect.width) * PULL,
          y: (relY / rect.height) * PULL,
          duration: 0.4,
          ease: "power3.out",
        });
      }

      function onLeave() {
        gsap.to(node, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.4)" });
      }

      node.addEventListener("pointermove", onMove);
      node.addEventListener("pointerleave", onLeave);
      return () => {
        node.removeEventListener("pointermove", onMove);
        node.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref, dependencies: [disabled] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
