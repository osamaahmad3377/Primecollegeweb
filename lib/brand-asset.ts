import fs from "node:fs";
import path from "node:path";

/*
 * SERVER ONLY. Imported from app/layout.tsx and evaluated once at build time.
 * Do not import this module from a client component.
 */

const LOGO_PATH = "/logo.png";

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
  try {
    const exists = fs.existsSync(path.join(process.cwd(), "public", "logo.png"));

    if (!exists && process.env.NODE_ENV !== "production") {
      console.warn(
        "\n[Prime] public/logo.png was not found.\n" +
          "        The header and footer are rendering a typographic wordmark\n" +
          "        instead of the official emblem. Add the supplied logo.png to\n" +
          "        /public to use it — no code change is required.\n",
      );
    }

    return exists ? LOGO_PATH : null;
  } catch {
    return null;
  }
})();
