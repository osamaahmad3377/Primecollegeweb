# Project Context — Prime International College Australia

Persistent reference for this project. Read this before making further changes
— it captures decisions, history and open items that aren't obvious from the
code alone. `README.md` covers day-to-day developer instructions (running,
building, architecture); this file covers *why things are the way they are*
and *what still needs the client's attention*.

Last updated: reflects the state of the project after the session that built
it from scratch and then iterated on the homepage design.

---

## 1. What this is

A static Next.js marketing site for a (fictional/placeholder) Australian
college brief: "Prime International College Australia." No backend, no CMS,
no database, no auth — every page is server-rendered from local TypeScript
data files under `data/`. Built to be handed to the client with a CMS
connected later without a rebuild.

Stack: Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS
v4 · Framer Motion · Lucide React icons.

**This is not a git repository.** There is no version history — every change
in this session was made directly to the working files. If you want history
going forward, `git init` first.

---

## 2. Visual direction — and why it changed

The site has gone through **two distinct visual identities** in this project's
history. Know which one is current before touching typography or layout.

### Identity 1 (original, now superseded)
Premium academic institution: navy `#011E3E` + gold `#BD8A2E`, **Cormorant
Garamond** serif headlines, generous radius (6–16px), editorial photography,
restrained motion. Built to a very detailed initial brief calling for "Apple
meets a premium Australian university."

### Identity 2 (current)
The client asked to match the UI/UX of an external reference site
(thompsoncff.org — a Cloudflare-protected site pulled via the Wayback Machine
archive, not fetched live) while keeping Prime's own navy/gold palette and
content. This replaced:

- **Typeface**: Cormorant Garamond → **Poppins**, bold, set through a new
  `.headline` utility class that also applies `text-transform: lowercase` and
  tight negative tracking (`-0.03em`). All headlines now render lowercase
  ("why prime?", "shape your future.") — **this is deliberate, not a bug.**
  The DOM keeps proper capitalisation (`text-transform` only changes what's
  painted), so screen readers and search engines still see "Why Prime?".
  `.headline-cased` is the same face/weight *without* the lowercasing, used
  for proper nouns, quotes, and nav labels where lowercasing reads wrong.
- **Radius**: all four radius tokens (`--radius-button/card/media/panel`) are
  now `0px`. Square corners throughout — solid colour blocks butted hard
  against photography is the core of this look; a radius softens exactly the
  edge that's meant to read as deliberate.
- **Hero**: rebuilt as three full-bleed rows, each split 50/50 into a
  photograph and a solid colour field (navy / navy-dark / gold), each row
  carrying one short statement and one CTA. No scrim, no overlay, no text
  floating over an image. It's a **server component** (the old hero needed
  client JS for parallax + a cursor spotlight; neither survives flat colour
  fields). See `components/home/Hero.tsx`.
- **Retired entirely** (components deleted, not just unused): film grain
  texture, viewfinder corner-mark brackets, cursor-tracking spotlight, section
  "seam mark" ticks, and the two-light gradient wash on navy sections. These
  belonged to a *textured, instrument-like* aesthetic that was built in an
  intermediate "premium/futuristic" iteration and directly contradicts flat
  graphic colour blocks — keeping both would have read as an incoherent
  hybrid, so they were removed rather than left dormant.

**To revert to Identity 1** (serif academic look): see the revert instructions
in `README.md` under "Typography" — swap Poppins back to Cormorant_Garamond in
`app/layout.tsx`, repoint `--font-display` in `globals.css`, drop the
lowercase/tracking lines from `.headline`, restore non-zero radius tokens.
Every heading resolves through that one font token and that one utility
class, so the revert is small and mechanical.

**Honest tradeoff**: Identity 2 reads energetic/approachable rather than the
"academic prestige" the original brief asked for. That's inherent to the
reference site, not a side effect of poor execution.

### The `SectionIntro` pattern
Three homepage sections (Why Prime, Explore our Programs, Student Life) were
individually asked to display their heading and lead paragraph as **two
columns in one row** (title left, lead + link right, separated by a gold
vertical rule, sitting under a full-width hairline with an eyebrow row above
it). Rather than solve this three times, one reusable component was built:
`components/ui/SectionIntro.tsx`. Use this — not a bespoke flex row — for any
future section that wants this "title left / lead+link right" opening. It
collapses to a single stacked column below `lg` automatically.

