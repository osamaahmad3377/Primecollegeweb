import { images } from "@/data/images";
import type { NewsArticle } from "@/lib/types";

/* ==========================================================================
   NEWS & UPDATES
   --------------------------------------------------------------------------
   REPLACE WITH OFFICIAL COLLEGE CONTENT.

   These articles are written as structural placeholders so the templates can
   be reviewed with realistic text. They describe nothing that has actually
   happened. Remove every record before the site goes live.
   ========================================================================== */

export const newsArticles: NewsArticle[] = [
  {
    slug: "welcome-to-the-new-academic-year",
    title: "Welcome to the new academic year",
    category: "College News",
    date: "2026-08-24",
    excerpt:
      "A message to commencing and continuing students on what to expect in the weeks ahead, and where to find support early rather than late.",
    body: [
      "[REPLACE WITH OFFICIAL CONTENT] The start of an academic year is a particular kind of beginning. For some students it is a return to something familiar; for many others it is the first time studying in Australia, in English, and away from the people who usually help them work things out.",
      "[REPLACE WITH OFFICIAL CONTENT] Orientation exists for exactly that reason. It is not an administrative formality — it is the point at which students meet the people they will rely on for the rest of the year.",
      "[REPLACE WITH OFFICIAL CONTENT] Students are encouraged to ask for help early. The support that is easy to give in week two is much harder to give in week ten.",
    ],
    image: images.diverseOutdoors,
    featured: true,
  },
  {
    slug: "expanding-our-student-support-services",
    title: "Expanding our student support services",
    category: "Student Support",
    date: "2026-08-11",
    excerpt:
      "Additional academic and wellbeing appointments are being introduced across the week, including outside standard teaching hours.",
    body: [
      "[REPLACE WITH OFFICIAL CONTENT] Support services are most useful when students can actually reach them. Appointment availability is being reviewed to reflect when students are genuinely on campus.",
      "[REPLACE WITH OFFICIAL CONTENT] Details of the expanded schedule will be confirmed and published here.",
    ],
    image: images.mentoring,
  },
  {
    slug: "industry-engagement-and-the-classroom",
    title: "What industry engagement should actually mean",
    category: "Teaching & Learning",
    date: "2026-07-29",
    excerpt:
      "Bringing practitioners into teaching is only valuable when it changes what is taught. A note on how we approach it.",
    body: [
      "[REPLACE WITH OFFICIAL CONTENT] Guest speakers are easy. Curriculum that reflects current practice is harder, and matters considerably more.",
      "[REPLACE WITH OFFICIAL CONTENT] This article will describe the college's approach to keeping teaching current once the official position has been confirmed.",
    ],
    image: images.workshop,
  },
  {
    slug: "preparing-for-your-first-semester",
    title: "Preparing for your first semester in Australia",
    category: "International",
    date: "2026-07-15",
    excerpt:
      "Practical guidance for students arriving from overseas — arrival, settling in, and the first few weeks of study.",
    body: [
      "[REPLACE WITH OFFICIAL CONTENT] Arriving in a new country to study involves a great deal more than enrolment. This article will cover the practical steps students most often ask about.",
      "[REPLACE WITH OFFICIAL CONTENT] Nothing in this article should be read as migration advice. Students must confirm all visa matters with the Australian Government's official sources.",
    ],
    image: images.sydney,
  },
  {
    slug: "campus-learning-spaces-update",
    title: "An update on our learning spaces",
    category: "Campus",
    date: "2026-06-30",
    excerpt:
      "Changes to teaching rooms, study areas and technology across the campus, and what they mean for students day to day.",
    body: [
      "[REPLACE WITH OFFICIAL CONTENT] Details of the current works and their scheduled completion will be published here.",
    ],
    image: images.brightClassroom,
  },
  {
    slug: "celebrating-our-graduates",
    title: "Celebrating our graduating students",
    category: "College News",
    date: "2026-06-12",
    excerpt:
      "A short reflection on graduation, and on the work that goes on long before the ceremony itself.",
    body: [
      "[REPLACE WITH OFFICIAL CONTENT] Graduation is the visible part of a much longer process. This article will recognise the graduating cohort once details are confirmed.",
    ],
    image: images.graduationSky,
  },
];

export function getArticle(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug);
}

/** Newest first — the source array is not assumed to be ordered. */
export const sortedNews = [...newsArticles].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);
