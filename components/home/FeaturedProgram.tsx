import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { images } from "@/data/images";
import { programs } from "@/data/programs";

/**
 * A full-bleed campaign band. This is the one section on the homepage that
 * lets a photograph carry the full width — the visual pause between the
 * programs grid and the admissions process.
 */
export function FeaturedProgram() {
  const program = programs.find((p) => p.slug === "information-technology");

  return (
    <section
      aria-labelledby="featured-heading"
      className="relative isolate flex min-h-[34rem] items-end overflow-hidden bg-navy-dark py-20 sm:py-24 lg:min-h-[44rem] lg:py-28"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <Image
          src={images.techCorridor.src}
          alt=""
          fill
          quality={82}
          sizes="100vw"
          className="object-cover object-[60%_50%]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-navy-dark/78 lg:bg-[linear-gradient(75deg,var(--color-navy-dark)_10%,color-mix(in_srgb,var(--color-navy-dark)_74%,transparent)_52%,color-mix(in_srgb,var(--color-navy-dark)_28%,transparent)_88%)]"
      />

      <Container className="relative">
        <div className="max-w-[40rem]">
          <Reveal>
            <div className="flex items-center gap-3.5">
              <span aria-hidden="true" className="block h-px w-10 bg-gold" />
              <p className="eyebrow text-gold-light">Featured program</p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              id="featured-heading"
              className="mt-7 headline text-display text-white"
            >
              Your next chapter starts here.
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-6 text-lead text-white/85">
              {program
                ? program.summary
                : "Explore the programs available across six fields of study."}
            </p>
          </Reveal>

          {program ? (
            <Reveal delay={0.2}>
              <p className="mt-6 border-l border-gold/60 pl-5 font-display text-subtitle text-gold-light">
                {program.title}
              </p>
            </Reveal>
          ) : null}

          <Reveal delay={0.26}>
            <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <Button
                href={program ? `/programs/${program.slug}` : "/programs"}
                size="lg"
              >
                Explore Program
              </Button>
              <Button href="/programs" variant="secondaryLight" size="lg">
                All Programs
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
