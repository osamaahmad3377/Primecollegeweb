import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { EventList } from "@/components/events/EventList";
import { ContentNotice } from "@/components/ui/ContentNotice";
import { FinalCTA } from "@/components/home/FinalCTA";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { sortedEvents } from "@/data/events";
import { images } from "@/data/images";

export const metadata = pageMetadata({
  title: "Events",
  description:
    "Information evenings, orientation sessions, industry nights and showcases at Prime International College Australia.",
  path: "/events",
});

const trail = [{ name: "Events", path: "/events" }];

export default function EventsPage() {
  /* Split by whether the date has passed, so the page stays correct over time
     without anyone editing it. */
  const now = Date.now();
  const upcoming = sortedEvents.filter((e) => new Date(e.date).getTime() >= now);
  const past = sortedEvents
    .filter((e) => new Date(e.date).getTime() < now)
    .reverse();

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Come and see for yourself"
        lead="Information evenings, orientation sessions and industry nights. Everyone is welcome — bring your questions."
        image={images.eventHall}
        trail={trail}
      />

      <Section tone="white" aria-labelledby="upcoming-heading">
        <Container>
          <SectionHeading
            id="upcoming-heading"
            eyebrow="Upcoming"
            title="What's on"
            as="h2"
            className="max-w-[34rem]"
          />
          <div className="mt-12">
            <EventList events={upcoming} />
          </div>

          <Reveal className="mt-12">
            <ContentNotice>
              Event titles, dates, times and venues on this page are placeholders
              created for design purposes. [INSERT THE OFFICIAL EVENT SCHEDULE
              BEFORE PUBLICATION.]
            </ContentNotice>
          </Reveal>
        </Container>
      </Section>

      {past.length > 0 ? (
        <Section tone="cream" spacing="tight" aria-labelledby="past-heading">
          <Container>
            <SectionHeading
              id="past-heading"
              eyebrow="Archive"
              title="Recent events"
              as="h2"
              className="max-w-[34rem]"
            />
            <div className="mt-12">
              <EventList events={past} />
            </div>
          </Container>
        </Section>
      ) : null}

      <FinalCTA />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, ...trail])} />
    </>
  );
}
