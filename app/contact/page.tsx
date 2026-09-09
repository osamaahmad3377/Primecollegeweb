import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { ContentNotice } from "@/components/ui/ContentNotice";
import { socialIcons, type SocialName } from "@/components/ui/SocialIcons";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { images } from "@/data/images";
import { site } from "@/data/site";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Prime International College Australia — enquiries, admissions, international student support and campus details.",
  path: "/contact",
});

const trail = [{ name: "Contact", path: "/contact" }];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to our team"
        lead="Whether you are ready to apply or just weighing up your options, we would rather you asked than guessed."
        image={images.mentoring}
        trail={trail}
      />

      <Section tone="white" aria-labelledby="contact-heading">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Details */}
            <div className="lg:col-span-4">
              <SectionHeading
                id="contact-heading"
                eyebrow="Get in touch"
                title="Contact details"
                as="h2"
              />

              <Reveal delay={0.1}>
                <dl className="mt-10 space-y-9">
                  <div className="flex gap-4">
                    <MapPin
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="mt-0.5 size-5 shrink-0 text-gold-deep"
                    />
                    <div>
                      <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-navy">
                        Campus
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-muted">
                        {site.contact.addressLines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Phone
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="mt-0.5 size-5 shrink-0 text-gold-deep"
                    />
                    <div>
                      <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-navy">
                        Phone
                      </dt>
                      <dd className="mt-2 text-sm text-muted">
                        {site.contact.phone}
                      </dd>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Mail
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="mt-0.5 size-5 shrink-0 text-gold-deep"
                    />
                    <div>
                      <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-navy">
                        Email
                      </dt>
                      <dd className="mt-2 space-y-1 text-sm text-muted">
                        <span className="block break-words">
                          General: {site.contact.email}
                        </span>
                        <span className="block break-words">
                          Admissions: {site.contact.admissionsEmail}
                        </span>
                        <span className="block break-words">
                          International: {site.contact.internationalEmail}
                        </span>
                      </dd>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Clock
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="mt-0.5 size-5 shrink-0 text-gold-deep"
                    />
                    <div>
                      <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-navy">
                        Opening hours
                      </dt>
                      <dd className="mt-2 space-y-1 text-sm text-muted">
                        {site.contact.hours.map((entry) => (
                          <span key={entry.days} className="block">
                            {entry.days}: {entry.time}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </div>
                </dl>
              </Reveal>

              <Reveal delay={0.14} className="mt-10">
                <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-navy">
                  Follow us
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {site.social.map((channel) => {
                    const Icon = socialIcons[channel.label as SocialName];
                    const configured = !channel.href.startsWith("[");
                    return (
                      <li key={channel.label}>
                        <a
                          href={configured ? channel.href : undefined}
                          aria-disabled={!configured}
                          target={configured ? "_blank" : undefined}
                          rel={configured ? "noopener noreferrer" : undefined}
                          className={`inline-flex size-10 items-center justify-center rounded-sm border transition-colors duration-300 ${
                            configured
                              ? "border-ink/20 text-navy hover:border-gold hover:bg-navy hover:text-white"
                              : "cursor-not-allowed border-ink/12 text-muted/50"
                          }`}
                        >
                          <Icon className="size-[1.05rem]" />
                          <span className="sr-only">
                            {site.name} on {channel.label}
                            {configured
                              ? " (opens in a new tab)"
                              : " — link pending"}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-8">
              <Reveal>
                <div className="rounded-panel border border-ink/12 bg-cream p-6 sm:p-9">
                  <h2 className="headline text-subtitle text-navy">
                    Send us an enquiry
                  </h2>
                  <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-muted">
                    Tell us a little about what you are looking for and the right
                    person will come back to you.
                  </p>
                  <div className="mt-9">
                    <EnquiryForm variant="contact" />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Location — no fabricated map or coordinates */}
      <Section tone="cream" spacing="tight" aria-labelledby="location-heading">
        <Container>
          <SectionHeading id="location-heading" eyebrow="Finding us" title="Our location" as="h2" className="max-w-[34rem]" />

          <Reveal className="mt-10">
            <div className="flex min-h-[18rem] flex-col items-center justify-center rounded-media border border-ink/12 bg-white px-6 py-16 text-center">
              <MapPin
                aria-hidden="true"
                strokeWidth={1.25}
                className="size-8 text-gold-deep"
              />
              <p className="mt-5 headline text-subtitle text-navy">
                Map to be added
              </p>
              <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-muted">
                An interactive map will be embedded here once the campus address
                is confirmed. No location has been guessed at or approximated.
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-8">
            <ContentNotice className="bg-white">
              [INSERT OFFICIAL CAMPUS ADDRESS, PHONE NUMBER, EMAIL ADDRESSES,
              OPENING HOURS AND MAP EMBED. Every contact detail on this page is
              currently a placeholder.]
            </ContentNotice>
          </Reveal>
        </Container>
      </Section>

      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, ...trail])} />
    </>
  );
}
