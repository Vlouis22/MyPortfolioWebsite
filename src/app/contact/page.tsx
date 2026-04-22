import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { ContactEmailLink } from "@/components/contact-email-link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Valery Louis about software engineering roles, projects, and collaboration.",
};

export default function ContactPage() {
  return (
    <div className="page-shell page-frame space-y-12">
      <section className="max-w-prose space-y-4">
        <p className="section-eyebrow">Contact</p>
        <h1 className="page-title max-w-[13ch]">Good work usually starts with a simple message.</h1>
        <p className="lead">
          Feel free to reach out about new graduate software engineering roles, internships, projects, or collaboration.
          I am always happy to connect with people who care about building useful technology.
        </p>
      </section>

      <div className="max-w-[48rem] space-y-8">
        <ContactEmailLink email={siteConfig.email} />

        <div className="space-y-4">
          <p className="section-eyebrow">Elsewhere</p>
          <div className="flex flex-wrap gap-4">
            {siteConfig.socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="button-secondary justify-between"
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
