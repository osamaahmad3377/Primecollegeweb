import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { NewsCard } from "@/components/news/NewsCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sortedNews } from "@/data/news";

export function News() {
  const latest = sortedNews.slice(0, 3);

  return (
    <Section tone="cream" aria-labelledby="news-heading">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="news-heading"
            eyebrow="News & updates"
            title="Latest from Prime"
            className="lg:max-w-[34rem]"
          />
          <Reveal delay={0.1} className="shrink-0 lg:pb-3">
            <ArrowLink href="/news">All news</ArrowLink>
          </Reveal>
        </div>

        {latest.length > 0 ? (
          <RevealGroup
            as="ul"
            className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
          >
            {latest.map((article) => (
              <RevealItem as="li" key={article.slug}>
                <NewsCard article={article} />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <EmptyState
            className="mt-14"
            title="No updates just yet"
            description="There is nothing published at the moment. Please check back shortly, or contact us if you are looking for something specific."
          />
        )}
      </Container>
    </Section>
  );
}
