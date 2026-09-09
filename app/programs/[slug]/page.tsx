import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, MapPin, MonitorSmartphone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ContentNotice } from "@/components/ui/ContentNotice";
import { ProgramCard } from "@/components/programs/ProgramCard";
import { admissionSteps } from "@/data/content";
import { getProgram, programs } from "@/data/programs";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { pad } from "@/lib/utils";

/** Pre-renders every program page at build time. */
export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return {};

  return pageMetadata({
    title: program.title,
    description: program.summary,
    path: `/programs/${program.slug}`,
  });
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const related = programs
    .filter((p) => p.category === program.category && p.slug !== program.slug)
    .concat(programs.filter((p) => p.category !== program.category))
    .slice(0, 3);

  const trail = [
    { name: "Programs", path: "/programs" },
    { name: program.title, path: `/programs/${program.slug}` },
  ];

  const keyFacts = [
    { label: "Duration", value: program.duration, Icon: Clock },
    { label: "Study mode", value: program.mode, Icon: MonitorSmartphone },
    { label: "Intakes", value: program.intakes, Icon: Calendar },
    { label: "Location", value: program.location, Icon: MapPin },
  ];

  return (
    <>
      <PageHero
        eyebrow={program.category}
        title={program.title}
        lead={program.summary}
        image={program.image}
        trail={trail}
      />

      {/* Key facts strip */}
      <Section tone="cream" spacing="tight" aria-labelledby="key-info-heading">
        <Container>
          <h2 id="key-info-heading" className="sr-only">
            Key information
          </h2>
          <dl className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {keyFacts.map(({ label, value, Icon }) => (
              <div key={label} className="border-t border-ink/15 pt-5">
                <dt className="flex items-center gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gold-deep">
                  <Icon aria-hidden="true" strokeWidth={1.5} className="size-4" />
                  {label}
                </dt>
                <dd className="mt-2.5 font-mono text-base font-medium text-navy">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Overview + sidebar */}
      <Section tone="white" aria-labelledby="overview-heading">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading id="overview-heading" eyebrow="Overview" title="About this program" as="h2" />

              <Reveal delay={0.1}>
                <p className="mt-7 max-w-[62ch] text-lead text-muted">
                  {program.overview}
                </p>
              </Reveal>

              <Reveal delay={0.14}>
                <h3 className="mt-14 headline text-subtitle text-navy">
                  What you will study
                </h3>
                <ul className="mt-6 space-y-4">
                  {program.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-gold"
                      />
                      <span className="max-w-[58ch] leading-relaxed text-muted">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.16}>
                <h3 className="mt-14 headline text-subtitle text-navy">
                  Entry requirements
                </h3>
                <ul className="mt-6 space-y-4">
                  {program.entryRequirements.map((requirement) => (
                    <li key={requirement} className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-gold"
                      />
                      <span className="max-w-[58ch] leading-relaxed text-muted">
                        {requirement}
                      </span>
                    </li>
                  ))}
                </ul>
                <ContentNotice className="mt-8">
                  Entry requirements must be confirmed against the college&rsquo;s
                  approved course documentation. Nothing shown here has been
                  verified. [INSERT OFFICIAL ENTRY REQUIREMENTS]
                </ContentNotice>
              </Reveal>

              <Reveal delay={0.18}>
                <h3 className="mt-14 headline text-subtitle text-navy">
                  Career outcomes
                </h3>
                <ul className="mt-6 space-y-4">
                  {program.careerOutcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-gold"
                      />
                      <span className="max-w-[58ch] leading-relaxed text-muted">
                        {outcome}
                      </span>
                    </li>
                  ))}
                </ul>
                <ContentNotice className="mt-8">
                  The college does not guarantee employment. Career outcomes
                  describe roles the program is designed to prepare students for,
                  and must be verified before publication. [INSERT OFFICIAL
                  CAREER OUTCOME INFORMATION]
                </ContentNotice>
              </Reveal>
            </div>

            {/* Sticky application panel */}
            <div className="lg:col-span-5">
              <Reveal direction="right" className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
                <div className="rounded-panel border border-ink/12 bg-cream p-7 sm:p-9">
                  <h2 className="headline text-subtitle text-navy">
                    How to apply
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Four steps from first enquiry to enrolment.
                  </p>

                  <ol className="mt-7 space-y-5">
                    {admissionSteps.map((step, index) => (
                      <li key={step.title} className="flex gap-4">
                        <span className="font-display text-lg leading-tight text-gold">
                          {pad(index + 1)}
                        </span>
                        <span className="text-sm font-medium text-navy">
                          {step.title}
                        </span>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-9 flex flex-col gap-3">
                    <Button href="/admissions#apply" block size="lg">
                      Apply Now
                    </Button>
                    <Button href="/contact" variant="secondary" block size="lg">
                      Ask A Question
                    </Button>
                  </div>

                  <p className="mt-7 border-t border-ink/12 pt-5 text-sm text-muted">
                    Fees for this program are set out in your written offer.{" "}
                    <span className="text-navy">[INSERT OFFICIAL FEE SCHEDULE]</span>
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related programs */}
      {related.length > 0 ? (
        <Section tone="cream" aria-labelledby="related-heading">
          <Container>
            <SectionHeading
              id="related-heading"
              eyebrow="Keep exploring"
              title="Other programs"
              as="h2"
              className="max-w-[34rem]"
            />
            <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <ProgramCard
                    program={item}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  />
                </li>
              ))}
            </ul>
            <p className="mt-12">
              <Link
                href="/programs"
                className="link-rule text-xs font-semibold uppercase tracking-[0.14em] text-navy hover:text-gold-deep"
              >
                View all programs
              </Link>
            </p>
          </Container>
        </Section>
      ) : null}

      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, ...trail])} />
    </>
  );
}