---

## 3. Homepage composition (current)

`app/page.tsx`, in order:

1. **Hero** — three split colour/photo rows + a closing statement
   ("Prime prepares students for the work that follows the qualification.")
2. **WhyPrime** — `SectionIntro` + six navy cards (icon, title, description)
3. **Stats** — navy band, four `[XX]+` mono-numeral placeholder statistics
4. **Programs** — `SectionIntro` + category chips + 4 program cards
5. **FeaturedProgram** — full-bleed photography campaign band
6. **Admissions** — 4-step process
7. **InternationalStudents** — support pillars + photo
8. **StudentLife** — `SectionIntro` + image mosaic + 3 pillars
9. **News** — latest 3 articles
10. **Events** — upcoming 3 events (dated timeline, not cards)
11. **Testimonials** — carousel, keyboard-navigable, no autoplay
12. **FinalCTA** — gold panel on navy, "Ready to take the next step?"

### Sections removed from the homepage this session
These were removed on explicit request. **The underlying components and data
still exist** — nothing was deleted outright, just unwired from `app/page.tsx`
(or, for the four notices below, deleted inline since they were single
paragraphs, not components):

- **`Affiliations`** (`components/home/Affiliations.tsx`) — the "Recognition &
  affiliations" credential strip (5 empty dashed placeholder boxes:
  `[ACCREDITATION MARK]`, `[REGULATORY REGISTRATION]`, etc). Orphaned on disk,
  not imported anywhere. Re-wire into `app/page.tsx` once real accreditation
  marks exist to put in it.
- **`Intro`** (`components/home/Intro.tsx`) — the "Welcome to Prime / Education
  designed around your future" editorial split section. Orphaned on disk, not
  imported anywhere.
