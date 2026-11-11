"use client";

import { useEffect } from "react";

import { prefersReducedMotion } from "@/lib/motion/media";

/**
 * The stack page's motion: the Madhubani painting drifts up as the page scrolls (it is drawn twice, so it
 * loops), and the "Rather not" column is struck through once it scrolls into view.
 * With reduced motion the painting stays still and the strikes are drawn at once.
 */
export function Drift() {
  useEffect(() => {
    const still = prefersReducedMotion();
    const ledgers = [...document.querySelectorAll<HTMLElement>(".ledger")];
    const observer = still
      ? null
      : new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              entry.target.classList.add("on");
              observer?.unobserve(entry.target);
            }
          },
          { rootMargin: "0px 0px -25% 0px" },
        );
    for (const ledger of ledgers) {
      if (observer) observer.observe(ledger);
      else ledger.classList.add("on");
    }

    const strips = [...document.querySelectorAll<SVGSVGElement>(".mb-band .mb-strip")];
    let frame = 0;
    const move = () => {
      frame = 0;
      strips.forEach((strip, k) => {
        const half = strip.getBoundingClientRect().height / 2;
        if (!half) return;
        // Fast enough that the whole painting passes by the time the page ends
        const room = document.documentElement.scrollHeight - innerHeight;
        const rate = room > 0 ? Math.max(0.3, (half - innerHeight) / room) : 0.45;
        const y = (scrollY * rate) % half;
        strip.style.transform = `translate3d(0, ${(k % 2 ? y - half : -y).toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(move);
    };
    if (!still && strips.length) {
      move();
      addEventListener("scroll", onScroll, { passive: true });
      addEventListener("resize", onScroll);
    }
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);
  return null;
}
