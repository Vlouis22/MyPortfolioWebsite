import { Download } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "More about Valery Louis, a computer science senior at Delaware State University with experience across backend, mobile, AI, and full stack development.",
};

export default function AboutPage() {
  return (
    <div className="page-shell page-frame space-y-16">
      <section className="grid gap-12 lg:grid-cols-[minmax(0,72ch)_320px] lg:items-start">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="section-eyebrow">About</p>
            <h1 className="page-title">About Me</h1>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.85] text-muted">
            <p>
              I&apos;m a senior at Delaware State University studying Computer Science, graduating in May 2026. What
              draws me to software engineering is the process: taking a hard problem, breaking it down, and building
              something clear, reliable, and genuinely useful.
            </p>
            <p>
              My experience spans backend, mobile, AI, and full stack development, with two software engineering
              internships at Microsoft. On the Microsoft Authenticator team, I shipped a push notification system
              serving over 1.2 million users, integrating Azure Notification Hub and the Baidu SDK for global device
              and token management. The following summer, I built a C#/.NET automation tool that migrated more than
              96 million users to a unified authentication policy, with audit logging and rollback safeguards to keep
              the process safe at scale. I&apos;m currently an AI Solutions Software Engineer Intern at Pratico
              Consulting, building features for AI powered mobile applications.
            </p>
            <p>
              I also tutor Computer Science and Mathematics at Delaware State, which keeps my fundamentals sharp and
              reinforces something I believe strongly: clear communication matters as much as clean implementation.
            </p>
          </div>

          <section className="space-y-8 pt-6">
            <div className="space-y-3">
              <p className="section-eyebrow">Stack & tools</p>
              <h2 className="section-title">The tools I use most often.</h2>
            </div>

            <div className="space-y-8">
              {Object.entries(siteConfig.stackCategories).map(([category, items]) => (
                <div key={category} className="space-y-3">
                  <h3 className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-muted">{category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border px-4 py-2 text-[0.95rem] text-fg shadow-card"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-28">
          <div className="editorial-card space-y-5 p-5">
            <div className="overflow-hidden rounded-image border border-border bg-accent-soft">
              <Image
                src="/favicon.png"
                alt="Portrait of Valery Louis"
                width={256}
                height={256}
                className="aspect-[4/5] w-full object-cover"
                priority
              />
            </div>

            <div className="space-y-3">
              <div>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-muted">Current role</p>
                <p className="mt-1 text-[1.1rem] text-fg">{siteConfig.role}</p>
              </div>
              <div>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-muted">School</p>
                <p className="mt-1 text-[1.1rem] text-fg">
                  {siteConfig.education.school}
                  <br />
                  {siteConfig.education.degree}, {siteConfig.education.dates}
                </p>
              </div>
              <div>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-muted">Location</p>
                <p className="mt-1 text-[1.1rem] text-fg">{siteConfig.location}</p>
              </div>
            </div>

            <a href={siteConfig.resumePath} className="button-secondary w-full justify-between" download>
              Download resume
              <Download className="h-4 w-4" />
            </a>
          </div>
        </aside>
      </section>
    </div>
  );
}
