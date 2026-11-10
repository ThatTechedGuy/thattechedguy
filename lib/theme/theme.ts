/** Light/dark theme state, kept on <html data-theme>. Look-free: every project brings its own colours and storage key. */

export type Theme = "light" | "dark";
/** "auto" follows the system until the visitor chooses. */
export type ThemeDefault = Theme | "auto";

const CHANGE_EVENT = "ttg:themechange";

/**
 * The script that sets data-theme before first paint, so the wrong theme never flashes.
 * It runs inline in <head>, before any bundle, so it is plain ES5 in a string.
 */
export function themeInitScript(storageKey: string, fallback: ThemeDefault): string {
  return `(function(k,d){var t;try{t=localStorage.getItem(k)}catch(e){}if(t!=="light"&&t!=="dark"){t=d==="auto"?(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):d}document.documentElement.setAttribute("data-theme",t)})(${JSON.stringify(storageKey)},${JSON.stringify(fallback)})`;
}

export function readTheme(): Theme {
  return document.documentElement.dataset["theme"] === "dark" ? "dark" : "light";
}

/** Switches the theme now and remembers it for this project. */
export function applyTheme(storageKey: string, theme: Theme): void {
  document.documentElement.dataset["theme"] = theme;
  try {
    localStorage.setItem(storageKey, theme);
  } catch {
    // Private mode or blocked storage: the choice simply lasts for this visit.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Calls back after every applyTheme. Returns the unsubscribe function. */
export function subscribeTheme(onChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}
