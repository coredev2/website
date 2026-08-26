import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type AppHref } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "relative overflow-hidden text-white shadow-[0_10px_30px_-12px_rgba(29,95,224,0.6)] hover:shadow-[0_0_0_1px_var(--accent-bright),0_0_32px_-4px_var(--accent-bright)] hover:-translate-y-0.5 [background:var(--gradient-primary)]",
  secondary:
    "bg-[var(--bg-elevated-2)] text-white hover:bg-[color-mix(in_oklab,var(--bg-elevated-2)_80%,var(--accent-primary))]",
  outline:
    "border border-[var(--border-strong)] text-white hover:border-[var(--accent-bright)] hover:shadow-[0_0_24px_-6px_var(--accent-bright)] bg-transparent",
  ghost: "text-[var(--accent-bright)] hover:bg-[color-mix(in_oklab,var(--accent-bright)_12%,transparent)]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

const shared =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[var(--accent-bright)] disabled:opacity-50 disabled:pointer-events-none";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: AppHref;
    external?: boolean;
  };

const sheen = (
  <span
    aria-hidden="true"
    className="pointer-events-none absolute inset-y-0 -start-1/2 w-1/2 -skew-x-12 bg-white/25 opacity-0 transition-all duration-500 group-hover:start-full group-hover:opacity-100"
  />
);

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(shared, variants[variant], sizes[size], className);
  const content = (
    <>
      {variant === "primary" ? sheen : null}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </>
  );

  if ("href" in props && props.href) {
    const { href, external, variant: _v, size: _s, className: _c, children: _ch, ...rest } =
      props as ButtonAsLink;
    if (external) {
      return (
        <a
          href={href as string}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  const { type = "button", variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as ButtonAsButton;
  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
