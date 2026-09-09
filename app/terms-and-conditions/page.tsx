import { LegalPage } from "@/components/shared/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "Terms and conditions governing use of the Prime International College Australia website.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      lead="The terms on which this website is made available."
      updated="[INSERT DATE]"
      trail={[{ name: "Terms & Conditions", path: "/terms-and-conditions" }]}
      notice={
        <>
          <strong className="font-semibold text-navy">
            This is a structural draft, not a legal document.
          </strong>{" "}
          It has not been drafted or reviewed by a lawyer. [REPLACE ENTIRELY WITH
          TERMS PREPARED AND APPROVED BY THE COLLEGE AND ITS LEGAL ADVISERS
          BEFORE PUBLICATION.]
        </>
      }
    >
      <h2>Acceptance</h2>
      <p>
        By using this website you agree to these terms. If you do not agree,
        please do not use the site. [INSERT OFFICIAL TERMS]
      </p>

      <h2>Accuracy of information</h2>
      <p>
        The college makes every effort to keep the information on this website
        current and accurate. Program information, fees, dates and entry
        requirements may change, and the information published here does not
        form part of any agreement between you and the college unless it is
        confirmed in a written offer. [INSERT OFFICIAL DISCLAIMER]
      </p>

      <h2>Intellectual property</h2>
      <p>
        The content, design, logo and other materials on this website are owned
        by or licensed to {site.name} and may not be reproduced without
        permission. [INSERT OFFICIAL INTELLECTUAL PROPERTY TERMS]
      </p>

      <h2>Acceptable use</h2>
      <p>
        You agree not to use this website in any way that is unlawful, or that
        interferes with its operation or with other users. [INSERT OFFICIAL
        ACCEPTABLE USE TERMS]
      </p>

      <h2>Third-party links</h2>
      <p>
        This website may link to external sites. The college is not responsible
        for the content or practices of those sites. [INSERT OFFICIAL TERMS]
      </p>

      <h2>Limitation of liability</h2>
      <p>
        [INSERT OFFICIAL LIMITATION OF LIABILITY. This clause must be drafted by
        the college&rsquo;s legal advisers and must comply with Australian
        Consumer Law.]
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of [INSERT STATE OR TERRITORY],
        Australia.
      </p>

      <h2>Contact</h2>
      <p>Questions about these terms can be directed to {site.contact.email}.</p>
    </LegalPage>
  );
}
