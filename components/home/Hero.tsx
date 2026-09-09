import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { images } from "@/data/images";
import { site } from "@/data/site";
import type { ImageAsset } from "@/lib/types";

/**
 * The hero: three full-bleed rows, each half photograph and half solid colour,
 * carrying one large lowercase statement and a single action.
 *
 * Colour blocks butted hard against photography — no radius, no scrim, no text
 * floating over an image — is the whole idea. The photograph and the colour are
 * equal halves of one band, which is what gives the page its graphic, confident
 * opening. Rows alternate which side the image sits on so the eye zig-zags down.
 *
 * This is now a server component: the previous photographic hero needed client
 * JavaScript for parallax and a cursor spotlight, and neither survives the move
 * to flat colour fields.
 */

interface HeroRow {
  image: ImageAsset;
  /**
   * Rendered lowercase by `.headline`. Capitalisation is kept in the DOM, so
   * assistive technology and search engines still receive it properly cased.
   */
  title: string;
  cta: { label: string; href: string };
  field: "navy" | "navyDark" | "gold";
  imageSide: "left" | "right";
}

const rows: HeroRow[] = [
  {
    image: images.heroCampus,
    title: "Shape your future.",
    cta: { label: "Explore programs", href: "/programs" },
    field: "navy",
    imageSide: "left",
  },
  {
    image: images.diverseOutdoors,
    title: "Build what comes next.",
    cta: { label: "Apply now", href: "/admissions#apply" },
    field: "navyDark",
    imageSide: "right",
  },
  {
    image: images.graduationSky,
    title: "Be part of it.",
    cta: { label: "Talk to our team", href: "/contact" },
    field: "gold",
    imageSide: "left",
  },
];

/* Every pairing here is checked against WCAG AA: white on navy 16.7:1,
   navy on gold 5.4:1, navy on gold-light 7.5:1. */
const fields: Record<HeroRow["field"], { bg: string; text: string; cta: string }> = {
  navy: {
    bg: "bg-navy",
    text: "text-white",
    cta: "bg-gold text-navy hover:bg-gold-light",
  },
  navyDark: {
    bg: "bg-navy-dark",
    text: "text-white",
    cta: "bg-gold text-navy hover:bg-gold-light",
  },
  gold: {
    bg: "bg-gold",
    text: "text-navy",
    cta: "bg-navy text-white hover:bg-navy-dark",
  },
};

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="bg-white">
      {/* The rows are statements rather than a document outline, so the page's
          single h1 is carried here and the rows render as plain text. */}
      <h1 id="hero-heading" className="sr-only">
        {site.name} — {site.tagline}
      </h1>

      {rows.map((row, index) => {
        const field = fields[row.field];
        const first = index === 0;

        return (
          <div
            key={row.title}
            className="grid min-h-[22rem] grid-cols-1 lg:min-h-[27rem] lg:grid-cols-2"
          >
            <div
              className={`relative min-h-[15rem] lg:min-h-0 ${
                row.imageSide === "right" ? "lg:order-2" : ""
              }`}
            >
              <Image
                src={row.image.src}
                alt={row.image.alt}
                fill
                priority={first}
                quality={82}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div
              className={`flex items-center ${field.bg} ${
                row.imageSide === "right" ? "lg:order-1" : ""
              }`}
            >
              <div className="w-full px-6 py-14 sm:px-10 lg:px-14 lg:py-16 xl:px-20">
                <Reveal>
                  <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between xl:gap-12">
                    <p
                      className={`headline max-w-[14ch] text-[clamp(2.25rem,1.5rem+3.2vw,4.25rem)] leading-[1.02] ${field.text}`}
                    >
                      {row.title}
                    </p>

                    <Link
                      href={row.cta.href}
                      className={`group inline-flex shrink-0 items-center gap-3 self-start px-7 py-4 text-xs font-semibold uppercase tracking-[0.1em] transition-colors duration-300 xl:self-auto ${field.cta}`}
                    >
                      {row.cta.label}
                      <ArrowRight
                        aria-hidden="true"
                        strokeWidth={2}
                        className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                      />
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        );
      })}

      {/* A statement of intent immediately beneath the blocks. Rendered as a
          paragraph, not a heading — the page's h1 is the visually hidden one
          above, and this is a statement rather than a section title. */}
      <Container className="py-20 sm:py-24 lg:py-32">
        <SectionIntro
          as="p"
          size="display"
          eyebrow="Our purpose"
          title="Prime prepares students for the work that follows the qualification."
          lead="An education built on rigour, taught by people who have done the work, in a community drawn from across the world."
          link={{ label: "About the college", href: "/about" }}
        />
      </Container>
    </section>
  );
}
