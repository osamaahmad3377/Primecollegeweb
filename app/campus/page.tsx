import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ContentNotice } from "@/components/ui/ContentNotice";
import { FinalCTA } from "@/components/home/FinalCTA";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { facilities } from "@/data/content";
import { images } from "@/data/images";
import { pad } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Campus",
  description:
    "Teaching spaces, technology laboratories, library and student areas at Prime International College Australia.",
  path: "/campus",
});

const trail = [{ name: "Campus", path: "/campus" }];

const gallery = [
  { image: images.lectureTheatre, caption: "Lecture theatre", span: "sm:col-span-8", ratio: "aspect-[16/9]" },
  { image: images.computerLab, caption: "Technology laboratory", span: "sm:col-span-4", ratio: "aspect-[3/4] sm:aspect-auto sm:h-full" },
  { image: images.libraryAisle, caption: "Library", span: "sm:col-span-4", ratio: "aspect-[3/4]" },
  { image: images.brightClassroom, caption: "Teaching room", span: "sm:col-span-8", ratio: "aspect-[16/10]" },
];

export default function CampusPage() {
  return (
    <>
      <PageHero
        eyebrow="Campus"
        title="Where the work happens"
        lead="Rooms built for teaching rather than for photographs — and the quieter spaces around them where most of the actual studying gets done."
        image={images.campusModern}
        trail={trail}
      />

      <Section tone="white" aria-labelledby="gallery-heading">
        <Container>
          <SectionHeading
            id="gallery-heading"
            eyebrow="Around campus"
            title="A place designed to be used"
            lead="Every space on campus exists because a particular kind of learning needed somewhere to happen."
            className="max-w-[40rem]"
          />

          {/* Uneven gallery grid — sizes vary so the page reads as a spread. */}
          <div className="mt-14 grid auto-rows-min gap-5 sm:grid-cols-12 sm:gap-6">
            {gallery.map((item, index) => (
              <Reveal
                key={item.caption}
                delay={index * 0.06}
                className={`${item.span} ${item.ratio}`}
              >
                <figure className="group relative h-full">
                  <div className="media-zoom relative h-full overflow-hidden rounded-media bg-mist">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(min-width: 640px) 60vw, 100vw"
                      className="object-cover"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,color-mix(in_srgb,var(--color-navy-dark)_80%,transparent),transparent)]"
                    />
                  </div>
                  <figcaption className="absolute bottom-4 left-5 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                    <span aria-hidden="true" className="block h-px w-5 bg-gold" />
                    {item.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="navy" aria-labelledby="facilities-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading
                id="facilities-heading"
                tone="dark"
                eyebrow="Facilities"
                title="What you will find here"
                as="h2"
              />
            </div>

            <RevealGroup as="ul" className="lg:col-span-8">
              {facilities.map((facility, index) => (
                <RevealItem
                  as="li"
                  key={facility.title}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-5 border-t border-white/15 py-7 last:border-b sm:grid-cols-[4rem_1fr] sm:gap-x-8 sm:py-9"
                >
                  <span className="font-display text-[1.5rem] leading-none text-gold-light sm:text-[1.75rem]">
                    {pad(index + 1)}
                  </span>
                  <div>
                    <h3 className="headline text-subtitle text-white">
                      {facility.title}
                    </h3>
                    <p className="mt-2.5 max-w-[56ch] leading-relaxed text-navy-muted">
                      {facility.description}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal className="mt-14">
            <ContentNotice tone="dark">
              [INSERT OFFICIAL CAMPUS INFORMATION — campus address, opening
              hours, accessibility provisions, transport and parking. The
              photographs on this page are development placeholders and do not
              show the college&rsquo;s actual campus.]
            </ContentNotice>
          </Reveal>
        </Container>
      </Section>

      <FinalCTA />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, ...trail])} />
    </>
  );
}
