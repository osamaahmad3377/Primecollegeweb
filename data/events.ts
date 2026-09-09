import type { CollegeEvent } from "@/lib/types";

/* ==========================================================================
   EVENTS
   --------------------------------------------------------------------------
   REPLACE WITH OFFICIAL COLLEGE CONTENT.
   Dates, times and locations below are placeholders and must not be published.
   ========================================================================== */

export const events: CollegeEvent[] = [
  {
    slug: "campus-information-evening",
    title: "Campus Information Evening",
    date: "2026-10-08",
    time: "[INSERT TIME]",
    location: "[INSERT VENUE / CAMPUS]",
    category: "Open Day",
    description:
      "An evening for prospective students and their families: meet teaching staff, walk through the campus and ask the questions that matter before applying.",
  },
  {
    slug: "international-student-welcome",
    title: "International Student Welcome",
    date: "2026-10-22",
    time: "[INSERT TIME]",
    location: "[INSERT VENUE / CAMPUS]",
    category: "Orientation",
    description:
      "A dedicated welcome session for students arriving from overseas, covering support services, study expectations and settling into life in Australia.",
  },
  {
    slug: "industry-evening-technology",
    title: "Industry Evening — Technology",
    date: "2026-11-05",
    time: "[INSERT TIME]",
    location: "[INSERT VENUE / CAMPUS]",
    category: "Industry",
    description:
      "Practitioners from the technology sector join students for a discussion on current practice, hiring expectations and building a first portfolio.",
  },
  {
    slug: "application-workshop",
    title: "Application Workshop",
    date: "2026-11-19",
    time: "[INSERT TIME]",
    location: "[INSERT VENUE / CAMPUS]",
    category: "Admissions",
    description:
      "A practical, small-group session working through the application process step by step, including documentation and common mistakes.",
  },
  {
    slug: "student-showcase",
    title: "End of Year Student Showcase",
    date: "2026-12-03",
    time: "[INSERT TIME]",
    location: "[INSERT VENUE / CAMPUS]",
    category: "Student Life",
    description:
      "Students present the projects they have worked on across the year to staff, families and invited guests from industry.",
  },
];

/** Chronological, soonest first. */
export const sortedEvents = [...events].sort(
  (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
);
