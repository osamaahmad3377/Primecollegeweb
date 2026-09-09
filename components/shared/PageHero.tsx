import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import type { ImageAsset } from "@/lib/types";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  lead?: string;
  image?: ImageAsset;
  /** Breadcrumb trail, excluding Home which is prepended automatically. */
  trail: { name: string; path: string }[];
}

/**
 * The opening band shared by every internal page. Keeping it consistent is
 * what lets the header start transparent over a dark field site-wide.
 *
 * This is a server component: the entrance animation is CSS-only, so no
 * JavaScript ships for the most important content on the page.
 */
export function PageHero({ eyebrow, title, lead, image, trail }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-dark py-14 sm:py-16 lg:py-24">
      {image ? (
        <>
          <div aria-hidden="true" className="absolute inset-0 -z-20">
            <Image
              src={image.src}
              alt=""
              fill
              priority
              quality={78}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-navy-dark/85 lg:bg-[linear-gradient(95deg,var(--color-navy-dark)_12%,color-mix(in_srgb,var(--color-navy-dark)_82%,transparent)_58%,color-mix(in_srgb,var(--color-navy-dark)_58%,transparent)_100%)]"
          />
        </>
      ) : (
        <div aria-hidden="true" className="absolute inset-0 -z-10 navy-field" />
      )}

      <Container>
        <Breadcrumbs trail={trail} />

        <div className="mt-9 max-w-[52rem]">
          <div className="flex items-center gap-3.5">
            <span aria-hidden="true" className="block h-px w-10 bg-gold" />
            <p className="eyebrow text-gold-light">{eyebrow}</p>
          </div>

          <h1 className="mt-6 headline text-display text-white">
            {title}
          </h1>

          {lead ? (
            <p className="mt-7 max-w-[58ch] text-lead text-white/85">{lead}</p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
