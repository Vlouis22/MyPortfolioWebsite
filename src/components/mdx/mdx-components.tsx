import type { ComponentPropsWithoutRef } from "react";

import { Callout } from "@/components/callout";
import { MdxImage } from "@/components/mdx/mdx-image";
import { TransitionLink } from "@/components/transition-link";

type AnchorProps = ComponentPropsWithoutRef<"a">;

function MdxAnchor({ href = "", children, ...props }: AnchorProps) {
  if (href.startsWith("/")) {
    return (
      <TransitionLink href={href} className="text-link text-fg" {...props}>
        {children}
      </TransitionLink>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className="text-link text-fg" {...props}>
      {children}
    </a>
  );
}

export const mdxComponents = {
  Callout,
  MdxImage,
  a: MdxAnchor,
  img: MdxImage,
};
