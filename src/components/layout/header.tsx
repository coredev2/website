"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { primaryNav } from "@/data/nav";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { useScrollTriggerRefresh } from "@/components/motion/use-scroll-trigger-refresh";
import { LocaleSwitcher } from "@/components/language/locale-switcher";
import { MenuIcon, CloseIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useScrollTriggerRefresh();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300",
        scrolled || open
          ? "border-[var(--border-strong)] bg-[color-mix(in_oklab,var(--bg-elevated)_78%,transparent)] shadow-[0_8px_32px_-12px_rgba(0,0,0,0.55)]"
          : "border-[var(--border-hairline)] bg-[color-mix(in_oklab,var(--bg-elevated)_38%,transparent)]"
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />
      <div className="container-app relative flex h-20 items-center justify-between gap-4">
        <Link
          href="/"
          className="relative z-10 flex shrink-0 items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-[var(--accent-bright)]"
        >
          <Image
            src="/images/brand/logo-header.png"
            alt="LinkYou"
            width={814}
            height={428}
            priority
            className="h-10 w-auto sm:h-11"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 lg:absolute lg:start-1/2 lg:flex lg:-translate-x-1/2 rtl:lg:translate-x-1/2"
        >
          {primaryNav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "border-[var(--accent-bright)]/60 bg-white/5 text-white"
                    : "border-transparent text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-white"
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher compact />
          <MagneticButton>
            <Button href="/contact" size="md">
              {t("getStarted")}
            </Button>
          </MagneticButton>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-strong)] text-white transition-colors hover:border-[var(--accent-bright)]"
          >
            {open ? (
              <CloseIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <MenuIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "grid overflow-hidden border-[var(--border-hairline)] transition-[grid-template-rows] duration-300 ease-out lg:hidden",
          open
            ? "grid-rows-[1fr] border-t bg-[color-mix(in_oklab,var(--bg-elevated)_78%,transparent)] backdrop-blur-xl"
            : "grid-rows-[0fr] border-t-0"
        )}
      >
        <div className="min-h-0">
          <nav aria-label="Mobile" className="container-app flex flex-col gap-1 py-4">
            {primaryNav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-3 text-base font-semibold transition-colors",
                    active
                      ? "bg-white/10 text-white"
                      : "text-[var(--text-secondary)] hover:bg-white/5 hover:text-white"
                  )}
                >
                  {t(item.key)}
                </Link>
              );
            })}
            <div className="mt-3 flex items-center justify-between border-t border-[var(--border-hairline)] pt-4">
              <LocaleSwitcher />
            </div>
            <Button
              href="/contact"
              size="lg"
              className="mt-3 w-full"
              onClick={() => setOpen(false)}
            >
              {t("getStarted")}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
