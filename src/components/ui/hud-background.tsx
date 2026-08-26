import { cn } from "@/lib/utils";

/**
 * Prior-pass background primitive, kept alive for sections not yet migrated
 * to the Awwwards redesign (see plan phases 2-8). Do not use in new code —
 * prefer the primitives in `@/components/motion`.
 */
export function HudBackground({
  className,
  scanline = true,
}: {
  className?: string;
  scanline?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="hud-grid-bg absolute inset-0 opacity-60" />
      <div className="absolute -top-32 start-[-10%] h-[28rem] w-[28rem] rounded-full bg-[var(--accent-primary)]/30 blur-[110px]" />
      <div className="absolute bottom-[-6rem] end-[-8%] h-[24rem] w-[24rem] rounded-full bg-[var(--accent-bright)]/25 blur-[110px]" />
      {scanline ? (
        <div className="hud-scanline absolute inset-x-0 top-0 opacity-40" />
      ) : null}
      <div className="hud-noise absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
    </div>
  );
}
