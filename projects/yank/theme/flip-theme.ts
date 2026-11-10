import { prefersReducedMotion } from "@/lib/motion/media";
import { startViewTransition } from "@/lib/motion/view-transition";
import { applyTheme, readTheme, type Theme } from "@/lib/theme/theme";

import { yank } from "../config";
import { blobFrames } from "./blob";
import { createSparkLayer, fireSparks } from "./sparks";

// One flip at a time: a second click during the animation is ignored.
let busy = false;

/** Where the reveal starts: the click point, else the middle of the control (keyboard), else bottom right. */
function origin(event: { clientX: number; clientY: number; currentTarget: Element } | undefined) {
  if (!event) return { x: window.innerWidth - 47, y: window.innerHeight - 47 };
  // Keyboard activation reports clientX 0.
  if (event.clientX) return { x: event.clientX, y: event.clientY };
  const box = event.currentTarget.getBoundingClientRect();
  return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
}

/** The new theme's colour for the section in the middle of the screen (fallback wash only). */
function washColour(next: Theme): string {
  const section = document
    .elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
    ?.closest<HTMLElement>("[data-bg]");
  if (next === "dark") return section?.dataset["bgDark"] ?? "#07070B";
  return section?.dataset["bg"] ?? "#F5F5F7";
}

/**
 * Switches Yank between light and dark.
 * - Reduced motion: instant.
 * - View Transitions: the new theme grows as a wobbly blob from the switch while the old page tilts away.
 * - Otherwise: a blob of the new colour covers the page, the theme swaps underneath, and the blob fades.
 */
export function flipTheme(event?: {
  clientX: number;
  clientY: number;
  currentTarget: Element;
}): void {
  if (busy) return;
  const next: Theme = readTheme() === "dark" ? "light" : "dark";
  const apply = () => applyTheme(yank.themeStorageKey, next);
  if (prefersReducedMotion()) {
    apply();
    return;
  }

  const { x, y } = origin(event);
  const width = window.innerWidth;
  const height = window.innerHeight;
  // Far enough to reach the farthest corner.
  const radius = Math.ceil(Math.hypot(Math.max(x, width - x), Math.max(y, height - y)));
  const html = document.documentElement;
  html.style.setProperty("--vtx", `${x}px`);
  html.style.setProperty("--vty", `${y}px`);
  html.style.setProperty("--vtr", `${radius}px`);

  busy = true;
  const sparks = createSparkLayer();
  const cleanup = () => {
    if (!busy) return;
    html.classList.remove("theme-flip");
    busy = false;
    // The sparks outlive the reveal by a moment.
    setTimeout(() => sparks.remove(), 1500);
  };

  html.classList.add("theme-flip");
  const transition = startViewTransition(apply);
  if (transition) {
    void transition.ready.then(
      () => {
        html.animate(blobFrames(x, y, radius, true), {
          duration: 1250,
          easing: "linear",
          fill: "both",
          pseudoElement: "::view-transition-new(root)",
        });
        fireSparks(sparks, next, x, y);
      },
      // Skipped transitions (hidden tab) still apply the theme; there is nothing to animate.
      () => {},
    );
    void transition.finished.then(cleanup, cleanup);
    // Safety net if the transition never settles.
    setTimeout(cleanup, 5000);
    return;
  }

  // No View Transitions.
  html.classList.remove("theme-flip");
  const wash = document.createElement("div");
  wash.className = "flip-wash";
  wash.style.background = washColour(next);
  sparks.prepend(wash);
  fireSparks(sparks, next, x, y);
  const cover = wash.animate(blobFrames(x, y, radius, false), {
    duration: 700,
    easing: "linear",
    fill: "both",
  });
  cover.addEventListener("finish", () => {
    html.classList.add("theme-flip");
    apply();
    // Two frames, so the new theme has painted under the wash before it fades.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const melt = wash.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 450,
          easing: "ease-out",
          fill: "forwards",
        });
        melt.addEventListener("finish", cleanup);
      });
    });
  });
}
