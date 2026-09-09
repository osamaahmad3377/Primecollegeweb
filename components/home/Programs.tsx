import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProgramCard } from "@/components/programs/ProgramCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { EmptyState } from "@/components/ui/EmptyState";
import { programCategories, programs } from "@/data/programs";

export function Programs() {
  /* One representative program per category, capped at four cards. */
  const shown = programCategories
    .map((category) => programs.find((p) => p.category === category))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 4);

  return (
    <Section tone="cream" aria-labelledby="programs-heading">
      <Container>
        <SectionIntro
          id="programs-heading"
          eyebrow="Fields of study"
          title="Explore our programs"
          lead="Six areas of study, each taught by people who have worked in the field and structured around what employers in it actually need."
          link={{ label: "View all programs", href: "/programs" }}
        />

        {/* Category rail — a quiet, typographic index rather than a card set. */}
        <Reveal delay={0.1}>
          <nav aria-label="Program categories" className="mt-12">
            <ul className="flex flex-wrap gap-x-2 gap-y-2">
              {programCategories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/programs?category=${encodeURIComponent(category)}`}
                    className="inline-flex rounded-button border border-navy/15 bg-white px-4 py-2 text-xs font-medium text-navy transition-colors duration-300 hover:border-gold hover:bg-navy hover:text-white"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>

        {shown.length > 0 ? (
          <RevealGroup
            as="ul"
            className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-4"
          >
            {shown.map((program) => (
              <RevealItem as="li" key={program.slug}>
                <ProgramCard program={program} />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <EmptyState
            className="mt-14"
            title="Program information is being updated"
            description="Our course listings are currently being revised. Please contact the admissions team for details of what is available."
          />
        )}
      </Container>
    </Section>
  );
}
