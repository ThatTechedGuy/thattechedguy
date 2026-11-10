"use client";

import { useEffect } from "react";

/** How long the overlay scrollbar stays bright after the last scroll event. */
const SCROLLING_MS = 1600;

/**
 * The page's one scroll listener. It writes, once per frame:
 *   --sp  page progress 0..1 (progress bar, scrollbar thumb)
 *   --vh, --th  viewport and thumb height in px (overlay scrollbar)
 *   --p   progress 0..1 of each [data-scroll] section through the viewport (stack, giant words)
 * Positions are measured on resize only, so scrolling itself reads no layout.
 */
export function ScrollProgress() {
  useEffect(() => {
    const html = document.documentElement;
    const sections = [...document.querySelectorAll<HTMLElement>("[data-scroll]")].map(
      (element) => ({ element, top: 0, height: 0, p: "" }),
    );
    let viewport = 0;
    let max = 0;
    let frame = 0;
    let scrollingTimer: ReturnType<typeof setTimeout> | undefined;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      html.style.setProperty("--sp", (max > 0 ? Math.min(1, y / max) : 0).toFixed(4));
      for (const section of sections) {
        const progress = (viewport - (section.top - y)) / (viewport + section.height);
        const p = Math.max(0, Math.min(1, progress)).toFixed(4);
        // Off-screen sections sit at 0 or 1; skipping equal values keeps their styles untouched.
        if (p === section.p) continue;
        section.p = p;
        section.element.style.setProperty("--p", p);
      }
    };

    const measure = () => {
      const y = window.scrollY;
      viewport = window.innerHeight;
      max = html.scrollHeight - viewport;
      for (const section of sections) {
        const rect = section.element.getBoundingClientRect();
        section.top = rect.top + y;
        section.height = rect.height;
      }
      const thumb = Math.max(
        40,
        Math.round(viewport ** 2 / Math.max(viewport + 1, max + viewport)),
      );
      html.style.setProperty("--vh", `${viewport}px`);
      html.style.setProperty("--th", `${thumb}px`);
      update();
    };

    const onScroll = () => {
      html.classList.add("is-scrolling");
      clearTimeout(scrollingTimer);
      scrollingTimer = setTimeout(() => html.classList.remove("is-scrolling"), SCROLLING_MS);
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    // The body grows when fonts or the demo settle; the window resize covers height-only changes.
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(document.body);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      clearTimeout(scrollingTimer);
      html.classList.remove("is-scrolling");
    };
  }, []);

  return null;
}
