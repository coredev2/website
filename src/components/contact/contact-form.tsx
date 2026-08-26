"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/ui/icons";

type FieldErrors = Partial<
  Record<"name" | "email" | "company" | "projectType" | "message", string>
>;

type Status = "idle" | "submitting" | "success";

const projectTypeKeys = [
  "web",
  "mobile",
  "ai",
  "security",
  "marketing",
  "support",
  "other",
] as const;

const inputClasses =
  "w-full rounded-xl border border-border-strong bg-bg px-4 py-3 text-sm text-text placeholder:text-text-muted transition-all focus:border-brand-primary focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-brand-light)_25%,transparent)] focus:outline-none";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  function validate(formData: FormData): FieldErrors {
    const next: FieldErrors = {};
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const projectType = String(formData.get("projectType") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name) next.name = t("errors.required");
    if (!email) {
      next.email = t("errors.required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = t("errors.invalidEmail");
    }
    if (!company) next.company = t("errors.required");
    if (!projectType) next.projectType = t("errors.required");
    if (!message) {
      next.message = t("errors.required");
    } else if (message.length < 10) {
      next.message = t("errors.tooShort");
    }

    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextErrors = validate(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    // NOTE: no backend/email service is connected yet. This is the
    // integration point — replace with a real submission handler
    // (API route, server action, or third-party form service).
    setStatus("submitting");
    window.setTimeout(() => {
      router.push("/");
    }, 500);
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label={t("name")} htmlFor="name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            aria-invalid={Boolean(errors.name)}
            className={inputClasses}
          />
        </Field>
        <Field label={t("email")} htmlFor="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            aria-invalid={Boolean(errors.email)}
            className={inputClasses}
          />
        </Field>
        <Field label={t("company")} htmlFor="company" error={errors.company}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder={t("companyPlaceholder")}
            aria-invalid={Boolean(errors.company)}
            className={inputClasses}
          />
        </Field>
        <Field label={t("phone")} htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={t("phonePlaceholder")}
            className={inputClasses}
          />
        </Field>
      </div>

      <Field
        label={t("projectType")}
        htmlFor="projectType"
        error={errors.projectType}
      >
        <select
          id="projectType"
          name="projectType"
          defaultValue=""
          aria-invalid={Boolean(errors.projectType)}
          className={cn(inputClasses, "appearance-none")}
        >
          <option value="" disabled>
            {t("projectTypePlaceholder")}
          </option>
          {projectTypeKeys.map((key) => (
            <option key={key} value={key}>
              {t(`projectTypes.${key}`)}
            </option>
          ))}
        </select>
      </Field>

      <Field label={t("message")} htmlFor="message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={t("messagePlaceholder")}
          aria-invalid={Boolean(errors.message)}
          className={cn(inputClasses, "resize-none")}
        />
      </Field>

      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-fit">
        {status === "submitting" ? t("submitting") : t("submit")}
        {status !== "submitting" ? (
          <ArrowIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
        ) : null}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-text">
        {label}
      </label>
      {children}
      {error ? (
        <p role="alert" className="text-xs font-medium text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
