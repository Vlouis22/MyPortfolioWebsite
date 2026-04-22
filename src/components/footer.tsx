import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-layout flex-wrap items-center gap-4 px-6 py-6 text-[0.875rem] text-muted md:px-12">
        <div className="flex flex-wrap items-center gap-4">
          <span>{`© ${year} ${siteConfig.name}`}</span>
          <a href={`mailto:${siteConfig.email}`} className="text-link">
            {siteConfig.email}
          </a>
          {siteConfig.socialLinks.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="text-link">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
