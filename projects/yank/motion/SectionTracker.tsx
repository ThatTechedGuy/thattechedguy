"use client";

import { useEffect } from "react";

const colourOf = (value: string | undefined): string =>
  value === "accent" ? "var(--accent)" : (value ?? "");

/**
 * Colours the page by the section under the middle of the screen and names the current chapter on <html>.
 * An observer whose root is squeezed to the screen's centre line replaces the source's per-scroll
 * getBoundingClientRect loop, so it works the same in both scroll directions without layout reads.
 */
export function SectionTracker() {
  useEffect(() => {
    const html = document.documentElement;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) continue;
          const { bg, bgDark, fg, fgDark } = entry.target.dataset;
          // Both themes' colours are set together; base.css picks one, so a theme flip needs no script.
          html.style.setProperty("--section-bg", colourOf(bg));
          html.style.setProperty("--section-fg", colourOf(fg));
          html.style.setProperty("--section-bg-dark", colourOf(bgDark ?? bg));
          html.style.setProperty("--section-fg-dark", colourOf(fgDark ?? fg));
          // Sections between chapters (stripes, film, stack) keep the last chapter, as in the source.
          if ("chap" in entry.target.dataset) html.dataset["chapter"] = entry.target.id;
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const section of document.querySelectorAll("[data-bg]")) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return null;
}
