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
          <div className="flex w-max animate-marquee items-center gap-16 group-hover:[animation-play-state:paused] rtl:[animation-direction:reverse]">
            {track.map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="flex w-36 shrink-0 flex-col items-center justify-center gap-2"
              >
                <div className="flex h-12 w-full items-center justify-center">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={480}
                    height={200}
                    sizes="144px"
                    priority={index < clients.length}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-center text-xs font-medium text-[var(--text-muted)]">
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
