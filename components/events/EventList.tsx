import { MapPin, Clock } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { CollegeEvent } from "@/lib/types";
import { dateParts } from "@/lib/utils";

/**
 * Events render as a dated timeline rather than a set of cards — the date is
 * the primary axis, so it leads each row.
 */
export function EventList({
  events,
  tone = "light",
}: {
  events: CollegeEvent[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  if (events.length === 0) {
    return (
      <EmptyState
        tone={tone}
        title="No events scheduled"
        description="There are no events in the calendar at the moment. New dates are published here as soon as they are confirmed."
      />
    );
  }

  return (
    <RevealGroup as="ol" className="w-full">
      {events.map((event) => (
        <RevealItem
          as="li"
          key={event.slug}
          className={`grid gap-x-6 gap-y-4 border-t py-8 last:border-b sm:grid-cols-[7rem_1fr] sm:gap-x-10 sm:py-10 lg:grid-cols-[8rem_1fr_auto] ${
            dark ? "border-white/15" : "border-ink/12"
          }`}
        >
          {/* Date block */}
          <p className="flex items-baseline gap-2 sm:block">
            <time
              dateTime={event.date}
              className={`block font-display text-[2.5rem] leading-none ${
                dark ? "text-gold-light" : "text-gold-deep"
              }`}
            >
              {dateParts(event.date).day}
            </time>
            <span
              className={`text-xs font-semibold uppercase tracking-[0.16em] sm:mt-2 sm:block ${
                dark ? "text-white/70" : "text-muted"
              }`}
            >
              {dateParts(event.date).month} {dateParts(event.date).year}
            </span>
          </p>

          <div>
            <p
              className={`text-[0.6875rem] font-semibold uppercase tracking-[0.15em] ${
                dark ? "text-gold-light" : "text-gold-deep"
              }`}
            >
              {event.category}
            </p>
            <h3
              className={`mt-2.5 headline text-subtitle ${
                dark ? "text-white" : "text-navy"
              }`}
            >
              {event.title}
            </h3>
            <p
              className={`mt-3 max-w-[62ch] leading-relaxed ${
                dark ? "text-navy-muted" : "text-muted"
              }`}
            >
              {event.description}
            </p>

            <ul
              className={`mt-5 flex flex-wrap gap-x-7 gap-y-2 text-sm ${
                dark ? "text-white/70" : "text-muted"
              }`}
            >
              <li className="flex items-center gap-2">
                <Clock
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className={`size-4 ${dark ? "text-gold-light" : "text-gold-deep"}`}
                />
                <span className="sr-only">Time: </span>
                {event.time}
              </li>
              <li className="flex items-center gap-2">
                <MapPin
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className={`size-4 ${dark ? "text-gold-light" : "text-gold-deep"}`}
                />
                <span className="sr-only">Location: </span>
                {event.location}
              </li>
            </ul>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
