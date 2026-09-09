import { images } from "@/data/images";
import type { Program, ProgramCategory } from "@/lib/types";

/* ==========================================================================
   PROGRAMS
   --------------------------------------------------------------------------
   REPLACE WITH OFFICIAL COLLEGE CONTENT.

   Everything below is indicative placeholder content written to demonstrate
   the layout. No qualification code, AQF level, accreditation status, CRICOS
   registration, duration, fee or entry requirement here has been verified.
   Do not publish this page until the college's official course data replaces
   these records.
   ========================================================================== */

export const programCategories: ProgramCategory[] = [
  "Business",
  "Information Technology",
  "Health",
  "Community Services",
  "Hospitality",
  "Other Programs",
];

/** Short blurbs used on the programs landing page category rail. */
export const categoryIntros: Record<ProgramCategory, string> = {
  Business:
    "Management, leadership and enterprise skills for people who want to run things well.",
  "Information Technology":
    "Practical technology programs spanning support, networks, data and development.",
  Health: "Foundations for careers that care for people and communities.",
  "Community Services":
    "Person-centred practice for those drawn to social impact work.",
  Hospitality:
    "Service, operations and venue skills built for a demanding industry.",
  "Other Programs":
    "Pathway, foundation and short-course options that open the next door.",
};

export const programs: Program[] = [
  {
    slug: "business-management",
    title: "Business Management",
    category: "Business",
    summary:
      "Build the planning, finance and people skills that hold an organisation together.",
    overview:
      "This program develops the core disciplines of running a business well: setting direction, reading financial information, leading a team and making decisions with incomplete information. Learning is structured around applied projects rather than examinations alone, so graduates leave with work they can show as well as knowledge they can explain.",
    duration: "[INSERT DURATION]",
    mode: "[INSERT STUDY MODE]",
    intakes: "[INSERT INTAKE DATES]",
    location: "[INSERT CAMPUS]",
    image: images.business,
    highlights: [
      "Applied projects modelled on real organisational problems",
      "Financial literacy for people who are not accountants",
      "Team leadership, delegation and difficult conversations",
      "Written and spoken communication for a professional audience",
    ],
    entryRequirements: [
      "[INSERT OFFICIAL ACADEMIC ENTRY REQUIREMENTS]",
      "[INSERT OFFICIAL ENGLISH LANGUAGE REQUIREMENTS]",
      "[INSERT ANY AGE OR PREREQUISITE REQUIREMENTS]",
    ],
    careerOutcomes: [
      "[INSERT VERIFIED CAREER OUTCOME]",
      "[INSERT VERIFIED CAREER OUTCOME]",
      "[INSERT VERIFIED CAREER OUTCOME]",
    ],
    featured: true,
  },
  {
    slug: "leadership-and-people",
    title: "Leadership & People Practice",
    category: "Business",
    summary:
      "For people who already lead, or are about to, and want to do it deliberately.",
    overview:
      "A program for emerging and current leaders that treats leadership as a craft to be practised rather than a personality to be born with. Participants work on their own team, their own decisions and their own communication over the length of the program.",
    duration: "[INSERT DURATION]",
    mode: "[INSERT STUDY MODE]",
    intakes: "[INSERT INTAKE DATES]",
    location: "[INSERT CAMPUS]",
    image: images.workshop,
    highlights: [
      "Coaching conversations and structured feedback",
      "Workforce planning and capability development",
      "Managing change without losing the room",
      "Ethical decision-making under commercial pressure",
    ],
    entryRequirements: [
      "[INSERT OFFICIAL ACADEMIC ENTRY REQUIREMENTS]",
      "[INSERT OFFICIAL ENGLISH LANGUAGE REQUIREMENTS]",
    ],
    careerOutcomes: [
      "[INSERT VERIFIED CAREER OUTCOME]",
      "[INSERT VERIFIED CAREER OUTCOME]",
    ],
  },
  {
    slug: "information-technology",
    title: "Information Technology",
    category: "Information Technology",
    summary:
      "A broad technical grounding across systems, networks, security and support.",
    overview:
      "A generalist technology program for students who want range before they specialise. It covers how machines talk to each other, how systems are kept available and secure, and how to work methodically through a problem when something breaks.",
    duration: "[INSERT DURATION]",
    mode: "[INSERT STUDY MODE]",
    intakes: "[INSERT INTAKE DATES]",
    location: "[INSERT CAMPUS]",
    image: images.computerLab,
    highlights: [
      "Hands-on laboratory work on real hardware and virtual environments",
      "Networking fundamentals and troubleshooting method",
      "Security-aware practice built in from the first week",
      "Documentation and support skills employers actually ask for",
    ],
    entryRequirements: [
      "[INSERT OFFICIAL ACADEMIC ENTRY REQUIREMENTS]",
      "[INSERT OFFICIAL ENGLISH LANGUAGE REQUIREMENTS]",
    ],
    careerOutcomes: [
      "[INSERT VERIFIED CAREER OUTCOME]",
      "[INSERT VERIFIED CAREER OUTCOME]",
      "[INSERT VERIFIED CAREER OUTCOME]",
    ],
    featured: true,
  },
  {
    slug: "software-development",
    title: "Software Development",
    category: "Information Technology",
    summary:
      "Write, test and ship software as part of a team, not just as an exercise.",
    overview:
      "Students build working applications from the first module, learning version control, testing and code review alongside the language itself. The emphasis is on the habits that make a developer employable: clear code, honest estimates and the ability to read someone else's work.",
    duration: "[INSERT DURATION]",
    mode: "[INSERT STUDY MODE]",
    intakes: "[INSERT INTAKE DATES]",
    location: "[INSERT CAMPUS]",
    image: images.techCorridor,
    highlights: [
      "Version control and collaborative workflow from day one",
      "Automated testing and code review practice",
      "Databases, APIs and front-end fundamentals",
      "A portfolio project carried through to completion",
    ],
    entryRequirements: [
      "[INSERT OFFICIAL ACADEMIC ENTRY REQUIREMENTS]",
      "[INSERT OFFICIAL ENGLISH LANGUAGE REQUIREMENTS]",
    ],
    careerOutcomes: [
      "[INSERT VERIFIED CAREER OUTCOME]",
      "[INSERT VERIFIED CAREER OUTCOME]",
    ],
  },
  {
    slug: "health-services-foundations",
    title: "Health Services Foundations",
    category: "Health",
    summary:
      "An entry point into the health sector for students beginning their career.",
    overview:
      "This program introduces the language, structures and standards of the health system, together with the interpersonal skills that sit at the centre of good care. It is designed as a foundation for further study or for supporting roles within health services.",
    duration: "[INSERT DURATION]",
    mode: "[INSERT STUDY MODE]",
    intakes: "[INSERT INTAKE DATES]",
    location: "[INSERT CAMPUS]",
    image: images.health,
    highlights: [
      "Clinical terminology and health system literacy",
      "Infection control and workplace safety practice",
      "Communicating with patients, families and colleagues",
      "Privacy, consent and professional boundaries",
    ],
    entryRequirements: [
      "[INSERT OFFICIAL ACADEMIC ENTRY REQUIREMENTS]",
      "[INSERT OFFICIAL ENGLISH LANGUAGE REQUIREMENTS]",
      "[INSERT ANY CLEARANCE OR IMMUNISATION REQUIREMENTS]",
    ],
    careerOutcomes: [
      "[INSERT VERIFIED CAREER OUTCOME]",
      "[INSERT VERIFIED CAREER OUTCOME]",
    ],
  },
  {
    slug: "individual-support",
    title: "Individual Support",
    category: "Health",
    summary:
      "Person-centred support work in ageing, disability and home care settings.",
    overview:
      "A practical program for students who want to work directly with people. It combines the technical requirements of support work with the judgement and patience the work genuinely demands, and includes supervised practical placement.",
    duration: "[INSERT DURATION]",
    mode: "[INSERT STUDY MODE]",
    intakes: "[INSERT INTAKE DATES]",
    location: "[INSERT CAMPUS]",
    image: images.communitySupport,
    highlights: [
      "Person-centred and strengths-based practice",
      "Safe manual handling and everyday living support",
      "Working respectfully across cultures and generations",
      "[CONFIRM PLACEMENT HOURS AND ARRANGEMENTS]",
    ],
    entryRequirements: [
      "[INSERT OFFICIAL ACADEMIC ENTRY REQUIREMENTS]",
      "[INSERT OFFICIAL ENGLISH LANGUAGE REQUIREMENTS]",
      "[INSERT ANY BACKGROUND CHECK REQUIREMENTS]",
    ],
    careerOutcomes: [
      "[INSERT VERIFIED CAREER OUTCOME]",
      "[INSERT VERIFIED CAREER OUTCOME]",
    ],
  },
  {
    slug: "community-services",
    title: "Community Services",
    category: "Community Services",
    summary:
      "Case work, advocacy and support for people navigating difficult circumstances.",
    overview:
      "Students learn to assess need, plan support and work alongside other services without losing sight of the person in front of them. The program deals openly with the emotional weight of the work and how practitioners sustain themselves in it.",
    duration: "[INSERT DURATION]",
    mode: "[INSERT STUDY MODE]",
    intakes: "[INSERT INTAKE DATES]",
    location: "[INSERT CAMPUS]",
    image: images.healthCare,
    highlights: [
      "Assessment, referral and case coordination",
      "Trauma-informed and culturally safe practice",
      "Advocacy, boundaries and duty of care",
      "Professional supervision and self-care",
    ],
    entryRequirements: [
      "[INSERT OFFICIAL ACADEMIC ENTRY REQUIREMENTS]",
      "[INSERT OFFICIAL ENGLISH LANGUAGE REQUIREMENTS]",
      "[INSERT ANY BACKGROUND CHECK REQUIREMENTS]",
    ],
    careerOutcomes: [
      "[INSERT VERIFIED CAREER OUTCOME]",
      "[INSERT VERIFIED CAREER OUTCOME]",
    ],
    featured: true,
  },
  {
    slug: "youth-work",
    title: "Youth Work",
    category: "Community Services",
    summary:
      "Working with young people in education, community and support settings.",
    overview:
      "A specialised program focused on adolescent development, engagement strategies and the systems young people move through. Practical, reflective and grounded in the realities of front-line youth work.",
    duration: "[INSERT DURATION]",
    mode: "[INSERT STUDY MODE]",
    intakes: "[INSERT INTAKE DATES]",
    location: "[INSERT CAMPUS]",
    image: images.mentoring,
    highlights: [
      "Adolescent development and mental health awareness",
      "Group facilitation and program design",
      "Working with families, schools and services",
      "Reporting obligations and professional ethics",
    ],
    entryRequirements: [
      "[INSERT OFFICIAL ACADEMIC ENTRY REQUIREMENTS]",
      "[INSERT OFFICIAL ENGLISH LANGUAGE REQUIREMENTS]",
      "[INSERT ANY BACKGROUND CHECK REQUIREMENTS]",
    ],
    careerOutcomes: [
      "[INSERT VERIFIED CAREER OUTCOME]",
      "[INSERT VERIFIED CAREER OUTCOME]",
    ],
  },
  {
    slug: "hospitality-operations",
    title: "Hospitality Operations",
    category: "Hospitality",
    summary:
      "Front and back of house skills for venues where standards actually matter.",
    overview:
      "A working program taught in operational conditions. Students learn service standards, food and beverage knowledge, cost control and how a venue holds together on a busy night — because that is when hospitality is really tested.",
    duration: "[INSERT DURATION]",
    mode: "[INSERT STUDY MODE]",
    intakes: "[INSERT INTAKE DATES]",
    location: "[INSERT CAMPUS]",
    image: images.hospitalityVenue,
    highlights: [
      "Service standards and guest experience",
      "Food safety and responsible service practice",
      "Rostering, ordering and cost control",
      "Working calmly under service pressure",
    ],
    entryRequirements: [
      "[INSERT OFFICIAL ACADEMIC ENTRY REQUIREMENTS]",
      "[INSERT OFFICIAL ENGLISH LANGUAGE REQUIREMENTS]",
    ],
    careerOutcomes: [
      "[INSERT VERIFIED CAREER OUTCOME]",
      "[INSERT VERIFIED CAREER OUTCOME]",
    ],
  },
  {
    slug: "hospitality-management",
    title: "Hospitality Management",
    category: "Hospitality",
    summary:
      "Step from the floor into running the venue, the roster and the margin.",
    overview:
      "For students moving from operational hospitality roles into management. The program covers the commercial side of venues alongside the leadership required to hold a team together through a demanding season.",
    duration: "[INSERT DURATION]",
    mode: "[INSERT STUDY MODE]",
    intakes: "[INSERT INTAKE DATES]",
    location: "[INSERT CAMPUS]",
    image: images.hospitalityService,
    highlights: [
      "Venue financials, margin and supplier relationships",
      "Recruiting, training and retaining hospitality staff",
      "Compliance, licensing and workplace safety",
      "Marketing a venue to the right customers",
    ],
    entryRequirements: [
      "[INSERT OFFICIAL ACADEMIC ENTRY REQUIREMENTS]",
      "[INSERT OFFICIAL ENGLISH LANGUAGE REQUIREMENTS]",
    ],
    careerOutcomes: [
      "[INSERT VERIFIED CAREER OUTCOME]",
      "[INSERT VERIFIED CAREER OUTCOME]",
    ],
  },
  {
    slug: "academic-english-pathway",
    title: "Academic English Pathway",
    category: "Other Programs",
    summary:
      "Language and study skills that prepare international students for further study.",
    overview:
      "A preparation program that builds academic reading, writing, listening and speaking alongside the study habits Australian classrooms expect — referencing, seminar participation, independent research and academic integrity.",
    duration: "[INSERT DURATION]",
    mode: "[INSERT STUDY MODE]",
    intakes: "[INSERT INTAKE DATES]",
    location: "[INSERT CAMPUS]",
    image: images.studyingFocused,
    highlights: [
      "Academic writing, referencing and research method",
      "Seminar discussion and presentation practice",
      "Listening and note-taking for lectures",
      "Academic integrity and independent study habits",
    ],
    entryRequirements: [
      "[INSERT OFFICIAL ENGLISH LANGUAGE ENTRY LEVEL]",
      "[INSERT OFFICIAL ACADEMIC ENTRY REQUIREMENTS]",
    ],
    careerOutcomes: [
      "[INSERT VERIFIED PATHWAY OUTCOME]",
      "[INSERT VERIFIED PATHWAY OUTCOME]",
    ],
  },
  {
    slug: "foundation-studies",
    title: "Foundation Studies",
    category: "Other Programs",
    summary:
      "A structured re-entry into study for students returning after time away.",
    overview:
      "Designed for students who have been out of formal education, this program rebuilds academic confidence gradually — numeracy, writing, digital literacy and the practical business of organising your own study.",
    duration: "[INSERT DURATION]",
    mode: "[INSERT STUDY MODE]",
    intakes: "[INSERT INTAKE DATES]",
    location: "[INSERT CAMPUS]",
    image: images.deskWriting,
    highlights: [
      "Numeracy and written communication",
      "Digital literacy for study and work",
      "Time management and study planning",
      "One-to-one academic support",
    ],
    entryRequirements: [
      "[INSERT OFFICIAL ACADEMIC ENTRY REQUIREMENTS]",
      "[INSERT OFFICIAL ENGLISH LANGUAGE REQUIREMENTS]",
    ],
    careerOutcomes: [
      "[INSERT VERIFIED PATHWAY OUTCOME]",
      "[INSERT VERIFIED PATHWAY OUTCOME]",
    ],
  },
];

export function getProgram(slug: string): Program | undefined {
  return programs.find((program) => program.slug === slug);
}

export function programsByCategory(category: ProgramCategory): Program[] {
  return programs.filter((program) => program.category === category);
}

export const featuredPrograms = programs.filter((program) => program.featured);
