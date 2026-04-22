"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Copy, Mail } from "lucide-react";

import { ENTER_EASE, EXIT_EASE } from "@/lib/motion";

type ContactEmailLinkProps = {
  email: string;
};

export function ContactEmailLink({ email }: ContactEmailLinkProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleClick = () => {
    navigator.clipboard
      .writeText(email)
      .then(() => setCopied(true))
      .catch(() => undefined);
  };

  return (
    <>
      <a
        href={`mailto:${email}`}
        onClick={handleClick}
        className="editorial-card group flex items-center justify-between gap-4 p-6 text-left transition-colors duration-150 ease-out hover:border-accent"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-accent-soft text-accent">
            <Mail className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-muted">Email</p>
            <p className="text-[1.125rem] text-fg">{email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-muted transition-colors duration-150 ease-out group-hover:text-accent">
          <Copy className="h-4 w-4" />
          <ArrowUpRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0" />
        </div>
      </a>

      <AnimatePresence>
        {copied ? (
          <motion.div
            role="status"
            aria-live="polite"
            className="fixed bottom-6 right-6 z-[60] rounded-full border border-border bg-[var(--nav-surface)] px-4 py-2 text-[0.875rem] text-fg shadow-card backdrop-blur-[12px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: ENTER_EASE } }}
            exit={{ opacity: 0, y: 8, transition: { duration: 0.15, ease: EXIT_EASE } }}
          >
            Copied
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
