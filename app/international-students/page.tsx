import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ContentNotice } from "@/components/ui/ContentNotice";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/home/FinalCTA";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { internationalSupport } from "@/data/content";
import { images } from "@/data/images";
import { site } from "@/data/site";
import { pad } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "International Students",
  description:
    "Information and support for international students studying at Prime International College Australia — applying, arriving, settling in and studying well.",
  path: "/international-students",
});

const trail = [
  { name: "International Students", path: "/international-students" },
];

const livingTopics = [
  {
    title: "Getting here",
    body: "Guidance on planning your arrival, what to bring and what to arrange before you travel. [INSERT OFFICIAL PRE-DEPARTURE INFORMATION]",
  },
  {
    title: "Accommodation",
    body: "Options for where to live, what they typically cost and how to arrange them safely. [INSERT OFFICIAL ACCOMMODATION GUIDANCE]",
  },
  {
    title: "Cost of living",
    body: "A realistic picture of weekly expenses so you can budget before you arrive. [INSERT OFFICIAL COST OF LIVING GUIDANCE]",
  },
  {
    title: "Health and wellbeing",
    body: "How to access healthcare and support services while you are studying. [INSERT OFFICIAL HEALTH COVER AND SERVICES INFORMATION]",
  },
  {
    title: "Working while studying",
    body: "What you should know about employment during your studies. [INSERT OFFICIAL INFORMATION — this is governed by visa conditions and must not be summarised without verification.]",
  },
  {
    title: "Your rights",
    body: "The protections and complaint processes available to you as an international student in Australia. [INSERT OFFICIAL STUDENT RIGHTS INFORMATION]",
  },
];

export default function InternationalStudentsPage() {
  return (
    <>
      <PageHero
        eyebrow="International students"
        title="Your global future starts here."
        lead="Students come to Prime from across the world. Everything here is written for the person doing this for the first time."
        image={images.diverseOutdoors}
        trail={trail}
      />

      {/* The important caveat, stated immediately rather than buried. */}
      <Section tone="cream" spacing="tight" aria-labelledby="notice-heading">
        <Container>
          <h2 id="notice-heading" className="sr-only">
            Important notice
          </h2>
          <Reveal>
            <ContentNotice className="bg-white">
              <strong className="font-semibold text-navy">
                Prime does not provide migration advice.
              </strong>{" "}
              Student visa requirements, conditions, work entitlements and health
              cover obligations are set by the Australian Government and change
              from time to time. Always confirm your circumstances through the
              Australian Government&rsquo;s official channels or a registered
              migration agent. Nothing on this website is a substitute for that.
              [INSERT OFFICIAL INTERNATIONAL STUDENT INFORMATION AND LINKS]
            </ContentNotice>
          </Reveal>
        </Container>
      </Section>

      {/* Support through the journey */}
      <Section tone="white" aria-labelledby="support-heading">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                id="support-heading"
                eyebrow="Support"
                title="Someone alongside you at every stage"
                as="h2"
                lead="Studying abroad is a sequence of unfamiliar situations. Our support is organised around that sequence rather than around our own departments."
              />
              <Reveal delay={0.14} className="mt-10">
                <figure className="relative aspect-[4/3] overflow-hidden rounded-media bg-mist">
                  <Image
                    src={images.diverseLaptop.src}
                    alt={images.diverseLaptop.alt}
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover"
                  />
                </figure>
              </Reveal>
            </div>

            <RevealGroup as="ol" className="lg:col-span-7">
              {internationalSupport.map((item, index) => (
                <RevealItem
                  as="li"
                  key={item.title}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-5 border-t border-ink/12 py-7 last:border-b sm:grid-cols-[4rem_1fr] sm:gap-x-8 sm:py-9"
                >
                  <span className="font-display text-[1.5rem] leading-none text-gold sm:text-[1.75rem]">
                    {pad(index + 1)}
                  </span>
                  <div>
                    <h3 className="headline text-subtitle text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 max-w-[56ch] leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* Living in Australia */}
      <Section tone="navy" aria-labelledby="living-heading">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                id="living-heading"
                tone="dark"
                eyebrow="Living in Australia"
                title="The practical side"
                as="h2"
                lead="The questions students actually ask before they arrive — answered plainly, and only where we can answer them accurately."
              />
              <Reveal delay={0.14} className="mt-10">
                <figure className="relative aspect-[16/10] overflow-hidden rounded-media bg-navy-soft">
                  <Image
                    src={images.sydney.src}
                    alt={images.sydney.alt}
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover"
                  />
                </figure>
              </Reveal>
            </div>

            <RevealGroup as="ul" className="lg:col-span-7 grid gap-x-10 sm:grid-cols-2">
              {livingTopics.map((topic) => (
                <RevealItem
                  as="li"
                  key={topic.title}
                  className="border-t border-white/15 py-7"
                >
                  <h3 className="text-base font-semibold text-white">
                    {topic.title}
                  </h3>
                  <p className="mt-2.5 max-w-[42ch] text-sm leading-relaxed text-navy-muted">
                    {topic.body}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* Talk to the international team */}
      <Section tone="white" spacing="tight" aria-labelledby="intl-contact-heading">
        <Container>
          <div className="flex flex-col gap-8 border-t border-ink/12 pt-12 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2
                id="intl-contact-heading"
                className="headline text-title text-navy"
              >
                Speak to our international team
              </h2>
              <p className="mt-4 max-w-[52ch] text-lead text-muted">
                Ask us anything — about applying, about the programs, or about
                what life here is actually like.
              </p>
              <p className="mt-6 text-sm text-muted">
                {site.contact.internationalEmail}
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 xs:flex-row">
              <Button href="/contact" size="lg">
                Enquire Now
              </Button>
              <Button href="/programs" variant="secondary" size="lg">
                Browse Programs
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCTA />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, ...trail])} />
    </>
  );
}
