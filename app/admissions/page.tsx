import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { ContentNotice } from "@/components/ui/ContentNotice";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { SectionNav } from "@/components/shared/SectionNav";
import { Button } from "@/components/ui/Button";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { admissionSteps, admissionsFaqs, principles } from "@/data/content";
import { images } from "@/data/images";
import { programs } from "@/data/programs";
import { site } from "@/data/site";
import { pad } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Admissions",
  description:
    "How to apply to Prime International College Australia — the application process, requirements, key dates and answers to common questions.",
  path: "/admissions",
});

const trail = [{ name: "Admissions", path: "/admissions" }];

const sections = [
  { id: "why", label: "Why Prime" },
  { id: "process", label: "How to apply" },
  { id: "requirements", label: "Requirements" },
  { id: "dates", label: "Dates & fees" },
  { id: "apply", label: "Start your application" },
  { id: "faq", label: "FAQs" },
];

const requirementGroups = [
  {
    title: "Academic records",
    body: "Certified copies of your previous qualifications and academic transcripts. [INSERT OFFICIAL ACADEMIC REQUIREMENTS]",
  },
  {
    title: "English language",
    body: "Evidence of English language proficiency at the level required for your program. [INSERT OFFICIAL ENGLISH LANGUAGE REQUIREMENTS]",
  },
  {
    title: "Identification",
    body: "Proof of identity and, for international applicants, your passport details. [INSERT OFFICIAL IDENTIFICATION REQUIREMENTS]",
  },
  {
    title: "Supporting documents",
    body: "Any additional documentation specific to your program, such as background checks for placement-based study. [INSERT PROGRAM-SPECIFIC REQUIREMENTS]",
  },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="Your journey starts here."
        lead="A clear process, a real person to talk to, and a straight answer at the end of every step."
        image={images.deskWriting}
        trail={trail}
      />

      {/* Why study here — brief, then straight into process */}
      <SectionNav items={sections} />

      <Section tone="white" id="why" aria-labelledby="why-study-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading
                id="why-study-heading"
                eyebrow="Why study at Prime"
                title="What you are choosing"
                as="h2"
              />
            </div>
            <RevealGroup as="ul" className="lg:col-span-8 grid gap-x-12 sm:grid-cols-2">
              {principles.slice(0, 4).map((principle) => (
                <RevealItem
                  as="li"
                  key={principle.title}
                  className="border-t border-ink/12 py-7"
                >
                  <h3 className="text-base font-semibold text-navy">
                    {principle.title}
                  </h3>
                  <p className="mt-2.5 max-w-[44ch] text-sm leading-relaxed text-muted">
                    {principle.description}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section tone="navy" id="process" aria-labelledby="process-heading">
        <Container>
          <SectionHeading
            id="process-heading"
            tone="dark"
            eyebrow="Application process"
            title="Four steps to enrolment"
            lead="Most applications move through these stages within a few weeks. We will tell you at each point exactly what happens next."
            className="max-w-[40rem]"
          />

          <RevealGroup as="ol" className="mt-14">
            {admissionSteps.map((step, index) => (
              <RevealItem
                as="li"
                key={step.title}
                className="grid grid-cols-[3rem_1fr] gap-x-5 border-t border-white/15 py-8 last:border-b sm:grid-cols-[6rem_1fr] sm:gap-x-10 sm:py-10"
              >
                <span className="font-display text-[1.75rem] leading-none text-gold-light sm:text-[2.5rem]">
                  {pad(index + 1)}
                </span>
                <div>
                  <h3 className="headline text-subtitle text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[60ch] leading-relaxed text-navy-muted">
                    {step.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Requirements, dates, fees */}
      <Section tone="white" id="requirements" aria-labelledby="requirements-heading">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading
                id="requirements-heading"
                eyebrow="What you will need"
                title="Requirements"
                as="h2"
              />
              <RevealGroup as="ul" className="mt-9">
                {requirementGroups.map((group) => (
                  <RevealItem
                    as="li"
                    key={group.title}
                    className="border-t border-ink/12 py-6"
                  >
                    <h3 className="text-base font-semibold text-navy">
                      {group.title}
                    </h3>
                    <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-muted">
                      {group.body}
                    </p>
                  </RevealItem>
                ))}
              </RevealGroup>
              <Reveal className="mt-8">
                <ContentNotice>
                  Requirements vary by program and must be confirmed against the
                  college&rsquo;s approved course documentation.
                </ContentNotice>
              </Reveal>
            </div>

            <div className="lg:col-span-6" id="dates">
              <SectionHeading eyebrow="Planning ahead" title="Dates and fees" as="h2" />

              <Reveal delay={0.1} className="mt-9">
                <div className="rounded-panel border border-ink/12 bg-cream p-7 sm:p-9">
                  <h3 className="text-base font-semibold text-navy">
                    Important dates
                  </h3>
                  <dl className="mt-5 space-y-4 text-sm">
                    {["Applications open", "Applications close", "Orientation", "Teaching commences"].map(
                      (label) => (
                        <div
                          key={label}
                          className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink/10 pb-4 last:border-0 last:pb-0"
                        >
                          <dt className="text-muted">{label}</dt>
                          <dd className="font-medium text-navy">[INSERT DATE]</dd>
                        </div>
                      ),
                    )}
                  </dl>

                  <h3 className="mt-9 text-base font-semibold text-navy">
                    Fees
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Tuition fees vary by program. A complete schedule of tuition
                    fees and any additional charges is provided in your written
                    offer, before you accept a place.{" "}
                    <span className="text-navy">[INSERT OFFICIAL FEE SCHEDULE]</span>
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Apply */}
      <Section tone="cream" aria-labelledby="apply-heading" id="apply">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading
                id="apply-heading"
                eyebrow="Start your application"
                title="Tell us what you would like to study"
                as="h2"
                lead="Send us your details and the admissions team will come back to you with the next step for your program."
              />
              <Reveal delay={0.14} className="mt-9">
                <div className="border-t border-ink/15 pt-6 text-sm text-muted">
                  <p className="font-semibold text-navy">Admissions team</p>
                  <p className="mt-2">{site.contact.admissionsEmail}</p>
                  <p className="mt-1">{site.contact.phone}</p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <Reveal>
                <div className="rounded-panel border border-ink/12 bg-white p-6 sm:p-9">
                  <EnquiryForm
                    variant="application"
                    options={programs.map((program) => program.title)}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="white" id="faq" aria-labelledby="faq-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading
                id="faq-heading"
                eyebrow="Questions"
                title="Frequently asked"
                as="h2"
                lead="If your question is not answered here, our team would rather you asked than guessed."
              />
              <Reveal delay={0.14} className="mt-9">
                <Button href="/contact" variant="secondary" size="lg">
                  Contact Admissions
                </Button>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <h2 id="faq-heading" className="sr-only">
                Frequently asked questions
              </h2>
              <Accordion items={admissionsFaqs} />
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, ...trail])} />
    </>
  );
}
