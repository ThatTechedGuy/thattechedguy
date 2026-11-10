"use client";

import { useEffect } from "react";

/**
 * Feeds the pointer position to CSS, once per frame:
 *   --mx, --my on <html>: pointer across the screen, -1..1 (hero screen and stack lean towards it)
 *   --lx, --ly (px) and --tx, --ty (-1..1) on the hovered [data-spot] / [data-tilt] card
 */
export function PointerEffects() {
  useEffect(() => {
    const html = document.documentElement;
    let last: MouseEvent | null = null;
    let near: HTMLElement | null = null;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!last) return;
      const { clientX, clientY, target } = last;
      html.style.setProperty("--mx", ((clientX / window.innerWidth) * 2 - 1).toFixed(3));
      html.style.setProperty("--my", ((clientY / window.innerHeight) * 2 - 1).toFixed(3));

      const hit =
        target instanceof Element ? target.closest<HTMLElement>("[data-spot], [data-tilt]") : null;
      if (near && near !== hit) {
        // The card the pointer just left settles flat again.
        near.style.setProperty("--tx", "0");
        near.style.setProperty("--ty", "0");
      }
      near = hit;
      if (!hit) return;
      const rect = hit.getBoundingClientRect();
      hit.style.setProperty("--lx", `${(clientX - rect.left).toFixed(0)}px`);
      hit.style.setProperty("--ly", `${(clientY - rect.top).toFixed(0)}px`);
      hit.style.setProperty("--tx", (((clientX - rect.left) / rect.width) * 2 - 1).toFixed(3));
      hit.style.setProperty("--ty", (((clientY - rect.top) / rect.height) * 2 - 1).toFixed(3));
    };

    const onMove = (event: MouseEvent) => {
      last = event;
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
