export type ClassValue =
  | string
  | false
  | null
  | undefined
  | ClassValue[]
  | Record<string, boolean | undefined | null>;

/** A photograph in the media library. */
export interface ImageAsset {
  /** Absolute remote URL during development, or a /public path in production. */
  src: string;
  /** Descriptive alt text. Empty string marks the image as decorative. */
  alt: string;
  /** Intrinsic aspect ratio hint, used where a fixed frame is not supplied. */
  ratio?: number;
}

export interface Program {
  slug: string;
  title: string;
  category: ProgramCategory;
  /** One-line summary used on cards and in listings. */
  summary: string;
  /** Longer overview shown on the program detail page. */
  overview: string;
  duration: string;
  mode: string;
  intakes: string;
  location: string;
  image: ImageAsset;
  /** Learning outcomes — indicative only until official content is supplied. */
  highlights: string[];
  entryRequirements: string[];
  careerOutcomes: string[];
  featured?: boolean;
}

export type ProgramCategory =
  | "Business"
  | "Information Technology"
  | "Health"
  | "Community Services"
  | "Hospitality"
  | "Other Programs";

export interface NewsArticle {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  /** Body paragraphs. Replaced by rich text when a CMS is connected. */
  body: string[];
  image: ImageAsset;
  featured?: boolean;
}

export interface CollegeEvent {
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  attribution: string;
  detail: string;
}

export interface NavItem {
  label: string;
  href: string;
  /** Optional short description surfaced in the mobile menu. */
  description?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
