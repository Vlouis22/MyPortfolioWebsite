"use client";

import type { ReactNode } from "react";

import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";

import { ENTER_EASE } from "@/lib/motion";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange enableSystem>
      <MotionConfig transition={{ duration: 0.25, ease: ENTER_EASE }} reducedMotion="user">
        {children}
      </MotionConfig>
    </ThemeProvider>
  );
}
