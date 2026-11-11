"use client";

import { useEffect, useRef } from "react";

import { hasFinePointer, prefersReducedMotion } from "@/lib/motion/media";

/** How much of the remaining distance the ring covers each frame. */
const FOLLOW = 0.22;

/**
 * The custom cursor: a dot and ring that trail the pointer and grow a label over [data-cursor] areas.
 * Fine pointers only, and not under reduced motion; everywhere else the native cursor stays.
 */
export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !hasFinePointer() || prefersReducedMotion()) return undefined;
    const html = document.documentElement;
    html.classList.add("has-cursor");

    let targetX = -100;
    let targetY = -100;
    let x = -100;
    let y = -100;
    let frame = 0;

    const follow = () => {
      x += (targetX - x) * FOLLOW;
      y += (targetY - y) * FOLLOW;
      cursor.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
      // The loop sleeps once the ring has caught up; the next move wakes it.
      const settled = Math.abs(targetX - x) < 0.05 && Math.abs(targetY - y) < 0.05;
      frame = settled ? 0 : requestAnimationFrame(follow);
    };

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.classList.add("is-on");
      const hit =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-cursor], a, button, input, summary")
          : null;
      const mode = hit
        ? (hit.dataset["cursor"] ?? (hit.tagName === "INPUT" ? "text" : "link"))
        : "none";
      if (cursor.dataset["mode"] !== mode) cursor.dataset["mode"] = mode;
      if (frame === 0) frame = requestAnimationFrame(follow);
    };
    const onLeave = () => cursor.classList.remove("is-on");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame);
      html.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={cursorRef} className="cursor" data-mode="none" aria-hidden="true">
      <span className="cursor-ring" />
      <span className="cursor-dot" />
      <span className="cursor-label cursor-label-watch">Watch</span>
      <span className="cursor-label cursor-label-move">Move</span>
    </div>
  );
}
