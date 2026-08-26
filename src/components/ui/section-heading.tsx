import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-start",
        className
      )}
    >
      {eyebrow ? (
        <span className="hud-eyebrow inline-flex items-center gap-2 rounded-full border border-[var(--border-hairline)] px-4 py-1.5 text-xs font-semibold uppercase text-[var(--text-secondary)]">
          <span className="hud-dot text-[var(--accent-bright)]" aria-hidden="true" />
          {eyebrow}
        </span>
      ) : null}
      <Tag
        className={cn(
          "text-balance font-bold tracking-tight text-white",
          Tag === "h1" ? "text-4xl sm:text-5xl lg:text-7xl" : "text-3xl sm:text-4xl lg:text-5xl"
        )}
      >
        {title}
      </Tag>
      {subtitle ? (
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
