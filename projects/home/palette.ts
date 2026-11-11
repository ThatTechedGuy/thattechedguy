/** Palette state, kept on <html data-palette>, plus data-palette-random while no paper is saved. */

import { prefersReducedMotion } from "@/lib/motion/media";
import { startViewTransition } from "@/lib/motion/view-transition";

import { homePaletteKey, palettes, type PaletteId } from "./config";

const CHANGE_EVENT = "ttg:palettechange";
const ids: readonly PaletteId[] = palettes.map((palette) => palette.id);

/**
 * Sets data-palette before first paint, so the paper never flashes: the visitor's pick if they saved
 * one, otherwise a random paper on every visit. Plain ES5: it runs inline in <head>.
 */
export const paletteInitScript = `(function(k,ids){var p,r=document.documentElement;try{p=localStorage.getItem(k)}catch(e){}if(ids.indexOf(p)<0){p=ids[Math.floor(Math.random()*ids.length)];r.setAttribute("data-palette-random","")}r.setAttribute("data-palette",p)})(${JSON.stringify(homePaletteKey)},${JSON.stringify(ids)})`;

const root = () => document.documentElement;

/** The paper on screen. */
export const readPalette = (): string | undefined => root().dataset["palette"];

/** What the menu shows as chosen: "random" until the visitor saves a paper. */
export const readChoice = (): string | undefined =>
  "paletteRandom" in root().dataset ? "random" : readPalette();

const changed = () => window.dispatchEvent(new Event(CHANGE_EVENT));

/**
 * Swaps the paper in one View Transition: the new one spreads like ink from (x, y) over the old (motion.css). The
 * colours change once, so the browser only clips a snapshot, never restyles the page frame by frame. With reduced
 * motion, or no View Transitions, the paper just changes.
 */
export function flipPaper(change: () => void, x: number, y: number): void {
  if (prefersReducedMotion()) return change();
  const html = root();
  html.style.setProperty("--ink-x", `${x}px`);
  html.style.setProperty("--ink-y", `${y}px`);
  // Far enough to cover the furthest corner.
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  html.style.setProperty("--ink-r", `${Math.ceil(r)}px`);
  if (!startViewTransition(change, "paper-flip")) change();
}

/** Switches to a paper now and remembers it. */
export function applyPalette(id: PaletteId): void {
  root().dataset["palette"] = id;
  delete root().dataset["paletteRandom"];
  try {
    localStorage.setItem(homePaletteKey, id);
  } catch {
    // Private mode or blocked storage: the choice lasts for this visit.
  }
  changed();
}

/** Forgets the saved paper, so every visit gets a random one, and shows a different paper now. */
export function applyRandom(): void {
  const others = ids.filter((id) => id !== readPalette());
  root().dataset["palette"] = others[Math.floor(Math.random() * others.length)] ?? palettes[0].id;
  root().dataset["paletteRandom"] = "";
  try {
    localStorage.removeItem(homePaletteKey);
  } catch {
    // Blocked storage: nothing was saved.
  }
  changed();
}

export function subscribePalette(onChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}
