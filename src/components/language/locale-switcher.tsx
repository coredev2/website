"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { routing } from "@/i18n/routing";
import { GlobeIcon } from "@/components/ui/icons";

export function LocaleSwitcher({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("locale");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function switchTo(next: string) {
    router.replace(
      // @ts-expect-error -- dynamic pathname from routing config
      { pathname, params },
      { locale: next }
    );
  }

  const other = routing.locales.find((l) => l !== locale) ?? "ar";

  return (
    <button
      type="button"
      onClick={() => switchTo(other)}
      aria-label={t("switchLabel")}
      className={
        compact
          ? "inline-flex h-10 items-center gap-1.5 rounded-full border border-white/15 px-3 text-sm font-semibold text-white/75 transition-colors hover:border-hud-accent hover:text-white"
          : "inline-flex items-center gap-1.5 text-sm font-semibold text-white/75 transition-colors hover:text-white"
      }
    >
      <GlobeIcon className="h-4 w-4" aria-hidden="true" />
      <span>{locale === "en" ? "AR" : "EN"}</span>
    </button>
  );
}
