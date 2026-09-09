"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { ProgramCard } from "@/components/programs/ProgramCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { programCategories } from "@/data/programs";
import type { Program, ProgramCategory } from "@/lib/types";

type Filter = ProgramCategory | "All";

/**
 * Client-side filtering and search over the program list.
 *
 * The full list is rendered on the server and filtered here, so the page is
 * complete and indexable without JavaScript; this only narrows what is shown.
 *
 * The ?category= deep link is read on the client rather than through the page's
 * searchParams, which keeps /programs a fully static route instead of forcing
 * it to be server-rendered on every request.
 */
export function ProgramExplorer({ programs }: { programs: Program[] }) {
  return (
    <Suspense fallback={<ProgramGrid programs={programs} />}>
      <ProgramExplorerInner programs={programs} />
    </Suspense>
  );
}

/** Non-interactive fallback rendered while the search params resolve. */
function ProgramGrid({ programs }: { programs: Program[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
      {programs.map((program, index) => (
        <li key={program.slug}>
          <ProgramCard
            program={program}
            priority={index < 3}
            sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
          />
        </li>
      ))}
    </ul>
  );
}

function ProgramExplorerInner({ programs }: { programs: Program[] }) {
  const searchParams = useSearchParams();
  const requested = searchParams.get("category");
  const initialCategory = programCategories.includes(
    requested as ProgramCategory,
  )
    ? (requested as ProgramCategory)
    : undefined;

  const [category, setCategory] = useState<Filter>(initialCategory ?? "All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return programs.filter((program) => {
      const matchesCategory =
        category === "All" || program.category === category;
      const matchesQuery =
        !term ||
        program.title.toLowerCase().includes(term) ||
        program.summary.toLowerCase().includes(term) ||
        program.category.toLowerCase().includes(term);
      return matchesCategory && matchesQuery;
    });
  }, [programs, category, query]);

  const filters: Filter[] = ["All", ...programCategories];

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Category filter — a radio group, so arrow keys move between options. */}
        <fieldset className="min-w-0">
          <legend className="sr-only">Filter programs by field of study</legend>
          <ul className="flex flex-wrap gap-2">
            {filters.map((option) => {
              const active = category === option;
              return (
                <li key={option}>
                  <label
                    className={`inline-flex cursor-pointer items-center gap-2 rounded-button border px-4 py-2 text-xs font-medium transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy ${
                      active
                        ? "border-navy bg-navy text-white"
                        : "border-navy/20 bg-white text-navy hover:border-navy/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="program-category"
                      value={option}
                      checked={active}
                      onChange={() => setCategory(option)}
                      className="sr-only"
                    />
                    {/* A gold marker as well as the colour change, so the
                        active state is never signalled by colour alone. */}
                    {active ? (
                      <span
                        aria-hidden="true"
                        className="size-1.5 rotate-45 bg-gold-light"
                      />
                    ) : null}
                    {option}
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <div className="relative w-full shrink-0 lg:w-72">
          <label htmlFor="program-search" className="sr-only">
            Search programs
          </label>
          <Search
            aria-hidden="true"
            strokeWidth={1.5}
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
          />
          <input
            id="program-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search programs"
            className="w-full rounded-button border border-ink/20 bg-white py-2.5 pl-10 pr-9 text-sm text-ink transition-colors placeholder:text-muted hover:border-ink/35 focus:border-navy focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-sm text-muted hover:text-navy"
            >
              <X aria-hidden="true" strokeWidth={1.5} className="size-4" />
              <span className="sr-only">Clear search</span>
            </button>
          ) : null}
        </div>
      </div>

      {/* Result count, announced politely as the filters change. */}
      <p aria-live="polite" className="mt-8 text-sm text-muted">
        Showing {filtered.length}{" "}
        {filtered.length === 1 ? "program" : "programs"}
        {category !== "All" ? ` in ${category}` : ""}
        {query ? ` matching “${query}”` : ""}.
      </p>

      {filtered.length > 0 ? (
        <ul className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((program, index) => (
            <li key={program.slug}>
              <ProgramCard
                program={program}
                priority={index < 3}
                sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
              />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          className="mt-10"
          title="No programs match your search"
          description="Try a different field of study, or clear the search to see everything we offer. If you cannot find what you are looking for, our admissions team can help."
        />
      )}
    </div>
  );
}
