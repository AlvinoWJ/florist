"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const NAVBAR_OFFSET = 40;

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
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
      lenis.scrollTo(section as HTMLElement, {
        offset: -NAVBAR_OFFSET,
      });
    }

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
