"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/prefers-reduced-motion";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // A plain synchronous rect check catches "already on screen at mount"
    // (e.g. hero copy) reliably. IntersectionObserver's own first callback
    // can be delayed a frame or two past a layout-affecting mount (e.g. a
    // sibling canvas/WebGL element attaching), which left content stuck at
    // opacity 0 until the next scroll/layout event recomputed it — so don't
    // rely on the observer alone for the initial state.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const node = ref.current;
      if (!node || reducedMotion || !visible) return;

      const tween = gsap.fromTo(
        node,
        { opacity: 0, y },
        { opacity: 1, y: 0, duration: 0.7, delay: delay / 1000, ease: "power3.out" }
      );

      return () => {
        tween.kill();
      };
    },
    { scope: ref, dependencies: [visible, delay, y, reducedMotion] }
  );

  const Component = Tag as "div";

  return (
    <Component
      ref={ref}
      className={cn(!reducedMotion && !visible ? "opacity-0" : "", className)}
    >
      {children}
    </Component>
  );
}
