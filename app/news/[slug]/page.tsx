import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { NewsCard } from "@/components/news/NewsCard";
import { ContentNotice } from "@/components/ui/ContentNotice";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { getArticle, newsArticles, sortedNews } from "@/data/news";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/news/${article.slug}`,
    type: "article",
    publishedTime: article.date,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = sortedNews.filter((item) => item.slug !== article.slug).slice(0, 3);

  const trail = [
    { name: "News & Updates", path: "/news" },
    { name: article.title, path: `/news/${article.slug}` },
  ];

  return (
    <>
      <PageHero
        eyebrow={article.category}
        title={article.title}
        image={article.image}
        trail={trail}
      />

      <Section tone="white" aria-labelledby="article-body-heading">
        <Container>
          <h2 id="article-body-heading" className="sr-only">
            Article
          </h2>

          <article className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            {/* Meta rail */}
            <div className="lg:col-span-3">
              <Reveal>
                <dl className="border-t border-ink/15 pt-5 text-sm">
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gold-deep">
                    Published
                  </dt>
                  <dd className="mt-2 text-navy">
                    <time dateTime={article.date}>{formatDate(article.date)}</time>
                  </dd>
                  <dt className="mt-6 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gold-deep">
                    Category
                  </dt>
                  <dd className="mt-2 text-navy">{article.category}</dd>
                </dl>
              </Reveal>
            </div>

            {/* Body */}
            <div className="lg:col-span-9">
              <Reveal>
                <p className="max-w-[64ch] headline-cased text-[clamp(1.25rem,1.05rem+0.8vw,1.625rem)] leading-[1.5] text-navy">
                  {article.excerpt}
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="mt-9 max-w-[68ch] space-y-6 text-base leading-[1.75] text-muted">
                  {article.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <ContentNotice className="mt-10 max-w-[68ch]">
                  This article is placeholder content written to demonstrate the
                  article template. It does not describe anything that has
                  happened. [REPLACE WITH OFFICIAL COLLEGE CONTENT]
                </ContentNotice>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="mt-12 border-t border-ink/12 pt-8">
                  <Link
                    href="/news"
                    className="group inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-navy transition-colors hover:text-gold-deep"
                  >
                    <ArrowLeft
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="size-4 transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    />
                    <span className="link-rule">All news</span>
                  </Link>
                </p>
              </Reveal>
            </div>
          </article>
        </Container>
      </Section>

      {related.length > 0 ? (
        <Section tone="cream" aria-labelledby="related-news-heading">
          <Container>
            <h2
              id="related-news-heading"
              className="headline text-title text-navy"
            >
              More updates
            </h2>
            <RevealGroup
              as="ul"
              className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
            >
              {related.map((item) => (
                <RevealItem as="li" key={item.slug}>
                  <NewsCard article={item} />
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      ) : null}

      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, ...trail])} />
    </>
  );
}
