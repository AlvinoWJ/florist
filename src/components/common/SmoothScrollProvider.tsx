"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";

const NAVBAR_OFFSET = 40;

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const lenisInstance = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    setLenis(lenisInstance);

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    function handleAnchorClick(event: MouseEvent) {
      const target = (event.target as HTMLElement).closest("a[href^='#']");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || href === "#") return;

      const section = document.querySelector(href);
      if (!section) return;

      event.preventDefault();
      lenisInstance.scrollTo(section as HTMLElement, {
        offset: -NAVBAR_OFFSET,
      });
    }

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
