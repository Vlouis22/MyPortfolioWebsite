"use client";

import { useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";

import { ProjectCard } from "@/components/project-card";
import { ENTER_EASE, EXIT_EASE } from "@/lib/motion";
import type { Project } from "@/lib/projects";

type ProjectFilterGridProps = {
  projects: Project[];
  techTags: string[];
};

type SortOption = "newest" | "oldest" | "alpha";
type TechCategoryGroup = {
  description?: string;
  title: string;
  tags: string[];
};

const TECH_CATEGORIES = [
  {
    title: "Frontend",
    description: "Core UI frameworks and web presentation layers.",
    tags: ["React", "JavaScript", "TypeScript", "HTML", "CSS"],
  },
  {
    title: "Mobile",
    description: "Mobile-specific frameworks, routing, and app state tools.",
    tags: ["React Native", "Expo", "Expo Router", "TanStack Query"],
  },
  {
    title: "Backend",
    description: "Application logic, data systems, and authentication foundations.",
    tags: ["Python", "Flask", "Firebase", "Firestore", "Supabase", "Redis", "SQL", "Auth"],
  },
  {
    title: "Integrations",
    description: "APIs, payments, feeds, and external services.",
    tags: ["Api Integration", "Stripe", "NewsAPI.ai", "Geocoding", "Web Scraping", "Web Sockets"],
  },
  {
    title: "Systems",
    description: "Infrastructure, networking, and distributed architecture.",
    tags: ["Docker", "Networking", "Distributed Systems"],
  },
  {
    title: "AI & ML",
    description: "Models, LLM workflows, and speech or clinical ML tooling.",
    tags: ["AI", "OpenAI", "Gemini", "Whisper", "ClinicalBERT", "Medical T5"],
  },
] satisfies ReadonlyArray<TechCategoryGroup>;

function groupTechTags(techTags: string[]): TechCategoryGroup[] {
  const availableTags = new Set(techTags);
  const assignedTags = new Set<string>();

  const groups = TECH_CATEGORIES.map((category) => {
    const tags = category.tags.filter((tag) => availableTags.has(tag));

    tags.forEach((tag) => assignedTags.add(tag));

    return {
      description: category.description,
      title: category.title,
      tags,
    };
  }).filter((category) => category.tags.length > 0);

  const uncategorizedTags = techTags.filter((tag) => !assignedTags.has(tag));

  if (uncategorizedTags.length > 0) {
    groups.push({
      description: "Additional technologies used across projects.",
      title: "Other",
      tags: uncategorizedTags,
    });
  }

  return groups;
}

function sortProjects(projects: Project[], sortBy: SortOption) {
  const sortedProjects = [...projects];

  if (sortBy === "oldest") {
    return sortedProjects.sort((left, right) => left.year - right.year || left.order - right.order);
  }

  if (sortBy === "alpha") {
    return sortedProjects.sort((left, right) => left.title.localeCompare(right.title));
  }

  return sortedProjects.sort((left, right) => right.year - left.year || left.order - right.order);
}

export function ProjectFilterGrid({ projects, techTags }: ProjectFilterGridProps) {
  const prefersReducedMotion = useReducedMotion();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [showAllTags, setShowAllTags] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const groupedTechTags = groupTechTags(techTags);
  const categoryGroups: TechCategoryGroup[] = [
    {
      description: "Browse every project, or narrow by a category and then a specific stack.",
      title: "All",
      tags: techTags,
    },
    ...groupedTechTags,
  ];
  const activeGroup = categoryGroups.find((group) => group.title === activeCategory) ?? categoryGroups[0];

  const visibleProjects = sortProjects(
    projects.filter((project) => {
      const matchesCategory =
        activeCategory === "All" ? true : project.tech.some((tag) => activeGroup?.tags.includes(tag));
      const matchesTag = selectedTag ? project.tech.includes(selectedTag) : true;

      return matchesCategory && matchesTag;
    }),
    sortBy,
  );

  const setCategory = (categoryTitle: string) => {
    setActiveCategory(categoryTitle);
    setSelectedTag(null);
    setShowAllTags(false);
  };

  const toggleTag = (tag: string) => {
    setSelectedTag((current) => (current === tag ? null : tag));
  };

  const visibleFilterTags =
    activeGroup.title === "All" && !showAllTags ? activeGroup.tags.slice(0, 10) : activeGroup.tags;
  const hasHiddenAllTags = activeGroup.title === "All" && activeGroup.tags.length > 10 && !showAllTags;

  return (
    <div className="space-y-8">
      <div className="editorial-card flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0 space-y-4">
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-muted">Filter by stack</p>
            <div className="rounded-[1.5rem] border border-border bg-[color:color-mix(in_srgb,var(--bg),var(--fg)_2%)] p-2 shadow-card">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:flex xl:flex-wrap">
                {categoryGroups.map((category) => {
                  const matchingProjects =
                    category.title === "All"
                      ? projects.length
                      : projects.filter((project) => project.tech.some((tag) => category.tags.includes(tag))).length;
                  const isActive = activeGroup?.title === category.title;

                  return (
                    <button
                      key={category.title}
                      type="button"
                      onClick={() => setCategory(category.title)}
                      aria-pressed={isActive}
                      className={`inline-flex min-w-0 items-center justify-between gap-3 rounded-[1.1rem] border px-4 py-3 text-left transition-[transform,background-color,border-color,box-shadow,color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:translate-y-px ${
                        isActive
                          ? "border-accent bg-accent-soft text-accent shadow-[0_16px_32px_rgba(15,23,42,0.08)]"
                          : "border-transparent bg-elevated text-muted hover:-translate-y-0.5 hover:border-border hover:text-fg hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)]"
                      }`}
                    >
                      <span className="truncate font-medium">{category.title}</span>
                      <span
                        className={`inline-flex min-w-8 items-center justify-center rounded-full px-2 py-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] ${
                          isActive ? "bg-white/75 text-accent" : "bg-accent-soft text-muted"
                        }`}
                      >
                        {matchingProjects}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {activeGroup ? (
              <div className="hidden rounded-[1.6rem] border border-border bg-elevated p-5 shadow-card md:block">
                <div className="flex flex-col gap-2 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
                  <div className="space-y-2">
                    <p className="font-serif text-[1.35rem] leading-[1.1] text-fg">
                      {activeGroup.title === "All" ? "All stacks" : activeGroup.title}
                    </p>
                    {activeGroup.description ? (
                      <p className="text-[0.96rem] leading-[1.7] text-muted">{activeGroup.description}</p>
                    ) : null}
                  </div>
                  <p className="text-[0.92rem] text-muted">{visibleProjects.length} projects shown</p>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  {visibleFilterTags.map((tag) => {
                    const isSelected = selectedTag === tag;
                    const tagProjectCount = projects.filter((project) => {
                      const matchesCategory =
                        activeCategory === "All" ? true : project.tech.some((projectTag) => activeGroup.tags.includes(projectTag));
                      return matchesCategory && project.tech.includes(tag);
                    }).length;

                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        aria-pressed={isSelected}
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[0.75rem] uppercase tracking-[0.12em] shadow-[0_8px_18px_rgba(15,23,42,0.05)] transform-gpu transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:translate-y-px active:scale-[0.97] ${
                          isSelected
                            ? "border-accent bg-accent-soft text-accent hover:-translate-y-0.5 hover:shadow-[0_14px_26px_rgba(15,23,42,0.1)]"
                            : "border-border bg-elevated text-muted hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-[0_14px_26px_rgba(15,23,42,0.1)]"
                        }`}
                      >
                        <span>{tag}</span>
                        <span
                          className={`inline-flex min-w-6 items-center justify-center rounded-full px-1.5 py-0.5 text-[0.68rem] ${
                            isSelected ? "bg-white/75 text-accent" : "bg-accent-soft text-muted"
                          }`}
                        >
                          {tagProjectCount}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {hasHiddenAllTags ? (
                  <div className="flex justify-center pt-5">
                    <button
                      type="button"
                      onClick={() => setShowAllTags(true)}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-[color:color-mix(in_srgb,var(--bg),var(--fg)_2%)] px-5 py-2.5 text-[0.9rem] text-fg transition-[transform,border-color,box-shadow,color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-[0_14px_26px_rgba(15,23,42,0.1)]"
                    >
                      <span>View more</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-5 lg:justify-end">
            <label className="relative inline-flex items-center">
              <span className="sr-only">Sort projects</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortOption)}
                className="appearance-none rounded-button border border-border bg-elevated py-3 pl-4 pr-10 text-[0.95rem] text-fg shadow-[0_8px_22px_rgba(15,23,42,0.06)] transition-[transform,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_14px_28px_rgba(15,23,42,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="alpha">A-Z</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 h-4 w-4 text-muted" />
            </label>
          </div>
        </div>

        {activeCategory !== "All" || selectedTag ? (
          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-1">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">Active filters</p>
            {activeCategory !== "All" ? (
              <button
                type="button"
                onClick={() => setCategory("All")}
                className="inline-flex items-center gap-2 rounded-full border border-accent bg-accent-soft px-3 py-1.5 text-[0.82rem] text-accent transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)]"
              >
                <span>{activeCategory}</span>
                <X className="h-3.5 w-3.5" />
              </button>
            ) : null}
            {selectedTag ? (
              <button
                type="button"
                onClick={() => setSelectedTag(null)}
                className="inline-flex items-center gap-2 rounded-full border border-accent bg-accent-soft px-3 py-1.5 text-[0.82rem] text-accent transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)]"
              >
                <span>{selectedTag}</span>
                <X className="h-3.5 w-3.5" />
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => {
                setCategory("All");
                setSelectedTag(null);
              }}
              className="text-link text-[0.95rem] text-fg"
            >
              Clear filters
            </button>
          </div>
        ) : null}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence initial={false}>
          {visibleProjects.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: prefersReducedMotion ? 0 : -8,
                transition: { duration: prefersReducedMotion ? 0 : 0.12, ease: EXIT_EASE },
              }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: ENTER_EASE }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
