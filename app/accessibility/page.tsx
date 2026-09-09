import { LegalPage } from "@/components/shared/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = pageMetadata({
  title: "Accessibility",
  description:
    "Prime International College Australia's commitment to an accessible website, and how to report a barrier.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <LegalPage
      eyebrow="Accessibility"
      title="Accessibility"
      lead="Our commitment to a website that everyone can use, and how to tell us when it falls short."
      updated="[INSERT DATE]"
      trail={[{ name: "Accessibility", path: "/accessibility" }]}
      notice={
        <>
          This statement describes how the website has been built. It has not yet
          been independently audited, and the conformance claim below must be
          verified by testing — including testing with assistive technology and
          with real users — before it is published as fact. [COMMISSION AN
          ACCESSIBILITY AUDIT AND UPDATE THIS PAGE WITH ITS FINDINGS.]
        </>
      }
    >
      <h2>Our commitment</h2>
      <p>
        {site.name} aims to make this website usable by as many people as
        possible, including people who use screen readers, magnification,
        keyboard-only navigation, speech input or other assistive technology.
      </p>

      <h2>Standards</h2>
      <p>
        The site has been built targeting the{" "}
        <strong>Web Content Accessibility Guidelines (WCAG) 2.2, Level AA</strong>.
        Conformance has not yet been independently verified.
      </p>

      <h2>What we have done</h2>
      <ul>
        <li>Semantic HTML with correctly ordered headings and landmark regions</li>
        <li>A skip link to the main content on every page</li>
        <li>Full keyboard operability, with a clearly visible focus indicator</li>
        <li>
          Text and interface colours tested to meet the minimum contrast ratios,
          including the small print on dark sections
        </li>
        <li>
          Information never conveyed by colour alone — active states also carry a
          shape or a rule
        </li>
        <li>Descriptive alternative text on meaningful images, and empty alt attributes on decorative ones</li>
        <li>
          Animation that respects the <code>prefers-reduced-motion</code> setting
          and is disabled entirely when reduced motion is requested
        </li>
        <li>Form labels, hints and error messages programmatically associated with their fields</li>
        <li>Page zoom to 500% without loss of content or functionality</li>
      </ul>

      <h2>Known limitations</h2>
      <ul>
        <li>
          The site has not yet been tested with assistive technology by users who
          rely on it. [SCHEDULE USER TESTING]
        </li>
        <li>
          Content marked as placeholder throughout the site will be replaced, and
          replacement content must meet the same standards.
        </li>
      </ul>

      <h2>Telling us about a problem</h2>
      <p>
        If you encounter a barrier on this website, please contact us at{" "}
        {site.contact.email} or {site.contact.phone} and describe the problem and
        the page it occurred on. We will respond and work to resolve it.
      </p>
    </LegalPage>
  );
}
