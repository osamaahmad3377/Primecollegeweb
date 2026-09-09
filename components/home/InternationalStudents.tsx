import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { internationalSupport } from "@/data/content";
import { images } from "@/data/images";

export function InternationalStudents() {
  return (
    <Section tone="navy" aria-labelledby="international-heading">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16 xl:gap-20">
          <div className="lg:col-span-6">
            <SectionHeading
              id="international-heading"
              tone="dark"
              eyebrow="International students"
              title="Your global future starts here."
              lead="Students come to Prime from across the world. The support around them is built for that reality — practical, patient and available from the first enquiry to the final assessment."
            />

            <Reveal delay={0.16} className="mt-10">
              <figure className="relative aspect-[16/10] overflow-hidden rounded-media bg-navy-soft">
                <Image
                  src={images.diverseOutdoors.src}
                  alt={images.diverseOutdoors.alt}
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover"
                />
              </figure>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <RevealGroup as="ul">
              {internationalSupport.map((item) => (
                <RevealItem
                  as="li"
                  key={item.title}
                  className="border-t border-white/15 py-7 first:border-t-0 first:pt-0 lg:py-8"
                >
                  <div className="flex items-start gap-5">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-gold"
                    />
                    <div>
                      <h3 className="headline text-subtitle text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 max-w-[52ch] leading-relaxed text-navy-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.1} className="mt-10">
              <Button href="/international-students" size="lg">
                International Student Information
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
