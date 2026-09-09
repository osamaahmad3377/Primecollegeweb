import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { admissionSteps } from "@/data/content";
import { pad } from "@/lib/utils";

export function Admissions() {
  return (
    <Section tone="white" aria-labelledby="admissions-heading" id="admissions">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              id="admissions-heading"
              eyebrow="Admissions"
              title="Your journey starts here."
              lead="Applying to Prime is deliberately straightforward. Four steps, a clear answer at the end of each, and someone to talk to at every point."
            />

            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap lg:flex-col xl:flex-row">
                <Button href="/admissions#apply" size="lg">
                  Start Your Application
                </Button>
                <Button href="/contact" variant="secondary" size="lg">
                  Talk To Our Team
                </Button>
              </div>
            </Reveal>
          </div>

          {/* The steps run as a numbered sequence with a connecting rule,
              rather than four separate cards. */}
          <RevealGroup as="ol" className="lg:col-span-8 lg:pt-2">
            {admissionSteps.map((step, index) => (
              <RevealItem
                as="li"
                key={step.title}
                className="group relative grid grid-cols-[3.25rem_1fr] gap-x-5 border-t border-ink/12 py-7 last:border-b sm:grid-cols-[5rem_1fr] sm:gap-x-8 sm:py-9"
              >
                <span className="font-display text-[1.5rem] leading-none text-gold sm:text-[2rem]">
                  {pad(index + 1)}
                </span>
                <div>
                  <h3 className="headline text-subtitle text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 max-w-[56ch] text-base leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
