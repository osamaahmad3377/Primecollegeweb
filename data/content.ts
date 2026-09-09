import type { FaqItem } from "@/lib/types";

/* ==========================================================================
   EDITORIAL CONTENT BLOCKS
   --------------------------------------------------------------------------
   Narrative copy used across the site. Written to be true of the college's
   intent without asserting any regulated or factual claim. Anything that
   would require verification is marked with a bracketed placeholder.
   ========================================================================== */

/** Homepage statistics. Values are deliberately unpopulated. */
export const statistics = [
  { value: "[XX]+", label: "Programs", detail: "Across six fields of study" },
  { value: "[XX]+", label: "Students", detail: "From [XX] countries" },
  { value: "[XX]+", label: "Academic staff", detail: "With industry experience" },
  { value: "[XX]+", label: "Years", detail: "Of teaching in Australia" },
] as const;

/**
 * The "Why Prime" principles — used on the homepage card grid and on the
 * Why Prime page.
 *
 * `icon` names a Lucide export; the mapping from name to component lives in
 * components/home/WhyPrime.tsx so this file stays free of JSX imports.
 */
export const principles = [
  {
    icon: "GraduationCap",
    title: "Academic excellence",
    description:
      "Teaching that expects something of students, and gives them the structure to meet it. Assessment designed to develop capability rather than simply measure it.",
  },
  {
    icon: "Briefcase",
    title: "Industry-relevant learning",
    description:
      "Curriculum shaped by people who have done the work. Students graduate fluent in the tools, standards and vocabulary of their field.",
  },
  {
    icon: "LifeBuoy",
    title: "Student support",
    description:
      "Academic, personal and practical support that is easy to find and easy to ask for — offered early, not once a student is already struggling.",
  },
  {
    icon: "Globe",
    title: "Global perspective",
    description:
      "A genuinely international student body, and teaching that treats that diversity as an asset in the room rather than a logistical consideration.",
  },
  {
    icon: "Compass",
    title: "Career preparation",
    description:
      "Employability treated as part of the program, not an afterthought: portfolios, professional communication and the confidence to walk into an interview.",
  },
  {
    icon: "Users",
    title: "Inclusive community",
    description:
      "A campus where students are known by name. Belonging is not a slogan here; it is the condition under which people learn well.",
  },
] as const;

/** The four-step admissions journey. */
export const admissionSteps = [
  {
    title: "Choose your program",
    description:
      "Explore the fields of study, compare durations and modes, and speak with our team if you are weighing up two options.",
  },
  {
    title: "Prepare your application",
    description:
      "Gather your academic records, identification and English language evidence. We will tell you exactly what is needed for your program.",
  },
  {
    title: "Submit your documents",
    description:
      "Send everything through in one place. Our admissions team reviews your application and comes back to you with a clear outcome.",
  },
  {
    title: "Begin your journey",
    description:
      "Accept your offer, complete enrolment and join orientation — where you will meet the staff and students you will study alongside.",
  },
] as const;

/** About page: vision, mission and values. */
export const vision =
  "To be a college known for the quality of its teaching and the confidence of its graduates — an institution where an international student body learns together and leaves genuinely prepared for the work ahead.";

export const mission =
  "To deliver practical, respected education in a supportive environment; to teach what industry actually requires; and to hold every student to a standard that makes their qualification mean something.";

export const values = [
  {
    title: "Integrity",
    description:
      "We say what is true about our programs, our outcomes and our obligations — to students, to regulators and to each other.",
  },
  {
    title: "Rigour",
    description:
      "Standards are held. A qualification from Prime should represent real capability, because that is what protects its value.",
  },
  {
    title: "Respect",
    description:
      "Our students come from many countries, generations and circumstances. Each is entitled to be taken seriously.",
  },
  {
    title: "Care",
    description:
      "Education is personal. We notice when a student is struggling and we act before it becomes a crisis.",
  },
] as const;

/** Student life pillars. */
export const studentLifePillars = [
  {
    title: "Community",
    description:
      "Student-led groups, shared spaces and the ordinary daily contact that turns a cohort into a network you keep.",
  },
  {
    title: "Support",
    description:
      "Academic advice, wellbeing services and practical help with the parts of student life that have nothing to do with study.",
  },
  {
    title: "Experience",
    description:
      "Industry evenings, showcases and events that take learning off the timetable and into the room with practitioners.",
  },
] as const;

/** Campus facilities. */
export const facilities = [
  {
    title: "Teaching spaces",
    description:
      "Rooms designed for discussion as much as delivery, with the technology to support both in-person and blended teaching.",
  },
  {
    title: "Technology laboratories",
    description:
      "Dedicated environments where students work on real hardware and configured systems rather than simulations alone.",
  },
  {
    title: "Library and study areas",
    description:
      "Quiet individual study alongside spaces built for group work, available across the teaching week.",
  },
  {
    title: "Student commons",
    description:
      "Somewhere to eat, meet and decompress between classes — the informal centre of campus life.",
  },
] as const;

/** International student support pillars. */
export const internationalSupport = [
  {
    title: "Before you arrive",
    description:
      "Clear guidance on applying, accepting your offer and preparing for your first weeks. [INSERT OFFICIAL PRE-ARRIVAL INFORMATION]",
  },
  {
    title: "Settling in",
    description:
      "Orientation designed for students who are new to Australia, covering campus, city and the practical business of daily life.",
  },
  {
    title: "While you study",
    description:
      "Academic English support, dedicated international student advisers and staff who understand what studying abroad asks of you.",
  },
  {
    title: "Looking ahead",
    description:
      "Support with professional communication, portfolios and preparing for the next step after your program concludes.",
  },
] as const;

export const admissionsFaqs: FaqItem[] = [
  {
    question: "How do I apply?",
    answer:
      "Applications are made directly to the college. Choose your program, gather your supporting documents, and submit an enquiry through the contact form and our admissions team will guide you through the process. [CONFIRM OFFICIAL APPLICATION CHANNEL]",
  },
  {
    question: "What are the entry requirements?",
    answer:
      "Entry requirements vary by program and are listed on each program page. [INSERT OFFICIAL ENTRY REQUIREMENTS — these must be confirmed against the college's approved course documentation before publication.]",
  },
  {
    question: "When can I start?",
    answer:
      "[INSERT OFFICIAL INTAKE DATES]. Intake dates differ between programs, so please check the program page or contact the admissions team.",
  },
  {
    question: "What does it cost?",
    answer:
      "[INSERT OFFICIAL FEE SCHEDULE]. A full schedule of tuition fees and any additional charges will be provided in your written offer before you accept a place.",
  },
  {
    question: "Can I apply as an international student?",
    answer:
      "Information for international applicants is set out on the International Students page. Please note that the college does not provide migration advice; all visa requirements must be confirmed through the Australian Government's official channels.",
  },
  {
    question: "Can I get credit for previous study?",
    answer:
      "[INSERT OFFICIAL RECOGNITION OF PRIOR LEARNING AND CREDIT TRANSFER POLICY]. Applicants with relevant prior study or work experience should raise this at the time of application.",
  },
];
