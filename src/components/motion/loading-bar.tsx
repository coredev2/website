"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/prefers-reduced-motion";

/** A slim top progress bar shown while the page's initial assets finish loading. */
export function LoadingBar() {
  const [progress, setProgress] = useState(15);
  const [visible, setVisible] = useState(true);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setProgress(45), 150));
    timers.push(window.setTimeout(() => setProgress(70), 500));
    timers.push(window.setTimeout(() => setProgress(88), 1200));

    function finish() {
      setProgress(100);
      timers.push(window.setTimeout(() => setVisible(false), 350));
    }

    if (document.readyState === "complete") {
      // "load" already fired before this effect ran — defer instead of
      // calling finish() synchronously here.
      timers.push(window.setTimeout(finish, 50));
    } else {
      window.addEventListener("load", finish);
    }

    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener("load", finish);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[110] h-[3px] overflow-hidden bg-transparent"
    >
      <div
        className={
          reducedMotion
            ? "h-full [background:var(--gradient-primary)]"
            : "h-full [background:var(--gradient-primary)] transition-[width] duration-300 ease-out"
        }
        style={{
          width: `${progress}%`,
          boxShadow: "0 0 10px -1px var(--accent-bright)",
        }}
      />
    </div>
  );
}
