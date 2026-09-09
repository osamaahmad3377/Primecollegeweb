import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ContentNotice } from "@/components/ui/ContentNotice";
import { EventList } from "@/components/events/EventList";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCTA } from "@/components/home/FinalCTA";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { studentLifePillars } from "@/data/content";
import { sortedEvents } from "@/data/events";
import { images } from "@/data/images";
import type { ImageAsset } from "@/lib/types";

export const metadata = pageMetadata({
  title: "Student Life",
  description:
    "Community, support, events and everyday life at Prime International College Australia.",
  path: "/student-life",
});

const trail = [{ name: "Student Life", path: "/student-life" }];

const mosaic: { image: ImageAsset; caption: string; className: string }[] = [
  { image: images.collaboration, caption: "Learning together", className: "sm:col-span-7 aspect-[4/3]" },
  { image: images.auditorium, caption: "Events", className: "sm:col-span-5 aspect-[4/3] sm:aspect-[3/4]" },
  { image: images.studyingFocused, caption: "Study spaces", className: "sm:col-span-4 aspect-[4/3]" },
  { image: images.graduationSeats, caption: "Milestones", className: "sm:col-span-4 aspect-[4/3]" },
  { image: images.teamwork, caption: "Community", className: "sm:col-span-4 aspect-[4/3]" },
];

const supportServices = [
  {
    title: "Academic support",
    body: "One-to-one help with assignments, study technique and academic writing, available across the teaching week.",
  },
  {
    title: "Wellbeing services",
    body: "Confidential support for students dealing with anything that is getting in the way of their study. [INSERT OFFICIAL SERVICE DETAILS]",
  },
  {
    title: "International student advisers",
    body: "Staff who specialise in the practical questions students face when studying a long way from home.",
  },
  {
    title: "Careers and employability",
    body: "Help with portfolios, applications and interviews, so the work of finding a role starts before graduation.",
  },
];

export default function StudentLifePage() {
  return (
    <>
      <PageHero
        eyebrow="Student life"
        title="More than a timetable"
        lead="What students remember is rarely the assessment schedule. It is the people they met, the work they made and the place they made it in."
        image={images.studyGroup}
        trail={trail}
      />

      {/* Mosaic */}
      <Section tone="white" aria-labelledby="life-gallery-heading">
        <Container>
          <SectionHeading
            id="life-gallery-heading"
            eyebrow="Around campus"
            title="A community, not a cohort"
            lead="Prime is small enough that students know each other, and international enough that knowing each other is genuinely worth something."
            className="max-w-[42rem]"
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-12 sm:gap-6">
            {mosaic.map((item, index) => (
              <Reveal
                key={item.caption}
                delay={index * 0.05}
                className={item.className}
              >
                <figure className="group relative h-full">
                  <div className="media-zoom relative h-full overflow-hidden rounded-media bg-mist">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
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

      {/* Pillars */}
      <Section tone="cream" spacing="tight" aria-labelledby="pillars-heading">
        <Container>
          <h2 id="pillars-heading" className="sr-only">
            Student life at Prime
          </h2>
          <RevealGroup as="ul" className="grid gap-10 sm:grid-cols-3 sm:gap-8">
            {studentLifePillars.map((pillar) => (
              <RevealItem as="li" key={pillar.title} className="border-t border-ink/15 pt-7">
                <h3 className="headline text-subtitle text-navy">
                  {pillar.title}
                </h3>
                <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-muted">
                  {pillar.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Support services */}
      <Section tone="navy" aria-labelledby="services-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                id="services-heading"
                tone="dark"
                eyebrow="Support"
                title="Help, offered early"
                as="h2"
                lead="The support that is easy to give in week two is much harder to give in week ten. We would rather hear from you sooner."
              />
            </div>
            <RevealGroup as="ul" className="lg:col-span-7 grid gap-x-10 sm:grid-cols-2">
              {supportServices.map((service) => (
                <RevealItem
                  as="li"
                  key={service.title}
                  className="border-t border-white/15 py-7"
                >
                  <h3 className="text-base font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 max-w-[42ch] text-sm leading-relaxed text-navy-muted">
                    {service.body}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* Events */}
      <Section tone="white" aria-labelledby="life-events-heading">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="life-events-heading"
              eyebrow="What's on"
              title="Coming up"
              className="lg:max-w-[34rem]"
            />
            <Reveal delay={0.1} className="shrink-0 lg:pb-3">
              <ArrowLink href="/events">Full calendar</ArrowLink>
            </Reveal>
          </div>
          <div className="mt-12">
            <EventList events={sortedEvents.slice(0, 3)} />
          </div>
          <Reveal className="mt-10">
            <ContentNotice>
              [INSERT OFFICIAL STUDENT LIFE CONTENT — clubs and societies,
              student representation, orientation programs and support service
              details. The photographs on this page are development placeholders.]
            </ContentNotice>
          </Reveal>
        </Container>
      </Section>

      <Testimonials />
      <FinalCTA />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, ...trail])} />
    </>
  );
}
