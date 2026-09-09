import Image from "next/image";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { images } from "@/data/images";

export function Intro() {
  return (
    <Section tone="white" aria-labelledby="intro-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-24">
          {/* Editorial photography, framed rather than floated. */}
          <Reveal direction="left" className="lg:col-span-5">
            <figure className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-media bg-mist lg:aspect-[3/4]">
                <Image
                  src={images.studyGroup.src}
                  alt={images.studyGroup.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              {/* Offset rule referencing the emblem's framing. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-5 -right-5 hidden h-28 w-28 border-b border-r border-gold sm:block"
              />
            </figure>
          </Reveal>

          <div className="lg:col-span-7 lg:pl-4">
            {/* The gold vertical rule that opens the editorial column. */}
            <div className="relative border-l border-ink/10 pl-7 sm:pl-9">
              <span
                aria-hidden="true"
                className="absolute -left-px top-0 h-16 w-px bg-gold"
              />

              <Reveal>
                <p className="eyebrow text-gold-deep">Welcome to Prime</p>
              </Reveal>

              <Reveal delay={0.08}>
                <h2
                  id="intro-heading"
                  className="mt-5 headline text-title text-navy"
                >
                  Education designed around your future.
                </h2>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="mt-7 space-y-5 text-lead text-muted">
                  <p>
                    A qualification should be worth something the day it is
                    issued and the year after that. At Prime, programs are built
                    backwards from the work our students intend to do — the
                    tools, the standards, the judgement and the professional
                    habits that field actually requires.
                  </p>
                  <p>
                    Our classrooms are small enough that teaching staff know
                    their students by name, and international enough that a
                    single cohort brings perspectives from across the world into
                    the room. That combination is deliberate. It is also, we
                    think, the most useful preparation for a career that will be
                    international whether or not it takes you overseas.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-10">
                  <ArrowLink href="/about">Discover Prime</ArrowLink>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
