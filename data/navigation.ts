import type { NavItem } from "@/lib/types";

/* ==========================================================================
   INFORMATION ARCHITECTURE
   --------------------------------------------------------------------------
   The primary navigation is two levels deep. Top-level items that own a
   cluster of pages expose a panel; the rest link straight through.

   Every panel entry is a real destination — no dead ends, and no item exists
   only to make a menu look fuller.
   ========================================================================== */

export interface NavPanelLink extends NavItem {
  /** Shown beneath the label inside a mega-menu panel. */
  description?: string;
  /**
   * Name of a Lucide icon, resolved to the actual component in
   * MegaMenu.tsx. Kept as a string here so this data file stays free of
   * JSX/component imports — the same pattern used for the Why Prime icons
   * in data/content.ts.
   */
  icon: string;
}

export interface PrimaryNavItem extends NavItem {
  /** Stable key used for panel open/close state and ARIA wiring. */
  key: string;
  /** When present, the item opens a panel instead of navigating on click. */
  panel?: {
    /** Column heading above the link list. */
    heading: string;
    links: NavPanelLink[];
    /** Optional promoted card rendered alongside the list. */
    feature?: {
      eyebrow: string;
      title: string;
      body: string;
      href: string;
      cta: string;
    };
  };
}

export const primaryNav: PrimaryNavItem[] = [
  {
    key: "about",
    label: "About",
    href: "/about",
    panel: {
      heading: "The college",
      links: [
        { label: "About Us", href: "/about", description: "Our story, vision and values", icon: "Landmark" },
        { label: "Why Prime", href: "/why-prime", description: "Six commitments we can be held to", icon: "Award" },
        { label: "Campus", href: "/campus", description: "Where the work happens", icon: "Building2" },
        { label: "News & Updates", href: "/news", description: "Announcements from across the college", icon: "Newspaper" },
      ],
      feature: {
        eyebrow: "Our approach",
        title: "Taught by practitioners",
        body: "Curriculum shaped by people who have done the work, and assessment built around what you can actually do.",
        href: "/about",
        cta: "Read more",
      },
    },
  },
  {
    key: "programs",
    label: "Programs",
    href: "/programs",
    panel: {
      heading: "Fields of study",
      links: [
        { label: "Business", href: "/programs?category=Business", description: "Management, leadership and enterprise", icon: "Briefcase" },
        { label: "Information Technology", href: "/programs?category=Information+Technology", description: "Support, networks, data and development", icon: "Cpu" },
        { label: "Health", href: "/programs?category=Health", description: "Foundations for careers in care", icon: "HeartPulse" },
        { label: "Community Services", href: "/programs?category=Community+Services", description: "Person-centred practice and social impact", icon: "HeartHandshake" },
        { label: "Hospitality", href: "/programs?category=Hospitality", description: "Service, operations and venue skills", icon: "UtensilsCrossed" },
        { label: "Other Programs", href: "/programs?category=Other+Programs", description: "Pathway, foundation and short courses", icon: "Compass" },
      ],
      feature: {
        eyebrow: "Not sure yet?",
        title: "Compare every program",
        body: "Filter by field of study, duration and study mode to find the one that fits.",
        href: "/programs",
        cta: "Browse all programs",
      },
    },
  },
  {
    key: "admissions",
    label: "Admissions",
    href: "/admissions",
    panel: {
      heading: "Applying to Prime",
      links: [
        { label: "How to Apply", href: "/admissions", description: "The four-step process, start to finish", icon: "ClipboardList" },
        { label: "Entry Requirements", href: "/admissions#requirements", description: "What you will need to provide", icon: "ListChecks" },
        { label: "Dates & Fees", href: "/admissions#dates", description: "Intakes, deadlines and tuition", icon: "CalendarDays" },
        { label: "Start an Application", href: "/admissions#apply", description: "Send your details to our team", icon: "Send" },
        { label: "Frequently Asked", href: "/admissions#faq", description: "Answers to the common questions", icon: "CircleQuestionMark" },
      ],
      feature: {
        eyebrow: "Admissions open",
        title: "Talk to our team",
        body: "Weighing up two options, or unsure whether you qualify? Ask us before you apply.",
        href: "/contact",
        cta: "Contact admissions",
      },
    },
  },
  {
    key: "international",
    label: "International",
    href: "/international-students",
  },
  {
    key: "student-life",
    label: "Student Life",
    href: "/student-life",
  },
  {
    key: "events",
    label: "Events",
    href: "/events",
  },
  {
    key: "contact",
    label: "Contact",
    href: "/contact",
  },
];

/** Slim utility strip above the main bar. */
export const utilityNav: NavItem[] = [
  { label: "Events", href: "/events" },
  { label: "News", href: "/news" },
  { label: "Accessibility", href: "/accessibility" },
];

/** The mobile menu is a flat list — panels become inline expandable groups. */
export const mobileNav: (NavItem & { children?: NavItem[] })[] = [
  { label: "Home", href: "/" },
  ...primaryNav.map((item) => ({
    label: item.label,
    href: item.href,
    description: item.description,
    children: item.panel?.links.map(({ label, href }) => ({ label, href })),
  })),
];

export const footerNav = {
  quickLinks: [
    { label: "About Us", href: "/about" },
    { label: "Why Prime", href: "/why-prime" },
    { label: "Programs", href: "/programs" },
    { label: "Admissions", href: "/admissions" },
    { label: "International Students", href: "/international-students" },
    { label: "Student Life", href: "/student-life" },
    { label: "Campus", href: "/campus" },
    { label: "News & Updates", href: "/news" },
    { label: "Events", href: "/events" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],
  information: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Accessibility", href: "/accessibility" },
  ] satisfies NavItem[],
};
