# Photography

Drop the college's own photography into this folder, then update the `src`
values in `data/images.ts` to point at them, e.g. `/images/campus-exterior.jpg`.

Once every image is local, remove the `remotePatterns` entry from
`next.config.ts` — nothing else needs to change.

Guidance:

- Export at roughly 2400px on the long edge; `next/image` handles the rest.
- Prefer landscape 3:2 or 16:10 for cards and banners, 4:5 for portrait frames.
- Rewrite the `alt` text in `data/images.ts` to describe the actual photograph.
  Decorative images use an empty `alt` and are already marked as such.
