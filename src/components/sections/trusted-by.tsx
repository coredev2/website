import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { clients } from "@/data/clients";

export function TrustedBy() {
  const t = useTranslations("trustedBy");
  const track = [...clients, ...clients];

  return (
    <section className="relative overflow-hidden bg-[var(--bg-void)] py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-10">
        <p className="hud-eyebrow text-xs font-semibold uppercase text-[var(--text-muted)]">
          {t("caption")}
        </p>

        <div
          dir="ltr"
          className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] py-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
          <div className="flex w-max animate-marquee items-center gap-10 group-hover:[animation-play-state:paused] rtl:[animation-direction:reverse] sm:gap-16">
            {track.map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="flex w-24 shrink-0 flex-col items-center justify-center gap-1.5 sm:w-36 sm:gap-2"
              >
                <div className="flex h-8 w-full items-center justify-center sm:h-12">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={480}
                    height={200}
                    sizes="(min-width: 640px) 144px, 96px"
                    priority={index < clients.length}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-center text-[11px] font-medium text-[var(--text-muted)] sm:text-xs">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