- **Four `ContentNotice` disclaimer paragraphs**, deleted from their host
  components (content and component structure otherwise untouched):
  - Programs section: "Program titles, durations, study modes... have not
    been verified..." (was in `components/home/Programs.tsx`)
  - InternationalStudents **homepage widget**: "Prime does not provide
    migration advice..." short version (was in
    `components/home/InternationalStudents.tsx`)
  - Events section: "Event dates, times and venues shown are placeholders..."
    (was in `components/home/Events.tsx`)
  - Testimonials section: "Quotations shown are illustrative placeholders..."
    (was in `components/home/Testimonials.tsx`)

  **Important**: the **dedicated `/international-students` page** still has
  its own, fuller migration-advice disclaimer (with its own "Important
  notice" heading) — that one was *not* touched, because the user quoted the
  shorter homepage-widget wording specifically, not this one. See
  `app/international-students/page.tsx`.

  **Flag this was raised and acknowledged, not silently done**: removing
  these notices means the placeholder program details, fake testimonials
  (attributed to `[STUDENT NAME]`), and placeholder event dates now display
  with **no on-page indication that they're unverified/fabricated**. This was
  called out to the user before removal; they confirmed the request stood.
  **Before this site goes anywhere near production, someone needs to either
  restore equivalent disclaimers or replace every placeholder with real,
  verified content.** See §5.

---

## 4. Known technical gotchas (read before debugging)

These were real bugs hit and fixed during the build. If something looks
broken, check here before re-diagnosing from scratch.

- **`overflow-x: hidden` silently breaks `position: sticky`.** `hidden`
  computes `overflow-y` to `auto`, turning the element into a scroll
  container. `html`/`body` use `overflow-x: clip` instead (see
  `app/globals.css`) — **do not change this back**, it broke the Admissions
  page's sticky jump nav (`SectionNav`) last time.
- **Framer Motion's `useReducedMotion()` cannot be used to branch rendered
  output** (i.e. deciding `initial`/`animate` props based on it). The server
  can't know the client's motion preference, so this produces a hydration
  mismatch. The fix pattern used throughout (`components/ui/Reveal.tsx`):
  every animated element gets `data-reveal=""`, and a
  `@media (prefers-reduced-motion: reduce)` block in `globals.css` forces
  `opacity: 1 !important; transform: none !important;` on that attribute. If
  you add new animated components, use `<Reveal>` rather than inventing a new
  pattern.
- **The mobile menu used to steal focus on every page load** — the
  focus-restore effect ran even on first mount, before the menu had ever been
  opened. Fixed with a `wasOpen` ref guard in `MobileMenu.tsx`. Don't remove
  that guard.
- **`next/font/google`'s `JetBrains_Mono` export exists** despite not showing
  up via a naive `Object.keys(require('next/font/google'))` check at the
  Node REPL — it's resolved via TypeScript declaration merging, not a plain
  object. Don't trust that check method again; grep the compiled `.d.ts` at
  `node_modules/next/dist/compiled/@next/font/dist/google/index.d.ts` instead.
- **Font CSS variable naming convention**: next/font's own `variable:` name is
  always the font-specific one (`--font-jetbrains-mono`, `--font-poppins`,
  `--font-inter`) — the *semantic* Tailwind v4 theme token (`--font-mono`,
  `--font-display`, `--font-sans`) is defined separately in `globals.css`'s
  `@theme` block and references the font-specific variable. Keep this
  two-layer indirection when adding a font — it's what makes the "revert to
  serif" instruction in §2 a one-file change instead of a search-and-replace.
- **Stale `.next` / Turbopack workers cause misleading build failures.**
  `Failed to collect page data for /_not-found` and
  `routesManifest.dataRoutes is not iterable` both occurred during this
  session and were **not real bugs** — they were leftover dev/build processes
  colliding with a fresh `rm -rf .next && npm run build`. Always
  `pkill -f "next"; sleep 2-4; rm -rf .next` before a clean verification
  build, and don't chase these errors as code problems without first trying
  that.
- **Header is now permanently opaque** (`overlay` const hardcoded to `false`
  in `components/layout/Header.tsx`) because the new split-block hero's
  top-left content is a light photograph — a transparent white-text header
  over a pale image was unreadable. Because of this, `<main>` in
  `app/layout.tsx` carries `pt-[calc(var(--header-h)+var(--utility-h))]` so
  content doesn't slide under the fixed bar. If you ever reintroduce a
  transparent-over-dark-hero pattern, both of these need re-examining
  together, not just the header.
- **The utility strip (phone/email/Events/News/Accessibility row above the
  main nav) is a solid navy band**, not borrowed transparency, for the same
  reason — it used to be styled to show through a transparent header and
  became invisible/unreadable white-on-white once the header went opaque.

---

## 5. Content status — nothing here is real

This bears repeating because it's the single most important fact about the
project. **As of this session, ~68 distinct bracketed placeholders remain**
(`[INSERT ...]`, `[REPLACE ...]`, `[CONFIRM ...]`, `[XX]+`, etc). Find them
all with:

```bash
grep -rn "\[[A-Z][^]]*\]" data components app
```

Nothing has been invented about: accreditation, CRICOS/RTO registration, AQF
levels, course approvals, rankings, student numbers, campus location,
partnerships, awards, or named students. Specifically:

- **`public/logo.png` does not exist.** The brief specified this file as the
  official emblem; it was never supplied. The header/footer currently render
  a typographic "PRIME" wordmark fallback (`lib/brand-asset.ts` detects the
  file's absence and switches automatically — no code change needed once the
  real file is dropped in).
- **`data/site.ts` → `regulatory`**: `rtoCode`, `cricosCode`, `abn` are all
  empty strings, intentionally. Never fill these with guessed values.
- **`data/testimonials.ts`**: five illustrative quotes, all attributed to
  `[STUDENT NAME]`. Never publish without the named student's written consent
  and their own words — and note the on-page notice warning about this was
  removed from the homepage per §3.
- **`data/programs.ts`, `data/news.ts`, `data/events.ts`**: all placeholder,
  none describe anything real.
- **Legal pages** (`/privacy-policy`, `/terms-and-conditions`): structural
  drafts only, explicitly marked as not legal documents, not written or
  reviewed by a lawyer.

Full accounting of what needs client sign-off is in `README.md` under
"Before this site goes live."

---

## 6. Design system reference (current)

Central tokens live in `app/globals.css`'s `@theme` block. Key ones:

| Token | Value | Note |
|---|---|---|
| `--color-navy` | `#011E3E` | Dominant brand colour |
| `--color-gold` | `#BD8A2E` | Fills, rules, icons — 2.7:1 on white, fails AA for text |
| `--color-gold-deep` | `#8A6318` | Text-safe gold on light surfaces (5.4:1 on white) |
| `--color-navy-muted` | `#A9B6C6` | Body text on navy (8.1:1) |
| `--font-display` | Poppins | All headlines, via `.headline` |
| `--font-mono` | JetBrains Mono | Numerals/data only (stats, program specs, registration codes) — never body copy |
| `--radius-*` | `0px` (all four) | Square corners, see §2 |

Every colour pairing introduced by the block hero was checked against WCAG
AA: white on navy 16.7:1, navy on gold 5.4:1, navy on gold-light 7.5:1.

Reusable primitives worth knowing about before building a new section:
`Section` (band tone/spacing), `Container` (gutters), `SectionIntro` (see
§2), `SectionHeading` (older stacked variant, still used on inner pages),
`Reveal`/`RevealGroup`/`RevealItem` (scroll animation), `Button`
(primary/secondary/quiet, primary has a `shine-sweep` hover effect),
`ContentNotice` (placeholder-content warning box — still used elsewhere,
just removed from the four spots in §3), `EmptyState`, `Accordion`,
`EnquiryForm` (frontend-only, doesn't send anywhere — see `lib/forms.ts`).

---

## 7. Verification standard used throughout this session

Every change in this project was verified the same way before being called
done. Follow this pattern for future changes:

1. `npx tsc --noEmit` — must be clean
2. `npx eslint .` — must be clean
3. `pkill -f "next"; sleep 3-4; rm -rf .next; npm run build` — clean **cold**
   build (warm builds can mask real errors; cold builds can show false
   ones from leftover processes — always kill first)
4. Start the production build (`npx next start -p 3100`) and check against
   **that**, not `next dev` — dev/HMR produces stale-looking hydration
   warnings that don't reproduce in production and wasted significant time
   this session before that was figured out.
5. A Playwright script (ad hoc, in the session's scratchpad, not committed
   anywhere in this repo) was used to check: horizontal overflow at 320–2560px
   across all breakpoints, exactly one `<h1>` per page, zero dangling
   `aria-labelledby`/`aria-describedby`/`aria-controls` references, zero
   hydration console errors, and screenshot comparison of the actual visual
   result. There is no permanent test suite in this repo — recreate this
   kind of check manually if you need it again.

A real bug worth remembering: a sitewide audit once found **41 dangling
`aria-labelledby` references** because `SectionHeading` didn't forward an
`id` prop to its rendered heading element, even though every `<Section>`
pointed `aria-labelledby` at one. Screen reader users were getting unlabelled
regions on almost every page. Fixed by adding `id` support to
`SectionHeading` (and `SectionIntro` inherits this). If you add a new
heading component, make sure it accepts and forwards `id`.

---

## 8. What to do next (suggested priority)

1. Get the real `logo.png` from the client and drop it in `public/`.
2. Get every `[INSERT ...]` / `[CONFIRM ...]` placeholder replaced with
   verified content, starting with anything regulatory (RTO/CRICOS/ABN) and
   anything international-student/visa-related (highest liability).
3. Decide whether to restore placeholder-content warning notices somewhere
   (even just as an internal/staging banner) until step 2 is complete, given
   they were removed from the four homepage locations in §3.
4. Source real photography to replace the Unsplash placeholder set in
   `data/images.ts` (see `public/images/README.md` for the swap procedure).
5. Connect a real backend to `lib/forms.ts` → `submitEnquiry()` before
   launch — right now the contact/application forms validate and show a
   success state but transmit nothing, and say so on-page.
6. `git init` this project. It has no version history at all right now.
