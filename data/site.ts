/* ==========================================================================
   INSTITUTIONAL DETAILS
   --------------------------------------------------------------------------
   REPLACE WITH OFFICIAL COLLEGE CONTENT.

   Values wrapped in square brackets are placeholders. Nothing in this file
   asserts accreditation, registration, ranking or any other regulated claim,
   and none should be added without written confirmation from the college.
   ========================================================================== */

export const site = {
  name: "Prime International College Australia",
  shortName: "Prime",
  /** Used for metadata, canonical URLs and the sitemap. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.primecollege.edu.au",
  locale: "en_AU",
  tagline: "Shape your future. Build what comes next.",
  description:
    "Prime International College Australia offers career-focused programs in a supportive, international learning community — combining academic depth with the practical skills employers value.",

  /* --- Contact — ALL PLACEHOLDERS --------------------------------------- */
  contact: {
    addressLines: [
      "[INSERT OFFICIAL STREET ADDRESS]",
      "[SUBURB], [STATE] [POSTCODE]",
      "Australia",
    ],
    phone: "[INSERT OFFICIAL PHONE NUMBER]",
    /** Kept as a placeholder so no mail is sent to an unowned address. */
    email: "[INSERT OFFICIAL EMAIL ADDRESS]",
    admissionsEmail: "[INSERT ADMISSIONS EMAIL ADDRESS]",
    internationalEmail: "[INSERT INTERNATIONAL ENQUIRIES EMAIL]",
    hours: [
      { days: "Monday – Friday", time: "[INSERT OPENING HOURS]" },
      { days: "Saturday", time: "[INSERT OPENING HOURS]" },
      { days: "Sunday & public holidays", time: "Closed" },
    ],
  },

  /* --- Social — replace hrefs with official accounts, or remove entries -- */
  social: [
    { label: "Facebook", href: "[INSERT OFFICIAL FACEBOOK URL]" },
    { label: "Instagram", href: "[INSERT OFFICIAL INSTAGRAM URL]" },
    { label: "LinkedIn", href: "[INSERT OFFICIAL LINKEDIN URL]" },
    { label: "YouTube", href: "[INSERT OFFICIAL YOUTUBE URL]" },
  ],

  /* --- Regulatory identifiers -------------------------------------------
     Intentionally left empty. Do NOT populate these with invented values.
     When the college supplies verified identifiers, add them here and they
     will appear in the footer automatically.                              */
  regulatory: {
    /** e.g. "RTO 00000" — leave empty until officially confirmed. */
    rtoCode: "",
    /** e.g. "CRICOS 00000A" — leave empty until officially confirmed. */
    cricosCode: "",
    abn: "",
  },

  foundingStatement:
    "Prime International College Australia is an independent education provider committed to practical, respected teaching and to the success of every student who walks through its doors.",
} as const;

/**
 * Acknowledgement of Country. The specific Traditional Owner group must be
 * confirmed with the relevant local Aboriginal community for the campus
 * location before publication.
 */
export const acknowledgement =
  "Prime International College Australia acknowledges the Traditional Custodians of the land on which we learn and teach, and pays respect to Elders past and present. [CONFIRM THE CORRECT TRADITIONAL OWNER GROUP FOR THE CAMPUS LOCATION BEFORE PUBLISHING.]";
