import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ContentNotice } from "@/components/ui/ContentNotice";
import { ProgramExplorer } from "@/components/programs/ProgramExplorer";
import { FinalCTA } from "@/components/home/FinalCTA";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { categoryIntros, programCategories, programs } from "@/data/programs";
import { images } from "@/data/images";

export const metadata = pageMetadata({
  title: "Programs",
  description:
    "Explore programs at Prime International College Australia across business, information technology, health, community services, hospitality and pathway studies.",
  path: "/programs",
});

const trail = [{ name: "Programs", path: "/programs" }];

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Explore our programs"
        lead="Six fields of study, each built backwards from the work our graduates intend to do."
        image={images.brightClassroom}
        trail={trail}
      />

      {/* Category overview — typographic index, not a card wall. */}
      <Section tone="white" spacing="tight" aria-labelledby="fields-heading">
        <Container>
          <SectionHeading
            id="fields-heading"
            eyebrow="Fields of study"
            title="Where would you like to start?"
            as="h2"
            className="max-w-[36rem]"
          />
          <ul className="mt-12 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {programCategories.map((category) => (
              <li key={category} className="border-t border-ink/12 py-6">
                <h3 className="text-base font-semibold text-navy">{category}</h3>
                <p className="mt-2 max-w-[38ch] text-sm leading-relaxed text-muted">
                  {categoryIntros[category]}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="cream" aria-labelledby="all-programs-heading">
        <Container>
          <h2 id="all-programs-heading" className="sr-only">
            All programs
          </h2>
          <ProgramExplorer programs={programs} />

          <Reveal className="mt-14">
            <ContentNotice className="bg-white">
              All program information on this site — titles, durations, study
              modes, intakes, entry requirements and career outcomes — is
              placeholder content created for design purposes. It has not been
              verified and must be replaced with the college&rsquo;s official,
              approved course documentation before publication.
            </ContentNotice>
          </Reveal>
        </Container>
      </Section>

      <FinalCTA />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, ...trail])} />
    </>
  );
}
