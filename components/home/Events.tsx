import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { EventList } from "@/components/events/EventList";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sortedEvents } from "@/data/events";

export function Events() {
  return (
    <Section tone="white" aria-labelledby="events-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              id="events-heading"
              eyebrow="What's on"
              title="Upcoming events"
              lead="Information evenings, orientation sessions and industry nights. Everyone is welcome — bring your questions."
            />
            <Reveal delay={0.16} className="mt-9">
              <ArrowLink href="/events">Full calendar</ArrowLink>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <EventList events={sortedEvents.slice(0, 3)} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
