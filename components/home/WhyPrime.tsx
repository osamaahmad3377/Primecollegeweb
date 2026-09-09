import {
  Briefcase,
  Compass,
  Globe,
  GraduationCap,
  LifeBuoy,
  Users,
  type LucideIcon,
} from "lucide-react";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { principles } from "@/data/content";
import { pad } from "@/lib/utils";

/** Maps the icon names in data/content.ts to their components. */
const icons: Record<string, LucideIcon> = {
  GraduationCap,
  Briefcase,
  LifeBuoy,
  Globe,
  Compass,
  Users,
};

/**
 * The six reasons to choose Prime, as a card grid.
 *
 * Cards are navy fields rather than white panels — the strongest way to make
 * six repeated cards still feel considered against the white section they sit
 * on. Gold marks the icon and the hover rule; every text colour on the card is
 * verified against navy: white title 16.7:1, navy-muted body 8.1:1, gold-light
 * icon 7.5:1 — all comfortably past WCAG AA.
 */
export function WhyPrime() {
  return (
    <Section tone="cream" aria-labelledby="why-heading">
      <Container>
        <SectionIntro
          id="why-heading"
          eyebrow="The Prime difference"
          title="Why Prime?"
          lead="Six commitments that shape how we teach, who we hire and what we expect of ourselves."
          index={pad(principles.length)}
        />

        <RevealGroup
          as="ul"
          className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {principles.map((principle, index) => {
            const Icon = icons[principle.icon] ?? GraduationCap;

            return (
              <RevealItem as="li" key={principle.title} className="group">
                <article className="card-lift relative flex h-full flex-col overflow-hidden rounded-card border border-white/10 bg-navy p-7 shadow-[0_1px_2px_rgba(1,30,62,0.06),0_14px_36px_-18px_rgba(1,30,62,0.45)] transition-shadow duration-500 group-hover:shadow-[0_1px_2px_rgba(1,30,62,0.08),0_24px_48px_-20px_rgba(1,30,62,0.55)] sm:p-8">
                  {/* Gold rule across the top edge, drawn in on hover. */}
                  <span
                    aria-hidden="true"
                    className="rule-draw absolute inset-x-0 top-0 h-0.5 bg-gold"
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.25}
                      className="size-10 shrink-0 text-gold-light transition-colors duration-500 group-hover:text-white motion-reduce:transition-none"
                    />
                    <span
                      aria-hidden="true"
                      className="font-mono text-xs text-white/25"
                    >
                      {pad(index + 1)}
                    </span>
                  </div>

                  <div className="relative">
                    <h3 className="mt-7 headline text-[1.375rem] leading-snug text-white sm:text-[1.5rem]">
                      {principle.title}
                    </h3>

                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-muted">
                      {principle.description}
                    </p>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal className="mt-12">
          <ArrowLink href="/why-prime">
            The full picture
          </ArrowLink>
        </Reveal>
      </Container>
    </Section>
  );
}
