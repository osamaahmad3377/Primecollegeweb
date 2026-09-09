/**
 * Client-safe brand constants.
 *
 * Kept separate from lib/brand-asset.ts, which touches the filesystem and must
 * only ever be imported from a server component.
 */

/**
 * Intrinsic dimensions passed to next/image for the logo. These are a layout
 * hint only — rendered size is controlled by CSS (fixed height, automatic
 * width), so a logo of any aspect ratio displays without distortion. Update
 * these to the real pixel dimensions of logo.png for the sharpest srcset.
 */
export const logoIntrinsic = { width: 720, height: 220 } as const;
