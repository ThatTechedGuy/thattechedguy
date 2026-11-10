/** Starts a View Transition, or returns null where the browser has none (Firefox before 144, old Safari). */
export function startViewTransition(update: () => void): ViewTransition | null {
  if (!("startViewTransition" in document)) return null;
  try {
    return document.startViewTransition(update);
  } catch {
    return null;
  }
}
