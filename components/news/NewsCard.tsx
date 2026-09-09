import Image from "next/image";
import Link from "next/link";
import type { NewsArticle } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function NewsCard({
  article,
  sizes = "(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw",
  priority = false,
}: {
  article: NewsArticle;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="card-lift media-zoom relative aspect-[3/2] overflow-hidden rounded-media bg-mist">
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
        <span
          aria-hidden="true"
          className="rule-draw absolute inset-x-0 bottom-0 h-0.5 bg-gold"
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em]">
        <span className="text-gold-deep">{article.category}</span>
        <span aria-hidden="true" className="size-1 rotate-45 bg-ink/25" />
        <time dateTime={article.date} className="font-medium tracking-[0.1em] text-muted">
          {formatDate(article.date)}
        </time>
      </div>

      <h3 className="mt-3 headline text-[1.4rem] leading-snug text-navy">
        <Link
          href={`/news/${article.slug}`}
          className="before:absolute before:inset-0 before:content-['']"
        >
          {article.title}
        </Link>
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {article.excerpt}
      </p>

      <p className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-navy transition-colors group-hover:text-gold-deep">
        <span className="link-rule">Read more</span>
      </p>
    </article>
  );
}
