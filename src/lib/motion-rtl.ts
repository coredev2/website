export type Direction = "ltr" | "rtl";

/** Multiply an x-axis offset by this so "toward reading-end" stays correct in RTL. */
export function directionSign(dir: Direction): 1 | -1 {
  return dir === "rtl" ? -1 : 1;
}

export function localeToDir(locale: string): Direction {
  return locale === "ar" ? "rtl" : "ltr";
}
