import type { ClassValue } from "@/lib/types";

/**
 * Minimal class-name joiner. Deliberately dependency-free — the project does
 * not need clsx/tailwind-merge for the level of conditional styling used here.
 */
export function cn(...values: ClassValue[]): string {
  const out: string[] = [];

  for (const value of values) {
    if (!value) continue;
    if (typeof value === "string") {
      out.push(value);
    } else if (Array.isArray(value)) {
      const nested = cn(...value);
      if (nested) out.push(nested);
    } else if (typeof value === "object") {
      for (const [key, active] of Object.entries(value)) {
        if (active) out.push(key);
      }
    }
  }

  return out.join(" ");
}

/** Formats an ISO date string for Australian audiences. */
export function formatDate(
  iso: string,
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-AU", {
    ...options,
    timeZone: "UTC",
  }).format(date);
}

/** Splits an ISO date into display parts for the events timeline. */
export function dateParts(iso: string): {
  day: string;
  month: string;
  year: string;
} {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return { day: "--", month: "---", year: "----" };
  }
  const fmt = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-AU", { ...options, timeZone: "UTC" }).format(
      date,
    );
  return {
    day: fmt({ day: "2-digit" }),
    month: fmt({ month: "short" }).toUpperCase().replace(".", ""),
    year: fmt({ year: "numeric" }),
  };
}

/** Zero-pads a step or list index for editorial numbering (01, 02, …). */
export function pad(n: number): string {
  return String(n).padStart(2, "0");
}
