import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { FeaturedProjectCard } from "@/components/featured-project-card";
import { TransitionLink } from "@/components/transition-link";
import { getFeaturedProjects } from "@/lib/projects";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border bg-bg text-fg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(26,26,26,0.04),transparent_34%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(242,240,234,0.04),transparent_34%)]" />

        <div className="relative mx-auto w-full max-w-[1600px] lg:grid lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
          <div className="relative min-h-[42svh] overflow-hidden border-b border-border sm:min-h-[48svh] lg:order-2 lg:min-h-[calc(100svh-4.5rem)] lg:border-b-0 lg:border-l">
            <Image
              src="/assets/headshot_blackshirt.png"
              alt="Portrait of Valery Louis"
              fill
              priority
              unoptimized
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover object-[center_top]"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, color-mix(in srgb, var(--bg) 18%, transparent) 0%, color-mix(in srgb, var(--bg) 4%, transparent) 26%, color-mix(in srgb, var(--bg) 10%, transparent) 100%), linear-gradient(90deg, color-mix(in srgb, var(--bg) 74%, transparent) 0%, color-mix(in srgb, var(--bg) 18%, transparent) 22%, transparent 46%)",
              }}
            />
          </div>

          <div className="relative z-10 flex items-center px-6 py-14 md:px-12 md:py-18 lg:order-1 lg:min-h-[calc(100svh-4.5rem)] lg:py-24">
            <div className="max-w-[38rem] space-y-8 rounded-[2rem] border border-border bg-[color:color-mix(in_srgb,var(--bg)_94%,transparent)] p-6 shadow-card sm:p-8 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="space-y-5">
                <p className="section-eyebrow">Welcome</p>

                <h1 className="max-w-[10ch] font-serif text-[clamp(3.35rem,7vw,6.4rem)] leading-[0.9] tracking-[-0.055em] text-fg">
                  Hi, I&apos;m <span className="text-fg">Valery Louis.</span>
                </h1>

                <p className="max-w-[31ch] text-[1.05rem] leading-[1.8] text-muted md:text-[1.15rem]">
                  Welcome to my portfolio. I&apos;m passionate about solving complex problems through clean, efficient,
                  and scalable code.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="editorial-card space-y-2 p-4">
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">Education</p>
                  <p className="text-[0.98rem] leading-[1.5] text-fg">CS @ Delaware State University</p>
                </div>

                <div className="editorial-card space-y-2 p-4">
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">Experience</p>
                  <p className="text-[0.98rem] leading-[1.5] text-fg">4x SWE Intern</p>
                </div>

                <div className="editorial-card space-y-2 p-4">
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">Wins</p>
                  <p className="text-[0.98rem] leading-[1.5] text-fg">3x Hackathon Winner</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <TransitionLink href="/experience" className="button-primary">
                  View Experience
                  <ArrowRight className="h-4 w-4" />
                </TransitionLink>
                <TransitionLink href="/contact" className="button-secondary">
                  Get in touch
                </TransitionLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-shell space-y-24 pb-24 pt-20 md:space-y-32 md:pb-32 md:pt-28">
        <section className="space-y-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="section-eyebrow">01 / Selected work</p>
              <h2 className="section-title">Recent work that shows how I solve problems and build with care.</h2>
            </div>
            <TransitionLink
              href="/projects"
              className="text-link inline-flex items-center gap-2 text-[0.95rem] text-fg"
            >
              See all projects
              <ArrowRight className="h-4 w-4" />
            </TransitionLink>
          </div>

          <div className="space-y-6">
            {featuredProjects.map((project) => (
              <FeaturedProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section className="grid gap-8 border-t border-border pt-12 md:grid-cols-[minmax(0,72ch)_1fr] md:pt-16">
          <div className="space-y-4">
            <p className="section-eyebrow">02 / About</p>
            <p className="lead max-w-prose">
              I&apos;m a senior at Delaware State University studying Computer Science, graduating in May 2026. What
              draws me to software engineering is the process: taking a hard problem, breaking it down, and building
              something clear, reliable, and genuinely useful.
            </p>
            <p className="text-[1rem] leading-[1.8] text-muted">
              My experience spans backend, mobile, AI, and full stack development, with two software engineering
              internships at Microsoft and current AI product work at Pratico Consulting.
            </p>
          </div>
          <div className="flex items-start md:justify-end">
            <TransitionLink href="/about" className="text-link inline-flex items-center gap-2 text-[0.95rem] text-fg">
              Read the full story
              <ArrowRight className="h-4 w-4" />
            </TransitionLink>
          </div>
        </section>
      </div>
    </>
  );
}
