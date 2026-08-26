import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { JsonLd } from "@/components/seo/json-ld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });

  return buildMetadata({
    locale,
    path: "/contact",
    title: `${t("title")} | ${tMeta("siteName")}`,
    description: t("subtitle"),
    siteName: tMeta("siteName"),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  const breadcrumb = breadcrumbJsonLd(locale, [
    { name: "Home", path: "/" },
    { name: t("title"), path: "/contact" },
  ]);

  return (
    <>
      <JsonLd id="ld-breadcrumb-contact" data={breadcrumb} />

      <PageHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      <section className="py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[320px_1fr]">
          <aside className="flex flex-col gap-5">
            <h2 className="hud-eyebrow text-sm font-semibold uppercase text-brand-primary">
              {t("infoTitle")}
            </h2>

            <a
              href={company.phoneHref}
              className="hud-card flex items-start gap-3.5 rounded-2xl border border-border bg-bg-secondary p-5 transition-colors hover:border-brand-primary/40"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                <PhoneIcon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wide text-text-muted">
                  {t("phoneLabel")}
                </span>
                <span className="mt-0.5 block font-semibold text-text">
                  {company.phone}
                </span>
              </span>
            </a>

            <a
              href={`mailto:${company.email}`}
              className="hud-card flex items-start gap-3.5 rounded-2xl border border-border bg-bg-secondary p-5 transition-colors hover:border-brand-primary/40"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                <MailIcon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wide text-text-muted">
                  {t("emailLabel")}
                </span>
                <span className="mt-0.5 block font-semibold text-text">
                  {company.email}
                </span>
              </span>
            </a>

            <div className="hud-card flex items-start gap-3.5 rounded-2xl border border-border bg-bg-secondary p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                <MapPinIcon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wide text-text-muted">
                  {t("locationLabel")}
                </span>
                <span className="mt-0.5 block font-semibold text-text">
                  {company.location}
                </span>
              </span>
            </div>
          </aside>

          <div className="hud-card rounded-3xl border border-border bg-bg-secondary p-6 transition-colors hover:border-brand-primary/40 sm:p-9">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
