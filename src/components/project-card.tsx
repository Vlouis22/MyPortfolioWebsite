import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { TransitionLink } from "@/components/transition-link";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <TransitionLink href={`/projects/${project.slug}`} className="group block h-full">
      <article className="editorial-card flex h-full flex-col overflow-hidden">
        <div className="overflow-hidden border-b border-border bg-[color:color-mix(in_srgb,var(--bg),var(--accent-soft)_22%)] p-4">
          <Image
            src={project.thumbnail}
            alt={`${project.title} project thumbnail`}
            width={1200}
            height={900}
            className="aspect-[16/10] w-full object-contain object-center transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015] motion-reduce:group-hover:scale-100 motion-reduce:group-hover:opacity-90"
            sizes="(min-width: 1024px) 38rem, calc(100vw - 3rem)"
          />
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-muted">{project.year}</p>
              <h2 className="font-serif text-[1.75rem] leading-[1.08] tracking-[-0.02em] text-fg">{project.title}</h2>
            </div>
            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:text-accent motion-reduce:group-hover:translate-x-0" />
          </div>

          <p className="text-[1rem] leading-[1.7] text-muted">{project.summary}</p>

          <div className="mt-auto flex flex-wrap gap-2">
            {project.tech.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </TransitionLink>
  );
}
