"use client";

import { useEffect, useRef, useState } from "react";

import { prefersReducedMotion } from "@/lib/motion/media";

type Mode = "none" | "hover" | "link";

/**
 * A dot and an easing ring that replace the mouse pointer. The ring grows over links and shows their
 * data-cursor label. Mouse and trackpad only.
 * The position changes every frame, so it goes straight to the elements' transforms through refs;
 * everything else (mode, label, shown or not) is state and only re-renders when it changes.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const [inside, setInside] = useState(true);
  const [down, setDown] = useState(false);
  const [mode, setMode] = useState<Mode>("none");
  const [label, setLabel] = useState("");

  useEffect(() => {
    const c = ring.current;
    const d = dot.current;
    if (!c || !d || !matchMedia("(hover: hover) and (pointer: fine)").matches) return undefined;
    const ease = prefersReducedMotion() ? 1 : 0.2;
    let mx = -100;
    let my = -100;
    let cx = -100;
    let cy = -100;
    let frame = 0;

    // Eases the ring towards the pointer, and sleeps once it has caught up.
    const follow = () => {
      cx += (mx - cx) * ease;
      cy += (my - cy) * ease;
      if (Math.abs(mx - cx) < 0.1 && Math.abs(my - cy) < 0.1) {
        cx = mx;
        cy = my;
        frame = 0;
      } else frame = requestAnimationFrame(follow);
      c.style.transform = `translate(${cx.toFixed(1)}px,${cy.toFixed(1)}px)`;
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      if (frame === 0 && mx === -100) {
        cx = event.clientX;
        cy = event.clientY;
      }
      mx = event.clientX;
      my = event.clientY;
      d.style.transform = `translate(${mx}px,${my}px)`;
      if (frame === 0) frame = requestAnimationFrame(follow);
      const target =
        event.target instanceof Element ? event.target.closest("a, button, summary") : null;
      const named = target?.getAttribute("data-cursor");
      setLive(true);
      setInside(true);
      setMode(named ? "link" : target ? "hover" : "none");
      if (named) setLabel(named);
    };
    const leave = () => setInside(false);
    const press = () => setDown(true);
    const release = () => setDown(false);

    addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    addEventListener("blur", leave);
    addEventListener("pointerdown", press);
    addEventListener("pointerup", release);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", leave);
      removeEventListener("blur", leave);
      removeEventListener("pointerdown", press);
      removeEventListener("pointerup", release);
    };
  }, []);

  const shown = live && inside;
  const ringClass = [
    "cursor",
    live && "live",
    shown && "on",
    mode === "link" && "is-link",
    mode === "hover" && "is-hover",
    down && "is-down",
  ];
  const dotClass = ["cursor-dot", shown && "on", mode === "link" && "hide"];

  return (
    <>
      <div className={ringClass.filter(Boolean).join(" ")} ref={ring} aria-hidden="true">
        <span className="lbl">{label}</span>
      </div>
      <div className={dotClass.filter(Boolean).join(" ")} ref={dot} aria-hidden="true" />
    </>
  );
}
