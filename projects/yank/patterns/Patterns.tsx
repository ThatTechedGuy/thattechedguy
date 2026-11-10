"use client";

import { useEffect } from "react";

import { prefersReducedMotion } from "@/lib/motion/media";
import { readTheme, subscribeTheme } from "@/lib/theme/theme";

import { yank } from "../config";
import { drawContours, drawDither, drawDots, drawGrid } from "./fields";
import type { Drawer, PatternFrame } from "./pattern";
import type { PatternKind } from "./PatternCanvas";
import { drawFlow, drawOrbits, drawPaper, drawRain } from "./sprites";

// Typed by string so a canvas's data-pattern can index it; `satisfies` still requires every kind.
const drawers: Partial<Record<string, Drawer>> = {
  dots: drawDots,
  contours: drawContours,
  dither: drawDither,
  grid: drawGrid,
  rain: drawRain,
  orbits: drawOrbits,
  flow: drawFlow,
  paper: drawPaper,
} satisfies Record<PatternKind, Drawer>;

/** The source draws at about 30 frames a second; the patterns move slowly enough. */
const FRAME_MS = 33;
/** Under reduced motion each pattern is drawn once, at this moment of its animation. */
const STILL_T = 12;
const MAX_PIXEL_RATIO = 2;

const ink = () => (readTheme() === "dark" ? "#F5F5F7" : "#1D1D1F");

interface Item extends PatternFrame {
  canvas: HTMLCanvasElement;
  draw: Drawer;
  /** "ink" follows the theme's text colour. */
  inkColour: boolean;
  visible: boolean;
}

/**
 * Draws every <PatternCanvas> on the page. One loop serves them all, drawing only canvases on screen,
 * and stops entirely while the tab is hidden or no pattern is visible.
 */
export function Patterns() {
  useEffect(() => {
    const still = prefersReducedMotion();
    const items: Item[] = [];
    for (const canvas of document.querySelectorAll<HTMLCanvasElement>("canvas[data-pattern]")) {
      const ctx = canvas.getContext("2d");
      const { pattern, c1, c2, alpha } = canvas.dataset;
      const draw = pattern ? drawers[pattern] : undefined;
      if (!ctx || !draw) continue;
      items.push({
        canvas,
        ctx,
        draw,
        inkColour: c1 === "ink",
        c1: c1 === "ink" ? ink() : (c1 ?? "#000"),
        c2: c2 ?? yank.accent,
        alpha: Number(alpha ?? 1),
        visible: false,
        w: 0,
        h: 0,
        mx: -9999,
        my: -9999,
      });
    }

    let frame = 0;
    let last = 0;
    let pointer: { x: number; y: number } | null = null;

    const drawItem = (item: Item, t: number) => {
      if (item.w < 2) return;
      if (pointer) {
        const rect = item.canvas.getBoundingClientRect();
        item.mx = pointer.x - rect.left;
        item.my = pointer.y - rect.top;
      }
      item.draw(item, t);
    };

    const loop = (now: number) => {
      frame = 0;
      if (document.hidden || !items.some((item) => item.visible)) return;
      frame = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      last = now;
      for (const item of items) if (item.visible) drawItem(item, now / 1000);
    };
    const wake = () => {
      if (still) for (const item of items) drawItem(item, STILL_T);
      else if (frame === 0) frame = requestAnimationFrame(loop);
    };

    const resize = new ResizeObserver((entries) => {
      const ratio = Math.min(MAX_PIXEL_RATIO, window.devicePixelRatio || 1);
      for (const entry of entries) {
        const item = items.find((candidate) => candidate.canvas === entry.target);
        if (!item) continue;
        item.w = Math.max(1, Math.round(entry.contentRect.width));
        item.h = Math.max(1, Math.round(entry.contentRect.height));
        item.canvas.width = Math.round(item.w * ratio);
        item.canvas.height = Math.round(item.h * ratio);
        item.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        delete item.parts;
      }
      wake();
    });
    const onScreen = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const item = items.find((candidate) => candidate.canvas === entry.target);
        if (item) item.visible = entry.isIntersecting;
      }
      wake();
    });
    for (const item of items) {
      resize.observe(item.canvas);
      onScreen.observe(item.canvas);
    }

    const onMove = (event: MouseEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
    };
    const onTheme = () => {
      for (const item of items) if (item.inkColour) item.c1 = ink();
      wake();
    };
    const unsubscribeTheme = subscribeTheme(onTheme);
    document.addEventListener("visibilitychange", wake);
    if (!still) window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      onScreen.disconnect();
      unsubscribeTheme();
      document.removeEventListener("visibilitychange", wake);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return null;
}
