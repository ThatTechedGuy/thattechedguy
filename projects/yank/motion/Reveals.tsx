"use client";

import { useEffect } from "react";

import { prefersReducedMotion } from "@/lib/motion/media";

/**
 * Scroll reveals for [data-reveal]. The server HTML is fully visible; the "hidden until revealed"
 * state exists only while html.reveal-armed is set here, so crawlers and no-JS visitors see everything.
 */
export function Reveals() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const html = document.documentElement;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("is-in");
          // Hide again only when the element leaves through the bottom, so scrolling up replays it.
          else if (entry.boundingClientRect.top > 0) entry.target.classList.remove("is-in");
        }
        // Armed after the first report: what is already on screen is marked first and never blinks.
        html.classList.add("reveal-armed");
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    for (const element of document.querySelectorAll("[data-reveal]")) observer.observe(element);
    return () => {
      observer.disconnect();
      html.classList.remove("reveal-armed");
    };
  }, []);

  return null;
}
