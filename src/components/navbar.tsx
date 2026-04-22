"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { ThemeToggle } from "@/components/theme-toggle";
import { TransitionLink } from "@/components/transition-link";
import { ENTER_EASE, EXIT_EASE } from "@/lib/motion";
import { siteConfig } from "@/lib/site";

function isRouteActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    const prefetchRoutes = () => {
      siteConfig.navigation.forEach((item) => router.prefetch(item.href));
    };

    const idleWindow = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
        cancelIdleCallback?: (handle: number) => void;
      };

    if (idleWindow.requestIdleCallback) {
      const idleId = idleWindow.requestIdleCallback(prefetchRoutes, { timeout: 1200 });
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timer = window.setTimeout(prefetchRoutes, 200);
    return () => window.clearTimeout(timer);
  }, [router]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-150 ease-out ${
          isScrolled ? "border-border bg-[var(--nav-surface)]" : "border-transparent bg-[var(--nav-surface-soft)]"
        } backdrop-blur-[12px]`}
      >
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 py-4 md:px-12">
          <TransitionLink
            href="/"
            className="inline-flex items-center gap-3 font-serif text-[1.25rem] font-semibold tracking-[-0.02em] text-fg"
          >
            <span className="overflow-hidden rounded-full border border-border bg-elevated shadow-card">
              <Image
                src="/favicon.png"
                alt="Valery Louis portrait"
                width={40}
                height={40}
                className="h-10 w-10 object-cover"
                priority
              />
            </span>
            {siteConfig.name}
          </TransitionLink>

          <div className="hidden items-center gap-2 md:flex">
            <ul className="flex items-center gap-1">
              {siteConfig.navigation.map((item) => {
                const active = isRouteActive(pathname, item.href);

                return (
                  <li key={item.href} className="relative">
                    <TransitionLink
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative inline-flex h-10 items-center px-3 text-[0.95rem] transition-colors duration-150 ease-out ${
                        active ? "text-fg" : "text-muted hover:text-fg"
                      }`}
                    >
                      {item.label}
                      {active ? (
                        <motion.span
                          layoutId="nav-active-indicator"
                          className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-accent"
                          transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.45 }}
                        />
                      ) : null}
                    </TransitionLink>
                  </li>
                );
              })}
            </ul>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-elevated text-fg shadow-[0_8px_22px_rgba(15,23,42,0.06)] transition-[transform,color,border-color,box-shadow,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-[0_14px_28px_rgba(15,23,42,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:translate-y-px active:scale-[0.97]"
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-navigation"
            className="fixed inset-0 z-40 bg-[var(--nav-overlay)] px-6 pb-10 pt-28 backdrop-blur-[12px] md:hidden"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: prefersReducedMotion ? 0 : 0.15, ease: EXIT_EASE } }}
          >
            <nav className="mx-auto flex h-full max-w-layout flex-col justify-between">
              <ul className="space-y-3">
                {siteConfig.navigation.map((item, index) => {
                  const active = isRouteActive(pathname, item.href);

                  return (
                    <motion.li
                      key={item.href}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: prefersReducedMotion ? 0 : index * 0.04,
                          duration: prefersReducedMotion ? 0 : 0.2,
                          ease: ENTER_EASE,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        y: prefersReducedMotion ? 0 : 8,
                        transition: { duration: prefersReducedMotion ? 0 : 0.12, ease: EXIT_EASE },
                      }}
                    >
                      <TransitionLink
                        href={item.href}
                        beforeNavigate={() => setMenuOpen(false)}
                        delayMs={prefersReducedMotion ? 0 : 80}
                        className={`inline-flex text-[2.25rem] font-serif leading-[1.05] tracking-[-0.02em] ${
                          active ? "text-accent" : "text-fg"
                        }`}
                      >
                        {item.label}
                      </TransitionLink>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="space-y-3 border-t border-border pt-6">
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-muted">Reach out</p>
                <a href={`mailto:${siteConfig.email}`} className="text-link text-[0.95rem] text-fg">
                  {siteConfig.email}
                </a>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
