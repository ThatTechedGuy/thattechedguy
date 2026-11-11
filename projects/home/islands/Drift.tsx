"use client";

import { useEffect } from "react";

import { prefersReducedMotion } from "@/lib/motion/media";

/**
 * The stack page's motion: the Madhubani painting drifts up as the page scrolls (it is drawn twice, so it
 * loops). With reduced motion the painting stays still.
 */
export function Drift() {
  useEffect(() => {
    const strip = document.querySelector<SVGSVGElement>(".mb-band .mb-strip");
    if (!strip || prefersReducedMotion()) return undefined;
    let frame = 0;
    const move = () => {
      frame = 0;
      const half = strip.getBoundingClientRect().height / 2;
      if (!half) return;
      // Fast enough that the whole painting passes by the time the page ends
      const room = document.documentElement.scrollHeight - innerHeight;
      const rate = Math.max(0.3, (half - innerHeight) / Math.max(1, room));
      strip.style.transform = `translate3d(0, ${(-(scrollY * rate) % half).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(move);
    };
    move();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);
  return null;
}
