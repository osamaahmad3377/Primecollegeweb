import type { Metadata } from "next";
import { site } from "@/data/site";

interface PageMetaOptions {
  title: string;
  description: string;
  /** Route path beginning with a slash, e.g. "/programs". */
  path: string;
  /** Overrides the default social share image. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
}

/**
 * Builds a complete, consistent metadata object for a page: canonical URL,
 * Open Graph and Twitter cards.
 *
 * The share image falls back to the college logo. If /public/logo.png is not
 * present, no image is emitted rather than referencing a missing file.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
}: PageMetaOptions): Metadata {
  const url = new URL(path, site.url).toString();
  const shareImage = image ?? "/logo.png";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: `${title} | ${site.name}`,
      description,
      siteName: site.name,
      locale: site.locale,
      images: [{ url: shareImage, alt: site.name }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [shareImage],
    },
  };
}

/**
 * Organisation-level structured data.
 *
 * Deliberately minimal: it asserts only the college's name, description, URL
 * and logo. Fields such as accreditation, founding date, address, telephone
 * and aggregate ratings are omitted rather than populated with placeholders,
 * because structured data is machine-read and inaccurate values are worse
 * than absent ones.
 */
export function organisationJsonLd(hasLogo: boolean) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    description: site.description,
    ...(hasLogo ? { logo: new URL("/logo.png", site.url).toString() } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: "en-AU",
  };
}

export function breadcrumbJsonLd(
  trail: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: new URL(crumb.path, site.url).toString(),
    })),
  };
}

/** Renders a JSON-LD script tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Serialised server-side from static, non-user data.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
