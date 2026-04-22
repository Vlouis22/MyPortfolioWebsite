import type { Metadata } from "next";

import { ProjectFilterGrid } from "@/components/project-filter-grid";
import { getAllProjects, getAllTechTags } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects by Valery Louis across web development, AI, and systems work.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const techTags = getAllTechTags();

  return (
    <div className="page-shell page-frame space-y-10 md:space-y-12">
      <section className="max-w-prose space-y-4">
        <p className="section-eyebrow">Projects</p>
        <h1 className="page-title">Projects that reflect how I learn, lead, and build.</h1>
        <p className="lead">
          These projects span web, mobile, AI, and systems work. Some came from hackathons, some from school, and some
          from independent product work, but all of them reflect the way I like to solve problems.
        </p>
      </section>

      <ProjectFilterGrid projects={projects} techTags={techTags} />
    </div>
  );
}
