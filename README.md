# Prime International College Australia

A static, production-ready marketing site built with Next.js (App Router),
TypeScript, Tailwind CSS v4 and Framer Motion. No database, no CMS, no
authentication and no backend — all content is served from typed local data
files under `data/`.

---

## Before this site goes live

Two things must be dealt with. Both are deliberate, and both are visible in the
running site rather than hidden in the code.

### 1. The college logo

Two files, both supplied by the client and used verbatim — neither is ever
recoloured, redrawn or re-proportioned:

- **`public/logo.png`** — the primary emblem (580×600px, crest + "PRIME
  INTERNATIONAL COLLEGE AUSTRALIA" lockup), dark navy on transparent. Used on
  light surfaces (the header) and for social share images.
- **`public/logo-light.png`** — a reversed variant (579×600px), white/gold on
  transparent, supplied specifically for dark surfaces. Used on the footer
  and the mobile menu.

`lib/brand-asset.ts` resolves both at build time; `lib/brand.ts` holds each
file's real pixel dimensions (`logoIntrinsic` / `logoLightIntrinsic`) so
`next/image` renders each at the correct aspect ratio. `components/layout/Logo.tsx`
picks between them via its `tone` prop — `tone="dark"` (light surfaces) always
renders the primary mark; `tone="light"` (dark surfaces) prefers the reversed
`logo-light.png`, rendered plain, no wrapper needed.

**Why two files, and a fallback behind them**: the primary logo's "PRIME"
wordmark and crest linework are painted in a navy essentially identical to
this site's own `--color-navy` token — correct on the header, but placed
directly on a navy footer it would go navy-on-navy and mostly disappear.
`Logo.tsx` therefore falls back to placing the *primary* mark on a small white
plate if `logo-light.png` is ever absent, so nothing breaks if that file is
removed — but with both files present, the plate path is dead code; the
reversed asset is what actually renders.

### 2. Content is placeholder and marked as such

Roughly 66 distinct bracketed placeholders (`[INSERT …]`, `[REPLACE …]`,
`[CONFIRM …]`, `[XX]+`) run through the site. Nothing has been invented about
the college's accreditation, CRICOS or RTO registration, AQF levels, course
approvals, rankings, student numbers, campus location, partnerships, awards, or
its students.

Find every one of them with:

```bash
grep -rn "\[[A-Z][^]]*\]" data components app
```

Visible on-page notices (the `ContentNotice` component) tell readers which
sections are unverified. **Remove each notice only when the real content
replaces the placeholders behind it** — not before.

Specific items that must be verified by the college, not by a developer:

- Program titles, durations, study modes, intakes, entry requirements, fees and
  career outcomes (`data/programs.ts`)
- Statistics (`data/content.ts` → `statistics`)
- Address, phone, email addresses and opening hours (`data/site.ts`)
- Regulatory identifiers — RTO / CRICOS / ABN (`data/site.ts` → `regulatory`).
  These are intentionally empty; the footer shows a placeholder until they are
  filled in. **Never populate these with guessed values.**
- The Acknowledgement of Country — the correct Traditional Owner group for the
  campus location must be confirmed with the local Aboriginal community
- Privacy Policy and Terms & Conditions — structural drafts only, not legal
  documents. They must be replaced by the college's legal advisers.
- News articles and events (`data/news.ts`, `data/events.ts`) — none describe
  anything that has happened
- Testimonials (`data/testimonials.ts`) — illustrative, attributed to
  `[STUDENT NAME]`. Never publish a testimonial without the named student's
  written consent and their own words.

### 3. The enquiry forms do not send anything

Both forms validate and show a success state, and then explicitly tell the
visitor that nothing was transmitted — so a prospective student's message can
never be silently lost. Connect a real endpoint by replacing the body of
`submitEnquiry()` in `lib/forms.ts`; the forms, validation and UI states keep
working unchanged. Repeat all validation server-side.

### 4. Photography is placeholder

Development images are loaded from the Unsplash CDN and **do not show this
college**. See `public/images/README.md` for the swap procedure: drop files in,
update `src` values in `data/images.ts`, rewrite the `alt` text, then delete the
`remotePatterns` entry in `next.config.ts`.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npx eslint .     # lint (currently clean)
npx tsc --noEmit # type check (currently clean)
```

Deploy target is Vercel. Set `NEXT_PUBLIC_SITE_URL` in the project settings
before the first production deploy — it drives canonical URLs, Open Graph tags,
`sitemap.xml` and `robots.txt`. See `.env.example`.

**Analytics**: `@vercel/analytics` is installed and `<Analytics />` is mounted
in `app/layout.tsx`. It's page-view tracking only, no cookies — nothing to add
to the privacy policy's cookie copy. It only reports anything once the site is
deployed on Vercel with Web Analytics enabled for the project; locally (and on
any other host) it's a harmless no-op — the browser console will log a message
about enabling Web Analytics, which is the library's own expected behaviour,
not an error to chase.

---

## Architecture

```
app/                     Routes (App Router). One folder per page.
  layout.tsx             Fonts, metadata, header/footer, skip link, JSON-LD
  globals.css            ALL design tokens live here — see below
  sitemap.ts, robots.ts  Generated from the data files
  icon.tsx               Favicon (monogram; replace with app/icon.png if supplied)

components/
  layout/                Header, MobileMenu, Footer, Logo
  ui/                    Button, Container, Section, SectionHeading, Reveal,
                         Accordion, CountUp, EmptyState, ContentNotice, …
  home/                  The homepage bands, several reused on inner pages
  programs/ news/ events/ shared/

data/                    All content. Swap these for CMS calls later.
lib/                     utils, types, seo, forms, brand asset resolution
```

### Visual direction

The design language is **flat, graphic and block-based**: solid fields of colour
butted hard against photography, square corners throughout, and large lowercase
headlines. Adopted at the client's request from a reference site, executed in
Prime's own navy/gold palette and content.

Concretely:

- **Hero** — three full-bleed rows, each half photograph and half solid colour
  (navy, deep navy, gold), carrying one statement and one action. Rows alternate
  which side the image sits on. No scrim, no overlay, no text floating over an
  image; the photograph and the colour are equal halves of one band. It is a
  server component — the previous photographic hero needed client JavaScript for
  parallax and a cursor spotlight, and neither survives the move to flat fields.
- **Square corners** — all four radius tokens are `0px`. A radius softens exactly
  the edge that is meant to read as deliberate.
- **Retired with this change**: the film grain, viewfinder corner marks, cursor
  spotlight, section seam marks and the two-light "studio" gradient on navy.
  Those belonged to a textured, instrument-like aesthetic that directly
  contradicts flat colour blocks; keeping both would have read as a hybrid.
  Their CSS and components were deleted rather than left dead.

### Typography

Three families, each with a defined job:

| Family | Role |
|---|---|
| Poppins (`.headline`) | Every headline — bold, lowercase, tight tracking |
| Inter (`font-sans`) | All body copy, navigation, labels |
| JetBrains Mono (`font-mono`) | Numerals and machine-readable data only |

`.headline` applies `text-transform: lowercase`, which changes only what is
painted — the DOM keeps proper capitalisation, so assistive technology and
search engines still receive "Why Prime?", not "why prime?".

`.headline-cased` is the same face and weight *without* the lowercasing, for
proper nouns, quoted sentences and pull quotes where lowercasing would be wrong
(the testimonial blockquote, the vision/mission statements, mobile nav labels).

**To revert to the earlier serif direction**: swap Poppins back to
Cormorant_Garamond in `app/layout.tsx`, repoint `--font-display` in
`globals.css`, drop the `lowercase`/`letter-spacing` lines from `.headline`, and
restore non-zero radius tokens. Every heading resolves through that one token
and that one utility, so nothing else needs touching.

### Navigation and conversion UX

The information architecture is two levels deep. Top-level items that own a
cluster of pages (About, Programs, Admissions) open a mega-menu panel with
descriptions and a promoted card; the rest link straight through. Panels open on
hover *and* on click, close on Escape with focus returned to the trigger, and
close on an outside click. A guard stops a stationary cursor from instantly
re-opening a panel that Escape just closed.

A slim utility strip above the main bar carries contact details and secondary
links, and folds away on scroll. A hairline gold reading-progress bar runs along
the bottom of the header once you start scrolling.

Long pages (currently Admissions) carry a sticky `SectionNav` jump bar that
tracks the section in view via IntersectionObserver.

On small screens a `StickyActions` bar appears after the first screenful with
Enquire and Apply Now — on mobile the header's Apply button is behind the
hamburger, so without it there is no route to an application mid-page.

**Note on `overflow`:** `html` and `body` use `overflow-x: clip`, not `hidden`.
`hidden` computes `overflow-y` to `auto`, which turns the element into a scroll
container and silently breaks `position: sticky` for every descendant — it broke
the admissions jump bar. Do not change it back.

### Server and client components

Almost everything is a server component. The `"use client"` boundary is pushed
down to the few genuinely interactive pieces: `Header`, `MobileMenu`,
`ProgramExplorer`, `EnquiryForm`, `Accordion`, `CountUp`, `Hero` and the
`Reveal` primitives. Because `Reveal` is its own client component, section
components can wrap their content in it and still render on the server — most
inner pages ship no page-specific JavaScript at all.

### Motion

`Reveal`, `RevealGroup` and `RevealItem` in `components/ui/Reveal.tsx` are the
only scroll-animation primitives.

They deliberately **do not** call `useReducedMotion()` to decide what to render.
The server cannot know a visitor's motion preference, so branching on it during
render produces a hydration mismatch. Instead every animated element carries a
`data-reveal` attribute, and `globals.css` forces those elements to their final
state under `prefers-reduced-motion: reduce` using `!important`, which overrides
Framer Motion's inline styles. Identical markup on both sides, and genuinely no
motion for visitors who ask for none. Verified: with reduced motion requested,
all 80 below-the-fold reveal elements render fully opaque.

---

## Accessibility

Built against WCAG 2.2 AA. What is in place:

- Semantic landmarks, one `<h1>` per page (verified across all 17 routes)
- Every `<Section aria-labelledby>` resolves to a real heading id. `SectionHeading`
  takes an `id` prop for exactly this reason — pass it whenever the enclosing
  Section is labelled, or the section is left with no accessible name
- Skip link to `#main`
- Visible focus ring on every interactive element, switching from gold to navy
  on light surfaces via the `.on-light` utility so it always has contrast
- Mobile menu is a proper `role="dialog"` with `aria-modal`, a focus trap,
  Escape-to-close, background scroll lock, and focus returned to the trigger
- Active navigation and filter states carry a gold rule or diamond as well as a
  colour change — information is never conveyed by colour alone
- Forms: labels, hints and errors programmatically associated; an error summary
  that receives focus and links to each field; `aria-invalid` on failures
- `CountUp` exposes the final value to screen readers, never a mid-animation
  number
- Decorative images use `alt=""`; meaningful ones are described
- `maximumScale: 5` — pinch zoom is never blocked

Not yet done: an independent audit and testing with real assistive-technology
users. `/accessibility` states this openly rather than claiming conformance.

---

## Verification performed

- `next build` — 38 routes, all static or SSG
- `eslint` and `tsc --noEmit` — clean
- Every page rendered against the **production** build at 320, 375, 390, 414,
  480, 768, 834, 1024, 1280, 1440, 1920 and 2560px: **no horizontal overflow
  anywhere**, one `<h1>` per page, no images missing `alt`, no hydration
  mismatches, no console errors
- Mega-menu open/close, Escape handling and focus return tested in-browser
- Shine-sweep verified invisible at rest by reading the computed transform of
  the pseudo-element (blade sits fully off the left edge), not by eye
- Colour pairings introduced by the block hero checked against WCAG AA:
  white on navy 16.7:1, navy on gold 5.4:1, navy on gold-light 7.5:1
- Zero dangling `aria-labelledby` / `aria-describedby` / `aria-controls`
  references sitewide (audited across 12 routes)
- Sticky jump bar pinning and section tracking tested in-browser
- Mobile menu focus trap, scroll lock and focus restoration tested in-browser
- Reduced-motion behaviour tested in-browser
- Contrast ratios calculated for every text/background pair in use

---

## Adding a page

1. Create `app/<route>/page.tsx`
2. Export `metadata` built with `pageMetadata()` from `lib/seo`
3. Open with `<PageHero>` — this is what lets the sticky header start
   transparent over a dark band site-wide
4. Compose with `<Section>` for the band rhythm and `<Container>` for gutters
5. Add the route to `staticRoutes` in `app/sitemap.ts` (deliberately explicit,
   so a draft page cannot leak into the sitemap)
