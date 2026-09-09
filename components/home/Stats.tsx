import { Container } from "@/components/ui/Container";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { statistics } from "@/data/content";
import { CountUp } from "@/components/ui/CountUp";

export function Stats() {
  return (
    <Section tone="navy" spacing="tight" aria-labelledby="stats-heading">
      <Container>
        <h2 id="stats-heading" className="sr-only">
          The college at a glance
        </h2>

        <RevealGroup
          as="ul"
          className="grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-8"
        >
          {statistics.map((stat) => (
            <RevealItem
              as="li"
              key={stat.label}
              className="relative pl-5 sm:pl-6"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 h-14 w-px bg-gold"
              />
              {/* Mono, not serif — a precise "readout" quality for the one
                  place on the page where a raw figure is the whole point. */}
              <p className="font-mono text-[clamp(2.25rem,1.55rem+3vw,3.75rem)] font-medium leading-none tracking-tight text-gold-light">
                <CountUp value={stat.value} />
              </p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.13em] text-white">
                {stat.label}
              </p>
              <p className="mt-1.5 text-sm text-navy-muted">{stat.detail}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        
      </Container>
    </Section>
  );
}
