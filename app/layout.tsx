import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Poppins } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyActions } from "@/components/layout/StickyActions";
import { logoSrc } from "@/lib/brand-asset";
import { JsonLd, organisationJsonLd, websiteJsonLd } from "@/lib/seo";
import { site } from "@/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/**
 * The display face: a geometric sans carrying every headline, set bold and
 * lowercase with tight tracking (see the `.headline` utility in globals.css).
 *
 * TO REVERT to the earlier serif direction: swap this back to
 * Cormorant_Garamond, repoint `--font-display` in globals.css, and drop the
 * `lowercase`/`tracking` declarations from `.headline`. Nothing else changes —
 * every heading on the site resolves through that one token and utility.
 */
const display = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["500", "600", "700"],
});

/**
 * A technical monospace face, used exclusively for numerals and short
 * machine-readable data — statistics, program specs, registration codes,
 * contact details. It never carries body copy or headings: its job is to
 * signal precision at the handful of points where a figure is the content.
 */
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    ...(logoSrc ? { images: [{ url: logoSrc, alt: site.name }] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    ...(logoSrc ? { images: [logoSrc] } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#011E3E",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  /* Never block pinch-zoom — WCAG 1.4.4. */
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-AU"
      className={`${inter.variable} ${display.variable} ${mono.variable}`}
    >
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="sr-only-focusable fixed left-4 top-4 z-[100] rounded-button bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-navy shadow-lg"
        >
          Skip to main content
        </a>

        <Header logoSrc={logoSrc} />

        {/*
          The header is fixed and permanently opaque, so main is offset by its
          height. Page heroes therefore carry only their own breathing room —
          they no longer add the header height themselves.
        */}
        <main
          id="main"
          className="flex-1 pt-[calc(var(--header-h)+var(--utility-h))]"
        >
          {children}
        </main>

        <Footer logoSrc={logoSrc} />

        <StickyActions />

        <JsonLd data={organisationJsonLd(Boolean(logoSrc))} />
        <JsonLd data={websiteJsonLd()} />
      </body>
    </html>
  );
}
