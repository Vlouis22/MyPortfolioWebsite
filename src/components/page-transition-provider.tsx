"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

import { ENTER_EASE, EXIT_EASE, PAGE_ENTER_DURATION, PAGE_EXIT_DURATION } from "@/lib/motion";

type PageTransitionContextValue = {
  navigate: (href: string) => void;
  pathname: string;
  phase: "idle" | "exiting" | "navigating";
  prefersReducedMotion: boolean;
};

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

type PageTransitionProviderProps = {
  children: ReactNode;
};

export function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const prefersReducedMotion = Boolean(useReducedMotion());
  const pendingPath = useRef<string | null>(null);
  const phaseTimer = useRef<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "exiting" | "navigating">("idle");

  useEffect(() => {
    return () => {
      if (phaseTimer.current) {
        window.clearTimeout(phaseTimer.current);
      }
    };
  }, []);

  useLayoutEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: "auto" });

    if (!pendingPath.current || prefersReducedMotion) {
      setPhase("idle");
      return;
    }

    if (pathname === pendingPath.current) {
      pendingPath.current = null;
      setPhase("navigating");

      if (phaseTimer.current) {
        window.clearTimeout(phaseTimer.current);
      }

      phaseTimer.current = window.setTimeout(() => {
        setPhase("idle");
      }, PAGE_ENTER_DURATION * 1000);

      return;
    }

    setPhase("idle");
  }, [pathname, prefersReducedMotion]);

  const navigate = (href: string) => {
    if (!href || href === pathname || phase === "exiting") {
      return;
    }

    if (phaseTimer.current) {
      window.clearTimeout(phaseTimer.current);
    }

    pendingPath.current = href;
    window.scrollTo({ left: 0, top: 0, behavior: "auto" });

    if (prefersReducedMotion) {
      router.push(href, { scroll: false });
      return;
    }

    setPhase("exiting");
    router.push(href, { scroll: false });
  };

  return (
    <PageTransitionContext.Provider value={{ navigate, pathname, phase, prefersReducedMotion }}>
      {children}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext);

  if (!context) {
    throw new Error("usePageTransition must be used within PageTransitionProvider");
  }

  return context;
}

type PageTransitionContentProps = {
  children: ReactNode;
};

export function PageTransitionContent({ children }: PageTransitionContentProps) {
  const { pathname, phase, prefersReducedMotion } = usePageTransition();

  return (
    <div className="relative flex-1 overflow-hidden">
      <motion.main
        className="relative z-10 flex-1"
        initial={false}
        animate={
          phase === "exiting" && !prefersReducedMotion
            ? {
                opacity: 0,
                y: 0,
                transition: { duration: PAGE_EXIT_DURATION, ease: EXIT_EASE },
              }
            : {
                opacity: 1,
                y: 0,
                transition: { duration: prefersReducedMotion ? 0 : PAGE_ENTER_DURATION, ease: ENTER_EASE },
              }
        }
      >
        <motion.div
          key={pathname}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : PAGE_ENTER_DURATION, ease: ENTER_EASE } }}
        >
          {children}
        </motion.div>
      </motion.main>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-bg"
        initial={false}
        animate={{
          opacity: phase === "idle" || prefersReducedMotion ? 0 : phase === "exiting" ? 0.96 : 0,
          transition: {
            duration: phase === "exiting" ? PAGE_EXIT_DURATION : PAGE_ENTER_DURATION,
            ease: phase === "exiting" ? EXIT_EASE : ENTER_EASE,
          },
        }}
      />
    </div>
  );
}
