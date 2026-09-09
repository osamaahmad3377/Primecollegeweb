import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/shared/PageHero";
import { Prose } from "@/components/shared/Prose";
import { ContentNotice } from "@/components/ui/ContentNotice";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

/**
 * Shared shell for the policy pages, so their structure and typography stay
 * identical and a new policy is a single content file away.
 */
export function LegalPage({
  eyebrow,
  title,
  lead,
  updated,
  notice,
  children,
  trail,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  updated: string;
  notice: ReactNode;
  children: ReactNode;
  trail: { name: string; path: string }[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lead={lead} trail={trail} />

      <Section tone="white">
        <Container>
          <p className="text-sm text-muted">Last updated: {updated}</p>

          <div className="mt-8 max-w-[68ch]">
            <ContentNotice>{notice}</ContentNotice>
          </div>

          <Prose className="mt-12">{children}</Prose>
        </Container>
      </Section>

      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, ...trail])} />
    </>
  );
}
