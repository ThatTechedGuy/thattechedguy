"use client";

import type { PointerEvent } from "react";

// One scrollbar per page, so the drag in progress can live at module level and the handlers stay stable.
let drag: { pointerY: number; scrollY: number } | null = null;

function onPointerDown(event: PointerEvent<HTMLDivElement>) {
  drag = { pointerY: event.clientY, scrollY: window.scrollY };
  event.currentTarget.setPointerCapture(event.pointerId);
  document.documentElement.classList.add("is-dragging-scrollbar");
  event.preventDefault();
}

function onPointerMove(event: PointerEvent<HTMLDivElement>) {
  if (!drag) return;
  const html = document.documentElement;
  const viewport = window.innerHeight;
  const max = html.scrollHeight - viewport;
  const thumb = Number.parseFloat(html.style.getPropertyValue("--th")) || 60;
  // The thumb travels the rail (viewport minus 12px of inset) less its own height.
  const travel = Math.max(1, viewport - 12 - thumb);
  const moved = ((event.clientY - drag.pointerY) / travel) * max;
  window.scrollTo({ top: Math.max(0, Math.min(max, drag.scrollY + moved)), behavior: "instant" });
}

function onPointerEnd() {
  drag = null;
  document.documentElement.classList.remove("is-dragging-scrollbar");
}

/**
 * The overlay scrollbar. CSS places the thumb from --sp, --vh and --th (motion/ScrollProgress) and
 * colours it with the section's text colour; this island only adds dragging.
 */
export function Scrollbar() {
  return (
    <div className="scrollbar-rail" aria-hidden="true">
      <div
        className="scrollbar-thumb"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      />
    </div>
  );
}
