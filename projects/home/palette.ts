/** Palette state, kept on <html data-palette>. */

import { darkPalette, homePaletteKey, lightPalette, palettes, type PaletteId } from "./config";

const CHANGE_EVENT = "ttg:palettechange";
const ids: readonly string[] = palettes.map((palette) => palette.id);

/** Sets data-palette before first paint, so the wrong paper never flashes. Plain ES5: it runs inline in <head>. */
export const paletteInitScript = `(function(k,ids,l,d){var p;try{p=localStorage.getItem(k)}catch(e){}if(ids.indexOf(p)<0)p=matchMedia("(prefers-color-scheme: dark)").matches?d:l;document.documentElement.setAttribute("data-palette",p)})(${JSON.stringify(homePaletteKey)},${JSON.stringify(ids)},${JSON.stringify(lightPalette)},${JSON.stringify(darkPalette)})`;

export const readPalette = (): string | undefined => document.documentElement.dataset["palette"];

/** Switches the palette now and remembers it. The tokens are registered with @property, so CSS blends them. */
export function applyPalette(id: PaletteId): void {
  document.documentElement.dataset["palette"] = id;
  try {
    localStorage.setItem(homePaletteKey, id);
  } catch {
    // Private mode or blocked storage: the choice lasts for this visit.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribePalette(onChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}
