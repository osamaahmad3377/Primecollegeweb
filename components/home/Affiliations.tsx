import { Container } from "@/components/ui/Container";
import { ContentNotice } from "@/components/ui/ContentNotice";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * Credential strip.
 *
 * Accreditation and partner marks are the single strongest trust signal on a
 * college website — and the easiest to get wrong. Nothing here asserts a
 * registration, partnership or recognition the college has not confirmed:
 * each slot is an explicitly empty frame awaiting a real credential.
 *
 * To populate: replace `slots` with the confirmed marks, swapping the label
 * frame for a next/image of the supplied logo.
 */
const slots = [
  "[ACCREDITATION MARK]",
  "[REGULATORY REGISTRATION]",
  "[INDUSTRY BODY]",
  "[PARTNER INSTITUTION]",
  "[PARTNER INSTITUTION]",
];

export function Affiliations() {
  return (
    <section
      aria-labelledby="affiliations-heading"
      className="border-y border-ink/10 bg-cream py-12 sm:py-14"
    >
      <Container>
        <Reveal>
          <div className="flex flex-col items-center gap-3 text-center">
            <span aria-hidden="true" className="block h-px w-10 bg-gold" />
            <h2
              id="affiliations-heading"
              className="eyebrow text-gold-deep"
            >
              Recognition &amp; affiliations
            </h2>
          </div>
        </Reveal>

        <RevealGroup
          as="ul"
          className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        >
          {slots.map((slot, index) => (
            <RevealItem as="li" key={`${slot}-${index}`}>
              <div className="flex h-20 items-center justify-center rounded-card border border-dashed border-ink/20 bg-white px-3 text-center">
                <span className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted">
                  {slot}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal>
          <ContentNotice className="mx-auto mt-9 max-w-[64ch] bg-white">
            These slots are intentionally empty. No accreditation, registration,
            recognition or partnership has been claimed on the college&rsquo;s
            behalf. [INSERT ONLY CREDENTIALS THE COLLEGE HAS CONFIRMED IN
            WRITING — this row is where prospective students look for proof, and
            an incorrect mark here is a regulatory problem, not a design one.]
          </ContentNotice>
        </Reveal>
      </Container>
    </section>
  );
}
