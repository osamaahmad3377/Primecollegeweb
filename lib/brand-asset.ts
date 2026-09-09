import fs from "node:fs";
import path from "node:path";

/*
 * SERVER ONLY. Imported from app/layout.tsx and evaluated once at build time.
 * Do not import this module from a client component.
 */

const LOGO_PATH = "/logo.png";
const LOGO_LIGHT_PATH = "/logo-light.png";

function exists(filename: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", filename));
  } catch {
    return false;
  }
}

/**
 * The brief specifies the official emblem at /public/logo.png. If that file is
 * present it is used verbatim — never recoloured, redrawn or re-proportioned.
 *
 * If it is absent, the site falls back to a typographic lockup of the college
 * name rather than inventing a substitute emblem. Dropping the official
 * logo.png into /public is all that is required to switch over; no code
 * changes are needed.
 */
export const logoSrc: string | null = (() => {
  const found = exists("logo.png");

  if (!found && process.env.NODE_ENV !== "production") {
    console.warn(
      "\n[Prime] public/logo.png was not found.\n" +
        "        The header and footer are rendering a typographic wordmark\n" +
        "        instead of the official emblem. Add the supplied logo.png to\n" +
        "        /public to use it — no code change is required.\n",
    );
  }

  return found ? LOGO_PATH : null;
})();

/**
 * A reversed (light-on-transparent) variant of the same emblem, supplied for
 * placement on navy fields — the footer, the mobile menu — where the primary
 * logo.png's dark navy wordmark and linework read at very low contrast
 * against a matching dark background.
 *
 * Optional: if this file is absent, `Logo.tsx` falls back to placing the
 * primary logo.png on a small white plate on dark surfaces instead, so
 * nothing breaks if this variant is ever removed.
 */
export const logoLightSrc: string | null = exists("logo-light.png")
  ? LOGO_LIGHT_PATH
  : null;
