import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ContentNotice } from "@/components/ui/ContentNotice";
import { FinalCTA } from "@/components/home/FinalCTA";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { mission, values, vision } from "@/data/content";
import { images } from "@/data/images";
import { site } from "@/data/site";
import { pad } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "The story, vision, mission and values of Prime International College Australia — an independent college built around practical teaching and student success.",
  path: "/about",
});

const trail = [{ name: "About Us", path: "/about" }];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="An institution built around its students"
        lead="Prime was founded on a simple conviction: that education is only worth something if it changes what a person is capable of."
        image={images.campusExterior}
        trail={trail}
      />

      {/* Our story — editorial two-column opening */}
      <Section tone="white" aria-labelledby="story-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading id="story-heading" eyebrow="Our story" title="How Prime began" as="h2" />
            </div>
            <div className="lg:col-span-7">
              <Reveal>
                <div className="space-y-6 text-lead text-muted">
                  <p>
                    Every college has an origin story, and most of them are told
                    in the same way. Ours is still being written properly, and we
                    would rather leave this space honest than fill it with
                    something approximate.
                  </p>
                  <p>
                    What can be said now is what the college is for. Prime exists
                    to teach people things they can use — to take a student who
                    arrives uncertain and hand them, at the end, a qualification
                    and the genuine ability that ought to sit behind it. That is
                    a harder standard than it sounds, and it governs how we
                    design programs, who we employ to teach them and what we are
                    prepared to promise.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.1} className="mt-8">
                <ContentNotice>
                  [INSERT THE COLLEGE&rsquo;S OFFICIAL HISTORY — founding year,
                  founders, milestones and campus history. Nothing has been
                  invented here.]
                </ContentNotice>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Vision and mission on navy */}
      <Section tone="navy" aria-labelledby="vision-heading">
        <Container>
          <h2 id="vision-heading" className="sr-only">
            Our vision and mission
          </h2>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            {[
              { label: "Our vision", body: vision },
              { label: "Our mission", body: mission },
            ].map((block, index) => (
              <Reveal key={block.label} delay={index * 0.08}>
                <div className="border-t border-gold pt-8">
                  <p className="eyebrow text-gold-light">{block.label}</p>
                  <p className="mt-6 headline-cased text-[clamp(1.5rem,1.1rem+1.6vw,2.125rem)] leading-[1.35] text-white">
                    {block.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section tone="white" aria-labelledby="values-heading">
        <Container>
          <SectionHeading
            id="values-heading"
            eyebrow="Our values"
            title="What we hold ourselves to"
            lead="Four commitments that decide the difficult calls — the ones made when nobody is watching."
            className="max-w-[38rem]"
          />

          <RevealGroup as="ul" className="mt-14 grid gap-x-12 sm:grid-cols-2">
            {values.map((value, index) => (
              <RevealItem
                as="li"
                key={value.title}
                className="border-t border-ink/12 py-8"
              >
                <div className="flex items-baseline gap-5">
                  <span className="w-7 shrink-0 font-display text-xl leading-none text-gold">
                    {pad(index + 1)}
                  </span>
                  <div>
                    <h3 className="headline text-subtitle text-navy">
                      {value.title}
                    </h3>
                    <p className="mt-2.5 max-w-[46ch] leading-relaxed text-muted">
                      {value.description}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Academic approach — image left, text right */}
      <Section tone="cream" aria-labelledby="approach-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal direction="left" className="lg:col-span-6">
              <figure className="relative aspect-[4/3] overflow-hidden rounded-media bg-mist">
                <Image
                  src={images.seminarRoom.src}
                  alt={images.seminarRoom.alt}
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover"
                />
              </figure>
            </Reveal>

            <div className="lg:col-span-6">
              <SectionHeading
                id="approach-heading"
                eyebrow="Academic approach"
                title="Taught by practitioners, assessed on capability"
                as="h2"
              />
              <Reveal delay={0.12}>
                <div className="mt-7 space-y-5 text-lead text-muted">
                  <p>
                    We hire people who have done the work. A curriculum written
                    only by academics drifts from practice within a few years;
                    one written only by practitioners loses its structure. Prime
                    holds both, deliberately.
                  </p>
                  <p>
                    Assessment follows the same logic. Wherever a discipline
                    allows it, students are asked to produce something — a plan,
                    a system, a piece of work that could stand up outside the
                    classroom — rather than only to recall.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Student experience */}
      <Section tone="white" aria-labelledby="experience-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading
                id="experience-heading"
                eyebrow="Student experience"
                title="Small enough to be known"
                as="h2"
              />
              <Reveal delay={0.12}>
                <div className="mt-7 space-y-5 text-lead text-muted">
                  <p>
                    Scale changes what a college can be. Prime is deliberately
                    sized so that teaching staff notice when a student stops
                    turning up, and so that asking for help does not require
                    navigating a bureaucracy first.
                  </p>
                  <p>
                    For students who have moved countries to be here, that
                    matters more than any facility. The most valuable thing a
                    college can offer someone a long way from home is the
                    reasonable expectation of being noticed.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal direction="right" delay={0.08} className="lg:col-span-6">
              <figure className="relative aspect-[4/3] overflow-hidden rounded-media bg-mist">
                <Image
                  src={images.mentoring.src}
                  alt={images.mentoring.alt}
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover"
                />
              </figure>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Leadership placeholder — no invented people */}
      <Section tone="cream" spacing="tight" aria-labelledby="leadership-heading">
        <Container>
          <SectionHeading
            id="leadership-heading"
            eyebrow="Leadership"
            title="Our leadership team"
            as="h2"
            lead={`Profiles of the people who lead ${site.shortName} will be published here.`}
            className="max-w-[38rem]"
          />
          <Reveal className="mt-10">
            <ContentNotice className="bg-white">
              [INSERT LEADERSHIP PROFILES — names, roles, qualifications and
              photographs. No individuals have been invented for this section;
              it is intentionally empty until real profiles are supplied.]
            </ContentNotice>
          </Reveal>
        </Container>
      </Section>

      <FinalCTA />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, ...trail])} />
    </>
  );
}
