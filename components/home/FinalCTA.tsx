import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The closing call to action: a gold field against navy. This is the only
 * place on the site where gold is used as a large surface, which is what
 * makes it land.
 */
export function FinalCTA() {
  return (
    <section aria-labelledby="cta-heading" className="bg-navy">
      <Container className="py-20 sm:py-24 lg:py-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-panel bg-gold px-6 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
            {/* An inset keyline — the restrained, engraved detail this panel
                wants. An emblem-derived shape was tried here and read as a
                stray UI box rather than as texture. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-3 rounded-[0.625rem] border border-navy/20 sm:inset-4"
            />

            <div className="relative max-w-[44rem]">
              <p className="eyebrow text-navy">Admissions open</p>
              <h2
                id="cta-heading"
                className="mt-5 headline text-display text-navy"
              >
                Ready to take the next step?
              </h2>
              <p className="mt-6 max-w-[52ch] text-lead text-navy/90">
                Whether you know exactly what you want to study or are still
                weighing up your options, our team will give you a straight
                answer. Start an application, or simply ask us a question.
              </p>

              <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
                <Button
                  href="/admissions#apply"
                  size="lg"
                  className="bg-navy text-white hover:bg-navy-dark hover:shadow-[0_10px_28px_-14px_rgba(0,21,45,0.7)]"
                >
                  Apply Now
                </Button>
                <Button
                  href="/contact"
                  size="lg"
                  variant="secondary"
                  className="border-navy/40 text-navy hover:border-navy hover:bg-navy hover:text-white"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
