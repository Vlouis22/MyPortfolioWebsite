"use client";

import { startTransition, useEffect, useEffectEvent, useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { ENTER_EASE, EXIT_EASE } from "@/lib/motion";
import { TransitionLink } from "@/components/transition-link";

export type HeroSlide = {
  description: string;
  eyebrow: string;
  imageAlt: string;
  imagePosition?: string;
  imageSrc: string;
  title: string;
};

const AUTOPLAY_DELAY_MS = 5200;

export function HeroSlideshow({ slides }: { slides: HeroSlide[] }) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const advanceSlide = useEffectEvent(() => {
    startTransition(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    });
  });

  useEffect(() => {
    if (slides.length < 2 || prefersReducedMotion) {
      return;
    }

    const intervalId = window.setInterval(() => {
      advanceSlide();
    }, AUTOPLAY_DELAY_MS);

    return () => window.clearInterval(intervalId);
  }, [prefersReducedMotion, slides.length]);

  if (slides.length === 0) {
    return null;
  }

  const activeSlide = slides[activeIndex];

  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#090909] text-white">
      <div className="absolute inset-0">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={slide.title}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 1.06,
              }}
              transition={{
                opacity: {
                  duration: prefersReducedMotion ? 0 : 1,
                  ease: ENTER_EASE,
                },
                scale: {
                  duration: prefersReducedMotion ? 0 : 6,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
            >
              <Image
                src={slide.imageSrc}
                alt={slide.imageAlt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
                style={slide.imagePosition ? { objectPosition: slide.imagePosition } : undefined}
              />
            </motion.div>
          );
        })}

        <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(7,7,7,0.5)_0%,rgba(7,7,7,0.22)_38%,rgba(7,7,7,0.08)_72%,rgba(7,7,7,0.16)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_30%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(194,65,12,0.22),transparent_32%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,7,7,0.58)_0%,rgba(7,7,7,0.16)_34%,rgba(7,7,7,0.08)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-4.5rem)] w-full max-w-[1600px] items-end px-6 pb-10 pt-14 md:px-12 md:pb-14 md:pt-20">
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.title}
              className="space-y-6"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: prefersReducedMotion ? 0 : 16,
                transition: {
                  duration: prefersReducedMotion ? 0 : 0.2,
                  ease: EXIT_EASE,
                },
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.45,
                ease: ENTER_EASE,
              }}
            >
              <p className="inline-flex rounded-full border border-white/20 bg-black/15 px-4 py-2 font-mono text-[0.76rem] uppercase tracking-[0.2em] text-white/82 backdrop-blur-sm">
                {activeSlide.eyebrow}
              </p>
              <div className="space-y-4">
                <h1 className="max-w-[10ch] font-serif text-[clamp(3.2rem,8vw,6.9rem)] leading-[0.9] tracking-[-0.05em] text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.38)]">
                  {activeSlide.title}
                </h1>
                <p className="max-w-[34ch] text-[1rem] leading-[1.75] text-white/88 drop-shadow-[0_4px_18px_rgba(0,0,0,0.3)] md:text-[1.08rem]">
                  {activeSlide.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <TransitionLink
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[0.95rem] font-medium text-neutral-950 shadow-[0_10px_35px_rgba(0,0,0,0.18)] transition duration-200 ease-out hover:bg-white/92"
                >
                  View projects
                  <ArrowRight className="h-4 w-4" />
                </TransitionLink>
                <TransitionLink
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/24 bg-black/16 px-5 py-3 text-[0.95rem] font-medium text-white backdrop-blur-sm transition duration-200 ease-out hover:border-white/38 hover:bg-black/24"
                >
                  Get in touch
                </TransitionLink>
              </div>

              <div className="flex max-w-xl flex-col gap-4 pt-2 md:flex-row md:items-center md:gap-5">
                <p className="font-mono text-[0.78rem] uppercase tracking-[0.2em] text-white/62">
                  {`${String(activeIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`}
                </p>
                <div className="flex w-full items-center gap-3">
                  {slides.map((slide, index) => {
                    const isActive = index === activeIndex;

                    return (
                      <button
                        key={slide.title}
                        type="button"
                        onClick={() => {
                          startTransition(() => setActiveIndex(index));
                        }}
                        className="group relative h-2 flex-1 overflow-hidden rounded-full bg-white/22 transition hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                        aria-label={`Show slide ${index + 1}: ${slide.title}`}
                        aria-pressed={isActive}
                      >
                        <span
                          className={`absolute inset-0 rounded-full bg-white transition-transform duration-500 ease-out ${
                            isActive ? "origin-left scale-x-100" : "origin-left scale-x-0"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
