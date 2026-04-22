"use client";

import { useRef, type ComponentPropsWithoutRef, type FocusEvent, type MouseEvent, type TouchEvent } from "react";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";

import { usePageTransition } from "@/components/page-transition-provider";

type TransitionLinkProps = LinkProps &
  Omit<ComponentPropsWithoutRef<"a">, "href"> & {
    href: string;
    beforeNavigate?: () => void;
    delayMs?: number;
  };

function isModifiedEvent(event: MouseEvent<HTMLAnchorElement>) {
  return Boolean(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey || event.button !== 0);
}

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("tel:");
}

export function TransitionLink({
  href,
  onClick,
  onMouseEnter,
  onFocus,
  onTouchStart,
  beforeNavigate,
  delayMs = 0,
  target,
  download,
  scroll = false,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();
  const { navigate } = usePageTransition();
  const hasPrefetched = useRef(false);

  const prefetch = () => {
    if (hasPrefetched.current || isExternalHref(href)) {
      return;
    }

    hasPrefetched.current = true;
    router.prefetch(href);
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      target === "_blank" ||
      download ||
      isModifiedEvent(event) ||
      isExternalHref(href)
    ) {
      return;
    }

    event.preventDefault();
    prefetch();
    beforeNavigate?.();

    if (delayMs > 0) {
      window.setTimeout(() => navigate(href), delayMs);
      return;
    }

    navigate(href);
  };

  const handleMouseEnter = (event: MouseEvent<HTMLAnchorElement>) => {
    onMouseEnter?.(event);
    prefetch();
  };

  const handleFocus = (event: FocusEvent<HTMLAnchorElement>) => {
    onFocus?.(event);
    prefetch();
  };

  const handleTouchStart = (event: TouchEvent<HTMLAnchorElement>) => {
    onTouchStart?.(event);
    prefetch();
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onFocus={handleFocus}
      onTouchStart={handleTouchStart}
      scroll={scroll}
      target={target}
      download={download}
      {...props}
    />
  );
}
