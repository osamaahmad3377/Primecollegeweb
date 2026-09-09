import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { studentLifePillars } from "@/data/content";
import { images } from "@/data/images";
import type { ImageAsset } from "@/lib/types";

/** A deliberately uneven mosaic — closer to a magazine spread than a grid. */
const mosaic: { image: ImageAsset; caption: string; className: string; sizes: string }[] = [
  {
    image: images.collaboration,
    caption: "Learning",
    className: "sm:col-span-7 aspect-[4/3]",
    sizes: "(min-width: 640px) 55vw, 100vw",
  },
  {
    image: images.eventHall,
    caption: "Events",
    className: "sm:col-span-5 aspect-[4/3] sm:aspect-[3/4]",
    sizes: "(min-width: 640px) 40vw, 100vw",
  },
  {
    image: images.diverseLaptop,
    caption: "Community",
    className: "sm:col-span-5 aspect-[4/3] sm:-mt-24",
    sizes: "(min-width: 640px) 40vw, 100vw",
  },
  {
    image: images.libraryStacks,
    caption: "Campus",
    className: "sm:col-span-7 aspect-[16/10]",
    sizes: "(min-width: 640px) 55vw, 100vw",
  },
];

export function StudentLife() {
  return (
    <Section tone="white" aria-labelledby="student-life-heading">
      <Container>
        <SectionIntro
          id="student-life-heading"
          eyebrow="Student life"
          title="More than a timetable"
          lead="What students remember is rarely the assessment schedule. It is the people they met, the work they made and the place they made it in."
          link={{ label: "Explore student life", href: "/student-life" }}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-12 sm:gap-6">
          {mosaic.map((item, index) => (
            <Reveal
              key={item.caption}
              delay={index * 0.06}
              className={item.className}
            >
              <figure className="group relative h-full">
                <div className="media-zoom relative h-full overflow-hidden rounded-media bg-mist">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes={item.sizes}
                    className="object-cover"
                  />
                  {/* A minimal scrim so the caption stays legible over any
                      photograph, without washing the image out. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,color-mix(in_srgb,var(--color-navy-dark)_80%,transparent),transparent)]"
                  />
                </div>
                <figcaption className="absolute bottom-4 left-5 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white">
                  <span aria-hidden="true" className="block h-px w-5 bg-gold" />
                  {item.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-10 border-t border-ink/12 pt-12 sm:grid-cols-3 sm:gap-8">
          {studentLifePillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.07}>
              <h3 className="headline text-subtitle text-navy">
                {pillar.title}
              </h3>
              <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-muted">
                {pillar.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
