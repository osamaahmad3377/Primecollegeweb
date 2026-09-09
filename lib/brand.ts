/**
 * Client-safe brand constants.
 *
 * Kept separate from lib/brand-asset.ts, which touches the filesystem and must
 * only ever be imported from a server component.
 */

/**
 * Intrinsic dimensions passed to next/image for the logo. These are a layout
 * hint only — rendered size is controlled by CSS (fixed height, automatic
 * width), so a logo of any aspect ratio displays without distortion.
 *
 * Real dimensions of the supplied /public/logo.png (the crest — graduation
 * cap, laurels, "PRIME INTERNATIONAL COLLEGE AUSTRALIA" lockup), confirmed
 * via PIL. It is nearly square, not the wide horizontal wordmark shape this
 * constant originally assumed — keep this in sync if the file is replaced.
 */
export const logoIntrinsic = { width: 580, height: 600 } as const;

/**
 * Real dimensions of /public/logo-light.png — the reversed variant used on
 * dark surfaces. Confirmed via PIL; near-identical to the primary mark but a
 * distinct file, so kept as its own constant.
 */
export const logoLightIntrinsic = { width: 579, height: 600 } as const;
