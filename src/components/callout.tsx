import type { ReactNode } from "react";

import { MessageSquareQuote } from "lucide-react";

type CalloutProps = {
  title?: string;
  children: ReactNode;
};

export function Callout({ title = "Note", children }: CalloutProps) {
  return (
    <aside className="my-8 flex gap-4 rounded-card border border-border bg-accent-soft/60 px-5 py-5 text-fg shadow-card">
      <MessageSquareQuote className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
      <div className="space-y-2">
        <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-accent">{title}</p>
        <div className="text-[1rem] leading-[1.7] text-fg">{children}</div>
      </div>
    </aside>
  );
}
