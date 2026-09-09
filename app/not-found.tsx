import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { primaryNav } from "@/data/navigation";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[70svh] items-center overflow-hidden bg-navy-dark py-24">
      <div aria-hidden="true" className="absolute inset-0 -z-10 navy-field" />

      <Container>
        <div className="max-w-[46rem]">
          <div className="flex items-center gap-3.5">
            <span aria-hidden="true" className="block h-px w-10 bg-gold" />
            <p className="eyebrow text-gold-light">Error 404</p>
          </div>

          <h1 className="mt-7 headline text-display text-white">
            We couldn&rsquo;t find that page
          </h1>

          <p className="mt-6 max-w-[52ch] text-lead text-white/85">
            The page may have moved, or the address may be slightly off. Here are
            a few places to pick things up again.
          </p>

          <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <Button href="/" size="lg">
              Back To Home
            </Button>
            <Button href="/contact" variant="secondaryLight" size="lg">
              Contact Us
            </Button>
          </div>

          <nav aria-label="Suggested pages" className="mt-14 border-t border-white/15 pt-8">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-rule text-sm text-white/80 transition-colors hover:text-gold-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
