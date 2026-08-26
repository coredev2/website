export type NavHref = "/" | "/about" | "/services" | "/projects" | "/contact";

export type NavItem = {
  key: "home" | "about" | "services" | "projects" | "whyLinkyou" | "contact";
  href: NavHref;
};

export const primaryNav: NavItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "contact", href: "/contact" },
];
