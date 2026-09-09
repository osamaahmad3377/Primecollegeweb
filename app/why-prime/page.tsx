import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCTA } from "@/components/home/FinalCTA";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { principles } from "@/data/content";
import { images } from "@/data/images";
import { pad } from "@/lib/utils";
import type { ImageAsset } from "@/lib/types";

export const metadata = pageMetadata({
  title: "Why Prime",
  description:
    "Six commitments that shape how Prime International College Australia teaches, who we hire and what we expect of ourselves.",
  path: "/why-prime",
});

const trail = [{ name: "Why Prime", path: "/why-prime" }];

/** One photograph per principle, alternating side down the page. */
const artwork: ImageAsset[] = [
  images.lectureTheatre,
  images.workshop,
  images.mentoring,
  images.diverseComputers,
  images.business,
  images.studyGroup,
];

export default function WhyPrimePage() {
  return (
    <>
      <PageHero
        eyebrow="Why Prime"
        title="Why students choose Prime"
        lead="Not slogans. Six commitments we can be held to, and the reasoning behind each one."
        image={images.libraryStacks}
        trail={trail}
      />

      {/* Alternating editorial rows — one principle per row. */}
      <Section tone="white" aria-labelledby="principles-heading">
        <Container>
          <h2 id="principles-heading" className="sr-only">
            Our commitments
          </h2>

          <ol className="flex flex-col gap-20 lg:gap-28">
            {principles.map((principle, index) => {
              const flip = index % 2 === 1;
              return (
                <li
                  key={principle.title}
                  className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16"
                >
                  <Reveal
                    direction={flip ? "right" : "left"}
                    className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}
                  >
                    <figure className="relative aspect-[4/3] overflow-hidden rounded-media bg-mist">
                      <Image
                        src={artwork[index].src}
                        alt={artwork[index].alt}
                        fill
                        sizes="(min-width: 1024px) 48vw, 100vw"
                        className="object-cover"
                      />
                    </figure>
                  </Reveal>

                  <div className={`lg:col-span-6 ${flip ? "lg:order-1" : ""}`}>
                    <Reveal delay={0.08}>
                      <div className="flex items-center gap-4">
                        <span className="font-display text-[2rem] leading-none text-gold">
                          {pad(index + 1)}
                        </span>
                        <span
                          aria-hidden="true"
                          className="block h-px w-12 bg-gold/50"
                        />
                      </div>
                      <h3 className="mt-6 headline text-title text-navy">
                        {principle.title}
                      </h3>
                      <p className="mt-5 max-w-[52ch] text-lead text-muted">
                        {principle.description}
                      </p>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </Container>
      </Section>

      <Stats />
      <Testimonials />
      <FinalCTA />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, ...trail])} />
    </>
  );
}
