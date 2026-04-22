import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Code2, ExternalLink } from "lucide-react";
import { redirect } from "next/navigation";

import { TransitionLink } from "@/components/transition-link";
import { getAdjacentProjects, getAllProjects, getProjectBySlug, renderProjectBody } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProjects().map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    redirect("/projects");
  }

  const mdxContent = await renderProjectBody(project.body);
  const { next, previous } = getAdjacentProjects(project.slug);

  return (
    <div className="page-shell page-frame space-y-14 md:space-y-16">
      <section className="space-y-8">
        <div className="space-y-4">
          <p className="section-eyebrow">{`${project.year} / ${project.role}`}</p>
          <h1 className="page-title max-w-[12ch]">{project.title}</h1>
          <p className="lead max-w-prose">{project.summary}</p>
        </div>

        <div className="editorial-card grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-5">
          <div>
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-muted">Client</p>
            <p className="mt-2 text-[1rem] text-fg">{project.client ?? "Independent"}</p>
          </div>
          <div>
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-muted">Timeline</p>
            <p className="mt-2 text-[1rem] text-fg">{project.timeline ?? String(project.year)}</p>
          </div>
          <div className="xl:col-span-2">
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-muted">Stack</p>
            <p className="mt-2 text-[1rem] text-fg">{project.tech.join(", ")}</p>
          </div>
          <div className="flex flex-col gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-link inline-flex items-center gap-2 text-[0.95rem] text-fg"
              >
                Live link
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-link inline-flex items-center gap-2 text-[0.95rem] text-fg"
              >
                Repo link
                <Code2 className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <article className="prose-editorial">{mdxContent}</article>

      <nav className="grid gap-4 border-t border-border pt-10 md:grid-cols-2">
        {previous ? (
          <TransitionLink href={`/projects/${previous.slug}`} className="editorial-card group p-5">
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-muted">Previous project</p>
            <div className="mt-4 flex items-center justify-between gap-4">
              <h2 className="font-serif text-[1.5rem] tracking-[-0.02em] text-fg">{previous.title}</h2>
              <ArrowLeft className="h-4 w-4 text-muted transition-colors duration-150 ease-out group-hover:text-accent" />
            </div>
          </TransitionLink>
        ) : (
          <div />
        )}

        {next ? (
          <TransitionLink href={`/projects/${next.slug}`} className="editorial-card group p-5 md:text-right">
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-muted">Next project</p>
            <div className="mt-4 flex items-center justify-between gap-4 md:flex-row-reverse">
              <h2 className="font-serif text-[1.5rem] tracking-[-0.02em] text-fg">{next.title}</h2>
              <ArrowRight className="h-4 w-4 text-muted transition-colors duration-150 ease-out group-hover:text-accent" />
            </div>
          </TransitionLink>
        ) : null}
      </nav>
    </div>
  );
}
