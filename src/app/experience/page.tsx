import type { Metadata } from "next";
import { Download } from "lucide-react";
import Image from "next/image";

import { getAllExperienceEntries } from "@/lib/experience";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Experience",
  description: "Experience and resume details for Valery Louis, including internships at Microsoft and Pratico Consulting.",
};

export default function ExperiencePage() {
  const experienceEntries = getAllExperienceEntries();

  return (
    <div className="page-shell page-frame space-y-12 md:space-y-16">
      <section className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-prose space-y-4">
          <p className="section-eyebrow">Experience</p>
          <h1 className="page-title">Work that helped me grow across backend, mobile, AI, and mentorship.</h1>
          <p className="lead">
            My experience includes large scale systems, mobile features, testing, tutoring, and team leadership. I care
            about writing reliable code and making complex problems easier to work through.
          </p>
        </div>

        <a href={siteConfig.resumePath} className="button-primary shrink-0" download>
          Download resume (PDF)
          <Download className="h-4 w-4" />
        </a>
      </section>

      <section className="relative">
        <div className="absolute bottom-0 left-4 top-0 hidden w-px bg-border md:block" />
        <div className="space-y-10">
          {experienceEntries.map((entry) => (
            <article key={`${entry.company}-${entry.role}-${entry.startDate}`} className="relative md:pl-14">
              <div className="absolute left-[11px] top-7 hidden h-2.5 w-2.5 rounded-full bg-accent md:block" />
              <div className="editorial-card space-y-6 p-6">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-4">
                    {entry.logo ? (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-card">
                        <Image
                          src={entry.logo}
                          alt={entry.logoAlt ?? `${entry.company} logo`}
                          width={44}
                          height={44}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    ) : null}

                    <div className="space-y-3">
                      <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-muted">
                        {entry.startDate} - {entry.endDate}
                      </p>
                      <div className="space-y-1">
                        <h2 className="font-serif text-[2rem] leading-[1.05] tracking-[-0.02em] text-fg">
                          {entry.company}
                        </h2>
                        <p className="text-[1.1rem] text-fg">{entry.role}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-[0.95rem] text-muted">{entry.location}</p>
                </div>

                {entry.summary ? <p className="max-w-prose text-[1rem] leading-[1.75] text-muted">{entry.summary}</p> : null}

                <ul className="space-y-3 pl-5 text-[1rem] leading-[1.75] text-muted marker:text-accent">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {entry.tech.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border px-3 py-1 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border pt-10">
        <div className="max-w-prose space-y-5">
          <p className="section-eyebrow">Education</p>
          <div className="editorial-card space-y-3 p-6">
            <h2 className="font-serif text-[1.75rem] leading-[1.08] tracking-[-0.02em] text-fg">
              {siteConfig.education.school}
            </h2>
            <p className="text-[1rem] text-fg">
              {siteConfig.education.degree} / {siteConfig.education.dates}
            </p>
            <p className="text-[1rem] text-fg">GPA {siteConfig.education.gpa}</p>
            <p className="text-[1rem] leading-[1.75] text-muted">{siteConfig.education.notes}</p>
            <p className="text-[1rem] leading-[1.75] text-muted">
              Relevant coursework: {siteConfig.education.coursework.join(", ")}.
            </p>
            <p className="text-[1rem] leading-[1.75] text-muted">
              Highlights: {siteConfig.education.highlights.join(", ")}.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
