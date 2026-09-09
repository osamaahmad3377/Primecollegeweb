import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { NewsCard } from "@/components/news/NewsCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { ContentNotice } from "@/components/ui/ContentNotice";
import { FinalCTA } from "@/components/home/FinalCTA";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { sortedNews } from "@/data/news";
import { images } from "@/data/images";
import { formatDate } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "News & Updates",
  description:
    "News, announcements and updates from Prime International College Australia.",
  path: "/news",
});

const trail = [{ name: "News & Updates", path: "/news" }];

export default function NewsPage() {
  const [featured, ...rest] = sortedNews;

  return (
    <>
      <PageHero
        eyebrow="News & updates"
        title="What's happening at Prime"
        lead="Announcements, teaching notes and updates from across the college."
        image={images.campusExterior}
        trail={trail}
      />

      {sortedNews.length === 0 ? (
        <Section tone="white">
          <Container>
            <EmptyState
              title="No updates just yet"
              description="There is nothing published at the moment. Please check back shortly, or contact us if you are looking for something specific."
            />
          </Container>
        </Section>
      ) : (
        <>
          {/* Lead article — full-width editorial treatment. */}
          <Section tone="white" aria-labelledby="featured-article-heading">
            <Container>
              <Reveal>
                <article className="group grid gap-8 lg:grid-cols-12 lg:gap-14">
                  <div className="lg:col-span-7">
                    <div className="media-zoom relative aspect-[16/10] overflow-hidden rounded-media bg-mist">
                      <Image
                        src={featured.image.src}
                        alt={featured.image.alt}
                        fill
                        priority
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-5 lg:self-center">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em]">
                      <span className="text-gold-deep">Latest</span>
                      <span aria-hidden="true" className="size-1 rotate-45 bg-ink/25" />
                      <span className="text-gold-deep">{featured.category}</span>
                    </div>

                    <h2
                      id="featured-article-heading"
                      className="mt-5 headline text-title text-navy"
                    >
                      <Link href={`/news/${featured.slug}`} className="link-rule">
                        {featured.title}
                      </Link>
                    </h2>

                    <time
                      dateTime={featured.date}
                      className="mt-4 block text-sm text-muted"
                    >
                      {formatDate(featured.date)}
                    </time>

                    <p className="mt-5 max-w-[52ch] text-lead text-muted">
                      {featured.excerpt}
                    </p>
                  </div>
                </article>
              </Reveal>
            </Container>
          </Section>

          {/* The rest */}
          {rest.length > 0 ? (
            <Section tone="cream" aria-labelledby="more-news-heading">
              <Container>
                <h2
                  id="more-news-heading"
                  className="headline text-title text-navy"
                >
                  More from Prime
                </h2>
                <RevealGroup
                  as="ul"
                  className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {rest.map((article) => (
                    <RevealItem as="li" key={article.slug}>
                      <NewsCard article={article} />
                    </RevealItem>
                  ))}
                </RevealGroup>

                <Reveal className="mt-14">
                  <ContentNotice className="bg-white">
                    Every article on this page is placeholder content written to
                    demonstrate the layout. None of it describes events that have
                    taken place. [REPLACE WITH OFFICIAL COLLEGE NEWS]
                  </ContentNotice>
                </Reveal>
              </Container>
            </Section>
          ) : null}
        </>
      )}

      <FinalCTA />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, ...trail])} />
    </>
  );
}
