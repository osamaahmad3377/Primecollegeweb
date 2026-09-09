import type { MetadataRoute } from "next";
import { newsArticles } from "@/data/news";
import { programs } from "@/data/programs";
import { site } from "@/data/site";

/**
 * Static routes with a hand-set priority. Adding a page means adding a line
 * here — deliberately explicit rather than derived from the filesystem, so a
 * draft page can never leak into the sitemap by accident.
 */
const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/why-prime", priority: 0.7, changeFrequency: "monthly" },
  { path: "/programs", priority: 0.9, changeFrequency: "weekly" },
  { path: "/admissions", priority: 0.9, changeFrequency: "weekly" },
  { path: "/international-students", priority: 0.8, changeFrequency: "monthly" },
  { path: "/student-life", priority: 0.7, changeFrequency: "monthly" },
  { path: "/campus", priority: 0.6, changeFrequency: "monthly" },
  { path: "/news", priority: 0.7, changeFrequency: "weekly" },
  { path: "/events", priority: 0.7, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-and-conditions", priority: 0.3, changeFrequency: "yearly" },
  { path: "/accessibility", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: new URL(route.path, site.url).toString(),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...programs.map((program) => ({
      url: new URL(`/programs/${program.slug}`, site.url).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...newsArticles.map((article) => ({
      url: new URL(`/news/${article.slug}`, site.url).toString(),
      lastModified: new Date(article.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
