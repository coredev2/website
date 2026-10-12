"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CloseIcon } from "@/components/ui/icons";

const STORAGE_KEY = "linkyou.announcementDismissed";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function getSnapshot() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return false;
}

export function AnnouncementBar() {
  const t = useTranslations("announcementBar");
  const dismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function dismiss() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore storage failures (private browsing, quota, etc.)
    }
    // No subscription fires on plain localStorage writes from the same tab,
    // so force a re-read by dispatching a storage-like state change.
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  }

  if (dismissed) return null;

  return (
    <div
      className="relative flex items-center justify-center gap-3 px-4 py-2.5 text-center text-xs font-semibold text-white [background:var(--gradient-primary)] sm:text-sm"
      role="region"
      aria-label={t("message")}
    >
      <p className="text-pretty px-6 sm:px-0">
        {t("message")}{" "}
        <Link href="/contact" className="underline underline-offset-2 hover:no-underline">
          {t("cta")}
        </Link>
      </p>
      <button
        type="button"
        onClick={dismiss}
        aria-label={t("dismissLabel")}
        className="absolute end-3 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
      >
        <CloseIcon className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}
