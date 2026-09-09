import { ImageResponse } from "next/og";

/*
 * Favicon.
 *
 * The college emblem is too detailed to remain legible at 32px, so the icon is
 * a monogram in the brand colours rather than a shrunken, illegible logo.
 * If a dedicated square icon is supplied, delete this file and drop the file
 * in as app/icon.png instead — Next.js will pick it up automatically.
 */

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#011E3E",
          color: "#D4A83F",
          fontSize: 21,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          fontFamily: "Georgia, serif",
        }}
      >
        P
      </div>
    ),
    size,
  );
}
