import { Container } from "@/components/ui/container";
import { HudBackground } from "@/components/ui/hud-background";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#060d1f] py-16 sm:py-20">
      <HudBackground scanline={false} />
      <Container className="relative flex flex-col items-center gap-4 text-center">
        {eyebrow ? (
          <span className="hud-eyebrow inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase text-white/90">
            <span className="hud-dot text-hud-accent" aria-hidden="true" />
            {eyebrow}
          </span>
        ) : null}
        <h1 className="text-glow text-balance text-4xl font-bold text-white sm:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="max-w-2xl text-pretty text-white/70">{subtitle}</p>
        ) : null}
      </Container>
    </section>
  );
}
