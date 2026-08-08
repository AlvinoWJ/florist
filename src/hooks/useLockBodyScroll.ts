"use client";

import { useEffect } from "react";
import { useLenis } from "@/components/common/SmoothScrollProvider";

/**
 * Mengunci scroll pada body & menghentikan Lenis selama modal/dialog aktif,
 * supaya scroll di dalam modal tidak "bocor" ke halaman di belakangnya (backdrop).
 * Pola ini diambil dari AdminShell.tsx (sidebar mobile) dan dipusatkan di sini
 * agar bisa dipakai ulang oleh semua modal.
 */
export function useLockBodyScroll(active: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!active) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    return () => {
      document.body.style.overflow = originalOverflow;
      lenis?.start();
    };
  }, [active, lenis]);
}
