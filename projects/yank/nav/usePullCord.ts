"use client";

import { useEffect, type Dispatch, type RefObject, type SetStateAction } from "react";

import { prefersReducedMotion } from "@/lib/motion/media";

/** A pull this far (px) toggles the menu; shorter drags only swing the cord. */
const YANK_PX = 70;
const SAY_MS = 1700;

/** What the bubble says after a pull. Numbers are counts of successful yanks. */
const remarks: Record<number, string> = {
  3: "Nice yank.",
  7: "You really like this, huh?",
  15: "Okay, you win. It is fun.",
};

/**
 * The pull cord's physics, ported from the source's pullInit: drag the ball down to stretch the string,
 * sideways to swing it, then a spring brings both back. Clicking the ball (without dragging), a menu link,
 * or Escape toggles or closes the menu. All listeners live on the cord's root element.
 */
export function usePullCord(
  rootRef: RefObject<HTMLDivElement | null>,
  setOpen: Dispatch<SetStateAction<boolean>>,
) {
  useEffect(() => {
    const root = rootRef.current;
    const cord = root?.querySelector<HTMLElement>("[data-cord]");
    const swing = root?.querySelector<HTMLElement>("[data-cord-swing]");
    const string = root?.querySelector<HTMLElement>("[data-cord-string]");
    const knob = root?.querySelector<HTMLElement>("[data-cord-knob]");
    const bubble = root?.querySelector<HTMLElement>("[data-cord-say]");
    if (!root || !cord || !swing || !string || !knob || !bubble) return undefined;

    // a: swing angle (deg), s: stretch (px), with their velocities.
    let a = 0;
    let va = 0;
    let s = 0;
    let vs = 0;
    let frame = 0;
    let yanks = 0;
    let skipClick = false;
    let drag: {
      x: number;
      y: number;
      moved: boolean;
      lx: number;
      lt: number;
      vx: number;
      max: number;
    } | null = null;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const later = (run: () => void, ms: number) => {
      const timer = setTimeout(() => {
        timers.delete(timer);
        run();
      }, ms);
      timers.add(timer);
    };

    const apply = (reset: boolean) => {
      swing.style.transform = reset ? "" : `rotate(${a.toFixed(2)}deg)`;
      string.style.height = reset ? "" : `${(56 + s).toFixed(1)}px`;
      knob.style.transform = reset ? "" : `translateY(${s.toFixed(1)}px)`;
    };

    const spring = () => {
      va = (va - a * 0.028) * 0.978;
      a += va;
      vs = (vs - s * 0.2) * 0.74;
      s = Math.max(-16, s + vs);
      if (Math.abs(a) < 0.05 && Math.abs(va) < 0.05 && Math.abs(s) < 0.15 && Math.abs(vs) < 0.15) {
        a = va = s = vs = 0;
        apply(true);
        frame = 0;
        return;
      }
      apply(false);
      frame = requestAnimationFrame(spring);
    };

    const say = (text: string) => {
      bubble.textContent = text;
      bubble.classList.add("is-on");
      later(() => bubble.classList.remove("is-on"), SAY_MS);
    };

    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      cancelAnimationFrame(frame);
      frame = 0;
      drag = {
        x: event.clientX,
        y: event.clientY - s,
        moved: false,
        lx: event.clientX,
        lt: performance.now(),
        vx: 0,
        max: 0,
      };
      cord.classList.add("is-pulling");
      knob.setPointerCapture(event.pointerId);
    };

    const onMove = (event: PointerEvent) => {
      if (!drag) return;
      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      if (!drag.moved && Math.hypot(dx, dy) > 6) drag.moved = true;
      if (!drag.moved) return;
      event.preventDefault();
      const raw = Math.max(0, dy);
      drag.max = Math.max(drag.max, raw);
      // Past 140px the string resists, approaching 360px.
      s = raw < 140 ? raw : 140 + 220 * (1 - Math.exp(-(raw - 140) / 220));
      a = Math.max(-70, Math.min(70, (-Math.atan2(dx, 74 + s) * 180) / Math.PI));
      const now = performance.now();
      drag.vx = drag.vx * 0.5 + (0.5 * (event.clientX - drag.lx)) / Math.max(8, now - drag.lt);
      drag.lx = event.clientX;
      drag.lt = now;
      apply(false);
    };

    const onUp = () => {
      if (!drag) return;
      const { moved, vx, max } = drag;
      drag = null;
      cord.classList.remove("is-pulling");
      if (!moved) return;
      // The click that follows a drag must not toggle the menu a second time.
      skipClick = true;
      later(() => (skipClick = false), 80);
      va = -vx * 3.2;
      let text = "";
      if (max > YANK_PX) {
        yanks += 1;
        setOpen((open) => !open);
        if (max > 330) {
          text = "Whoa, easy!";
          vs = -26;
        } else text = remarks[yanks] ?? "";
      } else if (Math.abs(vx) > 0.7 || Math.abs(a) > 28) text = "Wheee!";
      if (text) later(() => say(text), 0);
      if (prefersReducedMotion()) {
        a = va = s = vs = 0;
        apply(true);
      } else if (frame === 0) frame = requestAnimationFrame(spring);
    };

    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      if (event.target.closest("[data-cord-knob]")) {
        if (!skipClick) setOpen((open) => !open);
      } else if (event.target.closest("a")) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    knob.addEventListener("pointerdown", onDown);
    knob.addEventListener("pointermove", onMove, { passive: false });
    knob.addEventListener("pointerup", onUp);
    knob.addEventListener("pointercancel", onUp);
    root.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      knob.removeEventListener("pointerdown", onDown);
      knob.removeEventListener("pointermove", onMove);
      knob.removeEventListener("pointerup", onUp);
      knob.removeEventListener("pointercancel", onUp);
      root.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(frame);
      for (const timer of timers) clearTimeout(timer);
    };
  }, [rootRef, setOpen]);
}
