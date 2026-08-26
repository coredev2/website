import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/about": { en: "/about", ar: "/about" },
    "/services": { en: "/services", ar: "/services" },
    "/services/[slug]": { en: "/services/[slug]", ar: "/services/[slug]" },
    "/projects": { en: "/projects", ar: "/projects" },
    "/projects/[slug]": { en: "/projects/[slug]", ar: "/projects/[slug]" },
    "/contact": { en: "/contact", ar: "/contact" },
  },
});

export type AppLocale = (typeof routing.locales)[number];
