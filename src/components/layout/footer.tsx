import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { HudBackground } from "@/components/ui/hud-background";
import { company } from "@/data/company";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#060d1f] text-white/85">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hud-accent/70 to-transparent"
      />
      <HudBackground scanline={false} className="opacity-80" />

      <Container className="relative py-16">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="hud-card flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-hud-accent/30 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex w-fit items-center gap-2">
              <Image
                src="/images/brand/logo-mark.png"
                alt="LinkYou"
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <span className="text-lg font-bold text-white">LinkYou</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              {t("tagline")}
            </p>
          </div>

          <nav
            aria-label={t("quickLinksTitle")}
            className="hud-card flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-hud-accent/30"
          >
            <h3 className="hud-eyebrow text-xs font-semibold uppercase text-hud-accent">
              {t("quickLinksTitle")}
            </h3>
            <Link href="/" className="w-fit text-sm text-white/60 hover:text-white">
              {t("quickLinks.home")}
            </Link>
            <Link
              href="/contact"
              className="w-fit text-sm text-white/60 hover:text-white"
            >
              {t("quickLinks.contact")}
            </Link>
            <span className="w-fit text-sm text-white/30">
              {t("quickLinks.blog")}
            </span>
            <span className="w-fit text-sm text-white/30">
              {t("quickLinks.partners")}
            </span>
            <span className="w-fit text-sm text-white/30">
              {t("quickLinks.technologies")}
            </span>
          </nav>

          <nav
            aria-label={t("aboutTitle")}
            className="hud-card flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-hud-accent/30"
          >
            <h3 className="hud-eyebrow text-xs font-semibold uppercase text-hud-accent">
              {t("aboutTitle")}
            </h3>
            <Link href="/about" className="w-fit text-sm text-white/60 hover:text-white">
              {t("about.aboutUs")}
            </Link>
            <Link href="/about" className="w-fit text-sm text-white/60 hover:text-white">
              {t("about.whyLinkyou")}
            </Link>
            <Link href="/projects" className="w-fit text-sm text-white/60 hover:text-white">
              {t("about.projects")}
            </Link>
            <Link href="/services" className="w-fit text-sm text-white/60 hover:text-white">
              {t("about.services")}
            </Link>
          </nav>

          <div className="hud-card flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-hud-accent/30">
            <h3 className="hud-eyebrow text-xs font-semibold uppercase text-hud-accent">
              {t("contactTitle")}
            </h3>
            <a
              href={company.phoneHref}
              className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white"
            >
              <PhoneIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {company.phone}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white"
            >
              <MailIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {company.email}
            </a>
            <span className="flex items-center gap-2.5 text-sm text-white/60">
              <MapPinIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {company.location}
            </span>
          </div>
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/45 sm:flex-row">
          <p className="font-mono">
            &copy; {year} LinkYou. {t("rights")}
          </p>
          <div className="flex items-center gap-5">
            <span className="cursor-default hover:text-white/70">{t("privacy")}</span>
            <span className="cursor-default hover:text-white/70">{t("terms")}</span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
