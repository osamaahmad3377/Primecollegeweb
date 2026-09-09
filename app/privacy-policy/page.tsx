import { LegalPage } from "@/components/shared/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Prime International College Australia collects, uses and protects personal information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      lead="How we collect, use, disclose and protect personal information."
      updated="[INSERT DATE]"
      trail={[{ name: "Privacy Policy", path: "/privacy-policy" }]}
      notice={
        <>
          <strong className="font-semibold text-navy">
            This is a structural draft, not a legal document.
          </strong>{" "}
          It sets out the sections a privacy policy typically contains so the
          page can be designed and reviewed. It has not been drafted or checked
          by a lawyer and does not reflect the college&rsquo;s actual practices.
          [REPLACE ENTIRELY WITH A POLICY PREPARED AND APPROVED BY THE COLLEGE
          AND ITS LEGAL ADVISERS BEFORE PUBLICATION.]
        </>
      }
    >
      <h2>Who this policy applies to</h2>
      <p>
        This policy explains how {site.name} handles personal information
        collected from prospective students, enrolled students, staff and
        visitors to this website. [INSERT OFFICIAL SCOPE]
      </p>

      <h2>Information we collect</h2>
      <p>
        The college may collect personal information including, but not limited
        to: [INSERT OFFICIAL LIST OF INFORMATION COLLECTED]
      </p>
      <ul>
        <li>Contact details provided through enquiry and application forms</li>
        <li>Academic records and supporting documentation</li>
        <li>Identification and, for international applicants, passport details</li>
        <li>Records of your interactions with the college</li>
      </ul>

      <h2>How we use your information</h2>
      <p>
        Information is used to respond to enquiries, assess applications,
        administer enrolment and study, meet the college&rsquo;s legal and
        regulatory obligations, and improve the services offered. [INSERT
        OFFICIAL PURPOSES]
      </p>

      <h2>Disclosure</h2>
      <p>
        The college may be required to disclose personal information to
        government departments, regulators and other third parties in specified
        circumstances. [INSERT OFFICIAL DISCLOSURE ARRANGEMENTS — this section
        must accurately describe every recipient of student data.]
      </p>

      <h2>Storage and security</h2>
      <p>
        The college takes reasonable steps to protect personal information from
        misuse, loss and unauthorised access. [INSERT OFFICIAL SECURITY AND
        RETENTION PRACTICES]
      </p>

      <h2>Cookies and this website</h2>
      <p>
        [INSERT OFFICIAL COOKIE AND ANALYTICS DISCLOSURE. This website does not
        currently load any third-party analytics or advertising scripts; if any
        are added, this section must be updated before they go live.]
      </p>

      <h2>Accessing and correcting your information</h2>
      <p>
        You may request access to the personal information the college holds
        about you, and ask for it to be corrected. [INSERT OFFICIAL PROCESS]
      </p>

      <h2>Complaints</h2>
      <p>
        If you believe your privacy has been breached, you may make a complaint
        to the college. [INSERT OFFICIAL COMPLAINTS PROCESS AND EXTERNAL
        ESCALATION PATH]
      </p>

      <h2>Contact</h2>
      <p>
        Privacy enquiries can be directed to {site.contact.email}, or by post to{" "}
        {site.contact.addressLines.join(", ")}.
      </p>
    </LegalPage>
  );
}
