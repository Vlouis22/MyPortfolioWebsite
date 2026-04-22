import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { TransitionLink } from "@/components/transition-link";
import type { Project } from "@/lib/projects";

type FeaturedProjectCardProps = {
  project: Project;
};

export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  return (
    <TransitionLink href={`/projects/${project.slug}`} className="group block">
      <article className="editorial-card overflow-hidden">
        <div className="grid gap-0 md:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-between gap-6 p-6 md:p-8">
            <div className="space-y-4">
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-muted">
                {`${project.year} / ${project.role}`}
              </p>
              <div className="space-y-3">
                <h3 className="font-serif text-[2rem] leading-[1.05] tracking-[-0.02em] text-fg md:text-[2.5rem]">
                  {project.title}
                </h3>
                <p className="max-w-[42ch] text-[1rem] leading-[1.7] text-muted md:text-[1.125rem]">{project.summary}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="inline-flex items-center gap-2 text-[0.95rem] text-fg">
                <span>View Project</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-1 group-hover:text-accent motion-reduce:group-hover:translate-x-0" />
              </div>
            </div>
          </div>

          <div className="overflow-hidden border-t border-border bg-[color:color-mix(in_srgb,var(--bg),var(--accent-soft)_22%)] p-4 md:border-l md:border-t-0 md:p-6">
            <Image
              src={project.thumbnail}
              alt={`${project.title} project thumbnail`}
              width={1440}
              height={1080}
              className="aspect-[16/10] h-full w-full object-contain object-center transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015] motion-reduce:group-hover:scale-100 motion-reduce:group-hover:opacity-90"
              sizes="(min-width: 768px) 40rem, calc(100vw - 3rem)"
            />
          </div>
        </div>
      </article>
    </TransitionLink>
  );
}
